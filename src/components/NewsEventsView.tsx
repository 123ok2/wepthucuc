import React, { useState } from 'react';
import { Article, CategoryType } from '../types';
import { Search, Calendar, User, Eye, ArrowRight, PenLine, Filter } from 'lucide-react';

interface NewsEventsViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onOpenCreatePost: () => void;
  initialCategory?: CategoryType | 'all';
}

export const NewsEventsView: React.FC<NewsEventsViewProps> = ({
  articles,
  onSelectArticle,
  onOpenCreatePost,
  initialCategory = 'all',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>(initialCategory);

  const categories = [
    { id: 'all', label: 'Tất cả bài viết' },
    { id: 'tin-tuc-su-kien', label: 'Tin tức – Sự kiện' },
    { id: 'hoat-dong-chuyen-mon', label: 'Hoạt động chuyên môn' },
    { id: 'van-ban-cong-khai', label: 'Văn bản – Công khai' },
    { id: 'hoc-sinh-ban-tru', label: 'Học sinh bán trú' },
    { id: 'chuyen-doi-so', label: 'Chuyển đổi số' },
    { id: 'thong-bao', label: 'Thông báo' },
  ];

  const filtered = articles.filter((a) => {
    const matchesCat = selectedCat === 'all' || a.category === selectedCat;
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Title & Post Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Kênh thông tin
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 mt-1">
            Tin Tức & Hoạt Động Nhà Trường
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Cập nhật thường xuyên các tin tức giáo dục, sự kiện phong trào và thông báo chính thức
          </p>
        </div>

        <button
          onClick={onOpenCreatePost}
          className="self-start md:self-auto px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs hover:shadow transition-all inline-flex items-center gap-2"
        >
          <PenLine className="w-3.5 h-3.5" />
          <span>Đăng bài viết mới</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs (Interactive Filter Controls as allowed by frontend-design §1.A) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCat === c.id
                  ? 'bg-white text-blue-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm kiếm tin bài..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-sm text-slate-600 font-medium">
            Không tìm thấy bài viết nào phù hợp với tìm kiếm của bạn.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCat('all');
            }}
            className="mt-3 text-xs font-semibold text-blue-700 hover:underline"
          >
            Xóa bộ lọc tìm kiếm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/assets/campus.jpg';
                    }}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {article.isPinned && (
                    <div className="absolute top-2.5 left-2.5 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      Ghim
                    </div>
                  )}
                </div>

                <div className="p-5">
                  {/* Unboxed metadata conforming to §1.A */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-blue-700">{article.categoryName}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{article.publishDate}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="truncate max-w-[160px]">{article.author}</span>
                <span className="text-blue-700 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 shrink-0">
                  Đọc bài →
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
