import React, { useState } from 'react';
import axios from 'axios';
import StyledComponents from './styled';
import { useNavigate } from 'react-router-dom';

const { Input, Button, ErrorMessage, Container } = StyledComponents;

const LoginCadastro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');
  const [isCadastro, setIsCadastro] = useState(false); // Gerencia se está no modo de cadastro ou login
  const navigate = useNavigate();

  const BASE_URL = 'http://192.168.15.116:3001';

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/login`, { email, senha });
      localStorage.setItem('token', res.data.token);  // Armazena o token no localStorage
      navigate('/orcamentos');  // Redireciona para a página de orçamentos após login
    } catch (err) {
      setErro('Erro ao fazer login');
      console.error('Erro ao fazer login', err);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/cadastro`, { nome, email, senha });
      if (res.status === 201) {
        localStorage.setItem('token', res.data.token);  // Armazena o token após cadastro
        navigate('/orcamentos');  // Redireciona para a página de orçamentos após cadastro
      }
    } catch (err) {
      setErro('Erro ao cadastrar usuário');
      console.error('Erro ao cadastrar usuário', err);
    }
  };

  return (
    <Container>
      <h2>{isCadastro ? 'Cadastro' : 'Login'}</h2>
      {isCadastro && (
        <Input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
      />
      {erro && <ErrorMessage>{erro}</ErrorMessage>}
      <Button onClick={isCadastro ? handleRegister : handleLogin}>
        {isCadastro ? 'Cadastrar' : 'Login'}
      </Button>
      <Button onClick={() => setIsCadastro(!isCadastro)}>
        {isCadastro ? 'Já tem uma conta? Faça login' : 'Não tem conta? Cadastre-se'}
      </Button>
    </Container>
  );
};

export default LoginCadastro;