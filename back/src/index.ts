import express from 'express';
import cors from 'cors';
import sequelize from './config/database';
import userRoutes from './routes/userRoutes';
import itemRoutes from './routes/itemRoutes';
import {importarCSV} from './scripts/ImportarCSV';  // Importe a função de importação do CSV

const app = express();

// Configuração do CORS para permitir apenas o frontend local
const corsOptions = {
  origin: '*'
};

app.use(cors(corsOptions));  // Usando as opções de CORS definidas
app.use(express.json());

// Definindo as rotas
app.use('/users', userRoutes);
app.use('/api/itens', itemRoutes);

// Sincronizando o banco de dados
sequelize.sync({ alter: true }).then(() => {
  console.log('Database connected!');
  
  // Após a sincronização do banco, chamamos a função de importação do CSV
  importarCSV().catch((err) => {
    console.error('Erro ao importar o CSV:', err);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});

// Iniciando o servidor na porta 3001 (ou outra porta, se preferir)
app.listen(3001, '0.0.0.0', () => {
  console.log('Server is running and accessible externally on http://<your-ip>:3001');
});