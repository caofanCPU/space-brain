/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Code, 
  Zap, 
  Cloud, 
  Users, 
  Shield, 
  Cpu, 
  Globe, 
  Smartphone,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesSectionProps {
  title: string;
  subtitle: string;
  features: Feature[];
}

// 图标映射
const iconMap: Record<string, React.ReactNode> = {
  'code': <Code className="h-6 w-6" />,
  'zap': <Zap className="h-6 w-6" />,
  'cloud': <Cloud className="h-6 w-6" />,
  'users': <Users className="h-6 w-6" />,
  'shield': <Shield className="h-6 w-6" />,
  'cpu': <Cpu className="h-6 w-6" />,
  'globe': <Globe className="h-6 w-6" />,
  'smartphone': <Smartphone className="h-6 w-6" />,
};

export default function FeaturesSection({ title, subtitle, features }: FeaturesSectionProps) {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  return (
    <div className="bg-[#f8f8f8] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            {title}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {subtitle}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            使用Space-Brain提升您的开发效率，简化工作流程，释放创造力
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={cn(
                  "jetbrains-card relative overflow-hidden rounded-xl bg-white p-6 shadow-sm",
                  "border border-gray-100 hover:border-primary/20 transition-all duration-300"
                )}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <dt className="flex items-center gap-x-4">
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg",
                    "bg-primary/5 text-primary transition-all duration-300",
                    hoveredFeature === index ? "scale-110" : ""
                  )}>
                    {iconMap[feature.icon] || <Code className="h-6 w-6" />}
                  </div>
                  <div className="text-xl font-semibold leading-7 text-gray-900">
                    {feature.title}
                  </div>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a 
                      href="#" 
                      className="text-sm font-medium text-primary group flex items-center"
                    >
                      了解更多
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                  </p>
                </dd>
                
                {/* 底部进度条效果 - JetBrains风格 */}
                <div 
                  className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300 ease-out"
                  style={{ 
                    width: hoveredFeature === index ? '100%' : '0%',
                    opacity: hoveredFeature === index ? 1 : 0
                  }}
                />
              </div>
            ))}
          </dl>
        </div>
        
        {/* JetBrains风格的CTA部分 */}
        <div className="mt-20 text-center">
          <a 
            href="#" 
            className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
          >
            查看所有功能
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
} 