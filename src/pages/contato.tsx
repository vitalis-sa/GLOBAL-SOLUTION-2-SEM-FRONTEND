import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { useState, type ChangeEvent, type FormEvent } from "react";
import contactUS from "../assets/contact-us-animate.svg";

interface ContactFormData {
  nome: string;
  telefone?: string;
  email: string;
  assunto: string;
  mensagem: string;
}

interface FormErrors {
  nome?: string;
  telefone?: string;
  email?: string;
  assunto?: string;
  mensagem?: string;
}

export function Contato() {
  const [form, setForm] = useState<ContactFormData>({
    nome: "",
    telefone: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Máscara simples de telefone
    if (name === "telefone") {
      let formatted = value.replace(/\D/g, "");
      if (formatted.length > 2) formatted = `(${formatted.slice(0, 2)}) ${formatted.slice(2)}`;
      if (formatted.length > 9) formatted = `${formatted.slice(0, 9)}-${formatted.slice(9, 13)}`;
      setForm(prev => ({ ...prev, [name]: formatted }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!form.nome.trim()) newErrors.nome = "É obrigatório preencher o nome";
    if (!form.email.trim()) newErrors.email = "E-mail obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "E-mail inválido";
    
    if (!form.assunto.trim()) newErrors.assunto = "Assunto obrigatório";
    if (!form.mensagem.trim()) newErrors.mensagem = "Mensagem obrigatória";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Mensagem enviada:", form);
      alert("Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.");
      setForm({
        nome: "",
        telefone: "",
        email: "",
        assunto: "",
        mensagem: "",
      });
    }
  };

  const inputBaseClasses = "w-full p-3 rounded-lg border text-base transition-colors focus:outline-none focus:ring-2 focus:ring-amarelo-medio-gs focus:border-transparent";
  const inputNormalClasses = "bg-white border-gray-200 text-texto-escuro placeholder-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white";
  const inputErrorClasses = "bg-red-50 border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500";
  const labelClasses = "text-sm font-semibold text-gray-600 dark:text-gray-300 ml-1 transition-colors";

  return (
    <>
      <Header />
      <main className="flex flex-col justify-center items-center py-16 px-4 bg-bg-clarinho dark:bg-gray-900 min-h-screen transition-colors duration-300">
        
        <div className="w-full max-w-6xl mx-auto mb-12 text-center">
           <h2 className="text-3xl md:text-4xl font-bold text-azul-gs dark:text-white mb-4 transition-colors">
             Fale com a <span className="text-amarelo-escuro-gs">Equilibrium</span>
           </h2>
           <p className="text-texto-escuro/70 dark:text-gray-300 max-w-2xl mx-auto text-lg transition-colors">
             Estamos aqui para ouvir você. Seja para tirar dúvidas, enviar sugestões ou solicitar suporte, nossa equipe está pronta para ajudar.
           </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch w-full max-w-6xl mx-auto gap-12 bg-branco-gs dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-t-4 border-amarelo-medio-gs transition-colors duration-300">

          {/* Coluna da Esquerda: Imagem e Info */}
          <div className="lg:w-[40%] bg-azul-gs/5 dark:bg-gray-700/30 p-8 md:p-12 flex flex-col justify-center items-center text-center lg:items-start lg:text-left relative transition-colors">
            {/* Elemento decorativo */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-amarelo-claro-gs rounded-full blur-3xl opacity-50 -z-10"></div>

            <img
              src={contactUS}
              alt="Ilustração de contato"
              className="w-full max-w-[350px] h-auto object-contain mb-8 drop-shadow-lg"
            />

            <div className="space-y-6 w-full">
              <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-azul-gs/10 dark:border-gray-600 hover:border-amarelo-medio-gs transition-colors group">
                 <h3 className="text-lg font-bold text-azul-gs dark:text-white mb-1 group-hover:text-amarelo-escuro-gs dark:group-hover:text-yellow-400 transition-colors">E-mail</h3>
                 <p className="text-texto-escuro/80 dark:text-gray-300 text-sm">contato@equilibrium.com.br</p>
              </div>

              <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-azul-gs/10 dark:border-gray-600 hover:border-amarelo-medio-gs transition-colors group">
                 <h3 className="text-lg font-bold text-azul-gs dark:text-white mb-1 group-hover:text-amarelo-escuro-gs dark:group-hover:text-yellow-400 transition-colors">Telefone</h3>
                 <p className="text-texto-escuro/80 dark:text-gray-300 text-sm">(11) 3385-8010</p>
                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Seg. a Sex. das 8h às 18h</p>
              </div>

              <div className="p-4 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-azul-gs/10 dark:border-gray-600 hover:border-amarelo-medio-gs transition-colors group">
                 <h3 className="text-lg font-bold text-azul-gs dark:text-white mb-1 group-hover:text-amarelo-escuro-gs dark:group-hover:text-yellow-400 transition-colors">Endereço</h3>
                 <p className="text-texto-escuro/80 dark:text-gray-300 text-sm">Av. Paulista, 1106 - 7º andar</p>
                 <p className="text-texto-escuro/80 dark:text-gray-300 text-sm">Bela Vista, São Paulo - SP</p>
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Formulário */}
          <div className="lg:w-[60%] p-8 md:p-12 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-azul-gs dark:text-white mb-6 transition-colors">Envie sua mensagem</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label htmlFor="nome" className={labelClasses}>Nome</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    placeholder="Seu nome completo"
                    value={form.nome}
                    onChange={handleChange}
                    className={`${inputBaseClasses} ${errors.nome ? inputErrorClasses : inputNormalClasses}`}
                  />
                  {errors.nome && <p className="text-red-500 text-xs ml-1 mt-1">{errors.nome}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="telefone" className={labelClasses}>Telefone (opcional)</label>
                  <input
                    type="text"
                    id="telefone"
                    name="telefone"
                    placeholder="(11) 99999-9999"
                    value={form.telefone}
                    onChange={handleChange}
                    className={`${inputBaseClasses} ${inputNormalClasses}`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className={labelClasses}>E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={`${inputBaseClasses} ${errors.email ? inputErrorClasses : inputNormalClasses}`}
                />
                {errors.email && <p className="text-red-500 text-xs ml-1 mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="assunto" className={labelClasses}>Assunto</label>
                <input
                  type="text"
                  id="assunto"
                  name="assunto"
                  placeholder="Sobre o que você quer falar?"
                  value={form.assunto}
                  onChange={handleChange}
                  className={`${inputBaseClasses} ${errors.assunto ? inputErrorClasses : inputNormalClasses}`}
                />
                {errors.assunto && <p className="text-red-500 text-xs ml-1 mt-1">{errors.assunto}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="mensagem" className={labelClasses}>Mensagem</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  placeholder="Digite sua mensagem aqui..."
                  value={form.mensagem}
                  onChange={handleChange}
                  rows={5}
                  className={`${inputBaseClasses} ${errors.mensagem ? inputErrorClasses : inputNormalClasses} resize-none`}
                />
                {errors.mensagem && <p className="text-red-500 text-xs ml-1 mt-1">{errors.mensagem}</p>}
              </div>

              <button
                type="submit"
                className="w-full md:w-auto md:min-w-[200px] mt-4 px-8 py-3 rounded-full font-bold text-azul-gs bg-amarelo-medio-gs hover:bg-amarelo-escuro-gs hover:text-white shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 active:shadow-md transition-all duration-300 uppercase tracking-wide text-sm"
              >
                Enviar Mensagem
              </button>

            </form>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}