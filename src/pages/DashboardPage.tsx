import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Loading } from "../components/loading";
import { useAuth } from "../context/AuthContext";
import { API_VITALIS } from "../api/vitalis-api";
import type { Funcionario, TesteSituacao } from "../types/funcionario";
import type { RecomendacaoIA } from "../types/RecomendacaoIA";

const API_BASE_URL = API_VITALIS;

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [ultimoTeste, setUltimoTeste] = useState<TesteSituacao | null>(null);
  const [recomendacao, setRecomendacao] = useState<RecomendacaoIA | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      try {
        const [resFunc, resTestes, resRec] = await Promise.all([
          fetch(`${API_BASE_URL}/funcionarios/${user?.id}`),
          fetch(`${API_BASE_URL}/funcionarios/${user?.id}/testes-situacao`),
          fetch(`${API_BASE_URL}/funcionarios/${user?.id}/recomendacao-atual`)
        ]);

        if (resFunc.ok) {
          setFuncionario(await resFunc.json());
        }

        if (resTestes.ok) {
          const listaTestes: TesteSituacao[] = await resTestes.json();
          if (Array.isArray(listaTestes) && listaTestes.length > 0) {
            setUltimoTeste(listaTestes[0]);
          }
        }

        if (resRec.ok && resRec.status !== 204) {
          setRecomendacao(await resRec.json());
        }

      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [user, navigate]);

  if (isLoading) return <><Header /><Loading /><Footer /></>;
  if (!funcionario) return null;

  // --- Tratamento do Score (Regra: Negativo vira 0) ---
  const rawScore = ultimoTeste?.burnoutScore;
  // Se existir score, fazemos o clamp para não ser menor que 0
  const displayScoreValue = rawScore !== null && rawScore !== undefined 
    ? Math.max(0, rawScore) 
    : null;

  // --- Lógica de Cores do Score ---
  const getScoreColor = (score: number | null) => {
    if (score === null) return "border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500";
    
    // Verde (Baixo Risco)
    if (score < 3.0) return "border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
    
    // Amarelo (Médio Risco)
    if (score < 7.0) return "border-amarelo-medio-gs dark:border-yellow-700 text-amarelo-escuro-gs dark:text-yellow-400 bg-amarelo-claro-gs/30 dark:bg-yellow-900/20";
    
    // Vermelho (Alto Risco)
    return "border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
  };

  const getScoreLabel = (score: number | null) => {
    if (score === null) return "Pendente";
    if (score < 3.0) return "Risco Baixo";
    if (score < 7.0) return "Risco Moderado";
    return "Risco Alto";
  };

  // --- Validação de Conteúdo da Recomendação ---
  // Verifica se existe objeto E se tem conteúdo de texto válido
  const hasRecomendacaoContent = recomendacao && (
    (recomendacao.introducao && recomendacao.introducao.trim().length > 0) ||
    (recomendacao.titulo && recomendacao.titulo.trim().length > 0)
  );

  const primeiroNome = funcionario.nome ? funcionario.nome.split(' ')[0] : "Colaborador";

  return (
    <>
      <Header />
      <main className="flex-grow bg-bg-clarinho dark:bg-gray-900 min-h-screen py-12 px-4 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-azul-gs dark:text-white transition-colors">
              Olá, {primeiroNome}! 👋
            </h1>
            <p className="text-texto-escuro/70 dark:text-gray-300 text-lg mt-2 transition-colors">
              Aqui está o panorama atual do seu bem-estar e suas recomendações personalizadas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLUNA ESQUERDA: Score e Infos (1/3) */}
            <div className="flex flex-col gap-8">
              
              {/* Card de Burnout Score */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 text-center border-t-4 border-amarelo-medio-gs relative overflow-hidden transition-colors duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-azul-gs to-amarelo-medio-gs"></div>
                <h2 className="text-xl font-bold text-azul-gs dark:text-white mb-6 uppercase tracking-wider transition-colors">Seu Burnout Score</h2>
                
                {ultimoTeste ? (
                  <div className="flex flex-col items-center">
                    {/* Usa displayScoreValue (que já está tratado para não ser negativo) para cor e texto */}
                    <div className={`w-40 h-40 rounded-full border-8 flex items-center justify-center mb-4 transition-colors duration-500 ${getScoreColor(displayScoreValue)}`}>
                      <span className="text-4xl font-extrabold">
                        {displayScoreValue !== null ? (displayScoreValue * 10).toFixed(0) : "--"}
                        <span className="text-lg">%</span>
                      </span>
                    </div>
                    
                    <p className={`text-lg font-bold px-4 py-1 rounded-full ${getScoreColor(displayScoreValue).split(' ').filter(c => c.startsWith('bg-') || c.startsWith('dark:bg-') || c.startsWith('text-') || c.startsWith('dark:text-')).join(' ')}`}>
                      {getScoreLabel(displayScoreValue)}
                    </p>
                    
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-4 transition-colors">
                      Última atualização: {new Date().toLocaleDateString()}
                    </p>

                    {/* Botão para refazer teste sempre visível */}
                    <Link 
                      to="/funcionarios/CadastroTesteSituacaoPage" 
                      className="mt-6 inline-block text-sm font-bold text-azul-gs dark:text-blue-300 hover:text-amarelo-escuro-gs dark:hover:text-yellow-400 underline decoration-2 underline-offset-4 transition-all"
                    >
                      Refazer Check-in
                    </Link>
                  </div>
                ) : (
                  <div className="py-10">
                    <p className="text-gray-500 dark:text-gray-400 mb-6 transition-colors">Você ainda não realizou o check-in.</p>
                    <Link to="/funcionarios/CadastroTesteSituacaoPage" className="bg-azul-gs text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-amarelo-escuro-gs transition-colors">
                      Fazer Check-in
                    </Link>
                  </div>
                )}
              </div>

              {/* Mini Perfil */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 transition-colors">Seus Dados</h3>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300 transition-colors">
                  <p className="flex justify-between">
                    <span>Cargo:</span>
                    <span className="font-semibold text-azul-gs dark:text-blue-300 text-right">{funcionario.cargo}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Depto:</span>
                    <span className="font-semibold text-azul-gs dark:text-blue-300 text-right">
                      {funcionario.nomeDepartamento || "N/A"}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-semibold text-azul-gs dark:text-blue-300 text-right truncate max-w-[150px]" title={funcionario.email?.endereco}>
                        {funcionario.email?.endereco || "-"}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Jornada:</span>
                    <span className="font-semibold text-azul-gs dark:text-blue-300 text-right">
                        {funcionario.horasTrabalho}h ({funcionario.trabalhoRemoto === 'Yes' ? 'Remoto' : funcionario.trabalhoRemoto === 'Hybrid' ? 'Híbrido' : 'Presencial'})
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA: Recomendações da IA (2/3) */}
            <div className="lg:col-span-2">
              {hasRecomendacaoContent ? (
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 h-full transition-colors duration-300">
                  <div className="bg-gradient-to-r from-azul-gs to-[#3a6b82] dark:from-gray-700 dark:to-gray-900 p-8 text-white">
                    <div className="flex items-center gap-2 mb-2 opacity-90">
                      <span className="text-2xl">✨</span>
                      <span className="font-bold uppercase tracking-widest text-xs">Equilibrium AI</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                      {recomendacao!.titulo ? recomendacao!.titulo.replace(/"/g, '') : "Sua Análise"}
                    </h2>
                  </div>

                  <div className="p-6 md:p-8 space-y-8">
                    
                    <div className="prose max-w-none text-gray-600 dark:text-gray-300 text-lg leading-relaxed transition-colors">
                      <p>{recomendacao!.introducao}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-azul-gs dark:text-blue-300 mb-4 flex items-center gap-2 transition-colors">
                        <span>🎯</span> Plano de Ação
                      </h3>
                      <div className="space-y-4">
                        {[recomendacao!.conselho1, recomendacao!.conselho2, recomendacao!.conselho3]
                          .filter(Boolean)
                          .map((conselho, idx) => (
                            <div key={idx} className="flex gap-4 bg-bg-clarinho dark:bg-gray-700 p-5 rounded-xl border-l-4 border-amarelo-medio-gs hover:shadow-md transition-all">
                              <span className="font-bold text-amarelo-escuro-gs dark:text-yellow-400 text-xl">{idx + 1}</span>
                              <p className="text-gray-700 dark:text-gray-200 font-medium">{conselho}</p>
                            </div>
                          ))}
                      </div>
                    </div>

                    {(recomendacao!.leitura1 || recomendacao!.leitura2) && (
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors">
                        <h3 className="text-lg font-bold text-azul-gs dark:text-blue-300 mb-4 flex items-center gap-2 transition-colors">
                          <span>📚</span> Para se aprofundar
                        </h3>
                        <div className="flex flex-col gap-3">
                          {[recomendacao!.leitura1, recomendacao!.leitura2].filter(Boolean).map((leitura, idx) => (
                            <div key={idx} className="group flex items-center gap-2 p-3 rounded-lg hover:bg-bg-clarinho dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300">
                              <span className="text-amarelo-escuro-gs dark:text-yellow-500">🔗</span>
                              <span className="underline decoration-gray-300 dark:decoration-gray-600 group-hover:decoration-amarelo-medio-gs underline-offset-4">
                                {leitura}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 text-center border-t border-gray-100 dark:border-gray-800 transition-colors">
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Gerado por Inteligência Artificial. Essas recomendações não substituem acompanhamento médico.
                    </p>
                  </div>
                </div>
              ) : (
                // Estado Vazio (Se não houver recomendação OU se estiver com texto vazio)
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-12 text-center h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <div className="text-6xl mb-4 opacity-20">🧘</div>
                  <h3 className="text-xl font-bold text-gray-400 dark:text-gray-500 mb-2">
                    {recomendacao ? "Recomendações Pendentes" : "Nenhuma recomendação ainda"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 text-lg">
                    {recomendacao 
                      ? "Recebemos seus dados, mas ainda não geramos um plano completo. Por favor, tente refazer a análise para obter novos insights."
                      : "Para gerar seu plano personalizado de bem-estar, precisamos entender como você está se sentindo hoje."}
                  </p>
                  <Link
                    to="/funcionarios/CadastroTesteSituacaoPage"
                    className="bg-amarelo-medio-gs text-azul-gs font-bold py-4 px-10 rounded-full hover:bg-amarelo-escuro-gs hover:text-white transition-all shadow-lg hover:-translate-y-1 text-lg"
                  >
                    {recomendacao ? "Refazer Análise Agora" : "Iniciar Análise Agora"}
                  </Link>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}