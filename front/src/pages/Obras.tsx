import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import ObraModal from '../components/ObraModal';
import RelatorioForm from '../components/RelatorioForm';

interface Obra {
    nome: string;
    local: string;
    responsavel: string;
}

const Obras: React.FC = () => {
    const [obras, setObras] = useState<Obra[]>([]);
    const [modalAberto, setModalAberto] = useState(false);
    const [relatorioObra, setRelatorioObra] = useState<Obra | null>(null);
    const excluirObra = (index: number) => {
        const novasObras = obras.filter((_, i) => i !== index);
        setObras(novasObras);
    };
    // Carrega do localStorage na inicialização
    useEffect(() => {
        const obrasSalvas = localStorage.getItem('obras');
        if (obrasSalvas) {
            try {
                const parsed = JSON.parse(obrasSalvas);
                setObras(Array.isArray(parsed) ? parsed : []);
            } catch {
                setObras([]);
            }
        }
    }, []);

    // Salva no localStorage sempre que obras mudar
    useEffect(() => {
        if (obras.length > 0) {
            localStorage.setItem('obras', JSON.stringify(obras));
        }
    }, [obras]);

    const salvarObra = (obra: Obra) => {
        setObras([...obras, obra]);
    };

    return (
        <Wrapper>
            <Sidebar />
            <Conteudo>
                <h1>Obras em Andamento</h1>
                <Botao onClick={() => setModalAberto(true)}>+ Nova Obra</Botao>

                {obras.length === 0 ? (
                    <p>Nenhuma obra cadastrada ainda.</p>
                ) : (
                    <>
                        {obras.map((obra, index) => (
                            <Card key={index} onClick={() => setRelatorioObra(obra)}>
                                <h3>{obra.nome}</h3>
                                <p><strong>Local:</strong> {obra.local}</p>
                                <p><strong>Responsável:</strong> {obra.responsavel}</p>
                                <small>Clique para registrar o relatório do dia</small>
                                <ExcluirButton
                                    onClick={e => {
                                        e.stopPropagation();
                                        excluirObra(index);
                                    }}
                                >
                                    Excluir
                                </ExcluirButton>
                            </Card>
                        ))}
                    </>
                )}

                {modalAberto && (
                    <ObraModal onSave={salvarObra} onClose={() => setModalAberto(false)} />
                )}

                {relatorioObra && (
                    <RelatorioForm obra={relatorioObra} onClose={() => setRelatorioObra(null)} />
                )}
            </Conteudo>
        </Wrapper>
    );
};

export default Obras;

const Wrapper = styled.div`
  display: flex;
    font-family: Arial, sans-serif;

`;

const Conteudo = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: 90px;
`;

const Botao = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

const ExcluirButton = styled.button`
  background: #ff4d4f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  margin-top: 8px;
  float: right;

  &:hover {
    background: #b40808;
  }
`;

const Card = styled.div`
  background: #eee;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #ddd;
  }
`;