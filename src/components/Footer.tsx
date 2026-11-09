import React from 'react';
import { SCHOOL_INFO } from '../data/initialData';
import { NavTab } from '../types';
import { Mail, Phone, MapPin, ShieldAlert, Heart, ExternalLink, Settings } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenManagePosts: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenManagePosts }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      {/* Upper Footer: Institutional Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {/* Col 1: Brand & Slogan */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
              TC
            </div>
            <div>
              <span className="font-extrabold text-sm text-white block uppercase tracking-tight">
                {SCHOOL_INFO.name}
              </span>
              <span className="text-[10px] text-blue-300 uppercase tracking-widest font-medium">
                {SCHOOL_INFO.subTitle}
              </span>
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-md pt-2">
            Mái trường thân thiện của con em đồng bào các dân tộc xã Thu Cúc. Đoàn kết – Trách nhiệm – Đổi mới – Phát triển vì thế hệ tương lai.
          </p>

          <div className="pt-2 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>{SCHOOL_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-white transition-colors">
                {SCHOOL_INFO.email}
              </a>
            </div>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="lg:col-span-3 space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Chuyên Mục Chính
          </h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>
              <button
                onClick={() => onNavigateTab('trang-chu')}
                className="hover:text-white transition-colors"
              >
                Trang chủ
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('gioi-thieu')}
                className="hover:text-white transition-colors"
              >
                Giới thiệu nhà trường
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('tin-tuc')}
                className="hover:text-white transition-colors"
              >
                Tin tức & Sự kiện
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('ban-tru')}
                className="hover:text-white transition-colors"
              >
                Học sinh dân tộc bán trú
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('van-ban')}
                className="hover:text-white transition-colors"
              >
                Văn bản – Công khai
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('chuyen-doi-so')}
                className="hover:text-white transition-colors"
              >
                Chuyển đổi số & Học bạ số
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Security & Privacy Notice (PDF Section VIII) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>An toàn thông tin học đường</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Cổng thông tin nghiêm túc thực hiện nguyên tắc bảo mật dữ liệu học sinh: Không công khai thông tin cá nhân nhạy cảm, điểm số chi tiết hay số điện thoại của học sinh lên môi trường mạng công khai.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenManagePosts}
                className="text-[11px] font-semibold text-blue-300 hover:text-white flex items-center gap-1"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Khu vực Ban biên tập & Đăng bài</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-400 text-[11px]">
          <div>
            © {new Date().getFullYear()} Trường PTDTBT THCS Thu Cúc. Bản quyền thuộc về Cổng thông tin điện tử nhà trường.
          </div>
          <div className="flex items-center gap-4">
            <span>Email liên hệ: {SCHOOL_INFO.email}</span>
            <span aria-hidden="true">·</span>
            <span>Tỉnh Phú Thọ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
