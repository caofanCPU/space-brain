/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, MoreHorizontal, Plus, Search } from 'lucide-react';
import Link from 'next/link';

// 模拟许可证数据，实际项目中应从数据库获取
const getLicenses = async () => {
  return [
    {
      id: '1',
      key: 'SB-IDE-PRO-1234-5678-9012',
      product: 'Space IDE',
      plan: 'Professional',
      status: 'active',
      validUntil: '2024-12-31',
      activations: 2,
      maxActivations: 3
    },
    {
      id: '2',
      key: 'SB-PROF-5678-9012-3456',
      product: 'Space Profiler',
      plan: 'Professional',
      status: 'active',
      validUntil: '2024-12-31',
      activations: 1,
      maxActivations: 2
    },
    {
      id: '3',
      key: 'SB-IDE-ENT-9012-3456-7890',
      product: 'Space IDE',
      plan: 'Enterprise',
      status: 'expired',
      validUntil: '2023-06-30',
      activations: 0,
      maxActivations: 10
    }
  ];
};

export default async function LicensesPage() {
  const t = await getTranslations('licenses');
  const licenses = await getLicenses();

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>
        <Button className="self-start">
          <Plus className="mr-2 h-4 w-4" /> {t('addLicense')}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder={t('searchPlaceholder')}
            className="flex h-10 w-full rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="all">{t('filters.allProducts')}</option>
            <option value="space-ide">Space IDE</option>
            <option value="space-profiler">Space Profiler</option>
          </select>
          <select className="flex h-10 w-full md:w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="all">{t('filters.allStatuses')}</option>
            <option value="active">{t('filters.active')}</option>
            <option value="expired">{t('filters.expired')}</option>
          </select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('yourLicenses')}</CardTitle>
          <CardDescription>{t('licensesDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-1 md:grid-cols-7 p-4 font-medium border-b">
              <div className="md:col-span-2">{t('table.product')}</div>
              <div>{t('table.plan')}</div>
              <div>{t('table.status')}</div>
              <div>{t('table.validUntil')}</div>
              <div>{t('table.activations')}</div>
              <div className="text-right">{t('table.actions')}</div>
            </div>
            
            {licenses.map((license) => (
              <div key={license.id} className="grid grid-cols-1 md:grid-cols-7 p-4 border-b last:border-0 items-center">
                <div className="md:col-span-2 font-medium mb-2 md:mb-0">
                  <div>{license.product}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-1">{license.key}</div>
                </div>
                <div className="mb-2 md:mb-0">{license.plan}</div>
                <div className="mb-2 md:mb-0">
                  <Badge variant={license.status === 'active' ? 'default' : 'secondary'}>
                    {t(`status.${license.status}`)}
                  </Badge>
                </div>
                <div className="mb-2 md:mb-0">{license.validUntil}</div>
                <div className="mb-2 md:mb-0">
                  {license.activations} / {license.maxActivations}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" title={t('actions.copy')}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title={t('actions.download')}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title={t('actions.more')}>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            {t('showing')} <strong>{licenses.length}</strong> {t('of')} <strong>{licenses.length}</strong> {t('licenses')}
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              {t('previous')}
            </Button>
            <Button variant="outline" size="sm" disabled>
              {t('next')}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('activation.title')}</CardTitle>
            <CardDescription>{t('activation.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('activation.licenseKeyLabel')}</label>
              <input
                type="text"
                placeholder={t('activation.licenseKeyPlaceholder')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('activation.productLabel')}</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">{t('activation.selectProduct')}</option>
                <option value="space-ide">Space IDE</option>
                <option value="space-profiler">Space Profiler</option>
              </select>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">{t('activation.activateButton')}</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('help.title')}</CardTitle>
            <CardDescription>{t('help.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h3 className="font-medium mb-2">{t('help.faq.title')}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/support/faq" className="text-primary hover:underline">
                    {t('help.faq.question1')}
                  </Link>
                </li>
                <li>
                  <Link href="/support/faq" className="text-primary hover:underline">
                    {t('help.faq.question2')}
                  </Link>
                </li>
                <li>
                  <Link href="/support/faq" className="text-primary hover:underline">
                    {t('help.faq.question3')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-4">{t('help.support')}</p>
              <Button variant="outline" asChild className="w-full">
                <Link href="/contact">
                  {t('help.contactSupport')}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 