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

// O objeto Funcionário completo para listagem
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
  departamento: Departamento; // Objeto completo
  email?: Email;
  telefone?: Telefone;
}