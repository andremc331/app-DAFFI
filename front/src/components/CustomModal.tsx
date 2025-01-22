import React from 'react';
import Button from './Button'; // Supondo que você tenha um botão estilizado
import styled from 'styled-components';

// Interface para as propriedades do modal
interface CustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText: string;
  }
  
  // Componente CustomModal
  const CustomModal: React.FC<CustomModalProps> = ({
    isOpen,
    onClose,
    title,
    message,
    onConfirm,
    confirmText,
  }) => {
    if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalButton onClick={onClose}>X</ModalButton>
        <h3>{title}</h3>
        <p>{message}</p>
        <div>
          <Button onClick={onConfirm}>{confirmText}</Button>
          <Button onClick={onClose}>Cancelar</Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CustomModal;

const ModalOverlay = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  `;
  
const ModalContent = styled.div `
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
  `;
  
const ModalButton = styled.button `
    margin-top: 10px;
  `;