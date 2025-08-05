import React, { useState, useEffect } from 'react';
import StyledComponents from '../styled/Orcamentostyled';
import Sidebar from '../components/Sidebar';

const {Container, MainWrapper, Content} = StyledComponents

type Categoria = 'Hidráulica' | 'Elétrica' | 'Civil' | 'Diversos' | 'EPIs';

interface ItemEstoque {
  id: string;
  nome: string;
  quantidade: number;
  categoria: Categoria;
}

const categorias: Categoria[] = ['Hidráulica', 'Elétrica', 'Civil', 'Diversos', 'EPIs'];

export default function Estoque() {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState<number>(1);
  const [categoria, setCategoria] = useState<Categoria>('Hidráulica');

  // Carregar dados do localStorage ao iniciar
 const [itens, setItens] = useState<ItemEstoque[]>(() => {
  const dadosSalvos = localStorage.getItem('estoque');
  if (dadosSalvos) {
    try {
      const parsed = JSON.parse(dadosSalvos);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
});

  // Salvar no localStorage quando itens forem alterados
  useEffect(() => {
      console.log('Salvando no localStorage:', itens);
    localStorage.setItem('estoque', JSON.stringify(itens));
  }, [itens]);

  const adicionarItem = () => {
    if (nome.trim() === '' || quantidade <= 0) return;

    const novoItem: ItemEstoque = {
      id: Date.now().toString(),
      nome,
      quantidade,
      categoria,
    };

    setItens(prev => [...prev, novoItem]);
    setNome('');
    setQuantidade(1);
    setCategoria('Hidráulica');
  };

  const removerItem = (id: string) => {
    const atualizados = itens.filter(item => item.id !== id);
    setItens(atualizados);
  };

  return (
   <Container>
    <MainWrapper>
    <Content>
    <Sidebar />
<div style={{ padding: '2rem' }}>
      <h2>Estoque de Materiais</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Nome do item"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          type="number"
          min={1}
          placeholder="Quantidade"
          value={quantidade}
          onChange={e => setQuantidade(Number(e.target.value))}
        />
        <select value={categoria} onChange={e => setCategoria(e.target.value as Categoria)}>
          {categorias.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={adicionarItem}>Adicionar</button>
      </div>

      {categorias.map(cat => (
        <div key={cat} style={{ marginBottom: '1.5rem' }}>
          <h3>{cat}</h3>
          <ul>
            {itens
              .filter(item => item.categoria === cat)
              .map(item => (
                <li key={item.id}>
                  {item.nome} — {item.quantidade}
                  <button onClick={() => removerItem(item.id)} style={{ marginLeft: '10px' }}>Remover</button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
    </Content>
    </MainWrapper>
    </Container>
  );
}