import React from "react";
import styled from "styled-components";
import DAFFI from "../images/DAFFI logo.jpg"


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

const Slogan = styled.h1`
  font-size: 2rem;
  color: #000000;
  margin: 20px 0;
`;

const Section = styled.section`
  margin: 40px 0;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin: 10px 0 30px;
`;

const Footer = styled.footer`
  margin-top: 40px;
  font-size: 0.9rem;
  color: #777;
  background-color: #f4f4f4;
  padding: 20px;
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

const Sobre: React.FC = () => {
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

<Section>
        <Slogan>Sobre nós</Slogan>
        <Description>
        Fundada em 21 de maio de 2013 por Alan Alves dos Santos, a DAFFI Construções nasceu com a missão de transformar paisagens e oferecer soluções inovadoras em habitação, contribuindo para o desenvolvimento urbano de Jacareí, no interior de São Paulo.

Ao longo dos anos, ampliamos nossa atuação e hoje atendemos todo o Vale do Paraíba, Litoral Norte e regiões adjacentes, sempre pautados pela excelência, comprometimento e qualidade. Nosso diferencial está no uso dos melhores materiais, na execução impecável de cada projeto e na dedicação de uma equipe altamente qualificada, garantindo segurança, sofisticação e durabilidade para sua obra.

Na DAFFI Construções, não apenas construímos edificações — construímos sonhos, agregamos valor e transformamos realidades.
        </Description>
      </Section>

      <Footer>
        <p>© 2025 DAFFI Construções. Todos os direitos reservados.</p>
        <p>Av. Pensilvânia 235, Jd. Florida, Jacareí – SP, 12321-050</p>
        <p>CNPJ: 18.158.765/0001-10</p>
        <p>Acompanhe as obras pelo Instagram!</p>
      </Footer>

        </div>
    );
  };
  
  export default Sobre;