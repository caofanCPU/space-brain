/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'zh'];
export const defaultLocale = 'zh';

export default getRequestConfig(async ({
  requestLocale
}) => {
  // 这通常对应于由中间件匹配的 [locale] 段
  let locale = await requestLocale;

  // 确保传入的区域设置有效
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});