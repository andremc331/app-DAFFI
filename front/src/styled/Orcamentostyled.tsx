import styled from "styled-components";

// Defina os componentes de estilo aqui
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  font-family: sans-serif;
  font-size: medium;

  /* Tornar o layout responsivo */
  @media (max-width: 768px) {
    padding: 15px; /* Menos padding em telas menores */
    font-size: small;
  }

  @media (max-width: 480px) {
    padding: 10px; /* Menos padding em telas muito pequenas */
    font-size: small;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 0;
  padding: 10px;
  margin-left: 100px;
  z-index: -1; /* Coloca a imagem atrás de outros elementos */

  img {
    max-width: 20%;
    height: auto;
    display: block;
  }

  @media (max-width: 768px) {
    img {
      max-width: 20%;
      margin-left: -50px;
    }
  }

  @media (max-width: 480px) {
    img {
      max-width: 20%;
      margin-left: -50px;
    }
  }
`;

const Header = styled.h1`
  margin-top: 50px;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: medium;
  }

  @media (max-width: 480px) {
    font-size: x-large;
  }
`;

const Sidebar = styled.div`
  width: 80px; /* Largura inicial da barra lateral */
  height: 100vh; /* Faz a barra ocupar toda a altura da tela */
  background-color: #000000;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: auto;
  position: fixed; /* Fixa a barra na lateral */
  top: 0; /* Garante que comece do topo */
  left: 0; /* Garante que esteja à esquerda */
  transition: width 0.3s ease; /* Animação para expandir suavemente */
  
  &:hover {
    width: 110px; /* Largura ao passar o mouse */
  }

  @media (max-width: 768px) {
    width: 60px;
}

  @media (max-width: 480px) {
    width: 40px;
  }
`;

const SidebarItem = styled.div`
  margin: 10px 0;
  cursor: pointer;
  white-space: nowrap; /* Evita quebra de texto */
  overflow: hidden; /* Oculta texto excedente */
  text-overflow: ellipsis; /* Mostra "..." para texto cortado */
  padding: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #34495e;
    border-radius: 5px;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 90px; /* Adiciona espaço para o conteúdo ao lado da barra lateral */
  overflow-y: auto;

  @media (max-width: 768px) {
    margin-left: 60px;
}

  @media (max-width: 480px) {
    margin-left: 40px;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 250px;
  }

  @media (max-width: 480px) {
    width: 100%; /* Largura total em telas pequenas */
    margin-right: 0;
  }
`;

const Button = styled.button`
  padding: 10px 10px;
  background-color: #d1cc36;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 5px;

  &:hover {
    background-color: #949828;
  }

  @media (max-width: 768px) {
    width: 100%; /* Botão ocupa a largura total */
  }

  @media (max-width: 480px) {
    width: 50%; /* Largura total em telas pequenas */
    margin-right: 0;
  }
`;

const NavegarButton = styled.button`
`;

const VerDetalhesButton = styled.button`
  padding: 15px 15px;
  background-color: #d1cc36;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 5px;
  width: 80px; /* Tamanho fixo do botão */
  height: 50px; /* Tamanho fixo da altura */


  &:hover {
    background-color: #949828;
  }

  @media (max-width: 768px) {
    width: 100%; /* Botão ocupa a largura total */
  }

  @media (max-width: 480px) {
    width: 50%; /* Largura total em telas pequenas */
    margin-right: 0;
  }
`;

const ExcluirButton = styled.button`
  padding: 5px 5px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 5px;
  width: 50px; /* Tamanho fixo do botão */
  height: 50px; /* Tamanho fixo da altura */

  &:hover {
    background-color: #b40808;
  }

  @media (max-width: 768px) {
    width: 100%; /* Botão ocupa a largura total */
  }

  @media (max-width: 480px) {
    width: 50%; /* Largura total em telas pequenas */
    margin-right: 0;
  }
`;

const LixeiraButton = styled.button`
  padding: 5px 5px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  margin-top: 5px;
  width: 30px; /* Tamanho fixo do botão */
  height: 30px; /* Tamanho fixo da altura */

  &:hover {
    background-color: #b40808;
  }

  @media (max-width: 768px) {
    width: 100%; /* Botão ocupa a largura total */
  }

  @media (max-width: 480px) {
    width: 50%; /* Largura total em telas pequenas */
    margin-right: 0;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  padding: 10px;

  @media (max-width: 768px) {
    padding: 5px; /* Menos padding em telas menores */
  }
`;

const ScrollbarStyles = `
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #aaa;
  }

  ::-webkit-scrollbar-track {
    background-color: #f9f9f9;
  }
`;

const ScrollableItemList = styled(ItemList)`
  max-height: 300px;
  overflow-y: auto;
  ${ScrollbarStyles}
`;

const Item = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-right: 5px;
  }
`;

const Price = styled.span`
  font-size: 13px;
  color: #333;
  margin-top: 5px;

  @media (max-width: 768px) {
    font-size: 11px; /* Reduz tamanho da fonte em telas menores */
  }
`;

const ItemNome = styled.span`
  font-family: ui-sans-serif;
  font-size: 18px;
  color: #020101;

  @media (max-width: 768px) {
    font-size: 16px; /* Ajusta o tamanho da fonte */
  }
`;

const StyledNumber = styled.span`
  font-weight: bold;
  font-size: 17px;
  color: red;

  @media (max-width: 768px) {
    font-size: 15px; /* Reduz tamanho da fonte em telas menores */
  }
`;

const OrcamentoWrapper = styled.div`
  margin-top: 70px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

const OrcamentoList = styled.ul`
  margin-bottom: 100px;
  margin-top: 20px;
  text-align: center;
  list-style-type: none;
  padding: 0;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;

  @media (max-width: 768px) {
    padding: 10px; /* Reduz o espaçamento interno */
  }
`;

const OrcamentoItem = styled.li`
  display: flex;
  margin-bottom: 20px; /* Espaçamento entre os itens */
  padding: 10px 0; /* Adicionado padding para melhorar a aparência */
  justify-content: space-between;
  align-items: center; /* Centraliza verticalmente os elementos */
  border-bottom: 1px solid #ddd;  

  div {
    display: flex;
    align-items: center; /* Centraliza o texto verticalmente */
    font-size: 14px; /* Ajuste padrão */

    @media (max-width: 768px) {
      font-size: 12px; /* Reduz o tamanho do texto em telas menores */
    }
  }
`;

const TotalWrapper = styled.div`
  color: red;
  font-weight: bold;
  font-size: 20px;
  text-align: right;

  display: flex;
  align-items: center; /* Alinha os itens verticalmente */
  justify-content: flex-end; /* Alinha os itens à direita */

  span {
    margin-right: 16px; /* Adiciona espaçamento entre o Total e o botão */
  }

  button {
    margin-right: 8px; /* Espaçamento entre o botão e o campo de entrada */

    @media (max-width: 768px) {
      font-size: 12px; /* Reduz tamanho da fonte do botão */
      padding: 5px; /* Ajusta o padding do botão */
    }
  }

  @media (max-width: 768px) {
    font-size: 16px; /* Reduz tamanho da fonte para Total */
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 90%;
    padding: 15px;
  }
`;

const InputQuantidade = styled.input`
  width: 80%;
  padding: 10px;
  margin: 15px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;

  &:hover {
    background-color: #e60000;
  }

  @media (max-width: 768px) {
    top: 5px;
    left: 5px;
  }
`;

const DetalhesWrapper = styled.div`
  margin-top: 20px;
  padding: 65px;
  background-color: #ffffff;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 1200px;
  margin-left: -1000px;
  position: absolute;
  color: #000000;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    margin-right: 500px;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 15px;
    color: #000000;
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 15px;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      transition: background-color 0.2s ease, transform 0.2s ease;

      &:hover {
        background-color: #eaf4fe;
        transform: scale(1.02);
      }

      span {
        font-size: 1rem;
        color: #555555;

        &:first-child {
          font-weight: bold;
          color: #333333;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
    h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
    }

    ul {
      padding: 10px;
      margin-top: 10px;
    }

    li {
      padding: 10px;
      font-size: 0.9rem;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      margin-bottom: 20px;
    }

    span {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    padding: 15px;
    h3 {
      font-size: 1.1rem;
    }

    ul {
      padding: 5px;
    }

    li {
      padding: 8px;
      font-size: 0.8rem;
      width: 100%;
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;


const StyledComponents = {
  TotalWrapper,
  OrcamentoItem,
  OrcamentoList,
  OrcamentoWrapper,
  Price,
  Item,
  ItemDetails,
  ItemList,
  ErrorMessage,
  Header,
  Input,
  InputWrapper,
  Button,
  Container,
  ScrollableItemList,
  StyledNumber,
  ItemNome,
  ModalButton,
  ModalContent,
  ModalOverlay,
  ExcluirButton,
  ScrollbarStyles,
  ImageContainer,
  DetalhesWrapper,
  InputQuantidade,
  NavegarButton,
  Sidebar,
  SidebarItem,
  MainWrapper,
  Content,
  VerDetalhesButton,
  LixeiraButton,
};

export default StyledComponents;