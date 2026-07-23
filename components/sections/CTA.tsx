"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ctaFinal } from "@/lib/data";
import { HexBackground } from "@/components/ui/HexBackground";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fadeUp, staggerContainer, revealOnScroll } from "@/lib/animations";

type Status = "idle" | "loading" | "success" | "error";

/**
 * CTA final + formulário de contato.
 * O envio chama a API Route interna (app/api/contato), que valida com Zod.
 * Não usamos <form> nativo com submit tradicional — controlamos via estado e
 * fetch, dando feedback inline (loading/success/error) sem reload.
 */
export function CTA() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [erro, setErro] = useState<string | null>(null);

  const enviar = async () => {
    setStatus("loading");
    setErro(null);
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { erro?: string };
        throw new Error(data.erro ?? "Falha no envio");
      }
      setStatus("success");
      setNome("");
      setEmail("");
    } catch (e) {
      setStatus("error");
      setErro(e instanceof Error ? e.message : "Erro inesperado");
    }
  };

  return (
    <section id="cta" className="relative overflow-hidden py-28">
      <HexBackground glow />

      <motion.div
        {...revealOnScroll}
        variants={staggerContainer}
        className="container-dev relative z-10 flex flex-col items-center text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="font-display text-4xl font-bold leading-tight md:text-6xl"
        >
          {ctaFinal.titulo}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-2xl text-lg text-text-muted"
        >
          {ctaFinal.subtitulo}
        </motion.p>

        {status === "success" ? (
          <motion.p
            variants={fadeUp}
            className="mt-10 rounded-2xl border border-green-primary/40 bg-green-primary/10 px-8 py-6 text-green-neon"
          >
            🎉 Recebemos seu contato! Em breve nosso time fala com você.
          </motion.p>
        ) : (
          <motion.div
            variants={fadeUp}
            className="mt-10 flex w-full max-w-md flex-col gap-3"
          >
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              aria-label="Seu nome"
              className="rounded-full border border-[var(--border-subtle)] bg-white/5 px-6 py-3.5 text-sm outline-none transition-colors focus:border-green-neon"
            />
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Seu e-mail"
              className="rounded-full border border-[var(--border-subtle)] bg-white/5 px-6 py-3.5 text-sm outline-none transition-colors focus:border-green-neon"
            />
            {erro && <p className="text-sm text-red-400">{erro}</p>}
            <div className="mt-2 flex justify-center">
              <MagneticButton
                variant="primary"
                onClick={enviar}
                className={status === "loading" ? "pointer-events-none opacity-70" : ""}
              >
                {status === "loading" ? "Enviando..." : ctaFinal.botao}
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
