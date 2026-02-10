import React from 'react';
import { Event } from '@/types';
import { formatDateShort, getTimeRemaining } from '@/utils/helpers';
import Link from 'next/link';

interface EventCardProps {
  event: Event;
  isAdmin?: boolean;
  onDelete?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isAdmin = false,
  onDelete,
}) => {
  const timeRemaining = getTimeRemaining(event.uploadDeadline);
  const isActive = event.isActive && !timeRemaining.isExpired;

  return (
    <div className="bg-dark-850 border border-dark-700 rounded-xl overflow-hidden hover:border-primary-500/50 transition-all group">
      {/* Header */}
      <div className="p-4 border-b border-dark-700 bg-dark-900">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
              {event.name}
            </h3>
            <p className="text-xs text-dark-400 mt-1">
              Event-ID: <span className="text-primary-400 font-mono">{event.id}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isActive ? (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Aktiv
              </span>
            ) : (
              <span className="px-3 py-1 bg-dark-700 text-dark-400 text-xs font-semibold rounded-full">
                Abgelaufen
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold">
              Event-Datum
            </p>
            <p className="text-sm text-white mt-1">{formatDateShort(event.eventDate)}</p>
          </div>
          <div>
            <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold">
              Upload-Deadline
            </p>
            <p className="text-sm text-white mt-1">
              {formatDateShort(event.uploadDeadline)}
            </p>
          </div>
        </div>

        {/* Time Remaining */}
        {isActive && (
          <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-3">
            <p className="text-xs text-primary-400 font-semibold mb-1">Zeit verbleibend:</p>
            <p className="text-sm text-white font-mono">
              {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-dark-900 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-primary-400">{event.downloadsCount}</p>
            <p className="text-xs text-dark-400 mt-1">Downloads</p>
          </div>
          <div className="bg-dark-900 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-primary-400">-</p>
            <p className="text-xs text-dark-400 mt-1">Uploads</p>
          </div>
          <div className="bg-dark-900 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-primary-400">
              {Math.round(event.maxFileSize)}
            </p>
            <p className="text-xs text-dark-400 mt-1">Max. MB</p>
          </div>
        </div>

        {/* Owner Email */}
        <div className="pt-2 border-t border-dark-700">
          <p className="text-xs text-dark-400 uppercase tracking-wide font-semibold">
            Organisator
          </p>
          <p className="text-sm text-primary-400 font-mono mt-1">{event.ownerEmail}</p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-4 py-3 bg-dark-900 border-t border-dark-700 flex gap-2">
        {isAdmin ? (
          <>
            <Link
              href={`/admin/${event.id}`}
              className="flex-1 px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-colors text-center"
            >
              Dashboard
            </Link>
            {onDelete && (
              <button
                onClick={onDelete}
                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm font-semibold rounded-lg transition-colors"
              >
                Löschen
              </button>
            )}
          </>
        ) : (
          <Link
            href={`/event/${event.inviteToken}`}
            className="flex-1 px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-lg transition-colors text-center"
          >
            Event ansehen
          </Link>
        )}
      </div>
    </div>
  );
};