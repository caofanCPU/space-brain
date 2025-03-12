'use client';

import { useState } from 'react';
import { MarkdownRenderer, TableOfContents } from '@/components/MarkdownRenderer';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogFooter } from '@/components/blog/BlogFooter';
import { BlogSidebar } from '@/components/blog/BlogSidebar';

interface BlogPostClientProps {
  content: string;
}

export default function BlogPostClient({ content }: BlogPostClientProps) {
  const [toc, setToc] = useState<TableOfContents[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <main className="lg:col-span-12">
            <article className="bg-card rounded-lg shadow-lg overflow-hidden">
              <BlogHeader 
                title="Space IDE 2.5 发布：新特性与改进"
                author={{
                  name: "张明",
                  avatar: "/images/default.webp"
                }}
                publishDate="2023-12-15"
                readTime="5 min"
                category="Product Updates"
              />
              
              <div className="p-8">
                <MarkdownRenderer 
                  content={content} 
                  onTocChange={setToc}
                />
              </div>
              
              <BlogFooter />
            </article>
          </main>
        </div>
      </div>
      
      <BlogSidebar toc={toc} />
    </div>
  );
} 