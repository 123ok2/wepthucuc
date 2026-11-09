import React, { useState } from 'react';
import { NavTab } from '../types';
import { PenLine, Settings, Menu, X, ChevronDown, Mail, Phone, BookOpen, ShieldCheck, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { SCHOOL_INFO } from '../data/initialData';
import { User } from 'firebase/auth';

interface HeaderProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenCreatePost: () => void;
  onOpenManagePosts: () => void;
  articleCount: number;
  currentUser: User | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenCreatePost,
  onOpenManagePosts,
  articleCount,
  currentUser,
  onOpenAuthModal,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const mainNavItems: { tab: NavTab; label: string }[] = [
    { tab: 'trang-chu', label: 'Trang chủ' },
    { tab: 'gioi-thieu', label: 'Giới thiệu' },
    { tab: 'tin-tuc', label: 'Tin tức' },
    { tab: 'ban-tru', label: 'Học sinh bán trú' },
    { tab: 'van-ban', label: 'Văn bản' },
  ];

  const secondaryNavItems: { tab: NavTab; label: string }[] = [
    { tab: 'chuyen-mon', label: 'Chuyên môn' },
    { tab: 'chuyen-doi-so', label: 'Chuyển đổi số' },
    { tab: 'thu-vien-anh', label: 'Thư viện ảnh' },
    { tab: 'lien-he', label: 'Liên hệ' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* Institutional Top Strip: Vietnamese School Identity */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
            <span className="text-amber-300 font-semibold tracking-wide">
              {SCHOOL_INFO.slogan}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-300 text-[11px]">
            <a
              href={`mailto:${SCHOOL_INFO.email}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Mail className="w-3 h-3 text-amber-400" />
              <span>{SCHOOL_INFO.email}</span>
            </a>
            <span className="hidden md:inline" aria-hidden="true">·</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-blue-300" />
              <span>{SCHOOL_INFO.phone}</span>
            </span>
            <span aria-hidden="true">·</span>

            {/* Admin status in top bar */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 font-semibold text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Admin:</span>
                  <span className="max-w-[120px] truncate">{currentUser.email || 'Quản trị viên'}</span>
                </span>
                <button
                  onClick={onOpenManagePosts}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold text-slate-200"
                >
                  <Settings className="w-3 h-3" />
                  <span>Quản trị ({articleCount})</span>
                </button>
                <button
                  onClick={onLogout}
                  title="Đăng xuất quản trị viên"
                  className="hover:text-rose-300 transition-colors flex items-center gap-1 text-slate-300"
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden sm:inline">Thoát</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold text-amber-200"
              >
                <LogIn className="w-3 h-3" />
                <span>Đăng nhập Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Bar complying with Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 border-b border-slate-200">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onTabChange('trang-chu')}
            className="flex items-center gap-2.5 text-left text-blue-900 hover:text-blue-700 transition-colors shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
              TC
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-slate-900 whitespace-nowrap uppercase">
                PTDTBT THCS Thu Cúc
              </span>
              <span className="text-[10px] text-slate-500 tracking-wider uppercase font-medium">
                Cổng thông tin điện tử
              </span>
            </div>
          </button>

          {/* Zone 2: 4–5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {mainNavItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => onTabChange(item.tab)}
                className={`whitespace-nowrap transition-colors py-2 relative ${
                  currentTab === item.tab
                    ? 'text-blue-700 font-bold'
                    : 'hover:text-blue-700 text-slate-600'
                }`}
              >
                {item.label}
                {currentTab === item.tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-700 rounded-full" />
                )}
              </button>
            ))}

            {/* Dropdown for More Sections */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-slate-600 hover:text-blue-700 py-2 transition-colors whitespace-nowrap"
              >
                <span>Chuyên mục khác</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {secondaryNavItems.map((item) => (
                    <button
                      key={item.tab}
                      onClick={() => {
                        onTabChange(item.tab);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-50 transition-colors block ${
                        currentTab === item.tab ? 'text-blue-700 font-bold bg-blue-50/50' : 'text-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {currentUser ? (
              <button
                onClick={onOpenCreatePost}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap"
              >
                <PenLine className="w-3.5 h-3.5" />
                <span>Đăng bài mới</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Admin đăng nhập</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 space-y-1">
            {[...mainNavItems, ...secondaryNavItems].map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  onTabChange(item.tab);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                  currentTab === item.tab
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-200">
              {currentUser ? (
                <div className="space-y-1.5 px-3 py-2 bg-blue-50/50 rounded-lg">
                  <div className="text-xs font-semibold text-blue-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="truncate">{currentUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        onOpenManagePosts();
                        setMobileMenuOpen(false);
                      }}
                      className="text-xs text-blue-700 font-semibold"
                    >
                      Quản lý ({articleCount})
                    </button>
                    <span aria-hidden="true">·</span>
                    <button
                      onClick={() => {
                        onLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-xs text-rose-600 font-semibold"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuthModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-bold text-blue-700 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Đăng nhập Admin để đăng bài</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
