# EventShare - Features & Roadmap

## ✅ Implementiert (MVP)

### Kern-Features
- [x] Event-Erstellung mit vollständiger Konfiguration
- [x] Automatische Einladungslinks mit Token-Authentifizierung
- [x] Admin-Dashboard mit Event-Übersicht
- [x] Gäste-Upload-Seite ohne Registrierung
- [x] Drag-Drop Upload-Zone mit Datei-Validierung
- [x] Responsive Gallery mit Lightbox
- [x] DSGVO-Datenschutzbanner mit Konsent-Tracking
- [x] Dark Mode Design (Tailwind)
- [x] TypeScript für Type Safety
- [x] Zustand State Management

### Komponenten
- [x] Header (Navigation, Admin-Badge)
- [x] ConsentBanner (3-Teil Datenschutz)
- [x] FileUploadZone (Drag-Drop, Validierung)
- [x] Gallery (Lightbox-Mode)
- [x] EventCard (Event-Übersicht)

### Pages
- [x] Landingpage (Marketing, Features, How-It-Works)
- [x] Event-Erstellung (/admin)
- [x] Admin-Dashboard (/admin/[eventId])
- [x] Gäste-Upload-Seite (/event/[token])

## 🔄 Teilweise Implementiert

- [ ] **Email-Benachrichtigungen** – Struktur vorhanden, Backend fehlt
- [ ] **Download-Export** – UI vorhanden, Download-Logik fehlt
- [ ] **QR-Code** – qrcode.react installiert, noch nicht integriert
- [ ] **Datei-Upload zu Server** – Aktuell nur in-Memory mit Zustand

## 🚀 Geplante Features (Phase 2)

### Backend-Integration
- [ ] **Node.js/Express API Server** für Event-Verwaltung
- [ ] **Database** (PostgreSQL/MongoDB) für persistente Speicherung
- [ ] **File Storage** (AWS S3 / Google Cloud Storage / Local)
- [ ] **Email-Service** (SendGrid / Postmark) für Benachrichtigungen

### Admin-Features
- [ ] **Event-Einstellungen editieren** (Name, Dates, etc.)
- [ ] **Upload-Fenster verlängern**
- [ ] **Gäste-Liste** (Wer hat hochgeladen)
- [ ] **Bulk-Download** als ZIP
- [ ] **Cloud-Sync** (Google Drive, OneDrive)
- [ ] **Metadaten-Export** (CSV mit Upload-Info)

### Gäste-Features
- [ ] **Email-Benachrichtigung** mit Download-Link
- [ ] **Persönliche Download-Links** für Gäste
- [ ] **Upload-Fortschritt-Anzeige** (Prozent-Bar)
- [ ] **Bildbearbeitung vor Upload** (Basic Crop/Rotate)
- [ ] **Video-Upload** (30sec-Clips)
- [ ] **Favoriten markieren**

### Sicherheit & Datenschutz
- [ ] **HTTPS/TLS** erzwingen
- [ ] **Rate-Limiting** gegen Abuse
- [ ] **CAPTCHA** gegen Bot-Uploads
- [ ] **Virenscanning** (ClamAV)
- [ ] **Automatische Löschung** nach Deadline + 90 Tage
- [ ] **Audit-Log** (Wer hat was wann gelöscht)

### UX-Verbesserungen
- [ ] **Upload-Status per Email**
- [ ] **Galerie-Filter** (Nach Datum, Gast, etc.)
- [ ] **Galerie-Sortierung**
- [ ] **Dark Mode Toggle** (aktuell immer Dark)
- [ ] **Mehrsprachigkeit** (EN, DE, FR, etc.)
- [ ] **Offline-Modus** (PWA)

### Analytics & Admin
- [ ] **Besucherzähler** pro Event
- [ ] **Upload-Statistiken** (Zeitverlauf, Top-Gäste)
- [ ] **Storage-Monitoring**
- [ ] **Admin-Notifications** bei neuen Uploads
- [ ] **Event-Archivierung**

## 🛠️ Technische Schulden & Verbesserungen

- [ ] **Error Boundaries** für Fehlerbehandlung
- [ ] **Loading States** überall
- [ ] **Retry-Logik** für fehlgeschlagene Uploads
- [ ] **Caching** (SWR oder React Query)
- [ ] **Tests** (Unit, Integration, E2E)
  - [ ] Jest für Unit-Tests
  - [ ] Cypress für E2E
- [ ] **Performance-Optimierung**
  - [ ] Image Compression vor Upload
  - [ ] WebP Conversion
  - [ ] Lazy Loading für Galerie
- [ ] **Accessibility (A11y)**
  - [ ] ARIA-Labels
  - [ ] Keyboard Navigation
  - [ ] Screen Reader Support
- [ ] **SEO**
  - [ ] Meta-Tags
  - [ ] Open Graph
  - [ ] Sitemap

## 📋 Mögliche Premium-Features

Diese könnten im Zukunft kostenpflichtig sein:

- 🔧 **Custom Branding** (Logo, Farben, Domain)
- 👥 **Team-Verwaltung** (Mehrere Organizer pro Event)
- 📊 **Analytics Dashboard**
- 🔐 **Passwort-Schutz** für Events
- 🎨 **Event-Themes** (Template-Layouts)
- 📱 **Mobile App** (iOS/Android Native)
- 🤖 **AI Features** (Auto-Tagging, Face Recognition)
- 🌍 **Geo-Tagging & Maps**

## 🔄 Development Workflow

```bash
# 1. Branch erstellen
git checkout -b feature/xyz

# 2. Dependencies installieren (falls neue hinzugefügt)
npm install

# 3. Dev-Server starten
npm run dev

# 4. TypeScript checken
npx tsc --noEmit

# 5. Code committen
git add .
git commit -m "feat: Add XYZ"

# 6. PR erstellen & Review
```

## 📞 Support & Kontakt

Bei Fragen oder Featurevorschlägen: [denny.svalin2@gmail.com]

---

**Last Updated**: Feb 2026
**Maintainer**: EventShare Team