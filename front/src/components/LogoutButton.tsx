import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button'; // ou qualquer biblioteca de estilo que você estiver usando
// import styled from 'styled-components';


const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui você pode adicionar a lógica de logout, como limpar o token de autenticação
    localStorage.removeItem('authToken');  // Exemplo de remoção de token do localStorage
    sessionStorage.removeItem('authToken'); // Se estiver usando sessionStorage, pode remover também

    // Redireciona para a página de login ou qualquer outra página
    navigate('/');
  };

  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
};

export default LogoutButton;