import React, { useState } from 'react';
import styled from 'styled-components';

const Contato = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;

    if (!validateEmail(email)) {
      setStatus('Por favor, insira um e-mail válido.');
      return;
    }

    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      setStatus('Mensagem enviada com sucesso!');
      form.reset();
    } else {
      setStatus('Ocorreu um erro. Tente novamente.');
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <Section4>
      <Slogan>Envie sua proposta!</Slogan>
      <Form
        action="https://formspree.io/f/xqaelprn"
        method="POST"
        onSubmit={handleSubmit}
      >
        <Titulo>Nome</Titulo>
        <Input type="text" name="nome" placeholder="Nome (obrigatório)" required />

        <Titulo>E-mail</Titulo>
        <Input type="email" name="email" placeholder="E-mail (obrigatório)" required />

        <Titulo>Mensagem</Titulo>
        <TextArea name="mensagem" placeholder="Mensagem" rows={4} required />

        <Button3 type="submit">Fale Conosco</Button3>
        {status && (
          <StatusMessage success={status.includes('sucesso')}>
            {status}
          </StatusMessage>
        )}
      </Form>
    </Section4>
  );
};

export default Contato;

const Titulo = styled.p`
  color: black;
  text-align: left;
  margin-bottom: 8px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const Input = styled.input`
  padding: 12px;
  width: 100%;
  max-width: 400px;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  width: 100%;
  max-width: 400px;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 1rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 0.9rem;
  }
`;

const Section4 = styled.section`
  background-color: #ffffff;
  padding: 30px;
  color: black;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const Slogan = styled.h1`
  font-size: 2.5rem;
  color: #000000;
  font-family: "Serif Bold";
  font-weight: lighter;
  margin: 0%;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Button3 = styled.button`
  padding: 16px 18px;
  background-color: #000000;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #c4bc32;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
`;

const StatusMessage = styled.p.attrs<{ success?: boolean }>((props) => ({
  className: props.success ? "success" : "error",
}))`
  font-size: 1rem;
  margin-top: 10px;
`;
