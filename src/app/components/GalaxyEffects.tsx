"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TINTS = ["#ffffff", "#ddd6fe", "#c4b5fd", "#fbcfe8"];
const ACCENTS = ["#c4b5fd", "#f9a8d4", "#86efac", "#fde68a"];

/** Starfield (kept mostly out of the content column), cursor trail and click sparkles. */
export default function GalaxyEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sky = document.createElement("div");
    sky.setAttribute("aria-hidden", "true");
    sky.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden";

    const width = window.innerWidth || 1200;
    const half = (Math.min(420, width * 0.42) / width) * 100;

    for (let i = 0; i < 110; i++) {
      const dot = document.createElement("span");
      const size = Math.random() < 0.85 ? 1 + Math.random() : 2 + Math.random();
      const twinkles = !reduced && Math.random() < 0.35;
      let x = Math.random() * 100;
      if (Math.abs(x - 50) < half && Math.random() < 0.8) {
        x = Math.random() < 0.5
          ? Math.random() * (50 - half)
          : 50 + half + Math.random() * (50 - half);
      }
      dot.style.cssText = [
        "position:absolute",
        `left:${x}%`,
        `top:${Math.random() * 100}%`,
        `width:${size}px`,
        `height:${size}px`,
        "border-radius:50%",
        `background:${TINTS[(Math.random() * TINTS.length) | 0]}`,
        `opacity:${0.2 + Math.random() * 0.4}`,
        twinkles ? `animation:twinkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite` : "",
      ].join(";");
      sky.appendChild(dot);
    }
    document.body.prepend(sky);

    if (reduced) return () => sky.remove();

    let shootTimer: number | undefined;
    if (pathname === "/") {
      shootTimer = window.setInterval(() => {
        const s = document.createElement("span");
        s.style.cssText = `position:absolute;top:${Math.random() * 30}%;left:${75 + Math.random() * 25}%;width:90px;height:1.5px;border-radius:2px;background:linear-gradient(90deg,#fff,transparent);animation:shoot 1.4s ease-out forwards`;
        sky.appendChild(s);
        window.setTimeout(() => s.remove(), 1500);
      }, 5200);
    }

    const spawn = (x: number, y: number, css: string, life: number) => {
      const s = document.createElement("span");
      s.textContent = "✦";
      s.setAttribute("aria-hidden", "true");
      s.style.cssText = `position:fixed;left:${x}px;top:${y}px;pointer-events:none;z-index:9999;${css}`;
      document.body.appendChild(s);
      window.setTimeout(() => s.remove(), life);
    };

    let last = 0;
    const onMove = (e: PointerEvent) => {
      const now = Date.now();
      if (now - last < 42) return;
      last = now;
      spawn(
        e.clientX,
        e.clientY,
        `font-size:${7 + Math.random() * 8}px;color:${ACCENTS[(Math.random() * 4) | 0]};transform:translate(-50%,-50%);animation:trailfade .85s ease-out forwards`,
        900,
      );
    };

    const onDown = (e: PointerEvent) => {
      for (let k = 0; k < 8; k++) {
        const a = (k / 8) * Math.PI * 2;
        const r = 26 + Math.random() * 14;
        spawn(
          e.clientX,
          e.clientY,
          `font-size:${8 + Math.random() * 6}px;color:${ACCENTS[k % 4]};--dx:${Math.cos(a) * r}px;--dy:${Math.sin(a) * r}px;animation:burst .7s ease-out forwards`,
          750,
        );
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.clearInterval(shootTimer);
      sky.remove();
    };
  }, [pathname]);

  return null;
}
