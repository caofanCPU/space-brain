/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, Code, Database, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'products' });
  
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('products');
  
  // 产品数据
  const products = [
    {
      id: 'ide',
      title: t('categories.ide'),
      description: '为开发者打造的智能集成开发环境，提供代码补全、调试和版本控制等功能',
      icon: Code,
      color: 'bg-blue-500'
    },
    {
      id: 'tools',
      title: t('categories.tools'),
      description: '专业开发工具套件，包括性能分析、代码审查和测试自动化工具',
      icon: Database,
      color: 'bg-purple-500'
    },
    {
      id: 'plugins',
      title: t('categories.plugins'),
      description: '丰富的插件和扩展，为您的开发环境增添更多功能',
      icon: Shield,
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-0">
              <div className={`w-12 h-12 rounded-lg ${product.color} flex items-center justify-center mb-4`}>
                <product.icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold">{product.title}</CardTitle>
              <CardDescription className="text-base mt-2">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Button variant="outline" className="w-full group" asChild>
                <Link href={`/${locale}/products/${product.id}`}>
                  了解更多
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-8">为什么选择 Space-Brain?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-3">高效开发</h3>
            <p className="text-gray-600">我们的工具能帮助您更快地编写代码，减少重复工作，提高开发效率。</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-3">智能辅助</h3>
            <p className="text-gray-600">AI驱动的代码补全和建议，帮助您编写更高质量的代码。</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-3">团队协作</h3>
            <p className="text-gray-600">内置的协作工具，让团队成员能够无缝协作，提高项目效率。</p>
          </div>
        </div>
      </div>
    </div>
  );
} 