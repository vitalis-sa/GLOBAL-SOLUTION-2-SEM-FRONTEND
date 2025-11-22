import { z } from "zod";

export const testeSituacaoSchema = z.object({
  // O ID do funcionário será selecionado em um dropdown
  idFuncionario: z.coerce.number().min(1, "Selecione um funcionário"),

  // Scores (geralmente 0-10)
  jobSatisfaction: z.coerce.number().min(0).max(10, "Nota deve ser entre 0 e 10"),
  stressLevel: z.coerce.number().min(0).max(10, "Nota deve ser entre 0 e 10"),
  productivityScore: z.coerce.number().min(0).max(10, "Nota deve ser entre 0 e 10"),
  managerSupportScore: z.coerce.number().min(0).max(10, "Nota deve ser entre 0 e 10"),
  workLifeScore: z.coerce.number().min(0).max(10, "Nota deve ser entre 0 e 10"),
  careerGrowthScore: z.coerce.number().min(0).max(10, "Nota deve ser entre 0 e 10"),

  // Métricas Físicas/Temporais
  sleepHours: z.coerce.number().min(0, "Horas de sono inválidas"),
  physicalActivity: z.coerce.number().min(0, "Atividade física inválida"), // Minutos/semana
  mentalHealthDaysOff: z.coerce.number().min(0, "Dias de folga inválidos"),
  teamSize: z.coerce.number().min(1, "Tamanho da equipe inválido"),

  // Enums (Strings específicas)
  mentalSupport: z.enum(["Yes", "No"], { message: "Selecione Yes ou No" }),
  therapyAccess: z.enum(["Yes", "No"], { message: "Selecione Yes ou No" }),
  
  // Faixa Salarial (String)
  salaryRange: z.string().min(1, "Faixa salarial é obrigatória"),
});

export type TesteSituacaoFormData = z.infer<typeof testeSituacaoSchema>;

// O Payload que vai para a API é idêntico ao formulário neste caso
export type TesteSituacaoApiPayload = TesteSituacaoFormData;