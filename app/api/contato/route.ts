import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * API Route de contato (App Router).
 * Valida o payload com Zod e responde. NÃO há banco de dados: numa landing
 * institucional isso seria over-engineering. Em produção, o ponto marcado
 * abaixo é onde plugaríamos um provedor de e-mail (Resend/SendGrid) ou um CRM.
 * Mantê-la aqui demonstra o padrão full-stack do Next sem introduzir Mongo/Node à toa.
 */
const contatoSchema = z.object({
  nome: z.string().min(2, "Nome muito curto").max(80),
  email: z.string().email("E-mail inválido"),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ erro: "JSON inválido" }, { status: 400 });
  }

  const parsed = contatoSchema.safeParse(body);
  if (!parsed.success) {
    const primeiro = parsed.error.issues[0]?.message ?? "Dados inválidos";
    return NextResponse.json({ erro: primeiro }, { status: 422 });
  }

  // === Integração real entraria aqui (e-mail/CRM). ===
  // Ex.: await resend.emails.send({ ... })
  // Por ser um projeto de concurso, apenas logamos no servidor.
  console.info("[contato] novo lead:", parsed.data);

  return NextResponse.json({ ok: true }, { status: 200 });
}
