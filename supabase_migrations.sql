-- ══════════════════════════════════════════
-- FESS Jobs - Full Schema Migration
-- Run this in Supabase SQL Editor
-- ══════════════════════════════════════════

-- 1. PROFILES (auth users extended)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  vorname TEXT NOT NULL DEFAULT '',
  nachname TEXT NOT NULL DEFAULT '',
  telefon TEXT,
  email TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'crew' CHECK (role IN ('admin','crew')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','active','blocked')),
  regional TEXT,
  sprachen TEXT,
  psa TEXT,
  anreise TEXT,
  notiz TEXT,
  push_token TEXT,
  superchat_contact_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, vorname, nachname)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'vorname', split_part(NEW.email,'@',1)),
    COALESCE(NEW.raw_user_meta_data->>'nachname', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 2. CHATS (one per auftrag, plus general)
CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auftrag_id UUID REFERENCES auftraege(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CHAT MEMBERS
CREATE TABLE IF NOT EXISTS chat_members (
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_read TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (chat_id, user_id)
);

-- 4. MESSAGES
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  content TEXT,
  attachment_url TEXT,
  attachment_name TEXT,
  attachment_type TEXT,
  pinned BOOLEAN DEFAULT FALSE,
  pinned_by UUID REFERENCES profiles(id),
  reply_to UUID REFERENCES messages(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BROADCASTS (Newsletter/Mass messages)
CREATE TABLE IF NOT EXISTS broadcasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  channel TEXT NOT NULL CHECK (channel IN ('email','whatsapp','both')),
  attachment_url TEXT,
  attachment_name TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft','sending','sent','failed')),
  sent_by UUID REFERENCES profiles(id),
  sent_at TIMESTAMPTZ,
  recipient_count INTEGER DEFAULT 0,
  delivered_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BROADCAST RECIPIENTS
CREATE TABLE IF NOT EXISTS broadcast_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  broadcast_id UUID REFERENCES broadcasts(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  email TEXT,
  telefon TEXT,
  sent BOOLEAN DEFAULT FALSE,
  delivered BOOLEAN DEFAULT FALSE,
  error TEXT,
  sent_at TIMESTAMPTZ
);

-- 7. SIGNATURES
CREATE TABLE IF NOT EXISTS signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  auftrag_id UUID REFERENCES auftraege(id) ON DELETE SET NULL,
  document_name TEXT,
  document_url TEXT,
  signature_data TEXT, -- base64 PNG
  signed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ── RLS POLICIES ──
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE broadcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE broadcast_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE signatures ENABLE ROW LEVEL SECURITY;

-- Profiles: users see own, admins see all
CREATE POLICY "profiles_own" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "profiles_admin" ON profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Chats: members can see their chats
CREATE POLICY "chats_member" ON chats FOR SELECT USING (
  EXISTS (SELECT 1 FROM chat_members WHERE chat_id = chats.id AND user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "chats_admin_insert" ON chats FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Messages: chat members can read/write
CREATE POLICY "messages_member_read" ON messages FOR SELECT USING (
  EXISTS (SELECT 1 FROM chat_members WHERE chat_id = messages.chat_id AND user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "messages_member_insert" ON messages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM chat_members WHERE chat_id = messages.chat_id AND user_id = auth.uid())
  OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "messages_admin_update" ON messages FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Broadcasts: admin only
CREATE POLICY "broadcasts_admin" ON broadcasts FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "broadcast_recipients_admin" ON broadcast_recipients FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ── STORAGE BUCKETS ──
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('chat-attachments', 'chat-attachments', true),
  ('signatures', 'signatures', false),
  ('broadcast-attachments', 'broadcast-attachments', false)
ON CONFLICT DO NOTHING;

-- ── REALTIME ──
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE chats;

-- ── ADMIN USER SETUP ──
-- After running this, create a user in Supabase Auth with email: admin@fess.jobs
-- Then run:
-- UPDATE profiles SET role = 'admin', status = 'active' WHERE email = 'admin@fess.jobs';

SELECT 'Migration complete! ✅' AS status;
