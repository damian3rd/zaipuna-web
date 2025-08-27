"use client";

import { useEffect, useRef } from "react";

export default function ZoomHeadlineSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // Tuning knobs
  const START_SCALE = 3.8; // starts way too big (off-screen)
  const END_SCALE = 1.0; // ends exactly filling the viewport
  const START_OPAC = 0.0; // fade from 0 → 1
  const END_OPAC = 1.0;

  const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);
  const smooth = (t: number) => t * t * (3 - 2 * t); // smoothstep

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const headline = headlineRef.current;
    if (!wrapper || !headline) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wrapper.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = wrapper.offsetHeight - vh; // scrollable distance inside this section
        const scrolled = clamp(-rect.top, 0, total);
        const p = total > 0 ? scrolled / total : 0; // 0..1

        const e = smooth(p);
        const scale = START_SCALE + (END_SCALE - START_SCALE) * e;
        const opacity = START_OPAC + (END_OPAC - START_OPAC) * e;

        headline.style.transform = `translate(-50%, -50%) scale(${scale})`;
        headline.style.opacity = String(opacity);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    // Give extra height so you can scroll through the zoom-out motion
    <div ref={wrapperRef} className="relative h-[160vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background (adjust to your brand as needed) */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-yellow-100" />

        {/* Centered headline that scales down into place */}
        <h2
          ref={headlineRef}
          className="
            absolute left-1/2 top-1/2 will-change-transform
            text-slate-900 font-extrabold text-center leading-[0.85] tracking-[-0.02em]
            [transform-origin:center]
            pointer-events-none
          "
          style={{
            transform: "translate(-50%, -50%) scale(2.8)",
            opacity: 0,
          }}
        >
          <span className="block text-[clamp(3rem,12vw,12rem)]">Our</span>
          <span className="block text-[clamp(3rem,12vw,12rem)]">Product</span>
          <span className="block text-[clamp(3rem,12vw,12rem)]">Overview</span>
        </h2>
      </div>
    </div>
  );
}
