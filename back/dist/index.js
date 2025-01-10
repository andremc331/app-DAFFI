"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./config/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
const ImportarCSV_1 = require("./scripts/ImportarCSV"); // Importe a função de importação do CSV
const orcamentoRoutes_1 = __importDefault(require("./routes/orcamentoRoutes"));
const pdfRoutes_1 = __importDefault(require("./routes/pdfRoutes"));
require("./models"); // Aqui você chama o arquivo que importa e inicializa os modelos
const app = (0, express_1.default)();
// Configuração do CORS para permitir acessos conforme necessário
const corsOptions = {
    origin: '*', // Ajuste conforme necessário para maior segurança
};
app.use((0, cors_1.default)(corsOptions)); // Habilita o CORS com a configuração
app.use(express_1.default.json()); // Middleware para fazer o parsing de JSON
// Definindo as rotas
app.use('/api/orcamentos', orcamentoRoutes_1.default);
app.use('/api/orcamento', orcamentoRoutes_1.default); // Rota para orçamentos
app.use('/users', userRoutes_1.default); // Rota para usuários
app.use('/api/itens', itemRoutes_1.default); // Rota para itens
app.use('/gerar-pdf', pdfRoutes_1.default);
// Inicialização do banco de dados
database_1.default.authenticate()
    .then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!');
})
    .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err);
});
// Sincroniza os modelos e inicia o servidor
database_1.default.sync({ alter: true })
    .then(() => {
    console.log('Banco de dados sincronizado');
    return (0, ImportarCSV_1.importarCSV)(); // Chama a função de importação do CSV após a sincronização
})
    .then(() => {
    console.log('Importação do CSV concluída!');
})
    .catch((err) => {
    console.error('Erro ao sincronizar banco de dados ou importar CSV', err);
});
// Iniciando o servidor na porta 3001
const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando e acessível externamente em http://<seu-ip>:${PORT}`);
});
