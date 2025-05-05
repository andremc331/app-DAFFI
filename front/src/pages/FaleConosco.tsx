import React from "react";
import styled from "styled-components";
import DAFFI from "../images/DAFFI png.png"
import Contato from "../components/Contato";
import { FaFacebook, FaInstagram } from "react-icons/fa";


// const Slogan = styled.h1`
//   font-size: 2rem;
//   color: #000000;
//   margin: 20px 0;
// `;

// const Section = styled.section`
//   margin: 40px 0;
// `;

// const Description = styled.p`
//   font-size: 1.2rem;
//   color: #555;
//   margin: 10px 0 30px;
// `;

// const Input = styled.input`
//   padding: 10px;
//   width: 300px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
// `;

// const TextArea = styled.textarea`
//   padding: 10px;
//   width: 300px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   resize: vertical;
// `;

const Footer = styled.footer`
  margin-top: 40px;
  padding: 15px 30px;
  font-size: 0.9rem;
  color: #777;
  background-color: #f4f4f4;
  margin: -30px -30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 10px;
    font-size: 0.8rem;
    gap: 0px; /* Reduz o espaço entre as colunas em telas menores */
  }
`;


const FooterColumn = styled.div`
  flex: 1;
  padding: 0 10px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const MapContainer = styled.div`
  margin-top: 10px;
  iframe {
    width: 100%;
    max-width: 400px;
    height: 300px;
    border: 0;
    border-radius: 10px;
  }
`;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
//   margin: 20px 0;
// `;

const Button = styled.a`
  padding: 10px 20px;
  color: #000000;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 550;
  cursor: pointer;
  margin-right: 150px;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-top: 10px;
    font-size: 0.9rem;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  margin: -30px -30px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
    margin: -10px -10px;
  }
`;

const Logo = styled.img`
  margin-top: 20px;
  margin-left: 150px;
  height: 80px;

  @media (max-width: 768px) {
    margin-left: 0;
    height: 60px;
  }
`;

const Contact = styled.div`
  font-size: 1rem;
  color: #333;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
    font-size: 0.9rem;
  }
`;

const FaleConoscoPageContainer = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

// const Section4 = styled.section`
//   background-color: #ffffff;
//   padding: 30px;
//   color: white;

//   @media (max-width: 768px) {
//     padding: 20px 10px;
//   }
// `;

// const Titulo = styled.p`
//   color: black;
//   text-align: left;
//   margin-bottom: 8px;
//   font-weight: bold;

//   @media (max-width: 768px) {
//     font-size: 0.9rem;
//   }
// `;

// const Button3 = styled.a`
//   padding: 16px 18px;
//   background-color: #000000;
//   color: #fff;
//   text-decoration: none;
//   border-radius: 5px;
//   cursor: pointer;
//   &:hover {
//     background-color: #000000;
//   }

//   @media (max-width: 768px) {
//     padding: 10px 15px;
//     font-size: 0.9rem;
//   }
// `;

const FaleConosco: React.FC = () => {
  return (
    <FaleConoscoPageContainer>
      <Header>
      <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Logo src={DAFFI} alt="DAFFI Construções" style={{ cursor: "pointer" }} />
          <span style={{ marginLeft: "20px", fontWeight: "bold", fontSize: "1.2rem", cursor: "pointer", color: "black", marginTop: "20px" }}>
            DAFFI Construções
          </span>
        </a>
        <Contact>Email: comercial@dafficonstrucoes.com</Contact>
        <Button href="/sobre">Sobre</Button>
      </Header>

      <Contato></Contato>

      <Footer>
        <FooterColumn style={{ textAlign: "center" }}>
          <h2>Acompanhe as obras nas redes sociais!</h2>

          {/* Instagram */}
          <p>
            <a
              href="https://www.instagram.com/daffi.construcoes"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                color: "#E4405F",
                fontWeight: "bold"
              }}
            >
              <FaInstagram size={20} color="#E4405F" /> {/* Ícone do Instagram */}
              @daffi.construcoes
            </a>
          </p>

          {/* Facebook */}
          <p>
            <a
              href="https://www.facebook.com/dafficonstrutora"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                color: "#1877F2",
                fontWeight: "bold"
              }}
            >
              <FaFacebook size={20} color="#1877F2" /> {/* Ícone do Facebook */}
              Daffi Construções
            </a>
          </p>

          <h3>Atendemos Vale do Paraíba e Região. Solicite um orçamento sem compromisso!</h3>
          <p>© 2025 DAFFI Construções. Todos os direitos reservados.</p>
          <p>CNPJ: 18.158.765/0001-10</p>
        </FooterColumn>

        <FooterColumn>
          <h1>Faça-nos uma Visita!</h1>
          <p>Av. Pensilvânia 235</p>
          <p> Jd. Florida, Jacareí – SP</p>
          <p>12321-050</p>
          <p>Horas <br /> segunda-feira⸺sexta-feira <br /> 8h-17h</p>
          <p>Telefone <br /> (12) 98208-1414</p>
        </FooterColumn>

        <FooterColumn>
          <MapContainer>
            <iframe
              title="Mapa da localização da Daffi Construções"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3664.3411553774063!2d-45.98367752503065!3d-23.303377752164348!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cdcc9fc63a39cb%3A0x457374d0a6a69dda!2sAv.%20Pensilv%C3%A2nia%2C%20235%20-%20Jardim%20Florida%2C%20Jacare%C3%AD%20-%20SP%2C%2012321-050!5e0!3m2!1spt-BR!2sbr!4v1738932519265!5m2!1spt-BR!2sbr"
              width="400"
              height="300"
              style={{ border: "0" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>

          </MapContainer>
        </FooterColumn>


      </Footer>


    </FaleConoscoPageContainer>
  );
};

export default FaleConosco;