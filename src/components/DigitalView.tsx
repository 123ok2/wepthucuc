import React from 'react';
import { Article } from '../types';
import { SCHOOL_INFO } from '../data/initialData';
import { Laptop, ShieldCheck, Database, Smartphone, FileCheck, ArrowRight, Download } from 'lucide-react';

interface DigitalViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onOpenCreatePost: () => void;
}

export const DigitalView: React.FC<DigitalViewProps> = ({
  articles,
  onSelectArticle,
  onOpenCreatePost,
}) => {
  const digitalArticles = articles.filter((a) => a.category === 'chuyen-doi-so');

  const platforms = [
    {
      title: 'Học Bạ Số & Sổ Điểm Điện Tử',
      icon: FileCheck,
      desc: '100% học bạ của học sinh được ký số điện tử và lưu trữ trên cơ sở dữ liệu quốc gia. Phụ huynh tra cứu kết quả rèn luyện bất cứ lúc nào.',
      badge: 'Hoàn thành 100%',
    },
    {
      title: 'Cơ Sở Dữ Liệu Ngành GD&ĐT Phú Thọ',
      icon: Database,
      desc: 'Đồng bộ hồ sơ trường học, quản lý đội ngũ cán bộ, kết quả phổ cập giáo dục và thông tin bán trú trực tuyến.',
      badge: 'Kết nối liên thông',
    },
    {
      title: 'Ứng Dụng Liên Lạc Nhà Trường – Phụ Huynh',
      icon: Smartphone,
      desc: 'Cập nhật kịp thời thời khóa biểu, lịch kiểm tra, thực đơn bán trú và tin báo chuyên cần của học sinh tới từng phụ huynh.',
      badge: 'Cài đặt miễn phí',
    },
    {
      title: 'An Toàn Thông Tin Mạng Học Đường',
      icon: ShieldCheck,
      desc: 'Quy chuẩn bảo mật thông tin cá nhân học sinh, hướng dẫn học sinh kỹ năng sử dụng Internet an toàn và phòng tránh lừa đảo.',
      badge: 'Bảo vệ dữ liệu',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-700">
            Ứng dụng công nghệ thông tin
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 mt-1">
            Chuyển Đổi Số Giáo Dục
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Hiện đại hóa công tác quản lý, giảng dạy và tăng cường gắn kết giữa nhà trường với phụ huynh
          </p>
        </div>

        <button
          onClick={onOpenCreatePost}
          className="self-start md:self-auto px-4 py-2 text-xs font-bold text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg shadow-xs transition-colors"
        >
          + Đăng bài chuyển đổi số
        </button>
      </div>

      {/* Featured Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
            Chiến lược số hóa trường học
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-title leading-snug">
            Xây Dựng Trường Học Số Tại Xã Thu Cúc
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
            Trường PTDTBT THCS Thu Cúc tích cực đưa công nghệ thông tin vào từng tiết học, vận hành hệ thống quản lý học sinh số hóa và hướng dẫn các em học sinh vùng đồng bào dân tộc thiểu số tiếp cận với kỹ năng số trong thời đại mới.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs">
            <div className="p-3 bg-white/10 rounded-xl">
              <div className="font-bold text-lg text-amber-300">100%</div>
              <div className="text-slate-300 text-[11px]">Giáo viên có chữ ký số</div>
            </div>
            <div className="p-3 bg-white/10 rounded-xl">
              <div className="font-bold text-lg text-emerald-300">40+ máy</div>
              <div className="text-slate-300 text-[11px]">Phòng Tin học kết nối mạng</div>
            </div>
            <div className="p-3 bg-white/10 rounded-xl">
              <div className="font-bold text-lg text-blue-300">100%</div>
              <div className="text-slate-300 text-[11px]">Học bạ số hóa toàn trường</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl overflow-hidden bg-slate-800 shadow-md">
          <img
            src={SCHOOL_INFO.digitalPhoto}
            alt="Học sinh thực hành phòng máy"
            className="w-full h-full object-cover max-h-72"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* 4 Trụ cột chuyển đổi số */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-700">
            Hệ sinh thái số
          </span>
          <h2 className="text-xl font-bold font-serif-title text-slate-900">
            Các Nền Tảng Trọng Tâm Đang Triển Khai
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded">
                      {p.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hướng dẫn dành cho phụ huynh & học sinh */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Cẩm Nang Hướng Dẫn Phụ Huynh & Học Sinh
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
            <div>
              <h4 className="font-bold text-slate-800">
                1. Hướng dẫn cài đặt và đăng nhập ứng dụng theo dõi học tập
              </h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Các bước tra cứu điểm số, thời khóa biểu và nhận thông báo nghỉ học hoặc các khoản công khai.
              </p>
            </div>
            <button
              onClick={() => alert('Đang tải cẩm nang hướng dẫn phụ huynh')}
              className="text-indigo-700 hover:text-indigo-900 p-1 shrink-0"
              title="Tải hướng dẫn"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
            <div>
              <h4 className="font-bold text-slate-800">
                2. Quy tắc an toàn và bảo mật thông tin trên mạng Internet
              </h4>
              <p className="text-slate-600 mt-1 leading-relaxed">
                Bảo vệ mật khẩu cá nhân, nhận diện thông tin xấu độc và sử dụng mạng xã hội văn minh.
              </p>
            </div>
            <button
              onClick={() => alert('Đang tải cẩm nang an toàn mạng')}
              className="text-indigo-700 hover:text-indigo-900 p-1 shrink-0"
              title="Tải hướng dẫn"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bài viết chuyển đổi số */}
      {digitalArticles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Tin Tức Chuyển Đổi Số</h2>
              <p className="text-xs text-slate-500">Tin bài và kinh nghiệm ứng dụng CNTT</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-indigo-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-36 rounded-lg overflow-hidden bg-slate-100 mb-3">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 mb-1 tabular-nums">
                    {article.publishDate} · {article.author}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 line-clamp-2 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <span className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold text-indigo-700 flex items-center gap-1">
                  Xem chi tiết →
                </span>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
