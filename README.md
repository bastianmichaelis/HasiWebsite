# Lena Hartmann Fotografie – Website

Statische, deutschsprachige Website für eine Fotografin. Kein Build-Schritt, keine Abhängigkeiten – einfach hochladen oder über GitHub Pages veröffentlichen.

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite mit Hero, Vorstellung, Kennzahlen, Portfolio-Auszug, Leistungen, Kundenstimmen, Call-to-Action |
| `portfolio.html` | Galerie mit Kategorie-Filter (Hochzeit, Portrait, Landschaft, Event) und Lightbox |
| `ueber-mich.html` | Werdegang, Stil, Arbeitsweise in vier Schritten |
| `leistungen.html` | Preispakete für Hochzeit, Portrait und Event sowie FAQ |
| `kontakt.html` | Kontaktdaten und Anfrageformular mit Validierung |
| `impressum.html` / `datenschutz.html` | Rechtliche Seiten (Vorlagen mit Platzhaltern) |

## Struktur

```
├── index.html, portfolio.html, ueber-mich.html, leistungen.html, kontakt.html, impressum.html, datenschutz.html
├── css/style.css        Design (Farben als CSS-Variablen in :root)
├── js/main.js           Navigation, Scroll-Animationen, Filter, Lightbox, Formular
└── assets/img/          Bilder (aktuell SVG-Platzhalter)
    └── portfolio/       Galeriebilder, benannt nach Kategorie
```

## Anpassen

**Bilder ersetzen:** Die Dateien in `assets/img/` sind Platzhalter. Eigene Fotos (JPG/WebP) einfügen und die `src`-Pfade in den HTML-Dateien anpassen. Für die Galerie empfiehlt sich ein Format von 1200×1500 px (Hochformat) bzw. 1600×1000 px (Querformat).

**Farben:** In `css/style.css` ganz oben unter `:root`. Aktuell dezente Lilatöne (`--accent: #b39ddb`) auf dunklem, leicht violettem Grund.

**Texte, Preise, Kontaktdaten:** Direkt in den HTML-Dateien. Die E-Mail-Adresse steht in Footer, Kontaktseite (`data-mail`) und Impressum.

**Kontaktformular:** Ohne Backend öffnet das Formular das E-Mail-Programm des Besuchers (mailto). Für den Versand über einen Dienst wie Formspree in `kontakt.html` das Attribut `action` des Formulars auf die Endpoint-URL setzen; der JavaScript-Code schickt die Daten dann per `fetch`.

**Impressum & Datenschutz:** Enthalten Platzhalter (Adresse, USt-ID, Versicherung) und müssen vor Veröffentlichung geprüft werden. Wer Google Fonts vermeiden möchte, kann die Schriften lokal einbinden und den Abschnitt in der Datenschutzerklärung entfernen.

## Veröffentlichen

**GitHub Pages:** Repository-Einstellungen → Pages → Branch `main`, Ordner `/ (root)`. Die Datei `.nojekyll` liegt bereits bei.

**Lokal testen:**

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```
