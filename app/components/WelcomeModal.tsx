"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LogoMark } from "./Logo";
import ApiKeyForm from "./ApiKeyForm";
import DiagonalShowcase from "./DiagonalShowcase";

export default function WelcomeModal({
  open,
  onOpenChange,
  apiKey,
  onSave,
  onStart,
  freeCredits,
  needsSignIn,
  signedIn,
  onSignIn,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  onSave: (key: string) => void;
  onStart: () => void;
  freeCredits: number;
  needsSignIn: boolean;
  signedIn: boolean;
  onSignIn: () => void;
}) {
  const [draft, setDraft] = useState(apiKey);
  useEffect(() => {
    if (open) setDraft(apiKey);
  }, [open, apiKey]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function start() {
    const k = draft.trim();
    if (k && (/\s/.test(k) || k.length < 20)) {
      toast({
        variant: "destructive",
        title: "API key có vẻ chưa hợp lệ",
        description:
          "Hãy kiểm tra bạn đã sao chép đầy đủ API key, hoặc xóa ô này để bắt đầu bằng lượt miễn phí.",
      });
      return;
    }
    if (k && k !== apiKey.trim()) onSave(k);
    onStart();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      {mounted &&
        open &&
        createPortal(
          <div
            aria-hidden
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-40 bg-black/80 data-[state=open]:animate-in data-[state=open]:fade-in-0"
            data-state="open"
          />,
          document.body,
        )}
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="max-w-3xl gap-0 overflow-hidden rounded-2xl border-0 p-0 ring-1 ring-border sm:rounded-2xl"
      >
        <div className="relative flex min-h-[26rem] items-center justify-center p-5 sm:min-h-[34rem] sm:p-10">
          <DiagonalShowcase />
          <div className="relative w-full max-w-sm rounded-2xl border border-border/60 bg-background/80 p-8 text-center shadow-2xl backdrop-blur-xl">
            <LogoMark className="mx-auto size-11" />
            <DialogTitle className="mt-5 text-2xl font-black tracking-tight sm:text-[1.75rem]">
              Thiết kế logo trong vài giây.
            </DialogTitle>

            {needsSignIn ? (
              <>
                <DialogDescription className="mx-auto mt-2 max-w-xs text-pretty text-sm text-muted-foreground">
                  Đăng nhập miễn phí để bắt đầu. Bạn nhận{" "}
                  <span className="font-semibold text-foreground">
                    {freeCredits} lượt tạo logo miễn phí
                  </span>{" "}
                  và không cần thẻ thanh toán.
                </DialogDescription>

                <Button
                  onClick={onSignIn}
                  size="lg"
                  className="mt-6 w-full rounded-xl text-[0.95rem] font-bold"
                >
                  <Sparkles className="size-4" />
                  Đăng nhập nhận {freeCredits} lượt miễn phí
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  Chỉ mất vài giây. Logo của bạn vẫn được lưu trên thiết bị này.
                </p>

                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="mt-5 text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
                >
                  Chỉ muốn xem trước? Bỏ qua lúc này
                </button>
              </>
            ) : (
              <>
                <DialogDescription className="mx-auto mt-2 max-w-xs text-pretty text-sm text-muted-foreground">
                  {signedIn ? (
                    <>
                      Đã đăng nhập. Bạn có{" "}
                      <span className="font-semibold text-foreground">
                        {freeCredits} lượt miễn phí
                      </span>{" "}
                      sẵn sàng sử dụng.
                    </>
                  ) : (
                    <>
                      Bắt đầu với{" "}
                      <span className="font-semibold text-foreground">
                        {freeCredits} lượt miễn phí
                      </span>
                      {", không cần tài khoản."}
                    </>
                  )}
                </DialogDescription>

                <div className="mt-6 space-y-2 text-left">
                  <ApiKeyForm
                    value={draft}
                    onChange={setDraft}
                    onSubmit={start}
                  />
                  <p className="text-xs text-muted-foreground">
                    Thêm API key riêng để tạo không giới hạn; lượt miễn phí vẫn được giữ nguyên.
                  </p>
                </div>

                <Button
                  onClick={start}
                  size="lg"
                  className="mt-6 w-full rounded-xl text-[0.95rem] font-bold"
                >
                  Bắt đầu sáng tạo
                  <ArrowRight className="size-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
