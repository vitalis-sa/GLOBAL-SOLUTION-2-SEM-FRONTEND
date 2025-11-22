import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginSchema, type LoginFormData } from "../schemas/login-schema";

import { Header } from "../components/header";
import { Footer } from "../components/footer";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    setServerError(null);
    try {
      await login(data.cpf);
      // Redireciona para a área logada (ex: dashboard ou testes)
      navigate("/testes-situacao"); 
    } catch (error: unknown) {
      console.log(error);
      setServerError("Erro ao realizar login. Verifique os dados.");
    }
  }

  // Estilos
  const inputClass = "w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amarelo-medio-gs transition-all";
  const buttonClass = "w-full py-3 px-6 rounded-full bg-azul-gs text-white font-bold hover:bg-blue-900 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center";

  return (
    <div className="min-h-screen flex flex-col bg-bg-clarinho">
      <Header />

      {/* AJUSTE AQUI: Aumentei o padding vertical (py-12 no mobile, py-20 no desktop) */}
      <main className="flex-grow flex items-center justify-center px-6 py-12 md:py-20">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 bg-branco-gs rounded-3xl shadow-2xl overflow-hidden p-8 md:p-12">

          {/* Coluna Esquerda: Texto e Imagem Decorativa */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-azul-gs mb-2">Bem-vindo de volta!</h1>
              <p className="text-texto-escuro opacity-80 text-lg">
                Acesse a plataforma Vitalis para gerenciar seu bem-estar e receber suas recomendações periódicas.
              </p>
            </div>

            {/* Placeholder para imagem SVG ilustrativa */}
            <div className="hidden md:flex justify-center">
              <svg className="w-64 h-64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F4D35E" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.8,32.3C59.4,43.1,47.9,51.8,36.1,61.1C24.3,70.4,12.2,80.3,-0.8,81.7C-13.8,83.1,-27.6,76,-39.2,66.5C-50.8,57,-60.2,45.1,-67.6,31.9C-75,18.7,-80.4,4.2,-79.1,-9.8C-77.8,-23.8,-69.8,-37.3,-59.3,-47.7C-48.8,-58.1,-35.8,-65.4,-22.6,-73.1C-9.4,-80.8,4,-88.9,17.5,-89C31,-89.1,42,-79,44.7,-76.4Z" transform="translate(100 100)" opacity="0.5" />
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fill="#0D3B66" fontWeight="bold">Equilibrium</text>
              </svg>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Login */}
          <div className="w-full md:w-1/2 bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold text-azul-gs mb-6 text-center">Login do Colaborador</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">CPF</label>
                <input
                  type="text"
                  placeholder="Digite apenas números"
                  maxLength={11}
                  {...register("cpf")}
                  className={`${inputClass} ${errors.cpf ? "border-red-500 bg-red-50" : ""}`} 
                />
                {errors.cpf && (
                  <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>
                )}
              </div>

              {serverError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-700 text-sm">{serverError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={buttonClass}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Acessando...
                  </span>
                ) : (
                  "Entrar na Plataforma"
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                Ainda não tem cadastro?{" "}
                <Link 
                  to="/funcionarios/cadastro" 
                  className="text-amarelo-escuro-gs font-bold hover:underline"
                >
                  Cadastre-se aqui
                </Link>
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}