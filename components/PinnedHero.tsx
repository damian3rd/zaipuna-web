"use client";

import { useEffect, useMemo, useRef } from "react";
import GallonCanvas from "@/components/GallonCanvas";

const TEXT = "ZAIPUNA OIL";

// helpers
const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);
const smooth = (t: number) => t * t * (3 - 2 * t); // smoothstep

// Centered paragraph (few lines)
const BENEFITS = (
  `Naturally cold-pressed and unrefined, Zaipuna Oil locks in vitamins A, D and E ` +
  `to deeply nourish skin and hair. Lightweight, fast-absorbing and gentle for all ` +
  `skin types, it restores softness and shine—without additives or preservatives. ` +
  `From farm to bottle, every batch is crafted fresh and sustainably sourced.`
).replace(/\s+/g, " ");

export default function PinnedHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const titleSpansRef = useRef<HTMLSpanElement[]>([]);
  const wordsSpansRef = useRef<HTMLSpanElement[]>([]);

  const letters = useMemo(() => TEXT.split(""), []);
  const words = useMemo(
    () =>
      BENEFITS.split(" ")
        .map((w) => w.trim())
        .filter(Boolean),
    []
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wrapper.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = wrapper.offsetHeight - vh; // scrollable distance inside wrapper
        const scrolled = clamp(-rect.top, 0, total);
        const p = total > 0 ? scrolled / total : 0; // 0..1 progress while pinned

        // Broadcast hero progress to 3D (rotation, shrinking)
        window.dispatchEvent(
          new CustomEvent("heroProgress", { detail: { p } })
        );

        // ----- Phase 1: Title placement + per-letter lift (center → up) -----
        const SHIFT_VH = -26; // move whole word up (more - = higher)
        const baseUp = (SHIFT_VH / 100) * vh;
        const slowParallax = p * 0.08 * vh;

        const titleContainer = wrapper.querySelector<HTMLDivElement>(
          "[data-title-container]"
        );
        if (titleContainer) {
          titleContainer.style.transform = `translate3d(0, ${
            baseUp + slowParallax
          }px, 0)`;
        }

        const mid = (letters.length - 1) / 2;
        const letterStagger = 0.06;
        const letterDur = 0.28;

        titleSpansRef.current.forEach((span, i) => {
          if (!span) return;
          const dist = Math.abs(i - mid);
          const t = clamp((p - dist * letterStagger) / letterDur);
          const e = smooth(t);

          const lift = 160 + dist * 8;
          const y = -lift * e; // up only
          const s = 1 - 0.12 * e; // slight scale down
          const o = 1 - e; // fade

          span.style.transform = `translate(0px, ${y}px) scale(${s})`;
          span.style.opacity = String(o);
        });

        // ----- Phase 2: Gradient boost + paragraph word-by-word reveal -----
        const BOOST_START = 0.7; // begin intensifying gradient
        const boost = smooth(clamp((p - BOOST_START) / (1 - BOOST_START)));
        const gradientBoost = wrapper.querySelector<HTMLDivElement>(
          "[data-gradient-boost]"
        );
        if (gradientBoost) gradientBoost.style.opacity = String(boost);

        // Reveal timing: fill EXACTLY to p = 1 so viewport only moves on after full reveal
        const N = Math.max(words.length, 1);
        const lastIdx = N - 1;
        const REVEAL_START = 0.5; // reveal occupies the last 50% of the pin
        const REVEAL_WINDOW = 0.5; // ends at p = 1.0
        const wordDur = 0.16; // animation length for each word
        const lane = Math.max(REVEAL_WINDOW - wordDur, 0.001);

        wordsSpansRef.current.forEach((span, i) => {
          if (!span) return;
          const ratio = lastIdx === 0 ? 0 : i / lastIdx; // 0..1 across words
          const startP = REVEAL_START + ratio * lane; // staggered starts
          const tw = clamp((p - startP) / wordDur); // 0..1 per word
          const ew = smooth(tw);

          const x = (1 - ew) * -22; // slide in from left
          const o = ew; // fade in
          span.style.transform = `translate3d(${x}px,0,0)`;
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
  }, [letters.length, words.length]);

  return (
    // Taller wrapper so the hero stays pinned until the paragraph fully reveals
    <div ref={wrapperRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen">
        <section className="relative h-full overflow-visible">
          {/* Base gradient */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-yellow-100 via-yellow-50 to-white" />

          {/* Gradient boost overlay (intensifies as you scroll) */}
          <div
            data-gradient-boost
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              opacity: 0,
              background:
                "linear-gradient(135deg, rgba(245,158,11,0.30) 0%, rgba(253,230,138,0.45) 35%, rgba(255,255,255,0.9) 100%)",
            }}
          />

          {/* Background title (behind 3D) */}
          <div
            data-title-container
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center will-change-transform"
          >
            <h1
              aria-hidden
              className="select-none uppercase font-extrabold tracking-[-0.02em] whitespace-nowrap text-center text-red-600/20 leading-[0.9] drop-shadow text-[clamp(2.75rem,12vw,10rem)]"
            >
              {letters.map((ch, idx) => (
                <span
                  key={idx}
                  ref={(el) => {
                    if (el) titleSpansRef.current[idx] = el;
                  }}
                  className="inline-block will-change-transform"
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </h1>
          </div>

          {/* 3D model (middle layer) */}
          <div className="relative z-20 w-full max-w-[1100px] px-4 mx-auto flex items-center justify-center h-full">
            <GallonCanvas />
          </div>

          {/* Benefits copy (centered, above model — solid background) */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-full px-6 flex justify-center">
            <div className="relative inline-block">
              <div className="rounded-2xl px-4 py-3 md:px-8 md:py-5">
                <p className="mx-auto text-center text-black text-base sm:text-lg md:text-2xl font-medium leading-7 sm:leading-8 md:leading-9 tracking-normal max-w-[60ch] md:max-w-[68ch]">
                  {words.map((w, i) => (
                    <span
                      key={i}
                      ref={(el) => {
                        if (el) wordsSpansRef.current[i] = el;
                      }}
                      className="inline-block opacity-0 will-change-transform mr-2"
                    >
                      {w}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
