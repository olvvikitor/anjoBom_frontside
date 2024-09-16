import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();

  // Verifica se a rota atual é a rota inicial ("/")
  const isInitialPage = location.pathname === "/"; 

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
