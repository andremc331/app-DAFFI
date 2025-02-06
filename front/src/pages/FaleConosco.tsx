import React from "react";
import styled from "styled-components";
import DAFFI from "../images/DAFFI logo.jpg"


const Slogan = styled.h1`
  font-size: 2rem;
  color: #000000;
  margin: 20px 0;
`;

// const Section = styled.section`
//   margin: 40px 0;
// `;

// const Description = styled.p`
//   font-size: 1.2rem;
//   color: #555;
//   margin: 10px 0 30px;
// `;

const Input = styled.input`
  padding: 10px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
`;

const Footer = styled.footer`
  margin-top: 40px;
  font-size: 0.9rem;
  color: #777;
  background-color: #f4f4f4;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

const Button = styled.a`
  padding: 10px 20px;
  background-color: #d1cc36;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #c4bc32;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ddd;
`;

const Logo = styled.img`
  height: 60px;
`;

const Contact = styled.div`
  font-size: 1rem;
  color: #333;
`;

const Section4 = styled.section`
  background-color: #ffffff;
  padding: 30px;
  color: white;

  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

const Titulo = styled.p`
  color: black;
  text-align: left;
  margin-bottom: 8px;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Button3 = styled.a`
  padding: 16px 18px;
  background-color: #000000;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #000000;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
`;

const FaleConosco: React.FC = () => {
    return (
        <div>
            <Header>
  <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
    <Logo src={DAFFI} alt="DAFFI Construções" style={{ cursor: "pointer" }} />
    <span style={{ marginLeft: "10px", fontWeight: "bold", fontSize: "1.2rem", cursor: "pointer", color: "black" }}>
      DAFFI Construções
    </span>
  </a>
  <Contact>Email: comercial@dafficonstrucoes.online</Contact>
  <Button href="/sobre">Sobre</Button>
</Header>

<Section4>
        <Slogan>Envie sua proposta!</Slogan>
        <Form action="https://formspree.io/f/xqaelprn" method="POST">
        <Titulo>Nome</Titulo>
          <Input type="text" placeholder="Nome (obrigatório)" required />

          <Titulo>E-mail</Titulo>
          <Input type="email" placeholder="E-mail (obrigatório)" required />

          <Titulo>Mensagem</Titulo>
          <TextArea placeholder="Mensagem" rows={4} required />

          <Button3 type="submit">Fale Conosco</Button3>
        </Form>
      </Section4>

      <Footer>
        <p>© 2025 DAFFI Construções. Todos os direitos reservados.</p>
        <p>Av. Pensilvânia 235, Jd. Florida, Jacareí – SP, 12321-050</p>
        <p>CNPJ: 18.158.765/0001-10</p>
        <p>Acompanhe as obras pelo Instagram!</p>
      </Footer>

        </div>
    );
  };
  
  export default FaleConosco;