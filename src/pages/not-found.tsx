import { Link } from "react-router-dom";
import NotFoundImage from "../assets/404-error-with-a-cute-animal-animate.svg";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-clarinho font-sans">
      <Header />

      {/* Main com flex-grow para ocupar o espaço e centralizar o card */}
      <main className="flex-grow flex items-center justify-center p-6">
        
        {/* Card centralizado com a identidade do projeto */}
        <div className="max-w-lg w-full bg-branco-gs rounded-3xl shadow-2xl overflow-hidden p-10 md:p-14 text-center border-t-4 border-amarelo-medio-gs">
          
          <h1 className="text-6xl font-extrabold text-azul-gs mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-500 mb-8 uppercase tracking-wide">
            Página não encontrada
          </h2>

          <div className="relative flex justify-center mb-8">
            <div className="absolute inset-0 bg-amarelo-medio-gs opacity-10 blur-2xl rounded-full transform scale-75"></div>
            <img 
              className="relative w-64 h-auto object-contain hover:scale-105 transition-transform duration-500" 
              src={NotFoundImage} 
              alt="Ilustração de página não encontrada" 
            />
          </div>

          <p className="text-texto-escuro text-lg mb-8 leading-relaxed">
            Ops! Parece que você seguiu um link quebrado ou a página foi movida.
          </p>

          <Link
            to="/"
            className="inline-block w-full sm:w-auto px-8 py-4 rounded-full bg-azul-gs text-white font-bold text-lg shadow-lg hover:bg-blue-900 hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0"
          >
            Voltar para o Início
          </Link>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}