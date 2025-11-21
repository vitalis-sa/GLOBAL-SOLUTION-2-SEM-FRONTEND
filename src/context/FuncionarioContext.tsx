/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext } from "react";
import type { FuncionarioApiPayload } from "../schemas/funcionario-schema";
import { API_VITALIS } from "../api/vitalis-api";

// Ajuste para a URL do seu backend Quarkus
const API_BASE_URL = API_VITALIS; 

interface FuncionarioContextProps {
  saveFuncionario: (funcionario: FuncionarioApiPayload) => Promise<void>;
}

export const FuncionarioContext = createContext<FuncionarioContextProps>(
  {} as FuncionarioContextProps
);

export function FuncionarioProvider({ children }: { children: React.ReactNode }) {
  
  const saveFuncionario = useCallback(async (data: FuncionarioApiPayload) => {
    const response = await fetch(`${API_BASE_URL}/funcionarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Tenta pegar a mensagem de erro do backend se houver
      const errorText = await response.text();
      throw new Error(errorText || `Erro ${response.status}: Falha ao cadastrar funcionário`);
    }
    
    console.log("Funcionário cadastrado com sucesso!");
  }, []);

  return (
    <FuncionarioContext.Provider value={{ saveFuncionario }}>
      {children}
    </FuncionarioContext.Provider>
  );
}

export const useFuncionarios = () => {
  return useContext(FuncionarioContext);
};