"use client";

import { useEffect } from "react";

/**
 * Compatibility layer cho các chuỗi UI tiếng Anh còn nằm trong component lớn.
 * Chỉ exact-match các câu giao diện đã biết; không dịch dữ liệu người dùng,
 * key nội bộ, prompt kỹ thuật, tên model hay payload API.
 *
 * Các thành phần quan trọng đã được dịch trực tiếp trong source. Lớp này là
 * bước chuyển tiếp cho tới khi toàn bộ ứng dụng dùng dictionary i18n chính thức.
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
  "Brand color": "Màu thương hiệu",
  "Detail level": "Mức độ chi tiết",
  "Reference logo": "Logo tham chiếu",
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
  "Company name": "Tên thương hiệu",
  "Start from your website": "Bắt đầu từ website của bạn",
  "Your website URL": "Địa chỉ website của bạn",
  "From website": "Từ website",
  "Detected colors": "Màu nhận diện được",
  "Detected brand colors": "Các màu thương hiệu nhận diện được",
  "Remove imported brand": "Xóa thương hiệu đã nhập",
  "Pick brand color from detected palette":
    "Chọn màu thương hiệu từ bảng màu đã nhận diện",
  "Auto-fill the name & brand color from your site":
    "Tự điền tên và màu thương hiệu từ website",
  "Out of credits, add a key": "Đã hết lượt, hãy thêm API key",
  "Download PNG": "Tải PNG",
  "Download SVG": "Tải SVG",
  "Download all": "Tải tất cả",
  "Create brand kit": "Tạo bộ nhận diện",
  "Open brand kit": "Mở bộ nhận diện",
  "Clear history": "Xóa lịch sử",
};

const VI_ATTRIBUTES: Record<string, string> = {
  "A fox, friendly and modern, with a subtle leaf…":
    "Một chú cáo thân thiện, hiện đại, điểm xuyết chiếc lá tinh tế…",
  "Solstice Coffee": "Cà phê Bình Minh",
  "yourcompany.com": "tencongty.vn",
  "Logo history": "Lịch sử logo",
  "Logo settings": "Thiết lập logo",
  "Quick start presets": "Mẫu bắt đầu nhanh",
  "Description suggestions": "Gợi ý mô tả",
  "Remove reference": "Xóa mẫu tham chiếu",
  "Logo type": "Kiểu logo",
  "Detail level": "Mức độ chi tiết",
  "Number of variations": "Số lượng phương án",
  "Feeling lucky: random style and AI-picked color":
    "Thử ngẫu nhiên: phong cách ngẫu nhiên và màu do AI chọn",
  "Your website URL": "Địa chỉ website của bạn",
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
  "Paste your API key": "Dán API key của bạn",
  "Together AI API key": "API key Together AI",
  "Blue": "Xanh dương",
  "Red": "Đỏ",
  "Green": "Xanh lá",
  "Yellow": "Vàng",
  "White": "Trắng",
  "Gray": "Xám",
  "Black": "Đen",
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

function shouldSkip(node: Node): boolean {
  const parent =
    node.nodeType === Node.ELEMENT_NODE
      ? (node as Element)
      : node.parentElement;
  return !!parent?.closest(
    "script, style, code, pre, textarea, [contenteditable='true'], [data-no-i18n]",
  );
}

function translateTextNode(node: Node) {
  if (shouldSkip(node)) return;
  const raw = node.nodeValue;
  if (!raw) return;
  const core = raw.trim();
  if (!core) return;
  const translated = translateCore(core);
  if (translated === core) return;
  const leading = raw.match(/^\s*/)?.[0] ?? "";
  const trailing = raw.match(/\s*$/)?.[0] ?? "";
  node.nodeValue = `${leading}${translated}${trailing}`;
}

function translateElement(el: Element) {
  if (shouldSkip(el)) return;
  for (const attr of ["placeholder", "aria-label", "title"] as const) {
    const value = el.getAttribute(attr);
    if (!value) continue;
    const translated = VI_ATTRIBUTES[value];
    if (translated && translated !== value) el.setAttribute(attr, translated);
  }
}

function translateTree(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root);
    return;
  }
  if (shouldSkip(root)) return;
  if (root instanceof Element) translateElement(root);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    translateTextNode(node);
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
          translateTextNode(mutation.target);
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
