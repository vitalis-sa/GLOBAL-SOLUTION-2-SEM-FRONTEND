import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // 1. Inicializa o estado
  const [theme, setTheme] = useState<Theme>(() => {
    // A. Verifica se o usuário já escolheu antes
    const storedTheme = localStorage.getItem("vitalis-theme") as Theme;
    if (storedTheme) {
      return storedTheme;
    }

    // B. Se não, verifica a preferência do sistema operacional
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    
    return "light";
  });

  // 2. Efeito que aplica a classe no HTML sempre que o tema muda
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove a classe antiga e adiciona a nova
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Persiste a escolha no LocalStorage
    localStorage.setItem("vitalis-theme", theme);
  }, [theme]);

  // 3. Função para alternar
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para facilitar o uso
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
}