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
import { Menu, X, ChevronDown, Search, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

  // 处理点击外部关闭下拉菜单
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
    
    // 构建新的URL路径
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`;
    
    // 使用window.location进行硬刷新
    window.location.href = newPath;
  };

  const navigation = [
    { name: t('nav.home'), href: `/${locale}` },
    { 
      name: t('nav.products'), 
      href: `/${locale}/products`,
      dropdown: true,
      items: [
        { name: 'Space-Brain IDE', href: `/${locale}/products/ide` },
        { name: 'Space-Brain Cloud', href: `/${locale}/products/cloud` },
        { name: 'Space-Brain Mobile', href: `/${locale}/products/mobile` },
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
      "bg-[#1a1a1a]" // 始终使用深色背景
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
              <span className="text-xl font-bold text-white">
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
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className={cn(
                        "nav-link px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center",
                        pathname.startsWith(item.href)
                          ? "text-[#21D789] font-bold" 
                          : "text-white hover:text-[#21D789]"
                      )}
                    >
                      {item.name}
                      <ChevronDown className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-200",
                        activeDropdown === item.name ? "rotate-180" : ""
                      )} />
                    </button>
                    
                    {/* 下拉菜单 */}
                    <div 
                      className={cn(
                        "absolute left-0 mt-1 w-48 rounded-md bg-[#2B2B2B] shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-left",
                        activeDropdown === item.name 
                          ? "opacity-100 scale-100" 
                          : "opacity-0 scale-95 pointer-events-none"
                      )}
                    >
                      <div className="py-1">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-200 hover:bg-[#3C3F41] hover:text-[#21D789]"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "nav-link px-3 py-2 text-sm font-medium transition-colors duration-200 block",
                      pathname === item.href
                        ? "text-[#21D789] font-bold" 
                        : "text-white hover:text-[#21D789]"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button className="p-2 rounded-full text-white hover:bg-[#3C3F41] transition-colors duration-200">
              <Search className="h-5 w-5" />
            </button>
            
            {/* 语言切换下拉菜单 */}
            <div className="relative" ref={languageDropdownRef}>
              <button 
                className="p-2 rounded-full text-white hover:bg-[#3C3F41] transition-colors duration-200 flex items-center"
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
                  "absolute right-0 mt-1 w-32 rounded-md bg-[#2B2B2B] shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 origin-top-right z-50",
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
                      "block w-full text-left px-4 py-2 text-sm hover:bg-[#3C3F41]",
                      locale === 'en' ? "text-[#21D789] font-medium" : "text-gray-200"
                    )}
                    role="menuitem"
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('zh')}
                    className={cn(
                      "block w-full text-left px-4 py-2 text-sm hover:bg-[#3C3F41]",
                      locale === 'zh' ? "text-[#21D789] font-medium" : "text-gray-200"
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
              className="jetbrains-button bg-[#21D789] hover:bg-[#21D789]/90 text-white"
              size="sm"
            >
              {t('buttons.getStarted')}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-[#3C3F41] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#21D789]"
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
        <div className="md:hidden bg-[#2B2B2B] shadow-lg">
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
                          ? "bg-[#3C3F41] text-[#21D789]"
                          : "text-gray-200 hover:bg-[#3C3F41] hover:text-[#21D789]"
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
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-200 hover:bg-[#3C3F41] hover:text-[#21D789]"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
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
                        ? "bg-[#3C3F41] text-[#21D789]"
                        : "text-gray-200 hover:bg-[#3C3F41] hover:text-[#21D789]"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="border-t border-[#3C3F41] pb-3 pt-4">
            <div className="flex items-center justify-between px-4">
              <Button 
                variant="outline" 
                className="w-full mr-2 jetbrains-button border-[#087CFA] text-[#087CFA] hover:bg-[#087CFA] hover:text-white"
              >
                {t('buttons.signIn')}
              </Button>
              <Button 
                className="w-full ml-2 jetbrains-button bg-[#21D789] hover:bg-[#21D789]/90 text-white"
              >
                {t('buttons.getStarted')}
              </Button>
            </div>
            
            <div className="mt-3 flex justify-center space-x-4 px-4">
              <button className="p-2 rounded-full text-gray-200 hover:bg-[#3C3F41]">
                <Search className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md hover:bg-[#3C3F41]",
                    locale === 'en' ? "text-[#21D789] font-medium" : "text-gray-200"
                  )}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange('zh')}
                  className={cn(
                    "px-3 py-1 text-sm rounded-md hover:bg-[#3C3F41]",
                    locale === 'zh' ? "text-[#21D789] font-medium" : "text-gray-200"
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