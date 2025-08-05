import React, { useState } from 'react';
import styled from 'styled-components';

interface Obra {
  nome: string;
  local: string;
  responsavel: string;
}

interface Props {
  onSave: (obra: Obra) => void;
  onClose: () => void;
}

const ObraModal: React.FC<Props> = ({ onSave, onClose }) => {
  const [nome, setNome] = useState('');
  const [local, setLocal] = useState('');
  const [responsavel, setResponsavel] = useState('');

  const handleSubmit = () => {
    if (!nome || !local || !responsavel) {
      alert("Preencha todos os campos.");
      return;
    }
    onSave({ nome, local, responsavel });
    onClose();
  };

  return (
    <Overlay>
      <ModalContainer>
        <h2>Cadastrar Nova Obra</h2>
        <label>Nome da Obra:</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} />

        <label>Local:</label>
        <input value={local} onChange={(e) => setLocal(e.target.value)} />

        <label>Responsável:</label>
        <input value={responsavel} onChange={(e) => setResponsavel(e.target.value)} />

        <ButtonGroup>
          <button onClick={handleSubmit}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
};

export default ObraModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;

  h2 {
    margin-top: 0;
  }

  input {
    width: 100%;
    margin-bottom: 10px;
    padding: 6px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    padding: 8px 12px;
    margin-top: 10px;
  }
`;