//app.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StyledComponents from './styled';
import { debounce } from 'lodash';
import DAFFI from "../src/images/DAFFI logo.jpg"
import { useNavigate } from 'react-router-dom';

const {
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
  ModalOverlay,
  ModalContent,
  ModalButton,
  ImageContainer
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
} = StyledComponents;

const App: React.FC = () => {
  const [termo, setTermo] = useState('');
  const [itens, setItens] = useState<any[]>([]);
  const [orcamento, setOrcamento] = useState<any[]>([]);
  const [orcamentosSalvos, setOrcamentosSalvos] = useState<any[]>([]);  // Adiciona o estado para armazenar os orçamentos salvos
  const [erro, setErro] = useState<string>('');
  const [modalItem, setModalItem] = useState<any | null>(null);
  const [quantidade, setQuantidade] = useState<string>('');
  const [authToken, setAuthToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    } else {
      navigate('/login');  // Redireciona para a página de login se não houver token
    }
  }, [navigate]);

  useEffect(() => {
    // Função para buscar orçamentos salvos
    const fetchOrcamentosSalvos = async () => {
      try {
        const res = await axios.get('http://192.168.15.116:3001/api/orcamentos', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setOrcamentosSalvos(res.data);
      } catch (err) {
        setErro('Erro ao buscar orçamentos salvos');
        console.error('Erro ao buscar orçamentos salvos', err);
      }
    };

    if (authToken) {
      fetchOrcamentosSalvos();
    }
  }, [authToken]);

  const BASE_URL = 'http://192.168.15.116:3001';

  const buscarItens = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/itens?termo=${termo}`);
      const itensOrdenados = res.data.sort((a: any, b: any) => a.nome.localeCompare(b.nome)); // Ordena os itens por nome
      setItens(itensOrdenados);
      setItens(res.data);
      setErro('');
    } catch (err) {
      setErro('Erro ao buscar itens');
      console.error('Erro ao buscar itens', err);
    }
  };


  const buscarItensDebounced = debounce((termo: string) => {
    buscarItens();
  }, 500); // Espera 500ms após a última digitação para realizar a busca

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermo(e.target.value);
    buscarItensDebounced(e.target.value); // Chama a função de busca com debounce
  };

  const salvarOrcamento = async () => {
    if (!orcamento.length) {
      alert('Não há itens no orçamento para salvar!');
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/api/orcamento`,
        { orcamento },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert('Orçamento salvo com sucesso!');
      setOrcamento([]);  // Limpar o orçamento atual após salvar
      // Recarregar os orçamentos salvos
      const resOrcamentos = await axios.get('http://192.168.15.116:3001/api/orcamentos', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setOrcamentosSalvos(resOrcamentos.data);
    } catch (err) {
      setErro('Erro ao buscar orçamento');
      console.error('Erro ao buscar orçamento', err);
    }
  };

  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };


  const abrirModal = (item: any) => {
    setModalItem(item);
    setQuantidade('');
  };

  const fecharModal = () => {
    setModalItem(null);
    setQuantidade('');
  };

  const adicionarAoOrcamento = (item: any, quantidade: number) => {
    if (isNaN(quantidade) || quantidade <= 0) {
      alert('Quantidade inválida!');
      return;
    }

    const materialTotal = item.material * quantidade;
    const maoDeObraTotal = item.maoDeObra * quantidade;
    const total = materialTotal + maoDeObraTotal;

    const itemOrcamento = {
      ...item,
      quantidade,
      materialTotal,
      maoDeObraTotal,
      total,  // Armazenando o total calculado
    };

    setOrcamento([...orcamento, itemOrcamento]);
    fecharModal();
  };

  return (
    <Container>

      <Header>
        <ImageContainer>
          <img src={DAFFI} alt="Logo DAFFI" />
        </ImageContainer>
        Consulta de Preços - Tabela PINI
      </Header>

      <InputWrapper>
        <Input
          type="text"
          value={termo}
          onChange={handleInputChange}
          placeholder="Pesquisar por item"
        />
        <Button onClick={() => buscarItens()}>Pesquisar</Button>
      </InputWrapper>

      {erro && <ErrorMessage>{erro}</ErrorMessage>}

      <div>
        <h2>Resultados da Pesquisa</h2>
        {itens.length === 0 ? (
          <p>Nenhum item encontrado.</p>
        ) : (
          <ScrollableItemList>
            {itens.map((item) => (
              <Item key={item.id}>
                <ItemDetails>
                  <ItemNome> {item.nome}</ItemNome>
                </ItemDetails>
                <Button onClick={() => abrirModal(item)}>Ver Detalhes</Button>
              </Item>
            ))}
          </ScrollableItemList>
        )}
      </div>

      {modalItem && (
        <ModalOverlay>
          <ModalContent>
            <ModalButton onClick={fecharModal}>X</ModalButton>
            <h3>Adicionar ao Orçamento</h3>
            <ItemNome>Item: {modalItem.nome}</ItemNome>
            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Unidade:
              <span style={{ fontSize: modalItem.unidade === 'm²' ? '1.3em' : '1em', marginLeft: '3px' }}>
                {modalItem.unidade}
              </span>
            </p>
            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Material: {formatarPreco(Number(modalItem.material) || 0)}
            </p>
            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Mão de Obra: {formatarPreco(Number(modalItem.maoDeObra) || 0)}
            </p>
            <StyledNumber style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              TOTAL: {formatarPreco(Number(modalItem.total) || 0)}
            </StyledNumber>
            <Input
              type="number"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              placeholder="Digite a quantidade"
              style={{ marginBottom: '10px', marginTop: '5px' }}
            />
            <Button onClick={() => adicionarAoOrcamento(modalItem, parseFloat(quantidade))}>Adicionar</Button>
          </ModalContent>
        </ModalOverlay>
      )}

      <OrcamentoWrapper>
        <h2>Orçamento</h2>
        <OrcamentoList>
          {orcamento.map((item, index) => (
            <OrcamentoItem key={index}>
              <div>
                {item.nome} - {item.quantidade} x Material: {formatarPreco(Number(item.material) || 0)} + Mão de
                Obra: {formatarPreco(Number(item.maoDeObra) || 0)}
              </div>
              <div>{formatarPreco(Number(item.total) || 0)}</div>
            </OrcamentoItem>
          ))}
        </OrcamentoList>
        <TotalWrapper>
          Total: {formatarPreco(orcamento.reduce((total, item) => total + (Number(item.total) || 0), 0))}
          <Button onClick={salvarOrcamento}>Salvar Orçamento</Button>
        </TotalWrapper>
      </OrcamentoWrapper>

      <OrcamentoWrapper>
        <h2>Orçamentos Salvos</h2>
        {orcamentosSalvos.length === 0 ? (
          <p>Não há orçamentos salvos.</p>
        ) : (
          <OrcamentoList>
            {orcamentosSalvos.map((orcamento, index) => (
              <OrcamentoItem key={index}>
                <div>{`Orçamento #${orcamento.id}`}</div>
                <div>Total: {formatarPreco(orcamento.total)}</div> {/* Aqui chama a função formatarPreco */}
              </OrcamentoItem>
            ))}
          </OrcamentoList>
        )}
      </OrcamentoWrapper>

      <Button onClick={() => navigate('/gerar-contrato')}>Gerar Contrato</Button>

    </Container>
  );
};

export default App;