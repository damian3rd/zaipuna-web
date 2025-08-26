"use client";

import { useEffect, useRef } from "react";

export default function ParallaxTitle() {
  const ref = useRef<HTMLDivElement>(null);

  // Negative = move up. Increase magnitude to push higher.
  const BASE_OFFSET_VH = -18; // keep as-is

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const basePx = (BASE_OFFSET_VH / 100) * window.innerHeight;
      const y = basePx + window.scrollY * 0.1; // parallax speed
      ref.current.style.transform = `translate3d(0, ${y}px, 0)`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [BASE_OFFSET_VH]);

  return (
    <div ref={ref} className="will-change-transform">
      <h1
        aria-hidden
        className="
          select-none uppercase font-extrabold
          tracking-[-0.01em]             /* slightly less tight */
          whitespace-nowrap text-center   /* force single line */
          text-red-600/20 leading-[0.9] drop-shadow
          text-[clamp(1.5rem,8vw,6rem)] /* reduced: min 1.5rem, up to 8vw, cap 6rem */
        "
      >
        ZAIPUNA OIL
      </h1>
    </div>
  );
}
