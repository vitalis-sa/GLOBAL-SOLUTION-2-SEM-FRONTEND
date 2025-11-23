import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Loading } from "../components/loading";
import type { Funcionario, TesteSituacao, Telefone, Email } from "../types/funcionario";
import { API_VITALIS } from "../api/vitalis-api";
import { API_IA_URL } from "../api/vitalis-api";

const API_BASE_URL = API_VITALIS;

interface ItemMelhoria {
  texto: string;
  titulo: string;
}

interface TopFeature {
  importancia: number;
  nome: string;
}

interface RecomendacaoRH {
  introducao: string;
  melhorias: ItemMelhoria[];
  titulo: string;
  top_features_analisadas: string[];
}

interface MelhoriaIA {
  burnout_score: number;
  cargo: string;
  nome: string;
  recomendacoes_rh: RecomendacaoRH;
  top_features: TopFeature[];
}

export function FuncionarioDetalhePage() {
  const { id } = useParams<{ id: string }>();

  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [testes, setTestes] = useState<TesteSituacao[]>([]);
  const [analiseIA, setAnaliseIA] = useState<MelhoriaIA | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      setIsLoading(true);
      try {
        const [resFunc, resTestes, resIA] = await Promise.all([
          fetch(`${API_BASE_URL}/funcionarios/${id}`),
          fetch(`${API_BASE_URL}/funcionarios/${id}/testes-situacao`),
          fetch(`${API_IA_URL}/api/ml/melhoria/${id}`)
        ]);

        if (!resFunc.ok) throw new Error("Funcionário não encontrado");

        const funcData = await resFunc.json();
        const testesData = resTestes.ok ? await resTestes.json() : [];
        const iaData = resIA.ok ? await resIA.json() : null;

        setFuncionario(funcData);
        setTestes(testesData);
        setAnaliseIA(iaData);

      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (isLoading) return <><Header /><Loading /><Footer /></>;
  if (error) return <><Header /><div className="text-center p-10 text-red-500 font-bold">{error}</div><Footer /></>;
  if (!funcionario) return null;

  const formatarTelefone = (t: Telefone | undefined) => t ? `+${t.ddi} (${t.ddd}) ${t.numero}` : "N/A";
  const formatarEmail = (e: Email | undefined) => e ? e.endereco : "N/A";


  const getScoreColor = (score: number | null) => {
    if (score === null) return "border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500";
    
    if (score < 3.0) return "border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
    
    if (score < 7.0) return "border-amarelo-medio-gs dark:border-yellow-700 text-amarelo-escuro-gs dark:text-yellow-400 bg-amarelo-claro-gs/30 dark:bg-yellow-900/20";
    
    return "border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20";
  };

  return (
    <>
      <Header />
      <main className="flex-grow bg-bg-clarinho dark:bg-gray-900 min-h-screen py-12 px-4 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">

          <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border-t-4 border-amarelo-medio-gs p-8 mb-8 transition-colors duration-300">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4 transition-colors">
              <div>
                <h1 className="text-3xl font-bold text-azul-gs dark:text-white transition-colors">{funcionario.nome}</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium transition-colors">{funcionario.cargo} • {funcionario.nomeDepartamento}</p>
              </div>
              <div className="mt-2 md:mt-0 px-4 py-1 bg-bg-escurinho dark:bg-gray-700 rounded-full text-azul-gs dark:text-blue-300 font-bold text-sm border border-azul-gs/10 dark:border-gray-600 transition-colors">
                ID: {funcionario.id}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <InfoGroup label="CPF" value={funcionario.cpf} />
              <InfoGroup label="Idade" value={`${funcionario.idade} anos`} />
              <InfoGroup label="Gênero" value={funcionario.genero} />
              <InfoGroup label="Tempo de Casa" value={`${funcionario.anosEmpresa} anos`} />
              <InfoGroup label="Jornada" value={`${funcionario.horasTrabalho}h semanais`} />
              <InfoGroup label="Modelo de Trabalho" value={funcionario.trabalhoRemoto === 'Yes' ? 'Remoto' : funcionario.trabalhoRemoto === 'Hybrid' ? 'Híbrido' : 'Presencial'} />

              <div className="md:col-span-2 border-t border-gray-100 dark:border-gray-700 pt-4 mt-2 transition-colors">
                <h3 className="text-sm font-bold text-amarelo-escuro-gs dark:text-yellow-500 uppercase tracking-wider mb-3 transition-colors">Contatos</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <InfoGroup label="E-mail" value={formatarEmail(funcionario.email)} />
                  <InfoGroup label="Telefone" value={formatarTelefone(funcionario.telefone)} />
                </div>
              </div>
            </div>
          </section>

          {analiseIA && (
            <section className="mb-10 animate-fade-in-up">
              <div className="bg-gradient-to-br from-azul-gs to-[#2c5263] dark:from-gray-700 dark:to-gray-900 rounded-3xl shadow-xl overflow-hidden text-white transition-colors duration-300">
                
                <div className="p-8 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-2 opacity-80">
                    <span className="text-2xl">✨</span>
                    <span className="text-xs font-bold uppercase tracking-widest">Equilibrium AI Analysis</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">{analiseIA.recomendacoes_rh.titulo}</h2>
                </div>

                <div className="p-8 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors">
                  
                  <div className="prose max-w-none mb-10 text-lg leading-relaxed text-gray-600 dark:text-gray-300 transition-colors">
                    <p>{analiseIA.recomendacoes_rh.introducao}</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <div className="lg:col-span-2 space-y-6">
                      <h3 className="text-xl font-bold text-azul-gs dark:text-blue-300 flex items-center gap-2 transition-colors">
                        <span>🎯</span> Ações Recomendadas pelo RH
                      </h3>
                      
                      <div className="grid gap-4">
                        {analiseIA.recomendacoes_rh.melhorias.map((melhoria, idx) => (
                          <div key={idx} className="bg-bg-clarinho dark:bg-gray-700 p-5 rounded-xl border-l-4 border-amarelo-medio-gs shadow-sm hover:shadow-md transition-all">
                            <h4 className="font-bold text-azul-gs dark:text-white mb-2 text-lg transition-colors">{melhoria.titulo}</h4>
                            <p className="text-gray-600 dark:text-gray-200 text-sm leading-relaxed transition-colors">{melhoria.texto}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-azul-gs dark:text-blue-300 flex items-center gap-2 transition-colors">
                        <span>🔍</span> Fatores Analisados
                      </h3>
                      
                      <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-2xl border border-gray-100 dark:border-gray-600 transition-colors">
                        <ul className="space-y-4">
                          {analiseIA.recomendacoes_rh.top_features_analisadas.map((featureText, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-gray-600 dark:text-gray-300 transition-colors">
                              <span className="text-amarelo-escuro-gs dark:text-yellow-400 mt-1">●</span>
                              <span>{featureText}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-2xl border border-gray-100 dark:border-gray-600 transition-colors">
                        <h4 className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider mb-4 transition-colors">Impacto no Score</h4>
                        <div className="space-y-3">
                          {analiseIA.top_features.slice(0, 5).map((feat, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="font-semibold text-gray-600 dark:text-gray-300 truncate max-w-[150px]" title={feat.nome}>{feat.nome}</span>
                                <span className="text-azul-gs dark:text-blue-300 font-bold">{feat.importancia.toFixed(1)}</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                                <div 
                                  className="bg-azul-gs dark:bg-blue-400 h-1.5 rounded-full" 
                                  style={{ width: `${Math.min((feat.importancia / 10) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>
          )}

          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-azul-gs dark:text-white transition-colors">Histórico de Check-ins</h2>
            </div>

            {testes.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm text-center border border-dashed border-gray-300 dark:border-gray-600 transition-colors">
                <p className="text-gray-500 dark:text-gray-400">Nenhuma análise de situação registrada para este colaborador.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {testes.map((teste) => (
                  <div key={teste.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                      <ScoreItem label="Satisfação" value={teste.jobSatisfaction} />
                      <ScoreItem label="Estresse" value={teste.stressLevel} />
                      <ScoreItem label="Produtividade" value={teste.productivityScore} />
                      <div className="text-xs text-gray-400 dark:text-gray-500 md:hidden">ID Teste: {teste.id}</div>
                    </div>

                    <div className={`px-6 py-3 rounded-xl border ${getScoreColor(teste.burnoutScore)} text-center min-w-[140px] transition-colors`}>
                      <span className="block text-xs font-bold uppercase tracking-wide opacity-80">Risco Burnout</span>
                      <span className="block text-2xl font-extrabold">
                        {teste.burnoutScore !== null ? (teste.burnoutScore * 10).toFixed(1) + "%" : "N/A"}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}



function InfoGroup({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide transition-colors">{label}</span>
      <span className="text-gray-800 dark:text-gray-200 font-medium text-lg transition-colors">{value}</span>
    </div>
  );
}

function ScoreItem({ label, value }: { label: string, value: number }) {
  return (
    <div>
      <span className="block text-xs text-gray-500 dark:text-gray-400 transition-colors">{label}</span>
      <span className="block font-bold text-azul-gs dark:text-blue-300 text-lg transition-colors">{value.toFixed(1)}</span>
    </div>
  );
}