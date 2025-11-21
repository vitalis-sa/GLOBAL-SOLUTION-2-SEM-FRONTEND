/* eslint-disable no-irregular-whitespace */
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NotFound } from "./pages/not-found"
import { lazy, Suspense } from "react"
import { Loading } from "./components/loading"
import { DialogflowChat } from "./components/vitas"
import { AuthProvider } from "./context/AuthContext"
import { FuncionarioProvider } from "./context/FuncionarioContext" // <-- 1. Importar Provider

function App() {

  // ... (todos os seus lazy imports existentes)
  const Home = lazy(() =>
    import("./pages/home").then((m) => ({ default: m.Home }))
  );
  const Contato = lazy(() =>
    import("./pages/contato").then((m) => ({ default: m.Contato }))
  );
  const Faq = lazy(() =>
    import("./pages/faq").then((m) => ({ default: m.Faq }))
  );

  const Login = lazy(() =>
    import("./pages/login").then((m) => ({ default: m.Login }))
  );

  const Integrantes = lazy(() =>
    import("./pages/integrantes").then((m) => ({ default: m.Integrantes }))
  );
  const About = lazy(() =>
    import("./pages/about").then((m) => ({ default: m.About }))
  );
  const PacientesPage = lazy(() =>
    import("./pages/PacientesPage").then((m) => ({ default: m.PacientesPage }))
  );


  // --- 2. Importar a página de Cadastro de Funcionário ---
  const CadastroFuncionarioPage = lazy(() =>
    import("./pages/CadastroFuncionarioPage").then((m) => ({ default: m.CadastroFuncionarioPage }))
  );


  return (
    <BrowserRouter>
      <AuthProvider>
              {/* --- 3. Envolver com o FuncionarioProvider --- */}
              <FuncionarioProvider>
                <DialogflowChat />
                <Suspense fallback={<Loading />}>
                  <Routes>
                    <Route>
                      <Route index element={<Home />} />
                      <Route path="/" element={<Home />} />

                      <Route path="/integrantes" element={<Integrantes />} />
                      <Route path="/contato" element={<Contato />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/faq/:id?" element={<Faq />} />

                      <Route path="/about" element={<About />} />

                      <Route path="/pacientes" element={<PacientesPage />} />
              

                      {/* --- 4. Nova Rota --- */}
                      <Route path="/funcionarios/cadastro" element={<CadastroFuncionarioPage />} />

                      <Route path="*" element={<NotFound />} />
                    </Route>
                  </Routes>
                </Suspense>
              </FuncionarioProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App