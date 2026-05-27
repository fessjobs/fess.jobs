# FESS Jobs – PWA Setup Anleitung

## 1. Supabase Setup (einmalig, 10 Minuten)

### Schritt 1: SQL Migration ausführen
1. Supabase Dashboard öffnen → SQL Editor
2. `supabase_migrations.sql` öffnen
3. Inhalt reinkopieren → Run

### Schritt 2: Admin User anlegen
1. Supabase → Authentication → Users → "Add User"
2. E-Mail: `admin@fess.jobs` Passwort: `fess.jobs2026!`
3. Dann im SQL Editor:
```sql
UPDATE profiles SET role = 'admin', status = 'active' 
WHERE email = 'admin@fess.jobs';
```

### Schritt 3: Google Login aktivieren (kostenlos)
1. Supabase → Authentication → Providers → Google → Enable
2. Google Cloud Console → OAuth 2.0 erstellen
3. Client ID + Secret in Supabase eintragen
4. Authorized redirect URI: `https://nojmxfelunqaotqslabk.supabase.co/auth/v1/callback`

### Schritt 4: Apple Login aktivieren
1. Supabase → Authentication → Providers → Apple → Enable
2. Apple Developer Account → App ID + Key erstellen
3. Folge: https://supabase.com/docs/guides/auth/social-login/auth-apple

### Schritt 5: Storage Buckets prüfen
Supabase → Storage → Buckets sollten vorhanden sein:
- `chat-attachments` (public)
- `signatures` (private)  
- `broadcast-attachments` (private)

Falls nicht: SQL Migration nochmal ausführen.

---

## 2. GitHub Upload (alle Dateien)

Lade diese Dateien in dein GitHub Repo hoch:
- `index.html`
- `login.html`
- `chat.html`
- `admin-fess2025.html`
- `manifest.json`
- `sw.js`
- `icon-192.svg`
- `icon-512.svg`

---

## 3. PWA als App installieren

### iPhone/iPad:
1. Safari öffnen → `fessjob.netlify.app/login.html`
2. Teilen-Button (□↑) → "Zum Home-Bildschirm"
3. Name "fess.jobs" → Hinzufügen
→ App erscheint auf dem Homescreen mit FESS Logo!

### Android:
1. Chrome öffnen → `fessjob.netlify.app/login.html`
2. Menü (⋮) → "App installieren"
→ App erscheint auf dem Homescreen!

---

## 4. Superchat Integration (WhatsApp Business API)

Wenn du den Superchat API Key hast:
1. In `admin-fess2025.html` folgende Zeile finden:
   `const SUPERCHAT_API_KEY = '';`
2. Deinen Key eintragen
3. Dann können WhatsApp Broadcasts direkt über Superchat gesendet werden

---

## 5. Outlook E-Mail Import

Die Datei `outlook_contacts_import.csv` kannst du in Outlook importieren:
1. Outlook → Datei → Öffnen & Exportieren → Importieren/Exportieren
2. "Aus anderen Programmen oder Dateien importieren" → Kommagetrennte Werte
3. `outlook_contacts_import.csv` auswählen
4. In Kontakte importieren

Für den Newsletter-Versand: 
- Admin Dashboard → Newsletter → Empfänger "Alle" wählen → Senden
- Outlook öffnet sich automatisch mit allen BCC-Adressen vorausgefüllt

---

## 6. Admin Login

URL: `https://fessjob.netlify.app/login.html`
E-Mail: `admin@fess.jobs`
Passwort: `fess.jobs2026!`

---

## Funktionen Übersicht

| Feature | Status |
|---------|--------|
| PWA (App auf Homescreen) | ✅ Ready |
| Login E-Mail/Passwort | ✅ Ready |
| Login Google | ⚙️ Setup nötig |
| Login Apple | ⚙️ Setup nötig |
| Mitarbeiter Freischaltung | ✅ Ready |
| Chat-Gruppen | ✅ Ready |
| Datei-Anhänge im Chat | ✅ Ready |
| Digitale Unterschrift | ✅ Ready |
| Nachrichten pinnen | ✅ Ready |
| Newsletter E-Mail | ✅ Ready |
| WhatsApp Broadcast | ⚙️ Superchat Key nötig |
| Push-Benachrichtigungen | ✅ Ready (nach HTTPS) |
