/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// 模拟博客数据，实际项目中应从数据库获取
const getBlogPosts = async () => {
  return [
    {
      id: '1',
      title: 'Space IDE 2.5 发布：新特性与改进',
      slug: 'space-ide-2-5-release',
      excerpt: '我们很高兴地宣布 Space IDE 2.5 的发布，带来了多项新特性和性能改进，提升您的开发体验。',
      content: '',
      category: 'product-updates',
      author: {
        name: '张明',
        avatar: '/images/authors/zhang-ming.webp'
      },
      publishedAt: '2023-12-15',
      readTime: '5 min',
      imageUrl: '/images/blog/space-ide-2-5.webp',
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
        avatar: '/images/authors/li-hua.webp'
      },
      publishedAt: '2023-11-28',
      readTime: '8 min',
      imageUrl: '/images/blog/space-profiler-tutorial.webp',
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
        avatar: '/images/authors/wang-fang.webp'
      },
      publishedAt: '2023-11-15',
      readTime: '6 min',
      imageUrl: '/images/blog/future-trends.webp',
      featured: false
    },
    {
      id: '4',
      title: 'Space Brain 如何帮助企业提升开发效率',
      slug: 'how-space-brain-helps-enterprises',
      excerpt: '了解 Space Brain 工具套件如何帮助企业团队提高开发效率，减少错误，加速产品上市。',
      content: '',
      category: 'case-studies',
      author: {
        name: '赵伟',
        avatar: '/images/authors/zhao-wei.webp'
      },
      publishedAt: '2023-10-30',
      readTime: '7 min',
      imageUrl: '/images/blog/enterprise-efficiency.webp',
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
        avatar: '/images/authors/zhang-ming.webp'
      },
      publishedAt: '2023-10-18',
      readTime: '9 min',
      imageUrl: '/images/blog/frontend-development.webp',
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
        avatar: '/images/authors/li-hua.webp'
      },
      publishedAt: '2023-10-05',
      readTime: '6 min',
      imageUrl: '/images/blog/open-source.webp',
      featured: false
    }
  ];
};

// 获取博客分类
const getCategories = async () => {
  return [
    { id: 'all', name: 'All Posts' },
    { id: 'product-updates', name: 'Product Updates' },
    { id: 'tutorials', name: 'Tutorials' },
    { id: 'insights', name: 'Insights' },
    { id: 'case-studies', name: 'Case Studies' },
    { id: 'community', name: 'Community' }
  ];
};

export default async function BlogPage({ searchParams }: { searchParams: { category?: string } }) {
  const t = await getTranslations('blog');
  const posts = await getBlogPosts();
  const categories = await getCategories();
  const selectedCategory = searchParams.category || 'all';

  // 过滤文章
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  // 获取特色文章
  const featuredPost = posts.find(post => post.featured);

  return (
    <div className="container mx-auto py-12 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">{t('hero.title')}</h1>
        <p className="text-xl text-muted-foreground">{t('hero.subtitle')}</p>
      </div>

      {/* 特色文章 */}
      {featuredPost && (
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={featuredPost.imageUrl}
              alt={featuredPost.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
          </div>
          <div className="relative z-10 p-8 md:p-12 text-white max-w-3xl">
            <Badge className="mb-4 bg-primary hover:bg-primary/80 text-white">
              {t(`categories.${featuredPost.category}`)}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{featuredPost.title}</h2>
            <p className="text-lg mb-6 text-white/80">{featuredPost.excerpt}</p>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{featuredPost.author.name}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                <span>{featuredPost.publishedAt}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>{featuredPost.readTime}</span>
              </div>
            </div>
            <Button asChild variant="secondary">
              <Link href={`/blog/${featuredPost.slug}`}>
                {t('readMore')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* 分类过滤器 */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map(category => (
          <Link 
            key={category.id} 
            href={`/blog${category.id === 'all' ? '' : `?category=${category.id}`}`}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category.id 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted hover:bg-muted/80'
            }`}
          >
            {t(`categories.${category.id}`)}
          </Link>
        ))}
      </div>

      {/* 博客文章列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <Card key={post.id} className="flex flex-col h-full overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">
                  {t(`categories.${post.category}`)}
                </Badge>
                <div className="text-sm text-muted-foreground">{post.publishedAt}</div>
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium">{post.author.name}</span>
                <span className="text-sm text-muted-foreground ml-auto flex items-center">
                  <Clock className="mr-1 h-3 w-3" /> {post.readTime}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href={`/blog/${post.slug}`}>
                  {t('readArticle')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 订阅区域 */}
      <div className="bg-muted rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">{t('subscribe.title')}</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{t('subscribe.description')}</p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder={t('subscribe.placeholder')}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button type="submit">
            {t('subscribe.button')}
          </Button>
        </div>
      </div>
    </div>
  );
} 