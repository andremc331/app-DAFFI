import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton';
import { useNavigate } from 'react-router-dom';
import DAFFI from "../images/DAFFI logo.jpg";

const RelatorioDiario: React.FC = () => {
  const [data, setData] = useState('');
  const [clima, setClima] = useState('');
  const [atividades, setAtividades] = useState('');
  const [maoDeObra, setMaoDeObra] = useState('');
  const [endereco, setEndereco] = useState('');
  const [responsavelTecnico, setResponsavelTecnico] = useState('');
  const [obra, setObra] = useState('');

  const [observacoes, setObservacoes] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Indicador de carregamento
  const navigate = useNavigate();


  // campos, atualiza e salva o relatório
  const handleSave = async () => {
    setIsLoading(true); // Ativar carregamento
    try {
      const payload = {
        data,
        clima,
        atividades,
        observacoes,
        mao_de_obra: {
          Pedreiro: 3,
          "Ajudante Geral": 2,
        },
        obra,
        responsavel_tecnico: responsavelTecnico,
        endereco,
      };
  
      const BASE_URL = process.env.REACT_APP_BASE_URL;

      // Fazer a requisição ao backend para gerar o PDF
      const response = await axios.post(`${BASE_URL}/gerar-pdf`, payload, {
        responseType: 'blob', // Para lidar com arquivos binários
      });
  
      // Verifica se a resposta foi bem-sucedida
      if (response.status === 200) {
        // Criar um link para o download do arquivo
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
  
        // Baixar o arquivo
        const link = document.createElement('a');
        link.href = url;
        link.download = `Relatorio_Diario_${data || 'sem_data'}.pdf`;
        link.click();
  
        alert('Relatório salvo como PDF!');
      } else {
        console.error('Erro inesperado:', response);
        alert('Erro ao salvar o relatório. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao salvar o relatório:', error);
      alert('Erro ao salvar o relatório. Tente novamente.');
    } finally {
      setIsLoading(false); // Desativar carregamento
    }
  };
  
  // limpa os campos
  const handleClear = () => {
    setData('');
    setClima('');
    setAtividades('');
    setObservacoes('');
  };

  return (
    <Container>
      <MainWrapper>

        {/* Barra Lateral */}
        <Sidebar>
          <SidebarItem onClick={() => navigate('/orcamentos')}>Orçamentos</SidebarItem>
          <SidebarItem onClick={() => navigate('/gerar-contrato')}>Contratos</SidebarItem>
          <SidebarItem onClick={() => navigate('/relatorios')}>Relatórios</SidebarItem>
          <SidebarItem><LogoutButton /></SidebarItem>
        </Sidebar>
  
        {/* Conteúdo Principal */}
        <Content>

          <Header>
            <ImageContainer>
              <img src={DAFFI} alt="Logo DAFFI" />
            </ImageContainer>
            Relatório Diário de Obra
          </Header>

        {/* campos e botões*/}
          <Form>
            <Field>
              <Label>Obra:</Label>
              <Input
                type="text"
                value={obra}
                onChange={(e) => setObra(e.target.value)}
                placeholder="Nome da obra"
              />
            </Field>

            <Field>
              <Label>Responsável Técnico:</Label>
              <Input
                type="text"
                value={responsavelTecnico}
                onChange={(e) => setResponsavelTecnico(e.target.value)}
                placeholder="Nome do responsável técnico"
              />
            </Field>

            <Field>
              <Label>Endereço:</Label>
              <Input
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="Endereço da obra"
              />
            </Field>

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
              <Label>Mão de Obra:</Label>
              {/* Aqui você pode adicionar múltiplos campos para funções e quantidades */}
              <Input
                type="text"
                value={maoDeObra}
                onChange={(e) => setMaoDeObra(e.target.value)}
                placeholder="Ex.: Pedreiro: 3, Servente: 2"
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
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Gerando PDF...' : 'Salvar'}
              </Button>
              <Button onClick={handleClear} $clear>
                Limpar
              </Button>
            </ButtonWrapper>

          </Form>
        </Content>
      </MainWrapper>
    </Container>
  );
};

// Estilizações...
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: sans-serif;
  font-size: medium;

  @media (max-width: 768px) {
    padding: 15px; /* Menos padding em telas menores */
    font-size: small;
  }

  @media (max-width: 480px) {
    padding: 10px; /* Menos padding em telas muito pequenas */
    font-size: small;
  }
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

const Button = styled.button<{ $clear?: boolean }>`
  background-color: ${(props) => (props.$clear ? '#e74c3c' : '#3498db')};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: ${(props) => (props.$clear ? '#c0392b' : '#2980b9')};
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
  font-family: Arial, Helvetica, sans-serif;


  &:hover {
    background-color: #34495e;
    border-radius: 5px;
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 0;
  padding: 10px;
  margin-left: 115px;

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
      max-width: 20%;
    }
  }
`;

const Header = styled.h1`
  margin-top: 50px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8em;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
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

export default RelatorioDiario;
