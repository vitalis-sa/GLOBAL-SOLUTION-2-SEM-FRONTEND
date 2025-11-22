// Ajustei o import para o arquivo que existe na sua pasta assets
import mentalHealthAnimate from "../assets/mental-health-animate.svg"; 
import { Link } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

export function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        
        {/* --- SEÇÃO 1: HERO (Principal) --- */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-around min-h-[85vh] bg-bg-clarinho px-6 md:px-20 py-12 relative overflow-hidden">
          
          {/* Elemento decorativo de fundo */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-azul-gs via-amarelo-medio-gs to-azul-gs opacity-50"></div>

          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left z-10">
            <h2 className="font-extrabold text-4xl md:text-6xl text-azul-gs mb-6 leading-tight drop-shadow-sm">
              Bem-vindo à <span className="text-amarelo-escuro-gs">Equilibrium</span>
            </h2>
            <p className="text-lg md:text-xl text-texto-escuro/80 mb-10 max-w-xl leading-relaxed">
              Soluções inteligentes que unem <b>inteligência artificial</b> e <b>humanização</b> para transformar a saúde mental dos seus colaboradores em performance sustentável.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="funcionarios/CadastroTesteSituacaoPage"
                className="bg-amarelo-medio-gs text-azul-gs font-bold text-lg py-4 px-10 rounded-full shadow-lg hover:bg-amarelo-escuro-gs hover:text-branco-gs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>🚀</span> Faça seu Check-in
              </Link>
              <Link
                to="/about"
                className="border-2 border-azul-gs text-azul-gs font-bold text-lg py-4 px-10 rounded-full hover:bg-azul-gs hover:text-branco-gs transition-all duration-300 flex items-center justify-center"
              >
                Saiba mais
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center items-center mb-12 md:mb-0 z-10">
            <img
              src={mentalHealthAnimate}
              alt="Ambiente corporativo saudável"
              className="w-full max-w-md lg:max-w-xl h-auto drop-shadow-2xl animate-fade-in-up"
            />
          </div>
        </section>

        {/* --- SEÇÃO 2: PILARES (Novo Conteúdo) --- */}
        <section className="py-24 px-6 bg-branco-gs relative">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-azul-gs mb-4">
                Uma nova abordagem para o <span className="text-amarelo-escuro-gs">bem-estar</span>
              </h3>
              <p className="text-texto-escuro/70 text-lg max-w-2xl mx-auto">
                Nossa metodologia se baseia em três pilares fundamentais para garantir que sua empresa cuide de quem importa, sem perder a eficiência.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="group bg-bg-clarinho p-8 rounded-3xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-amarelo-medio-gs">
                <div className="w-14 h-14 bg-azul-gs/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <h4 className="text-xl font-bold text-azul-gs mb-3">Prevenção Ativa</h4>
                <p className="text-texto-escuro/80 leading-relaxed">
                  Não esperamos o problema acontecer. Nosso algoritmo identifica tendências de estresse e sugere pausas antes que o burnout se instale.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group bg-bg-clarinho p-8 rounded-3xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-amarelo-medio-gs">
                <div className="w-14 h-14 bg-azul-gs/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  🤖
                </div>
                <h4 className="text-xl font-bold text-azul-gs mb-3">Inteligência Artificial</h4>
                <p className="text-texto-escuro/80 leading-relaxed">
                  Usamos IA Generativa para criar planos de ação únicos. Se você precisa de foco ou relaxamento, a Equilibrium sabe exatamente o que sugerir.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group bg-bg-clarinho p-8 rounded-3xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-amarelo-medio-gs">
                <div className="w-14 h-14 bg-azul-gs/10 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                  🔒
                </div>
                <h4 className="text-xl font-bold text-azul-gs mb-3">Privacidade Total</h4>
                <p className="text-texto-escuro/80 leading-relaxed">
                  Seus dados são seus. O RH recebe apenas métricas globais para melhorar a empresa, garantindo que você possa ser honesto sem medo.
                </p>
              </div>

            </div>

            {/* Faixa de CTA Final */}
            <div className="mt-20 bg-azul-gs rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
              {/* Opcional: textura de fundo removida para simplificar, mas a cor sólida já dá o destaque */}
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-branco-gs mb-6">
                  Pronto para equilibrar sua rotina?
                </h3>
                <p className="text-amarelo-claro-gs text-lg mb-10 max-w-2xl mx-auto">
                  Junte-se a milhares de colaboradores que já estão transformando sua relação com o trabalho. É rápido, simples e gratuito para você.
                </p>
                <Link
                  to="/funcionarios/CadastroTesteSituacaoPage"
                  className="inline-block bg-amarelo-medio-gs text-azul-gs font-bold text-xl py-4 px-12 rounded-full hover:bg-branco-gs hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Começar Agora
                </Link>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}