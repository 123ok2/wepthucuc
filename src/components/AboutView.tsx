import React from 'react';
import { SCHOOL_INFO } from '../data/initialData';
import { Target, Compass, Heart, Shield, Users, Building2, BookOpen, CheckCircle } from 'lucide-react';

export const AboutView: React.FC = () => {
  const leadershipTeam = [
    { name: 'Nguyễn Văn Hùng', title: 'Bí thư Chi bộ - Hiệu trưởng', role: 'Phụ trách chung, chiến lược phát triển nhà trường' },
    { name: 'Hoàng Thị Mai', title: 'Phó Hiệu trưởng', role: 'Phụ trách chuyên môn, khảo thí và đổi mới GDPT 2018' },
    { name: 'Đặng Quốc Toàn', title: 'Phó Hiệu trưởng', role: 'Phụ trách công tác bán trú, cơ sở vật chất và an ninh trường học' },
    { name: 'Triệu Thị Lan', title: 'Tổng phụ trách Đội', role: 'Phụ trách công tác Đoàn - Đội, phong trào thiếu nhi' },
  ];

  const facilities = [
    { title: 'Phòng học văn hóa', desc: '100% phòng học kiên cố, trang bị màn hình ti-vi thông minh và hệ thống quạt chiếu sáng tiêu chuẩn.' },
    { title: 'Phòng máy tính & Chuyển đổi số', desc: 'Phòng tin học kết nối Internet cáp quang, phục vụ giảng dạy môn Tin học và học liệu số.' },
    { title: 'Khu nội trú học sinh', desc: 'Dãy nhà bán trú khang trang với giường tầng, chăn màn đồng bộ, nhà vệ sinh tự hoại sạch sẽ.' },
    { title: 'Bếp ăn tập thể bán trú', desc: 'Bếp ăn một chiều đạt chuẩn vệ sinh ATTP, hệ thống khay ăn inox và bàn ăn sạch sẽ.' },
    { title: 'Thư viện & Phòng đọc', desc: 'Hàng nghìn đầu sách giáo khoa, truyện tranh, tài liệu tham khảo và báo Đội cho học sinh.' },
    { title: 'Sân chơi & Bãi tập thể dục', desc: 'Sân trường rộng rãi có sân bóng chuyền, sân cầu lông, cột cờ và cây xanh bóng mát.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Intro Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
          Giới thiệu tổng quan
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-title text-slate-900 mt-1 leading-snug">
          Trường Phổ Thông Dân Tộc Bán Trú THCS Thu Cúc
        </h1>
        <p className="mt-3 text-base text-slate-700 leading-relaxed text-justify">
          Trường PTDTBT THCS Thu Cúc là cơ sở giáo dục trung học cơ sở thực hiện nhiệm vụ giáo dục, giảng dạy và tổ chức các hoạt động giáo dục cho học sinh trên địa bàn xã Thu Cúc, tỉnh Phú Thọ. Nhà trường chú trọng xây dựng môi trường giáo dục thân thiện, kỷ cương, chất lượng; quan tâm công tác giáo dục toàn diện, nền nếp bán trú, phát triển phẩm chất và năng lực học sinh.
        </p>
      </div>

      {/* Prominent Collective Photo as required by PDF */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="relative bg-slate-900 max-h-[540px] overflow-hidden flex items-center justify-center">
          <img
            src={SCHOOL_INFO.collectivePhoto}
            alt="Tập thể Trường PTDTBT THCS Thu Cúc"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/assets/campus.jpg';
            }}
            className="w-full h-full object-cover max-h-[540px]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 text-center">
          <p className="text-xs sm:text-sm text-slate-700 font-medium italic">
            "{SCHOOL_INFO.collectivePhotoCaption}"
          </p>
        </div>
      </div>

      {/* Sứ mạng & Tầm nhìn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-blue-200">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
              Mục tiêu phụng sự
            </span>
            <h2 className="text-2xl font-bold font-serif-title mt-1 mb-3">Sứ Mạng</h2>
            <p className="text-sm text-blue-50/95 leading-relaxed text-justify">
              {SCHOOL_INFO.mission}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/15 text-xs text-blue-200">
            Trọng tâm: Phát triển phẩm chất, năng lực và kỹ năng sống cho học sinh dân tộc vùng cao.
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-7 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 text-amber-300">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Định hướng tương lai
            </span>
            <h2 className="text-2xl font-bold font-serif-title mt-1 mb-3">Tầm Nhìn</h2>
            <p className="text-sm text-slate-200 leading-relaxed text-justify">
              {SCHOOL_INFO.vision}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/15 text-xs text-slate-300">
            Đích đến: Ngôi trường hạnh phúc, chất lượng giáo dục thực chất và bền vững.
          </div>
        </div>
      </div>

      {/* Giá trị cốt lõi */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto mb-3">
            <Heart className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold font-serif-title text-slate-900">
            Hệ Thống Giá Trị Cốt Lõi
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Kim chỉ nam cho mọi hoạt động giáo dục, rèn luyện của thầy và trò nhà trường
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCHOOL_INFO.coreValues.map((val, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 transition-all flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{val.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Đội ngũ cán bộ quản lý */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Bộ máy tổ chức
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-900">
            Ban Giám Hiệu & Cán Bộ Quản Lý
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {leadershipTeam.map((leader, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-xs transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold mb-3">
                {leader.name.split(' ').pop()?.[0]}
              </div>
              <h3 className="text-sm font-bold text-slate-900">{leader.name}</h3>
              <p className="text-xs font-semibold text-blue-700 mt-0.5">{leader.title}</p>
              <p className="text-[11px] text-slate-500 mt-2 border-t border-slate-100 pt-2 leading-relaxed">
                {leader.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Cơ sở vật chất */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
            Hạ tầng kỹ thuật
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif-title text-slate-900">
            Cơ Sở Vật Chất & Điều Kiện Dạy Học
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">{fac.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{fac.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
