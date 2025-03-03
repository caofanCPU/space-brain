/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Database, Globe, Shield, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function SolutionsPage() {
  const t = await getTranslations('solutions');

  const solutions = [
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: t('development.title'),
      description: t('development.description'),
      features: [
        t('development.features.feature1'),
        t('development.features.feature2'),
        t('development.features.feature3')
      ]
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: t('data.title'),
      description: t('data.description'),
      features: [
        t('data.features.feature1'),
        t('data.features.feature2'),
        t('data.features.feature3')
      ]
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: t('cloud.title'),
      description: t('cloud.description'),
      features: [
        t('cloud.features.feature1'),
        t('cloud.features.feature2'),
        t('cloud.features.feature3')
      ]
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: t('security.title'),
      description: t('security.description'),
      features: [
        t('security.features.feature1'),
        t('security.features.feature2'),
        t('security.features.feature3')
      ]
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: t('team.title'),
      description: t('team.description'),
      features: [
        t('team.features.feature1'),
        t('team.features.feature2'),
        t('team.features.feature3')
      ]
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: t('performance.title'),
      description: t('performance.description'),
      features: [
        t('performance.features.feature1'),
        t('performance.features.feature2'),
        t('performance.features.feature3')
      ]
    }
  ];

  return (
    <div className="container mx-auto py-12 space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">{t('hero.title')}</h1>
        <p className="text-xl text-muted-foreground">{t('hero.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutions.map((solution, index) => (
          <Card key={index} className="flex flex-col h-full">
            <CardHeader>
              <div className="mb-4">{solution.icon}</div>
              <CardTitle>{solution.title}</CardTitle>
              <CardDescription>{solution.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted rounded-lg p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{t('caseStudy.title')}</h2>
            <p className="text-lg">{t('caseStudy.description')}</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>{t('caseStudy.point1')}</span>
              </li>
              <li className="flex items-center">
                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>{t('caseStudy.point2')}</span>
              </li>
              <li className="flex items-center">
                <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary"></div>
                <span>{t('caseStudy.point3')}</span>
              </li>
            </ul>
            <Button asChild>
              <Link href="/contact">
                {t('caseStudy.cta')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src="/images/case-study.webp"
              alt={t('caseStudy.title')}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold">{t('contact.title')}</h2>
        <p className="text-lg">{t('contact.description')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">
              {t('contact.primaryCta')}
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/pricing">
              {t('contact.secondaryCta')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 