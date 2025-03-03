/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Star, Code, Zap } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export default function HeroSection({ title, subtitle }: HeroSectionProps) {
  const t = useTranslations('common.buttons');
  const [imgError, setImgError] = useState(false);
  const pathname = usePathname();
  const locale = pathname.split('/')[1]; // 获取当前语言
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 添加滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 添加鼠标移动视差效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();
      
      // 更新鼠标位置用于背景动画
      setMousePosition({
        x: clientX / width,
        y: clientY / height
      });
      
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      
      const elements = heroRef.current.querySelectorAll('.parallax-element');
      elements.forEach((el, i) => {
        const depth = i * 0.2 + 0.5;
        const translateX = x * depth;
        const translateY = y * depth;
        (el as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={heroRef} className="relative isolate overflow-hidden">
      {/* JetBrains风格的动态渐变背景 */}
      <div 
        className="absolute inset-0 bg-[#6B57FF] opacity-90 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(33,215,137,0.4), rgba(8,124,250,0.4), rgba(254,40,87,0.4), rgba(107,87,255,0.8))`,
          backgroundSize: '200% 200%',
          animation: 'gradientShift 15s ease infinite'
        }}
      ></div>
      
      {/* 动态光效 */}
      <div className="absolute inset-0 z-0">
        <div className="jetbrains-animated-bg"></div>
      </div>
      
      {/* 装饰性几何图形 - JetBrains风格 */}
      <div 
        className="absolute inset-0 opacity-20 z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.3) 1%, transparent 1%), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.3) 1%, transparent 1%)',
          backgroundSize: '100px 100px'
        }}
      ></div>
      
      {/* 添加浮动几何形状 */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-300/20 to-blue-500/20 blur-3xl parallax-element z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl parallax-element z-0"></div>
      <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-gradient-to-r from-yellow-300/20 to-green-400/20 blur-3xl parallax-element z-0"></div>
      
      {/* 整体内容偏左一点，调整上下边距 */}
      <div className="mx-auto max-w-[90rem] px-6 py-12 sm:py-16 lg:px-8 lg:py-20 relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          {/* 左侧内容区域 */}
          <div 
            className="lg:col-span-3 lg:pr-8"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="mb-8 flex flex-wrap gap-4">
              <span className="inline-flex items-center rounded-full bg-[#1a1a1a]/80 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20">
                <Star className="mr-1 h-3.5 w-3.5 text-[#FE2857]" />
                最新版本 v2.5 已发布
              </span>
              <span className="inline-flex items-center rounded-full bg-[#1a1a1a]/80 px-3 py-1 text-sm font-medium text-white ring-1 ring-inset ring-[#21D789]/30">
                <Zap className="mr-1 h-3.5 w-3.5 text-[#21D789]" />
                性能提升 50%
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-200">
              {subtitle}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button 
                size="lg" 
                className="jetbrains-button bg-[#21D789] hover:bg-[#21D789]/90 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href={`/${locale}/download`} className="flex items-center">
                  <Download className="mr-2 h-5 w-5" />
                  <span>{t('download')}</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="jetbrains-button bg-transparent border-[#087CFA] text-white hover:bg-[#087CFA]/20 transition-all duration-200"
                asChild
              >
                <Link href={`/${locale}/products`} className="flex items-center">
                  <span>{t('learnMore')}</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            {/* 添加特性标签 */}
            <div className="mt-10 flex flex-wrap gap-3">
              <span className="inline-flex items-center rounded-md bg-[#1a1a1a]/80 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#087CFA]/30">
                <Code className="mr-1 h-3 w-3 text-[#087CFA]" />
                智能代码补全
              </span>
              <span className="inline-flex items-center rounded-md bg-[#1a1a1a]/80 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#21D789]/30">
                多语言支持
              </span>
              <span className="inline-flex items-center rounded-md bg-[#1a1a1a]/80 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#FE2857]/30">
                实时协作
              </span>
              <span className="inline-flex items-center rounded-md bg-[#1a1a1a]/80 px-2.5 py-1 text-xs font-medium text-white ring-1 ring-inset ring-[#F97A12]/30">
                AI 辅助
              </span>
            </div>
          </div>
          
          {/* 图片框 */}
          <div 
            className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-9 parallax-element"
            style={{
              transform: `translateY(${scrollY * -0.05}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* JetBrains风格的窗口框架 */}
            <div className="relative overflow-hidden rounded-lg bg-[#1E1F22] shadow-2xl">
              {/* 窗口顶部栏 */}
              <div className="flex items-center justify-between bg-[#3C3F41] px-4 py-2">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-[#FE2857]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#F97A12]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#21D789]"></div>
                </div>
                <div className="text-xs text-gray-300 flex items-center">
                  <span className="mr-2">Space-Brain IDE</span>
                  <span className="px-2 py-0.5 text-[10px] bg-[#21D789] text-black rounded">v2.5 BETA</span>
                </div>
              </div>
              
              {/* 窗口内容 */}
              <div className="flex">
                {/* 左侧项目导航 */}
                <div className="w-16 bg-[#2B2D30] p-2">
                  <div className="mb-4 h-8 w-8 rounded bg-[#087CFA]/20 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-sm bg-[#087CFA]"></div>
                  </div>
                  <div className="mb-4 h-8 w-8 rounded bg-[#21D789]/20 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-sm bg-[#21D789]"></div>
                  </div>
                  <div className="mb-4 h-8 w-8 rounded bg-[#FE2857]/20 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-sm bg-[#FE2857]"></div>
                  </div>
                </div>
                
                {/* 主内容区域 */}
                <div className="flex-1">
                  {imgError ? (
                    <div className="w-full h-[400px] md:h-[500px] lg:h-[500px] xl:h-[550px] bg-gradient-to-r from-[#087CFA]/10 to-[#21D789]/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-[#1a1a1a] flex items-center justify-center">
                          <Code className="h-8 w-8 text-[#087CFA]" />
                        </div>
                        <span className="text-white text-xl font-bold">Space-Brain IDE</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[500px] xl:h-[550px] overflow-hidden">
                      <Image
                        src="/images/hero-screenshot.png"
                        alt="App screenshot"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        className="object-cover object-left-top"
                        priority
                        onError={() => setImgError(true)}
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* 底部状态栏 */}
              <div className="flex items-center justify-between bg-[#3C3F41] px-4 py-1">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-[#21D789]"></div>
                  <span className="text-xs text-gray-300">Ready</span>
                </div>
                <div className="text-xs text-gray-300">UTF-8</div>
              </div>
            </div>
            
            {/* 添加JetBrains风格的反光效果 */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 