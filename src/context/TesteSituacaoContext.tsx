/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext } from "react";
import type { TesteSituacaoApiPayload } from "../schemas/teste-situacao-schema";
import { API_VITALIS } from "../api/vitalis-api";

// Endpoint do backend Java
const API_TESTES_SITUACAO_ENDPOINT = `${API_VITALIS}/testes-situacao`;

interface TesteSituacaoContextProps {
  saveTesteSituacao: (data: TesteSituacaoApiPayload) => Promise<void>;
}

export const TesteSituacaoContext = createContext<TesteSituacaoContextProps>(
  {} as TesteSituacaoContextProps
);

export function TesteSituacaoProvider({ children }: { children: React.ReactNode }) {
  
  const saveTesteSituacao = useCallback(async (data: TesteSituacaoApiPayload) => {
    const response = await fetch(API_TESTES_SITUACAO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Erro ${response.status}: Falha ao salvar teste de situação`);
    }
    
    console.log("Teste de situação salvo com sucesso!");
  }, []);

  return (
    <TesteSituacaoContext.Provider value={{ saveTesteSituacao }}>
      {children}
    </TesteSituacaoContext.Provider>
  );
}

export const useTesteSituacao = () => {
  return useContext(TesteSituacaoContext);
};