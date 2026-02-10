import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Header } from '@/components/Header';
import { Gallery } from '@/components/Gallery';
import { useEventStore } from '@/store/eventStore';
import {
  formatDate,
  getTimeRemaining,
  getInviteUrl,
  formatFileSize,
  isUploadWindowOpen,
} from '@/utils/helpers';
import type { Event, Upload } from '@/types';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { eventId } = router.query;
  const store = useEventStore();
  const [event, setEvent] = useState<Event | null>(null);
  const [uploads, setUploads] = useState<Upload[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!eventId) return;

    // Try to find event in store
    let foundEvent = store.currentEvent;
    if (!foundEvent) {
      const allEvents = store.events;
      foundEvent = allEvents.find((e) => e.id === eventId) || null;
    }

    if (foundEvent) {
      setEvent(foundEvent);
      // In a real app, fetch uploads from backend
      setUploads(store.eventUploads);
    }
  }, [eventId, store]);

  if (!event) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Header title="Event-Dashboard" showBackButton />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-dark-400">Event wird geladen...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const timeRemaining = getTimeRemaining(event.uploadDeadline);
  const windowOpen = isUploadWindowOpen(event.uploadWindowStart, event.uploadDeadline);
  const totalSize = uploads.reduce((sum, u) => sum + u.fileSize, 0);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(getInviteUrl(event.inviteToken));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeleteUpload = (uploadId: string) => {
    setUploads(uploads.filter((u) => u.id !== uploadId));
  };

  return (
    <div className="min-h-screen bg-dark-950">
      <Header title={event.name} subtitle="Admin-Dashboard" showBackButton isAdmin />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          <div className="bg-dark-850 border border-dark-700 rounded-xl p-6">
            <p className="text-dark-400 text-sm font-semibold uppercase tracking-wide">
              Hochgeladene Bilder
            </p>
            <p className="text-4xl font-bold text-primary-400 mt-2">{uploads.length}</p>
            <p className="text-xs text-dark-500 mt-2">{formatFileSize(totalSize)} gesamt</p>
          </div>

          <div className="bg-dark-850 border border-dark-700 rounded-xl p-6">
            <p className="text-dark-400 text-sm font-semibold uppercase tracking-wide">
              Upload-Status
            </p>
            <p className="text-2xl font-bold text-white mt-2">
              {windowOpen ? (
                <span className="text-green-400">✓ Aktiv</span>
              ) : (
                <span className="text-dark-400">Beendet</span>
              )}
            </p>
            <p className="text-xs text-dark-500 mt-2">
              {windowOpen ? 'Gäste können noch hochladen' : 'Upload-Deadline überschritten'}
            </p>
          </div>

          <div className="bg-dark-850 border border-dark-700 rounded-xl p-6">
            <p className="text-dark-400 text-sm font-semibold uppercase tracking-wide">
              Zeit verbleibend
            </p>
            <p className="text-2xl font-bold text-white mt-2 font-mono">
              {timeRemaining.isExpired ? (
                <span className="text-red-400">Abgelaufen</span>
              ) : (
                <span className="text-amber-400">
                  {timeRemaining.days}d {timeRemaining.hours}h
                </span>
              )}
            </p>
            <p className="text-xs text-dark-500 mt-2">
              Bis {new Date(event.uploadDeadline).toLocaleDateString('de-DE')}
            </p>
          </div>

          <div className="bg-dark-850 border border-dark-700 rounded-xl p-6">
            <p className="text-dark-400 text-sm font-semibold uppercase tracking-wide">
              Downloads
            </p>
            <p className="text-4xl font-bold text-primary-400 mt-2">{event.downloadsCount}</p>
            <p className="text-xs text-dark-500 mt-2">Mal heruntergeladen</p>
          </div>
        </div>

        {/* Invite Link Card */}
        <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 border border-primary-500/30 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-bold text-white mb-4">Gäste einladen</h2>

          <div className="bg-dark-850 rounded-lg p-4 border border-dark-700 mb-4">
            <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold mb-2">
              Ihr Einladungslink
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={getInviteUrl(event.inviteToken)}
                readOnly
                className="flex-1 bg-dark-900 border border-dark-700 rounded px-3 py-2 text-sm text-primary-400 font-mono"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded font-semibold transition-colors ${
                  copied
                    ? 'bg-green-500 text-white'
                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                }`}
              >
                {copied ? '✓ Kopiert' : 'Kopieren'}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <button className="p-4 bg-dark-850 hover:bg-dark-800 border border-dark-700 rounded-lg transition-colors text-left">
              <p className="text-sm font-semibold text-white mb-1">WhatsApp teilen</p>
              <p className="text-xs text-dark-400">Link in WhatsApp öffnen</p>
            </button>
            <button className="p-4 bg-dark-850 hover:bg-dark-800 border border-dark-700 rounded-lg transition-colors text-left">
              <p className="text-sm font-semibold text-white mb-1">E-Mail versenden</p>
              <p className="text-xs text-dark-400">Default Mail-Client öffnen</p>
            </button>
            <button className="p-4 bg-dark-850 hover:bg-dark-800 border border-dark-700 rounded-lg transition-colors text-left">
              <p className="text-sm font-semibold text-white mb-1">QR-Code generieren</p>
              <p className="text-xs text-dark-400">Code für Druckausgabe</p>
            </button>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-dark-850 border border-dark-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Event-Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold">
                  Event-ID
                </p>
                <p className="text-sm text-white font-mono mt-1">{event.id}</p>
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold">
                  Organisator-Email
                </p>
                <p className="text-sm text-primary-400 mt-1">{event.ownerEmail}</p>
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold">
                  Event-Datum
                </p>
                <p className="text-sm text-white mt-1">{formatDate(event.eventDate)}</p>
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold">
                  Upload-Fenster
                </p>
                <p className="text-sm text-white mt-1">
                  {formatDate(event.uploadWindowStart)} bis {formatDate(event.uploadDeadline)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-dark-850 border border-dark-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Upload-Einstellungen</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold">
                  Max. Dateigröße
                </p>
                <p className="text-sm text-white mt-1">{event.maxFileSize}MB pro Datei</p>
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold">
                  Erlaubte Formate
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {event.allowedFileTypes.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 bg-dark-900 text-primary-400 text-xs rounded border border-dark-700"
                    >
                      {type.split('/')[1].toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold">
                  Beschreibung
                </p>
                <p className="text-sm text-dark-300 mt-1">
                  {event.description || '(Keine Beschreibung)'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Hochgeladene Bilder</h2>
            <Gallery uploads={uploads} isAdmin={true} onDelete={handleDeleteUpload} />
          </div>
        </div>

        {/* Export & Download */}
        {uploads.length > 0 && (
          <div className="mt-12 bg-primary-500/10 border border-primary-500/30 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Bilder exportieren</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="p-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Als ZIP herunterladen ({formatFileSize(totalSize)})
              </button>
              <button className="p-4 bg-dark-850 hover:bg-dark-800 text-white rounded-lg font-semibold transition-colors border border-dark-700 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                Download-Link erstellen
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}