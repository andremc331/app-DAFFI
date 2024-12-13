"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var database_1 = __importDefault(require("./config/database"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
var ImportarCSV_1 = require("./scripts/ImportarCSV"); // Importe a função de importação do CSV
var app = (0, express_1.default)();
// Configuração do CORS para permitir apenas o frontend local
var corsOptions = {
    origin: 'http://localhost:3000', // Ajuste o domínio conforme necessário
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeçalhos permitidos
};
app.use((0, cors_1.default)(corsOptions)); // Usando as opções de CORS definidas
app.use(express_1.default.json());
// Definindo as rotas
app.use('/users', userRoutes_1.default);
app.use('/api/itens', itemRoutes_1.default);
// Sincronizando o banco de dados
database_1.default.sync({ alter: true }).then(function () {
    console.log('Database connected!');
    // Após a sincronização do banco, chamamos a função de importação do CSV
    (0, ImportarCSV_1.importarCSV)().catch(function (err) {
        console.error('Erro ao importar o CSV:', err);
    });
}).catch(function (err) {
    console.error('Error syncing database:', err);
});
// Iniciando o servidor na porta 3001 (ou outra porta, se preferir)
app.listen(3001, function () {
    console.log('Server is running on http://localhost:3001');
});
