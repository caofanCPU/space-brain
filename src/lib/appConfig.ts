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
    locales: ['en', 'zh'] as const,
    defaultLocale: 'en' as const,
    localeLabels: {
      en: 'English',
      zh: '简体中文'
    },
    timeZone: 'America/New_York'
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