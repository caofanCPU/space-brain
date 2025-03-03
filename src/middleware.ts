import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // 支持的语言列表
  locales,
  // 默认语言
  defaultLocale,
  // 可选：如果访问不支持的语言路径，重定向到默认语言
  localeDetection: true,
  // 移除 localePrefix 配置或设置为 'always'
  localePrefix: 'always'
});

export const config = {
  // 确保不匹配已经包含语言前缀的路径
  matcher: ['/((?!api|_next|.*\\..*|zh|en).*)']
}; 