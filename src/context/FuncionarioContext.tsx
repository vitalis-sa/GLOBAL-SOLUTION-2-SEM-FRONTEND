/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from "react";
import type { FuncionarioApiPayload } from "../schemas/funcionario-schema";
import { API_VITALIS } from "../api/vitalis-api";
import type { Funcionario } from "../types/funcionario";

// Ajuste para a URL do seu backend Quarkus
const API_BASE_URL = API_VITALIS; 

interface FuncionarioContextProps {
  funcionarios: Funcionario[];
  fetchFuncionarios: () => Promise<void>;
  saveFuncionario: (funcionario: FuncionarioApiPayload) => Promise<void>;
  removeFuncionario: (id: number) => Promise<void>;
}

export const FuncionarioContext = createContext<FuncionarioContextProps>(
  {} as FuncionarioContextProps
);

export function FuncionarioProvider({ children }: { children: React.ReactNode }) {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  
  const fetchFuncionarios = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/funcionarios`);
      if (!response.ok) throw new Error("Falha ao buscar funcionários");
      const data = await response.json();
      setFuncionarios(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const saveFuncionario = useCallback(async (data: FuncionarioApiPayload) => {
    const response = await fetch(`${API_BASE_URL}/funcionarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Erro ${response.status}: Falha ao cadastrar`);
    }
    
    await fetchFuncionarios(); // Atualiza a lista após salvar
  }, [fetchFuncionarios]);

  const removeFuncionario = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/funcionarios/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Falha ao excluir funcionário");
      await fetchFuncionarios(); // Atualiza a lista após excluir
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir. Tente novamente.");
    }
  }, [fetchFuncionarios]);

  return (
    <FuncionarioContext.Provider value={{ funcionarios, fetchFuncionarios, saveFuncionario, removeFuncionario }}>
      {children}
    </FuncionarioContext.Provider>
  );
}

export const useFuncionarios = () => {
  return useContext(FuncionarioContext);
};