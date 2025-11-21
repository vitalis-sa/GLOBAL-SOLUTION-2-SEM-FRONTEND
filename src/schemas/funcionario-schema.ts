import { z } from "zod";

// 1. SCHEMA DO FORMULÁRIO
export const funcionarioSchema = z.object({
  // SIMPLIFICADO: Apenas coerce.number() puro.
  idDepartamento: z.coerce.number().min(1, "ID do Departamento é obrigatório"),
  
  nome: z.string().min(3, "Nome é obrigatório").max(80),
  
  cpf: z.string()
    .length(11, "CPF deve ter 11 dígitos")
    .regex(/^[0-9]+$/, "CPF deve conter apenas números"),
  
  idade: z.coerce.number().min(14, "Idade mínima é 14").max(100, "Idade máxima é 100"),
  
  genero: z.enum(["Female", "Male", "Non-binary", "Prefer not to say"], {
    message: "Selecione um gênero válido",
  }),

  cargo: z.string().min(2, "Cargo é obrigatório"),

  anosEmpresa: z.coerce.number().min(0, "Anos de empresa não pode ser negativo"),
  
  horasTrabalho: z.coerce.number().min(1, "Mínimo 1 hora").max(168, "Máximo 168 horas"),

  trabalhoRemoto: z.enum(["Hybrid", "No", "Yes"], {
    message: "Selecione o modelo de trabalho",
  }),

  emailEndereco: z.string().email("E-mail inválido"),
  
  telefoneNumero: z.string()
    .min(10, "Telefone inválido")
    .max(11, "Telefone inválido")
    .regex(/^[0-9]+$/, "Apenas números"),
    
  telefoneTipo: z.enum(["Celular", "Residencial", "Comercial"], {
    message: "Selecione o tipo",
  }),
});

export type FuncionarioFormData = z.infer<typeof funcionarioSchema>;

// 2. TIPOS DO PAYLOAD (JSON para a API)
export interface EmailApiPayload {
  endereco: string;
  status: string;
}

export interface TelefoneApiPayload {
  ddi: number;
  ddd: number;
  numero: number;
  tipo: string;
  status: boolean;
}

export interface FuncionarioApiPayload {
  idDepartamento: number;
  nome: string;
  cpf: string;
  idade: number;
  genero: string;
  cargo: string;
  anosEmpresa: number;
  horasTrabalho: number;
  trabalhoRemoto: string;
  email: EmailApiPayload;
  telefone: TelefoneApiPayload;
}