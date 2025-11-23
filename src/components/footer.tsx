import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-azul-gs dark:bg-gray-950 pt-10 pb-6 px-4 mt-auto border-t-4 border-amarelo-escuro-gs transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4 border-b border-branco-gs/20 pb-8">

        {/* Coluna 1 */}
        <div className="flex-1 flex flex-col items-center md:items-start px-4 w-full">
          <h3 className="text-amarelo-medio-gs text-lg md:text-xl font-bold mb-4 border-b-2 border-amarelo-escuro-gs/50 w-full md:w-auto text-center md:text-left pb-2">
            Unidades
          </h3>
          <p className="text-branco-gs text-center md:text-left text-sm leading-relaxed mb-4 opacity-90">
            <strong>Sede Principal</strong><br />
            Av. Paulista, 1106 - 7º andar<br />
            Bela Vista, São Paulo - SP<br />
            CEP: 01311-000
          </p>
          <p className="text-branco-gs text-center md:text-left text-sm leading-relaxed opacity-90">
            <strong>Unidade Aclimação</strong><br />
            Av. Lins de Vasconcelos, 1264<br />
            São Paulo - SP<br />
            CEP: 01538-001
          </p>
        </div>

        {/* Coluna 2 */}
        <div className="flex-1 flex flex-col items-center md:items-center px-4 w-full">
          <h3 className="text-amarelo-medio-gs text-lg md:text-xl font-bold mb-4 border-b-2 border-amarelo-escuro-gs/50 w-full text-center pb-2">
            Fale Conosco
          </h3>
          <p className="text-branco-gs text-center text-sm leading-relaxed mb-2 opacity-90">
            <span className="font-semibold">Tel:</span> (11) 3385-8010<br />
            <span className="font-semibold">E-mail:</span> contato@equilibrium.com.br
          </p>
          <p className="text-branco-gs text-center text-sm mt-2 opacity-90">
            <span className="font-semibold text-amarelo-claro-gs">Horário de atendimento:</span><br />
            Segunda a Sexta, das 8h às 18h
          </p>
        </div>

        {/* Coluna 3 */}
        <div className="flex-1 flex flex-col items-center md:items-end px-4 w-full">
          <h3 className="text-amarelo-medio-gs text-lg md:text-xl font-bold mb-4 border-b-2 border-amarelo-escuro-gs/50 w-full md:w-auto text-center md:text-right pb-2">
            Links Úteis
          </h3>
          <nav className="flex flex-col gap-2 items-center md:items-end">
            <a href="#" className="text-branco-gs text-sm hover:text-amarelo-claro-gs hover:translate-x-1 transition-all">Política de Privacidade</a>
            <a href="#" className="text-branco-gs text-sm hover:text-amarelo-claro-gs hover:translate-x-1 transition-all">Termos de Uso</a>
            <Link to="/contato" className="text-branco-gs text-sm hover:text-amarelo-claro-gs hover:translate-x-1 transition-all">Trabalhe Conosco</Link>
          </nav>
        </div>
      </div>

      <div className="text-center mt-6 pt-4">
        <p className="text-branco-gs/70 text-xs">
          &copy; {new Date().getFullYear()} Equilibrium – Soluções em Saúde e Tecnologia. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}