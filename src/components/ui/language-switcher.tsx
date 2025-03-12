'use client';

import { useRef, useState, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { locales } from '@/i18n';
import { appConfig, Locale } from '@/lib/appConfig';

interface LanguageSwitcherProps {
  currentLocale: string;
  isScrolled?: boolean;
  onLanguageChange: (locale: Locale) => void;
}

export function LanguageSwitcher({ currentLocale, isScrolled, onLanguageChange }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={languageDropdownRef}>
      <button
        className={cn(
          "p-2 rounded-full transition-colors duration-200 flex items-center",
          isScrolled ? "text-[#1a1a1a] hover:bg-gray-100" : "text-white hover:bg-[#3C3F41]"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-5 w-5" />
        <span className="ml-1 text-xs">{currentLocale.toUpperCase()}</span>
        <ChevronDown className={cn(
          "ml-1 h-4 w-4 transition-transform duration-200",
          isOpen ? "rotate-180" : ""
        )} />
      </button>

      <div
        className={cn(
          "absolute right-0 mt-1 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-right z-50",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="language-menu"
      >
        <div className="py-1" role="none">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => {
                if (locale === currentLocale) {
                  setIsOpen(false);
                  return;
                }
                onLanguageChange(locale);
              }}
              className={cn(
                "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100",
                currentLocale === locale ? "text-[#087CFA] font-medium" : "text-gray-700"
              )}
              role="menuitem"
            >
              {appConfig.i18n.localeLabels[locale as Locale]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}