import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Initial from './router/initial/Initial.jsx'
import Sobre from './router/sobre/Sobre.jsx'
import AcoesRealizadas from './router/acoesRealizadas/AcoesRealizadas.jsx'
import PontosColeta from './router/pontosColeta/PontosColeta.jsx'
import FormDoador from './router/formDoador/FormDoador.jsx'
import AgendaDoacao from './router/agendaDoacao/AgendaDoacao.jsx'
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
        path: 'pontosColeta',
        element: <PontosColeta/>,
      },
      {
        path: 'agendaDoacao',
        element: <AgendaDoacao/>
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
    <RouterProvider router={router} />
  </StrictMode>,
)
