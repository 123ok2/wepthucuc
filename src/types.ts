export type CategoryType = 
  | 'tin-tuc-su-kien'
  | 'hoat-dong-chuyen-mon'
  | 'van-ban-cong-khai'
  | 'hoc-sinh-ban-tru'
  | 'chuyen-doi-so'
  | 'thong-bao';

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: CategoryType;
  categoryName: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageCaption?: string;
  author: string;
  authorRole?: string;
  publishDate: string;
  isFeatured?: boolean;
  isPinned?: boolean;
  views?: number;
  documentNumber?: string;
  documentSigner?: string;
  schoolYear?: string;
  documentType?: 'Quyết định' | 'Kế hoạch' | 'Thông báo' | 'Công khai tài chính' | 'Báo cáo';
}

export interface BoardingDailyMenu {
  day: string;
  breakfast: string;
  lunch: {
    main: string;
    side: string;
    soup: string;
    dessert: string;
  };
  dinner: {
    main: string;
    side: string;
    soup: string;
  };
  calories: string;
}

export interface GalleryAlbum {
  id: string;
  title: string;
  date: string;
  coverImage: string;
  images: { url: string; caption: string }[];
}

export type NavTab = 
  | 'trang-chu'
  | 'gioi-thieu'
  | 'tin-tuc'
  | 'chuyen-mon'
  | 'van-ban'
  | 'ban-tru'
  | 'chuyen-doi-so'
  | 'thu-vien-anh'
  | 'lien-he';
