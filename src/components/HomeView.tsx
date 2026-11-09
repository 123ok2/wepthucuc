import React from 'react';
import { Article, NavTab } from '../types';
import { SCHOOL_INFO } from '../data/initialData';
import { 
  Bell, 
  ArrowRight, 
  Calendar, 
  FileText, 
  UtensilsCrossed, 
  Laptop, 
  Camera, 
  Mail, 
  Pin, 
  Users, 
  Award, 
  BookOpen, 
  Sparkles,
  ChevronRight,
  PenLine
} from 'lucide-react';

interface HomeViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onNavigateTab: (tab: NavTab) => void;
  onOpenCreatePost: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  articles,
  onSelectArticle,
  onNavigateTab,
  onOpenCreatePost,
}) => {
  // Urgent notifications (Category = thong-bao or isPinned)
  const announcements = articles.filter(
    (a) => a.category === 'thong-bao' || a.isPinned
  ).slice(0, 4);

  // Featured lead article: pinned article first, or newest published article
  const leadArticle = articles.find((a) => a.isPinned) || articles[0];

  // Secondary news: Top 4 newest remaining articles
  const secondaryNews = articles.filter((a) => a.id !== leadArticle?.id).slice(0, 4);

  const quickLinks = [
    {
      title: 'Văn bản – Công khai',
      desc: 'Quyết định, kế hoạch, công khai thu chi & chất lượng',
      icon: FileText,
      tab: 'van-ban' as NavTab,
      bg: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
      title: 'Học sinh bán trú',
      desc: 'Nền nếp nội trú, thực đơn 3 bữa & chăm sóc học sinh',
      icon: UtensilsCrossed,
      tab: 'ban-tru' as NavTab,
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      title: 'Chuyển đổi số',
      desc: 'Học bạ số, cơ sở dữ liệu ngành & hướng dẫn CNTT',
      icon: Laptop,
      tab: 'chuyen-doi-so' as NavTab,
      bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
    {
      title: 'Thư viện hình ảnh',
      desc: 'Khoảnh khắc hoạt động dạy học & sinh hoạt tập thể',
      icon: Camera,
      tab: 'thu-vien-anh' as NavTab,
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      title: 'Liên hệ nhà trường',
      desc: 'Email chính thức, địa chỉ xã Thu Cúc & hộp thư góp ý',
      icon: Mail,
      tab: 'lien-he' as NavTab,
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Ticker / Urgent Notice Bar */}
      {announcements.length > 0 && (
        <section className="bg-amber-50/80 border-y border-amber-200/80 px-4 py-2.5">
          <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs text-amber-900">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-800 shrink-0">
              <Bell className="w-4 h-4 text-amber-600" />
              <span>Thông báo mới:</span>
            </div>
            <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-6">
              {announcements.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectArticle(item)}
                  className="hover:underline hover:text-amber-700 flex items-center gap-1.5 shrink-0"
                >
                  <span className="font-semibold text-slate-800">{item.title}</span>
                  <span className="text-amber-700 text-[11px] tabular-nums">({item.publishDate})</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hero Section: Collective Photo & Welcome Speech */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Text Zone */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-slate-50 via-white to-blue-50/40">
            <div>
              <div className="text-xs uppercase tracking-widest font-bold text-blue-700 mb-2">
                Trường PTDTBT THCS Thu Cúc · Xã Thu Cúc, Phú Thọ
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-title text-slate-900 tracking-tight leading-snug">
                {SCHOOL_INFO.name}
              </h1>
              <p className="mt-2 text-sm font-semibold text-rose-700 uppercase tracking-wide">
                {SCHOOL_INFO.slogan}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Lời chào từ Ban Giám Hiệu
                </div>
                <p className="text-sm text-slate-700 leading-relaxed text-justify">
                  {SCHOOL_INFO.welcomeMessage}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab('gioi-thieu')}
                className="px-5 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs hover:shadow transition-all inline-flex items-center gap-2"
              >
                <span>Tìm hiểu về nhà trường</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenCreatePost}
                className="px-4 py-2.5 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <PenLine className="w-3.5 h-3.5" />
                <span>Đăng tin bài mới</span>
              </button>
            </div>
          </div>

          {/* Right Media Zone: The Collective Photo requested in PDF Page 1 */}
          <div className="lg:col-span-7 relative bg-slate-900 flex flex-col justify-end">
            <img
              src={SCHOOL_INFO.collectivePhoto}
              alt="Tập thể Trường PTDTBT THCS Thu Cúc"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/assets/campus.jpg';
              }}
              className="w-full h-full min-h-[380px] lg:min-h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-300 mb-1">
                Ảnh tư liệu nhà trường
              </span>
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal">
                {SCHOOL_INFO.collectivePhotoCaption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Shortcuts (Truy cập nhanh) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Truy Cập Nhanh</h2>
            <p className="text-xs text-slate-500">Các chuyên mục nghiệp vụ và thông tin trọng tâm</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {quickLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => onNavigateTab(item.tab)}
                className={`p-4 rounded-xl border transition-all text-left group hover:-translate-y-0.5 hover:shadow-xs flex flex-col justify-between ${item.bg}`}
              >
                <div>
                  <div className="p-2 w-fit rounded-lg bg-white/80 mb-3 shadow-xs">
                    <Icon className="w-5 h-5 text-current" />
                  </div>
                  <h3 className="text-sm font-bold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-black/5 flex items-center gap-1 text-[11px] font-semibold">
                  <span>Xem chuyên mục</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Grid: Tin tức mới nhất (3-5 tin) & Thông báo bên lề */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tin tức mới nhất (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold font-serif-title text-slate-900">Tin Tức Mới Nhất</h2>
                <p className="text-xs text-slate-500">Cập nhật hoạt động dạy và học, phong trào thi đua</p>
              </div>
              <button
                onClick={() => onNavigateTab('tin-tuc')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
              >
                <span>Xem tất cả bài viết</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Lead Story Card */}
            {leadArticle && (
              <div
                onClick={() => onSelectArticle(leadArticle)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group grid grid-cols-1 md:grid-cols-12"
              >
                <div className="md:col-span-6 relative overflow-hidden bg-slate-100 min-h-[220px]">
                  <img
                    src={leadArticle.imageUrl}
                    alt={leadArticle.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/campus.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="md:col-span-6 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-blue-700">{leadArticle.categoryName}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{leadArticle.publishDate}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                      {leadArticle.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {leadArticle.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{leadArticle.author}</span>
                    <span className="font-semibold text-blue-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Đọc chi tiết →
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Secondary News Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {secondaryNews.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => onSelectArticle(art)}
                    className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-full h-36 rounded-lg overflow-hidden bg-slate-100 mb-3">
                        <img
                          src={art.imageUrl}
                          alt={art.title}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/assets/campus.jpg';
                          }}
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1.5">
                        <span className="font-semibold text-blue-700">{art.categoryName}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{art.publishDate}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 line-clamp-2 transition-colors leading-snug">
                        {art.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{art.author}</span>
                      <span className="text-blue-700 font-medium">Xem thêm</span>
                    </div>
                  </article>
                ))}
            </div>
          </div>

          {/* Sidebar (4 cols): Thông báo & Lối tắt bán trú */}
          <div className="lg:col-span-4 space-y-6">
            {/* Box Thông Báo Nhà Trường */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-rose-100 text-rose-700 rounded-lg">
                    <Bell className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Bảng Thông Báo
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">Mới nhất</span>
              </div>

              <div className="space-y-3.5">
                {announcements.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectArticle(item)}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/80 hover:border-blue-200 transition-all group block"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <span className="text-rose-600 font-semibold">{item.categoryName}</span>
                      <span className="tabular-nums">{item.publishDate}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-700 line-clamp-2 transition-colors">
                      {item.title}
                    </h4>
                    {item.documentNumber && (
                      <span className="text-[10px] text-slate-500 mt-1 block">
                        Số hiệu: {item.documentNumber}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <button
                onClick={() => onNavigateTab('van-ban')}
                className="w-full mt-4 py-2 text-xs font-semibold text-center text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors block"
              >
                Tra cứu công văn & văn bản →
              </button>
            </div>

            {/* Box Đời Sống Bán Trú Spotlight */}
            <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-2xl p-5 shadow-xs relative overflow-hidden">
              <div className="relative z-10 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  Nền nếp nội trú
                </span>
                <h3 className="text-lg font-bold leading-snug">
                  Chăm Sóc & Nuôi Dưỡng Học Sinh Bán Trú
                </h3>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Nhà trường chú trọng bảo đảm bữa ăn ấm nóng, đủ dinh dưỡng, an toàn thực phẩm và nền nếp sinh hoạt, tự học cho học sinh vùng cao.
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onNavigateTab('ban-tru')}
                    className="px-4 py-2 text-xs font-bold text-emerald-950 bg-emerald-300 hover:bg-emerald-200 rounded-lg transition-colors"
                  >
                    Xem thực đơn & nền nếp
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Admin Action Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 mx-auto flex items-center justify-center">
                <PenLine className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Góc Cán Bộ & Ban Biên Tập
              </h4>
              <p className="text-xs text-slate-600">
                Thầy cô và các tổ chuyên môn có thể đăng bài viết, công bố văn bản hoặc cập nhật tin hoạt động ngay.
              </p>
              <button
                onClick={onOpenCreatePost}
                className="w-full py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                + Đăng bài viết mới
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hoạt Động Nổi Bật (Section III Bento) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pb-4 border-b border-slate-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold font-serif-title text-slate-900">
              Hoạt Động Nổi Bật Của Nhà Trường
            </h2>
            <p className="text-xs text-slate-500">
              Chuyên môn dạy học · Công tác Đội · Trải nghiệm sáng tạo · Rèn luyện thể chất
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('tin-tuc')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Khám phá thêm</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Chuyên môn & STEM */}
          <div
            onClick={() => onNavigateTab('chuyen-mon')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="h-44 rounded-xl overflow-hidden bg-slate-100 mb-4">
                <img
                  src={SCHOOL_INFO.digitalPhoto}
                  alt="Chuyển đổi số"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Đổi mới dạy & học
              </span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors mt-1">
                Hoạt động chuyên môn & Ứng dụng CNTT
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Thực hiện sinh hoạt chuyên môn theo nghiên cứu bài học, ứng dụng học bạ số, bài giảng điện tử và đổi mới kiểm tra đánh giá theo GDPT 2018.
              </p>
            </div>
            <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-blue-700 flex items-center gap-1">
              Chi tiết chuyên môn →
            </span>
          </div>

          {/* Card 2: Bán trú & Nuôi dưỡng */}
          <div
            onClick={() => onNavigateTab('ban-tru')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="h-44 rounded-xl overflow-hidden bg-slate-100 mb-4">
                <img
                  src={SCHOOL_INFO.boardingPhoto}
                  alt="Học sinh bán trú"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Đời sống nội trú
              </span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-1">
                Quản lý & Chăm sóc học sinh bán trú
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Tổ chức ăn, ở, sinh hoạt nền nếp, hỗ trợ học tập ban đêm, giáo dục kỹ năng sống và tự lập cho con em đồng bào các dân tộc.
              </p>
            </div>
            <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-700 flex items-center gap-1">
              Thực đơn & Nền nếp →
            </span>
          </div>

          {/* Card 3: Đoàn Đội & Thể thao */}
          <div
            onClick={() => onNavigateTab('tin-tuc')}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="h-44 rounded-xl overflow-hidden bg-slate-100 mb-4">
                <img
                  src={SCHOOL_INFO.youthPhoto}
                  alt="Phong trào Đoàn Đội"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Phong trào thiếu nhi
              </span>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors mt-1">
                Công tác Đội & Hoạt động trải nghiệm
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Tạo dựng môi trường học đường lành mạnh, rèn luyện thể dục thể thao, giữ gìn bản sắc văn hóa và xây dựng tình bạn đoàn kết.
              </p>
            </div>
            <span className="mt-4 pt-3 border-t border-slate-100 text-xs font-semibold text-amber-700 flex items-center gap-1">
              Xem hoạt động phong trào →
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
