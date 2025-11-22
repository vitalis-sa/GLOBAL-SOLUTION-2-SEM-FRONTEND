import type { Funcionario } from "../types/funcionario";
import { FuncionarioCard } from "./FuncionarioCard";

interface FuncionarioListProps {
  lista: Funcionario[];
}

export function FuncionarioList({ lista = [] }: FuncionarioListProps) {
  if (lista.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
        <div className="text-4xl mb-4">📂</div>
        <p className="text-lg font-bold text-azul-gs">Nenhum colaborador encontrado.</p>
        <p className="text-gray-500 mt-2">Cadastre um novo funcionário para começar a gestão.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
      {lista.map((func) => (
        <FuncionarioCard key={func.id} funcionario={func} />
      ))}
    </div>
  );
}