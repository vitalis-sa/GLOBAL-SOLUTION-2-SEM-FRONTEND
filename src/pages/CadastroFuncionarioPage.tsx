import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { FuncionarioForm } from "../components/FuncionarioForm";

export function CadastroFuncionarioPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center py-16 px-4 bg-bg-clarinho dark:bg-gray-900 min-h-screen transition-colors duration-300">
        
        {/* Cabeçalho da Seção */}
        <div className="w-full max-w-4xl mx-auto mb-10 text-center">
           <h2 className="text-3xl md:text-4xl font-bold text-azul-gs dark:text-white mb-4 transition-colors">
             Novo <span className="text-amarelo-escuro-gs">Colaborador</span>
           </h2>
           <p className="text-texto-escuro/70 dark:text-gray-300 max-w-2xl mx-auto text-lg transition-colors">
             Preencha os dados abaixo para registrar um novo funcionário no sistema Equilibrium e liberar o acesso aos testes de saúde mental.
           </p>
        </div>

        {/* Container do Formulário */}
        <div className="w-full max-w-4xl">
          <FuncionarioForm />
        </div>

      </main>
      <Footer />
    </>
  );
}