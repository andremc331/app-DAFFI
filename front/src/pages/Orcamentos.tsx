//app.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StyledComponents from '../styled/Orcamentostyled';
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
  VerDetalhesButton,
  Sidebar,
  SidebarItem,
  MainWrapper,
  Content,
  LixeiraButton
} = StyledComponents;

interface Orcamento {
  id: number;
  nome: string;
  quantidade: number;
  materialCorrigido: number;
  maoDeObraCorrigida: number;
  total: number;
  userId: number;
  data: Date;
  itens?: Array<{
    id: number;
    nome: string;
    quantidade: number;
    materialCorrigido: number;
    maoDeObraCorrigida: number;
    total: number;
    userId: number;
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

  //login
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    } else {
      navigate('/login');  // Redireciona para a página de login se não houver token
    }
  }, [navigate]);

  //buscar orcamentos salvos
  useEffect(() => {
    const fetchOrcamentosSalvos = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/orcamentos`, {
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

  //atualizar modal
  useEffect(() => {
    if (modalItem) {
      console.log('Modal atualizado:', modalItem);
    }
  }, [modalItem]);

  const BASE_URL = process.env.REACT_APP_API_URL;

  const buscarItens = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/itens?termo=${termo}`);
      const itensOrdenados = res.data.sort((a: any, b: any) => a.nome.localeCompare(b.nome)); // Ordena os itens por nome
      setItens(itensOrdenados);
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

    // Incluindo corretamente a chave 'itens'
    const novoOrcamento = {
      nome: orcamentoNome,  // nome do orçamento
      orcamento: orcamento,  // Itens do orçamento
      itens: orcamento.map(item => ({
        id: item.id,
        nome: item.nome || 'Nome não disponível',  // Garantir que nome tenha um valor
        quantidade: item.quantidade,
        materialCorrigido: item.materialCorrigido,
        maoDeObraCorrigida: item.maoDeObraCorrigida,
        materialTotal: item.materialTotal,
        maoDeObraTotal: item.maoDeObraTotal,
        total: item.total,
        orcamento_id: item.orcamento_id
      }))
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
    const confirmar = window.confirm('Tem certeza de que deseja excluir este orçamento?');

    if (!confirmar) {
      return; // Cancela a exclusão se o usuário clicar em "Cancelar"
    }

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

  const mostrarDetalhesOrcamento = async (orcamento: Orcamento) => {
    if (orcamentoDetalhado?.id === orcamento.id) {
      setOrcamentoDetalhado(null);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/orcamentos/${orcamento.id}`);

      let dados;
      try {
        dados = await response.json();
      } catch (error) {
        console.error('Erro ao processar resposta JSON:', error);
        return;
      }

      if (response.ok && dados && dados.id && dados.itens) {
        setOrcamentoDetalhado(dados);
      } else {
        console.error(`Erro ao buscar detalhes do orçamento: ${response.status} - ${dados?.message || 'Sem mensagem de erro'}`);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do orçamento:', error);
    }
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

  const buscarNomeItem = async (itemId: number) => {
    try {
      const response = await fetch(`${BASE_URL}/api/itens/${itemId}`);
      if (response.ok) {
        const item = await response.json();
        console.log('Nome do item encontrado:', item);  // Adicione esse log para verificar a resposta
        return item.nome;
      } else {
        console.error('Erro ao buscar o nome do item. Status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o nome do item:', error);
      return null;
    }
  };

  const adicionarAoOrcamento = async (item: any, quantidade: number) => {
    if (isNaN(quantidade) || quantidade <= 0) {
      alert('Quantidade inválida!');
      return;
    }

    const indiceInflacao = 1.4003; // Inflação acumulada de 40,03%

    const nome = await buscarNomeItem(item.id) || 'Nome não disponível';

    // Valores corrigidos pela inflação
    const materialCorrigido = (item.material || 0) * indiceInflacao;
    const maoDeObraCorrigida = (item.maoDeObra || 0) * indiceInflacao;

    const materialTotal = materialCorrigido * quantidade;
    const maoDeObraTotal = maoDeObraCorrigida * quantidade;
    const total = materialTotal + maoDeObraTotal;

    const itemOrcamento = {
      ...item,
      nome, // Inclui o nome do item
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

  // Função para excluir um item do orçamento
  const excluirItem = (index: number) => {
    const novosItens = orcamento.filter((item, i) => i !== index);
    setOrcamento(novosItens); // Atualiza o estado com os itens restantes
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
        {/* logo daffi dentro do cabeçalho */}
          <Header>
            <ImageContainer>
              <img src={DAFFI} alt="Logo DAFFI" />
            </ImageContainer>
            Consulta de Preços - Tabela PINI
          </Header>
        {/* barra de pesquisa */}
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


        {/* abre o modal*/}
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
          
        {/* conteúdo do modal*/}
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

        {/* "carrinho de compras do orçamento" */}
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
                  <LixeiraButton onClick={() => excluirItem(index)}>🗑</LixeiraButton>
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
          
        {/* orçamentos salvos */}
          <h2>Orçamentos Salvos</h2>
          <OrcamentoList>
            {orcamentosSalvos.map((orcamento: Orcamento, index: number) => (
              <OrcamentoItem key={orcamento.id || index}>
                <h4>{orcamento.nome}</h4>
                <div>
                  <span style={{ marginLeft: '10px', color: '#000000' }}>
                    {new Intl.DateTimeFormat('pt-BR', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(new Date(orcamento.data))}
                  </span>
                </div>
                <span>Total: {formatarPreco(orcamento.total)}</span>
                <VerDetalhesButton onClick={() => mostrarDetalhesOrcamento(orcamento)}>
                  {orcamentoDetalhado?.id === orcamento.id ? "Esconder Detalhes" : "Ver Detalhes"}
                  
                  {orcamentoDetalhado?.id === orcamento.id && (
                  <DetalhesWrapper>
                    <ul>
                      {orcamentoDetalhado.itens && orcamentoDetalhado.itens.length > 0 ? (
                        orcamentoDetalhado.itens.map((item: any, idx: number) => {
                          const materialCorrigido = parseFloat(item.material || "0");
                          const maoDeObraCorrigida = parseFloat(item.maoDeObra || "0");
                          const totalCorrigido = materialCorrigido + maoDeObraCorrigida;

                          return (
                            <li key={idx}>
                              <div>Item: <span>{item.nome || "Nome não disponível"}</span></div>
                              <div>Quantidade: {item.quantidade};</div>
                              <div>Material: {formatarPreco(materialCorrigido)};</div>
                              <div>Mão de Obra: {formatarPreco(maoDeObraCorrigida)};</div>
                              <div>Total: {formatarPreco(totalCorrigido)}</div>
                            </li>
                          );
                        })
                      ) : (
                        <p>Este orçamento não contém itens detalhados.</p>
                      )}
                    </ul>
                  </DetalhesWrapper>
                )}
                </VerDetalhesButton>
               
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