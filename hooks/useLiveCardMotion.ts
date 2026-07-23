"use client";

import { useRef, useState, type RefObject } from "react";
import { liveCardReveal } from "@/lib/animations";

/**
 * Wiring por card da "grade viva" (Formações, Método, Timeline, Alunos):
 * entra/sai da viewport repetidamente (once:false), direção conforme o
 * sentido do scroll, decrypt disparando só uma vez por card mesmo com as
 * outras camadas repetindo. Com `reducedMotion`, devolve motionProps vazio
 * (card fica estático/visível, sem animação nenhuma).
 */
export function useLiveCardMotion({
  index,
  directionRef,
  reducedMotion,
}: {
  readonly index: number;
  readonly directionRef: RefObject<"down" | "up">;
  readonly reducedMotion: boolean;
}) {
  const [entered, setEntered] = useState(false);
  const [direction, setDirection] = useState<"down" | "up">("down");
  const hasDecryptedRef = useRef(false);

  const handleViewportEnter = () => {
    if (!hasDecryptedRef.current) {
      hasDecryptedRef.current = true;
      setEntered(true);
    }
  };

  const handleViewportLeave = () => {
    // Grava a direção atual pra próxima entrada saber de que lado vir.
    setDirection(directionRef.current);
  };

  const motionProps = reducedMotion
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { once: false, amount: 0.15 },
        variants: liveCardReveal,
        custom: { direction, delay: index * 0.04 },
        onViewportEnter: handleViewportEnter,
        onViewportLeave: handleViewportLeave,
      };

  return { motionProps, entered };
}
