// ID and Token Generation
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const generateEventId = (): string => {
  const prefix = 'evt_';
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const date = Date.now().toString(36).toUpperCase();
  return prefix + random + date;
};

export const generateToken = (length: number = 16): string => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
};

export const generateInviteToken = (): string => {
  return generateToken(20);
};

// File Validation
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
];

export const MAX_FILE_SIZE_MB = 50; // 50MB default

export const validateFile = (
  file: File,
  allowedTypes: string[] = ALLOWED_FILE_TYPES,
  maxSizeMb: number = MAX_FILE_SIZE_MB
): { valid: boolean; error?: string } => {
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Dateityp nicht erlaubt. Erlaubte Typen: ${allowedTypes
        .map((t) => t.split('/')[1].toUpperCase())
        .join(', ')}`,
    };
  }

  // Check file size
  const fileSizeMb = file.size / (1024 * 1024);
  if (fileSizeMb > maxSizeMb) {
    return {
      valid: false,
      error: `Datei zu groß. Maximum: ${maxSizeMb}MB, Ihre Datei: ${fileSizeMb.toFixed(
        2
      )}MB`,
    };
  }

  return { valid: true };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

// Date/Time Utilities
export const isUploadWindowOpen = (
  uploadWindowStart: Date,
  uploadDeadline: Date
): boolean => {
  const now = new Date();
  return now >= uploadWindowStart && now <= uploadDeadline;
};

export const getTimeRemaining = (deadline: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
} => {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isExpired: false };
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const formatDateShort = (date: Date): string => {
  return new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
};

// Email Validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
};

// URL Utilities
export const getInviteUrl = (token: string): string => {
  const base =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return `${base}/event/${token}`;
};

export const getAdminDashboardUrl = (eventId: string, token: string): string => {
  const base =
    typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return `${base}/admin/${eventId}?token=${token}`;
};

// GDPR & Privacy Utilities
export const PRIVACY_NOTICE = `
Datenschutzhinweis nach DSGVO
=============================

Verantwortlicher: Siehe Kontaktdaten oben
Zweck: Sammlung von Event-Bildern zur gemeinsamen Nutzung
Speicherdauer: Nach dem Event + 90 Tage (danach automatische Löschung)
Basis der Verarbeitung: Ihre freiwillige Einwilligung

Ihre Rechte:
- Kostenlose Kopie Ihrer Daten
- Recht auf Berichtigung und Löschung
- Recht auf Widerspruch

Kontakt für Datenschutzfragen: [OWNER_EMAIL]
`;

export const IMAGE_RIGHTS_WARNING = `
Bildrechte-Erklärung
===================

Ich erkläre hiermit, dass ich:
✓ Nur meine eigenen Bilder hochlade
✓ Oder die erforderliche Zustimmung aller abgebildeten Personen erhalten habe
✓ Die Nutzungsrechte für diese Bilder benötige

Verstöße gegen diese Erklärung sind meine Verantwortung.
`;

export const DATA_PROCESSING_CONSENT = `
Einwilligung zur Datenverarbeitung
===================================

Ich stimme der Speicherung meiner Bilder und optional meiner E-Mail-Adresse zu:
✓ Zum gemeinsamen Event-Zugang
✓ Zum Versand meiner Bilder per E-Mail nach dem Event
✓ Zur Übertragung an den Event-Organizer

Diese Einwilligung kann jederzeit widerrufen werden.
`;