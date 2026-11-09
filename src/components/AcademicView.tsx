import React from 'react';
import { Article } from '../types';
import { BookOpen, GraduationCap, Award, FileCode, CheckCircle2, PenLine, ExternalLink } from 'lucide-react';
import { SCHOOL_INFO } from '../data/initialData';

interface AcademicViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onOpenCreatePost: () => void;
}

export const AcademicView: React.FC<AcademicViewProps> = ({
  articles,
  onSelectArticle,
  onOpenCreatePost,
}) => {
  const academicArticles = articles.filter(
    (a) => a.category === 'hoat-dong-chuyen-mon'
  );

  const departments = [
    {
      name: 'Tổ Chuyên Môn Tự Nhiên (Toán - KHTN - Tin học - Công nghệ)',
      leader: 'Thầy Hoàng Văn Thao - Tổ trưởng',
      members: '12 cán bộ giáo viên',
      focus: 'Đổi mới phương pháp dạy học STEM, ứng dụng phòng học bộ môn, xây dựng ma trận đặc tả đề kiểm tra theo định hướng năng lực.',
    },
    {
      name: 'Tổ Chuyên Môn Xã Hội (Ngữ Văn - Lịch sử & Địa lý - GDCD - Ngoại ngữ)',
      leader: 'Cô Phạm Thị Nga - Tổ trưởng',
      members: '14 cán bộ giáo viên',
      focus: 'Dạy học tích hợp liên môn, rèn kỹ năng giao tiếp tiếng Anh, giáo dục truyền thống lịch sử địa phương và giữ gìn bản sắc văn hóa dân tộc.',
    },
    {
      name: 'Tổ Quản Lý Học Sinh Bán Trú & Nuôi Dưỡng',
      leader: 'Thầy Đặng Quốc Toàn - Phụ trách',
      members: '8 cán bộ, giáo viên và nhân viên cấp dưỡng',
      focus: 'Xây dựng môi trường nội trú kỷ cương, thân thiện; tổ chức tự học buổi tối có chất lượng; tăng cường kỹ năng tự phục vụ.',
    },
  ];

  const digitalResources = [
    { title: 'Kho bài giảng điện tử E-learning THCS', desc: 'Hàng trăm bài giảng minh họa sinh động theo chương trình GDPT 2018 các môn học.' },
    { title: 'Ngân hàng câu hỏi & Đề kiểm tra định kỳ', desc: 'Ma trận, đặc tả và đề tham khảo các khối lớp 6, 7, 8, 9.' },
    { title: 'Học liệu số & Thư viện dùng chung', desc: 'Sách giáo khoa điện tử, video thí nghiệm mô phỏng Khoa học tự nhiên.' },
    { title: 'Kế hoạch giáo dục nhà trường 2025 - 2026', desc: 'Kế hoạch dạy học các môn học và hoạt động giáo dục theo từng tuần.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Dạy và học thực chất
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 mt-1">
            Hoạt Động Chuyên Môn & Đổi Mới Giáo Dục
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Triển khai hiệu quả Chương trình Giáo dục phổ thông 2018 và nâng cao chất lượng giáo dục toàn diện
          </p>
        </div>

        <button
          onClick={onOpenCreatePost}
          className="self-start md:self-auto px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs transition-colors"
        >
          + Đăng bài chuyên môn
        </button>
      </div>

      {/* Tổ chuyên môn */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Bộ phận nghiệp vụ
          </span>
          <h2 className="text-xl font-bold font-serif-title text-slate-900">
            Các Tổ Chuyên Môn Nhà Trường
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {departments.map((dept, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {dept.name}
                </h3>
                <div className="text-xs text-blue-700 font-semibold mb-1">{dept.leader}</div>
                <div className="text-[11px] text-slate-400 mb-3">{dept.members}</div>
                <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {dept.focus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kho học liệu dùng chung */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-2xl mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
            Tài nguyên dùng chung
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-title mt-1 mb-2">
            Kho Học Liệu & Bài Giảng Điện Tử
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Hỗ trợ giáo viên và học sinh tra cứu học liệu số, tài liệu bồi dưỡng học sinh và đề cương ôn tập các môn học.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {digitalResources.map((res, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 border border-slate-700 p-4 rounded-xl flex flex-col justify-between hover:bg-slate-800 transition-colors"
            >
              <div>
                <div className="p-2 bg-blue-600/30 text-blue-300 rounded-lg w-fit mb-3">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1.5 leading-snug">{res.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{res.desc}</p>
              </div>
              <button
                onClick={() => alert(`Truy cập ${res.title}`)}
                className="mt-4 pt-2 border-t border-slate-700/80 text-[11px] text-blue-300 hover:text-white flex items-center justify-between"
              >
                <span>Xem tài liệu</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bài viết chuyên môn */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Bài Viết & Chuyên Đề Mới</h2>
            <p className="text-xs text-slate-500">Kinh nghiệm giảng dạy và các tiết dạy thể nghiệm</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {academicArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all cursor-pointer group flex flex-col sm:flex-row gap-5"
            >
              <div className="w-full sm:w-44 h-36 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <div className="text-[11px] text-slate-500 mb-1 tabular-nums">
                    {article.publishDate} · {article.author}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <span className="text-xs font-semibold text-blue-700 mt-3 flex items-center gap-1">
                  Đọc nội dung chuyên đề →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
