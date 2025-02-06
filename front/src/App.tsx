import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';  // Importando os componentes do react-router-dom
import LoginCadastro from './pages/Login';  // Importando a página única de login e cadastro
import GerarContrato from './pages/GerarContrato';
import RelatorioDiario from './pages/RelatorioDIario';
import Orcamentos from './pages/Orcamentos';
import HomePage from './pages/HomePage';
import Sobre from './pages/Sobre';
import FaleConosco from './pages/FaleConosco';

const App: React.FC = () => {
  return (
    <BrowserRouter> {/* Envolvendo a aplicação com o BrowserRouter para usar o roteamento */}
      <Routes> {/* Definindo as rotas da aplicação */}
      <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginCadastro />} /> {/* Página única de Login/Cadastro */}
        <Route path="/orcamentos" element={<Orcamentos />} /> {/* Página de Orçamentos */}
        <Route path="/gerar-contrato" element={<GerarContrato />} />
        <Route path="/relatorios" element={<RelatorioDiario />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/faleconosco" element={<FaleConosco />} />
      </Routes>
    </BrowserRouter>
    );
};

export default App;