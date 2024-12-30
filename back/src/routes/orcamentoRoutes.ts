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

router.post('/', authenticate, async (req: express.Request, res: express.Response) => {
  const { orcamento, nome }: { orcamento: OrcamentoItemType[]; nome: string } = req.body;  // Inclui o nome no corpo da requisição
  const userId = req.user.id;  // Obtém o userId do token JWT

  if (!nome.trim()) {
    return res.status(400).json({ message: 'O nome do orçamento é obrigatório!' });
  }

  try {
    // Calcula o total geral do orçamento
    const totalGeral = orcamento.reduce((total, item) => total + item.total, 0);

    // Cria o orçamento com o nome e o total geral
    const novoOrcamento = await Orcamento.create({
      nome,
      total: totalGeral,
      userId,
    });

    // Associa os itens do orçamento
    for (const item of orcamento) {
      await OrcamentoItem.create({
        orcamentoId: novoOrcamento.id,
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

router.get('/:id', async (req, res) => {
  const orcamentoId = parseInt(req.params.id);

  try {
    // Busca o orçamento e os itens associados
    const orcamentoDetalhado = await Orcamento.findOne({
      where: { id: orcamentoId },
      include: [{
        model: OrcamentoItem,
        as: 'itens'  // Defina o alias conforme o seu modelo
      }]
    });

    if (!orcamentoDetalhado) {
      return res.status(404).json({ message: 'Orçamento não encontrado!' });
    }

    // Retorna o orçamento detalhado com os itens
    res.json(orcamentoDetalhado);
  } catch (err) {
    console.error('Erro ao recuperar o orçamento:', err);
    res.status(500).json({ message: 'Erro ao recuperar o orçamento' });
  }
});

// Rota para excluir um orçamento
router.delete('/:id', authenticate, async (req: express.Request, res: express.Response) => {
    const { id } = req.params;  // Obtém o ID do orçamento a ser excluído
    const userId = req.user.id;  // Obtém o userId do token JWT
  
    try {
      // Verifica se o orçamento existe e se pertence ao usuário
      const orcamento = await Orcamento.findOne({ where: { id, userId } });
      if (!orcamento) {
        return res.status(404).json({ message: 'Orçamento não encontrado ou não autorizado a excluí-lo' });
      }
  
      // Exclui o orçamento
      await Orcamento.destroy({ where: { id } });
      res.status(200).json({ message: 'Orçamento excluído com sucesso' });
    } catch (err) {
      console.error('Erro ao excluir orçamento:', err);
      res.status(500).json({ message: 'Erro ao excluir orçamento' });
    }
  });
// Exportando o roteador para ser utilizado no app principal
export default router;