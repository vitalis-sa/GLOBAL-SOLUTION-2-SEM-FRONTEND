import { useState, useEffect } from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { FaPlus } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import carringBox from "../assets/carringBox.svg"; // Usando a imagem de contato

const faqs = [
  {
    question: "O que é a plataforma Equilibrium?",
    answer: (
      <>
        A Equilibrium é uma solução de inteligência emocional corporativa. Utilizamos Inteligência Artificial para monitorar níveis de estresse, prevenir o burnout e oferecer planos de bem-estar personalizados. Comece descobrindo seu nível atual:
        <Link className="text-amarelo-escuro-gs font-bold hover:underline ml-1" to="/teste"> Calcular Burnout Score. </Link>
      </>
    ),
  },
  { 
    question: "Como o 'Burnout Score' é calculado?", 
    answer: <>Nosso algoritmo de Machine Learning analisa suas respostas de check-in e padrões comportamentais para gerar um índice de risco. Isso ajuda a identificar sinais sutis de exaustão antes que eles se tornem um problema de saúde.</> 
  },
  { 
    question: "Meus dados de saúde mental são confidenciais?", 
    answer: <>Sim, absolutamente. A privacidade é nosso pilar principal. Seus resultados individuais são visíveis apenas para você. A empresa recebe apenas relatórios estatísticos anonimizados para melhorar o ambiente de trabalho.</> 
  },
  { 
    question: "O meu gestor ou RH vai saber se eu estiver mal?", 
    answer: <>Não individualmente. O RH recebe alertas de tendências (ex: "O setor de Design está com altos níveis de estresse"), mas nunca saberá que foi você especificamente. Isso protege sua privacidade enquanto permite que a empresa aja.</> 
  },
  { 
    question: "A IA substitui um psicólogo?", 
    answer: <>Não. A Equilibrium é uma ferramenta de prevenção e autogestão do estresse diário. Nossas recomendações de IA são focadas em bem-estar e produtividade saudável. Para questões clínicas, sempre incentivamos a busca por profissionais de saúde.</> 
  },
  { 
    question: "Como funcionam os planos de ação personalizados?", 
    answer: <>Baseado no seu score atual, nossa IA Generativa sugere micro-ações práticas, como técnicas de respiração, pausas estratégicas ou dicas de organização, adaptadas para reduzir sua carga mental naquele momento.</> 
  },
  { 
    question: "Preciso pagar para usar a plataforma?", 
    answer: <>Geralmente não. A Equilibrium é oferecida como um benefício corporativo pela sua empresa. Verifique com seu departamento de RH se sua conta já está ativa.</> 
  },
  { 
    question: "Esqueci minha senha, como recupero?", 
    answer: <>Na tela de login, clique em “Esqueci minha senha”. Enviaremos um link seguro para o seu e-mail corporativo cadastrado para que você possa redefinir seu acesso.</> 
  },
];

export function Faq() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Abre direto se acessar /faq/:id
  useEffect(() => {
    if (id) {
      const idx = parseInt(id, 10);
      if (!isNaN(idx) && idx >= 0 && idx < faqs.length) {
        setOpenIndex(idx);
      }
    } else {
      setOpenIndex(null);
    }
  }, [id]);

  const handleClick = (idx: number) => {
    if (openIndex === idx) {
      setOpenIndex(null);
      navigate("/faq"); // fecha e volta pra /faq
    } else {
      setOpenIndex(idx);
      navigate(`/faq/${idx}`); // abre e atualiza URL
    }
  };

  return (
    <>
      <Header />
      <main className="flex-grow bg-bg-clarinho min-h-screen py-12 px-4">
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Coluna da Esquerda: Título e Accordion */}
          <div className="flex flex-col gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-azul-gs mb-4">
                Dúvidas Frequentes
              </h2>
              <p className="text-texto-escuro/70 text-lg">
                Entenda como cuidamos da sua saúde mental e privacidade.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div 
                    key={idx}
                    className={`bg-branco-gs rounded-2xl shadow-sm border transition-all duration-300 overflow-hidden
                      ${isOpen ? 'border-amarelo-medio-gs shadow-md' : 'border-transparent hover:border-azul-gs/20'}
                    `}
                  >
                    <button
                      onClick={() => handleClick(idx)}
                      className="w-full flex items-center justify-between p-5 text-left focus:outline-none group"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                    >
                      <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-azul-gs' : 'text-texto-escuro group-hover:text-azul-gs'}`}>
                        {faq.question}
                      </span>
                      <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-amarelo-claro-gs text-azul-gs' : 'bg-bg-clarinho text-texto-escuro'}`}>
                         {/* Ícone que gira */}
                         <FaPlus 
                           className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} 
                           size={14}
                         />
                      </div>
                    </button>

                    <div 
                      id={`faq-answer-${idx}`}
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="p-5 pt-0 text-texto-escuro/80 leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Coluna da Direita: Imagem (Fixa em desktop) */}
          <div className="hidden lg:flex flex-col items-center justify-center sticky top-24">
            <div className="bg-branco-gs p-8 rounded-full shadow-xl mb-8 relative z-10">
               {/* Círculo decorativo atrás */}
               <div className="absolute inset-0 bg-amarelo-claro-gs rounded-full blur-2xl opacity-50 -z-10 transform scale-110"></div>
               
               <img
                src={carringBox}
                alt="Ilustração de suporte e dúvidas"
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-azul-gs mb-2">Precisa de ajuda especializada?</h3>
              <p className="text-texto-escuro/70 mb-4">Nosso time de suporte está à disposição.</p>
              <Link 
                to="/contato"
                className="inline-block bg-azul-gs text-branco-gs font-semibold py-3 px-8 rounded-full hover:bg-amarelo-escuro-gs hover:shadow-lg transition-all duration-300"
              >
                Fale Conosco
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}