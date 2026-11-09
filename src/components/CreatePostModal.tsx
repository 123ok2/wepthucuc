import React, { useState } from 'react';
import { X, Image, Upload, FileText, CheckCircle2, Eye, PenLine, Sparkles } from 'lucide-react';
import { Article, CategoryType } from '../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (article: Omit<Article, 'id' | 'views'>) => void;
  initialPost?: Article | null;
}

const CATEGORIES: { id: CategoryType; name: string }[] = [
  { id: 'tin-tuc-su-kien', name: 'Tin tức – Sự kiện' },
  { id: 'hoat-dong-chuyen-mon', name: 'Hoạt động chuyên môn' },
  { id: 'van-ban-cong-khai', name: 'Văn bản – Công khai' },
  { id: 'hoc-sinh-ban-tru', name: 'Học sinh bán trú' },
  { id: 'chuyen-doi-so', name: 'Chuyển đổi số' },
  { id: 'thong-bao', name: 'Thông báo' },
];

const PRESET_IMAGES = [
  { label: 'Tập thể cán bộ giáo viên', url: '/src/assets/images/tap_the_thcs_thu_cuc.jpg' },
  { label: 'Khuôn viên nhà trường', url: '/src/assets/images/thu_cuc_school_campus_1794218696951.jpg' },
  { label: 'Học sinh bán trú ăn trưa', url: '/src/assets/images/thu_cuc_boarding_life_1794218697486.jpg' },
  { label: 'Phòng máy tính & chuyển đổi số', url: '/src/assets/images/thu_cuc_stem_digital_1794218698405.jpg' },
  { label: 'Hoạt động thể thao Đoàn Đội', url: '/src/assets/images/thu_cuc_sports_youth_1794218698583.jpg' },
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialPost,
}) => {
  const [title, setTitle] = useState(initialPost?.title || '');
  const [category, setCategory] = useState<CategoryType>(initialPost?.category || 'tin-tuc-su-kien');
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [imageUrl, setImageUrl] = useState(initialPost?.imageUrl || PRESET_IMAGES[0].url);
  const [imageCaption, setImageCaption] = useState(initialPost?.imageCaption || '');
  const [author, setAuthor] = useState(initialPost?.author || 'Ban Biên Tập Nhà Trường');
  const [authorRole, setAuthorRole] = useState(initialPost?.authorRole || 'PTDTBT THCS Thu Cúc');
  const [isFeatured, setIsFeatured] = useState(initialPost?.isFeatured || false);
  const [isPinned, setIsPinned] = useState(initialPost?.isPinned || false);
  const [publishDate, setPublishDate] = useState(
    initialPost?.publishDate || new Date().toISOString().split('T')[0]
  );
  
  // Document specific fields
  const [documentNumber, setDocumentNumber] = useState(initialPost?.documentNumber || '');
  const [documentSigner, setDocumentSigner] = useState(initialPost?.documentSigner || '');
  const [schoolYear, setSchoolYear] = useState(initialPost?.schoolYear || '2025 - 2026');
  const [documentType, setDocumentType] = useState<Article['documentType']>(
    initialPost?.documentType || 'Kế hoạch'
  );

  const [previewMode, setPreviewMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  if (!isOpen) return null;

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setErrorMsg('Dung lượng ảnh tối đa 3MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Vui lòng nhập tiêu đề bài viết');
      return;
    }
    if (!content.trim()) {
      setErrorMsg('Vui lòng nhập nội dung bài viết');
      return;
    }

    const catObj = CATEGORIES.find((c) => c.id === category);

    const articleData: Omit<Article, 'id' | 'views'> = {
      title: title.trim(),
      slug: title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, ''),
      category,
      categoryName: catObj ? catObj.name : 'Tin tức',
      excerpt: excerpt.trim() || title.trim(),
      content: content.trim(),
      imageUrl: imageUrl.trim() || PRESET_IMAGES[0].url,
      imageCaption: imageCaption.trim(),
      author: author.trim() || 'Ban Biên Tập Nhà Trường',
      authorRole: authorRole.trim(),
      publishDate,
      isFeatured,
      isPinned,
      ...(category === 'van-ban-cong-khai' && {
        documentNumber: documentNumber.trim(),
        documentSigner: documentSigner.trim(),
        schoolYear,
        documentType,
      }),
    };

    onSave(articleData);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <PenLine className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {initialPost ? 'Chỉnh sửa bài viết' : 'Đăng bài viết mới lên Cổng thông tin'}
              </h2>
              <p className="text-xs text-blue-200">
                Trường PTDTBT THCS Thu Cúc · Hệ thống xuất bản tin tức & văn bản
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
              {previewMode ? 'Tiếp tục soạn' : 'Xem trước'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success toast */}
        {showSuccessToast && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Đã xuất bản bài viết thành công lên Cổng thông tin điện tử!</span>
          </div>
        )}

        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Content Area */}
        {previewMode ? (
          <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4">
            <div className="border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2 text-xs text-blue-700 font-medium mb-2">
                <span>{CATEGORIES.find((c) => c.id === category)?.name}</span>
                <span aria-hidden="true">·</span>
                <span>{publishDate}</span>
                <span aria-hidden="true">·</span>
                <span>{author}</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 leading-snug">{title || 'Tiêu đề bài viết'}</h1>
              {excerpt && <p className="mt-3 text-slate-600 font-medium italic">{excerpt}</p>}
            </div>

            {imageUrl && (
              <div className="rounded-xl overflow-hidden bg-slate-100 max-h-96">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {imageCaption && (
                  <p className="p-2 text-xs text-center text-slate-500 italic bg-slate-50">
                    {imageCaption}
                  </p>
                )}
              </div>
            )}

            <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-line leading-relaxed">
              {content || 'Chưa có nội dung...'}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
            {/* Row 1: Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Tiêu đề bài viết <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Hội nghị tổng kết công tác bán trú năm học 2025 - 2026..."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                required
              />
            </div>

            {/* Row 2: Category & Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Chuyên mục <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryType)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Ngày công bố
                </label>
                <input
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Tác giả / Đơn vị đăng
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="VD: Ban Biên Tập / Tổ Tự Nhiên"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Category-specific extra fields for Official Documents */}
            {category === 'van-ban-cong-khai' && (
              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-blue-900 mb-1">
                    Số hiệu văn bản
                  </label>
                  <input
                    type="text"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="VD: 18/KH-THCSTC"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-900 mb-1">
                    Loại văn bản
                  </label>
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value as any)}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Kế hoạch">Kế hoạch</option>
                    <option value="Quyết định">Quyết định</option>
                    <option value="Thông báo">Thông báo</option>
                    <option value="Công khai tài chính">Công khai tài chính</option>
                    <option value="Báo cáo">Báo cáo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-blue-900 mb-1">
                    Người ký / Ban hành
                  </label>
                  <input
                    type="text"
                    value={documentSigner}
                    onChange={(e) => setDocumentSigner(e.target.value)}
                    placeholder="VD: Hiệu trưởng"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            )}

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Tóm tắt ngắn (Lead / Sa-pô)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                placeholder="Tóm tắt ngắn gọn nội dung cốt lõi của bài viết để hiển thị trên danh sách trang chủ..."
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Nội dung chi tiết bài viết <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Hỗ trợ xuống dòng, gạch đầu dòng</span>
                </div>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                placeholder="Nhập toàn văn nội dung bài viết..."
                className="w-full px-3.5 py-3 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-normal leading-relaxed"
                required
              />
            </div>

            {/* Image Selection / Upload */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Hình ảnh minh họa bài viết
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-slate-600 mb-2 font-medium">
                    Chọn nhanh từ kho ảnh nhà trường:
                  </span>
                  <div className="space-y-1.5">
                    {PRESET_IMAGES.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setImageUrl(img.url)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                          imageUrl === img.url
                            ? 'bg-blue-100 text-blue-900 font-semibold border border-blue-300'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        <span className="truncate">{img.label}</span>
                        {imageUrl === img.url && (
                          <span className="text-blue-600 text-xs">✓ Đã chọn</span>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3">
                    <label className="block text-xs text-slate-600 mb-1">
                      Hoặc dán URL ảnh ngoài:
                    </label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <span className="block text-xs text-slate-600 mb-2 font-medium">
                      Hoặc tải ảnh từ thiết bị:
                    </span>
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-4 cursor-pointer hover:bg-slate-100/80 transition-colors">
                      <Upload className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-600 font-medium">Chọn ảnh để tải lên</span>
                      <span className="text-[10px] text-slate-400">Hỗ trợ JPG, PNG (tối đa 3MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {imageUrl && (
                    <div className="mt-3">
                      <label className="block text-xs text-slate-600 mb-1">
                        Chú thích ảnh:
                      </label>
                      <input
                        type="text"
                        value={imageCaption}
                        onChange={(e) => setImageCaption(e.target.value)}
                        placeholder="VD: Quang cảnh hoạt động tại sân trường..."
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>Ghim bài viết nổi bật (Hiển thị đầu trang)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>Ưu tiên thông báo quan trọng</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {initialPost ? 'Lưu thay đổi' : 'Xuất bản bài viết ngay'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
