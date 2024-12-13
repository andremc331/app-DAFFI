import express from 'express';
import { Op } from 'sequelize'; // Importação do operador para condições no Sequelize
import { Item } from '../models/itemModel'; // Caminho para o modelo Item

const app = express.Router();

// Rota para buscar itens com base no termo de pesquisa
app.get('/', async (req, res) => {
  const termo = req.query.termo as string; // Obtém o termo da query string
  try {
    const itens = termo
      ? await Item.findAll({
          where: {
            nome: {
              [Op.iLike]: `%${termo}%`, // Busca insensível a maiúsculas/minúsculas
            },
          },
        })
      : await Item.findAll(); // Se não houver termo, retorna todos os itens
    res.json(itens);
  } catch (err) {
    console.error('Erro ao buscar itens:', err);
    res.status(500).json({ message: 'Erro ao buscar itens' });
  }
});

export default app;