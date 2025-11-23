import { Link } from "react-router-dom";
import { useFuncionarios } from "../context/FuncionarioContext";
import { type Funcionario } from "../types/funcionario";

interface FuncionarioCardProps {
  funcionario: Funcionario;
}

export function FuncionarioCard({ funcionario }: FuncionarioCardProps) {
  const { removeFuncionario } = useFuncionarios();

  const handleDelete = () => {
    if (confirm(`Remover ${funcionario.nome}?`)) {
      removeFuncionario(funcionario.id);
    }
  };

  return (
    <div className="w-full rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 px-6 py-5 flex flex-col gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amarelo-medio-gs group-hover:w-2 transition-all"></div>
      
      <div>
        <h2 className="text-xl font-bold text-azul-gs dark:text-white line-clamp-1" title={funcionario.nome}>{funcionario.nome}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">{funcionario.cargo}</p>
        <p className="text-xs text-azul-gs dark:text-blue-300 text-right mt-1 font-semibold">{funcionario.nomeDepartamento || "N/A"}</p>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-700 pt-3 space-y-2 text-sm text-texto-escuro/80 dark:text-gray-300">
        <p className="truncate">📧 {funcionario.email?.endereco || "Sem e-mail"}</p>
        <p>🏢 {funcionario.trabalhoRemoto === 'Yes' ? 'Remoto' : funcionario.trabalhoRemoto === 'Hybrid' ? 'Híbrido' : 'Presencial'}</p>
      </div>

      <div className="flex gap-3 mt-auto pt-2">
        <Link to={`/funcionarios/${funcionario.id}`} className="flex-1 text-center text-sm font-bold text-azul-gs dark:text-blue-300 border border-azul-gs dark:border-blue-300 rounded-lg px-3 py-2 hover:bg-azul-gs hover:text-white dark:hover:bg-blue-300 dark:hover:text-gray-900 transition-colors">
          Detalhes
        </Link>
        <button onClick={handleDelete} className="flex-1 text-center text-sm font-bold text-red-500 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          Remover
        </button>
      </div>
    </div>
  );
}