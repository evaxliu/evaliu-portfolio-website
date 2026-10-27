"use client";

import { useEffect, useRef, useState } from "react";

type Ring = { r: number; stroke: string; moon: string; dur: number };

/**
 * The sun plus one dashed orbit per section planet.
 * Each orbit is centred on the sun and passes through an element marked data-orbit="<color>".
 */
export default function Orbits() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<{ w: number; h: number; cx: number; cy: number; rings: Ring[] }>();

  useEffect(() => {
    const root = svgRef.current?.parentElement;
    if (!root) return;

    const draw = () => {
      const sun = sunRef.current;
      if (!sun) return;
      const rr = root.getBoundingClientRect();
      const sr = sun.getBoundingClientRect();
      const cx = sr.left + sr.width / 2 - rr.left;
      const cy = sr.top + sr.height / 2 - rr.top;
      const rings: Ring[] = [{ r: 170, stroke: "#3a3160", moon: "#fde68a", dur: 30 }];
      root.querySelectorAll<HTMLElement>("[data-orbit]").forEach((el, i) => {
        const b = el.getBoundingClientRect();
        const x = b.left + b.width / 2 - rr.left;
        const y = b.top + b.height / 2 - rr.top;
        rings.push({
          r: Math.hypot(x - cx, y - cy),
          stroke: "#342b58",
          moon: el.dataset.orbit || "#c4b5fd",
          dur: 40 + i * 25,
        });
      });
      setGeo({ w: rr.width, h: rr.height, cx, cy, rings });
    };

    const ro = new ResizeObserver(draw);
    ro.observe(root);
    document.fonts?.ready.then(draw);
    draw();
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full"
        viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
      >
        {geo?.rings.map((ring, i) => (
          <g key={i}>
            <circle
              cx={geo.cx}
              cy={geo.cy}
              r={ring.r}
              fill="none"
              stroke={ring.stroke}
              strokeWidth={1}
              strokeDasharray="2 6"
            />
            <circle r={2.5} fill={ring.moon}>
              <animateMotion
                dur={`${ring.dur}s`}
                repeatCount="indefinite"
                path={`M ${geo.cx - ring.r} ${geo.cy} A ${ring.r} ${ring.r} 0 1 0 ${geo.cx + ring.r} ${geo.cy} A ${ring.r} ${ring.r} 0 1 0 ${geo.cx - ring.r} ${geo.cy}`}
              />
            </circle>
          </g>
        ))}
      </svg>

      <div
        ref={sunRef}
        aria-hidden="true"
        className="absolute left-1/2 top-[-165px] z-[1] -ml-[130px] size-[260px] rounded-full bg-[#f6dc8f] outline outline-[1.5px] outline-offset-[12px] outline-white/[.28]"
      />
    </>
  );
}
