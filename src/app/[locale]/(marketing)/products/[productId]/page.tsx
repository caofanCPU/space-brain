/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

// 产品ID类型
type ProductId = 'ide' | 'tools' | 'plugins';

// 验证产品ID是否有效
function isValidProductId(id: string): id is ProductId {
  return ['ide', 'tools', 'plugins'].includes(id);
}

export default async function ProductPage({ 
  params: { locale, productId } 
}: { 
  params: { locale: string; productId: string } 
}) {
  // 验证产品ID
  if (!isValidProductId(productId)) {
    notFound();
  }

  const t = await getTranslations('products');
  
  // 根据产品ID获取产品信息
  const productInfo = {
    ide: {
      title: "Space-Brain IDE",
      description: "强大的集成开发环境，为开发者提供智能编码体验",
      features: [
        "智能代码补全",
        "实时错误检测",
        "内置版本控制",
        "多语言支持",
        "可定制界面",
        "高级调试工具"
      ],
      image: "/images/product-ide.png"
    },
    tools: {
      title: "Space-Brain Tools",
      description: "专业开发工具套件，提升您的开发效率",
      features: [
        "性能分析工具",
        "代码质量检查",
        "自动化测试",
        "构建工具",
        "部署助手",
        "监控系统"
      ],
      image: "/images/product-tools.png"
    },
    plugins: {
      title: "Space-Brain Plugins",
      description: "丰富的插件和扩展，为您的开发环境增添更多功能",
      features: [
        "主题和界面定制",
        "语言支持扩展",
        "框架集成",
        "云服务连接器",
        "协作工具",
        "生产力增强"
      ],
      image: "/images/product-plugins.png"
    }
  };

  const product = productInfo[productId];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
            {product.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {product.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href={`/${locale}/download`}>
                <Download className="mr-2 h-5 w-5" />
                下载试用
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={`/${locale}/pricing`}>查看价格</Link>
            </Button>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
          <div className="w-full h-64 relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">主要功能</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{feature}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8">准备好提升您的开发体验了吗？</h2>
        <Button size="lg" asChild>
          <Link href={`/${locale}/download`}>
            立即开始使用
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
} 