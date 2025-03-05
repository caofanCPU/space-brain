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
import { ArrowRight, Apple, MonitorIcon, TerminalIcon } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default async function DownloadPage({ searchParams }: { searchParams: { product?: string } }) {
  const t = await getTranslations('download');
  const selectedProduct = searchParams.product || 'space-ide';

  const products = {
    'space-ide': {
      name: 'Space IDE',
      description: t('products.spaceIde.description'),
      versions: [
        {
          version: '2.5.0',
          releaseDate: '2023-12-15',
          size: '245 MB',
          platforms: [
            { name: 'macOS', icon: <Apple className="h-5 w-5 mr-2" />, url: '/downloads/space-ide-2.5.0-mac.dmg' },
            { name: 'Windows', icon: <MonitorIcon className="h-5 w-5 mr-2" />, url: '/downloads/space-ide-2.5.0-win.exe' },
            { name: 'Linux', icon: <TerminalIcon className="h-5 w-5 mr-2" />, url: '/downloads/space-ide-2.5.0-linux.tar.gz' }
          ]
        },
        {
          version: '2.4.0',
          releaseDate: '2023-10-01',
          size: '240 MB',
          platforms: [
            { name: 'macOS', icon: <Apple className="h-5 w-5 mr-2" />, url: '/downloads/space-ide-2.4.0-mac.dmg' },
            { name: 'Windows', icon: <MonitorIcon className="h-5 w-5 mr-2" />, url: '/downloads/space-ide-2.4.0-win.exe' },
            { name: 'Linux', icon: <TerminalIcon className="h-5 w-5 mr-2" />, url: '/downloads/space-ide-2.4.0-linux.tar.gz' }
          ]
        }
      ]
    },
    'space-profiler': {
      name: 'Space Profiler',
      description: t('products.spaceProfiler.description'),
      versions: [
        {
          version: '1.8.0',
          releaseDate: '2023-11-20',
          size: '120 MB',
          platforms: [
            { name: 'macOS', icon: <Apple className="h-5 w-5 mr-2" />, url: '/downloads/space-profiler-1.8.0-mac.dmg' },
            { name: 'Windows', icon: <MonitorIcon className="h-5 w-5 mr-2" />, url: '/downloads/space-profiler-1.8.0-win.exe' },
            { name: 'Linux', icon: <TerminalIcon className="h-5 w-5 mr-2" />, url: '/downloads/space-profiler-1.8.0-linux.tar.gz' }
          ]
        },
        {
          version: '1.7.0',
          releaseDate: '2023-09-05',
          size: '118 MB',
          platforms: [
            { name: 'macOS', icon: <Apple className="h-5 w-5 mr-2" />, url: '/downloads/space-profiler-1.7.0-mac.dmg' },
            { name: 'Windows', icon: <MonitorIcon className="h-5 w-5 mr-2" />, url: '/downloads/space-profiler-1.7.0-win.exe' },
            { name: 'Linux', icon: <TerminalIcon className="h-5 w-5 mr-2" />, url: '/downloads/space-profiler-1.7.0-linux.tar.gz' }
          ]
        }
      ]
    }
  };

  return (
    <div className="container mx-auto py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">{t('hero.title')}</h1>
        <p className="text-xl text-muted-foreground">{t('hero.subtitle')}</p>
      </div>

      <Tabs defaultValue={selectedProduct} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="space-ide">Space IDE</TabsTrigger>
            <TabsTrigger value="space-profiler">Space Profiler</TabsTrigger>
          </TabsList>
        </div>

        {Object.entries(products).map(([key, productData]) => (
          <TabsContent key={key} value={key}>
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">{productData.name}</h2>
                <p className="text-lg text-muted-foreground">{productData.description}</p>
              </div>

              {productData.versions.map((version, index) => (
                <Card key={index} className={index === 0 ? 'border-primary' : ''}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="flex items-center">
                          {t('version')} {version.version}
                          {index === 0 && <Badge className="ml-2">{t('latest')}</Badge>}
                        </CardTitle>
                        <CardDescription>
                          {t('released')}: {version.releaseDate} | {t('size')}: {version.size}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {version.platforms.map((platform, platformIndex) => (
                        <Button key={platformIndex} variant="outline" className="h-12" asChild>
                          <Link href={platform.url}>
                            {platform.icon}
                            {t('downloadFor')} {platform.name}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                  {index === 0 && (
                    <CardFooter className="flex justify-between border-t pt-6">
                      <div className="text-sm text-muted-foreground">
                        {t('sha256')}: <code className="bg-muted px-1 py-0.5 rounded text-xs">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code>
                      </div>
                      <Link href={`/changelog#${productData.name.toLowerCase()}-${version.version}`} className="text-sm text-primary hover:underline">
                        {t('viewChangelog')}
                      </Link>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-muted rounded-lg p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{t('trial.title')}</h2>
            <p className="text-lg">{t('trial.description')}</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>{t('trial.point1')}</span>
              </li>
              <li className="flex items-center">
                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>{t('trial.point2')}</span>
              </li>
              <li className="flex items-center">
                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>{t('trial.point3')}</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild>
                <Link href="/pricing">
                  {t('trial.buyNow')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">{t('requirements.title')}</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">{t('requirements.os')}</h4>
                <p className="text-sm text-muted-foreground">{t('requirements.osRequirements')}</p>
              </div>
              <div>
                <h4 className="font-medium">{t('requirements.memory')}</h4>
                <p className="text-sm text-muted-foreground">{t('requirements.memoryRequirements')}</p>
              </div>
              <div>
                <h4 className="font-medium">{t('requirements.disk')}</h4>
                <p className="text-sm text-muted-foreground">{t('requirements.diskRequirements')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 