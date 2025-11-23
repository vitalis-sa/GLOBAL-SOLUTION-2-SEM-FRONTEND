import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFuncionarios } from "../context/FuncionarioContext";
import { API_VITALIS } from "../api/vitalis-api";
import {
  funcionarioSchema,
  type FuncionarioFormData,
  type FuncionarioApiPayload,
} from "../schemas/funcionario-schema";

interface Departamento {
  id: number;
  nome: string;
}

export function FuncionarioForm() {
  const { saveFuncionario } = useFuncionarios();
  const navigate = useNavigate();
  
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(funcionarioSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      cargo: "",
      emailEndereco: "",
      telefoneNumero: "",
    }
  });

  useEffect(() => {
    async function fetchDepartamentos() {
      try {
        const response = await fetch(`${API_VITALIS}/departamentos`);
        if (response.ok) {
          const data = await response.json();
          setDepartamentos(data);
        } else {
          console.error("Erro ao buscar departamentos: " + response.statusText);
        }
      } catch (error) {
        console.error("Erro de conexão ao buscar departamentos:", error);
      }
    }

    fetchDepartamentos();
  }, []);

  const onSubmit: SubmitHandler<FuncionarioFormData> = async (data) => {
    try {
      const tel = data.telefoneNumero || "";
      const dddStr = tel.substring(0, 2);
      const numStr = tel.substring(2);

      const payload: FuncionarioApiPayload = {
        idDepartamento: data.idDepartamento,
        nome: data.nome,
        cpf: data.cpf,
        idade: data.idade,
        genero: data.genero,
        cargo: data.cargo,
        anosEmpresa: data.anosEmpresa,
        horasTrabalho: data.horasTrabalho,
        trabalhoRemoto: data.trabalhoRemoto,
        
        email: {
          endereco: data.emailEndereco,
          status: "A",
        },
        
        telefone: {
          ddi: 55,
          ddd: parseInt(dddStr) || 0,
          numero: parseInt(numStr) || 0,
          tipo: data.telefoneTipo,
          status: true,
        },
      };

      console.log("Enviando payload:", payload);

      await saveFuncionario(payload);
      
      alert("Funcionário cadastrado com sucesso!");
      reset();
      navigate("/funcionarios"); // Redireciona para a lista
      
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar. Verifique o console.");
    }
  };

  // --- ESTILOS DARK MODE ---
  const inputBaseClasses = "w-full p-3 rounded-lg border text-base transition-colors focus:outline-none focus:ring-2 focus:ring-amarelo-medio-gs focus:border-transparent";
  const inputNormalClasses = "bg-white border-gray-200 text-texto-escuro placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white";
  const inputErrorClasses = "bg-red-50 border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500";
  
  // Labels: Azul no claro, Azul Claro no escuro para contraste
  const labelClasses = "text-sm font-bold text-azul-gs dark:text-blue-400 ml-1 mb-1 block transition-colors";
  
  // Títulos: Azul no claro, Branco no escuro
  const sectionTitleClasses = "text-xl font-bold text-azul-gs dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2 mb-6 mt-2 transition-colors";

  return (
    <div className="bg-branco-gs dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-t-4 border-amarelo-medio-gs p-8 md:p-12 transition-colors duration-300">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* SEÇÃO 1: DADOS PESSOAIS */}
        <div>
          <h3 className={sectionTitleClasses}>Dados Pessoais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Nome */}
            <div>
              <label className={labelClasses}>Nome Completo</label>
              <input 
                type="text" 
                placeholder="Ex: Maria Silva" 
                {...register("nome")} 
                className={`${inputBaseClasses} ${errors.nome ? inputErrorClasses : inputNormalClasses}`} 
              />
              {errors.nome && <p className="text-red-500 text-xs ml-1 mt-1">{errors.nome?.message}</p>}
            </div>

            {/* CPF */}
            <div>
              <label className={labelClasses}>CPF</label>
              <input 
                type="text" 
                placeholder="Apenas números" 
                maxLength={11} 
                {...register("cpf")} 
                className={`${inputBaseClasses} ${errors.cpf ? inputErrorClasses : inputNormalClasses}`} 
              />
              {errors.cpf && <p className="text-red-500 text-xs ml-1 mt-1">{errors.cpf?.message}</p>}
            </div>

            {/* Idade */}
            <div>
              <label className={labelClasses}>Idade</label>
              <input 
                type="number" 
                placeholder="Ex: 30"
                {...register("idade", { valueAsNumber: true })} 
                className={`${inputBaseClasses} ${errors.idade ? inputErrorClasses : inputNormalClasses}`} 
              />
              {errors.idade && <p className="text-red-500 text-xs ml-1 mt-1">{errors.idade?.message}</p>}
            </div>

            {/* Gênero */}
            <div>
              <label className={labelClasses}>Gênero</label>
              <select 
                {...register("genero")} 
                className={`${inputBaseClasses} ${errors.genero ? inputErrorClasses : inputNormalClasses}`} 
                defaultValue=""
              >
                <option value="" disabled>Selecione...</option>
                <option value="Female">Feminino</option>
                <option value="Male">Masculino</option>
                <option value="Non-binary">Não-binário</option>
                <option value="Prefer not to say">Prefiro não dizer</option>
              </select>
              {errors.genero && <p className="text-red-500 text-xs ml-1 mt-1">{errors.genero?.message}</p>}
            </div>
          </div>
        </div>

        {/* SEÇÃO 2: DADOS CORPORATIVOS */}
        <div>
          <h3 className={sectionTitleClasses}>Dados Corporativos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* ID Departamento */}
            <div>
              <label className={labelClasses}>Departamento</label>
              <select
                {...register("idDepartamento", { valueAsNumber: true })}
                className={`${inputBaseClasses} ${errors.idDepartamento ? inputErrorClasses : inputNormalClasses}`}
                defaultValue=""
              >
                <option value="" disabled>Selecione o departamento...</option>
                {departamentos.length === 0 && (
                  <option value="" disabled>Carregando departamentos...</option>
                )}
                {departamentos.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.nome}
                  </option>
                ))}
              </select>
              {errors.idDepartamento && <p className="text-red-500 text-xs ml-1 mt-1">{errors.idDepartamento?.message}</p>}
            </div>

            {/* Cargo */}
            <div>
              <label className={labelClasses}>Cargo</label>
              <input 
                type="text" 
                placeholder="Ex: Desenvolvedor Jr"
                {...register("cargo")} 
                className={`${inputBaseClasses} ${errors.cargo ? inputErrorClasses : inputNormalClasses}`} 
              />
              {errors.cargo && <p className="text-red-500 text-xs ml-1 mt-1">{errors.cargo?.message}</p>}
            </div>

            {/* Anos Empresa */}
            <div>
              <label className={labelClasses}>Tempo de Casa (anos)</label>
              <input 
                type="number" 
                {...register("anosEmpresa", { valueAsNumber: true })} 
                className={`${inputBaseClasses} ${errors.anosEmpresa ? inputErrorClasses : inputNormalClasses}`} 
              />
              {errors.anosEmpresa && <p className="text-red-500 text-xs ml-1 mt-1">{errors.anosEmpresa?.message}</p>}
            </div>

            {/* Horas Trabalho */}
            <div>
              <label className={labelClasses}>Horas Semanais</label>
              <input 
                type="number" 
                {...register("horasTrabalho", { valueAsNumber: true })} 
                className={`${inputBaseClasses} ${errors.horasTrabalho ? inputErrorClasses : inputNormalClasses}`} 
              />
              {errors.horasTrabalho && <p className="text-red-500 text-xs ml-1 mt-1">{errors.horasTrabalho?.message}</p>}
            </div>

            {/* Trabalho Remoto */}
            <div className="md:col-span-2">
              <label className={labelClasses}>Modelo de Trabalho</label>
              <select 
                {...register("trabalhoRemoto")} 
                className={`${inputBaseClasses} ${errors.trabalhoRemoto ? inputErrorClasses : inputNormalClasses}`} 
                defaultValue=""
              >
                <option value="" disabled>Selecione...</option>
                <option value="Hybrid">Híbrido</option>
                <option value="Yes">Remoto (100%)</option>
                <option value="No">Presencial</option>
              </select>
              {errors.trabalhoRemoto && <p className="text-red-500 text-xs ml-1 mt-1">{errors.trabalhoRemoto?.message}</p>}
            </div>
          </div>
        </div>

        {/* SEÇÃO 3: CONTATO */}
        <div>
          <h3 className={sectionTitleClasses}>Informações de Contato</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Email */}
            <div className="md:col-span-2">
              <label className={labelClasses}>E-mail Corporativo</label>
              <input 
                type="email" 
                placeholder="funcionario@empresa.com" 
                {...register("emailEndereco")} 
                className={`${inputBaseClasses} ${errors.emailEndereco ? inputErrorClasses : inputNormalClasses}`} 
              />
              {errors.emailEndereco && <p className="text-red-500 text-xs ml-1 mt-1">{errors.emailEndereco?.message}</p>}
            </div>

            {/* Telefone Numero */}
            <div>
              <label className={labelClasses}>Telefone (DDD + Número)</label>
              <input 
                type="text" 
                placeholder="11999999999" 
                maxLength={11} 
                {...register("telefoneNumero")} 
                className={`${inputBaseClasses} ${errors.telefoneNumero ? inputErrorClasses : inputNormalClasses}`} 
              />
              {errors.telefoneNumero && <p className="text-red-500 text-xs ml-1 mt-1">{errors.telefoneNumero?.message}</p>}
            </div>

            {/* Telefone Tipo */}
            <div>
              <label className={labelClasses}>Tipo de Telefone</label>
              <select 
                {...register("telefoneTipo")} 
                className={`${inputBaseClasses} ${errors.telefoneTipo ? inputErrorClasses : inputNormalClasses}`} 
                defaultValue=""
              >
                <option value="" disabled>Selecione...</option>
                <option value="Celular">Celular</option>
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
              </select>
              {errors.telefoneTipo && <p className="text-red-500 text-xs ml-1 mt-1">{errors.telefoneTipo?.message}</p>}
            </div>
          </div>
        </div>

        {/* BOTÃO */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-8 px-8 py-4 rounded-full font-bold text-lg text-azul-gs bg-amarelo-medio-gs hover:bg-amarelo-escuro-gs hover:text-white shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-md transition-all duration-300 uppercase tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar Funcionário"}
        </button>

      </form>
    </div>
  );
}