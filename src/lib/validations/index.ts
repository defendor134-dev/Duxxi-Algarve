// ============================================================
// Sporting CP - Zod Validation Schemas
// ============================================================

import { z } from "zod";

// ---- AUTH ----
export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Password deve ter pelo menos 6 caracteres"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z
    .string()
    .min(8, "Password deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "Password deve conter pelo menos uma maiúscula")
    .regex(/[0-9]/, "Password deve conter pelo menos um número"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords não coincidem",
  path: ["confirmPassword"],
});

export const newsletterSchema = z.object({
  email: z.string().email("Email inválido"),
});

// ---- MATCHES ----
export const matchFilterSchema = z.object({
  status: z.enum(["all", "scheduled", "live", "finished", "postponed"]).optional().default("all"),
  modality: z.string().optional().default("all"),
  limit: z.coerce.number().min(1).max(50).optional().default(10),
});

export const matchCreateSchema = z.object({
  competition: z.string().min(1, "Competição é obrigatória"),
  modality: z.string().min(1, "Modalidade é obrigatória"),
  homeTeam: z.string().min(1, "Equipa casa é obrigatória"),
  awayTeam: z.string().min(1, "Equipa visita é obrigatória"),
  date: z.string().datetime("Data inválida"),
  time: z.string().optional(),
  stadium: z.string().optional(),
  status: z.enum(["scheduled", "live", "finished", "postponed"]).default("scheduled"),
});

// ---- NEWS ----
export const newsFilterSchema = z.object({
  category: z.string().optional().default("all"),
  limit: z.coerce.number().min(1).max(50).optional().default(10),
});

export const articleCreateSchema = z.object({
  title: z.string().min(5, "Título deve ter pelo menos 5 caracteres"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  content: z.string().optional(),
  url: z.string().url("URL inválida").optional(),
  imageUrl: z.string().url("URL da imagem inválida").optional(),
  source: z.string().min(1, "Fonte é obrigatória"),
  category: z.string().min(1, "Categoria é obrigatória"),
});

// ---- PLAYERS ----
export const playerFilterSchema = z.object({
  position: z.string().optional().default("all"),
});

// ---- NEWSLETTER ----
export const newsletterSubscribeSchema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().optional(),
  preferences: z.array(z.string()).optional(),
});

// ---- CONTACT ----
export const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

// ---- SEARCH ----
export const searchSchema = z.object({
  q: z.string().min(1, "Termo de pesquisa é obrigatório"),
  type: z.enum(["all", "matches", "news", "players"]).optional().default("all"),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type MatchCreateInput = z.infer<typeof matchCreateSchema>;
export type ArticleCreateInput = z.infer<typeof articleCreateSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type SearchInput = z.infer<typeof searchSchema>;