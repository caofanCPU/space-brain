/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface CtaSectionProps {
  title: string;
  subtitle: string;
}

export default function CtaSection({ title, subtitle }: CtaSectionProps) {
  const t = useTranslations('common.buttons');
  const pathname = usePathname();
  const locale = pathname.split('/')[1]; // 获取当前语言

  return (
    <div className="bg-blue-600">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
          <br />
          <span className="text-xl font-normal">{subtitle}</span>
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <Button size="lg" variant="secondary" asChild>
            <Link href={`/${locale}/download`}>{t('download')}</Link>
          </Button>
          <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-blue-600" size="lg" asChild>
            <Link href={`/${locale}/contact`}>{t('contactUs')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 