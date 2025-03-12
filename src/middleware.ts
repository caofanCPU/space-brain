import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // 支持的语言列表
  locales,
  // 默认语言
  defaultLocale,
  // 禁用自动语言检测，确保使用defaultLocale作为默认语言
  localeDetection: false,
  // 设置为 'always'，确保所有路径都有语言前缀
  localePrefix: 'always'
});

export const config = {
  // 匹配所有路径，但排除静态资源和API路由
  matcher: [
    "/((?!api|_next|.*\\..*).*)"
  ],
};