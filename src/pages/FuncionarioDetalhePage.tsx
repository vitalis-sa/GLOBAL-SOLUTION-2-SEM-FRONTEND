import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Loading } from "../components/loading";
import type { Funcionario, TesteSituacao, Telefone, Email } from "../types/funcionario";
import { API_VITALIS } from "../api/vitalis-api";
import { API_IA_URL } from "../api/vitalis-api";

const API_BASE_URL = API_VITALIS;

// --- INTERFACES PARA A RESPOSTA DA IA ---
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
        // Busca Funcionário, Testes e Análise da IA em paralelo
        const [resFunc, resTestes, resIA] = await Promise.all([
          fetch(`${API_BASE_URL}/funcionarios/${id}`),
          fetch(`${API_BASE_URL}/funcionarios/${id}/testes-situacao`),
          fetch(`${API_IA_URL}/api/ml/melhoria/${id}`)
        ]);

        if (!resFunc.ok) throw new Error("Funcionário não encontrado");

        const funcData = await resFunc.json();
        
        // Tratamento para endpoints que podem retornar 404 ou vazio sem quebrar a página toda
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

  // --- Renderização de Estados ---
  if (isLoading) return <><Header /><Loading /><Footer /></>;
  if (error) return <><Header /><div className="text-center p-10 text-red-500 font-bold">{error}</div><Footer /></>;
  if (!funcionario) return null;

  // --- Helpers de UI ---
  const formatarTelefone = (t: Telefone | undefined) => t ? `+${t.ddi} (${t.ddd}) ${t.numero}` : "N/A";
  const formatarEmail = (e: Email | undefined) => e ? e.endereco : "N/A";

  const getScoreColor = (score: number | null) => {
    if (score === null) return "border-gray-200 text-gray-400";
    if (score < 3.0) return "border-green-200 text-green-600 bg-green-50";
    if (score < 7.0) return "border-amarelo-medio-gs text-amarelo-escuro-gs bg-amarelo-claro-gs/30";
    return "border-red-200 text-red-600 bg-red-50";
  };

  return (
    <>
      <Header />
      <main className="flex-grow bg-bg-clarinho min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto">

          {/* --- CARD PRINCIPAL DO FUNCIONÁRIO --- */}
          <section className="bg-white rounded-3xl shadow-lg border-t-4 border-amarelo-medio-gs p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-gray-100 pb-4">
              <div>
                <h1 className="text-3xl font-bold text-azul-gs">{funcionario.nome}</h1>
                <p className="text-gray-500 font-medium">{funcionario.cargo} • {funcionario.nomeDepartamento}</p>
              </div>
              <div className="mt-2 md:mt-0 px-4 py-1 bg-bg-escurinho rounded-full text-azul-gs font-bold text-sm border border-azul-gs/10">
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

              <div className="md:col-span-2 border-t border-gray-100 pt-4 mt-2">
                <h3 className="text-sm font-bold text-amarelo-escuro-gs uppercase tracking-wider mb-3">Contatos</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <InfoGroup label="E-mail" value={formatarEmail(funcionario.email)} />
                  <InfoGroup label="Telefone" value={formatarTelefone(funcionario.telefone)} />
                </div>
              </div>
            </div>
          </section>

          {/* --- SEÇÃO ANÁLISE DE IA (NOVO) --- */}
          {analiseIA && (
            <section className="mb-10 animate-fade-in-up">
              <div className="bg-gradient-to-br from-azul-gs to-[#2c5263] rounded-3xl shadow-xl overflow-hidden text-white">
                
                {/* Cabeçalho da IA */}
                <div className="p-8 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-2 opacity-80">
                    <span className="text-2xl">✨</span>
                    <span className="text-xs font-bold uppercase tracking-widest">Equilibrium AI Analysis</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">{analiseIA.recomendacoes_rh.titulo}</h2>
                </div>

                <div className="p-8 bg-white text-gray-700">
                  
                  {/* Introdução */}
                  <div className="prose max-w-none mb-10 text-lg leading-relaxed text-gray-600">
                    <p>{analiseIA.recomendacoes_rh.introducao}</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Coluna Esquerda: Ações Recomendadas (2/3) */}
                    <div className="lg:col-span-2 space-y-6">
                      <h3 className="text-xl font-bold text-azul-gs flex items-center gap-2">
                        <span>🎯</span> Ações Recomendadas pelo RH
                      </h3>
                      
                      <div className="grid gap-4">
                        {analiseIA.recomendacoes_rh.melhorias.map((melhoria, idx) => (
                          <div key={idx} className="bg-bg-clarinho p-5 rounded-xl border-l-4 border-amarelo-medio-gs shadow-sm hover:shadow-md transition-all">
                            <h4 className="font-bold text-azul-gs mb-2 text-lg">{melhoria.titulo}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{melhoria.texto}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Coluna Direita: Insights e Fatores (1/3) */}
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-azul-gs flex items-center gap-2">
                        <span>🔍</span> Fatores Analisados
                      </h3>
                      
                      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <ul className="space-y-4">
                          {analiseIA.recomendacoes_rh.top_features_analisadas.map((featureText, idx) => (
                            <li key={idx} className="flex gap-3 text-sm text-gray-600">
                              <span className="text-amarelo-escuro-gs mt-1">●</span>
                              <span>{featureText}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Gráfico Simples de Importância (Visualização dos top_features) */}
                      <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Impacto no Score</h4>
                        <div className="space-y-3">
                          {analiseIA.top_features.slice(0, 5).map((feat, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="font-semibold text-gray-600 truncate max-w-[150px]" title={feat.nome}>{feat.nome}</span>
                                <span className="text-azul-gs font-bold">{feat.importancia.toFixed(1)}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-azul-gs h-1.5 rounded-full" 
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

          {/* --- SEÇÃO HISTÓRICO DE TESTES --- */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-azul-gs">Histórico de Check-ins</h2>
            </div>

            {testes.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-dashed border-gray-300">
                <p className="text-gray-500">Nenhuma análise de situação registrada para este colaborador.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {testes.map((teste) => (
                  <div key={teste.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    {/* Coluna Esquerda: Detalhes dos Scores */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                      <ScoreItem label="Satisfação" value={teste.jobSatisfaction} />
                      <ScoreItem label="Estresse" value={teste.stressLevel} />
                      <ScoreItem label="Produtividade" value={teste.productivityScore} />
                      <div className="text-xs text-gray-400 md:hidden">ID Teste: {teste.id}</div>
                    </div>

                    {/* Coluna Direita: Burnout Score (Destaque) */}
                    <div className={`px-6 py-3 rounded-xl border ${getScoreColor(teste.burnoutScore)} text-center min-w-[140px]`}>
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

// --- Componentes Auxiliares ---

function InfoGroup({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</span>
      <span className="text-gray-800 font-medium text-lg">{value}</span>
    </div>
  );
}

function ScoreItem({ label, value }: { label: string, value: number }) {
  return (
    <div>
      <span className="block text-xs text-gray-500">{label}</span>
      <span className="block font-bold text-azul-gs text-lg">{value.toFixed(1)}</span>
    </div>
  );
}