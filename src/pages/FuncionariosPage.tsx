import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { FuncionarioList } from "../components/FuncionarioList";
import { useFuncionarios } from "../context/FuncionarioContext";

const ITENS_POR_PAGINA = 9;

export function FuncionariosPage() {
  const { funcionarios, fetchFuncionarios } = useFuncionarios();
  const [visibleCount, setVisibleCount] = useState(ITENS_POR_PAGINA);

  useEffect(() => {
    fetchFuncionarios();
  }, [fetchFuncionarios]);

  const handleCarregarMais = () => {
    setVisibleCount((prev) => prev + ITENS_POR_PAGINA);
  };

  const listaVisivel = funcionarios.slice(0, visibleCount);

  return (
    <>
      <Header />
      
      <main className="flex-grow bg-bg-clarinho min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Cabeçalho da Página */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-azul-gs">
                Colaboradores
              </h1>
              <p className="text-texto-escuro/60 mt-2 text-lg">
                Gerencie sua equipe e acompanhe o bem-estar corporativo.
              </p>
            </div>
            
            <Link
              to="/funcionarios/cadastro"
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-amarelo-medio-gs text-azul-gs font-bold hover:bg-amarelo-escuro-gs hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-xl leading-none">+</span>
              Novo Cadastro
            </Link>
          </div>
          
          {/* Lista */}
          <FuncionarioList lista={listaVisivel} />

          {/* Botão Carregar Mais */}
          {funcionarios.length > visibleCount && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleCarregarMais}
                className="px-8 py-3 rounded-full border-2 border-azul-gs text-azul-gs font-bold hover:bg-azul-gs hover:text-white transition-all"
              >
                Carregar Mais
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}