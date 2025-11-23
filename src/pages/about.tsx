import overwhelmedAnimate from "../assets/overwhelmed-animate.svg";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

export function About() {
  return (
    <>
      <Header />
      <main className="flex-grow transition-colors duration-300">
        
        {/* Seção 1: Funcionalidades (Fundo Claro -> Escuro 900) */}
        <section className="bg-bg-clarinho dark:bg-gray-900 px-6 py-20 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-center text-azul-gs dark:text-white mb-4 transition-colors">
              Tecnologia a favor da <span className="text-amarelo-escuro-gs">Saúde Mental</span>
            </h3>
            <p className="text-center text-texto-escuro/70 dark:text-gray-300 mb-16 max-w-2xl mx-auto transition-colors">
              Conectamos dados comportamentais e inteligência artificial para criar um ambiente de trabalho mais saudável e produtivo.
            </p>
            
            <div className="grid md:grid-cols-3 gap-10">
              {/* Card 1 - Para o Colaborador */}
              {/* Fundo branco -> Fundo cinza 800 no dark mode */}
              <div className="bg-branco-gs dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-amarelo-medio-gs">
                <div className="mb-4 text-4xl">🧠</div>
                <h4 className="text-xl font-bold text-azul-gs dark:text-white mb-3 transition-colors">
                  Burnout Score
                </h4>
                <p className="text-texto-escuro/80 dark:text-gray-300 leading-relaxed transition-colors">
                  Nosso modelo de Machine Learning analisa respostas e padrões para calcular seu nível de risco de burnout, garantindo privacidade e autoconhecimento.
                </p>
              </div>

              {/* Card 2 - Ações Práticas */}
              <div className="bg-branco-gs dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-amarelo-medio-gs">
                <div className="mb-4 text-4xl">🤖</div>
                <h4 className="text-xl font-bold text-azul-gs dark:text-white mb-3 transition-colors">
                  Recomendações via IA
                </h4>
                <p className="text-texto-escuro/80 dark:text-gray-300 leading-relaxed transition-colors">
                  Receba planos de ação personalizados gerados por IA Generativa. Dicas de pausas, mindfulness e organização focadas na sua rotina e necessidades atuais.
                </p>
              </div>

              {/* Card 3 - Para o RH */}
              <div className="bg-branco-gs dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-amarelo-medio-gs">
                <div className="mb-4 text-4xl">📊</div>
                <h4 className="text-xl font-bold text-azul-gs dark:text-white mb-3 transition-colors">
                  Dashboard para RH
                </h4>
                <p className="text-texto-escuro/80 dark:text-gray-300 leading-relaxed transition-colors">
                  Gestores têm acesso a uma visão panorâmica da saúde da equipe (com dados anonimizados), recebendo alertas de tendências e sugestões de intervenções organizacionais.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seção 2: Benefícios (Fundo Branco -> Escuro 800) */}
        <section className="bg-branco-gs dark:bg-gray-800 px-6 py-20 transition-colors duration-300">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            
            {/* Textos */}
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-azul-gs dark:text-white mb-12 transition-colors">
                Por que escolher a Equilibrium?
              </h3>

              <div className="mb-10">
                <h4 className="text-2xl font-semibold text-amarelo-escuro-gs mb-4 flex items-center gap-2">
                  <span className="text-azul-gs dark:text-blue-300">🛡️</span> Prevenção Ativa
                </h4>
                <p className="text-texto-escuro/80 dark:text-gray-300 text-lg leading-relaxed transition-colors">
                  Não espere o afastamento acontecer. Identifique sinais de exaustão precocemente e atue na raiz do problema com dados precisos.
                </p>
              </div>

              <div className="mb-10">
                <h4 className="text-2xl font-semibold text-amarelo-escuro-gs mb-4 flex items-center gap-2">
                  <span className="text-azul-gs dark:text-blue-300">🤝</span> Cultura de Cuidado
                </h4>
                <p className="text-texto-escuro/80 dark:text-gray-300 text-lg leading-relaxed transition-colors">
                  Mostre que sua empresa valoriza as pessoas. Ferramentas de suporte contínuo aumentam a retenção de talentos e o engajamento.
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-semibold text-amarelo-escuro-gs mb-4 flex items-center gap-2">
                  <span className="text-azul-gs dark:text-blue-300">💡</span> Gestão Estratégica
                </h4>
                <p className="text-texto-escuro/80 dark:text-gray-300 text-lg leading-relaxed transition-colors">
                  Transforme o bem-estar em KPI. Tome decisões baseadas em métricas reais de saúde mental, não apenas em intuição.
                </p>
              </div>
            </div>

            {/* Imagem */}
            <div className="flex justify-center relative">
              <div className="absolute w-96 h-96 bg-amarelo-claro-gs dark:bg-yellow-900/20 rounded-full -z-10 blur-3xl opacity-60 transition-colors"></div>
              
              <img
                src={overwhelmedAnimate}
                alt="Equilíbrio entre vida e trabalho"
                className="w-full max-w-lg h-auto drop-shadow-2xl animate-fade-in-up"
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}