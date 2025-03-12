'use client';

import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface SearchButtonProps {
  isScrolled?: boolean;
}

export function SearchButton({ isScrolled }: SearchButtonProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('common.search');

  // 点击外部关闭搜索框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  // 按ESC键关闭搜索框
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isSearchOpen]);

  // 自动聚焦输入框
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // 模拟的最近搜索记录
  const recentSearches = ['Space-Brain IDE', 'AI Assistant', 'Kotlin', 'Code With Me'];

  return (
    <div className="relative">
      {!isSearchOpen ? (
        <button
          className={cn(
            "p-2 rounded-full transition-colors duration-200",
            isScrolled ? "text-[#1a1a1a] hover:bg-gray-100" : "text-white hover:bg-[#3C3F41]"
          )}
          onClick={() => setIsSearchOpen(true)}
          aria-label="Open search"
        >
          <Search className="h-5 w-5" />
        </button>
      ) : (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
          <div 
            ref={modalRef}
            className="w-full max-w-2xl mx-4 relative animate-fade-in"
          >
            <div className="bg-white/95 dark:bg-[#2B2D30]/95 rounded-xl shadow-xl overflow-hidden relative backdrop-blur-sm">
              {/* 更柔和的渐变背景 */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#6B57FF]/5 via-[#9B6BFF]/10 to-[#6B57FF]/5 animate-gradient-x pointer-events-none" />
              
              <div className="relative flex items-center px-6">
                <Search className="h-5 w-5 text-[#6B57FF]/70 dark:text-[#9B6BFF]/70 mr-4 flex-shrink-0 transition-colors duration-300" />
                <input
                  ref={inputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-5 bg-transparent outline-none border-none text-gray-900 dark:text-white placeholder-gray-400/70 text-lg leading-relaxed appearance-none focus:ring-0 focus:outline-none transition-all duration-300"
                  style={{
                    WebkitAppearance: 'none',
                    boxShadow: 'none'
                  }}
                  placeholder={t('placeholder')}
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
              </div>
            
            {/* 搜索结果区域 - 更新分隔线和悬停效果 */}
            <div className="border-t border-[#6B57FF]/10 dark:border-[#9B6BFF]/10">
              {searchQuery ? (
                <div className="p-4 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#6B57FF]/20 border-t-[#6B57FF]"></div>
                  <span className="ml-3 text-gray-600/90 dark:text-gray-300/90">
                    {t('searching')} "{searchQuery}"...
                  </span>
                </div>
              ) : (
                <div>
                  <div className="px-6 py-3 text-sm text-[#6B57FF]/70 dark:text-[#9B6BFF]/70 font-medium">
                    {t('recentSearches')}
                  </div>
                  <div>
                    {recentSearches.map((search, index) => (
                      <div 
                        key={index}
                        className="flex items-center px-6 py-3 hover:bg-[#6B57FF]/5 dark:hover:bg-[#9B6BFF]/10 cursor-pointer transition-colors duration-200"
                        onClick={() => setSearchQuery(search)}
                      >
                        <Search className="h-4 w-4 text-[#6B57FF]/50 dark:text-[#9B6BFF]/50 mr-3" />
                        <span className="text-gray-700/90 dark:text-gray-300/90">{search}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}