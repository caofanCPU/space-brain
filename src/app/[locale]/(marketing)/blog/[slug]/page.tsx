import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import BlogPostClient from './BlogPostClient';

async function getBlogPost(slug: string, locale: string) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'md', locale, `${slug}.md`);
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error(`Failed to load blog content: ${locale}-${slug}`, error)
    return null;
  }
}

export default async function BlogPost({ 
  params: { slug, locale } 
}: { 
  params: { slug: string; locale: string } 
}) {
  const content = await getBlogPost(slug, locale);
  
  if (!content) {
    notFound();
  }

  return (
    <BlogPostClient content={content} />
  );
} 