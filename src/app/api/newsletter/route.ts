import { NextResponse } from "next/server";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    // In production, add to Mailchimp, ConvertKit, or similar
    console.log("[Newsletter Subscription]", { email, timestamp: new Date().toISOString() });

    return NextResponse.json(
      { success: true, message: "Subscrição confirmada! Obrigado." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Email inválido" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Erro ao subscrever. Tenta novamente." },
      { status: 500 }
    );
  }
}