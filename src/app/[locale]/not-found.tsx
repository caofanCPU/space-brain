/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'zh'; // 获取当前语言，默认为中文

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-24 bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">页面未找到</h2>
        <p className="mt-6 text-base leading-7 text-gray-600">
          抱歉，我们找不到您请求的页面。
        </p>
        <div className="mt-10">
          <Button asChild>
            <Link href={`/${locale}`}>返回首页</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 