  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import App from './App.jsx'
  import { createBrowserRouter, RouterProvider } from 'react-router-dom'
  import './index.css'
  import Initial from './router/dodor/initial/Initial.jsx'
  import Sobre from './router/dodor/sobre/Sobre.jsx'
  import AcoesRealizadas from './router/dodor/acoesRealizadas/AcoesRealizadas.jsx'
 import DetalhesAcoesRealizadas from './router/dodor/acoesRealizadas/detalhes/DetalhesAcoesRealizadas.jsx'
  import PontosColeta from './router/dodor/pontosColeta/PontosColeta.jsx'
  import FormDoador from './router/dodor/formDoador/FormDoador.jsx'
  import AgendaDoacao from './router/dodor/agendaDoacao/AgendaDoacao.jsx'
  import EtapaConfirmacao from './router/dodor/etapaConfirmacaoDoador/EtapaConfirmacao.jsx'
  import FormEnderecoDoador from './router/dodor/formEnderecoDoador/FormEnderecoDoador.jsx'
  import CategoriaDoacao from './router/dodor/categoriasDoacao/CategoriaDoacao.jsx'
  import ScrollToTop from './components/ScrollToTop.jsx'
  import CategoriaDoacaoPosCrir from './router/dodor/categoriasDoacao/doacaoPosCriar/CategoriaDoacaoPosCriar.jsx'

  const router = createBrowserRouter([
    {
      path: '/',
      element: <App/>,
      children: [
        {
          path: '/',
          element: <Initial/>,
        },
        {
          path: 'sobre',
          element: <Sobre/>,
        },
        {
          path: 'acoesRealizadas',
          element: <AcoesRealizadas/>,
        },
        {
          path: 'acoesRealizadas/detalhes',
          element: <DetalhesAcoesRealizadas/>,
        },
        {
          path: 'pontosColeta',
          element: <PontosColeta/>,
        },
        {
          path: 'agendaDoacao',
          element: <AgendaDoacao/>
        },
        {
          path: 'etapaConfirmacaoDoador',
          element: <EtapaConfirmacao/>
        },
        {
          path: 'formEnderecoDoador',
          element: <FormEnderecoDoador/>
        },
        {
          path: 'categoriaDoacao',
          element: <CategoriaDoacao/>
        },
        {
          path: 'categoriaDoacaoPosCriar',
          element: <CategoriaDoacaoPosCrir/>
        },
        {
          path: 'formDoador',
          element: <FormDoador/>,
        }
      ]
    }
  ])

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider router={router}>
        <ScrollToTop /> {/* Dentro do RouterProvider */}
      </RouterProvider>
    </StrictMode>
  );

