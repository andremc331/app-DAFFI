//login.tsx

import React, { useState } from 'react';
import axios from 'axios';
import StyledComponents from '../styled/Orcamentostyled';
import { useNavigate } from 'react-router-dom';

const { Input, Button, ErrorMessage, Container } = StyledComponents;

const LoginCadastro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [erro, setErro] = useState('');
  const [isCadastro, setIsCadastro] = useState(false); // Alternar entre login e cadastro
  const [isLoading, setIsLoading] = useState(false); // Indicador de carregamento
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Para controlar se o usuário está logado
  const navigate = useNavigate();

  const BASE_URL = 'http://192.168.15.116:3001';

  const handleSubmit = async () => {
    setErro('');
    setIsLoading(true);

    if (isCadastro && !name) {
      setErro('Nome é obrigatório');
      setIsLoading(false);
      return;
    }

    if (!email || !password) {
      setErro('Email e senha são obrigatórios');
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = isCadastro ? '/users/register' : '/users/login';
      const payload = isCadastro ? { name, email, password } : { email, password };
      const res = await axios.post(`${BASE_URL}${endpoint}`, payload);

      localStorage.setItem('token', res.data.token); // Salva o token (melhor usar cookies seguros)
      setIsLoggedIn(true); // Usuário está logado
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Erro ao realizar a operação';
      setErro(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <h2>{isCadastro ? 'Cadastro' : 'Login'}</h2>
      {isCadastro && (
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
        />
      )}
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
      />
      {erro && <ErrorMessage>{erro}</ErrorMessage>}
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Carregando...' : isCadastro ? 'Cadastrar' : 'Login'}
      </Button>
      <Button onClick={() => setIsCadastro(!isCadastro)} disabled={isLoading}>
        {isCadastro
          ? 'Já tem uma conta? Faça login'
          : 'Não tem conta? Cadastre-se'}
      </Button>

      {/* Exibir os botões de navegação após o login */}
      {isLoggedIn && (
        <div>
          <Button onClick={() => navigate('/orcamentos')}>Ir para Orçamentos</Button>
          <Button onClick={() => navigate('/gerar-contrato')}>Gerar Contrato</Button>
        </div>
      )}
    </Container>
  );
};

export default LoginCadastro;