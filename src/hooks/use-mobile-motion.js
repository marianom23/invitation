import { useEffect, useState } from "react";

/**
 * Tracks whether the viewport is mobile-sized. Used to disable
 * scroll-reveal animations on phones, where framer-motion's
 * per-frame JS updates compete with scrolling and cause jank.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined" ? false : window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
