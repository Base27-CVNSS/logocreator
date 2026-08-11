"use client";

import { useRef, type DragEvent } from "react";
import { ImagePlus, X } from "lucide-react";

export type ReferenceState = {
  dataUrl: string;
  description: string;
  styleGuess: string | null;
  dominantColor: string;
  keywords?: string[];
};

export type ReferenceStatus = "idle" | "reading" | "ready" | "error";

export default function ReferenceUpload({
  value,
  status,
  onFile,
  onClear,
}: {
  value: ReferenceState | null;
  status: ReferenceStatus;
  onFile: (file: File) => void;
  onClear: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        aria-label="Tải logo tham chiếu"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
          e.target.value = "";
        }}
      />

      {!value && status === "reading" ? (
        <div className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-dashed border-border bg-background px-3 py-6 text-center">
          <span className="spinner-ring size-4" />
          <span className="text-sm font-medium text-muted-foreground">
            Đang chuẩn bị ảnh tham chiếu…
          </span>
        </div>
      ) : !value ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border bg-background px-3 py-5 text-center transition-colors hover:border-foreground/30"
        >
          <ImagePlus className="size-5 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Tải ảnh tham chiếu
          </span>
          <span className="text-xs text-muted-foreground">
            PNG, JPG, WebP hoặc SVG · tối đa 5 MB
          </span>
        </button>
      ) : (
        <div className="flex gap-3 rounded-xl border border-border bg-background p-3">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary/40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.dataUrl}
              alt="Ảnh tham chiếu"
              className="size-full object-contain"
            />
            {status === "reading" && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                <span className="spinner-ring size-5" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="label-eyebrow" aria-live="polite">
                {status === "reading"
                  ? "Đang đọc…"
                  : status === "error"
                    ? "Không đọc được"
                    : "Đã nhận diện"}
              </span>
              <button
                type="button"
                onClick={onClear}
                aria-label="Xóa ảnh tham chiếu"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {status === "ready" && (
              <>
                {value.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {value.description}
                  </p>
                )}
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  {value.styleGuess && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.6875rem] font-medium text-foreground">
                      {value.styleGuess}
                    </span>
                  )}
                  {value.dominantColor !== "auto" && (
                    <span className="flex items-center gap-1 text-[0.6875rem] uppercase text-muted-foreground">
                      <span
                        className="size-3 rounded-full ring-1 ring-foreground/15"
                        style={{ backgroundColor: value.dominantColor }}
                      />
                      {value.dominantColor}
                    </span>
                  )}
                </div>
              </>
            )}
            {status === "reading" && (
              <p className="mt-1 text-xs text-muted-foreground">
                Đang phân tích ảnh tham chiếu…
              </p>
            )}
            {status === "error" && (
              <p className="mt-1 text-xs text-muted-foreground">
                Tính năng đọc ảnh cần quyền truy cập chat trong gói Together AI của bạn. Hãy thử ảnh khác hoặc mô tả trực tiếp ở ô phía trên.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
