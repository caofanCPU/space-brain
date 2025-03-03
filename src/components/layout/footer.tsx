/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Github, Twitter, Linkedin, Facebook, Youtube, Instagram, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const t = useTranslations('common.footer');
  const pathname = usePathname();
  const locale = pathname.split('/')[1]; // 获取当前语言
  
  const footerNavigation = {
    products: [
      { name: 'Space-Brain IDE', href: `/${locale}/products/ide` },
      { name: 'Space-Brain Cloud', href: `/${locale}/products/cloud` },
      { name: 'Space-Brain Mobile', href: `/${locale}/products/mobile` },
      { name: 'Plugins', href: `/${locale}/products/plugins` },
    ],
    resources: [
      { name: 'Documentation', href: `/${locale}/docs` },
      { name: 'Tutorials', href: `/${locale}/tutorials` },
      { name: 'Blog', href: `/${locale}/blog` },
      { name: 'Community', href: `/${locale}/community` },
    ],
    company: [
      { name: 'About', href: `/${locale}/about` },
      { name: 'Careers', href: `/${locale}/careers` },
      { name: 'Contact', href: `/${locale}/contact` },
      { name: 'Partners', href: `/${locale}/partners` },
    ],
    legal: [
      { name: 'Privacy', href: `/${locale}/privacy` },
      { name: 'Terms', href: `/${locale}/terms` },
      { name: 'Licenses', href: `/${locale}/licenses` },
      { name: 'Security', href: `/${locale}/security` },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      
      {/* 订阅区域 - JetBrains风格 */}
      <div className="bg-[#2b2b2b] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-gradient-to-r from-primary/90 to-purple-600/90 p-8 shadow-lg">
            <div className="md:flex md:items-center md:justify-between">
              <div className="max-w-xl">
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {t('subscribeTitle') || '订阅我们的更新'}
                </h3>
                <p className="mt-3 text-lg text-white/80">
                  {t('subscribeText') || '获取最新的产品更新、技术文章和社区动态'}
                </p>
              </div>
              <div className="mt-8 md:mt-0 md:w-96">
                <form className="sm:flex">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="your@email.com"
                    className="w-full rounded-md border-0 bg-white/10 px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-white/30"
                  />
                  <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <Button
                      type="submit"
                      className="jetbrains-button w-full bg-white text-primary hover:bg-gray-100"
                    >
                      {t('subscribe') || '订阅'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href={`/${locale}`} className="flex items-center">
              <div className="w-10 h-10 mr-3 bg-primary rounded-md flex items-center justify-center text-white font-bold">
                SB
              </div>
              <span className="text-xl font-bold text-white">Space-Brain</span>
            </Link>
            <p className="text-base text-gray-400">
              智能开发工具平台，提升您的开发效率
            </p>
            <div className="flex flex-wrap gap-4">
              {/* Social links */}
              {socialLinks.map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  className="text-gray-400 hover:text-primary transition-colors duration-200 group"
                >
                  <span className="sr-only">{item.name}</span>
                  <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-200">
                    <item.icon className="h-5 w-5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{t('products')}</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.products.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-base text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{t('resources')}</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-base text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{t('company')}</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-base text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">{t('legal')}</h3>
                <ul role="list" className="mt-4 space-y-3">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="text-base text-gray-400 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-sm text-gray-400">{t('copyright')}</p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <Link href={`/${locale}/privacy`} className="text-sm text-gray-400 hover:text-white">
                Privacy
              </Link>
              <Link href={`/${locale}/terms`} className="text-sm text-gray-400 hover:text-white">
                Terms
              </Link>
              <Link href={`/${locale}/cookies`} className="text-sm text-gray-400 hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 