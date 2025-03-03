/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locale = pathname.split('/')[1]; // 获取当前语言

  const navigation = [
    { name: t('nav.home'), href: `/${locale}` },
    { name: t('nav.products'), href: `/${locale}/products` },
    { name: t('nav.solutions'), href: `/${locale}/solutions` },
    { name: t('nav.pricing'), href: `/${locale}/pricing` },
    { name: t('nav.download'), href: `/${locale}/download` },
    { name: t('nav.about'), href: `/${locale}/about` },
    { name: t('nav.blog'), href: `/${locale}/blog` },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center">
              <span className="text-xl font-bold text-gray-900">{t('appName')}</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  pathname === item.href
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="outline">{t('buttons.signIn')}</Button>
            <Button>{t('buttons.getStarted')}</Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  pathname === item.href
                    ? 'bg-gray-50 text-blue-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            <div className="flex items-center justify-between px-4">
              <Button variant="outline" className="w-full mr-2">{t('buttons.signIn')}</Button>
              <Button className="w-full ml-2">{t('buttons.getStarted')}</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 