import React from 'react';
import { useNavigate } from 'react-router-dom';
import StyledComponents from '../styled/GlobalStyles'; // ou ajuste para o caminho real do styled
import LogoutButton from './LogoutButton'; // ajuste o caminho conforme necessário

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledComponents.Sidebar>
      <StyledComponents.SidebarItem onClick={() => navigate('/funcionarios')}>
        <span role="img" aria-label="Presença">👥</span> Presença
      </StyledComponents.SidebarItem>

      <StyledComponents.SidebarItem onClick={() => navigate('/dashboard')}>
        <span role="img" aria-label="Controle">📊</span> Indicadores
      </StyledComponents.SidebarItem>

      <StyledComponents.SidebarItem onClick={() => navigate('/gerar-contrato')}>
        <span role="img" aria-label="Contratos">📄</span> Contratos
      </StyledComponents.SidebarItem>

      <StyledComponents.SidebarItem onClick={() => navigate('/orcamentos')}>
        <span role="img" aria-label="Orçamentos">💰</span> Orçamentos
      </StyledComponents.SidebarItem>

      <StyledComponents.SidebarItem onClick={() => navigate('/relatorios')}>
        <span role="img" aria-label="Relatórios">📑</span> Relatórios
      </StyledComponents.SidebarItem>

      <StyledComponents.SidebarItem>
        <LogoutButton />
      </StyledComponents.SidebarItem>
    </StyledComponents.Sidebar>
  );
};

export default Sidebar;