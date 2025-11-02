# Tutto Pizza – Static Site (DE)

**Features**
- Startseite + Galerie (Logo & Ladenfotos)
- Speisekarte mit Online-Bestellfunktion (Lieferung/Abholung)
- Zahlungsauswahl: **Bar** oder **Karte** bei Übergabe
- Einfaches Kassen-/Admin-Panel (`kasse.html`) – zeigt Bestellungen (lokal gespeichert)
- Marken-Theme in Schwarz/Orange

**WICHTIG (Produktivbetrieb)**
Diese Version speichert Bestellungen **nur lokal im Browser** (localStorage). Für echten Team-Betrieb mit mehreren Geräten:
- Binde ein Backend an (z. B. **Firebase**, **Supabase**, **Airtable**, **Appwrite** oder ein kleines Node/Python-Backend).
- Oder nutze Form-Dienste (z. B. **Netlify Forms**) und verarbeite Webhooks zu Google Sheets/Slack.
- Für Kartenzahlung **online** (optional): Stripe Checkout-Link pro Bestellung generieren.
- Für TSE/GoBD-konforme Kassensysteme in DE bitte eine echte Kassenlösung integrieren (z. B. SumUp/GoBD-Kasse) – dieses Projekt bildet nur den Bestellfluss ab.

**Anpassen**
- Preise/Artikel in `menu.json` ändern.
- Farben/Abstände in `styles.css` (`:root`) anpassen.
- Kontakt/Adresse/Telefon im HTML und `index.html` Footer.
- Liefergebühr-Regel in `shop.js` anpassen (`fee = sum >= 25 ? 0 : 2.50`).

**Deploy**
- Ordner als ZIP hochladen → Netlify/Vercel → sofort live.
- Oder GitHub Pages aktivieren.

**Rechtliches**
- Impressum/Datenschutz verlinken und befüllen.
