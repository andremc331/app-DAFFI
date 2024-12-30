import styled from "styled-components";

// Defina os componentes de estilo aqui
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-x: auto;

  /* Tornar o layout responsivo */
  @media (max-width: 768px) {
    padding: 15px; /* Menos padding em telas menores */
  }

  @media (max-width: 480px) {
    padding: 10px; /* Menos padding em telas muito pequenas */
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 0;
  padding: 10px;
  margin-left: 125px;

  img {
    max-width: 20%;
    height: auto;
    display: block;
  }

  @media (max-width: 768px) {
    img {
      max-width: 20%;
    }
  }

  @media (max-width: 480px) {
    img {
      max-width: 15%;
    }
  }
`;

const Header = styled.h1`
  margin-top: 50px;
  color: #333;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
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
  padding: 10px 20px;
  background-color: #d1cc36;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #949828;
  }

  @media (max-width: 768px) {
    width: 100%; /* Botão ocupa a largura total */
  }
`;

const NavegarButton = styled.button`
`;

const ExcluirButton = styled.button`
  padding: 5px 5px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #b40808;
  }

  @media (max-width: 768px) {
    width: 100%; /* Botão ocupa a largura total */
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
`;

const Price = styled.span`
  font-size: 13px;
  color: #333;
  margin-top: 5px;
`;

const ItemNome = styled.span`
  font-family: ui-sans-serif;
  font-size: 18px;
  color: #020101;
`;

const StyledNumber = styled.span`
  font-weight: bold;
  font-size: 17px;
  color: red;
`;

const OrcamentoWrapper = styled.div`
  margin-top: 30px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const OrcamentoList = styled.ul`
  list-style-type: none;
  padding: 0;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const OrcamentoItem = styled.li`
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
`;

const TotalWrapper = styled.div`
  color: red;
  font-weight: bold;
  font-size: 20px;
  text-align: right;
  padding-top: 10px;
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
  margin-top: 15px;
  padding: 15px;
  background-color: #ffffff;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333333;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 10px;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 5px;

      &:hover {
        background-color: #eaf4fe;
        transform: scale(1.02);
      }

      span {
        font-size: 0.95rem;
        color: #555555;

        &:first-child {
          font-weight: bold;
          color: #333333;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 10px;
    h3 {
      font-size: 1rem;
    }

    ul {
      padding: 5px;
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
  Content
};

export default StyledComponents;