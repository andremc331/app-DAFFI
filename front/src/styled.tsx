import styled from "styled-components";

// Defina os componentes de estilo aqui
const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.h1`
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
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
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
  font-weight: bold;
  color: #333;
  margin-top: 5px;
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
  font-weight: bold;
  font-size: 20px;
  text-align: right;
  padding-top: 10px;
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
  Container
};

export default StyledComponents;