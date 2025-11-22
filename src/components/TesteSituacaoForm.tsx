import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useTesteSituacao } from "../context/TesteSituacaoContext";
import { useAuth } from "../context/AuthContext"; // 1. Importar Auth
import {
  testeSituacaoSchema,
  type TesteSituacaoFormData,
} from "../schemas/teste-situacao-schema";

export function TesteSituacaoForm() {
  const { saveTesteSituacao } = useTesteSituacao();
  const { user } = useAuth(); // 2. Pegar o usuário logado
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue, // Necessário para definir o ID automaticamente
    formState: { errors, isSubmitting },
  } = useForm<TesteSituacaoFormData>({
    resolver: zodResolver(testeSituacaoSchema),
  });

  // 3. Efeito para setar o ID do funcionário assim que o user carregar
  useEffect(() => {
    if (user) {
      // Injeta o ID do usuário logado no formulário (oculto)
      setValue("idFuncionario", user.id);
    }
  }, [user, setValue]);

  async function onSubmit(data: TesteSituacaoFormData) {
    try {
      // Garante que o ID está lá (segurança extra)
      if (!user) return;
      const payload = { ...data, idFuncionario: user.id };

      console.log("Enviando teste:", payload);
      
      await saveTesteSituacao(payload);
      
      alert("Teste de Situação registrado com sucesso! A IA analisou os dados.");
      reset();
      // Redireciona para a página de detalhes do funcionário logado ou home
      navigate(`/dashboard`); 
    } catch (error) {
      console.error(error);
      alert("Erro ao registrar teste. Verifique o console.");
    }
  }

  // Estilos
  const inputClass = "w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500";
  const labelClass = "font-semibold text-gray-700 mb-1 block text-sm";
  const errorClass = "text-red-500 text-xs mt-1";
  const sectionTitle = "text-lg font-bold text-azul-gs border-b border-gray-200 pb-1 mb-4 mt-6";

  // 4. Renderização Condicional: Se não tiver usuário logado
  if (!user) {
    return (
      <div className="bg-branco-gs rounded-3xl shadow-xl border-t-4 border-amarelo-medio-gs p-12 text-center">
        <h3 className="text-2xl font-bold text-azul-gs mb-4">Login Necessário</h3>
        <p className="text-texto-escuro/70 mb-8 text-lg">
          Para realizar a análise de situação e burnout, precisamos identificar você no sistema.
        </p>
        <Link 
          to="/login" 
          className="inline-block bg-amarelo-medio-gs text-azul-gs font-bold py-3 px-8 rounded-full hover:bg-amarelo-escuro-gs hover:text-white transition-colors shadow-md"
        >
          Fazer Login
        </Link>
      </div>
    );
  }

  // 5. Renderização do Formulário (Se logado)
  return (
    <div className="bg-branco-gs rounded-3xl shadow-xl overflow-hidden border-t-4 border-amarelo-medio-gs p-8">
      
      {/* Feedback visual de quem está logado */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-3">
        <span className="text-2xl">👤</span>
        <div>
          <p className="text-sm text-gray-500">Realizando teste como:</p>
          <p className="font-bold text-azul-gs text-lg">{user.nome}</p>
          <p className="text-xs text-gray-400">{user.cargo}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* Campo Oculto para ID (já setado pelo useEffect, mas mantemos o register) */}
        <input type="hidden" {...register("idFuncionario")} />

        {/* --- SCORES (0-10) --- */}
        <h3 className={sectionTitle}>Avaliação de Bem-Estar (0-10)</h3>
        <p className="text-xs text-gray-400 mb-4">0 = Muito Baixo / 10 = Muito Alto</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Satisfação no Trabalho</label>
            <input type="number" step="0.1" {...register("jobSatisfaction", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 7.5" />
            {errors.jobSatisfaction && <p className={errorClass}>{errors.jobSatisfaction.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Nível de Estresse</label>
            <input type="number" step="0.1" {...register("stressLevel", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 4.2" />
            {errors.stressLevel && <p className={errorClass}>{errors.stressLevel.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Produtividade</label>
            <input type="number" step="0.1" {...register("productivityScore", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 8.0" />
            {errors.productivityScore && <p className={errorClass}>{errors.productivityScore.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Equilíbrio Vida-Trabalho</label>
            <input type="number" step="0.1" {...register("workLifeScore", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 6.5" />
            {errors.workLifeScore && <p className={errorClass}>{errors.workLifeScore.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Suporte da Gestão</label>
            <input type="number" step="0.1" {...register("managerSupportScore", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 9.0" />
            {errors.managerSupportScore && <p className={errorClass}>{errors.managerSupportScore.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Crescimento na Carreira</label>
            <input type="number" step="0.1" {...register("careerGrowthScore", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 7.0" />
            {errors.careerGrowthScore && <p className={errorClass}>{errors.careerGrowthScore.message}</p>}
          </div>
        </div>

        {/* --- DADOS FÍSICOS E CONTEXTO --- */}
        <h3 className={sectionTitle}>Saúde Física e Contexto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Horas de Sono (média diária)</label>
            <input type="number" {...register("sleepHours", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 7" />
            {errors.sleepHours && <p className={errorClass}>{errors.sleepHours.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Atividade Física (minutos/semana)</label>
            <input type="number" {...register("physicalActivity", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 150" />
            {errors.physicalActivity && <p className={errorClass}>{errors.physicalActivity.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Dias de Afastamento (último ano)</label>
            <input type="number" {...register("mentalHealthDaysOff", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 2" />
            {errors.mentalHealthDaysOff && <p className={errorClass}>{errors.mentalHealthDaysOff.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Tamanho da sua Equipe</label>
            <input type="number" {...register("teamSize", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 5" />
            {errors.teamSize && <p className={errorClass}>{errors.teamSize.message}</p>}
          </div>
        </div>

        {/* --- DADOS QUALITATIVOS --- */}
        <h3 className={sectionTitle}>Informações Adicionais</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Sente apoio mental na empresa?</label>
            <select {...register("mentalSupport")} className={inputClass} defaultValue="">
              <option value="" disabled>Selecione...</option>
              <option value="Yes">Sim (Yes)</option>
              <option value="No">Não (No)</option>
            </select>
            {errors.mentalSupport && <p className={errorClass}>{errors.mentalSupport.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Tem acesso a terapia?</label>
            <select {...register("therapyAccess")} className={inputClass} defaultValue="">
              <option value="" disabled>Selecione...</option>
              <option value="Yes">Sim (Yes)</option>
              <option value="No">Não (No)</option>
            </select>
            {errors.therapyAccess && <p className={errorClass}>{errors.therapyAccess.message}</p>}
          </div>

        <div>
            <label className={labelClass}>Faixa Salarial (Anual em R$)</label>
            <select {...register("salaryRange")} className={inputClass} defaultValue="">
              <option value="" disabled>Selecione a faixa anual...</option>
              <option value="<40K">Menos de R$ 40.000</option>
              <option value="40-60K">R$ 40.000 a R$ 60.000</option>
              <option value="60-80K">R$ 60.000 a R$ 80.000</option>
              <option value="80-100K">R$ 80.000 a R$ 100.000</option>
              <option value="100K>">Acima de R$ 100.000</option>
            </select>
            {errors.salaryRange && <p className={errorClass}>{errors.salaryRange.message}</p>}
          </div>
        </div>

        {/* BOTÃO */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-8 px-8 py-4 rounded-full font-bold text-lg text-azul-gs bg-amarelo-medio-gs hover:bg-amarelo-escuro-gs hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60"
        >
          {isSubmitting ? "Analisando..." : "Enviar para Análise de IA"}
        </button>

      </form>
    </div>
  );
}