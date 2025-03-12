'use client';

import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogHeaderProps {
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  readTime: string;
  category: string;
  bannerImage?: string;
}

export function BlogHeader({
  title,
  author,
  publishDate,
  readTime,
  category,
  bannerImage = '/images/default.webp'
}: BlogHeaderProps) {
  return (
    <div className="relative">
      {/* Banner 图片 */}
      <div className="relative h-[400px] overflow-hidden">
        <Image
          src={bannerImage}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* 信息展示区域 - 移到banner下方 */}
      <div className="relative bg-gradient-to-r from-background/95 to-background/90 backdrop-blur-sm border-b">
        {/* 炫彩背景效果 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_-30%_50%,rgba(123,31,162,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_130%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-blue-500/5 animate-gradient-x" />
        </div>

        {/* 内容区域 */}
        <div className="container mx-auto px-8 py-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Badge 
                variant="secondary" 
                className="blog-category-badge"
              >
                {category}
              </Badge>
              
              <h1 className="text-4xl font-bold tracking-tight font-jetbrains">
                {title}
              </h1>
            </div>

            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-border">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                    priority
                  />
                </div>
                <span className="font-medium">{author.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{publishDate}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 装饰效果 */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,var(--primary)/3_12%,transparent_30%,transparent_70%,var(--primary)/3_88%)] bg-[length:24px_24px]" />
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-20" />
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-20" />
        </div>
      </div>
    </div>
  );
} 