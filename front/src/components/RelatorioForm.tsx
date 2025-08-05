import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import html2canvas from 'html2canvas';

interface Props {
  obra: {
    nome: string;
    local: string;
    responsavel: string;
  };
  onClose: () => void;
}

const RelatorioForm: React.FC<Props> = ({ obra, onClose }) => {
  const today = new Date().toISOString().slice(0, 10);
  const [data, setData] = useState(today);
  const [clima, setClima] = useState('');
  const [atividades, setAtividades] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [maoDeObra, setMaoDeObra] = useState('');


  const [isLoading, setIsLoading] = useState(false);

const downloadAsImage = async () => {
  const formElement = document.getElementById('relatorio-form');

  if (formElement) {
    const canvas = await html2canvas(formElement);
    const imgData = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `Relatorio_${obra.nome}_${data}.jpg`;
    link.click();
  }
};

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const payload = {
        data,
        clima,
        atividades,
        observacoes,
        mao_de_obra: maoDeObra,
        obra: obra.nome,
        responsavel_tecnico: obra.responsavel,
        endereco: obra.local,
      };

      const BASE_URL = process.env.REACT_APP_BASE_URL;

      const response = await axios.post(`${BASE_URL}/gerar-pdf`, payload, {
        responseType: 'blob',
      });

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Relatorio_${obra.nome}_${data}.pdf`;
        link.click();
        alert('Relatório gerado com sucesso!');
        onClose();
      }
    } catch (err) {
      alert('Erro ao gerar o relatório');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Overlay>
    <FormContainer id="relatorio-form">
        <h2>Relatório Diário - {obra.nome}</h2>
        <label>Data:</label>
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />

        <label>Clima:</label>
        <input type="text" value={clima} onChange={(e) => setClima(e.target.value)} />

        <label>Atividades:</label>
        <textarea value={atividades} onChange={(e) => setAtividades(e.target.value)} />

        <label>Mão de obra (ex.: Pedreiro: 3):</label>
        <input type="text" value={maoDeObra} onChange={(e) => setMaoDeObra(e.target.value)} />

        <label>Observações:</label>
        <textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} />

        <ButtonGroup>
          <button onClick={downloadAsImage} disabled={isLoading}>
            {isLoading ? 'Gerando...' : 'Salvar'}
          </button>
          <button onClick={onClose}>Cancelar</button>
        </ButtonGroup>
      </FormContainer>
    </Overlay>
  );
};

export default RelatorioForm;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 8px;

  input, textarea {
    width: 100%;
    margin-bottom: 10px;
    padding: 6px;
  }

  textarea {
    resize: vertical;
    height: 80px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    padding: 8px 16px;
  }
`;