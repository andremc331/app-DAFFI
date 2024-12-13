"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
var sequelize_1 = require("sequelize");
var database_1 = __importDefault(require("../config/database"));
var Item = database_1.default.define('Item', {
    codigo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Código do item
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Especificação do item
    },
    unidade: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Unidade de medida
    },
    material: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false, // Custo de material
    },
    maoDeObra: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false, // Custo de mão de obra
    },
    total: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false, // Custo total
    },
});
exports.Item = Item;
// Sincronizar o modelo com o banco de dados (criar a tabela se não existir)
Item.sync({ alter: true }).then(function () {
    console.log('Tabela "Itens" criada ou alterada com sucesso!');
});
