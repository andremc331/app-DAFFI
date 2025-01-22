import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';  // Importando os componentes do react-router-dom
import LoginCadastro from './pages/Login';  // Importando a página única de login e cadastro
import GerarContrato from './pages/GerarContrato';
import RelatorioDiario from './pages/RelatorioDIario';
import Orcamentos from './pages/Orcamentos';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <BrowserRouter> {/* Envolvendo a aplicação com o BrowserRouter para usar o roteamento */}
      <Routes> {/* Definindo as rotas da aplicação */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginCadastro />} /> {/* Página única de Login/Cadastro */}
        <Route path="/orcamentos" element={<Orcamentos />} /> {/* Página de Orçamentos */}
        <Route path="/gerar-contrato" element={<GerarContrato />} />
        <Route path="/relatorios" element={<RelatorioDiario />} />
      </Routes>
    </BrowserRouter>
    );
};

export default App;