import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { TesteSituacaoForm } from "../components/TesteSituacaoForm";

export function CadastroTesteSituacaoPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center py-16 px-4 bg-bg-clarinho min-h-screen">
        
        <div className="w-full max-w-4xl mx-auto mb-10 text-center">
           <h2 className="text-3xl md:text-4xl font-bold text-azul-gs mb-4">
             Análise de <span className="text-amarelo-escuro-gs">Situação</span>
           </h2>
           <p className="text-texto-escuro/70 max-w-2xl mx-auto text-lg">
             Preencha os dados comportamentais e de rotina. Nossa IA irá calcular o risco de burnout e gerar recomendações personalizadas.
           </p>
        </div>

        <div className="w-full max-w-4xl">
          <TesteSituacaoForm />
        </div>

      </main>
      <Footer />
    </>
  );
}