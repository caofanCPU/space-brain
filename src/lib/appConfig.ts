/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const appConfig = {
  i18n: {
    locales: ['en', 'zh', 'ko', 'ja', 'de', 'fr', 'zh-Hant', 'it'] as const,
    defaultLocale: 'en' as const,
    localeLabels: {
      en: 'English',
      zh: '简体中文',
      ko: '한국어',
      ja: '日本語',
      de: 'Deutsch',
      fr: 'Français',
      'zh-Hant': '繁體中文',
      it: 'Italiano'
    },
    timeZone: 'America/New_York',
    detector: {
      storageKey: 'language-preference-status',
      autoCloseTimeout: 10000,
      expirationDays: 30,
      storagePrefix: 'space-brain'
    }
  },
  blog: {
    // 博客相关路径
    dir: 'public/md',
    config: 'public/md/blog-config.json',
    // 标签定义: 决定了翻译文件字段
    tags: [
      'productUpdates',
      'tutorials',
      'makeMoney',
      'roadOverSea',
      'insights'
    ],
    // 图片资源路径
    images: {
      default: '/images/default.webp',
      defaultAvatar: '/images/avatars/default.webp'
    },
    getTagDisplayCount: (_locale: string) => {
      return 2;
    },
  }
};

export type Locale = typeof appConfig.i18n.locales[number];

/**
 * 验证语言设置是否有效，如果无效则返回默认语言
 * @param locale 需要验证的语言设置
 * @returns 有效的语言设置
 */
export function validateLocale(locale: string | undefined): Locale {
  if (!locale || !appConfig.i18n.locales.includes(locale as Locale)) {
    return appConfig.i18n.defaultLocale;
  }
  return locale as Locale;
}