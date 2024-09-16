import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Initial from './router/Initial.jsx'
import Sobre from './router/Sobre.jsx'
import AcoesRealizadas from './router/AcoesRealizadas.jsx'
import PontosColeta from './router/PontosColeta.jsx'

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
      }
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
