"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Tip } from "@/app/components/ui/tooltip";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <Tip
      label={!mounted ? "Giao diện" : isDark ? "Chế độ sáng" : "Chế độ tối"}
      side="bottom"
    >
      <button
        type="button"
        aria-label={
          !mounted
            ? "Đổi giao diện sáng/tối"
            : isDark
              ? "Chuyển sang chế độ sáng"
              : "Chuyển sang chế độ tối"
        }
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="group relative flex size-10 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:size-9"
      >
        {mounted && (
          <>
            <SunIcon
              className={`absolute size-[1.05rem] transition-all duration-300 ${
                isDark
                  ? "-rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <MoonIcon
              className={`absolute size-[1.05rem] transition-all duration-300 ${
                isDark
                  ? "rotate-0 scale-100 opacity-100"
                  : "rotate-90 scale-0 opacity-0"
              }`}
            />
          </>
        )}
      </button>
    </Tip>
  );
}
