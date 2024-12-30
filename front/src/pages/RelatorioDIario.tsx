import React, { useState } from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';

const RelatorioDiario: React.FC = () => {
  const [data, setData] = useState('');
  const [clima, setClima] = useState('');
  const [atividades, setAtividades] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSave = () => {
    // Estrutura do relatório baseada no modelo fornecido
    const worksheetData = [
      ["DIÁRIO DE OBRA", "", ""],
      ["DATA:", data, ""],
      ["CLIMA:", clima, ""],
      ["ATIVIDADES REALIZADAS:", atividades, ""],
      ["OBSERVAÇÕES:", observacoes, ""],
    ];

    // Criar a planilha
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Ajustar largura das colunas
    worksheet['!cols'] = [
      { wch: 20 }, // Primeira coluna
      { wch: 50 }, // Segunda coluna
      { wch: 30 }, // Terceira coluna
    ];

    // Criar o arquivo Excel
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório Diário');

    // Salvar o arquivo
    XLSX.writeFile(workbook, `Relatorio_Diario_${data || 'sem_data'}.xlsx`);

    alert('Relatório salvo como Excel!');
  };

  const handleClear = () => {
    setData('');
    setClima('');
    setAtividades('');
    setObservacoes('');
  };

  return (
    <Container>
      <Header>Relatório Diário de Obra</Header>
      <Form>
        <Field>
          <Label>Data:</Label>
          <Input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </Field>
        <Field>
          <Label>Clima:</Label>
          <Input
            type="text"
            value={clima}
            onChange={(e) => setClima(e.target.value)}
            placeholder="Ex.: Ensolarado, Nublado, Chuvoso"
          />
        </Field>
        <Field>
          <Label>Atividades Realizadas:</Label>
          <Textarea
            value={atividades}
            onChange={(e) => setAtividades(e.target.value)}
            placeholder="Descreva as atividades realizadas no dia"
          />
        </Field>
        <Field>
          <Label>Observações:</Label>
          <Textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            placeholder="Adicione quaisquer observações importantes"
          />
        </Field>
        <ButtonWrapper>
          <Button onClick={handleSave}>Salvar</Button>
          <Button onClick={handleClear} clear>
            Limpar
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8em;
  color: #333;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const Field = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  resize: vertical;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button<{ clear?: boolean }>`
  background-color: ${(props) => (props.clear ? '#e74c3c' : '#3498db')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: ${(props) => (props.clear ? '#c0392b' : '#2980b9')};
  }
`;

export default RelatorioDiario;
