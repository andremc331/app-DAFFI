// src/App.tsx
import React, { useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [termo, setTermo] = useState('');
  const [itens, setItens] = useState<any[]>([]);
  const [orcamento, setOrcamento] = useState<any[]>([]);

  // Função de pesquisa
  const buscarItens = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/itens?termo=${termo}`);
      setItens(res.data);
    } catch (err) {
      console.error('Erro ao buscar itens', err);
    }
  };

  // Adicionar item ao orçamento
  const adicionarAoOrcamento = (item: any, quantidade: number) => {
    const itemOrcamento = {
      ...item,
      quantidade,
      total: item.preco * quantidade,
    };
    setOrcamento([...orcamento, itemOrcamento]);
  };

  return (
    <div>
      <h1>Consulta de Preços - Tabela PINI</h1>
      <input
        type="text"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder="Pesquisar por item"
      />
      <button onClick={buscarItens}>Buscar</button>

      <div>
        <h2>Resultados da Pesquisa</h2>
        <ul>
          {itens.map((item) => (
            <li key={item.id}>
              {item.nome} - {item.preco} {item.unidade}
              <button
                onClick={() => {
                  const quantidade = prompt('Digite a quantidade');
                  if (quantidade) adicionarAoOrcamento(item, parseFloat(quantidade));
                }}
              >
                Adicionar ao Orçamento
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Orçamento</h2>
        <ul>
          {orcamento.map((item, index) => (
            <li key={index}>
              {item.nome} - {item.quantidade} x {item.preco} = {item.total}
            </li>
          ))}
        </ul>
        <div>
          Total: {orcamento.reduce((total, item) => total + item.total, 0)}
        </div>
      </div>
    </div>
  );
};

export default App;