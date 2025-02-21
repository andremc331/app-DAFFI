import React from 'react';
import logo from "../images/logo.jpg"; // Logo da sua empresa
import styled, { keyframes } from 'styled-components';

const LoadingScreen: React.FC = () => {
  return (
    <LoadingContainer>
      <Logo src={logo} alt="Logo da Empresa" />
      <LoadingMessage>Experimente nossa nova plataforma de orçamentos</LoadingMessage>
      <Spinner />
    </LoadingContainer>
  );
};

export default LoadingScreen;

// Definindo as animações com keyframes
const logoFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const textFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #f0f0f0, #ffffff); /* Gradiente suave */
  flex-direction: column;
  text-align: center;
  opacity: 0.9;
  animation: ${fadeIn} 1s ease-out; /* Animação suave para o fundo */
`;

const Logo = styled.img`
  width: 120px; /* Ajuste o tamanho da logo conforme necessário */
  height: auto;
  margin-bottom: 30px;
  animation: ${logoFadeIn} 1s ease-out;
`;

const LoadingMessage = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #444;
  letter-spacing: 1px;
  margin-bottom: 20px;
  animation: ${textFadeIn} 1s ease-out;
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #3498db; /* Cor de destaque */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1.5s linear infinite;
`;