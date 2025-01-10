"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// Criação da instância do Sequelize para se conectar ao PostgreSQL
const sequelize = new sequelize_1.Sequelize({
    dialect: 'postgres',
    host: 'daffi.cdyucqc0y8kr.sa-east-1.rds.amazonaws.com',
    port: 5432,
    username: 'postgres',
    password: 'Andre01*',
    database: 'daffi',
    logging: false,
    dialectOptions: {
        connectTimeout: 10000, // tempo limite de 10 segundos para conectar
    },
});
// Testar a conexão
sequelize.authenticate()
    .then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!');
})
    .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err);
});
sequelize.sync({ force: false }) // O parâmetro "force: false" garante que ele não apagará as tabelas existentes
    .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
})
    .catch((err) => {
    console.error('Erro ao sincronizar modelos:', err);
});
exports.default = sequelize;
