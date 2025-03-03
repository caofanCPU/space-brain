/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/marketing/hero-section';
import FeaturesSection from '@/components/marketing/features-section';
import TestimonialsSection from '@/components/marketing/testimonials-section';
import CtaSection from '@/components/marketing/cta-section';

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div className="flex flex-col gap-20 py-10">
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />
      <FeaturesSection
        title={t('features.title')}
        subtitle={t('features.subtitle')}
        features={[
          {
            title: t('features.feature1.title'),
            description: t('features.feature1.description'),
            icon: 'Code',
          },
          {
            title: t('features.feature2.title'),
            description: t('features.feature2.description'),
            icon: 'Layers',
          },
          {
            title: t('features.feature3.title'),
            description: t('features.feature3.description'),
            icon: 'Users',
          },
        ]}
      />
      <TestimonialsSection
        title={t('testimonials.title')}
        subtitle={t('testimonials.subtitle')}
      />
      <CtaSection
        title={t('cta.title')}
        subtitle={t('cta.subtitle')}
      />
    </div>
  );
} 