"use client";

import { useEffect } from "react";

/**
 * Lớp bản địa hóa tương thích cho bản Việt hóa.
 *
 * LogoCreator hiện chưa có hệ thống i18n tập trung; nhiều chuỗi giao diện nằm
 * trực tiếp trong các component lớn. Thành phần này chỉ dịch các chuỗi hiển thị
 * khớp chính xác (text/placeholder/title/aria-label), KHÔNG thay đổi key nội bộ,
 * prompt kỹ thuật, tên model hay payload gửi tới API.
 *
 * Khi codebase được tách sang dictionary i18n chính thức, file này có thể được
 * loại bỏ dần mà không ảnh hưởng logic sinh logo.
 */

const VI_TEXT: Record<string, string> = {
  "Logo history": "Lịch sử logo",
  "Logo settings": "Thiết lập logo",
  "Quick start": "Bắt đầu nhanh",
  "Quick start presets": "Mẫu bắt đầu nhanh",
  "Describe it": "Mô tả ý tưởng",
  "(optional)": "(tùy chọn)",
  "Description suggestions": "Gợi ý mô tả",
  "Inspired by reference": "Lấy cảm hứng từ mẫu tham chiếu",
  "Remove reference": "Xóa mẫu tham chiếu",
  "Logo type": "Kiểu logo",
  "Style": "Phong cách",
  "Brand color": "Màu thương hiệu",
  "Background": "Nền",
  "Advanced": "Nâng cao",
  "Detail": "Mức chi tiết",
  "Detail level": "Mức độ chi tiết",
  "Monochrome": "Đơn sắc",
  "Reference logo": "Logo tham chiếu",
  "Variations": "Số phương án",
  "Number of variations": "Số lượng phương án",
  "Feeling lucky": "Thử ngẫu nhiên",
  "Feeling lucky: random style and AI-picked color":
    "Thử ngẫu nhiên: phong cách ngẫu nhiên và màu do AI chọn",
  "Generating…": "Đang tạo…",
  "Generate logo": "Tạo logo",
  "Sign in to generate": "Đăng nhập để tạo logo",
  "Add a key to generate": "Thêm API key để tạo logo",
  "Add your key": "Thêm API key",
  "Use your key": "Dùng API key của bạn",
  "What's this?": "Đây là gì?",
  "Your logos": "Logo của bạn",
  "Out of free credits": "Đã hết lượt miễn phí",
  "Structure": "Cấu trúc",
  "Icon + name": "Biểu tượng + tên",
  "Icon only": "Chỉ biểu tượng",
  "Wordmark (text only)": "Wordmark (chỉ chữ)",
  "Wordmark": "Wordmark",
  "Monogram": "Chữ lồng",
  "Emblem / badge": "Huy hiệu / phù hiệu",
  "Abstract mark": "Biểu tượng trừu tượng",
  "Minimal": "Tối giản",
  "Geometric": "Hình học",
  "Gradient": "Chuyển sắc",
  "Mascot": "Linh vật",
  "Hand-drawn": "Vẽ tay",
  "Luxury": "Cao cấp",
  "Retro": "Hoài cổ",
  "Surprise me": "Tạo bất ngờ",
  "Balanced": "Cân bằng",
  "Detailed": "Chi tiết",
  "Blue": "Xanh dương",
  "Red": "Đỏ",
  "Green": "Xanh lá",
  "Yellow": "Vàng",
  "White": "Trắng",
  "Gray": "Xám",
  "Black": "Đen",
  "Company name": "Tên thương hiệu",
  "Start from your website": "Bắt đầu từ website của bạn",
  "Your website URL": "Địa chỉ website của bạn",
  "From website": "Từ website",
  "Import": "Nhập",
  "Detected colors": "Màu nhận diện được",
  "Detected brand colors": "Các màu thương hiệu nhận diện được",
  "Remove imported brand": "Xóa thương hiệu đã nhập",
  "Pick brand color from detected palette":
    "Chọn màu thương hiệu từ bảng màu đã nhận diện",
  "Auto-fill the name & brand color from your site":
    "Tự điền tên và màu thương hiệu từ website",
  "Theme": "Giao diện",
  "Light mode": "Chế độ sáng",
  "Dark mode": "Chế độ tối",
  "Toggle theme": "Đổi giao diện sáng/tối",
  "Switch to light mode": "Chuyển sang chế độ sáng",
  "Switch to dark mode": "Chuyển sang chế độ tối",
  "Together AI key": "API key Together AI",
  "Your API key": "API key của bạn",
  "Add API key": "Thêm API key",
  "Out of credits, add a key": "Đã hết lượt, hãy thêm API key",
  "Remove": "Xóa",
  "Cancel": "Hủy",
  "Save key": "Lưu API key",
  "Paste your API key": "Dán API key của bạn",
  "Together AI API key": "API key Together AI",
  "Get a free key from Together AI →": "Lấy API key từ Together AI →",
  "Download": "Tải xuống",
  "Download PNG": "Tải PNG",
  "Download SVG": "Tải SVG",
  "Download all": "Tải tất cả",
  "Brand kit": "Bộ nhận diện thương hiệu",
  "Create brand kit": "Tạo bộ nhận diện",
  "Open brand kit": "Mở bộ nhận diện",
  "History": "Lịch sử",
  "Clear history": "Xóa lịch sử",
  "Delete": "Xóa",
  "Favorite": "Yêu thích",
  "Rename": "Đổi tên",
  "Regenerate": "Tạo lại",
  "Vary": "Tạo biến thể",
  "Edit": "Chỉnh sửa",
  "Close": "Đóng",
  "Sign in": "Đăng nhập",
  "Sign out": "Đăng xuất",
  "Account": "Tài khoản",
  "API key": "API key",
  "Loading…": "Đang tải…",
  "Try again": "Thử lại",
  "Retry": "Thử lại",
  "Save": "Lưu",
  "Done": "Hoàn tất",
};

const VI_ATTRIBUTES: Record<string, string> = {
  "A fox, friendly and modern, with a subtle leaf…":
    "Một chú cáo thân thiện, hiện đại, điểm xuyết chiếc lá tinh tế…",
  "Solstice Coffee": "Cà phê Bình Minh",
  "yourcompany.com": "tencongty.vn",
};

const DYNAMIC_RULES: Array<[RegExp, string]> = [
  [/^Generating (\d+) logos…$/, "Đang tạo $1 logo…"],
  [/^Generating a logo…$/, "Đang tạo logo…"],
  [/^Generation failed\.$/, "Tạo logo thất bại."],
  [/^(\d+) logos ready\.$/, "$1 logo đã sẵn sàng."],
  [/^1 logo ready\.$/, "1 logo đã sẵn sàng."],
  [/^Generate (\d+) logos$/, "Tạo $1 logo"],
  [/^(\d+) free credits left$/, "Còn $1 lượt miễn phí"],
  [/^1 free credit left$/, "Còn 1 lượt miễn phí"],
  [/^Sign in for (\d+) free credits$/, "Đăng nhập để nhận $1 lượt miễn phí"],
  [/^Generated (\d+) of (\d+)$/, "Đã tạo $1/$2 logo"],
  [/^Making (\d+) logos this run$/, "Lần này sẽ tạo $1 logo"],
  [/^Making 1 logo this run$/, "Lần này sẽ tạo 1 logo"],
];

function translateCore(core: string): string {
  if (VI_TEXT[core]) return VI_TEXT[core];
  for (const [pattern, replacement] of DYNAMIC_RULES) {
    if (pattern.test(core)) return core.replace(pattern, replacement);
  }
  return core;
}

function translateText(raw: string): string {
  const core = raw.trim();
  if (!core) return raw;
  const translated = translateCore(core);
  if (translated === core) return raw;
  const leading = raw.match(/^\s*/)?.[0] ?? "";
  const trailing = raw.match(/\s*$/)?.[0] ?? "";
  return `${leading}${translated}${trailing}`;
}

function translateElement(el: Element) {
  for (const attr of ["placeholder", "aria-label", "title"] as const) {
    const value = el.getAttribute(attr);
    if (!value) continue;
    const translated = VI_ATTRIBUTES[value] ?? translateCore(value);
    if (translated !== value) el.setAttribute(attr, translated);
  }
}

function translateTree(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    const value = root.nodeValue;
    if (value) root.nodeValue = translateText(value);
    return;
  }

  if (root instanceof Element) translateElement(root);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const value = node.nodeValue;
    if (value) node.nodeValue = translateText(value);
    node = walker.nextNode();
  }

  if (root instanceof Element) {
    root
      .querySelectorAll("[placeholder], [aria-label], [title]")
      .forEach(translateElement);
  }
}

export default function VietnameseLocalization() {
  useEffect(() => {
    translateTree(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          translateTree(mutation.target);
          continue;
        }
        if (mutation.type === "attributes") {
          if (mutation.target instanceof Element) translateElement(mutation.target);
          continue;
        }
        mutation.addedNodes.forEach(translateTree);
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label", "title"],
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
