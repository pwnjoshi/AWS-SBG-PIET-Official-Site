"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable browser automatic scroll restoration to guarantee top scroll on navigation
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // If navigated with a hash (e.g. #tickets or #agenda), let the hash handler take over
    if (window.location.hash) return;

    // Immediately reset scroll position to 0 across window, html, and body
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Double safety pass after Next.js finishes DOM paint
    const timer = setTimeout(() => {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }, 40);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
