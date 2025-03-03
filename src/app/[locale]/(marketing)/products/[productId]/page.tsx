/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Download, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// 模拟产品数据，实际项目中应从数据库获取
const getProductData = async (productId: string) => {
  const products = {
    'space-ide': {
      id: 'space-ide',
      name: 'Space IDE',
      description: '智能开发环境，提升您的编码效率',
      longDescription: 'Space IDE 是一款功能强大的集成开发环境，专为现代开发者设计。它提供智能代码补全、实时错误检测、集成调试工具等功能，帮助您更快、更高效地完成开发任务。',
      features: [
        '智能代码补全和建议',
        '实时错误检测和修复',
        '集成版本控制',
        '强大的调试工具',
        '可定制的界面和主题',
        '跨平台支持'
      ],
      price: 299,
      imageUrl: '/images/products/space-ide.webp',
      versions: [
        { version: '2.5.0', releaseDate: '2023-12-15', downloadUrl: '/download/space-ide-2.5.0' },
        { version: '2.4.0', releaseDate: '2023-10-01', downloadUrl: '/download/space-ide-2.4.0' }
      ]
    },
    'space-profiler': {
      id: 'space-profiler',
      name: 'Space Profiler',
      description: '性能分析工具，优化您的应用',
      longDescription: 'Space Profiler 是一款高级性能分析工具，帮助开发者识别和解决应用中的性能瓶颈。通过详细的性能报告和可视化分析，您可以轻松优化应用性能，提供更好的用户体验。',
      features: [
        '实时性能监控',
        '内存使用分析',
        'CPU 使用率跟踪',
        '线程活动可视化',
        '性能热点识别',
        '自定义性能报告'
      ],
      price: 199,
      imageUrl: '/images/products/space-profiler.webp',
      versions: [
        { version: '1.8.0', releaseDate: '2023-11-20', downloadUrl: '/download/space-profiler-1.8.0' },
        { version: '1.7.0', releaseDate: '2023-09-05', downloadUrl: '/download/space-profiler-1.7.0' }
      ]
    }
  };
  
  return products[productId as keyof typeof products] || null;
};

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const t = await getTranslations('products');
  const product = await getProductData(params.productId);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge className="mb-2">{t('new')}</Badge>
          <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
          <p className="text-xl text-muted-foreground">{product.description}</p>
          <p className="text-lg">{product.longDescription}</p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg">
              <Link href={`/download?product=${product.id}`}>
                <Download className="mr-2 h-5 w-5" /> {t('download')}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">
                {t('buyNow')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="features">{t('features')}</TabsTrigger>
          <TabsTrigger value="versions">{t('versions')}</TabsTrigger>
          <TabsTrigger value="pricing">{t('pricing')}</TabsTrigger>
        </TabsList>
        <TabsContent value="features" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('featuresTitle')}</CardTitle>
              <CardDescription>{t('featuresDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="versions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('versionsTitle')}</CardTitle>
              <CardDescription>{t('versionsDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {product.versions.map((version, index) => (
                  <div key={index} className="flex flex-col md:flex-row justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{t('version')} {version.version}</h4>
                      <p className="text-sm text-muted-foreground">{t('released')}: {version.releaseDate}</p>
                    </div>
                    <Button variant="outline" asChild className="mt-2 md:mt-0">
                      <Link href={version.downloadUrl}>
                        <Download className="mr-2 h-4 w-4" /> {t('download')}
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pricing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('pricingTitle')}</CardTitle>
              <CardDescription>{t('pricingDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <div className="text-3xl font-bold">¥{product.price}</div>
                </div>
                <p className="text-muted-foreground mb-6">{t('pricingIncluded')}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/pricing">
                  {t('viewAllPlans')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 