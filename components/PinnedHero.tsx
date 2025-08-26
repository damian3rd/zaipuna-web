"use client";

import { useEffect, useMemo, useRef } from "react";
import GallonCanvas from "@/components/GallonCanvas";

const TEXT = "ZAIPUNA OIL";

const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);
const smooth = (t: number) => t * t * (3 - 2 * t); // smoothstep

export default function PinnedHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const spansRef = useRef<HTMLSpanElement[]>([]);
  const letters = useMemo(() => TEXT.split(""), []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wrapper.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = wrapper.offsetHeight - vh;
        const scrolled = clamp(-rect.top, 0, total);
        const p = total > 0 ? scrolled / total : 0;

        // Broadcast hero progress to the 3D component
        window.dispatchEvent(
          new CustomEvent("heroProgress", { detail: { p } })
        );

        // Position the big word a bit higher + subtle parallax
        const SHIFT_VH = -18; // adjust to move the whole word up/down (more - = higher)
        const baseUp = (SHIFT_VH / 100) * vh;
        const slowParallax = p * 0.08 * vh;

        const container = wrapper.querySelector<HTMLDivElement>(
          "[data-title-container]"
        );
        if (container)
          container.style.transform = `translate3d(0, ${
            baseUp + slowParallax
          }px, 0)`;

        // Per-letter upward animation (center-out)
        const mid = (letters.length - 1) / 2;
        const stagger = 0.06;
        const dur = 0.28;

        spansRef.current.forEach((span, i) => {
          if (!span) return;
          const dist = Math.abs(i - mid);
          const t = clamp((p - dist * stagger) / dur);
          const e = smooth(t);

          const lift = 160 + dist * 8;
          const y = -lift * e; // up only
          const s = 1 - 0.12 * e; // slight scale down
          const o = 1 - e; // fade

          span.style.transform = `translate(0px, ${y}px) scale(${s})`;
          span.style.opacity = String(o);
        });
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
  }, [letters.length]);

  return (
    <div ref={wrapperRef} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen">
        <section className="relative h-full bg-gradient-to-br from-yellow-100 via-yellow-50 to-white flex items-center justify-center overflow-visible">
          {/* Background title (behind the 3D) */}
          <div
            data-title-container
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center will-change-transform"
          >
            <h1
              aria-hidden
              className="
                select-none uppercase font-extrabold tracking-[-0.02em]
                whitespace-nowrap text-center
                text-red-600/20 leading-[0.9] drop-shadow
                text-[clamp(2.5rem,14vw,12rem)]
              "
            >
              {letters.map((ch, idx) => (
                <span
                  key={idx}
                  ref={(el) => {
                    if (el) spansRef.current[idx] = el;
                  }}
                  className="inline-block will-change-transform"
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>
          </div>

          {/* 3D model on top */}
          <div className="relative z-10 w-full max-w-[1100px] px-4">
            <GallonCanvas />
          </div>
        </section>
      </div>
    </div>
  );
}
