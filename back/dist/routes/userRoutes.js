"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = express_1.default.Router();
// Rota para cadastro de usuário
app.post('/register', async (req, res) => {
    console.log('Dados recebidos no registro:', req.body);
    const { name, email, password } = req.body;
    try {
        console.log('Verificando se o usuário já existe...');
        const existingUser = await userModel_1.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }
        console.log('Criando usuário...');
        const user = await userModel_1.User.create({ name, email, password });
        console.log('Usuário criado com sucesso:', user);
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });
        res.status(201).json({ token });
    }
    catch (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).json({ message: 'Erro ao cadastrar usuário' });
    }
});
// Rota para login do usuário
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }
        // const isPasswordValid = await (password, user.password);
        // if (!isPasswordValid) {
        //   return res.status(400).json({ message: 'Senha incorreta' });
        // }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });
        res.json({ token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
});
// Rota para listar todos os usuários (exemplo)
app.get('/', async (req, res) => {
    const users = await userModel_1.User.findAll();
    res.json(users);
});
exports.default = app;
