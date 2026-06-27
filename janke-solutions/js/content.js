/**
 * ============================================================
 *  JANKE SOLUTIONS – INHALTE
 * ============================================================
 *  Hier kannst DU alle Texte, Leistungen, Unterkünfte,
 *  Handwerker und Kontaktdaten ändern – ohne HTML/CSS-Wissen.
 *
 *  Wichtig:
 *  - Texte stehen immer in Anführungszeichen "wie hier".
 *  - Nach jedem Eintrag muss ein Komma (,) stehen, außer beim
 *    letzten Eintrag einer Liste.
 *  - Bilder: einfach den Bildpfad/Link in image: "..." eintragen.
 *  - Speichern reicht – kein Programm nötig, einfach im
 *    Texteditor öffnen und ändern.
 * ============================================================
 */

window.SITE_CONTENT = {

  meta: {
    title: "Janke Solutions – Bau, Vermietung & Handwerk aus einer Hand",
    description: "Janke Solutions entwickelt Immobilien für Kurz- und Langzeitvermietung, vermittelt geprüfte Handwerker, übernimmt Einrichtung, Homestaging, Entsorgungsmanagement und betreibt eigene Unterkünfte wie die Villa Bückeberg.",
    lang: "de"
  },

  brand: {
    name: "JANKE",
    nameSuffix: "SOLUTIONS",
    tagline: "Bauen. Einrichten. Vermieten. Alles aus einer Hand.",
  },

  nav: [
    { label: "Leistungen", href: "#leistungen" },
    { label: "Unterkünfte", href: "#unterkuenfte" },
    { label: "Handwerker", href: "#handwerker" },
    { label: "Ablauf", href: "#ablauf" },
    { label: "Über uns", href: "#ueber-uns" },
    { label: "Kontakt", href: "#kontakt" },
  ],

  hero: {
    eyebrow: "Janke Solutions",
    title: "Ihr Projekt. Unsere Lösung.",
    subtitle: "Von der Bauprojektentwicklung über Einrichtung und Homestaging bis zur fertig vermieteten Unterkunft – wir bringen Handwerk, Organisation und Vermietung zusammen.",
    ctaPrimary: { label: "Kostenlose Erstberatung", href: "#kontakt" },
    ctaSecondary: { label: "Unsere Leistungen", href: "#leistungen" },
    stats: [
      { value: "100+", label: "Handwerker im Netzwerk" },
      { value: "Bundesweit", label: "Regionen abgedeckt" },
      { value: "1", label: "Ansprechpartner für alles" },
    ]
  },

  services: [
    {
      icon: "blueprint",
      title: "Bauprojektentwicklung für Vermietung",
      text: "Wir planen und entwickeln Immobilien gezielt für die Kurzzeit- und Langzeitvermietung – von der Standortanalyse bis zur Umsetzung."
    },
    {
      icon: "wrench",
      title: "Handwerker-Vermittlung mit Setcard",
      text: "Geprüfte Handwerker in deiner Region – mit eigener Setcard, Bewertung und direkter Buchung. Elektrik, Sanitär, Maler, Boden & mehr."
    },
    {
      icon: "sofa",
      title: "Einrichtung & Möbelaufbau",
      text: "Wir liefern, montieren und richten ein – termingerecht und passend zur Nutzung deiner Immobilie."
    },
    {
      icon: "staging",
      title: "Homestaging",
      text: "Wir gestalten Räume so, dass sie online wie persönlich überzeugen – für höhere Auslastung und bessere Mieten."
    },
    {
      icon: "renovation",
      title: "Renovierung & Sanierung",
      text: "Vom Frischanstrich bis zur Komplettsanierung – wir machen Bestandsobjekte vermietbereit."
    },
    {
      icon: "trash",
      title: "Entsorgungsmanagement",
      text: "Entrümpelung, Haushaltsauflösung und Containerdienst – sauber, schnell und zuverlässig organisiert."
    },
    {
      icon: "key",
      title: "Objektbetreuung im laufenden Betrieb",
      text: "Reinigungskoordination, Gästekommunikation und kleine Reparaturen – wir halten dein Vermietobjekt am Laufen."
    },
  ],

  process: [
    { step: "01", title: "Beratungsgespräch", text: "Wir besprechen dein Projekt, Ziel und Budget – unverbindlich und kostenlos." },
    { step: "02", title: "Konzept & Planung", text: "Wir erstellen ein Konzept für Bau, Einrichtung oder Vermietung – passend zu deinem Objekt." },
    { step: "03", title: "Umsetzung", text: "Unser Handwerker-Netzwerk und Team setzen das Projekt zuverlässig vor Ort um." },
    { step: "04", title: "Vermietstart", text: "Dein Objekt ist eingerichtet, fotografiert und bereit für Gäste oder Mieter." },
  ],

  accommodations: {
    intro: "Wir entwickeln nicht nur Immobilien für andere – wir betreiben auch eigene Unterkünfte. So kennen wir die Anforderungen von Gästen und Vermietern aus erster Hand.",
    listings: [
      {
        name: "Villa Bückeberg",
        operator: "by RoomBoom",
        location: "Luhden",
        description: "Großzügige Villa für Gruppen, Familien und besondere Anlässe – modern eingerichtet, mit viel Platz und hochwertiger Ausstattung.",
        badge: "Eigene Unterkunft",
        image: "placeholder-villa",
        bookingUrl: "#kontakt",
        bookingLabel: "Verfügbarkeit anfragen"
      }
    ]
  },

  craftsmen: {
    intro: "Eine Auswahl aus unserem Handwerker-Netzwerk – jeder Handwerker hat eine eigene Setcard mit Leistungen, Region und Bewertung. Direkt buchbar.",
    note: "Beispielhafte Darstellung – echte Setcards folgen mit Launch des Buchungssystems.",
    list: [
      { name: "M. Albrecht", trade: "Elektriker", region: "Region Hannover", rating: "4.9", image: "placeholder-1" },
      { name: "S. Kowalski", trade: "Maler & Tapezierer", region: "Region Bückeburg", rating: "4.8", image: "placeholder-2" },
      { name: "T. Reinholz", trade: "Fliesenleger", region: "Region Minden", rating: "5.0", image: "placeholder-3" },
      { name: "J. Brandt", trade: "Schreiner & Möbelmontage", region: "Region Hameln", rating: "4.9", image: "placeholder-4" },
    ]
  },

  about: {
    title: "Über Janke Solutions",
    text: "Janke Solutions verbindet Bauprojektentwicklung, Handwerk und Vermietung zu einem Komplettangebot. Statt viele einzelne Dienstleister zu koordinieren, bekommst du bei uns alles aus einer Hand – von der ersten Idee bis zur fertig vermieteten Unterkunft.",
    stats: [
      { value: "Eine", label: "Anlaufstelle für dein Projekt" },
      { value: "Geprüft", label: "Handwerker im Netzwerk" },
      { value: "Eigene", label: "Erfahrung als Vermieter" },
    ]
  },

  testimonials: [
    {
      quote: "Von der Renovierung bis zur Einrichtung hat alles reibungslos funktioniert – ein Ansprechpartner für das ganze Projekt.",
      author: "Privater Vermieter, Region Hannover"
    },
    {
      quote: "Die Handwerker waren pünktlich, professionell und genau passend für unsere Region.",
      author: "Hausverwaltung, Schaumburg"
    }
  ],

  contact: {
    heading: "Lass uns über dein Projekt sprechen",
    text: "Egal ob Neubauprojekt, Renovierung oder Handwerker-Buchung – schreib uns, wir melden uns kurzfristig zurück.",
    address: "Musterstraße 1, 31655 Stadthagen (Platzhalter – bitte ersetzen)",
    phone: "+49 (0) 00 0000000",
    email: "info@janke-solutions.de",
    hours: "Mo–Fr: 08:00–18:00 Uhr",
    formAction: "mailto:info@janke-solutions.de"
  },

  footer: {
    copyright: "Janke Solutions. Alle Rechte vorbehalten.",
    links: [
      { label: "Impressum", href: "impressum.html" },
      { label: "Datenschutz", href: "datenschutz.html" },
    ]
  }
};
