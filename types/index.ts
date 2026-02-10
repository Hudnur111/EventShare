// Event Types
export interface Event {
  id: string;
  name: string;
  ownerEmail: string;
  eventDate: Date;
  uploadDeadline: Date;
  uploadWindowStart: Date;
  description?: string;
  maxFileSize: number; // in MB
  allowedFileTypes: string[]; // e.g., ['image/jpeg', 'image/png']
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  inviteToken: string;
  downloadLink?: string;
  downloadsCount: number;
}

// Upload Types
export interface Upload {
  id: string;
  eventId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: Date;
  guestEmail?: string;
  guestName?: string;
  storagePath: string;
  downloadUrl?: string;
  metadata?: {
    width?: number;
    height?: number;
    uploadedFrom?: 'web' | 'mobile';
  };
}

// User Consent & Privacy
export interface UserConsent {
  consentId: string;
  eventId: string;
  timestamp: Date;
  guestEmail?: string;
  consentType: 'privacy_policy' | 'image_rights' | 'data_processing';
  version: string;
  ipAddress?: string;
  userAgent?: string;
}

// Guest Session
export interface GuestSession {
  sessionId: string;
  eventId: string;
  guestEmail?: string;
  createdAt: Date;
  lastActivityAt: Date;
  uploadsCount: number;
  ipAddress?: string;
}

// Admin Session
export interface AdminSession {
  sessionId: string;
  eventId: string;
  email: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  ipAddress?: string;
}

// Download Export
export interface DownloadExport {
  id: string;
  eventId: string;
  createdAt: Date;
  expiresAt: Date;
  downloadUrl: string;
  format: 'zip' | 'cloud-link';
  fileCount: number;
  totalSize: number;
  downloadCount: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

// Event Statistics
export interface EventStats {
  eventId: string;
  totalUploads: number;
  totalSize: number;
  uniqueGuests: number;
  downloadsCount: number;
  lastUploadAt?: Date;
  consentRate: number; // percentage
}