import React, { useState } from 'react';
import axios from 'axios';
import StyledComponents from './styled';

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
  Container
} = StyledComponents;

const App: React.FC = () => {
  const [termo, setTermo] = useState('');
  const [itens, setItens] = useState<any[]>([]);
  const [orcamento, setOrcamento] = useState<any[]>([]);
  const [erro, setErro] = useState<string>('');

  const buscarItens = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/itens?termo=${termo}`);
      setItens(res.data);
      setErro('');
    } catch (err) {
      setErro('Erro ao buscar itens');
      console.error('Erro ao buscar itens', err);
    }
  };

  const adicionarAoOrcamento = (item: any, quantidade: number) => {
    if (isNaN(quantidade) || quantidade <= 0) {
      alert('Quantidade inválida!');
      return;
    }

    const itemOrcamento = {
      ...item,
      quantidade,
      materialTotal: item.material * quantidade,  // Calcula total de material
      maoDeObraTotal: item.maoDeObra * quantidade,  // Calcula total de mão de obra
      total: item.total * quantidade,  // Calcula total geral (material + mão de obra)
    };

    setOrcamento([...orcamento, itemOrcamento]);
  };

  return (
    <Container>
      <Header>Consulta de Preços - Tabela PINI</Header>

      <InputWrapper>
        <Input
          type="text"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Pesquisar por item"
        />
        <Button onClick={buscarItens}>Buscar</Button>
      </InputWrapper>

      {erro && <ErrorMessage>{erro}</ErrorMessage>}

      <div>
        <h2>Resultados da Pesquisa</h2>
        {itens.length === 0 ? (
          <p>Nenhum item encontrado.</p>
        ) : (
          <ItemList>
            {itens.map((item) => (
              <Item key={item.id}>
                <ItemDetails>
                  <div>{item.nome}</div>
                  <Price>Material: R$ {(Number(item.material) || 0).toFixed(2)}</Price>
                  <Price>Mão de Obra: R$ {(Number(item.maoDeObra) || 0).toFixed(2)}</Price>
                  <Price>Total: R$ {(Number(item.total) || 0).toFixed(2)}</Price>
                </ItemDetails>
                <Button
                  onClick={() => {
                    const quantidade = prompt('Digite a quantidade');
                    if (quantidade) adicionarAoOrcamento(item, parseFloat(quantidade));
                  }}
                >
                  Adicionar ao Orçamento
                </Button>
              </Item>
            ))}
          </ItemList>
        )}
      </div>

      <OrcamentoWrapper>
        <h2>Orçamento</h2>
        <OrcamentoList>
          {orcamento.map((item, index) => (
            <OrcamentoItem key={index}>
              <div>{item.nome} - {item.quantidade} x Material: R$ {(Number(item.material) || 0).toFixed(2)} + Mão de Obra: R$ {(Number(item.maoDeObra) || 0).toFixed(2)}</div>
              <div>R$ {(Number(item.total) || 0).toFixed(2)}</div>
            </OrcamentoItem>
          ))}
        </OrcamentoList>
        <TotalWrapper>
          Total: R$ {orcamento.reduce((total, item) => total + (Number(item.total) || 0), 0).toFixed(2)}
        </TotalWrapper>
      </OrcamentoWrapper>
    </Container>
  );
}

export default App;