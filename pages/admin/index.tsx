import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { useEventStore } from '@/store/eventStore';
import { generateEventId, generateInviteToken, getInviteUrl } from '@/utils/helpers';
import Link from 'next/link';
import type { Event } from '@/types';

export default function CreateEventPage() {
  const store = useEventStore();
  const [formData, setFormData] = useState({
    name: '',
    ownerEmail: '',
    eventDate: '',
    uploadWindowStart: '',
    uploadDeadline: '',
    description: '',
    maxFileSize: 50,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createdEvent, setCreatedEvent] = useState<Event | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Event-Name erforderlich';
    if (!formData.ownerEmail.trim()) newErrors.ownerEmail = 'E-Mail erforderlich';
    if (!formData.eventDate) newErrors.eventDate = 'Event-Datum erforderlich';
    if (!formData.uploadWindowStart)
      newErrors.uploadWindowStart = 'Upload-Start erforderlich';
    if (!formData.uploadDeadline) newErrors.uploadDeadline = 'Upload-Deadline erforderlich';

    // Date validations
    const eventDate = new Date(formData.eventDate);
    const uploadStart = new Date(formData.uploadWindowStart);
    const uploadDeadline = new Date(formData.uploadDeadline);
    const now = new Date();

    if (eventDate <= now) newErrors.eventDate = 'Event-Datum muss in der Zukunft liegen';
    if (uploadStart <= now)
      newErrors.uploadWindowStart = 'Upload-Start muss in der Zukunft liegen';
    if (uploadDeadline <= uploadStart)
      newErrors.uploadDeadline = 'Deadline muss nach Upload-Start liegen';
    if (uploadDeadline > eventDate)
      newErrors.uploadDeadline = 'Deadline sollte vor oder am Event-Datum liegen';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newEvent: Event = {
      id: generateEventId(),
      inviteToken: generateInviteToken(),
      name: formData.name,
      ownerEmail: formData.ownerEmail,
      eventDate: new Date(formData.eventDate),
      uploadWindowStart: new Date(formData.uploadWindowStart),
      uploadDeadline: new Date(formData.uploadDeadline),
      description: formData.description || undefined,
      maxFileSize: formData.maxFileSize,
      allowedFileTypes: [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'image/heic',
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      downloadsCount: 0,
    };

    store.addEvent(newEvent);
    setCreatedEvent(newEvent);
  };

  if (createdEvent) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Header title="Event erstellt!" subtitle="Glückwunsch" showBackButton />

        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Event erfolgreich erstellt!</h2>
              <p className="text-dark-300">
                Ihre Event-ID: <span className="text-primary-400 font-mono">{createdEvent.id}</span>
              </p>
            </div>

            <div className="bg-dark-850 rounded-lg p-6 space-y-4">
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold mb-2">
                  Ihr Einladungslink
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={getInviteUrl(createdEvent.inviteToken)}
                    readOnly
                    className="flex-1 bg-dark-900 border border-dark-700 rounded px-3 py-2 text-sm text-primary-400 font-mono"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(getInviteUrl(createdEvent.inviteToken));
                    }}
                    className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded font-semibold transition-colors"
                  >
                    Kopieren
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-dark-700 space-y-3">
                <p className="text-sm text-dark-300">
                  <strong>Diesen Link</strong> können Sie jetzt weitergeben:
                </p>
                <ul className="space-y-2 text-sm text-dark-400">
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>Per WhatsApp verschicken</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>In E-Mail einfügen</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>In Druckeinladung abdrucken</span>
                  </li>
                  <li className="flex gap-2">
                    <span>✓</span>
                    <span>In Instagramstory posten</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Link
                href={`/admin/${createdEvent.id}`}
                className="flex-1 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition-all text-center"
              >
                Zum Dashboard
              </Link>
              <button
                onClick={() => setCreatedEvent(null)}
                className="flex-1 px-6 py-3 bg-dark-850 hover:bg-dark-800 text-white font-bold rounded-lg transition-colors border border-dark-700"
              >
                Weiteres Event erstellen
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <Header title="Event erstellen" showBackButton />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-dark-850 border border-dark-700 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Event-Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="z.B. 'Hochzeit Anna & Peter'"
                className={`w-full bg-dark-900 border rounded-lg px-4 py-2 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors ${
                  errors.name ? 'border-red-500' : 'border-dark-700'
                }`}
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>

            {/* Owner Email */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Ihre E-Mail-Adresse *
              </label>
              <input
                type="email"
                value={formData.ownerEmail}
                onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                placeholder="organizer@example.com"
                className={`w-full bg-dark-900 border rounded-lg px-4 py-2 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors ${
                  errors.ownerEmail ? 'border-red-500' : 'border-dark-700'
                }`}
              />
              {errors.ownerEmail && (
                <p className="text-xs text-red-400 mt-1">{errors.ownerEmail}</p>
              )}
              <p className="text-xs text-dark-400 mt-1">
                Sie erhalten hier die hochgeladenen Bilder und Benachrichtigungen
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Beschreibung (optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="z.B. 'Vielen Dank, dass du dabei warst!'"
                rows={3}
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Event-Datum *
              </label>
              <input
                type="datetime-local"
                value={formData.eventDate}
                onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                className={`w-full bg-dark-900 border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors ${
                  errors.eventDate ? 'border-red-500' : 'border-dark-700'
                }`}
              />
              {errors.eventDate && <p className="text-xs text-red-400 mt-1">{errors.eventDate}</p>}
            </div>

            {/* Upload Window */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Upload-Fenster Start *
                </label>
                <input
                  type="datetime-local"
                  value={formData.uploadWindowStart}
                  onChange={(e) =>
                    setFormData({ ...formData, uploadWindowStart: e.target.value })
                  }
                  className={`w-full bg-dark-900 border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors ${
                    errors.uploadWindowStart ? 'border-red-500' : 'border-dark-700'
                  }`}
                />
                {errors.uploadWindowStart && (
                  <p className="text-xs text-red-400 mt-1">{errors.uploadWindowStart}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Upload-Deadline *
                </label>
                <input
                  type="datetime-local"
                  value={formData.uploadDeadline}
                  onChange={(e) =>
                    setFormData({ ...formData, uploadDeadline: e.target.value })
                  }
                  className={`w-full bg-dark-900 border rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500 transition-colors ${
                    errors.uploadDeadline ? 'border-red-500' : 'border-dark-700'
                  }`}
                />
                {errors.uploadDeadline && (
                  <p className="text-xs text-red-400 mt-1">{errors.uploadDeadline}</p>
                )}
              </div>
            </div>

            {/* Max File Size */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Max. Dateigröße: <span className="text-primary-400">{formData.maxFileSize}MB</span>
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={formData.maxFileSize}
                onChange={(e) =>
                  setFormData({ ...formData, maxFileSize: parseInt(e.target.value) })
                }
                className="w-full"
              />
              <p className="text-xs text-dark-400 mt-2">
                Gäste können nur Dateien bis {formData.maxFileSize}MB hochladen
              </p>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-dark-700 flex gap-3">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95"
              >
                Event erstellen
              </button>
              <Link
                href="/"
                className="px-6 py-3 bg-dark-900 hover:bg-dark-800 text-white font-bold rounded-lg transition-colors border border-dark-700"
              >
                Abbrechen
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}