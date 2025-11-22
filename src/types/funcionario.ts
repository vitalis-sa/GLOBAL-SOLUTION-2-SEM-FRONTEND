// Interfaces para os objetos aninhados
export interface Departamento {
  id: number;
  nome: string;
}

export interface Email {
  id: number;
  endereco: string;
  status: string;
}

export interface Telefone {
  id: number;
  ddi: number;
  ddd: number;
  numero: number;
  tipo: string;
  status: string;
}

// Interface para o Teste de Situação
// Baseada nos campos do seu TesteSituacaoDao e TesteSituacaoResource
export interface TesteSituacao {
  id: number;
  // Scores e Métricas
  jobSatisfaction: number;
  stressLevel: number;
  productivityScore: number;
  managerSupportScore: number;
  workLifeScore: number;
  careerGrowthScore: number;
  
  // Métricas Físicas/Contexto
  sleepHours: number;
  physicalActivity: number;
  mentalHealthDaysOff: number;
  teamSize: number;
  
  // Qualitativos
  mentalSupport: string;
  therapyAccess: string;
  salaryRange: string;

  // Resultado da IA
  burnoutScore: number | null;
}

// O objeto Funcionário completo para listagem e detalhes
export interface Funcionario {
  id: number;
  nome: string;
  cpf: string;
  idade: number;
  genero: string;
  cargo: string;
  anosEmpresa: number;
  horasTrabalho: number;
  trabalhoRemoto: string;
  idDepartamento: number;
  nomeDepartamento: string;
  email?: Email;
  telefone?: Telefone;
}