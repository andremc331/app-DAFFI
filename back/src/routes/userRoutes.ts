import express from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Rota para cadastro de usuário
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criar novo usuário
    const user = await User.create({ name, email, password });

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });

    res.status(201).json({ token });  // Retorna o token
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

// Rota para login do usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Procurar o usuário pelo email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Comparar a senha fornecida com a armazenada
    const isPasswordValid = await User.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, 'secret', { expiresIn: '1h' });

    res.json({ token });  // Retorna o token
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

// Rota para listar todos os usuários (exemplo)
router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

export default router;