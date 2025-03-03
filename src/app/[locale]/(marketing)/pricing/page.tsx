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
import { Check, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default async function PricingPage() {
  const t = await getTranslations('pricing');

  const plans = {
    monthly: [
      {
        name: t('plansA.personal.name'),
        description: t('plansA.personal.description'),
        price: '¥29',
        period: t('monthly'),
        features: [
          t('plansA.personal.features.feature1'),
          t('plansA.personal.features.feature2'),
          t('plansA.personal.features.feature3'),
          t('plansA.personal.features.feature4'),
          t('plansA.personal.features.feature5')
        ],
        cta: t('plansA.personal.cta'),
        popular: false
      },
      {
        name: t('plansA.professional.name'),
        description: t('plansA.professional.description'),
        price: '¥99',
        period: t('monthly'),
        features: [
          t('plansA.professional.features.feature1'),
          t('plansA.professional.features.feature2'),
          t('plansA.professional.features.feature3'),
          t('plansA.professional.features.feature4'),
          t('plansA.professional.features.feature5'),
          t('plansA.professional.features.feature6')
        ],
        cta: t('plansA.professional.cta'),
        popular: true
      },
      {
        name: t('plansA.enterprise.name'),
        description: t('plansA.enterprise.description'),
        price: t('plansA.enterprise.contactUs'),
        period: '',
        features: [
          t('plansA.enterprise.features.feature1'),
          t('plansA.enterprise.features.feature2'),
          t('plansA.enterprise.features.feature3'),
          t('plansA.enterprise.features.feature4'),
          t('plansA.enterprise.features.feature5'),
          t('plansA.enterprise.features.feature6'),
          t('plansA.enterprise.features.feature7')
        ],
        cta: t('plansA.enterprise.cta'),
        popular: false
      }
    ],
    annual: [
      {
        name: t('plansA.personal.name'),
        description: t('plansA.personal.description'),
        price: '¥290',
        period: t('annual'),
        discount: '¥58',
        features: [
          t('plansA.personal.features.feature1'),
          t('plansA.personal.features.feature2'),
          t('plansA.personal.features.feature3'),
          t('plansA.personal.features.feature4'),
          t('plansA.personal.features.feature5')
        ],
        cta: t('plansA.personal.cta'),
        popular: false
      },
      {
        name: t('plansA.professional.name'),
        description: t('plansA.professional.description'),
        price: '¥990',
        period: t('annual'),
        discount: '¥198',
        features: [
          t('plansA.professional.features.feature1'),
          t('plansA.professional.features.feature2'),
          t('plansA.professional.features.feature3'),
          t('plansA.professional.features.feature4'),
          t('plansA.professional.features.feature5'),
          t('plansA.professional.features.feature6')
        ],
        cta: t('plansA.professional.cta'),
        popular: true
      },
      {
        name: t('plansA.enterprise.name'),
        description: t('plansA.enterprise.description'),
        price: t('plansA.enterprise.contactUs'),
        period: '',
        features: [
          t('plansA.enterprise.features.feature1'),
          t('plansA.enterprise.features.feature2'),
          t('plansA.enterprise.features.feature3'),
          t('plansA.enterprise.features.feature4'),
          t('plansA.enterprise.features.feature5'),
          t('plansA.enterprise.features.feature6'),
          t('plansA.enterprise.features.feature7')
        ],
        cta: t('plansA.enterprise.cta'),
        popular: false
      }
    ]
  };

  return (
    <div className="container mx-auto py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">{t('hero.title')}</h1>
        <p className="text-xl text-muted-foreground">{t('hero.subtitle')}</p>
      </div>

      <Tabs defaultValue="monthly" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="monthly">{t('monthlyBilling')}</TabsTrigger>
            <TabsTrigger value="annual">{t('annualBilling')}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="monthly">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.monthly.map((plan, index) => (
              <Card key={index} className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                <CardHeader>
                  {plan.popular && <Badge className="mb-2 self-start">{t('mostPopular')}</Badge>}
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-2">/ {plan.period}</span>}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                    <Link href={plan.name === t('plans.enterprise.name') ? '/contact' : '/checkout'}>
                      {plan.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="annual">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.annual.map((plan, index) => (
              <Card key={index} className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                <CardHeader>
                  {plan.popular && <Badge className="mb-2 self-start">{t('mostPopular')}</Badge>}
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-2">/ {plan.period}</span>}
                    {plan.discount && (
                      <div className="mt-1 text-sm text-green-600 font-medium">
                        {t('saveText')} {plan.discount}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                    <Link href={plan.name === t('plans.enterprise.name') ? '/contact' : '/checkout'}>
                      {plan.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-muted rounded-lg p-8 md:p-12 mt-16">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-2/3 space-y-4">
            <h2 className="text-3xl font-bold">{t('faq.title')}</h2>
            <p className="text-lg">{t('faqA.description')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                  {t('faqA.question1')}
                </h3>
                <p className="text-muted-foreground">{t('faqA.answer1')}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                  {t('faqA.question2')}
                </h3>
                <p className="text-muted-foreground">{t('faqA.answer2')}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                  {t('faqA.question3')}
                </h3>
                <p className="text-muted-foreground">{t('faqA.answer3')}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                  {t('faqA.question4')}
                </h3>
                <p className="text-muted-foreground">{t('faqA.answer4')}</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 bg-background p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">{t('needHelp.title')}</h3>
            <p className="mb-6">{t('needHelp.description')}</p>
            <Button className="w-full" asChild>
              <Link href="/contact">
                {t('needHelp.cta')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 