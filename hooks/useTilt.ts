"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Tilt 3D reativo ao mouse: o card inclina em rotationX/Y seguindo o cursor,
 * dando profundidade. Usa perspectiva + transform (GPU) → 60fps.
 * Desligado para prefers-reduced-motion.
 */
export function useTilt<T extends HTMLElement>(
  maxDeg = 8,
): React.RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotationY: px * maxDeg * 2,
        rotationX: -py * maxDeg * 2,
        transformPerspective: 800,
        transformOrigin: "center",
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(el, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [maxDeg]);

  return ref;
}
