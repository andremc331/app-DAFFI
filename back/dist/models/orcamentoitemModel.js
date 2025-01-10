"use strict";
//orcamentoitemModel.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrcamentoItem = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const OrcamentoItem = database_1.default.define('OrcamentoItem', {
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true, // Adicione o campo nome
    },
    quantidade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    material: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    maoDeObra: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: 'orcamento_items', // Ajuste no nome da tabela
});
exports.OrcamentoItem = OrcamentoItem;
