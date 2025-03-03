/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Search } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// 定义类型
interface Author {
  name: string;
  avatar: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: Author;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  featured: boolean;
}

interface Category {
  id: string;
  name: string;
}

// 模拟博客文章数据，实际项目中应从数据库获取
const getBlogPosts = (): BlogPost[] => {
  return [
    {
      id: '1',
      title: 'Space IDE 2.5 发布：新特性与改进',
      slug: 'space-ide-2-5-release',
      excerpt: '我们很高兴地宣布 Space IDE 2.5 的发布，带来了多项新特性和性能改进，提升您的开发体验。',
      content: '',
      category: 'productUpdates',
      author: {
        name: '张明',
        avatar: '/images/default.webp'
      },
      publishedAt: '2023-12-15',
      readTime: '5 min',
      imageUrl: '/images/default.webp',
      featured: true
    },
    {
      id: '2',
      title: '如何使用 Space Profiler 优化应用性能',
      slug: 'optimize-app-performance-with-space-profiler',
      excerpt: '本教程将指导您如何使用 Space Profiler 工具识别和解决应用中的性能瓶颈。',
      content: '',
      category: 'tutorials',
      author: {
        name: '李华',
        avatar: '/images/default.webp'
      },
      publishedAt: '2023-11-28',
      readTime: '8 min',
      imageUrl: '/images/default.webp',
      featured: false
    },
    {
      id: '3',
      title: '开发者工具的未来趋势',
      slug: 'future-trends-in-developer-tools',
      excerpt: '探索开发者工具的未来发展方向，以及这些趋势将如何影响软件开发流程。',
      content: '',
      category: 'insights',
      author: {
        name: '王芳',
        avatar: '/images/default.webp'
      },
      publishedAt: '2023-11-15',
      readTime: '6 min',
      imageUrl: '/images/default.webp',
      featured: false
    },
    {
      id: '4',
      title: 'Space Brain 如何帮助企业提升开发效率',
      slug: 'how-space-brain-helps-enterprises',
      excerpt: '了解 Space Brain 工具套件如何帮助企业团队提高开发效率，减少错误，加速产品上市。',
      content: '',
      category: 'caseStudies',
      author: {
        name: '赵伟',
        avatar: '/images/default.webp'
      },
      publishedAt: '2023-10-30',
      readTime: '7 min',
      imageUrl: '/images/default.webp',
      featured: false
    },
    {
      id: '5',
      title: '使用 Space IDE 进行高效前端开发',
      slug: 'efficient-frontend-development-with-space-ide',
      excerpt: '探索如何利用 Space IDE 的特性和插件生态系统来提升前端开发效率。',
      content: '',
      category: 'tutorials',
      author: {
        name: '张明',
        avatar: '/images/default.webp'
      },
      publishedAt: '2023-10-18',
      readTime: '9 min',
      imageUrl: '/images/default.webp',
      featured: false
    },
    {
      id: '6',
      title: '开源贡献：为什么以及如何参与',
      slug: 'open-source-contributions',
      excerpt: '了解为什么参与开源项目对开发者职业发展很重要，以及如何开始您的开源贡献之旅。',
      content: '',
      category: 'community',
      author: {
        name: '李华',
        avatar: '/images/default.webp'
      },
      publishedAt: '2023-10-05',
      readTime: '6 min',
      imageUrl: '/images/default.webp',
      featured: false
    }
  ];
};

// 获取所有分类
const getCategories = (): Category[] => {
  return [
    { id: 'allPosts', name: 'All Posts' },
    { id: 'productUpdates', name: 'Product Updates' },
    { id: 'tutorials', name: 'Tutorials' },
    { id: 'insights', name: 'Insights' },
    { id: 'caseStudies', name: 'Case Studies' },
    { id: 'community', name: 'Community' }
  ];
};

export default function BlogPage() {
  const t = useTranslations('blog');
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'allPosts';
  
  const [posts] = useState<BlogPost[]>(getBlogPosts());
  const [categories] = useState<Category[]>(getCategories());
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  
  // 根据选中的分类过滤文章
  const filteredPosts = selectedCategory === 'allPosts' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  // 获取特色文章，并确保它存在
  const featuredPost = posts.find(post => post.featured) || posts[0];
  
  // 获取最近的文章
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  // 当URL参数变化时更新选中的分类
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  return (
    <div className="container mx-auto py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">{t('hero.title')}</h1>
        <p className="text-xl text-muted-foreground">{t('hero.subtitle')}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/4 space-y-12">
          {featuredPost && (
            <div className="relative rounded-xl overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src="/images/default.webp"
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 75vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <Badge className="mb-2 self-start">{featuredPost.category}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{featuredPost.title}</h2>
                <p className="text-white/80 mb-4 max-w-2xl">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src="/images/default.webp"
                        alt={featuredPost.author.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <span>{featuredPost.author.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime} {t('readTime')}</span>
                  </div>
                  <div>{featuredPost.publishedAt}</div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPosts.map((post: BlogPost) => (
              <div key={post.id} className="group">
                <Link href={`/blog/${post.slug}`} className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src="/images/default.webp"
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <Badge className="mb-2">{t(`categories.${post.category}`)}</Badge>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src="/images/default.webp"
                            alt={post.author.name}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm">{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime} {t('readTime')}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full">
            {t('loadMore')}
          </Button>
        </div>

        <div className="md:w-1/4 space-y-8">
          <div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder={t('searchPlaceholder')}
                className="w-full pl-9 pr-4 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">{t('categoriesName')}</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'allPosts' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('allPosts')}
              >
                {t('allPosts')}
              </Button>
              {categories.map((category: Category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {t(`categories.${category.id}`)}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">{t('recentPosts')}</h3>
            <div className="space-y-4">
              {recentPosts.map((post: BlogPost) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-3 group">
                  <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/default.webp"
                      alt={post.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium group-hover:text-primary transition-colors">{post.title}</h4>
                    <p className="text-sm text-muted-foreground">{post.publishedAt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}