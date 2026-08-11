import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Camera,
  Coffee,
  Cpu,
  Dumbbell,
  Flower2,
  Gamepad2,
  Leaf,
  Music2,
  Palette,
  Plane,
  Scale,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";

/**
 * Các preset khởi đầu nhanh. Các giá trị kỹ thuật như logoType/style/detailLevel
 * giữ nguyên key tiếng Anh để không phá hợp đồng với logic sinh ảnh; chỉ phần
 * nhãn và nội dung người dùng nhìn thấy được Việt hóa.
 */
export type StarterPreset = {
  id: string;
  label: string;
  icon: LucideIcon;
  logoType: string;
  style: string;
  primaryColor: string;
  backgroundColor: string;
  detailLevel: string;
  describe: string;
};

export const STARTER_PRESETS: StarterPreset[] = [
  {
    id: "tech",
    label: "Công nghệ",
    icon: Cpu,
    logoType: "icon-name",
    style: "Geometric",
    primaryColor: "auto",
    backgroundColor: "#FFFFFF",
    detailLevel: "Balanced",
    describe: "một biểu tượng hình học sạch, gợi liên kết, tốc độ và độ tin cậy",
  },
  {
    id: "coffee",
    label: "Cà phê",
    icon: Coffee,
    logoType: "icon-name",
    style: "Hand-drawn",
    primaryColor: "auto",
    backgroundColor: "#F5F1E8",
    detailLevel: "Balanced",
    describe: "một tách cà phê vẽ tay ấm áp với làn hơi nhẹ, gần gũi và thủ công",
  },
  {
    id: "fitness",
    label: "Thể hình",
    icon: Dumbbell,
    logoType: "icon-name",
    style: "Minimal",
    primaryColor: "auto",
    backgroundColor: "#14130F",
    detailLevel: "Balanced",
    describe: "một biểu tượng mạnh và năng động, gợi chuyển động, năng lượng và sức mạnh",
  },
  {
    id: "finance",
    label: "Tài chính",
    icon: TrendingUp,
    logoType: "emblem",
    style: "Luxury",
    primaryColor: "auto",
    backgroundColor: "#FFFFFF",
    detailLevel: "Balanced",
    describe: "một huy hiệu tinh tế gợi sự tin cậy, ổn định và tăng trưởng",
  },
  {
    id: "beauty",
    label: "Làm đẹp",
    icon: Flower2,
    logoType: "icon-name",
    style: "Luxury",
    primaryColor: "auto",
    backgroundColor: "#FFFFFF",
    detailLevel: "Balanced",
    describe: "một biểu tượng hoa tối giản thanh lịch, mềm mại, cao cấp và tinh tế",
  },
  {
    id: "food",
    label: "Nhà hàng",
    icon: UtensilsCrossed,
    logoType: "emblem",
    style: "Retro",
    primaryColor: "auto",
    backgroundColor: "#F5F1E8",
    detailLevel: "Detailed",
    describe: "một huy hiệu nhà hàng cổ điển, hấp dẫn, chỉn chu và mang chất thủ công",
  },
  {
    id: "nature",
    label: "Sinh thái",
    icon: Leaf,
    logoType: "icon-name",
    style: "Minimal",
    primaryColor: "auto",
    backgroundColor: "#FFFFFF",
    detailLevel: "Minimal",
    describe: "một biểu tượng đơn giản dựa trên chiếc lá, tự nhiên, tĩnh và bền vững",
  },
  {
    id: "gaming",
    label: "Game",
    icon: Gamepad2,
    logoType: "icon-name",
    style: "3D",
    primaryColor: "auto",
    backgroundColor: "#14130F",
    detailLevel: "Detailed",
    describe: "một huy hiệu 3D mạnh mẽ, giàu năng lượng, sắc cạnh và mang cảm giác tương lai",
  },
  {
    id: "law",
    label: "Pháp lý",
    icon: Scale,
    logoType: "monogram",
    style: "Luxury",
    primaryColor: "auto",
    backgroundColor: "#FFFFFF",
    detailLevel: "Balanced",
    describe: "một chữ lồng cổ điển, có uy tín, bền vững theo thời gian và đáng tin cậy",
  },
  {
    id: "creative",
    label: "Sáng tạo",
    icon: Palette,
    logoType: "abstract",
    style: "Gradient",
    primaryColor: "auto",
    backgroundColor: "#FFFFFF",
    detailLevel: "Balanced",
    describe: "một biểu tượng trừu tượng chuyển sắc sống động, vui tươi, táo bạo và hiện đại",
  },
  {
    id: "realestate",
    label: "Bất động sản",
    icon: Building2,
    logoType: "icon-name",
    style: "Minimal",
    primaryColor: "auto",
    backgroundColor: "#FFFFFF",
    detailLevel: "Balanced",
    describe: "một biểu tượng kiến trúc sạch, gợi bất động sản, niềm tin và phong cách sống hiện đại",
  },
  {
    id: "photo",
    label: "Nhiếp ảnh",
    icon: Camera,
    logoType: "icon-name",
    style: "Minimal",
    primaryColor: "auto",
    backgroundColor: "#14130F",
    detailLevel: "Minimal",
    describe: "một biểu tượng khẩu độ hoặc ống kính tối giản, sắc nét, hiện đại và chuyên nghiệp",
  },
  {
    id: "music",
    label: "Âm nhạc",
    icon: Music2,
    logoType: "abstract",
    style: "Gradient",
    primaryColor: "auto",
    backgroundColor: "#14130F",
    detailLevel: "Balanced",
    describe: "một biểu tượng sóng âm trừu tượng, sống động, giàu năng lượng và nhịp điệu",
  },
  {
    id: "travel",
    label: "Du lịch",
    icon: Plane,
    logoType: "icon-name",
    style: "Hand-drawn",
    primaryColor: "auto",
    backgroundColor: "#F5F1E8",
    detailLevel: "Balanced",
    describe: "một biểu tượng thân thiện gợi hành trình, điểm đến và tinh thần khám phá",
  },
];

export const DESCRIBE_SUGGESTIONS: string[] = [
  "một chú cáo thân thiện với chiếc lá tinh tế, hiện đại và bo tròn",
  "một đỉnh núi tối giản nằm trong vòng tròn",
  "một biểu tượng trừu tượng gợi chuyển động đi lên",
  "một chú chim hình học mềm mại đang cất cánh",
];
