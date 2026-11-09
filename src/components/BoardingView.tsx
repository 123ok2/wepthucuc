import React, { useState } from 'react';
import { Article } from '../types';
import { BOARDING_WEEKLY_MENU, SCHOOL_INFO } from '../data/initialData';
import { 
  UtensilsCrossed, 
  Clock, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  Calendar,
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface BoardingViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onOpenCreatePost: () => void;
}

export const BoardingView: React.FC<BoardingViewProps> = ({
  articles,
  onSelectArticle,
  onOpenCreatePost,
}) => {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const boardingArticles = articles.filter((a) => a.category === 'hoc-sinh-ban-tru');

  const dailySchedule = [
    { time: '05:30 - 06:00', title: 'Thức dậy & Thể dục sáng', desc: 'Học sinh gấp chăn màn gọn gàng theo nền nếp, tập thể dục buổi sáng tại sân trường.' },
    { time: '06:00 - 06:45', title: 'Vệ sinh cá nhân & Ăn sáng', desc: 'Thưởng thức bữa sáng nóng hổi, đủ dinh dưỡng tại bếp ăn bán trú.' },
    { time: '07:00 - 11:15', title: 'Học chính khóa buổi sáng', desc: 'Học tập các môn văn hóa trên lớp theo thời khóa biểu nhà trường.' },
    { time: '11:30 - 12:15', title: 'Bữa trưa dinh dưỡng', desc: 'Ăn trưa theo suất ăn tập thể, kiểm thực 3 bước nghiêm ngặt, tráng miệng hoa quả tươi.' },
    { time: '12:30 - 13:45', title: 'Nghỉ trưa tại phòng nội trú', desc: 'Nghỉ ngơi yên tĩnh, đảm bảo sức khỏe cho buổi học chiều.' },
    { time: '14:00 - 16:30', title: 'Học buổi chiều & Phụ đạo', desc: 'Học tập chuyên đề, bồi dưỡng học sinh và giáo dục kỹ năng sống.' },
    { time: '16:30 - 17:45', title: 'Rèn luyện thể thao & Tăng gia', desc: 'Chơi bóng chuyền, cầu lông, tưới vườn rau tăng gia cải thiện đời sống.' },
    { time: '18:00 - 18:45', title: 'Bữa tối ấm cúng', desc: 'Bữa cơm tối nóng sốt, quây quần cùng thầy cô và bạn bè.' },
    { time: '19:30 - 21:30', title: 'Giờ tự học có thầy cô hướng dẫn', desc: 'Giáo viên trực bán trú phụ đạo kèm cặp bài vở và giải đáp thắc mắc.' },
    { time: '21:30 - 22:00', title: 'Vệ sinh cá nhân & Đi ngủ', desc: 'Tắt đèn, giữ gìn trật tự và an toàn khu nội trú.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            Công tác nuôi dưỡng & chăm sóc
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 mt-1">
            Học Sinh Dân Tộc Bán Trú
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tổ chức ăn, ở, sinh hoạt an toàn, ấm áp và nâng cao chất lượng cuộc sống cho học sinh vùng cao
          </p>
        </div>

        <button
          onClick={onOpenCreatePost}
          className="self-start md:self-auto px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
        >
          + Đăng tin tức bán trú
        </button>
      </div>

      {/* Hero Boarding Spotlight Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 bg-slate-900 relative min-h-[300px]">
          <img
            src={SCHOOL_INFO.boardingPhoto}
            alt="Học sinh bán trú Thu Cúc"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
            <p className="text-xs text-white/90">
              Bữa cơm trưa ấm cúng và đầy ắp tình thương của các em học sinh tại nhà ăn bán trú Trường PTDTBT THCS Thu Cúc.
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-emerald-50/40">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Chính sách & An toàn học đường</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Mái Nhà Chung Của Học Sinh Vùng Cao
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
              Mô hình bán trú tại THCS Thu Cúc giúp các em học sinh đồng bào dân tộc thiểu số ở các bản làng xa xôi yên tâm bám trường, bám lớp. Nhà trường đảm bảo 100% chế độ hỗ trợ gạo, tiền ăn, hỗ trợ học tập theo quy định của Nhà nước.
            </p>

            <div className="mt-4 p-3 bg-white border border-emerald-200 rounded-xl space-y-1.5 text-xs text-slate-700">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-900">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cam kết an toàn & bảo mật thông tin</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Tuân thủ quy định bảo mật: Nhà trường không công khai danh sách thông tin nhạy cảm của cá nhân học sinh trên mạng xã hội.
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center justify-between text-xs text-emerald-900 font-semibold">
            <span>Sĩ số học sinh bán trú: 320+ em</span>
            <span>Bếp ăn chuẩn ATTP</span>
          </div>
        </div>
      </div>

      {/* Thực đơn bán trú 5 ngày trong tuần */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Thực Đơn Dinh Dưỡng Bán Trú Tuần Này
              </h2>
              <p className="text-xs text-slate-500">
                Được phê duyệt bởi Ban Giám Hiệu và Tổ Dinh dưỡng Y tế học đường
              </p>
            </div>
          </div>

          {/* Day selection tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            {BOARDING_WEEKLY_MENU.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveDayIndex(idx)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  activeDayIndex === idx
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.day}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Day Menu Details */}
        {BOARDING_WEEKLY_MENU[activeDayIndex] && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sáng */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Bữa sáng (06:00 - 06:45)
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 mb-3">Điểm tâm ấm nóng</h3>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {BOARDING_WEEKLY_MENU[activeDayIndex].breakfast}
                </p>
              </div>
              <span className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-200">
                Đầy đủ năng lượng cho giờ học sáng
              </span>
            </div>

            {/* Trưa */}
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  Bữa trưa (11:30 - 12:15)
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 mb-3">Suất ăn trưa đầy đủ 4 nhóm chất</h3>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <strong className="text-slate-800">Món mặn:</strong> {BOARDING_WEEKLY_MENU[activeDayIndex].lunch.main}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <strong className="text-slate-800">Món xào/rau:</strong> {BOARDING_WEEKLY_MENU[activeDayIndex].lunch.side}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <strong className="text-slate-800">Canh:</strong> {BOARDING_WEEKLY_MENU[activeDayIndex].lunch.soup}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    <strong className="text-slate-800">Tráng miệng:</strong> {BOARDING_WEEKLY_MENU[activeDayIndex].lunch.dessert}
                  </li>
                </ul>
              </div>
              <div className="text-[11px] text-emerald-800 font-semibold mt-4 pt-3 border-t border-emerald-200/80 flex justify-between">
                <span>Năng lượng chuẩn:</span>
                <span className="tabular-nums">{BOARDING_WEEKLY_MENU[activeDayIndex].calories}</span>
              </div>
            </div>

            {/* Tối */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  Bữa tối (18:00 - 18:45)
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1 mb-3">Bữa tối ấm cúng</h3>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <strong className="text-slate-800">Món chính:</strong> {BOARDING_WEEKLY_MENU[activeDayIndex].dinner.main}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <strong className="text-slate-800">Rau củ:</strong> {BOARDING_WEEKLY_MENU[activeDayIndex].dinner.side}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <strong className="text-slate-800">Canh:</strong> {BOARDING_WEEKLY_MENU[activeDayIndex].dinner.soup}
                  </li>
                </ul>
              </div>
              <span className="text-[11px] text-slate-500 mt-4 pt-3 border-t border-slate-200">
                Thực đơn luôn được luân phiên và kiểm tra lưu mẫu 24h
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Lịch trình một ngày sinh hoạt của học sinh bán trú */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200">
          <div className="p-2 bg-blue-100 text-blue-800 rounded-xl">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Thời Gian Biểu & Nền Nếp Sinh Hoạt Bán Trú
            </h2>
            <p className="text-xs text-slate-500">
              Rèn luyện tính tự lập, kỷ luật và thói quen sinh hoạt khoa học cho học sinh
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {dailySchedule.map((slot, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-blue-700 font-mono tracking-tight tabular-nums block mb-1">
                  {slot.time}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mb-1">{slot.title}</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">{slot.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Các bài viết thuộc chuyên mục Bán trú */}
      {boardingArticles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Tin Bài & Hoạt Động Bán Trú</h2>
              <p className="text-xs text-slate-500">Các hoạt động chăm sóc và biên bản sơ kết bán trú</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boardingArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article)}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
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
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-2 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <span className="mt-3 pt-2 border-t border-slate-100 text-xs font-semibold text-emerald-700 flex items-center gap-1">
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
