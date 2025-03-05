/**
 * @license
 * MIT License
 * Copyright (c) 2025 D8ger
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, ChevronDown, Search, Globe, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { locales } from '@/i18n';

export default function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const locale = pathname.split('/')[1]; // 获取当前语言
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 监听滚动事件，用于导航栏背景变化
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    // 初始化时立即检查滚动位置
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 处理点击外部区域关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 处理语言切换 - 使用硬刷新方式
  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;
    
    // 构建新的URL路径 - 改进的方法
    let pathSegments = pathname.split('/');
    if (pathSegments.length > 1 && locales.includes(pathSegments[1])) {
      // 如果第一个路径段是有效的语言代码，替换它
      pathSegments[1] = newLocale;
    } else {
      // 如果第一个路径段不是语言代码，在路径前添加语言代码
      pathSegments = ['', newLocale, ...pathSegments.slice(1)];
    }
    
    const newPath = pathSegments.join('/');
    
    // 使用window.location进行硬刷新
    window.location.href = newPath;
    
    // 可选：添加调试日志
    console.log(`Switching language from ${locale} to ${newLocale}, new path: ${newPath}`);
    console.log(pathSegments);
  };

  // 处理菜单项点击 - 确保点击后菜单关闭
  const handleMenuItemClick = () => {
    setActiveDropdown(null);
  };

  // 处理菜单悬停延迟
  const handleMenuEnter = (itemName: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    setActiveDropdown(itemName);
  };

  const handleMenuLeave = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // 150ms延迟关闭
  };

  const navigation = [
    { name: t('nav.home'), href: `/${locale}` },
    { 
      name: t('nav.products'), 
      href: `/${locale}/products`,
      dropdown: true,
      feature: {
        primary: {
          icon: '🧠',
          title: t('products.feature.primary.title'),
          description: t('products.feature.primary.description'),
          href: `/${locale}/products/ide`
        },
        secondary: {
          icon: 'QD',
          title: t('products.feature.secondary.title'),
          description: t('products.feature.secondary.description'),
          href: `/${locale}/products/quality`
        }
      },
      sections: [
        {
          title: t('products.sections.ides'),
          items: [
            { 
              name: 'Space-Brain IDE', 
              href: `/${locale}/products/ide`,
              description: t('products.ide.shortDesc'),
              icon: '🧠'
            },
            { 
              name: 'Space-Brain Cloud', 
              href: `/${locale}/products/cloud`,
              description: t('products.cloud.shortDesc'),
              icon: '☁️'
            },
            { 
              name: 'Space-Brain Mobile', 
              href: `/${locale}/products/mobile`,
              description: t('products.mobile.shortDesc'),
              icon: '📱'
            },
          ]
        },
        {
          title: t('products.sections.plugins'),
          items: [
            { 
              name: 'AI Assistant', 
              href: `/${locale}/products/ai-assistant`,
              description: t('products.ai.shortDesc'),
              icon: '🤖'
            },
            { 
              name: 'IDE Themes', 
              href: `/${locale}/products/themes`,
              description: t('products.themes.shortDesc'),
              icon: '🎨'
            },
            { 
              name: 'Code With Me', 
              href: `/${locale}/products/code-with-me`,
              description: t('products.codewithme.shortDesc'),
              icon: '👥'
            },
          ]
        },
        {
          title: t('products.sections.dotnet'),
          items: [
            { 
              name: 'Rider', 
              href: `/${locale}/products/rider`,
              description: t('products.rider.shortDesc'),
              icon: '🏍️'
            },
            { 
              name: 'ReSharper', 
              href: `/${locale}/products/resharper`,
              description: t('products.resharper.shortDesc'),
              icon: '♯'
            },
            { 
              name: 'dotCover', 
              href: `/${locale}/products/dotcover`,
              description: t('products.dotcover.shortDesc'),
              icon: '🛡️'
            },
          ]
        },
        {
          title: t('products.sections.languages'),
          items: [
            { 
              name: 'Kotlin', 
              href: `/${locale}/products/kotlin`,
              description: t('products.kotlin.shortDesc'),
              icon: 'K'
            },
            { 
              name: 'MPS', 
              href: `/${locale}/products/mps`,
              description: t('products.mps.shortDesc'),
              icon: 'M'
            },
            { 
              name: 'Compose Multiplatform', 
              href: `/${locale}/products/compose`,
              description: t('products.compose.shortDesc'),
              icon: '🎭'
            },
          ]
        }
      ]
    },
    { name: t('nav.solutions'), href: `/${locale}/solutions` },
    { name: t('nav.pricing'), href: `/${locale}/pricing` },
    { name: t('nav.download'), href: `/${locale}/download` },
    { name: t('nav.about'), href: `/${locale}/about` },
    { name: t('nav.blog'), href: `/${locale}/blog` },
  ];

  return (
    <header className={cn(
      "absolute top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white shadow-sm" : "bg-[#1a1a1a]"
    )}>
      {/* JetBrains风格的顶部彩条 */}
      <div className="h-1 w-full bg-gradient-to-r from-[#21D789] via-[#087CFA] to-[#FE2857]"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center">
              <div className="w-8 h-8 mr-2 bg-[#087CFA] rounded-md flex items-center justify-center text-white font-bold">
                SB
              </div>
              <span className={cn(
                "text-xl font-bold",
                isScrolled ? "text-[#1a1a1a]" : "text-white"
              )}>
                {t('appName')}
              </span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:ml-6 md:flex md:space-x-1" ref={dropdownRef}>
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <div 
                    className="group" 
                    onMouseEnter={() => handleMenuEnter(item.name)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <button
                      className={cn(
                        "nav-link h-[56px] px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center",
                        pathname.startsWith(item.href)
                          ? "nav-link-active" 
                          : isScrolled ? "text-[#1a1a1a] hover:text-[#087CFA]" : "text-white hover:text-[#087CFA]"
                      )}
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    >
                      {item.name}
                      <ChevronDown className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-200",
                        activeDropdown === item.name ? "rotate-180" : ""
                      )} />
                    </button>
                    
                    {/* JetBrains风格多列下拉菜单 - 居中显示 */}
                    {activeDropdown === item.name && (
                      <div 
                        className={cn(
                          "jetbrains-dropdown",
                          activeDropdown === item.name 
                            ? "jetbrains-dropdown-visible" 
                            : "jetbrains-dropdown-hidden"
                        )}
                      >
                        {/* 左侧特色区域 */}
                        {item.feature && (
                          <div className="jetbrains-dropdown-feature">
                            <div className="jetbrains-feature-item jetbrains-feature-item-primary">
                              <div className="jetbrains-feature-icon">
                                <span>{item.feature.primary.icon}</span>
                              </div>
                              <h3 className="jetbrains-feature-title">{item.feature.primary.title}</h3>
                              <p className="jetbrains-feature-description">{item.feature.primary.description}</p>
                              <Link href={item.feature.primary.href} className="jetbrains-feature-button" onClick={handleMenuItemClick}>
                                <ChevronRight className="h-5 w-5" />
                              </Link>
                            </div>
                            <div className="jetbrains-feature-item jetbrains-feature-item-secondary">
                              <div className="jetbrains-feature-icon">
                                <span>{item.feature.secondary.icon}</span>
                              </div>
                              <h3 className="jetbrains-feature-title">{item.feature.secondary.title}</h3>
                              <p className="jetbrains-feature-description">{item.feature.secondary.description}</p>
                              <Link href={item.feature.secondary.href} className="jetbrains-feature-button" onClick={handleMenuItemClick}>
                                <ChevronRight className="h-5 w-5" />
                              </Link>
                            </div>
                          </div>
                        )}
                        
                        {/* 右侧内容区域 */}
                        <div className="jetbrains-dropdown-content">
                          <div className="jetbrains-dropdown-sections">
                            {item.sections?.map((section, index) => (
                              <div key={index} className="jetbrains-dropdown-section">
                                <h3 className="jetbrains-dropdown-section-title">{section.title}</h3>
                                <div className="jetbrains-dropdown-section-content">
                                  {section.items.map((subItem) => (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.href}
                                      className="jetbrains-menu-item"
                                      onClick={handleMenuItemClick}
                                    >
                                      <div className="jetbrains-menu-item-icon">
                                        <span>{subItem.icon}</span>
                                      </div>
                                      <div className="jetbrains-menu-item-content">
                                        <p className="jetbrains-menu-item-title">
                                          {subItem.name}
                                        </p>
                                        <p className="jetbrains-menu-item-description">
                                          {subItem.description}
                                        </p>
                                      </div>
                                      <ChevronRight className="jetbrains-menu-item-arrow h-4 w-4" />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* 底部引导区域 */}
                          <div className="jetbrains-dropdown-footer">
                            <p className="jetbrains-dropdown-footer-text">
                              {t('products.footer.question')}
                            </p>
                            <Link href={`/${locale}/products/finder`} className="jetbrains-dropdown-footer-button">
                              {t('products.footer.cta')}
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "nav-link h-[56px] px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center",
                      pathname === item.href
                        ? "nav-link-active" 
                        : isScrolled ? "text-[#1a1a1a] hover:text-[#087CFA]" : "text-white hover:text-[#087CFA]"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button className={cn(
              "p-2 rounded-full transition-colors duration-200",
              isScrolled ? "text-[#1a1a1a] hover:bg-gray-100" : "text-white hover:bg-[#3C3F41]"
            )}>
              <Search className="h-5 w-5" />
            </button>
            
            {/* 语言切换下拉菜单 */}
            <div className="relative" ref={languageDropdownRef}>
              <button 
                className={cn(
                  "p-2 rounded-full transition-colors duration-200 flex items-center",
                  isScrolled ? "text-[#1a1a1a] hover:bg-gray-100" : "text-white hover:bg-[#3C3F41]"
                )}
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                aria-expanded={isLanguageDropdownOpen}
                aria-haspopup="true"
              >
                <Globe className="h-5 w-5" />
                <span className="ml-1 text-xs">{locale.toUpperCase()}</span>
                <ChevronDown className={cn(
                  "ml-1 h-4 w-4 transition-transform duration-200",
                  isLanguageDropdownOpen ? "rotate-180" : ""
                )} />
              </button>
              
              <div 
                className={cn(
                  "absolute right-0 mt-1 w-32 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-right z-50",
                  isLanguageDropdownOpen 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-95 pointer-events-none"
                )}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="language-menu"
              >
                <div className="py-1" role="none">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={cn(
                      "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100",
                      locale === 'en' ? "text-[#087CFA] font-medium" : "text-gray-700"
                    )}
                    role="menuitem"
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('zh')}
                    className={cn(
                      "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100",
                      locale === 'zh' ? "text-[#087CFA] font-medium" : "text-gray-700"
                    )}
                    role="menuitem"
                  >
                    中文
                  </button>
                </div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="jetbrains-button border-[#087CFA] text-[#087CFA] hover:bg-[#087CFA] hover:text-white"
              size="sm"
            >
              {t('buttons.signIn')}
            </Button>
            <Button 
              className="jetbrains-button bg-[#087CFA] hover:bg-[#0066cc] text-white"
              size="sm"
            >
              {t('buttons.getStarted')}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#087CFA]",
                isScrolled ? "text-[#1a1a1a] hover:bg-gray-100" : "text-white hover:bg-[#3C3F41]"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className={cn(
                        "w-full flex justify-between items-center rounded-md px-3 py-2 text-base font-medium transition-colors duration-200",
                        pathname.startsWith(item.href)
                          ? "bg-gray-100 text-[#087CFA]"
                          : "text-gray-700 hover:bg-gray-100 hover:text-[#087CFA]"
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-200",
                        activeDropdown === item.name ? "rotate-180" : ""
                      )} />
                    </button>
                    
                    {activeDropdown === item.name && (
                      <div className="pl-4 space-y-1 mt-1">
                        {item.feature && (
                          <>
                            <div className="mt-3">
                              <h4 className="text-xs font-semibold text-gray-500 px-3 mb-1">{item.feature.primary.title}</h4>
                              <Link
                                href={item.feature.primary.href}
                                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#087CFA]"
                                onClick={handleMenuItemClick}
                              >
                                <span className="mr-2">{item.feature.primary.icon}</span>
                                <div>
                                  <div>{item.feature.primary.title}</div>
                                  <div className="text-xs text-gray-500">{item.feature.primary.description}</div>
                                </div>
                              </Link>
                            </div>
                            <div className="mt-3">
                              <h4 className="text-xs font-semibold text-gray-500 px-3 mb-1">{item.feature.secondary.title}</h4>
                              <Link
                                href={item.feature.secondary.href}
                                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#087CFA]"
                                onClick={handleMenuItemClick}
                              >
                                <span className="mr-2">{item.feature.secondary.icon}</span>
                                <div>
                                  <div>{item.feature.secondary.title}</div>
                                  <div className="text-xs text-gray-500">{item.feature.secondary.description}</div>
                                </div>
                              </Link>
                            </div>
                          </>
                        )}
                        {item.sections?.map((section) => (
                          <div key={section.title} className="mt-3">
                            <h4 className="text-xs font-semibold text-gray-500 px-3 mb-1">{section.title}</h4>
                            {section.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-[#087CFA]"
                                onClick={handleMenuItemClick}
                              >
                                <span className="mr-2">{subItem.icon}</span>
                                <div>
                                  <div>{subItem.name}</div>
                                  <div className="text-xs text-gray-500">{subItem.description}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-base font-medium transition-colors duration-200",
                      pathname === item.href
                        ? "bg-gray-100 text-[#087CFA]"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#087CFA]"
                    )}
                    onClick={handleMenuItemClick}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            <div className="flex items-center justify-between px-4">
              <Button 
                variant="outline" 
                className="w-full mr-2 jetbrains-button border-[#087CFA] text-[#087CFA] hover:bg-[#087CFA] hover:text-white"
              >
                {t('buttons.signIn')}
              </Button>
              <Button 
                className="w-full ml-2 jetbrains-button bg-[#087CFA] hover:bg-[#0066cc] text-white"
              >
                {t('buttons.getStarted')}
              </Button>
            </div>
            
            <div className="mt-3 flex justify-center space-x-4 px-4">
              <button className="p-2 rounded-full text-gray-700 hover:bg-gray-100">
                <Search className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md hover:bg-gray-100",
                    locale === 'en' ? "text-[#087CFA] font-medium" : "text-gray-700"
                  )}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange('zh')}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md hover:bg-gray-100",
                    locale === 'zh' ? "text-[#087CFA] font-medium" : "text-gray-700"
                  )}
                >
                  中文
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}