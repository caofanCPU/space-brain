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
    <div className="container mx-auto py-12">
      {/* 页面标题 */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold tracking-tight">{t('hero.title')}</h1>
        <p className="text-xl text-muted-foreground">{t('hero.subtitle')}</p>
      </div>

      {/* 搜索和分类筛选 - 放在顶部，宽度占满 */}
      <div className="mb-12 space-y-6">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="search"
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-4 py-3 border rounded-md"
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Button
            variant={selectedCategory === 'allPosts' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('allPosts')}
            className="px-4 py-2 text-sm"
          >
            {t('allPosts')}
          </Button>
          {categories.map((category: Category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="px-4 py-2 text-sm"
            >
              {t(`categories.${category.id}`)}
            </Button>
          ))}
        </div>
      </div>

      {/* 特色文章 - 全宽展示 */}
      {featuredPost && (
        <div className="mb-12">
          <div className="relative rounded-xl overflow-hidden">
            <div className="relative aspect-[21/9]">
              <Image
                src="/images/default.webp"
                alt={featuredPost.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
              <Badge className="mb-2 self-start">{t(`categories.${featuredPost.category}`)}</Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-2 max-w-3xl">{featuredPost.title}</h2>
              <p className="text-white/80 mb-4 max-w-2xl md:text-lg">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 flex-wrap">
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
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-12">
        {/* 文章列表 - 自适应布局 */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post: BlogPost) => (
              <div key={post.id} className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  <div className="relative aspect-video">
                    <Image
                      src="/images/default.webp"
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <Badge className="self-start mb-2">{t(`categories.${post.category}`)}</Badge>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm line-clamp-3">{post.excerpt}</p>
                    <div className="mt-auto flex items-center gap-4">
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
                      <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="px-8">
              {t('loadMore')}
            </Button>
          </div>
        </div>

        {/* 侧边栏 - 最近文章和热门标签 */}
        <div className="lg:w-1/4 space-y-8">
          <div className="bg-muted/30 p-6 rounded-lg">
            <h3 className="font-medium mb-4 text-lg border-b pb-2">{t('recentPosts')}</h3>
            <div className="space-y-4">
              {recentPosts.map((post: BlogPost) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-3 group">
                  <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/default.webp"
                      alt={post.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2 text-sm">{post.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{post.publishedAt}</p>
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