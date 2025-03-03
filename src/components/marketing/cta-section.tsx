/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download, MessageCircle } from 'lucide-react';

interface CtaSectionProps {
  title: string;
  subtitle: string;
}

export default function CtaSection({ title, subtitle }: CtaSectionProps) {
  const t = useTranslations('common.buttons');
  const pathname = usePathname();
  const locale = pathname.split('/')[1]; // 获取当前语言
  const ctaRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // 添加鼠标移动效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ctaRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = ctaRef.current.getBoundingClientRect();
      
      // 计算鼠标在元素内的相对位置 (0-1)
      const x = Math.min(Math.max((clientX - left) / width, 0), 1);
      const y = Math.min(Math.max((clientY - top) / height, 0), 1);
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={ctaRef}
      className="relative overflow-hidden"
    >
      {/* 渐变背景 */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(33,215,137,0.8), rgba(8,124,250,0.9))`,
          backgroundSize: '200% 200%'
        }}
      ></div>
      
      {/* 装饰性几何图形 */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/20 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-white/20 blur-3xl translate-y-1/2 -translate-x-1/3"></div>
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
          <br />
          <span className="text-xl font-normal mt-2 block text-white/90">{subtitle}</span>
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <Button 
            size="lg" 
            className="jetbrains-button bg-white text-primary hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            asChild
          >
            <Link href={`/${locale}/download`} className="flex items-center">
              <Download className="mr-2 h-5 w-5" />
              <span>{t('download')}</span>
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="jetbrains-button bg-transparent border-white text-white hover:bg-white/10 transition-all duration-200"
            size="lg" 
            asChild
          >
            <Link href={`/${locale}/contact`} className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              <span>{t('contactUs')}</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 