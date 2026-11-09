import React, { useState } from 'react';
import { SCHOOL_INFO } from '../data/initialData';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, School } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Title */}
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
          Kết nối cùng nhà trường
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif-title text-slate-900 mt-1">
          Thông Tin Liên Hệ & Hộp Thư Góp Ý
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Kênh tiếp nhận ý kiến đóng góp, giải đáp thủ tục giáo dục và phản ánh của phụ huynh, học sinh
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
              Thông Tin Chính Thức
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl shrink-0 mt-0.5">
                  <School className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Đơn vị chủ quản
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {SCHOOL_INFO.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Cổng thông tin điện tử nhà trường
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-rose-50 text-rose-700 rounded-xl shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Địa chỉ hành chính
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    {SCHOOL_INFO.address}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Huyện Tân Sơn, tỉnh Phú Thọ, Việt Nam
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Hòm thư điện tử chính thức
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    <a
                      href={`mailto:${SCHOOL_INFO.email}`}
                      className="text-blue-700 hover:underline"
                    >
                      {SCHOOL_INFO.email}
                    </a>
                  </p>
                  <a
                    href={`mailto:${SCHOOL_INFO.email}`}
                    className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold mt-1 hover:underline"
                  >
                    <span>Gửi thư điện tử trực tiếp →</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Thời gian làm việc văn phòng
                  </span>
                  <p className="text-sm font-bold text-slate-900 mt-0.5">
                    Thứ Hai – Thứ Sáu: 07:00 – 17:00
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Trực bán trú: 24/7 trong tuần học
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-blue-900 text-white shadow-xs space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-200">
              Chỉ Dẫn Đường Đi
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              Trường tọa lạc tại trung tâm xã Thu Cúc, cách Quốc lộ 32 thuận tiện giao thông. Đối với phụ huynh ở các bản vùng cao, nhà trường luôn có cán bộ trực hỗ trợ tiếp nhận học sinh bán trú vào đầu mỗi tuần.
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              Biểu Mẫu Góp Ý & Phản Ánh Trực Tuyến
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Mọi ý kiến của phụ huynh và học sinh sẽ được Ban Giám hiệu tiếp nhận và bảo mật theo quy định
            </p>

            {submitted && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Cảm ơn quý phụ huynh! Ý kiến đóng góp đã được chuyển tới Văn phòng Ban Giám hiệu Trường PTDTBT THCS Thu Cúc.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Họ và tên của bạn <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Nguyễn Văn A (Phụ huynh em...)"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Số điện thoại liên lạc
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09xx xxx xxx"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Địa chỉ Email (nếu có)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nội dung phản ánh / góp ý về <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">-- Chọn lĩnh vực --</option>
                  <option value="Học sinh bán trú & Nuôi dưỡng">Công tác chăm sóc học sinh bán trú & Dinh dưỡng</option>
                  <option value="Chất lượng dạy học">Chất lượng giảng dạy & Học tập của học sinh</option>
                  <option value="Cơ sở vật chất">Cơ sở vật chất & Trang thiết bị học đường</option>
                  <option value="Thủ tục chuyển trường, tuyển sinh">Thủ tục hồ sơ, tuyển sinh & Học bạ số</option>
                  <option value="Khác">Ý kiến đóng góp khác</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Chi tiết nội dung thư <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ghi rõ nội dung bạn muốn gửi tới nhà trường..."
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Gửi thông điệp tới nhà trường</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
