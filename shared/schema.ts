import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const animals = pgTable("animals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nome: text("nome").notNull(),
  especie: text("especie").notNull(),
  idade: integer("idade").notNull(),
  temperatura: real("temperatura").notNull(),
  frequenciaCardiaca: integer("frequencia_cardiaca").notNull(),
  atividade: text("atividade").notNull(),
});

export const insertAnimalSchema = createInsertSchema(animals).omit({
  id: true,
}).extend({
  nome: z.string().min(1, "Nome é obrigatório"),
  especie: z.string().min(1, "Espécie é obrigatória"),
  idade: z.number().min(0, "Idade deve ser positiva"),
  temperatura: z.number().min(30).max(45, "Temperatura deve estar entre 30°C e 45°C"),
  frequenciaCardiaca: z.number().min(20).max(300, "Frequência cardíaca deve estar entre 20 e 300 bpm"),
  atividade: z.string().min(1, "Atividade é obrigatória"),
});

export type InsertAnimal = z.infer<typeof insertAnimalSchema>;
export type Animal = typeof animals.$inferSelect;
