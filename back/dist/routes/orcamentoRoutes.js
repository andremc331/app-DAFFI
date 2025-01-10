"use strict";
//orcamentoRoutes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Importa o pacote jwt
const orcamentoModel_1 = require("../models/orcamentoModel");
const orcamentoitemModel_1 = require("../models/orcamentoitemModel");
const router = express_1.default.Router();
// Função de autenticação usando JWT diretamente
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Extrai o token do header
    if (!token) {
        return res.status(401).json({ message: 'Acesso negado, token não fornecido' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'secret'); // Verifica e decodifica o token
        req.user = decoded; // Adiciona as informações do usuário no objeto da requisição
        next(); // Chama a próxima função na cadeia de middlewares
    }
    catch (err) {
        console.error('Erro ao verificar o token:', err);
        res.status(400).json({ message: 'Token inválido' });
    }
};
router.post('/', authenticate, async (req, res) => {
    const { orcamento, nome } = req.body; // Inclui o nome no corpo da requisição
    const userId = req.user.id; // Obtém o userId do token JWT
    if (!nome.trim()) {
        return res.status(400).json({ message: 'O nome do orçamento é obrigatório!' });
    }
    try {
        // Calcula o total geral do orçamento
        const totalGeral = orcamento.reduce((total, item) => total + item.total, 0);
        // Cria o orçamento com o nome e o total geral
        const novoOrcamento = await orcamentoModel_1.Orcamento.create({
            nome,
            total: totalGeral,
            userId,
        });
        // Associa os itens do orçamento, incluindo o nome do item
        for (const item of orcamento) {
            await orcamentoitemModel_1.OrcamentoItem.create({
                orcamento_id: novoOrcamento.id,
                itemId: item.id,
                nome: item.nome, // Inclui o nome do item na associação
                quantidade: item.quantidade,
                material: item.materialTotal,
                maoDeObra: item.maoDeObraTotal,
                total: item.total,
            });
        }
        res.status(201).json({ message: 'Orçamento salvo com sucesso!', orcamentoId: novoOrcamento.id });
    }
    catch (err) {
        console.error('Erro ao salvar orçamento:', err);
        res.status(500).json({ message: 'Erro ao salvar orçamento' });
    }
});
// Rota para listar todos os orçamentos de um usuário
router.get('/', authenticate, async (req, res) => {
    const userId = req.user.id; // Obtém o userId do token JWT
    try {
        const orcamentos = await orcamentoModel_1.Orcamento.findAll({ where: { userId } });
        res.json(orcamentos);
    }
    catch (err) {
        console.error('Erro ao listar orçamentos:', err);
        res.status(500).json({ message: 'Erro ao listar orçamentos' });
    }
});
// Rota para obter um orçamento específico
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const orcamento = await orcamentoModel_1.Orcamento.findOne({
            where: { id },
            include: [
                {
                    model: orcamentoitemModel_1.OrcamentoItem,
                    as: 'itens',
                    attributes: ['id', 'nome', 'quantidade', 'material', 'maoDeObra', 'total'], // Garantir que o campo nome esteja incluído
                }
            ]
        });
        if (!orcamento) {
            return res.status(404).json({ message: 'Orçamento não encontrado' });
        }
        res.status(200).json(orcamento);
    }
    catch (err) {
        console.error('Erro ao buscar orçamento:', err);
        res.status(500).json({ message: 'Erro ao buscar orçamento' });
    }
});
// Rota para excluir um orçamento
router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params; // Obtém o ID do orçamento a ser excluído
    const userId = req.user.id; // Obtém o userId do token JWT
    try {
        // Verifica se o orçamento existe e se pertence ao usuário
        const orcamento = await orcamentoModel_1.Orcamento.findOne({ where: { id, userId } });
        if (!orcamento) {
            return res.status(404).json({ message: 'Orçamento não encontrado ou não autorizado a excluí-lo' });
        }
        // Exclui o orçamento
        await orcamentoModel_1.Orcamento.destroy({ where: { id } });
        res.status(200).json({ message: 'Orçamento excluído com sucesso' });
    }
    catch (err) {
        console.error('Erro ao excluir orçamento:', err);
        res.status(500).json({ message: 'Erro ao excluir orçamento' });
    }
});
// Exportando o roteador para ser utilizado no app principal
exports.default = router;
