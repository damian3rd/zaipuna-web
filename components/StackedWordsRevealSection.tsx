"use client";

import { useEffect, useRef } from "react";

export default function StackedWordsRevealSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // gate: start only after PinnedHero finishes (heroProgress >= 0.999)
  const heroDoneRef = useRef(false);

  const clamp = (v: number, a = 0, b = 1) => Math.min(Math.max(v, a), b);
  const smooth = (t: number) => t * t * (3 - 2 * t); // smoothstep

  useEffect(() => {
    const onHero = (e: Event) => {
      const p = (e as CustomEvent<{ p: number }>).detail?.p ?? 0;
      if (p >= 0.999) heroDoneRef.current = true;
    };
    window.addEventListener("heroProgress", onHero as EventListener);
    return () =>
      window.removeEventListener("heroProgress", onHero as EventListener);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wrapper.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = wrapper.offsetHeight - vh; // scrollable inside this section
        const scrolled = clamp(-rect.top, 0, total);
        // if hero not done, keep progress at 0 so nothing animates yet
        const rawP = total > 0 ? scrolled / total : 0;
        const p = heroDoneRef.current ? rawP : 0;

        const e = smooth(p);

        // CENTER word: scale/opacity from huge → fit
        if (midRef.current) {
          const startScale = 2.8; // starts too big (off screen)
          const endScale = 1.0;
          const scale = startScale + (endScale - startScale) * e;
          const opacity = 0.0 + (1.0 - 0.0) * e;
          midRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
          midRef.current.style.opacity = String(opacity);
        }

        // TOP word: slide down slightly, reduce blur, raise opacity a bit
        if (topRef.current) {
          const y = -vh * (0.62 - 0.18 * e); // from high → settle
          const blur = 10 * (1 - e) + 2; // 12px → 2px
          const op = 0.08 + 0.17 * e; // subtle
          topRef.current.style.transform = `translate(-50%, ${y}px) skewX(-10deg)`;
          topRef.current.style.filter = `blur(${blur.toFixed(2)}px)`;
          topRef.current.style.opacity = String(op);
        }

        // BOTTOM word: slide up slightly, reduce blur, raise opacity a bit
        if (botRef.current) {
          const y = vh * (0.62 - 0.18 * e); // from low → settle
          const blur = 10 * (1 - e) + 2;
          const op = 0.08 + 0.17 * e;
          botRef.current.style.transform = `translate(-50%, ${y}px) skewX(-10deg)`;
          botRef.current.style.filter = `blur(${blur.toFixed(2)}px)`;
          botRef.current.style.opacity = String(op);
        }

        // Glow behind the center word
        if (glowRef.current) {
          glowRef.current.style.opacity = String(0.15 + 0.35 * e); // 0.15 → 0.5
          const s = 0.9 + 0.2 * e;
          glowRef.current.style.transform = `translate(-50%, -50%) scale(${s})`;
        }
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
    // Extra height lets you scroll through the zoom/settle motion
    <div ref={wrapperRef} className="relative h-[160vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-white" />

        {/* TOP word */}
        <div
          ref={topRef}
          className="
            absolute left-1/2 top-1/2 -translate-x-1/2
            text-slate-400 font-extrabold uppercase tracking-[-0.02em]
            pointer-events-none select-none
          "
          style={{
            opacity: 0,
            transform: "translate(-50%, -60vh) skewX(-10deg)",
          }}
        >
          <span className="block text-[clamp(3rem,12vw,12rem)] leading-[0.85]">
            OUR
          </span>
        </div>

        {/* GLOW behind middle */}
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: "60vmin",
            height: "60vmin",
            background:
              "radial-gradient(circle, rgba(250, 255, 170, 0.9) 0%, rgba(255,255,255,0.0) 65%)",
            opacity: 0.15,
            transform: "translate(-50%, -50%) scale(0.9)",
            filter: "blur(8px)",
          }}
        />

        {/* CENTER word */}
        <div
          ref={midRef}
          className="
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            text-slate-900 font-extrabold uppercase tracking-[-0.02em]
            text-center pointer-events-none select-none
          "
          style={{ opacity: 0, transform: "translate(-50%, -50%) scale(2.8)" }}
        >
          <span className="block text-[clamp(3rem,12vw,12rem)] leading-[0.85]">
            PRODUCT
          </span>
        </div>

        {/* BOTTOM word */}
        <div
          ref={botRef}
          className="
            absolute left-1/2 top-1/2 -translate-x-1/2
            text-slate-400 font-extrabold uppercase tracking-[-0.02em]
            pointer-events-none select-none
          "
          style={{
            opacity: 0,
            transform: "translate(-50%, 60vh) skewX(-10deg)",
          }}
        >
          <span className="block text-[clamp(3rem,12vw,12rem)] leading-[0.85]">
            OVERVIEW
          </span>
        </div>
      </div>
    </div>
  );
}
