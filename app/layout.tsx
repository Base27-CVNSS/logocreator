import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/app/components/ui/toaster";
import { TooltipProvider } from "@/app/components/ui/tooltip";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import AuthProvider from "@/app/components/AuthProvider";
import VietnameseLocalization from "@/app/components/VietnameseLocalization";

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Satoshi-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const title = "LogoCreator – Tạo logo AI chuyên nghiệp trong vài giây";
const description =
  "Tạo logo sạch, chuyên nghiệp bằng AI, chỉnh sửa nhanh và xuất bộ nhận diện thương hiệu. Giao diện tiếng Việt, miễn phí để bắt đầu.";
const canonicalUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.logo-creator.io/";
const sitename = "LogoCreator";

// Resolve the OG/Twitter card image against the origin actually serving THIS
// build, not a hardcoded canonical domain. In production we prefer Vercel's
// production URL; previews use their own URL; local builds fall back to the
// configured canonical URL.
const deployOrigin =
  process.env.VERCEL_ENV === "production" &&
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : canonicalUrl;

const ogimage = new URL("/og-image.png?v=2", deployOrigin).toString();

export const metadata: Metadata = {
  metadataBase: new URL(deployOrigin),
  applicationName: sitename,
  title,
  description,
  keywords: [
    "tạo logo AI",
    "thiết kế logo",
    "logo tiếng Việt",
    "LogoCreator",
    "FLUX",
    "Together AI",
    "bộ nhận diện thương hiệu",
  ],
  alternates: { canonical: canonicalUrl },
  openGraph: {
    images: [{ url: ogimage, width: 1200, height: 630, alt: title }],
    title,
    description,
    url: canonicalUrl,
    siteName: sitename,
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: [ogimage],
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0b" },
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
  ],
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${satoshi.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <TooltipProvider delayDuration={200} skipDelayDuration={300}>
              {children}
            </TooltipProvider>
          </AuthProvider>
          <VietnameseLocalization />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
