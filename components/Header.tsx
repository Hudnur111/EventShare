import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  isAdmin?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'EventShare',
  subtitle,
  showBackButton = false,
  isAdmin = false,
}) => {
  return (
    <header className="bg-dark-950 border-b border-dark-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-dark-850 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-primary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <Link href="/" className="group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center font-bold text-dark-950 group-hover:shadow-lg group-hover:shadow-primary-500/50 transition-all">
                  E
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-xs text-dark-400 group-hover:text-dark-300 transition-colors">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {isAdmin && (
              <span className="px-3 py-1 bg-primary-500/20 text-primary-400 text-xs font-medium rounded-full border border-primary-500/30">
                Admin
              </span>
            )}
            <Link
              href="/"
              className="text-dark-400 hover:text-white text-sm transition-colors"
            >
              Start
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};