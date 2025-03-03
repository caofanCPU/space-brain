/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Image from 'next/image';

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
      imageUrl: "/images/testimonials/testimonial-1.jpg"
    }
  },
  {
    content: "作为一个团队领导，我特别欣赏 Space-Brain 的协作功能。它让我们的团队协作变得前所未有的顺畅。",
    author: {
      name: "李华",
      role: "技术总监",
      imageUrl: "/images/testimonials/testimonial-2.jpg"
    }
  },
  {
    content: "从学生到专业开发者，Space-Brain 一直是我的得力助手。它的学习曲线很平缓，但功能却非常强大。",
    author: {
      name: "王芳",
      role: "前端开发者",
      imageUrl: "/images/testimonials/testimonial-3.jpg"
    }
  },
];

export default function TestimonialsSection({ title, subtitle }: TestimonialsSectionProps) {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">{title}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {subtitle}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
              <div className="flex-1">
                <p className="text-base leading-7 text-gray-600">{testimonial.content}</p>
              </div>
              <div className="mt-6 flex items-center gap-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-50 overflow-hidden">
                  <Image
                    className="h-full w-full object-cover"
                    src={testimonial.author.imageUrl}
                    alt={testimonial.author.name}
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold leading-6 text-gray-900">{testimonial.author.name}</h3>
                  <p className="text-xs leading-5 text-gray-500">{testimonial.author.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 