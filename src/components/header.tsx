import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import atende_mais from "../assets/atende+.png";
import { useAuth } from "../context/AuthContext"; 

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const { user, logout } = useAuth();

  // --- Lista Unificada de Links (Todos visíveis) ---
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "Sobre" },
    { to: "/integrantes", label: "Integrantes" },
    { to: "/faq", label: "FAQ" },
    { to: "/teste", label: "Teste" },
    { to: "/pacientes", label: "Pacientes" },
    { to: "/cadastrar", label: "Cadastrar" },
    { to: "/consultas/cadastro", label: "Agendar" },
    { to: "/contato", label: "Contato" },
  ];

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout(); 
    handleLinkClick(); 
    navigate("/"); 
  };

  return (
    <nav className="bg-azul-gs shadow-lg w-full h-[80px] flex items-center px-5 md:px-10 sticky top-0 z-50 transition-colors duration-300">
      {/* Logo */}
      <Link 
        to="/" 
        className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        onClick={handleLinkClick} 
      >
        <img src={atende_mais} alt="Logo Equilibrium" className="max-w-[120px] h-auto drop-shadow-sm" />
      </Link>

      {/* --- MENU DESKTOP --- */}
      <div className="hidden lg:flex gap-5 ml-auto items-center">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-all duration-300 ${
                isActive 
                  ? "text-amarelo-medio-gs font-bold border-b-2 border-amarelo-escuro-gs pb-1" 
                  : "text-branco-gs hover:text-amarelo-claro-gs hover:-translate-y-0.5"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        {/* Botão Login/Logout Desktop */}
        <div className="pl-4 border-l border-branco-gs/20 ml-2">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-branco-gs text-sm font-medium hidden xl:inline">
                Olá, <span className="text-amarelo-claro-gs">{user.nome.split(' ')[0]}</span>
              </span>
              <button
                onClick={handleLogout}
                className="font-bold text-sm bg-amarelo-escuro-gs text-branco-gs px-5 py-2 rounded-full hover:bg-amarelo-medio-gs hover:shadow-md transition-all"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="font-bold text-sm bg-amarelo-medio-gs text-azul-gs px-6 py-2 rounded-full hover:bg-amarelo-claro-gs hover:shadow-lg transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Botão Hamburger Mobile */}
      <button
        className="lg:hidden text-branco-gs ml-auto hover:text-amarelo-medio-gs transition-colors"
        onClick={() => setOpen(!open)}
        aria-label="Abrir menu"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* --- MENU MOBILE --- */}
      {open && (
        <div className="absolute top-[80px] left-0 w-full bg-azul-gs/95 backdrop-blur-md shadow-xl flex flex-col items-center gap-6 py-8 lg:hidden z-40 border-t border-branco-gs/10">
          {links.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={handleLinkClick}
                className={`text-lg font-medium transition-colors ${
                  isActive 
                    ? "text-amarelo-medio-gs font-bold border-b-2 border-amarelo-escuro-gs" 
                    : "text-branco-gs hover:text-amarelo-claro-gs"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mt-4 pt-6 border-t border-branco-gs/20 w-3/4 flex flex-col items-center gap-4">
            {user ? (
              <>
                <span className="text-branco-gs text-lg">
                  Olá, <span className="text-amarelo-claro-gs font-bold">{user.nome.split(' ')[0]}</span>!
                </span>
                <button
                  onClick={handleLogout}
                  className="font-bold text-lg bg-amarelo-escuro-gs text-branco-gs px-8 py-2 rounded-full w-full max-w-xs shadow-md active:scale-95 transition-transform"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="font-bold text-lg bg-amarelo-medio-gs text-azul-gs px-8 py-2 rounded-full w-full max-w-xs text-center shadow-md active:scale-95 transition-transform"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}