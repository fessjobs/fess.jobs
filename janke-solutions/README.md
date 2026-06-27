# Janke Solutions – Website

Eigenständige, statische Website (kein Server, kein Build-Schritt nötig). Liegt
komplett getrennt von der bestehenden FESS-Jobs-Plattform in diesem Repo.

## Struktur

```
janke-solutions/
  index.html        Startseite (Struktur, wird durch content.js befüllt)
  impressum.html     Platzhalter – vor Live-Schaltung mit echten Daten füllen
  datenschutz.html   Platzhalter – vor Live-Schaltung mit echten Daten füllen
  css/styles.css      Design (Farben, Abstände, Layout)
  js/content.js       ALLE Texte/Leistungen/Kontaktdaten – hier änderst DU
  js/main.js          Logik, die content.js auf der Seite darstellt
```

## Inhalte ändern (ohne Programmierkenntnisse)

Öffne `js/content.js` in einem Texteditor (z.B. Notepad, VS Code) und ändere
die Texte zwischen den Anführungszeichen. Beispiel:

```js
hero: {
  title: "Ihr Projekt. Unsere Lösung.",   // <- diesen Text anpassen
  ...
}
```

- Neue Leistung hinzufügen: einen weiteren Block in `services: [...]` einfügen.
- Neuen Handwerker/Setcard hinzufügen: einen Block in `craftsmen.list: [...]` einfügen.
- Neue Unterkunft hinzufügen: einen Block in `accommodations.listings: [...]` einfügen.
- Kontaktdaten: im Block `contact: {...}` anpassen.

Nach dem Speichern einfach die Seite im Browser neu laden (oder hochladen) –
fertig, kein Build-Schritt nötig.

## Vor dem Live-Gang noch zu tun

- [ ] Echte Kontaktdaten (Adresse, Telefon, E-Mail) in `js/content.js` eintragen
- [ ] `impressum.html` und `datenschutz.html` mit echten Rechtsangaben befüllen
- [ ] Platzhalterbilder (Villa Bückeberg, Handwerker) durch echte Fotos ersetzen
- [ ] Bei echtem Buchungssystem: `bookingUrl` der Unterkünfte und die
      "Jetzt buchen"-Buttons der Setcards auf das echte System verlinken
- [ ] `formAction` in `js/content.js` ggf. durch ein echtes Formular-Backend
      ersetzen, falls mailto-Links nicht ausreichen

## Lokal ansehen

Einfach `index.html` per Doppelklick im Browser öffnen, oder im Ordner:

```
npx serve .
```
