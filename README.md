# Patrizia Ruthmann – Fotografie · Videoschnitt · Text

Statische, deutschsprachige Website für eine Fotografin, Cutterin und Autorin. Kein Build-Schritt, keine Abhängigkeiten. Einfach hochladen oder über GitHub Pages veröffentlichen.

## Seiten

| Datei | Inhalt |
|---|---|
| `index.html` | Startseite: Hero, drei Disziplinen, Vorstellung, Kennzahlen, Portfolio-Auszug, Showreel, neueste Blogbeiträge, Kundenstimmen |
| `fotografie.html` | Foto-Galerie mit Filter (Portrait, Reportage, Hochzeit, Landschaft) und Lightbox |
| `video.html` | Showreel, Filmprojekte mit Video-Lightbox, Ablauf, Werkzeug |
| `texte.html` | Bücher, Leseprobe, Veröffentlichungen, Lektorat und Auftragstexte |
| `blog.html` + `blog/*.html` | Blog-Übersicht mit Filter und Newsletter-Box sowie drei Beispielartikel |
| `ueber-mich.html` | Werdegang, Haltung, Stationen, Fakten |
| `leistungen.html` | Preispakete für Fotografie, Videoschnitt und Text sowie FAQ |
| `kontakt.html` | Kontaktdaten und Anfrageformular mit Validierung |
| `impressum.html` / `datenschutz.html` | Rechtliche Seiten (Vorlagen mit Platzhaltern) |

## Struktur

```
├── *.html               Seiten (siehe Tabelle)
├── blog/                Einzelne Blogartikel
├── css/style.css        Design (Farben als CSS-Variablen in :root)
├── js/main.js           Navigation, Scroll-Animationen, Filter, Bild- und Video-Lightbox, Formulare
└── assets/img/          Bilder (aktuell SVG-Platzhalter)
    ├── portfolio/       Galeriebilder, benannt nach Kategorie
    ├── video/           Vorschaubilder der Filmprojekte (16:9)
    └── buecher/         Buchcover (2:3)
```

## Anpassen

**Bilder ersetzen:** Alle Dateien in `assets/img/` sind Platzhalter. Eigene Fotos (JPG/WebP) einfügen und die `src`-Pfade in den HTML-Dateien anpassen. Empfohlene Formate: Galerie 1200×1500 px (hoch) bzw. 1600×1000 px (quer), Video-Vorschau 1600×900 px, Buchcover 800×1200 px.

**Videos einbinden:** In `video.html` und `index.html` bei jedem Element mit `data-video=""` einen Link eintragen, z. B. `https://www.youtube.com/watch?v=…`, `https://vimeo.com/…` oder eine MP4-Datei. Das Video wird erst beim Klick geladen (YouTube im No-Cookie-Modus).

**Blogbeitrag hinzufügen:** Eine der Dateien in `blog/` kopieren, Titel, Datum, Text und Bild anpassen, dann eine Karte in `blog.html` (und optional `index.html`) ergänzen. Das Attribut `data-cat` steuert den Filter.

**Farben:** In `css/style.css` ganz oben unter `:root`. Aktuell dezente Lilatöne (`--accent: #b39ddb`) auf dunklem, leicht violettem Grund.

**Texte, Preise, Kontaktdaten:** Direkt in den HTML-Dateien. Die E-Mail-Adresse steht in Footer, Kontaktseite (`data-mail`) und Impressum.

**Kontaktformular:** Ohne Backend öffnet das Formular das E-Mail-Programm des Besuchers (mailto). Für den Versand über einen Dienst wie Formspree in `kontakt.html` das Attribut `action` des Formulars auf die Endpoint-URL setzen. Die Newsletter-Box in `blog.html` ist ebenfalls ein Platzhalter und muss an einen Versanddienst angeschlossen werden.

**Impressum & Datenschutz:** Enthalten Platzhalter (Adresse, USt-ID, Versicherung, Newsletter-Anbieter) und müssen vor Veröffentlichung geprüft werden.

## Veröffentlichen

**GitHub Pages:** Repository-Einstellungen → Pages → Branch wählen, Ordner `/ (root)`. Die Datei `.nojekyll` liegt bereits bei.

**Lokal testen:**

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```
