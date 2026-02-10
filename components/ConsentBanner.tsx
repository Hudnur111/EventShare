import React, { useState } from 'react';
import { PRIVACY_NOTICE, IMAGE_RIGHTS_WARNING, DATA_PROCESSING_CONSENT } from '@/utils/helpers';

interface ConsentBannerProps {
  ownerEmail: string;
  onConsentGiven: () => void;
  compact?: boolean;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({
  ownerEmail,
  onConsentGiven,
  compact = false,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [readPrivacy, setReadPrivacy] = useState(false);
  const [readRights, setReadRights] = useState(false);
  const [readConsent, setReadConsent] = useState(false);

  const allConsentGiven = readPrivacy && readRights && readConsent;

  if (compact) {
    return (
      <div className="bg-dark-850 border-l-4 border-primary-500 p-4 rounded-lg">
        <p className="text-sm text-dark-300">
          Durch das Hochladen von Bildern stimmen Sie unserer Datenschutzrichtlinie und
          Bildrechte-Erklärung zu.{' '}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-primary-400 hover:text-primary-300 underline font-medium"
          >
            Details anzeigen
          </button>
        </p>
        {showDetails && (
          <div className="mt-4 space-y-4 text-xs text-dark-400">
            <div className="bg-dark-900 p-3 rounded border border-dark-700">
              <h4 className="text-white font-semibold mb-2">Datenschutz</h4>
              <p>
                Deine Daten werden sicher gespeichert und 90 Tage nach dem Event automatisch
                gelöscht. Der Event-Organisator hat Zugriff auf deine hochgeladenen Bilder.
              </p>
            </div>
            <div className="bg-dark-900 p-3 rounded border border-dark-700">
              <h4 className="text-white font-semibold mb-2">Bildrechte</h4>
              <p>
                Du garantierst, dass du die Rechte an deinen Bildern hast oder die
                Genehmigung aller abgebildeten Personen erhalten hast.
              </p>
            </div>
            <p className="text-dark-500">
              Fragen? Kontaktiere: <span className="text-primary-400">{ownerEmail}</span>
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-dark-850 border border-dark-700 rounded-xl p-6 space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-2">Datenschutz & Rechtliche Hinweise</h2>
        <p className="text-dark-400 text-sm">
          Bitte lies und akzeptiere folgende Punkte, bevor du Bilder hochlädst:
        </p>
      </div>

      <div className="space-y-4">
        {/* Privacy Policy */}
        <div className="bg-dark-900 rounded-lg p-4 border border-dark-700">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={readPrivacy}
              onChange={(e) => setReadPrivacy(e.target.checked)}
              className="mt-1 w-5 h-5 accent-primary-500"
            />
            <div className="flex-1">
              <p className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                Datenschutzerklärung (DSGVO)
              </p>
              <p className="text-xs text-dark-400 mt-1">
                Deine Bilder und ggf. E-Mail-Adresse werden bei EventShare gespeichert und
                nach dem Event + 90 Tage automatisch gelöscht. Der Event-Organisator (
                <span className="text-primary-400">{ownerEmail}</span>) hat Zugriff auf deine
                hochgeladenen Bilder.
              </p>
            </div>
          </label>
        </div>

        {/* Image Rights */}
        <div className="bg-dark-900 rounded-lg p-4 border border-dark-700">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={readRights}
              onChange={(e) => setReadRights(e.target.checked)}
              className="mt-1 w-5 h-5 accent-primary-500"
            />
            <div className="flex-1">
              <p className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                Bildrechte-Erklärung
              </p>
              <p className="text-xs text-dark-400 mt-1">
                Du bestätigst, dass du die Rechte an den hochgeladenen Bildern hast oder die
                ausdrückliche Zustimmung aller abgebildeten Personen erhalten hast. Verstöße
                gehen zu Lasten des Uploaders.
              </p>
            </div>
          </label>
        </div>

        {/* Data Processing */}
        <div className="bg-dark-900 rounded-lg p-4 border border-dark-700">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={readConsent}
              onChange={(e) => setReadConsent(e.target.checked)}
              className="mt-1 w-5 h-5 accent-primary-500"
            />
            <div className="flex-1">
              <p className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                Einwilligung zur Verarbeitung
              </p>
              <p className="text-xs text-dark-400 mt-1">
                Ich stimme der Verarbeitung meiner Daten für die Event-Verwaltung zu und
                verstehe, dass meine Bilder mit dem Event-Organisator geteilt werden.
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-dark-900 border-l-4 border-primary-500 p-3 rounded">
        <p className="text-xs text-dark-400">
          <span className="font-semibold text-primary-400">Fragen zum Datenschutz?</span> Kontaktiere
          den Event-Organisator unter:{' '}
          <a href={`mailto:${ownerEmail}`} className="text-primary-400 hover:underline">
            {ownerEmail}
          </a>
        </p>
      </div>

      {allConsentGiven && (
        <button
          onClick={onConsentGiven}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95"
        >
          ✓ Alle Bedingungen akzeptiert - Fortfahren
        </button>
      )}

      {!allConsentGiven && (
        <div className="bg-dark-900/50 border border-dark-700 p-3 rounded-lg">
          <p className="text-sm text-dark-400">
            Bitte akzeptiere alle Punkte um fortzufahren
          </p>
        </div>
      )}
    </div>
  );
};