import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // 支持的语言列表
  locales,
  // 默认语言
  defaultLocale,
  // 可选：如果访问不支持的语言路径，重定向到默认语言
  localeDetection: true,
  // 设置为 'always'，确保所有路径都有语言前缀
  localePrefix: 'always'
});

export const config = {
  // 匹配所有路径，但排除静态资源和API路由
  matcher: [
    "/((?!api|_next|.*\\..*).*)"
  ],
};