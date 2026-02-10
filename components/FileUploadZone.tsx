import React, { useCallback, useState } from 'react';
import { validateFile, formatFileSize } from '@/utils/helpers';

interface FileUploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  allowedFileTypes?: string[];
  maxSizeMb?: number;
  maxFiles?: number;
  disabled?: boolean;
  isUploading?: boolean;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFilesSelected,
  allowedFileTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/heic',
  ],
  maxSizeMb = 50,
  maxFiles = 20,
  disabled = false,
  isUploading = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleFiles = useCallback(
    (files: FileList) => {
      const fileArray = Array.from(files);
      const newErrors: string[] = [];
      const validFiles: File[] = [];

      if (fileArray.length > maxFiles) {
        newErrors.push(`Maximum ${maxFiles} Dateien erlaubt`);
      }

      fileArray.forEach((file) => {
        const validation = validateFile(file, allowedFileTypes, maxSizeMb);
        if (validation.valid) {
          validFiles.push(file);
        } else if (validation.error) {
          newErrors.push(`${file.name}: ${validation.error}`);
        }
      });

      setErrors(newErrors);

      if (validFiles.length > 0) {
        onFilesSelected(validFiles);
      }
    },
    [allowedFileTypes, maxSizeMb, maxFiles, onFilesSelected]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!disabled && !isUploading) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all ${
          isDragging
            ? 'border-primary-400 bg-primary-500/10'
            : 'border-dark-700 bg-dark-850 hover:border-primary-500/50'
        } ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept={allowedFileTypes.join(',')}
          onChange={handleInputChange}
          disabled={disabled || isUploading}
          className="hidden"
          id="file-upload"
          aria-label="Datei-Upload"
        />

        <label htmlFor="file-upload" className="block">
          <div className="flex flex-col items-center justify-center space-y-3">
            {isUploading ? (
              <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
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
            )}

            <div>
              <p className="text-white font-semibold text-center">
                {isUploading ? 'Bilder werden hochgeladen...' : 'Bilder hier ablegen'}
              </p>
              <p className="text-dark-400 text-sm text-center mt-1">
                oder <span className="text-primary-400">Datei auswählen</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center pt-2">
              {allowedFileTypes.map((type) => (
                <span
                  key={type}
                  className="px-2 py-1 bg-dark-900 text-dark-400 text-xs rounded border border-dark-700"
                >
                  {type.split('/')[1].toUpperCase()}
                </span>
              ))}
            </div>

            <p className="text-xs text-dark-500 text-center pt-2">
              Max. Dateigröße: {maxSizeMb}MB • Max. {maxFiles} Dateien
            </p>
          </div>
        </label>
      </div>

      {errors.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 space-y-2">
          <p className="text-sm font-semibold text-red-400">Fehler beim Upload:</p>
          <ul className="text-xs text-red-300 space-y-1">
            {errors.map((error, idx) => (
              <li key={idx}>• {error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};