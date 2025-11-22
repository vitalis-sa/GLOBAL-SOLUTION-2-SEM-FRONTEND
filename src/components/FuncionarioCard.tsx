import { Link } from "react-router-dom";
import { useFuncionarios } from "../context/FuncionarioContext";
import type { Funcionario } from "../types/funcionario";

interface FuncionarioCardProps {
  funcionario: Funcionario;
}

export function FuncionarioCard({ funcionario }: FuncionarioCardProps) {
  const { removeFuncionario } = useFuncionarios();

  const handleDelete = () => {
    if (confirm(`Tem certeza que deseja remover ${funcionario.nome}?`)) {
      removeFuncionario(funcionario.id);
    }
  };

  return (
    <div className="w-full h-full rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 px-6 py-5 flex flex-col gap-4 bg-white border border-gray-100 group relative overflow-hidden">
      
      {/* Detalhe visual lateral */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amarelo-medio-gs group-hover:w-2 transition-all"></div>

      {/* Topo do Card */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 pl-2">
          <h2 className="text-xl font-bold text-azul-gs line-clamp-1" title={funcionario.nome}>
            {funcionario.nome}
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">{funcionario.cargo}</p>
                <span className="font-semibold text-azul-gs text-right">
                  {funcionario.nomeDepartamento || "N/A"}
                </span>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="border-t border-gray-100 pt-3 space-y-2 pl-2 text-sm text-texto-escuro/80">
        <div className="flex items-center gap-2">
          <span>📧</span> 
          <span className="truncate" title={funcionario.email?.endereco}>
            {funcionario.email?.endereco || "Sem e-mail"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>🏢</span> 
          <span>{funcionario.trabalhoRemoto === 'Yes' ? 'Remoto' : funcionario.trabalhoRemoto === 'Hybrid' ? 'Híbrido' : 'Presencial'}</span>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-3 mt-auto pl-2 pt-2">
        <Link
          to={`/funcionarios/${funcionario.id}`} // Rota de detalhes (criaremos depois)
          className="flex-1 text-center text-sm font-bold text-azul-gs border border-azul-gs rounded-lg px-3 py-2 hover:bg-azul-gs hover:text-white transition-colors"
        >
          Detalhes
        </Link>

        <button
          onClick={handleDelete}
          className="flex-1 text-center text-sm font-bold text-red-500 border border-red-200 rounded-lg px-3 py-2 hover:bg-red-50 transition-colors"
        >
          Remover
        </button>
      </div>
    </div>
  );
}