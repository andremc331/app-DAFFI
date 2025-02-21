import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';  // Importando os componentes do react-router-dom
import LoginCadastro from './pages/Login';  // Importando a página única de login e cadastro
import GerarContrato from './pages/GerarContrato';
import RelatorioDiario from './pages/RelatorioDIario';
import Orcamentos from './pages/Orcamentos';
import HomePage from './pages/HomePage';
import Sobre from './pages/Sobre';
import FaleConosco from './pages/FaleConosco';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider> {/* Envolvendo toda a aplicação com o AuthProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginCadastro />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/faleconosco" element={<FaleConosco />} />
          
          {/* Rotas protegidas */}
          <Route path="/orcamentos" element={<ProtectedRoute element={<Orcamentos />} />} />
          <Route path="/gerar-contrato" element={<ProtectedRoute element={<GerarContrato />} />} />
          <Route path="/relatorios" element={<ProtectedRoute element={<RelatorioDiario />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;