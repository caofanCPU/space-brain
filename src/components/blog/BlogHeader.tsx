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
}

export function BlogHeader({
  title,
  author,
  publishDate,
  readTime,
  category
}: BlogHeaderProps) {
  return (
    <div className="relative">
      <div className="h-64 bg-gradient-to-r from-primary/80 to-primary">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,var(--primary)_12%,transparent_0,transparent_88%,var(--primary)_0)] bg-[length:24px_24px]" />
      </div>
      
      <div className="relative px-8 -mt-32 pb-8">
        <div className="bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 rounded-lg p-8 shadow-lg">
          <div className="space-y-6">
            <Badge variant="secondary" className="text-sm">
              {category}
            </Badge>
            
            <h1 className="text-4xl font-bold tracking-tight font-jetbrains">{title}</h1>
            
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 40px) 100vw, 40px"
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
      </div>
    </div>
  );
} 