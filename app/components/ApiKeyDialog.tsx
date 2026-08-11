"use client";

import { KeyRound } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Tip } from "@/app/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import ApiKeyForm from "./ApiKeyForm";

export default function ApiKeyDialog({
  open,
  onOpenChange,
  apiKey,
  onSave,
  credits,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  onSave: (key: string) => void;
  credits: number;
}) {
  const hasKey = apiKey.trim().length > 0;
  const outOfCredits = !hasKey && credits <= 0;
  const [draft, setDraft] = useState(apiKey);

  useEffect(() => {
    if (open) setDraft(apiKey);
  }, [open, apiKey]);

  function save() {
    const next = draft.trim();
    if (next && (/\s/.test(next) || next.length < 20)) {
      toast({
        variant: "destructive",
        title: "API key có vẻ chưa hợp lệ",
        description:
          "Hãy sao chép đầy đủ key từ api.together.xyz và bảo đảm không có khoảng trắng.",
      });
      return;
    }
    onSave(next);
    toast({
      title: next ? "Đã lưu API key" : "Đã xóa API key",
      description: next
        ? "Key chỉ được lưu trong trình duyệt này và dùng cho lần tạo tiếp theo."
        : undefined,
    });
    setTimeout(() => onOpenChange(false), 220);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Tip
        label={
          outOfCredits
            ? "Đã hết lượt, hãy thêm API key"
            : hasKey
              ? "API key của bạn"
              : "Thêm API key"
        }
        side="bottom"
      >
        <DialogTrigger asChild>
          <button
            type="button"
            aria-label="API key Together AI"
            className="relative flex size-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:size-9"
          >
            <KeyRound className="size-[1.05rem]" />
            {hasKey && (
              <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-background bg-primary" />
            )}
            {outOfCredits && (
              <span className="absolute -right-0.5 -top-0.5 flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full border-2 border-background bg-amber-400" />
              </span>
            )}
          </button>
        </DialogTrigger>
      </Tip>

      <DialogContent className="max-w-md gap-5 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-[1.0625rem]">
            {outOfCredits ? "Bạn đã hết lượt miễn phí" : "API key Together AI"}
          </DialogTitle>
          <DialogDescription className="leading-relaxed">
            {outOfCredits
              ? "Thêm API key Together AI của riêng bạn để tiếp tục tạo logo. Key chỉ được lưu trong trình duyệt này."
              : "Tùy chọn: thêm API key Together AI riêng để tạo logo không giới hạn. Key chỉ được lưu trong trình duyệt này."}
          </DialogDescription>
        </DialogHeader>

        <ApiKeyForm
          value={draft}
          onChange={setDraft}
          onSubmit={save}
          autoFocus
        />

        <div className="flex items-center gap-2">
          {hasKey && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setDraft("");
                onSave("");
                toast({ title: "Đã xóa API key" });
                onOpenChange(false);
              }}
              className="mr-auto px-2 text-muted-foreground hover:text-foreground"
            >
              Xóa
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="ml-auto"
          >
            Hủy
          </Button>
          <Button
            type="button"
            onClick={save}
            disabled={draft.trim() === apiKey.trim()}
            className="font-semibold"
          >
            Lưu API key
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
