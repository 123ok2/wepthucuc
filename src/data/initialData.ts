import { Article, BoardingDailyMenu, GalleryAlbum } from '../types';

export const SCHOOL_INFO = {
  name: 'TRƯỜNG PHỔ THÔNG DÂN TỘC BÁN TRÚ THCS THU CÚC',
  shortName: 'PTDTBT THCS Thu Cúc',
  subTitle: 'CỔNG THÔNG TIN ĐIỆN TỬ NHÀ TRƯỜNG',
  slogan: 'Đoàn kết – Trách nhiệm – Đổi mới – Phát triển',
  address: 'Xã Thu Cúc, tỉnh Phú Thọ',
  email: 'C2.thucuc.08545@phutho.edu.vn',
  phone: '0210.3876.xxx',
  welcomeTitle: 'Chào mừng đến với Cổng thông tin điện tử Trường PTDTBT THCS Thu Cúc',
  welcomeMessage:
    'Chào mừng quý thầy cô giáo, quý phụ huynh và các em học sinh đến với Cổng thông tin điện tử Trường PTDTBT THCS Thu Cúc. Website là kênh thông tin chính thức nhằm giới thiệu hoạt động giáo dục, cập nhật thông báo, chia sẻ các hoạt động dạy và học, đồng thời tăng cường kết nối giữa nhà trường, gia đình và xã hội.',
  collectivePhoto: '/assets/collective.jpg',
  collectivePhotoCaption:
    'Tập thể cán bộ, giáo viên, nhân viên Trường PTDTBT THCS Thu Cúc trong hoạt động phối hợp với các lực lượng trên địa bàn – xây dựng môi trường giáo dục an toàn, thân thiện và trách nhiệm.',
  campusPhoto: '/assets/campus.jpg',
  boardingPhoto: '/assets/boarding.jpg',
  digitalPhoto: '/assets/digital.jpg',
  youthPhoto: '/assets/sports.jpg',
  mission:
    'Tạo dựng môi trường giáo dục thân thiện, kỷ cương và chất lượng để mỗi học sinh đều có cơ hội học tập, phát triển năng lực và tư duy sáng tạo.',
  vision:
    'Trở thành một trong những trường THCS có chất lượng giáo dục tốt của xã Thu Cúc; nơi cán bộ, giáo viên và học sinh làm việc, học tập tích cực, sáng tạo, cùng nỗ lực đạt kết quả cao.',
  coreValues: [
    { title: 'Lòng nhân ái', desc: 'Thương yêu học sinh, tương thân tương ái giữa các dân tộc anh em.' },
    { title: 'Tinh thần đoàn kết', desc: 'Sự gắn kết bền chặt giữa thầy cô, học sinh và cộng đồng nhân dân địa phương.' },
    { title: 'Khát vọng vươn lên', desc: 'Vượt khó dạy tốt, học tốt trên mảnh đất vùng cao Thu Cúc.' },
    { title: 'Tính trung thực', desc: 'Dạy thực chất, học thực chất, đánh giá công bằng khách quan.' },
    { title: 'Tính sáng tạo & linh hoạt', desc: 'Đổi mới phương pháp, thích ứng linh hoạt trong kỷ nguyên số.' },
    { title: 'Tinh thần trách nhiệm', desc: 'Trách nhiệm với học trò bán trú, gia đình và xã hội.' },
    { title: 'Sự hợp tác & Lòng tự trọng', desc: 'Hợp tác hiệu quả, giữ gìn đạo đức nhà giáo và danh dự người học.' },
  ],
};

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'post-1',
    title: 'Hội nghị sơ kết công tác quản lý, chăm sóc học sinh bán trú học kỳ I năm học 2025 - 2026',
    slug: 'hoi-nghi-so-ket-cong-tac-quan-ly-cham-soc-hoc-sinh-ban-tru',
    category: 'hoc-sinh-ban-tru',
    categoryName: 'Học sinh bán trú',
    excerpt: 'Đánh giá toàn diện công tác quản lý nền nếp, bảo đảm an toàn vệ sinh thực phẩm và dinh dưỡng cho hơn 300 học sinh dân tộc bán trú tại trường.',
    content: `Trường PTDTBT THCS Thu Cúc vừa tổ chức thành công Hội nghị sơ kết công tác quản lý, nuôi dưỡng và chăm sóc học sinh bán trú học kỳ I năm học 2025 - 2026.

Tại hội nghị, Ban Giám hiệu cùng tổ quản lý bán trú đã báo cáo chi tiết về:
- Công tác duy trì nền nếp sinh hoạt, giờ giấc tự học buổi tối của học sinh bán trú.
- Đảm bảo thực đơn dinh dưỡng 3 bữa/ngày đủ calo, hợp vệ sinh và kiểm thực 3 bước nghiêm ngặt.
- Hoạt động tăng gia rau xanh cải thiện bữa ăn và rèn luyện kỹ năng sống cho các em.
- Các biện pháp chăm sóc sức khỏe mùa lạnh, phòng chống dịch bệnh vùng cao.

Thầy Hiệu trưởng biểu dương tinh thần trách nhiệm của đội ngũ thầy cô giáo trực bán trú, các nhân viên cấp dưỡng đã tận tâm chăm lo cho học sinh như con em ruột thịt của mình.`,
    imageUrl: '/assets/boarding.jpg',
    imageCaption: 'Bữa cơm trưa ấm cúng và đủ dinh dưỡng của học sinh bán trú tại bếp ăn nhà trường.',
    author: 'Ban Quản Lý Bán Trú',
    authorRole: 'Tổ Quản lý & Nuôi dưỡng',
    publishDate: '2026-11-05',
    isFeatured: true,
    isPinned: true,
    views: 428,
  },
  {
    id: 'post-2',
    title: 'Đẩy mạnh ứng dụng Học bạ số và triển khai nền tảng số trong quản lý giáo dục',
    slug: 'day-manh-ung-dung-hoc-ba-so-va-trien-khai-nen-tang-so',
    category: 'chuyen-doi-so',
    categoryName: 'Chuyển đổi số',
    excerpt: 'Nhà trường hoàn thành 100% việc số hóa học bạ số và đồng bộ dữ liệu ngành giáo dục, tạo điều kiện thuận lợi cho phụ huynh tra cứu kết quả học tập.',
    content: `Thực hiện kế hoạch chuyển đổi số của ngành giáo dục tỉnh Phú Thọ, Trường PTDTBT THCS Thu Cúc đã triển khai đồng bộ hệ thống Học bạ số và phần mềm quản lý trường học trực tuyến.

Các nội dung trọng tâm đã đạt được:
1. Số hóa toàn bộ hồ sơ điện tử của học sinh các khối lớp 6, 7, 8, 9.
2. 100% cán bộ giáo viên sử dụng chữ ký số cá nhân để phê duyệt điểm và nhận xét học bạ.
3. Tập huấn cho phụ huynh học sinh cài đặt ứng dụng liên lạc điện tử để nhận thông báo và theo dõi học tập của con em mình.
4. Đảm bảo an toàn thông tin mạng và bảo mật dữ liệu cá nhân của học sinh theo đúng quy định.`,
    imageUrl: '/assets/digital.jpg',
    imageCaption: 'Giáo viên hướng dẫn học sinh thao tác trên hệ thống học liệu và thư viện số.',
    author: 'Tổ Công Nghệ Thông Tin',
    authorRole: 'Ban Chỉ đạo Chuyển đổi số',
    publishDate: '2026-11-02',
    isFeatured: true,
    views: 312,
  },
  {
    id: 'post-3',
    title: 'Sôi nổi Ngày hội Văn hóa – Thể thao và Phong trào Đội chào mừng năm học mới',
    slug: 'soi-noi-ngay-hoi-van-hoa-the-thao-phong-trao-doi',
    category: 'tin-tuc-su-kien',
    categoryName: 'Tin tức – Sự kiện',
    excerpt: 'Các chi đội hào hứng tham gia thi đấu các môn thể thao dân tộc như kéo co, đẩy gậy, bóng chuyền hơi và giao lưu văn nghệ truyền thống.',
    content: `Nhằm tạo sân chơi lành mạnh, tăng cường tinh thần đoàn kết và giữ gìn bản sắc văn hóa các dân tộc anh em trên địa bàn xã Thu Cúc, Liên đội Trường PTDTBT THCS Thu Cúc đã tổ chức Ngày hội Văn hóa – Thể thao học đường.

Hơn 400 học sinh các khối lớp đã sôi nổi tranh tài ở các nội dung:
- Kéo co tập thể giữa các chi đội
- Thi đấu bóng chuyền hơi nam nữ
- Trò chơi dân gian: ném còn, đẩy gậy
- Hội thi văn nghệ với các tiết mục múa khèn, điệu xòe mang đậm bản sắc vùng cao.

Ngày hội không chỉ rèn luyện thể chất mà còn giúp các em học sinh bán trú thêm yêu trường, yêu lớp, yên tâm gắn bó với mái trường thân yêu.`,
    imageUrl: '/assets/sports.jpg',
    imageCaption: 'Không khí sôi nổi, náo nức trong phần thi kéo co của học sinh tại sân trường.',
    author: 'Liên Đội Thiếu Niên Tiền Phong',
    authorRole: 'Tổng phụ trách Đội',
    publishDate: '2026-10-28',
    isFeatured: true,
    views: 589,
  },
  {
    id: 'post-4',
    title: 'Sinh hoạt chuyên môn cụm trường: Đổi mới phương pháp dạy học theo Chương trình GDPT 2018',
    slug: 'sinh-hoat-chuyen-mon-cum-truong-doi-moi-phuong-phap',
    category: 'hoat-dong-chuyen-mon',
    categoryName: 'Hoạt động chuyên môn',
    excerpt: 'Tổ chức các tiết dạy chuyên đề môn Khoa học tự nhiên và Lịch sử - Địa lý, tích hợp giáo dục STEM và trải nghiệm thực tiễn.',
    content: `Trường PTDTBT THCS Thu Cúc vừa đăng cai tổ chức buổi sinh hoạt chuyên môn cụm trường cấp THCS với sự tham gia của đông đảo giáo viên bộ môn.

Nội dung buổi sinh hoạt tập trung vào:
- Dự giờ 02 tiết dạy thể nghiệm ứng dụng phương pháp dạy học tích cực và giáo dục STEM.
- Thảo luận về việc xây dựng ma trận, đặc tả đề kiểm tra định kỳ theo định hướng phát triển phẩm chất, năng lực người học.
- Chia sẻ kinh nghiệm kèm cặp, phụ đạo học sinh bán trú còn gặp khó khăn trong học tập.
- Ứng dụng công nghệ thông tin và AI hỗ trợ soạn giáo án điện tử sinh động, trực quan.`,
    imageUrl: '/assets/campus.jpg',
    imageCaption: 'Khuôn viên nhà trường khang trang trong ngày đón các đoàn bạn về dự hội nghị chuyên môn.',
    author: 'Tổ Chuyên Môn KHTN - KHXH',
    authorRole: 'Tổ trưởng chuyên môn',
    publishDate: '2026-10-20',
    views: 295,
  },
  {
    id: 'post-5',
    title: 'Kế hoạch công khai chất lượng giáo dục và điều kiện bảo đảm giáo dục năm học 2025 - 2026',
    slug: 'ke-hoach-cong-khai-chat-luong-giao-duc-2025-2026',
    category: 'van-ban-cong-khai',
    categoryName: 'Văn bản – Công khai',
    documentNumber: 'KH-THCSTC/2025/18',
    documentSigner: 'Hiệu trưởng Trường PTDTBT THCS Thu Cúc',
    schoolYear: '2025 - 2026',
    documentType: 'Kế hoạch',
    excerpt: 'Thực hiện Thông tư số 09/2024/TT-BGDĐT quy định về thực hiện công khai đối với cơ sở giáo dục thuộc hệ thống giáo dục quốc dân.',
    content: `Căn cứ Thông tư của Bộ Giáo dục và Đào tạo, Trường PTDTBT THCS Thu Cúc ban hành Kế hoạch công khai cam kết chất lượng giáo dục và chất lượng giáo dục thực tế năm học 2025 - 2026.

Nội dung công khai bao gồm:
1. Cam kết chất lượng giáo dục: Mục tiêu đào tạo, tỷ lệ tốt nghiệp THCS dự kiến, tỷ lệ học sinh lên lớp thẳng.
2. Điều kiện cơ sở vật chất: Số phòng học kiên cố, phòng bộ môn, phòng máy vi tính, bếp ăn bán trú và khu nhà nội trú.
3. Đội ngũ nhà giáo, cán bộ quản lý và nhân viên: Trình độ chuyên môn đạt chuẩn và trên chuẩn, tỷ lệ giáo viên dạy giỏi các cấp.
4. Công khai thu chi tài chính, chế độ chính sách hỗ trợ học sinh bán trú theo Nghị định của Chính phủ.

Các phụ huynh, học sinh và nhân dân có thể tải về toàn văn biểu mẫu công khai tại cổng thông tin điện tử của trường.`,
    imageUrl: '/assets/collective.jpg',
    imageCaption: 'Tập thể sư phạm nhà trường cam kết nâng cao chất lượng giáo dục toàn diện.',
    author: 'Ban Giám Hiệu',
    authorRole: 'Hiệu trưởng',
    publishDate: '2026-10-15',
    views: 340,
  },
  {
    id: 'post-6',
    title: 'Thông báo: Lịch kiểm tra định kỳ giữa học kỳ I và kế hoạch phụ đạo học sinh bán trú',
    slug: 'thong-bao-lich-kiem-tra-dinh-ky-giua-ki-1',
    category: 'thong-bao',
    categoryName: 'Thông báo',
    documentNumber: 'TB-THCS/2025/42',
    schoolYear: '2025 - 2026',
    documentType: 'Thông báo',
    excerpt: 'Nhà trường trân trọng thông báo lịch thi giữa kỳ I và phân công giáo viên trực hướng dẫn tự học các buổi tối cho học sinh bán trú.',
    content: `Kính gửi: Quý thầy cô giáo, quý bậc phụ huynh và các em học sinh.

Trường PTDTBT THCS Thu Cúc xin thông báo lịch khảo sát và kiểm tra định kỳ giữa học kỳ I năm học 2025 - 2026:
- Thời gian kiểm tra: Từ ngày 12/11/2026 đến ngày 16/11/2026.
- Các môn kiểm tra tập trung: Toán, Ngữ văn, Tiếng Anh, KHTN, Lịch sử - Địa lý.
- Lịch tự học bán trú: Ban quản lý bán trú tổ chức tự học có thầy cô trực bộ môn từ 19h30 đến 21h30 hằng đêm.

Đề nghị quý phụ huynh phối hợp, theo dõi và động viên con em mình ôn tập đạt kết quả tốt nhất.`,
    imageUrl: '/assets/digital.jpg',
    author: 'Bộ Phận Giáo Vụ',
    publishDate: '2026-11-06',
    views: 615,
  },
];

export const BOARDING_WEEKLY_MENU: BoardingDailyMenu[] = [
  {
    day: 'Thứ Hai',
    breakfast: 'Bánh bao nhân thịt trứng cút, sữa tươi',
    lunch: {
      main: 'Thịt lợn kho trứng cút',
      side: 'Bắp cải xào tỏi',
      soup: 'Canh bí xanh nấu tôm khô',
      dessert: 'Chuối tiêu chín',
    },
    dinner: {
      main: 'Cá basa sốt cà chua',
      side: 'Đậu phụ rán giòn',
      soup: 'Canh rau ngót nấu thịt băm',
    },
    calories: '2.150 kcal',
  },
  {
    day: 'Thứ Ba',
    breakfast: 'Phở gà lá chanh, sữa đậu nành',
    lunch: {
      main: 'Thịt bò xào củ quả',
      side: 'Rau muống luộc chấm tương',
      soup: 'Nước rau muống dầm sấu chua',
      dessert: 'Quýt ngọt',
    },
    dinner: {
      main: 'Thịt lợn rim mắm hành',
      side: 'Đậu que xào thịt',
      soup: 'Canh khoai mỡ nấu tôm',
    },
    calories: '2.200 kcal',
  },
  {
    day: 'Thứ Tư',
    breakfast: 'Xôi vò chả lụa, sữa chua',
    lunch: {
      main: 'Gà kho gừng sả',
      side: 'Su su xào cà rốt',
      soup: 'Canh cải ngọt nấu thịt',
      dessert: 'Dưa hấu đỏ',
    },
    dinner: {
      main: 'Thịt băm viên sốt nấm',
      side: 'Trứng cuộn rau củ',
      soup: 'Canh mồng tơi cua đồng',
    },
    calories: '2.180 kcal',
  },
  {
    day: 'Thứ Năm',
    breakfast: 'Bún mọc thịt nấm, sữa hạt sen',
    lunch: {
      main: 'Sườn heo rim chua ngọt',
      side: 'Giá đỗ xào hành hoa',
      soup: 'Canh củ cải sườn non',
      dessert: 'Thanh long ruột đỏ',
    },
    dinner: {
      main: 'Tôm rim thịt ba chỉ',
      side: 'Cải chíp xào tỏi',
      soup: 'Canh chua cá rô',
    },
    calories: '2.250 kcal',
  },
  {
    day: 'Thứ Sáu',
    breakfast: 'Bánh mì kẹp pate trứng, sữa bột dinh dưỡng',
    lunch: {
      main: 'Thịt kho tàu nước cốt dừa',
      side: 'Rau cải ngồng luộc',
      soup: 'Canh bầu nấu hến',
      dessert: 'Táo tươi',
    },
    dinner: {
      main: 'Chả cá chiên xù',
      side: 'Mướp đắng xào trứng',
      soup: 'Canh chua thịt băm',
    },
    calories: '2.100 kcal',
  },
];

export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 'album-1',
    title: 'Tập thể cán bộ giáo viên và các hoạt động phối hợp tại Thu Cúc',
    date: 'Tháng 10/2026',
    coverImage: '/assets/collective.jpg',
    images: [
      { url: '/assets/collective.jpg', caption: 'Lễ kỷ niệm và hoạt động phối hợp các lực lượng trên địa bàn xã Thu Cúc' },
      { url: '/assets/campus.jpg', caption: 'Quang cảnh sân trường và dãy phòng học khang trang' },
    ],
  },
  {
    id: 'album-2',
    title: 'Đời sống sinh hoạt và bữa cơm bán trú ấm áp tình thầy trò',
    date: 'Năm học 2025 - 2026',
    coverImage: '/assets/boarding.jpg',
    images: [
      { url: '/assets/boarding.jpg', caption: 'Bữa trưa dinh dưỡng đủ chất của các em học sinh nội trú bán trú' },
      { url: '/assets/sports.jpg', caption: 'Giờ giải lao vui chơi rèn luyện thể chất của học sinh' },
    ],
  },
  {
    id: 'album-3',
    title: 'Học sinh trải nghiệm công nghệ thông tin và chuyển đổi số',
    date: 'Tháng 11/2026',
    coverImage: '/assets/digital.jpg',
    images: [
      { url: '/assets/digital.jpg', caption: 'Học sinh tự tin khai thác kho học liệu số và học bạ điện tử' },
    ],
  },
];
