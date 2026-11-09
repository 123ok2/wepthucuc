import React, { useState } from 'react';
import { X, Search, Trash2, Edit3, Plus, RotateCcw, Pin, Eye, Calendar, User, Link2, Check } from 'lucide-react';
import { Article } from '../types';

interface ManagePostsModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onDeleteArticle: (id: string) => void;
  onTogglePin: (id: string) => void;
  onEditArticle: (article: Article) => void;
  onOpenCreateNew: () => void;
  onResetDefaults: () => void;
  onViewArticle: (article: Article) => void;
}

export const ManagePostsModal: React.FC<ManagePostsModalProps> = ({
  isOpen,
  onClose,
  articles,
  onDeleteArticle,
  onTogglePin,
  onEditArticle,
  onOpenCreateNew,
  onResetDefaults,
  onViewArticle,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyPostLink = (art: Article) => {
    const url = `${window.location.origin}${window.location.pathname}?bai-viet=${art.slug || art.id}`;
    navigator.clipboard?.writeText(url);
    setCopiedId(art.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shrink-0">
          <div>
            <h2 className="text-lg font-bold">Ban Quản Trị Bài Viết & Cổng Thông Tin</h2>
            <p className="text-xs text-slate-400">
              Tổng cộng {articles.length} bài viết đã xuất bản trên hệ thống
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenCreateNew();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
              Đăng bài mới
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full md:w-auto flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm bài viết theo tiêu đề, tác giả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Tất cả chuyên mục</option>
              <option value="tin-tuc-su-kien">Tin tức – Sự kiện</option>
              <option value="hoat-dong-chuyen-mon">Hoạt động chuyên môn</option>
              <option value="van-ban-cong-khai">Văn bản – Công khai</option>
              <option value="hoc-sinh-ban-tru">Học sinh bán trú</option>
              <option value="chuyen-doi-so">Chuyển đổi số</option>
              <option value="thong-bao">Thông báo</option>
            </select>

            <button
              onClick={() => {
                if (window.confirm('Khôi phục danh sách bài viết chuẩn ban đầu của trường?')) {
                  onResetDefaults();
                }
              }}
              title="Khôi phục dữ liệu mẫu chuẩn của nhà trường"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Khôi phục mẫu</span>
            </button>
          </div>
        </div>

        {/* Article Table */}
        <div className="flex-1 overflow-y-auto">
          {filteredArticles.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              Không tìm thấy bài viết nào phù hợp với bộ lọc.
            </div>
          ) : (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/75 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Bài viết & Tiêu đề</th>
                  <th className="py-3 px-4 hidden md:table-cell">Chuyên mục</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Ngày đăng</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Tác giả</th>
                  <th className="py-3 px-4 text-center">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredArticles.map((article) => (
                  <tr key={article.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/assets/campus.jpg';
                          }}
                          className="w-12 h-10 object-cover rounded-md bg-slate-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <button
                            onClick={() => onViewArticle(article)}
                            className="font-bold text-slate-900 hover:text-blue-700 text-left line-clamp-1 block transition-colors"
                          >
                            {article.title}
                          </button>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5 font-mono">
                            <span className="truncate">?bai-viet={article.slug || article.id}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell text-slate-600 whitespace-nowrap">
                      {article.categoryName}
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell text-slate-500 whitespace-nowrap tabular-nums">
                      {article.publishDate}
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell text-slate-600 whitespace-nowrap">
                      {article.author}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {article.isPinned ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700">
                          <Pin className="w-3 h-3 text-amber-600 fill-amber-500" />
                          Ghim
                        </span>
                      ) : article.isFeatured ? (
                        <span className="text-[11px] font-medium text-blue-700">Nổi bật</span>
                      ) : (
                        <span className="text-[11px] text-slate-400">Đã xuất bản</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleCopyPostLink(article)}
                          title="Sao chép link chia sẻ bài viết"
                          className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-slate-100 rounded"
                        >
                          {copiedId === article.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Link2 className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => onViewArticle(article)}
                          title="Xem bài viết"
                          className="p-1.5 text-slate-500 hover:text-blue-700 hover:bg-slate-100 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            onTogglePin(article.id);
                          }}
                          title={article.isPinned ? 'Bỏ ghim' : 'Ghim bài viết'}
                          className={`p-1.5 rounded ${
                            article.isPinned
                              ? 'text-amber-600 hover:bg-amber-50'
                              : 'text-slate-400 hover:text-amber-600 hover:bg-slate-100'
                          }`}
                        >
                          <Pin className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            onEditArticle(article);
                            onClose();
                          }}
                          title="Sửa bài viết"
                          className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Bạn có chắc chắn muốn xóa bài: "${article.title}"?`)) {
                              onDeleteArticle(article.id);
                            }
                          }}
                          title="Xóa bài viết"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            <span>
              Cơ sở dữ liệu đám mây: <strong>Google Cloud Firestore</strong> (Dự án: <span className="font-mono text-slate-700">gen-lang-client-0028772304</span>). Dữ liệu được lưu vĩnh viễn, không bị mất theo thời gian.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 self-end sm:self-auto"
          >
            Đóng bảng quản lý
          </button>
        </div>
      </div>
    </div>
  );
};
