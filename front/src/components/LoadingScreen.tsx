import React from 'react';
import StyledComponents from '../styled/Orcamentostyled'; // Importar os componentes estilizados
import logo from "../images/logo.jpg"; // Importe a logo da sua empresa
import styled from 'styled-components';

const LoadingScreen: React.FC = () => {
  return (
    <LoadingContainer>
      <Logo src={logo} alt="Logo da Empresa" />
      <LoadingMessage>Experimente nossa nova plataforma de orçamentos</LoadingMessage>
    </LoadingContainer>
  );
};

export default LoadingScreen;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fff;
  flex-direction: column;
  text-align: center;
`;

const LoadingMessage = styled.h3`
  font-size: 24px;
  color: #333;
  margin-top: 20px;
`;

const Logo = styled.img`
  width: 150px; /* Ajuste o tamanho da logo conforme necessário */
  height: auto;
`;