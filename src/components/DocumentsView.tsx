import React, { useState } from 'react';
import { Article } from '../types';
import { FileText, Download, Search, Filter, Calendar, Building, Plus, CheckCircle2 } from 'lucide-react';

interface DocumentsViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onOpenCreatePost: () => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  articles,
  onSelectArticle,
  onOpenCreatePost,
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter to official documents or notices
  const documentArticles = articles.filter(
    (a) => a.category === 'van-ban-cong-khai' || a.documentNumber
  );

  const filteredDocs = documentArticles.filter((doc) => {
    const matchesYear = selectedYear === 'all' || doc.schoolYear === selectedYear;
    const matchesType = selectedType === 'all' || doc.documentType === selectedType;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.documentNumber && doc.documentNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      doc.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesYear && matchesType && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Title & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Hồ sơ pháp lý & Minh bạch
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 mt-1">
            Văn Bản & Công Khai Giáo Dục
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Công khai quy chế, kế hoạch năm học, cam kết chất lượng giáo dục và chế độ chính sách theo quy định
          </p>
        </div>

        <button
          onClick={onOpenCreatePost}
          className="self-start md:self-auto px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs hover:shadow transition-all inline-flex items-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Công bố văn bản mới</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Year selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-700">Năm học:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Tất cả các năm</option>
              <option value="2025 - 2026">Năm học 2025 - 2026</option>
              <option value="2024 - 2025">Năm học 2024 - 2025</option>
            </select>
          </div>

          {/* Type selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-700">Loại văn bản:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">Tất cả loại văn bản</option>
              <option value="Kế hoạch">Kế hoạch</option>
              <option value="Quyết định">Quyết định</option>
              <option value="Thông báo">Thông báo</option>
              <option value="Công khai tài chính">Công khai tài chính</option>
              <option value="Báo cáo">Báo cáo</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo số hiệu, tên văn bản..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {filteredDocs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            Không tìm thấy văn bản phù hợp. Vui lòng thử tìm kiếm khác hoặc thêm văn bản mới.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Số hiệu</th>
                  <th className="py-3 px-4">Tên trích yếu văn bản</th>
                  <th className="py-3 px-4 hidden md:table-cell">Loại văn bản</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Ngày ban hành</th>
                  <th className="py-3 px-4 hidden lg:table-cell">Cơ quan ban hành</th>
                  <th className="py-3 px-4 text-right">Xem & Tải</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-blue-50/40 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-blue-900 whitespace-nowrap">
                      {doc.documentNumber || 'KH-TC/2026'}
                    </td>
                    <td className="py-3.5 px-4 max-w-md">
                      <button
                        onClick={() => onSelectArticle(doc)}
                        className="text-left font-bold text-slate-900 hover:text-blue-700 transition-colors line-clamp-2 block"
                      >
                        {doc.title}
                      </button>
                      <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {doc.excerpt}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 hidden md:table-cell whitespace-nowrap text-slate-600">
                      {doc.documentType || 'Văn bản'}
                    </td>
                    <td className="py-3.5 px-4 hidden sm:table-cell whitespace-nowrap text-slate-500 tabular-nums">
                      {doc.publishDate}
                    </td>
                    <td className="py-3.5 px-4 hidden lg:table-cell whitespace-nowrap text-slate-600">
                      {doc.documentSigner || 'Trường PTDTBT THCS Thu Cúc'}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => onSelectArticle(doc)}
                          className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                        >
                          Chi tiết
                        </button>
                        <button
                          onClick={() => alert(`Đang tải văn bản ${doc.documentNumber || doc.title}`)}
                          className="p-1 text-slate-500 hover:text-blue-700 hover:bg-slate-100 rounded-md"
                          title="Tải tệp đính kèm"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Institutional Compliance Notice */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed space-y-1">
        <p className="font-semibold text-slate-800">
          * Quy định công khai thông tin của Trường PTDTBT THCS Thu Cúc:
        </p>
        <p>
          Các văn bản, quyết định và kế hoạch đều được kiểm duyệt tính pháp lý trước khi ban hành. Quý phụ huynh, nhân dân và các tổ chức có thể tải văn bản toàn văn trực tiếp hoặc liên hệ bộ phận văn thư qua email: <span className="font-mono text-blue-800">C2.thucuc.08545@phutho.edu.vn</span>.
        </p>
      </div>
    </div>
  );
};
