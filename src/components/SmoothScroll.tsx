"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Enforce manual scroll restoration so browser never restores stale scroll on navigation
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // 2. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.1,
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

    // 3. Anchor / Hash scroll handler
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

    // On initial mount, jump to top or target hash
    if (window.location.hash) {
      scrollToHash(window.location.hash, 250);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      lenis.scrollTo(0, { immediate: true });
    }

    // 4. Intercept anchor clicks on same page
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const urlPath = href.substring(0, hashIndex);
      const hash = href.substring(hashIndex);
      const currentPath = window.location.pathname;

      if (urlPath === "" || urlPath === currentPath || (currentPath.endsWith(urlPath) && urlPath !== "")) {
        const el = document.querySelector(hash);
        if (el) {
          e.preventDefault();
          history.pushState(null, "", hash);
          lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.2 });
        }
      }
    };

    // 5. Handle popstate (Browser Back & Forward navigation)
    const handlePopState = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash, 100);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        lenis.scrollTo(0, { immediate: true });
      }
    };

    const handleHashChange = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash, 100);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handleHashChange);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // 6. Whenever pathname changes (Route Navigation to any page)
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
      }, 250);
      return () => clearTimeout(timer);
    } else {
      // Immediate reset on route change
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }

      // Secondary check after Next.js finishes DOM render
      const timer = setTimeout(() => {
        if (!window.location.hash) {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
          }
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return <>{children}</>;
}