import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const { pathname } = useLocation();

  // Verifica se a rota atual é a rota inicial ("/")
  const isInitialPage = location.pathname === "/"; 

  useEffect(() => {
    window.scrollTo(0, 0); // Rolagem para o topo ao mudar de rota
  }, [pathname]);

  return (
    <>
      {/* Renderiza a Navbar somente se NÃO estiver na página inicial */}
      {!isInitialPage && <Navbar />}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
