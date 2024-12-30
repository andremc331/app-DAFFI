import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';  // Importando os componentes do react-router-dom
import App from './App';
import LoginCadastro from './pages/Login';  // Importando a página única de login e cadastro
import GerarContrato from './pages/GerarContrato';
import RelatorioDiario from './pages/RelatorioDIario';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolvendo a aplicação com o BrowserRouter para usar o roteamento */}
      <Routes> {/* Definindo as rotas da aplicação */}
        <Route path="/" element={<LoginCadastro />} /> {/* Página única de Login/Cadastro */}
        <Route path="/orcamentos" element={<App />} /> {/* Página de Orçamentos */}
        <Route path="/gerar-contrato" element={<GerarContrato />} />
        <Route path="/relatorios" element={<RelatorioDiario />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);