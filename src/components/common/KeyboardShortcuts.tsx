"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { INFO } from "@/lib/data";

export function KeyboardShortcuts() {
  const router = useRouter();
  const pathname = usePathname();
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: "",
    visible: false,
  });

  const showToast = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        e.isComposing
      ) {
        return;
      }

      // Ignore if a modifier key is pressed
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const key = e.key.toLowerCase();
      const isProjectPage = pathname.startsWith("/library/");
      const isLibraryPage = pathname === "/library";

      switch (key) {
        case "h":
          e.preventDefault();
          router.push("/");
          break;
        case "l":
          e.preventDefault();
          router.push("/library");
          break;
        case "b":
          if (isProjectPage) {
            e.preventDefault();
            router.push("/library");
          } else if (isLibraryPage) {
            e.preventDefault();
            router.push("/");
          }
          break;
        case "escape":
          if (isProjectPage) {
            e.preventDefault();
            router.push("/library");
          } else if (isLibraryPage) {
            e.preventDefault();
            router.push("/");
          }
          break;
        case "c":
          e.preventDefault();
          navigator.clipboard.writeText(INFO.email);
          showToast(`Copied ${INFO.email}`);
          break;
        case "m":
          e.preventDefault();
          window.location.href = `mailto:${INFO.email}`;
          break;
        case "t":
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 bg-foreground text-background text-xs font-mono rounded-md shadow-2xl transition-all duration-300 pointer-events-none ${
        toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {toast.message}
    </div>
  );
}
