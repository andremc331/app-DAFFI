//orcamentoRoutes

import express from 'express';
import jwt from 'jsonwebtoken';  // Importa o pacote jwt
import { Orcamento } from '../models/orcamentoModel';
import { OrcamentoItem } from '../models/orcamentoitemModel';

// Definindo o tipo de dados do usuário no token
interface User {
  id: number;
  email: string; // ou outras propriedades que o seu token contiver
}

// Extendendo o tipo Request para incluir a propriedade 'user'
declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

const router = express.Router();

// Função de autenticação usando JWT diretamente
const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extrai o token do header

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado, token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, 'secret') as User;  // Verifica e decodifica o token
    req.user = decoded;  // Adiciona as informações do usuário no objeto da requisição
    next();  // Chama a próxima função na cadeia de middlewares
  } catch (err) {
    console.error('Erro ao verificar o token:', err);
    res.status(400).json({ message: 'Token inválido' });
  }
};

// Definindo tipos para os parâmetros 'orcamento' e 'item'
interface OrcamentoItemType {
  id: number;
  quantidade: number;
  materialTotal: number;
  maoDeObraTotal: number;
  total: number;
}

interface OrcamentoRequestBody {
  orcamento: OrcamentoItemType[];
}

// Rota para salvar um orçamento
router.post('/', authenticate, async (req: express.Request, res: express.Response) => {
  const { orcamento }: OrcamentoRequestBody = req.body;  // Array de itens no orçamento
  const userId = req.user.id;  // Obtém o userId do token JWT

  try {
    // Calcula o total geral do orçamento
    const totalGeral = orcamento.reduce((total, item) => total + item.total, 0);

    // Cria o orçamento com o total geral
    const novoOrcamento = await Orcamento.create({
      total: totalGeral,
      userId,
    });

    // Assegura que a tipagem de novoOrcamento é reconhecida corretamente  
    // Associa os itens do orçamento
    for (const item of orcamento) {
      await OrcamentoItem.create({
        orcamentoId: novoOrcamento.id,  // 'id' será reconhecido corretamente
        itemId: item.id,
        quantidade: item.quantidade,
        material: item.materialTotal,
        maoDeObra: item.maoDeObraTotal,
        total: item.total,
      });
    }

    res.status(201).json({ message: 'Orçamento salvo com sucesso!', orcamentoId: novoOrcamento.id });
  } catch (err) {
    console.error('Erro ao salvar orçamento:', err);
    res.status(500).json({ message: 'Erro ao salvar orçamento' });
  }
});

// Rota para listar todos os orçamentos de um usuário
router.get('/', authenticate, async (req: express.Request, res: express.Response) => {
  const userId = req.user.id;  // Obtém o userId do token JWT

  try {
    const orcamentos = await Orcamento.findAll({ where: { userId } });
    res.json(orcamentos);
  } catch (err) {
    console.error('Erro ao listar orçamentos:', err);
    res.status(500).json({ message: 'Erro ao listar orçamentos' });
  }
});

// Rota para obter um orçamento específico
router.get('/:id', authenticate, async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  const userId = req.user.id;  // Obtém o userId do token JWT

  try {
    const orcamento = await Orcamento.findOne({ where: { id, userId } });
    if (!orcamento) {
      return res.status(404).json({ message: 'Orçamento não encontrado' });
    }
    res.json(orcamento);
  } catch (err) {
    console.error('Erro ao obter orçamento:', err);
    res.status(500).json({ message: 'Erro ao obter orçamento' });
  }
});

// Exportando o roteador para ser utilizado no app principal
export default router;