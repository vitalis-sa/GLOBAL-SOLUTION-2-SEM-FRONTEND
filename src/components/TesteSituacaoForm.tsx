import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useTesteSituacao } from "../context/TesteSituacaoContext";
import { useAuth } from "../context/AuthContext";
import {
  testeSituacaoSchema,
  type TesteSituacaoFormData,
} from "../schemas/teste-situacao-schema";

export function TesteSituacaoForm() {
  const { saveTesteSituacao } = useTesteSituacao();
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(testeSituacaoSchema),
    defaultValues: {

      jobSatisfaction: undefined,
      stressLevel: undefined,
      productivityScore: undefined,
      managerSupportScore: undefined,
      workLifeScore: undefined,
      careerGrowthScore: undefined,
      sleepHours: undefined,
      physicalActivity: undefined,
      mentalHealthDaysOff: undefined,
      teamSize: undefined,
      mentalSupport: "No",
      therapyAccess: "No",
      salaryRange: "",
    }
  });

  useEffect(() => {
    if (user) {
      setValue("idFuncionario", user.id);
    }
  }, [user, setValue]);

  const onSubmit: SubmitHandler<TesteSituacaoFormData> = async (data) => {
    try {
      if (!user) return;
      const payload = { ...data, idFuncionario: user.id };
      
      console.log("Enviando teste:", payload);
      
      await saveTesteSituacao(payload);
      
      alert("Teste de Situação registrado com sucesso!");
      reset();
      navigate(`/dashboard`); 
    } catch (error) {
      console.error(error);
      alert("Erro ao registrar teste.");
    }
  };

  // Estilos Dark Mode
  const inputClass = "w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-texto-escuro dark:text-white focus:outline-none focus:border-blue-500 transition-colors";
  const labelClass = "font-semibold text-gray-700 dark:text-gray-300 mb-1 block text-sm transition-colors";
  const errorClass = "text-red-500 dark:text-red-400 text-xs mt-1";
  const sectionTitle = "text-lg font-bold text-azul-gs dark:text-blue-400 border-b border-gray-200 dark:border-gray-600 pb-1 mb-4 mt-6 transition-colors";

  if (!user) {
    return (
      <div className="bg-branco-gs dark:bg-gray-800 rounded-3xl shadow-xl border-t-4 border-amarelo-medio-gs p-12 text-center transition-colors">
        <h3 className="text-2xl font-bold text-azul-gs dark:text-white mb-4">Login Necessário</h3>
        <Link to="/login" className="inline-block bg-amarelo-medio-gs text-azul-gs font-bold py-3 px-8 rounded-full hover:bg-amarelo-escuro-gs hover:text-white transition-colors shadow-md">
          Fazer Login
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-branco-gs dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border-t-4 border-amarelo-medio-gs p-8 transition-colors duration-300">
      <div className="mb-6 p-4 bg-blue-50 dark:bg-gray-700 border border-blue-100 dark:border-gray-600 rounded-lg flex items-center gap-3 transition-colors">
        <span className="text-2xl">👤</span>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-300">Realizando teste como:</p>
          <p className="font-bold text-azul-gs dark:text-white text-lg">{user.nome}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("idFuncionario")} />

        <h3 className={sectionTitle}>Avaliação de Bem-Estar (0-10)</h3>
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

        <h3 className={sectionTitle}>Saúde Física e Contexto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Horas de Sono (média diária)</label>
            <input type="number" step="0.1" {...register("sleepHours", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 7" />
            {errors.sleepHours && <p className={errorClass}>{errors.sleepHours.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Atividade Física (min/sem)</label>
            <input type="number" step="0.1" {...register("physicalActivity", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 150" />
            {errors.physicalActivity && <p className={errorClass}>{errors.physicalActivity.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Dias de Afastamento (ano)</label>
            <input type="number" {...register("mentalHealthDaysOff", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 2" />
            {errors.mentalHealthDaysOff && <p className={errorClass}>{errors.mentalHealthDaysOff.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Tamanho da Equipe</label>
            <input type="number" {...register("teamSize", { valueAsNumber: true })} className={inputClass} placeholder="Ex: 5" />
            {errors.teamSize && <p className={errorClass}>{errors.teamSize.message}</p>}
          </div>
        </div>

        <h3 className={sectionTitle}>Informações Adicionais</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Apoio Mental?</label>
            <select {...register("mentalSupport")} className={inputClass} defaultValue="">
              <option value="" disabled>Selecione...</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
            </select>
            {errors.mentalSupport && <p className={errorClass}>{errors.mentalSupport.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Acesso Terapia?</label>
            <select {...register("therapyAccess")} className={inputClass} defaultValue="">
              <option value="" disabled>Selecione...</option>
              <option value="Yes">Sim</option>
              <option value="No">Não</option>
            </select>
            {errors.therapyAccess && <p className={errorClass}>{errors.therapyAccess.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Faixa Salarial</label>
            <select {...register("salaryRange")} className={inputClass} defaultValue="">
              <option value="" disabled>Selecione a faixa...</option>
              <option value="<40K">Menos de R$ 40.000</option>
              <option value="40-60K">R$ 40.000 a R$ 60.000</option>
              <option value="60-80K">R$ 60.000 a R$ 80.000</option>
              <option value="80-100K">R$ 80.000 a R$ 100.000</option>
              <option value="100K>">Acima de R$ 100.000</option>
            </select>
            {errors.salaryRange && <p className={errorClass}>{errors.salaryRange.message}</p>}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full mt-8 px-8 py-4 rounded-full font-bold text-lg text-azul-gs bg-amarelo-medio-gs hover:bg-amarelo-escuro-gs hover:text-white shadow-lg transition-all duration-300 disabled:opacity-60">
          {isSubmitting ? "Analisando..." : "Enviar para Análise de IA"}
        </button>
      </form>
    </div>
  );
}