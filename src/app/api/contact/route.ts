import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(100),
  email: z.string().email("Email inválido"),
  subject: z.string().min(3, "Assunto muito curto").max(200),
  message: z.string().min(10, "Mensagem muito curta").max(2000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = contactSchema.parse(body);

    // In production, send email via Resend, SendGrid, or Nodemailer
    // For now, log and return success
    console.log("[Contact Form]", {
      ...validated,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Mensagem enviada com sucesso! Entraremos em contacto brevemente." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Dados inválidos", errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Erro ao enviar mensagem. Tenta novamente." },
      { status: 500 }
    );
  }
}