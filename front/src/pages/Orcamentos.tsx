//app.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StyledComponents from '../styled/styled';
import { debounce } from 'lodash';
import DAFFI from "../images/DAFFI logo.jpg"
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const {
  TotalWrapper,
  OrcamentoItem,
  OrcamentoList,
  OrcamentoWrapper,
  // Price,
  Item,
  ItemDetails,
  // ItemList,
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
  ImageContainer,
  DetalhesWrapper,
  ExcluirButton,
  NavegarButton,
  Sidebar,
  SidebarItem,
  MainWrapper,
  Content
} = StyledComponents;

interface Orcamento {
  id: number;
  nome: string;
  quantidade: number;
  materialCorrigido: number;
  maoDeObraCorrigida: number;
  total: number;
  userId: number;
  itens?: Array<{
    nome: string;
    quantidade: number;
    materialCorrigido: number;
    maoDeObraCorrigida: number;
  }>;
}

const Orcamentos: React.FC = () => {
  const [termo, setTermo] = useState('');
  const [itens, setItens] = useState<any[]>([]);
  const [orcamento, setOrcamento] = useState<any[]>([]);
  const [orcamentosSalvos, setOrcamentosSalvos] = useState<Orcamento[]>([]);
  const [orcamentoDetalhado, setOrcamentoDetalhado] = useState<Orcamento | null>(null);
  const [orcamentoNome, setOrcamentoNome] = useState('');
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
    const fetchOrcamentosSalvos = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/orcamentos`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        console.log("Orçamentos retornados:", res.data);
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

  useEffect(() => {
    if (modalItem) {
      console.log('Modal atualizado:', modalItem);
    }
  }, [modalItem]);

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

    if (!orcamentoNome.trim()) {
      alert('Por favor, forneça um nome para o orçamento!');
      return;
    }

    const novoOrcamento = {
      nome: orcamentoNome,
      orcamento: orcamento,  // Itens do orçamento
    };
    
    try {
      const res = await axios.post(
        `${BASE_URL}/api/orcamento`,
        novoOrcamento,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    
      alert('Orçamento salvo com sucesso!');
      setOrcamento([]);  // Limpar o orçamento atual após salvar
      setOrcamentoNome('');  // Limpar o nome do orçamento após salvar
    
      const resOrcamentos = await axios.get(`${BASE_URL}/api/orcamentos`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setOrcamentosSalvos(resOrcamentos.data);
    } catch (err) {
      setErro('Erro ao salvar orçamento');
      console.error('Erro ao salvar orçamento', err);
    }
  };

  const excluirOrcamento = async (orcamentoId: number) => {
    try {
      await axios.delete(`${BASE_URL}/api/orcamentos/${orcamentoId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // Atualizar a lista de orçamentos salvos após a exclusão
      setOrcamentosSalvos(orcamentosSalvos.filter(orcamento => orcamento.id !== orcamentoId));
      alert('Orçamento excluído com sucesso!');
    } catch (err) {
      setErro('Erro ao excluir orçamento');
      console.error('Erro ao excluir orçamento', err);
    }
  };

  const formatarPreco = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const mostrarDetalhesOrcamento = (orcamento: Orcamento) => {
    const orcamentoComItens = {
      ...orcamento,
      itens: orcamento.itens || [], // Garantir que itens seja um array, mesmo vazio
    };
  
    if (orcamentoComItens.itens.length === 0) {
      console.warn("Este orçamento não contém itens detalhados:", orcamento);
    }
  
    setOrcamentoDetalhado(orcamentoComItens);
  };

  const abrirModal = (item: any) => {
    const indiceInflacao = 1.4003; // Inflação acumulada de 40,03%

    // Calculando os valores corrigidos pela inflação
    const materialCorrigido = (item.material || 0) * indiceInflacao;
    const maoDeObraCorrigida = (item.maoDeObra || 0) * indiceInflacao;

    // Adicionando os valores corrigidos ao item
    const itemComValoresCorrigidos = {
      ...item,
      materialCorrigido,
      maoDeObraCorrigida,
    };

    setModalItem(itemComValoresCorrigidos);
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

    const indiceInflacao = 1.4003; // Inflação acumulada de 40,03%

    // Valores corrigidos pela inflação
    const materialCorrigido = (item.material || 0) * indiceInflacao;
    const maoDeObraCorrigida = (item.maoDeObra || 0) * indiceInflacao;

    const materialTotal = materialCorrigido * quantidade;
    const maoDeObraTotal = maoDeObraCorrigida * quantidade;
    const total = materialTotal + maoDeObraTotal;

    const itemOrcamento = {
      ...item,
      quantidade,
      materialCorrigido,
      maoDeObraCorrigida,
      materialTotal,
      maoDeObraTotal,
      total, // Armazenando o total calculado
    };

    setOrcamento([...orcamento, itemOrcamento]);
    fecharModal();
  };

  return (
    <Container>
      <MainWrapper> 
        {/* Barra Lateral */}
        <Sidebar>
          <SidebarItem onClick={() => navigate('/orcamentos')}>Orçamentos</SidebarItem>
          <SidebarItem onClick={() => navigate('/gerar-contrato')}>Contratos</SidebarItem>
          <SidebarItem onClick={() => navigate('/relatorios')}>Relatórios</SidebarItem>
          <SidebarItem>      <LogoutButton />
          </SidebarItem>
        </Sidebar>
         {/* Conteúdo Principal */}
         <Content>
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
              Material (Corrigido): {formatarPreco(Number(modalItem?.materialCorrigido || 0))}
            </p>
            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Mão de Obra (Corrigida): {formatarPreco(Number(modalItem?.maoDeObraCorrigida || 0))}
            </p>
            <StyledNumber style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              TOTAL (Corrigido):{' '}
              {formatarPreco(
                (Number(modalItem.materialCorrigido) || 0) + (Number(modalItem.maoDeObraCorrigida) || 0)
              )}
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
                {item.nome} - {item.quantidade} x Material (Corrigido): {formatarPreco(Number(item.materialCorrigido) || 0)} +
                Mão de Obra (Corrigido): {formatarPreco(Number(item.maoDeObraCorrigida) || 0)}
              </div>
              <div>Total: {formatarPreco(Number(item.total) || 0)}</div>
            </OrcamentoItem>
          ))}
        </OrcamentoList>
        <TotalWrapper>
  <span>Total: {formatarPreco(orcamento.reduce((total, item) => total + (Number(item.total) || 0), 0))}</span>
  <Button onClick={salvarOrcamento}>Salvar Orçamento</Button>
  <Input
    type="text"
    value={orcamentoNome}
    onChange={(e) => setOrcamentoNome(e.target.value)}
    placeholder="Nome do Orçamento"
  />
</TotalWrapper>
      </OrcamentoWrapper>

      <OrcamentoList>
        {orcamentosSalvos.map((orcamento: Orcamento, index: number) => (
          <OrcamentoItem key={orcamento.id || index}>
            <div>{orcamento.nome}</div>
            <div>Total: {formatarPreco(orcamento.total)}</div>
            <Button onClick={() => mostrarDetalhesOrcamento(orcamento)}>
              {orcamentoDetalhado?.id === orcamento.id ? "Esconder Detalhes" : "Ver Detalhes"}
            </Button>
            {orcamentoDetalhado?.id === orcamento.id && (
              <DetalhesWrapper>
                <h3>Itens do Orçamento</h3>
                <ul>
                  {orcamentoDetalhado.itens && orcamentoDetalhado.itens.length > 0 ? (
                    orcamentoDetalhado.itens.map((item, idx) => (
                      <li key={idx}>
                        <span>{item.nome}</span> -
                        <span>{item.quantidade} x {formatarPreco(item.materialCorrigido + item.maoDeObraCorrigida)}</span>
                      </li>
                    ))
                  ) : (
                    <p>Este orçamento não contém itens detalhados.</p>
                  )}
                </ul>
              </DetalhesWrapper>
            )}
            <ExcluirButton onClick={() => excluirOrcamento(orcamento.id)}>Excluir</ExcluirButton>
          </OrcamentoItem>
        ))}
      </OrcamentoList>
        </Content>
      </MainWrapper>
    </Container>
  );
};

export default Orcamentos;