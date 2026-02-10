import React, { useState } from 'react';
import { Upload } from '@/types';
import { formatDate, formatFileSize } from '@/utils/helpers';

interface GalleryProps {
  uploads: Upload[];
  isAdmin?: boolean;
  onDelete?: (uploadId: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ uploads, isAdmin = false, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState<Upload | null>(null);

  if (uploads.length === 0) {
    return (
      <div className="bg-dark-850 border border-dark-700 rounded-xl p-12 text-center">
        <svg
          className="w-16 h-16 text-dark-600 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-dark-400 font-medium">Noch kein Bilder hochgeladen</p>
        <p className="text-dark-500 text-sm mt-1">
          Bilder erscheinen hier, sobald Gäste diese hochgeladen haben
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="group bg-dark-850 border border-dark-700 rounded-lg overflow-hidden hover:border-primary-500/50 transition-all cursor-pointer"
            onClick={() => setSelectedImage(upload)}
          >
            {/* Image Preview */}
            <div className="aspect-square bg-dark-900 overflow-hidden relative">
              <img
                src={upload.downloadUrl || '/placeholder-image.svg'}
                alt={upload.fileName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                {isAdmin && onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(upload.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="p-3 border-t border-dark-700">
              <p className="text-xs text-dark-400 truncate">{upload.fileName}</p>
              <p className="text-xs text-dark-500 mt-1">{formatFileSize(upload.fileSize)}</p>
              {upload.guestEmail && (
                <p className="text-xs text-primary-400 mt-1 truncate">{upload.guestEmail}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-dark-850 rounded-xl overflow-hidden max-w-2xl w-full border border-dark-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="aspect-video bg-dark-900 overflow-hidden relative">
              <img
                src={selectedImage.downloadUrl || '/placeholder-image.svg'}
                alt={selectedImage.fileName}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info */}
            <div className="p-6 space-y-4 border-t border-dark-700">
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold mb-1">
                  Dateiname
                </p>
                <p className="text-white font-mono text-sm break-all">{selectedImage.fileName}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold mb-1">
                    Dateigröße
                  </p>
                  <p className="text-white">{formatFileSize(selectedImage.fileSize)}</p>
                </div>
                <div>
                  <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold mb-1">
                    Hochgeladen am
                  </p>
                  <p className="text-white">{formatDate(selectedImage.uploadedAt)}</p>
                </div>
                {selectedImage.guestEmail && (
                  <div>
                    <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold mb-1">
                      Von
                    </p>
                    <p className="text-primary-400 truncate">{selectedImage.guestEmail}</p>
                  </div>
                )}
              </div>

              {selectedImage.guestName && (
                <div>
                  <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold mb-1">
                    Gast
                  </p>
                  <p className="text-white">{selectedImage.guestName}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-dark-700">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="flex-1 px-4 py-2 bg-dark-900 hover:bg-dark-800 text-white rounded-lg transition-colors"
                >
                  Schließen
                </button>
                {isAdmin && onDelete && (
                  <button
                    onClick={() => {
                      onDelete(selectedImage.id);
                      setSelectedImage(null);
                    }}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                  >
                    Löschen
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};