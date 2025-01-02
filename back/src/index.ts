import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import itemRoutes from './routes/itemRoutes';
import { importarCSV } from './scripts/ImportarCSV'; // Importe a função de importação do CSV
import orcamentoRoutes from './routes/orcamentoRoutes';
import { spawn } from 'child_process';
import pdfRoutes from './routes/pdfRoutes';

const app = express();

// Configuração do CORS para permitir acessos conforme necessário
const corsOptions = {
  origin: '*', // Ajuste conforme necessário para maior segurança
};

app.use(cors(corsOptions)); // Habilita o CORS com a configuração
app.use(express.json()); // Middleware para fazer o parsing de JSON

// Definindo as rotas
app.use('/api/orcamentos', orcamentoRoutes);
app.use('/api/orcamento', orcamentoRoutes);  // Rota para orçamentos
app.use('/users', userRoutes);  // Rota para usuários
app.use('/api/itens', itemRoutes);  // Rota para itens
app.use('/gerar-pdf', pdfRoutes);

// Inicialização do banco de dados
sequelize
  .sync({ alter: true }) // Sincroniza os modelos, incluindo Orcamento
  .then(() => {
    console.log('Banco de dados conectado e sincronizado!');
    
    // Chama a função para importar os dados do CSV após a sincronização
    return importarCSV();
  })
  .then(() => {
    console.log('Importação do CSV concluída com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar/sincronizar o banco de dados ou importar o CSV:', err);
  });

// Iniciando o servidor na porta 3001
const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando e acessível externamente em http://<seu-ip>:${PORT}`);
});