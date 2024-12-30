import styled from "styled-components";
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode; // Adiciona a propriedade 'children'
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick}>
    {children}
  </button>
);

export default Button;

export const ButtonSld = styled.button`
  display: flex;
  padding: 8px 20px;
  margin-right: 10px;
  background-color: rgb(23, 68, 119);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: inherit; // Garantir que a fonte seja herdada
  font-size: inherit; // Garantir que o tamanho da fonte seja herdado

  &:hover {
    background-color: rgb(75, 114, 160);
  }
`;