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
import { cn } from '@/lib/utils';

interface TestimonialsSectionProps {
  title: string;
  subtitle: string;
}

const testimonials = [
  {
    content: "Space-Brain 彻底改变了我的开发流程。智能代码补全功能让我的编码速度提高了至少 30%。",
    author: {
      name: "张明",
      role: "高级软件工程师",
      initial: "张"
    }
  },
  {
    content: "作为一个团队领导，我特别欣赏 Space-Brain 的协作功能。它让我们的团队协作变得前所未有的顺畅。",
    author: {
      name: "李华",
      role: "技术总监",
      initial: "李"
    }
  },
  {
    content: "从学生到专业开发者，Space-Brain 一直是我的得力助手。它的学习曲线很平缓，但功能却非常强大。",
    author: {
      name: "王芳",
      role: "前端开发者",
      initial: "王"
    }
  },
];

export default function TestimonialsSection({ title, subtitle }: TestimonialsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <div className="bg-[#f8f8f8] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">{title}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {subtitle}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={cn(
                "jetbrains-card flex flex-col rounded-xl bg-white p-6 shadow-sm",
                "border border-gray-100 hover:border-primary/20 transition-all duration-300"
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex-1">
                <p className="text-base leading-7 text-gray-600">{testimonial.content}</p>
              </div>
              <div className="mt-6 flex items-center gap-x-4">
                <div 
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300",
                    hoveredIndex === index ? "scale-110" : ""
                  )}
                  style={{
                    backgroundImage: "linear-gradient(to bottom right, #087CFA, #21D789)"
                  }}
                >
                  {testimonial.author.initial}
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">{testimonial.author.name}</h3>
                  <p className="text-xs leading-5 text-gray-500">{testimonial.author.role}</p>
                </div>
              </div>
              
              {/* 底部进度条效果 - JetBrains风格 */}
              <div 
                className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300 ease-out"
                style={{ 
                  width: hoveredIndex === index ? '100%' : '0%',
                  opacity: hoveredIndex === index ? 1 : 0
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 