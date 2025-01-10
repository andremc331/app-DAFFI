"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize"); // Importação do operador para condições no Sequelize
const itemModel_1 = require("../models/itemModel"); // Caminho para o modelo Item
const app = express_1.default.Router();
// Rota para buscar itens com base no termo de pesquisa
app.get('/', async (req, res) => {
    const termo = req.query.termo; // Obtém o termo da query string
    try {
        const itens = termo
            ? await itemModel_1.Item.findAll({
                where: {
                    nome: {
                        [sequelize_1.Op.iLike]: `%${termo}%`, // Busca insensível a maiúsculas/minúsculas
                    },
                },
            })
            : await itemModel_1.Item.findAll(); // Se não houver termo, retorna todos os itens
        res.json(itens);
    }
    catch (err) {
        console.error('Erro ao buscar itens:', err);
        res.status(500).json({ message: 'Erro ao buscar itens' });
    }
});
// Rota para buscar um item específico pelo ID
app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Busca o item pelo ID
        const item = await itemModel_1.Item.findByPk(id); // Usando `findByPk` para encontrar pelo ID primário
        if (!item) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        // Retorna apenas o nome do item
        res.json({ nome: item.nome });
    }
    catch (err) {
        console.error('Erro ao buscar item:', err);
        res.status(500).json({ message: 'Erro ao buscar item' });
    }
});
exports.default = app;
