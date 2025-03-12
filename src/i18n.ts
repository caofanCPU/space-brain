/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { getRequestConfig } from 'next-intl/server';

import { appConfig, validateLocale } from '@/lib/appConfig';

export const locales = appConfig.i18n.locales;
export const defaultLocale = appConfig.i18n.defaultLocale;

export default getRequestConfig(async ({ locale }) => {
  const validLocale = validateLocale(locale);
  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default,
    timeZone: appConfig.i18n.timeZone
  };
});