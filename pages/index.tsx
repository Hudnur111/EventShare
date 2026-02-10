import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-950">
      <Header title="EventShare" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <section className="text-center py-20 space-y-8">
          <div className="space-y-4">
            <div className="inline-block">
              <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tighter">
                Moderne Event-Foto
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                  {' '}
                  Sammlung
                </span>
              </h1>
            </div>
            <p className="text-xl text-dark-400 max-w-2xl mx-auto">
              Professionell, sicher und DSGVO-konform. Event-Organisator erstellt ein Event,
              Gäste laden Bilder auf – ohne Registrierung, ohne Umstände.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/admin"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Event erstellen
            </Link>

            <button className="inline-flex items-center justify-center px-8 py-4 bg-dark-850 hover:bg-dark-800 border border-dark-700 text-white font-bold rounded-lg transition-all">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Demo anschauen
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-3 gap-6 py-20">
          <div className="bg-dark-850 border border-dark-700 rounded-xl p-6 space-y-4 hover:border-primary-500/50 transition-all">
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Einfacher Einladungslink</h3>
            <p className="text-dark-400 text-sm">
              EventShare generates a simple link. Share via WhatsApp, email, or invitation –
              guests can upload without registration.
            </p>
          </div>

          <div className="bg-dark-850 border border-dark-700 rounded-xl p-6 space-y-4 hover:border-primary-500/50 transition-all">
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">DSGVO-Konformität</h3>
            <p className="text-dark-400 text-sm">
              Datenschutzhinweise, Einwilligung, Speicherdauer und Bildrechte-Erklärung
              eingebunden. Vollständig transparent.
            </p>
          </div>

          <div className="bg-dark-850 border border-dark-700 rounded-xl p-6 space-y-4 hover:border-primary-500/50 transition-all">
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Zentrale Galerie</h3>
            <p className="text-dark-400 text-sm">
              Der Organizer sieht alle hochgeladenen Bilder in einer übersichtlichen Galerie,
              kann downloaden und exportieren.
            </p>
          </div>

          <div className="bg-dark-850 border border-dark-700 rounded-xl p-6 space-y-4 hover:border-primary-500/50 transition-all">
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Upload-Fenster</h3>
            <p className="text-dark-400 text-sm">
              Du bestimmst, wann Uploads erlaubt sind und bis wann. Transparente
              Countdowns für alle Gäste.
            </p>
          </div>

          <div className="bg-dark-850 border border-dark-700 rounded-xl p-6 space-y-4 hover:border-primary-500/50 transition-all">
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13l-3 3m0 0l-3-3m3 3V8m0 0l3 3m-3-3l-3-3"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Download & Export</h3>
            <p className="text-dark-400 text-sm">
              Alle Fotos als ZIP exportieren, Download-Link erstellen oder direkt speichern.
              Volle Kontrolle.
            </p>
          </div>

          <div className="bg-dark-850 border border-dark-700 rounded-xl p-6 space-y-4 hover:border-primary-500/50 transition-all">
            <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Dark Mode & Modern Design</h3>
            <p className="text-dark-400 text-sm">
              Professionelles, modernes Design mit viel Platz, sauberen Karten und
              durchdachter Typographie.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">So funktioniert es</h2>
            <p className="text-dark-400">Drei einfache Schritte zur perfekten Event-Fotosammlung</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Event erstellen',
                description:
                  'Gib Event-Name, Datum und Upload-Fenster ein. EventShare generiert automatisch einen Einladungslink.',
              },
              {
                step: '2',
                title: 'Link teilen',
                description:
                  'Kopiere den Link und teile ihn per WhatsApp, Email oder Einladung. Keine Registrierung nötig.',
              },
              {
                step: '3',
                title: 'Bilder sammeln',
                description:
                  'Gäste laden ihre Bilder auf. Du siehst sie in deiner Galerie und kannst sie exportieren.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500/20 border-2 border-primary-500 rounded-full mb-4">
                  <span className="text-2xl font-bold text-primary-400">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-dark-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary-500/20 to-primary-600/20 border border-primary-500/30 rounded-2xl p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Bereit, dein erstes Event zu erstellen?
          </h2>
          <p className="text-dark-300 max-w-xl mx-auto">
            Kostenlos, schnell und völlig unbürokratisch. Keine versteckten Gebühren, keine
            langen Formulare.
          </p>
          <Link
            href="/admin"
            className="inline-block px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95"
          >
            Event erstellen
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-800 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-dark-400 text-sm">
            <p>© 2026 EventShare – Event Photo Sharing für Profis</p>
            <div className="flex gap-4 justify-center mt-4">
              <button className="hover:text-white transition-colors">Datenschutz</button>
              <button className="hover:text-white transition-colors">Impressum</button>
              <button className="hover:text-white transition-colors">Kontakt</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}