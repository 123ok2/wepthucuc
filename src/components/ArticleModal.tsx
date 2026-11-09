import React from 'react';
import { X, Calendar, User, Printer, Share2, Tag, FileText, Download, Check } from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  relatedArticles: Article[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onSelectArticle,
  relatedArticles,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!article) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Top bar controls */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <Tag className="w-3.5 h-3.5" />
            <span>{article.categoryName}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              title="Chia sẻ liên kết"
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã sao chép' : 'Chia sẻ'}</span>
            </button>
            <button
              onClick={handlePrint}
              title="In bài viết"
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In bài</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          {/* Header Metadata */}
          <div className="space-y-3 pb-6 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-blue-800">{article.categoryName}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 tabular-nums">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {article.publishDate}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {article.author}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold font-serif-title text-slate-900 leading-snug">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-base font-medium text-slate-700 italic border-l-2 border-blue-600 pl-4 py-1 bg-blue-50/40 rounded-r-lg">
                {article.excerpt}
              </p>
            )}
          </div>

          {/* Document metadata box if official document */}
          {article.documentNumber && (
            <div className="my-5 p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Số hiệu: {article.documentNumber}</span>
                  {article.documentType && (
                    <span className="text-slate-500 font-normal">({article.documentType})</span>
                  )}
                </div>
                {article.documentSigner && (
                  <div className="text-slate-600">Người ký ban hành: {article.documentSigner}</div>
                )}
                {article.schoolYear && (
                  <div className="text-slate-500">Năm học áp dụng: {article.schoolYear}</div>
                )}
              </div>
              <button
                onClick={() => alert(`Tải văn bản: ${article.documentNumber} (${article.title})`)}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                Tải văn bản toàn văn (PDF)
              </button>
            </div>
          )}

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="my-6 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full max-h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
              {article.imageCaption && (
                <div className="p-2.5 text-xs text-center text-slate-600 italic bg-slate-50/90 border-t border-slate-200">
                  {article.imageCaption}
                </div>
              )}
            </div>
          )}

          {/* Article Main Text */}
          <div className="prose prose-slate max-w-none text-slate-800 text-sm md:text-base leading-relaxed whitespace-pre-line font-normal space-y-4">
            {article.content}
          </div>

          {/* Sign-off */}
          <div className="mt-8 pt-4 border-t border-slate-200 text-right">
            <p className="text-xs uppercase tracking-wider text-slate-500">Người đăng tin / Nguồn</p>
            <p className="text-sm font-bold text-slate-800">{article.author}</p>
            {article.authorRole && <p className="text-xs text-slate-500">{article.authorRole}</p>}
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-200">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
                Các tin bài cùng chuyên mục
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedArticles.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectArticle(rel)}
                    className="text-left p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all flex items-start gap-3 group"
                  >
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="w-16 h-12 object-cover rounded bg-slate-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 line-clamp-2 transition-colors">
                        {rel.title}
                      </h4>
                      <span className="text-[11px] text-slate-400 mt-1 block tabular-nums">
                        {rel.publishDate}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
