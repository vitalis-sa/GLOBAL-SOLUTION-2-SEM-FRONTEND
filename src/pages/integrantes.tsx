import { Footer } from "../components/footer";
import { Header } from "../components/header";
import anaflavia from '../assets/anaflavia.jpeg'
import github from '../assets/github.png'
import linkedin from '../assets/linkedin.png'
import gustavoterada from '../assets/gustavoterada.jpeg'
import joaoguilherme from '../assets/joaoguilherme.jpeg'

export function Integrantes() {
  const team = [
    {
      name: "Ana Flavia",
      rm: "RM561489",
      class: "1TDSPV",
      image: anaflavia,
      githubUrl: "https://www.github.com/afcamelo",
      linkedinUrl: "https://www.linkedin.com/in/anaflaviacamelo/"
    },
    {
      name: "Gustavo Terada",
      rm: "RM562745",
      class: "1TDSPV",
      image: gustavoterada,
      githubUrl: "https://www.github.com/gkenji110",
      linkedinUrl: "https://www.linkedin.com/in/gustavo-terada-604661301/"
    },
    {
      name: "João Guilherme",
      rm: "RM566234",
      class: "1TDSPV",
      image: joaoguilherme,
      githubUrl: "https://www.github.com/JoaoGuiNovaes",
      linkedinUrl: "https://www.linkedin.com/in/jo%C3%A3o-guilherme-carvalho-novaes/"
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-grow bg-bg-clarinho dark:bg-gray-900 min-h-screen py-16 px-4 transition-colors duration-300">
        
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-azul-gs dark:text-white mb-4 transition-colors">
            Nosso <span className="text-amarelo-escuro-gs">Time</span>
          </h2>
          <p className="text-texto-escuro/70 dark:text-gray-300 max-w-2xl mx-auto text-lg transition-colors">
            As mentes por trás da Equilibrium, unindo tecnologia e saúde para transformar ambientes corporativos.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
          
          {team.map((member) => (
            <div 
              key={member.rm}

              className="group flex flex-col w-full max-w-[380px] bg-branco-gs dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden border-t-4 border-amarelo-medio-gs"
            >

              <div className="w-full h-80 overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" 
                  src={member.image} 
                  alt={`Foto de ${member.name}`} 
                />
              </div>

              <div className="p-8 flex flex-col items-center flex-grow">
                <h3 className="text-2xl font-bold text-azul-gs dark:text-white mb-1 transition-colors">
                  {member.name}
                </h3>
                <span className="text-amarelo-escuro-gs dark:text-yellow-400 font-semibold text-base mb-4 transition-colors">
                  {member.class}
                </span>
                <p className="text-texto-escuro/60 dark:text-gray-300 text-sm font-mono bg-bg-escurinho dark:bg-gray-700 px-4 py-1 rounded-full mb-8 transition-colors">
                  {member.rm}
                </p>
                <div className="flex gap-6 mt-auto">
                  <a 
                    href={member.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="opacity-70 hover:opacity-100 hover:scale-110 transition-all"
                  >
                    <img src={github} alt="GitHub" className="w-9 h-9 dark:invert transition-all" />
                  </a>
                  <a 
                    href={member.linkedinUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="opacity-70 hover:opacity-100 hover:scale-110 transition-all"
                  >
                    <img src={linkedin} alt="LinkedIn" className="w-9 h-9 dark:invert transition-all" />
                  </a>
                </div>
              </div>
            </div>
          ))}

        </div>
      </main>
      <Footer />
    </>
  );
}