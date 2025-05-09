import React, { useState } from 'react';
import axios from 'axios';
import StyledComponents from '../styled/Orcamentostyled';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importando o hook do contexto de autenticação
import LoadingScreen from '../components/LoadingScreen'; // Importando a tela de carregamento

const { Input, Button, Button2, ErrorMessage, Container } = StyledComponents;

const LoginCadastro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [erro, setErro] = useState('');
  const [isCadastro, setIsCadastro] = useState(false); // Alternar entre login e cadastro
  const [isLoading, setIsLoading] = useState(false); // Indicador de carregamento
  const navigate = useNavigate();

  const { login } = useAuth(); // Obtendo a função de login do contexto de autenticação
  const BASE_URL = process.env.REACT_APP_BASE_URL || '192.168.15.116:3001';

  // define campos obrigatórios e manda o post para salvar o usuário 
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
      login(); // Chama o login após o sucesso da autenticação

      // Redireciona para a página de orçamentos após o login
      navigate('/orcamentos');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Erro ao realizar a operação';
      setErro(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen />; // Mostra a tela de carregamento enquanto o login está sendo processado
  }

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
      <p style={{ fontSize: '12px', color: 'gray' }}>teste@gmail.com </p>

      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
      />
      <p style={{ fontSize: '12px', color: 'gray' }}>123456</p>

      {erro && <ErrorMessage>{erro}</ErrorMessage>}
      <Button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Carregando...' : isCadastro ? 'Cadastrar' : 'Login'}
      </Button>
      <Button onClick={() => setIsCadastro(!isCadastro)} disabled={isLoading}>
        {isCadastro
          ? 'Já tem uma conta? Faça login'
          : 'Não tem conta? Cadastre-se'}
      </Button>

      <Button2 onClick={() => navigate('/')}>Voltar para Home</Button2>
    </Container>
  );
};

export default LoginCadastro;