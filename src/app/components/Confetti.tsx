"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

export default function Confetti() {
  const hasFired = useRef(false);

  useEffect(() => {
    if (
      hasFired.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    hasFired.current = true;

    const colors = ["#c4b5fd", "#a78bfa", "#f5d0fe", "#ffffff"];

    confetti({
      particleCount: 80,
      angle: 55,
      spread: 55,
      startVelocity: 85,
      origin: { x: 0, y: 1 },
      colors,
    });

    confetti({
      particleCount: 80,
      angle: 125,
      spread: 55,
      startVelocity: 85,
      origin: { x: 1, y: 1 },
      colors,
    });
  }, []);

  return null;
}