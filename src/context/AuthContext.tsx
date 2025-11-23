import { createContext, useCallback, useState, useContext, useEffect } from "react";
import { API_VITALIS } from "../api/vitalis-api";

const USER_STORAGE_KEY = "vitalis:user";

interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  cargo: string;
  idDepartamento: number;
  email?: {
    endereco: string;
  };
}

interface AuthContextProps {
  user: Usuario | null;
  isAuthenticated: boolean;
  login: (cpf: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carregarUsuarioStorage = () => {
      try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao ler localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    carregarUsuarioStorage();
  }, []);

  const login = useCallback(async (cpf: string) => {
    const cleanCpf = cpf.replace(/\D/g, "");

    try {
      const response = await fetch(`${API_VITALIS}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf: cleanCpf }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("CPF não encontrado. Verifique se o cadastro foi realizado.");
        }
        throw new Error(`Erro no servidor: ${response.statusText}`);
      }

      const data: Usuario = await response.json();

      setUser(data);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
      
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Adicionamos este comentário para permitir a exportação do hook no mesmo arquivo,
// já que é um padrão útil e seguro neste caso. TEM QUE VER SE NAO DA RUIM NO DEPLOY
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};