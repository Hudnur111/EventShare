import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Header } from '@/components/Header';
import { ConsentBanner } from '@/components/ConsentBanner';
import { FileUploadZone } from '@/components/FileUploadZone';
import { Gallery } from '@/components/Gallery';
import { useEventStore } from '@/store/eventStore';
import {
  formatDate,
  getTimeRemaining,
  isUploadWindowOpen,
  formatFileSize,
  generateId,
} from '@/utils/helpers';
import type { Event, Upload } from '@/types';

export default function EventGuestPage() {
  const router = useRouter();
  const { token } = router.query;
  const store = useEventStore();
  const [event, setEvent] = useState<Event | null>(null);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [consentGiven, setConsentGiven] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestName, setGuestName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  useEffect(() => {
    if (!token) return;

    // Try to find event by token
    const foundEvent = store.events.find((e) => e.inviteToken === token) || null;

    if (foundEvent) {
      setEvent(foundEvent);
      setUploads(store.eventUploads.filter((u) => u.eventId === foundEvent.id));
    }
  }, [token, store]);

  if (!event) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-dark-400">Event wird geladen...</p>
          </div>
        </main>
      </div>
    );
  }

  const timeRemaining = getTimeRemaining(event.uploadDeadline);
  const windowOpen = isUploadWindowOpen(event.uploadWindowStart, event.uploadDeadline);

  const handleFilesSelected = async (files: File[]) => {
    if (!consentGiven) {
      setUploadStatus({ type: 'error', message: 'Bitte akzeptiere die Datenschutzbedingungen' });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ type: null, message: '' });

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, this would upload to a server
      // For now, we'll just add them to the store
      const newUploads: Upload[] = files.map((file) => ({
        id: generateId(),
        eventId: event.id,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadedAt: new Date(),
        guestEmail: guestEmail || undefined,
        guestName: guestName || undefined,
        storagePath: `/uploads/${event.id}/${file.name}`,
        downloadUrl: URL.createObjectURL(file), // In real app, this would be server URL
        metadata: {
          uploadedFrom: 'web',
        },
      }));

      setUploads([...uploads, ...newUploads]);
      store.setEventUploads([...store.eventUploads, ...newUploads]);

      setUploadStatus({
        type: 'success',
        message: `${files.length} Bild${files.length > 1 ? 'er' : ''} erfolgreich hochgeladen! 🎉`,
      });

      setTimeout(() => {
        setUploadStatus({ type: null, message: '' });
      }, 4000);
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: 'Fehler beim Upload. Bitte versuchen Sie es später erneut.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Header title={event.name} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Status Cards */}
        {!windowOpen && (
          <div className="mb-8 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 font-semibold">
              ⚠️ Das Upload-Fenster für dieses Event ist geschlossen.
            </p>
            <p className="text-red-300 text-sm mt-1">
              Uploads waren bis {formatDate(event.uploadDeadline)} möglich.
            </p>
          </div>
        )}

        {windowOpen && (
          <div className="mb-8 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <p className="text-green-400 font-semibold">
              ✓ Uploads sind aktiv! Upload-Fenster schließt in {timeRemaining.days}d{' '}
              {timeRemaining.hours}h.
            </p>
            <p className="text-green-300 text-sm mt-1">
              Deadline: {formatDate(event.uploadDeadline)}
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Upload Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Welcome */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {event.name}
              </h1>
              {event.description && (
                <p className="text-dark-300">{event.description}</p>
              )}
            </div>

            {/* Consent Banner */}
            {!consentGiven && (
              <ConsentBanner
                ownerEmail={event.ownerEmail}
                onConsentGiven={() => setConsentGiven(true)}
              />
            )}

            {/* Guest Info Form */}
            {consentGiven && windowOpen && (
              <div className="bg-dark-850 border border-dark-700 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-bold text-white">Deine Informationen (optional)</h2>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Dein Name
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="z.B. Max Mustermann"
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                  <p className="text-xs text-dark-400 mt-1">
                    Wird nur für deine Unterlagen gespeichert
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Deine E-Mail-Adresse
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="deine@email.de"
                    className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
                  />
                  <p className="text-xs text-dark-400 mt-1">
                    Optional – du erhältst dann nach dem Event einen Download-Link für deine Bilder
                  </p>
                </div>
              </div>
            )}

            {/* Upload Zone */}
            {consentGiven && windowOpen && (
              <>
                <div>
                  <h2 className="text-lg font-bold text-white mb-4">Bilder hochladen</h2>
                  <FileUploadZone
                    onFilesSelected={handleFilesSelected}
                    allowedFileTypes={event.allowedFileTypes}
                    maxSizeMb={event.maxFileSize}
                    isUploading={isUploading}
                  />
                </div>

                {/* Upload Status */}
                {uploadStatus.type === 'success' && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-green-400 font-semibold">{uploadStatus.message}</p>
                  </div>
                )}

                {uploadStatus.type === 'error' && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-400 font-semibold">{uploadStatus.message}</p>
                  </div>
                )}
              </>
            )}

            {!consentGiven && (
              <div className="bg-dark-850 border border-dark-700 rounded-xl p-6 text-center">
                <p className="text-dark-400">
                  Bitte akzeptiere die Datenschutzbedingungen oben, um Bilder hochzuladen.
                </p>
              </div>
            )}

            {!windowOpen && (
              <div className="bg-dark-850 border border-dark-700 rounded-xl p-6 text-center">
                <p className="text-dark-400">
                  Uploads sind leider nicht mehr möglich. Die Deadline war am{' '}
                  {formatDate(event.uploadDeadline)}.
                </p>
              </div>
            )}
          </div>

          {/* Right: Info Sidebar */}
          <div className="space-y-6">
            {/* Event Info */}
            <div className="bg-dark-850 border border-dark-700 rounded-xl p-6 space-y-4 sticky top-20">
              <h3 className="text-lg font-bold text-white">Event-Informationen</h3>

              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold">
                  Hochgeladene Bilder
                </p>
                <p className="text-2xl font-bold text-primary-400 mt-1">{uploads.length}</p>
              </div>

              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold">
                  Speichergröße
                </p>
                <p className="text-sm text-white mt-1">
                  {formatFileSize(uploads.reduce((sum, u) => sum + u.fileSize, 0))}
                </p>
              </div>

              <div className="pt-4 border-t border-dark-700">
                <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold mb-2">
                  Event-Datum
                </p>
                <p className="text-sm text-white">
                  {new Date(event.eventDate).toLocaleDateString('de-DE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              {windowOpen && (
                <div className="pt-4 border-t border-dark-700 bg-primary-500/10 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
                  <p className="text-xs text-primary-400 uppercase tracking-wide font-semibold">
                    Upload-Deadline
                  </p>
                  <p className="text-sm text-primary-300 font-mono mt-1">
                    {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
                  </p>
                  <p className="text-xs text-primary-400 mt-2">
                    {formatDate(event.uploadDeadline)}
                  </p>
                </div>
              )}
            </div>

            {/* Help Card */}
            <div className="bg-dark-850 border border-dark-700 rounded-xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-white">Fragen?</h3>
              <p className="text-sm text-dark-400">
                Kontaktiere den Event-Organisator:
              </p>
              <a
                href={`mailto:${event.ownerEmail}`}
                className="inline-block px-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 rounded-lg text-sm font-semibold transition-colors border border-primary-500/30"
              >
                {event.ownerEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {uploads.length > 0 && (
          <div className="mt-16 space-y-6">
            <h2 className="text-2xl font-bold text-white">Alle hochgeladenen Bilder</h2>
            <Gallery uploads={uploads} />
          </div>
        )}
      </main>
    </div>
  );
}