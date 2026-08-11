"use client";

import { Input } from "@/app/components/ui/input";

/** Trường API key Together AI dùng chung cho hộp thoại và màn hình chào mừng. */
export default function ApiKeyForm({
  value,
  onChange,
  onSubmit,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
}) {
  return (
    <div className="space-y-2.5">
      <Input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSubmit) {
            e.preventDefault();
            onSubmit();
          }
        }}
        placeholder="Dán API key của bạn"
        aria-label="API key Together AI"
        autoComplete="off"
        spellCheck={false}
        autoFocus={autoFocus}
      />
      <a
        href="https://api.together.xyz/settings/api-keys"
        target="_blank"
        rel="noreferrer"
        className="inline-block text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
      >
        Lấy API key từ Together AI →
      </a>
    </div>
  );
}
