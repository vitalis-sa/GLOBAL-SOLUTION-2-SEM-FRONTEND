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
    // Se não estiver logado, redireciona
    if (!user) {
      navigate("/login");
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      try {
        // Busca 3 coisas em paralelo:
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

  // --- Lógica de Cores do Score ---
  const getScoreColor = (score: number | null) => {
    if (score === null) return "border-gray-200 text-gray-400";
    // Ajustado: < 3.0 (Verde) | < 7.0 (Amarelo) | >= 7.0 (Vermelho)
    if (score < 3.0) return "border-green-200 text-green-600 bg-green-50"; 
    if (score < 7.0) return "border-amarelo-medio-gs text-amarelo-escuro-gs bg-amarelo-claro-gs/30";
    return "border-red-200 text-red-600 bg-red-50"; 
  };

 const getScoreLabel = (score: number | null) => {
    if (score === null) return "Pendente";
    if (score < 3.0) return "Risco Baixo";
    if (score < 7.0) return "Risco Moderado";
    return "Risco Alto";
  };

  // Helper para evitar erro de split em nome indefinido
  const primeiroNome = funcionario.nome ? funcionario.nome.split(' ')[0] : "Colaborador";

  return (
    <>
      <Header />
      <main className="flex-grow bg-bg-clarinho min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Cabeçalho de Boas-vindas */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-azul-gs">
              Olá, {primeiroNome}! 👋
            </h1>
            <p className="text-texto-escuro/70 text-lg mt-2">
              Aqui está o panorama atual do seu bem-estar e suas recomendações personalizadas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLUNA ESQUERDA: Score e Infos (1/3) */}
            <div className="flex flex-col gap-8">
              
              {/* Card de Burnout Score */}
              <div className="bg-white rounded-3xl shadow-lg p-8 text-center border-t-4 border-amarelo-medio-gs relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-azul-gs to-amarelo-medio-gs"></div>
                <h2 className="text-xl font-bold text-azul-gs mb-6 uppercase tracking-wider">Seu Burnout Score</h2>
                
                {ultimoTeste ? (
                  <div className="flex flex-col items-center">
                    <div className={`w-40 h-40 rounded-full border-8 flex items-center justify-center mb-4 transition-colors duration-500 ${getScoreColor(ultimoTeste.burnoutScore)}`}>
                      <span className="text-4xl font-extrabold">
                        {ultimoTeste.burnoutScore !== null ? (ultimoTeste.burnoutScore * 10).toFixed(0) : "--"}
                        <span className="text-lg">%</span>
                      </span>
                    </div>
                    <p className={`text-lg font-bold px-4 py-1 rounded-full bg-bg-clarinho ${getScoreColor(ultimoTeste.burnoutScore).split(' ')[0]}`}>
                      {getScoreLabel(ultimoTeste.burnoutScore)}
                    </p>
                    <p className="text-xs text-gray-400 mt-4">
                      Última atualização: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <div className="py-10">
                    <p className="text-gray-500 mb-6">Você ainda não realizou o check-in.</p>
                    <Link to="/funcionarios/CadastroTesteSituacaoPage" className="bg-azul-gs text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-amarelo-escuro-gs transition-colors">
                      Fazer Check-in
                    </Link>
                  </div>
                )}
              </div>

              {/* Mini Perfil */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Seus Dados</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex justify-between">
                <span>Cargo:</span>
                <span className="font-semibold text-azul-gs text-right">{funcionario.cargo}</span>
              </p>
              <p className="flex justify-between">
                <span>Depto:</span>
                {/* CORREÇÃO AQUI: Use nomeDepartamento diretamente */}
                <span className="font-semibold text-azul-gs text-right">
                  {funcionario.nomeDepartamento || "N/A"}
                </span>
              </p>
                  <p className="flex justify-between">
                    <span>Email:</span> 
                    <span className="font-semibold text-azul-gs text-right truncate max-w-[150px]" title={funcionario.email?.endereco}>
                        {funcionario.email?.endereco || "-"}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Jornada:</span> 
                    <span className="font-semibold text-azul-gs text-right">
                        {funcionario.horasTrabalho}h ({funcionario.trabalhoRemoto === 'Yes' ? 'Remoto' : funcionario.trabalhoRemoto === 'Hybrid' ? 'Híbrido' : 'Presencial'})
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA: Recomendações da IA (2/3) */}
            <div className="lg:col-span-2">
              {recomendacao ? (
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 h-full">
                  <div className="bg-gradient-to-r from-azul-gs to-[#3a6b82] p-8 text-white">
                    <div className="flex items-center gap-2 mb-2 opacity-90">
                      <span className="text-2xl">✨</span>
                      <span className="font-bold uppercase tracking-widest text-xs">Equilibrium AI</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                      {recomendacao.titulo ? recomendacao.titulo.replace(/"/g, '') : "Sua Análise"}
                    </h2>
                  </div>

                  <div className="p-6 md:p-8 space-y-8">
                    
                    <div className="prose max-w-none text-gray-600 text-lg leading-relaxed">
                      <p>{recomendacao.introducao}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-azul-gs mb-4 flex items-center gap-2">
                        <span>🎯</span> Plano de Ação
                      </h3>
                      <div className="space-y-4">
                        {[recomendacao.conselho1, recomendacao.conselho2, recomendacao.conselho3]
                          .filter(Boolean)
                          .map((conselho, idx) => (
                            <div key={idx} className="flex gap-4 bg-bg-clarinho p-5 rounded-xl border-l-4 border-amarelo-medio-gs hover:shadow-md transition-shadow">
                              <span className="font-bold text-amarelo-escuro-gs text-xl">{idx + 1}</span>
                              <p className="text-gray-700 font-medium">{conselho}</p>
                            </div>
                          ))}
                      </div>
                    </div>

                    {(recomendacao.leitura1 || recomendacao.leitura2) && (
                      <div className="pt-4 border-t border-gray-100">
                        <h3 className="text-lg font-bold text-azul-gs mb-4 flex items-center gap-2">
                          <span>📚</span> Para se aprofundar
                        </h3>
                        <div className="flex flex-col gap-3">
                          {[recomendacao.leitura1, recomendacao.leitura2].filter(Boolean).map((leitura, idx) => (
                            <div key={idx} className="group flex items-center gap-2 p-3 rounded-lg hover:bg-bg-clarinho transition-colors text-gray-600">
                              <span className="text-amarelo-escuro-gs">🔗</span>
                              <span className="underline decoration-gray-300 group-hover:decoration-amarelo-medio-gs underline-offset-4">
                                {leitura}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      Gerado por Inteligência Artificial. Essas recomendações não substituem acompanhamento médico.
                    </p>
                  </div>
                </div>
              ) : (
                // Estado Vazio
                <div className="bg-white rounded-3xl shadow-lg p-12 text-center h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200">
                  <div className="text-6xl mb-4 opacity-20">🧘</div>
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Nenhuma recomendação ainda</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg">
                    Para gerar seu plano personalizado de bem-estar, precisamos entender como você está se sentindo hoje.
                  </p>
                  <Link 
                    to="/funcionarios/CadastroTesteSituacaoPage" 
                    className="bg-amarelo-medio-gs text-azul-gs font-bold py-4 px-10 rounded-full hover:bg-amarelo-escuro-gs hover:text-white transition-all shadow-lg hover:-translate-y-1 text-lg"
                  >
                    Iniciar Análise Agora
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