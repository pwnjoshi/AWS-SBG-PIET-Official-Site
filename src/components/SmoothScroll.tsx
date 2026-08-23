"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Scroll to element helper
    const scrollToHash = (hash: string, delay = 100) => {
      if (!hash || hash === "#") return;
      setTimeout(() => {
        try {
          const el = document.querySelector(hash);
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
          }
        } catch {
          // ignore
        }
      }, delay);
    };

    // Check hash on initial mount
    if (window.location.hash) {
      scrollToHash(window.location.hash, 300);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    // Smooth anchor navigation handling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Extract hash part
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const urlPath = href.substring(0, hashIndex);
      const hash = href.substring(hashIndex);

      const currentPath = window.location.pathname;

      // If it's a pure hash link (#tickets) OR same-page full link (/scd-panipat-2026#tickets)
      if (urlPath === "" || urlPath === currentPath || (currentPath.endsWith(urlPath) && urlPath !== "")) {
        const el = document.querySelector(hash);
        if (el) {
          e.preventDefault();
          history.pushState(null, "", hash);
          lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
        }
      }
    };

    const handleHashChange = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash, 100);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("hashchange", handleHashChange);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Whenever pathname changes, handle top scroll or hash jump
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.location.hash) {
      const hash = window.location.hash;
      const timer = setTimeout(() => {
        try {
          const el = document.querySelector(hash);
          if (el && lenisRef.current) {
            lenisRef.current.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
          }
        } catch {
          // ignore
        }
      }, 300);

      return () => clearTimeout(timer);
    } else {
      // Clean page route transition -> scroll straight to the very top (Hero section)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
