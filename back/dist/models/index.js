"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrcamentoItem = exports.Orcamento = void 0;
// models/index.ts
const orcamentoModel_1 = require("./orcamentoModel");
Object.defineProperty(exports, "Orcamento", { enumerable: true, get: function () { return orcamentoModel_1.Orcamento; } });
const orcamentoitemModel_1 = require("./orcamentoitemModel");
Object.defineProperty(exports, "OrcamentoItem", { enumerable: true, get: function () { return orcamentoitemModel_1.OrcamentoItem; } });
const database_1 = __importDefault(require("../config/database")); // Aqui importa a instância do sequelize
// Definir as associações entre os modelos
orcamentoModel_1.Orcamento.hasMany(orcamentoitemModel_1.OrcamentoItem, { foreignKey: 'orcamento_id', as: 'itens' });
orcamentoitemModel_1.OrcamentoItem.belongsTo(orcamentoModel_1.Orcamento, { foreignKey: 'orcamento_id' });
// Sincronizar os modelos com o banco de dados
database_1.default.sync({ force: false })
    .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
})
    .catch((err) => {
    console.error('Erro ao sincronizar modelos:', err);
});
