import React from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import galpaoImg from "../images/galpao.jpg";
import concretoImg from "../images/concreto.jpg";
import estruturaImg from "../images/estrutura.jpg"
import quadraImg from "../images/quadra.jpg";
import pavimentoImg from "../images/pavimento.jpg";
import piscinaImg from "../images/piscina.jpg";
import farmaciaImg from "../images/farmacia.jpg";
import predialImg from "../images/predial.jpg";
import salaImg from "../images/sala.jpg";
import fundacaoImg from "../images/fundacao.jpg";
import telhadoImg from "../images/telhado.jpg"
import bompratoImg from "../images/bom-prato.jpg"
import DAFFI from "../images/logo.jpg"
import Contato from "../components/Contato";
import { FaFacebook, FaInstagram, FaLock } from "react-icons/fa"; // Importa o ícone do Instagram


const HomePageContainer = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
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

const Button = styled.a`
  padding: 13px 18px;
  background-color: #000000;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #c4bc32;
  }

  @media (max-width: 768px) {
    padding: 10px 15px;
    font-size: 0.9rem;
  }
`;

const Button2 = styled.a`
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

const Button4 = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px; /* Espaço entre ícone e texto */
  padding: 8px 10px;
  background-color: #f9f9f9;
  color: #000000;
  text-decoration: none;
  border-radius: 6px;
  cursor: pointer;
  position: absolute;
  right: 30px; /* Ajusta a posição do botão */
  top: 50px; /* Ajusta a altura */
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;

  @media (max-width: 768px) {
    padding: 8px 13px;
    font-size: 0.9rem;
    right: 10px;
    top: 10px;
  }
`;

const Section = styled.section`
  margin: 0px -30px;
  background-color: #f9f9f9;
  padding: 120px;

  @media (max-width: 768px) {
    padding: 40px 10px;
    margin: 0px -10px;
  }
`;

const Section2 = styled.section`
  background-color: #ffffff;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Section3 = styled.section`
  margin: 40px -30px;
  background-color: #000000;
  padding: 150px;
  color: white;

  @media (max-width: 768px) {
    padding: 40px 10px;
    margin: 20px -10px;
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

const Slogan2 = styled.h1`
  font-size: 4rem;
  color: #000000;
  margin-bottom: 2px;
  margin-top: 30px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: 20px;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #282727;
  margin: 20px 0 40px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 10px 0 20px;
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 500px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Caption = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 6px 10px;
  }
`;

const CarouselContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }

  .carousel .control-arrow {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 30%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    position: absolute; /* Posiciona os botões absolutamente dentro do carrossel */
    top: 50%; /* Alinha ao centro vertical */
    transform: translateY(-50%); /* Ajusta o posicionamento para o centro exato */
    z-index: 2; /* Garante que os botões fiquem acima das imagens */

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }

  .carousel .control-prev.control-arrow {
    left: 10px; /* Posiciona o botão "anterior" à esquerda */
  }

  .carousel .control-next.control-arrow {
    right: 10px; /* Posiciona o botão "próximo" à direita */
  }

  .carousel .control-prev.control-arrow:before {
    border-right: 8px solid #fff;
  }

  .carousel .control-next.control-arrow:before {
    border-left: 8px solid #fff;
  }
`;

const RegularizationSection = styled.div`
  background-color: #cfcabe;
  padding: 130px;
  margin: 40px 200px;

  @media (max-width: 768px) {
    padding: 40px 10px;
    margin: 20px 10px;
  }
`;

const Quote = styled.blockquote`
  font-size: 2.4rem;
  color: #e6e4e4;
  font-family: "Script";
  font-style: italic;
  margin: 20px 0;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Quote2 = styled.blockquote`
  font-size: 1.2rem;
  color: #e6e4e4;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-style: normal;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 10px;
//   margin: 20px 0;

//   @media (max-width: 768px) {
//     gap: 8px;
//   }
// `;

// const Input = styled.input`
//   padding: 12px;
//   width: 100%;
//   max-width: 400px;
//   border: 2px solid black;
//   border-radius: 5px;
//   font-size: 1rem;
//   margin-bottom: 20px;

//   @media (max-width: 768px) {
//     padding: 10px;
//     font-size: 0.9rem;
//   }
// `;

// const TextArea = styled.textarea`
//   padding: 12px;
//   width: 100%;
//   max-width: 400px;
//   border: 2px solid black;
//   border-radius: 5px;
//   font-size: 1rem;
//   margin-bottom: 20px;

//   @media (max-width: 768px) {
//     padding: 10px;
//     font-size: 0.9rem;
//   }
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

// const Titulo = styled.p`
//   color: black;
//   text-align: left;
//   margin-bottom: 8px;
//   font-weight: bold;

//   @media (max-width: 768px) {
//     font-size: 0.9rem;
//   }
// `;

const HomePage: React.FC = () => {
  return (
    <HomePageContainer>

      <Header>
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Logo src={DAFFI} alt="DAFFI Construções" style={{ cursor: "pointer" }} />
          <span style={{ marginLeft: "20px", fontWeight: "bold", fontSize: "1.2rem", cursor: "pointer", color: "black", marginTop: "20px" }}>
            DAFFI Construções
          </span>
        </a>
        <Contact>Email: comercial@dafficonstrucoes.com</Contact>
        <Button2 href="/sobre">Sobre</Button2>
        <Button4 href="/login"> <FaLock style={{ marginRight: "5px", fontSize: "1.4rem" }} />
        </Button4>
      </Header>

      <Section>
        <Slogan>Um compromisso com inovação e <br />sustentabilidade para sua obra.</Slogan>
        <Description>
          A DAFFI Construções é uma empresa que combina produtividade com qualidade<br />para entregar serviços com excelência.
        </Description>
        <Button href="/sobre">Sobre Nós</Button>
      </Section>

      <Section2>
        <Slogan2>*</Slogan2>
        <Slogan>Confira nossos serviços</Slogan>
        <Description>
          Nosso conjunto abrangente de serviços profissionais atende a uma clientela <br />
          diversificada, que vai desde proprietários de residências até incorporadores <br /> comerciais.
        </Description>

        <CarouselContainer>
          <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
          <div>
              <ImageContainer>
                <Image src={bompratoImg} alt="Bom Prato" />
                <Caption>Bom Prato</Caption>
              </ImageContainer>
            </div>
            <div>
              <ImageContainer>
                <Image src={galpaoImg} alt="Galpão Treliçado" />
                <Caption>Galpão Treliçado</Caption>
              </ImageContainer>
            </div>
            <div>
              <ImageContainer>
                <Image src={concretoImg} alt="30m³ de concreto usinado" />
                <Caption>30m³ de concreto usinado</Caption>
              </ImageContainer>
            </div>
            <div>
              <ImageContainer>
                <Image src={estruturaImg} alt="Estrura para revestimento de paredes" />
                <Caption>Estrura para revestimento de paredes</Caption>
              </ImageContainer>
            </div>
            <div>
              <ImageContainer>
                <Image src={quadraImg} alt="Reforma de quadra poliesportiva" />
                <Caption>Reforma de quadra poliesportiva</Caption>
              </ImageContainer>
            </div>
            <div>
              <ImageContainer>
                <Image src={pavimentoImg} alt="Pavimentação com paralelepípedo sextavado" />
                <Caption>Pavimentação com paralelepípedo sextavado</Caption>
              </ImageContainer>
            </div>
            <div>
              <ImageContainer>
                <Image src={piscinaImg} alt="Instalação de piscina" />
                <Caption>Instalação de piscina</Caption>
              </ImageContainer>
            </div>
            <div>
              <ImageContainer>
                <Image src={farmaciaImg} alt="Reforma de Farmacia de Alto Custo" />
                <Caption>Reforma de Farmácia de Alto Custo</Caption>
              </ImageContainer>
            </div>
            <div>
              <ImageContainer>
                <Image src={predialImg} alt="Manutenção Predial em Condomínio" />
                <Caption>Manutenção Predial em Condomínio</Caption>
              </ImageContainer>
            </div>
            <div>
              <ImageContainer>
                <Image src={salaImg} alt="Ampliação de Sala de Estar" />
                <Caption>Ampliação de Sala de Estar</Caption>
              </ImageContainer>
            </div>
            <div>
              <ImageContainer>
                <Image src={fundacaoImg} alt="Estrutura para Fundação" />
                <Caption>Estrutura para Fundação</Caption>
              </ImageContainer>
            </div>
            <div>
              <ImageContainer>
                <Image src={telhadoImg} alt="Reforma de Telhado" />
                <Caption>Reforma de Telhado</Caption>
              </ImageContainer>
            </div>
          </Carousel>
        </CarouselContainer>
      </Section2>



      <RegularizationSection>
        <Slogan>DESEJA REGULARIZAR <br /> SEU IMÓVEL? PERGUNTE-NOS<br /> COMO!</Slogan>
        <Description>
          Está precisando de ajuda para regularizar seu imóvel? <br /> Entre em contato pelo botão abaixo.
        </Description>
        <Button3 href="/faleconosco">Fale Conosco</Button3>
      </RegularizationSection>

      <Section3>
        <Quote>
          “Tenha coragem de seguir o que seu <br /> coração e sua intuição dizem. Eles já <br /> sabem o que você realmente deseja.”
          <br />
          <Quote2>- Steve Jobs</Quote2>
        </Quote>
      </Section3>


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

    </HomePageContainer>
  );
};

export default HomePage;

