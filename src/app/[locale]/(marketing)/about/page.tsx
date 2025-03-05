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
import { Github, Linkedin, Twitter, Heart, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { LucideIcon } from 'lucide-react';

// 定义类型
interface ValueItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface SocialLink {
  icon: LucideIcon;
  url: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socialLinks: SocialLink[];
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export default async function AboutPage() {
  const t = await getTranslations('about');

  // 添加图标类型
  const values: ValueItem[] = [
    {
      title: t('values.value1.title'),
      description: t('values.value1.description'),
      icon: Heart
    },
    {
      title: t('values.value2.title'),
      description: t('values.value2.description'),
      icon: Shield
    },
    {
      title: t('values.value3.title'),
      description: t('values.value3.description'),
      icon: Zap
    },
    {
      title: t('values.value4.title'),
      description: t('values.value4.description'),
      icon: Twitter
    }
  ];

  // 修改团队成员数据结构，添加socialLinks
  const teamMembers: TeamMember[] = [
    {
      name: t('team.member1.name'),
      role: t('team.member1.role'),
      bio: t('team.member1.bio'),
      imageUrl: '/images/default.webp',
      socialLinks: [
        { icon: Twitter, url: 'https://twitter.com/member1' },
        { icon: Linkedin, url: 'https://linkedin.com/in/member1' },
        { icon: Github, url: 'https://github.com/member1' }
      ]
    },
    {
      name: t('team.member2.name'),
      role: t('team.member2.role'),
      bio: t('team.member2.bio'),
      imageUrl: '/images/default.webp',
      socialLinks: [
        { icon: Twitter, url: 'https://twitter.com/member2' },
        { icon: Linkedin, url: 'https://linkedin.com/in/member2' },
        { icon: Github, url: 'https://github.com/member2' }
      ]
    },
    {
      name: t('team.member3.name'),
      role: t('team.member3.role'),
      bio: t('team.member3.bio'),
      imageUrl: '/images/default.webp',
      socialLinks: [
        { icon: Twitter, url: 'https://twitter.com/member3' },
        { icon: Linkedin, url: 'https://linkedin.com/in/member3' },
        { icon: Github, url: 'https://github.com/member3' }
      ]
    },
    {
      name: t('team.member4.name'),
      role: t('team.member4.role'),
      bio: t('team.member4.bio'),
      imageUrl: '/images/default.webp',
      socialLinks: [
        { icon: Twitter, url: 'https://twitter.com/member4' },
        { icon: Linkedin, url: 'https://linkedin.com/in/member4' },
        { icon: Github, url: 'https://github.com/member4' }
      ]
    }
  ];

  // 添加时间线数据
  const timeline: TimelineEvent[] = [
    {
      year: '2020',
      title: t('timeline.event1.title'),
      description: t('timeline.event1.description')
    },
    {
      year: '2021',
      title: t('timeline.event2.title'),
      description: t('timeline.event2.description')
    },
    {
      year: '2022',
      title: t('timeline.event3.title'),
      description: t('timeline.event3.description')
    },
    {
      year: '2023',
      title: t('timeline.event4.title'),
      description: t('timeline.event4.description')
    }
  ];

  return (
    <div className="container mx-auto py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">{t('hero.title')}</h1>
        <p className="text-xl text-muted-foreground">{t('hero.subtitle')}</p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">{t('story.title')}</h2>
          <p className="text-lg text-muted-foreground">{t('story.paragraph1')}</p>
          <p className="text-lg text-muted-foreground">{t('story.paragraph2')}</p>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Image 
            src="/images/default.webp" 
            alt="Our office" 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">{t('values.title')}</h2>
          <p className="text-lg text-muted-foreground mt-4">{t('values.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value: ValueItem, index: number) => (
            <div key={index} className="bg-muted/50 p-6 rounded-lg space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">{t('team.title')}</h2>
          <p className="text-lg text-muted-foreground mt-4">{t('team.subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member: TeamMember, index: number) => (
            <div key={index} className="group">
              <div className="aspect-square relative rounded-xl overflow-hidden mb-4">
                <Image
                  src="/images/default.webp"
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-primary">{member.role}</p>
              <p className="text-muted-foreground mt-2">{member.bio}</p>
              <div className="flex gap-2 mt-4">
                {member.socialLinks.map((link: SocialLink, linkIndex: number) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">{t('timeline.title')}</h2>
          <p className="text-lg text-muted-foreground mt-4">{t('timeline.subtitle')}</p>
        </div>
        <div className="relative border-l border-primary/30 pl-8 ml-4 space-y-12">
          {timeline.map((item: TimelineEvent, index: number) => (
            <div key={index} className="relative">
              <div className="absolute w-6 h-6 bg-primary rounded-full -left-11 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="text-primary font-bold mb-2">{item.year}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">{t('cta.title')}</h2>
          <p className="text-xl opacity-90">{t('cta.subtitle')}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/contact">{t('cta.contactButton')}</Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link href="/careers">{t('cta.careersButton')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 