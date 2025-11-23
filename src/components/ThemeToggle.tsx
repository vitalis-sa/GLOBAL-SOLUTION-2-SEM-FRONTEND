import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none border border-transparent"
      title={theme === "light" ? "Ativar Modo Escuro" : "Ativar Modo Claro"}
      aria-label="Alternar Tema"
    >
      {theme === "light" ? (
        <span className="text-xl">🌙Dark</span>
      ) : (
        <span className="text-xl">☀️Light</span>
      )}
    </button>
  );
}