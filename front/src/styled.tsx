import styled from "styled-components";

// Defina os componentes de estilo aqui
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const ImageContainer = styled.div`
  position: absolute;  // A imagem ficará fixa no canto esquerdo
  left: 10px;          // Ajuste da margem do lado esquerdo
  top: 0;              // Alinha a imagem ao topo
  padding: 10px;

  img {
    max-width: 70%;  // Faz a imagem ocupar no máximo 100% do tamanho do container
    height: auto;     // Mantém a proporção da imagem
    display: block;   // Garante que a imagem não tenha espaçamento extra embaixo
  }

  // Media Query para dispositivos móveis
  @media (max-width: 768px) {
    img {
      max-width: 30%;  // Ajusta a imagem para ser um pouco menor em telas menores
    }
  }
  
  // Media Query para telas grandes (por exemplo, tablets ou desktops)
  @media (min-width: 765px) {
    img {
      max-width: 20%;  // A imagem ocupará até 20% do tamanho do container em telas maiores
    }
  }
`;

const Header = styled.h1`
  margin-top: 50px;
  color: #333;
  text-align: center;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
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
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  padding: 10px; /* Adiciona espaçamento interno */
`;

// Adicione estilos para o comportamento do scroll
const ScrollbarStyles = `
  ::-webkit-scrollbar {
    width: 8px; /* Largura da barra de rolagem */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc; /* Cor da barra de rolagem */
    border-radius: 5px; /* Bordas arredondadas */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #aaa; /* Cor ao passar o mouse */
  }

  ::-webkit-scrollbar-track {
    background-color: #f9f9f9; /* Cor do trilho da barra de rolagem */
  }
`;

// Aplique estilos personalizados na barra de rolagem
const ScrollableItemList = styled(ItemList)`
  max-height: 300px; /* Controle da altura máxima */
  overflow-y: auto; /* Rolagem apenas aqui */
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
`;

const OrcamentoList = styled.ul`
  list-style-type: none;
  padding: 0;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 5px;
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
  background-color: rgba(0, 0, 0, 0.5); /* Transparência do fundo */
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
  background-color: #ff4d4d; /* Cor vermelha para o botão de fechar */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10; /* Garante que o botão fique sobre o conteúdo */
  
  &:hover {
    background-color: #e60000; /* Cor mais escura ao passar o mouse */
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
  InputQuantidade,
  ImageContainer
};

export default StyledComponents;