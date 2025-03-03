/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getTranslations } from 'next-intl/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function AboutPage() {
  const t = await getTranslations('about');

  const teamMembers = [
    {
      name: t('team.member1.name'),
      role: t('team.member1.role'),
      bio: t('team.member1.bio'),
      imageUrl: '/images/team/member1.webp',
      social: {
        twitter: 'https://twitter.com/member1',
        linkedin: 'https://linkedin.com/in/member1',
        github: 'https://github.com/member1'
      }
    },
    {
      name: t('team.member2.name'),
      role: t('team.member2.role'),
      bio: t('team.member2.bio'),
      imageUrl: '/images/team/member2.webp',
      social: {
        twitter: 'https://twitter.com/member2',
        linkedin: 'https://linkedin.com/in/member2',
        github: 'https://github.com/member2'
      }
    },
    {
      name: t('team.member3.name'),
      role: t('team.member3.role'),
      bio: t('team.member3.bio'),
      imageUrl: '/images/team/member3.webp',
      social: {
        twitter: 'https://twitter.com/member3',
        linkedin: 'https://linkedin.com/in/member3',
        github: 'https://github.com/member3'
      }
    },
    {
      name: t('team.member4.name'),
      role: t('team.member4.role'),
      bio: t('team.member4.bio'),
      imageUrl: '/images/team/member4.webp',
      social: {
        twitter: 'https://twitter.com/member4',
        linkedin: 'https://linkedin.com/in/member4',
        github: 'https://github.com/member4'
      }
    }
  ];

  const values = [
    {
      title: t('values.value1.title'),
      description: t('values.value1.description')
    },
    {
      title: t('values.value2.title'),
      description: t('values.value2.description')
    },
    {
      title: t('values.value3.title'),
      description: t('values.value3.description')
    },
    {
      title: t('values.value4.title'),
      description: t('values.value4.description')
    }
  ];

  return (
    <div className="container mx-auto py-12 space-y-20">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">{t('hero.title')}</h1>
        <p className="text-xl text-muted-foreground">{t('hero.subtitle')}</p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{t('story.title')}</h2>
          <p className="text-lg">{t('story.paragraph1')}</p>
          <p className="text-lg">{t('story.paragraph2')}</p>
          <p className="text-lg">{t('story.paragraph3')}</p>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/images/office.webp"
            alt={t('story.imageAlt')}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t('values.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('values.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="bg-muted/50">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p>{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t('team.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('team.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
              <div className="flex space-x-3">
                <Link href={member.social.twitter} className="text-muted-foreground hover:text-primary">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href={member.social.linkedin} className="text-muted-foreground hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href={member.social.github} className="text-muted-foreground hover:text-primary">
                  <Github className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t('timeline.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('timeline.subtitle')}</p>
        </div>
        <div className="relative border-l border-muted-foreground/20 pl-8 ml-4 space-y-12">
          <div className="relative">
            <div className="absolute -left-12 mt-1.5 h-6 w-6 rounded-full border-4 border-background bg-primary"></div>
            <h3 className="text-xl font-bold">{t('timeline.event1.year')}</h3>
            <h4 className="text-lg font-medium mb-2">{t('timeline.event1.title')}</h4>
            <p className="text-muted-foreground">{t('timeline.event1.description')}</p>
          </div>
          <div className="relative">
            <div className="absolute -left-12 mt-1.5 h-6 w-6 rounded-full border-4 border-background bg-primary"></div>
            <h3 className="text-xl font-bold">{t('timeline.event2.year')}</h3>
            <h4 className="text-lg font-medium mb-2">{t('timeline.event2.title')}</h4>
            <p className="text-muted-foreground">{t('timeline.event2.description')}</p>
          </div>
          <div className="relative">
            <div className="absolute -left-12 mt-1.5 h-6 w-6 rounded-full border-4 border-background bg-primary"></div>
            <h3 className="text-xl font-bold">{t('timeline.event3.year')}</h3>
            <h4 className="text-lg font-medium mb-2">{t('timeline.event3.title')}</h4>
            <p className="text-muted-foreground">{t('timeline.event3.description')}</p>
          </div>
          <div className="relative">
            <div className="absolute -left-12 mt-1.5 h-6 w-6 rounded-full border-4 border-background bg-primary"></div>
            <h3 className="text-xl font-bold">{t('timeline.event4.year')}</h3>
            <h4 className="text-lg font-medium mb-2">{t('timeline.event4.title')}</h4>
            <p className="text-muted-foreground">{t('timeline.event4.description')}</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-muted rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{t('cta.description')}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/careers">
              {t('cta.primaryButton')}
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/contact">
              {t('cta.secondaryButton')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 