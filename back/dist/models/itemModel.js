"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Item extends sequelize_1.Model {
}
exports.Item = Item;
Item.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    unidade: {
        type: sequelize_1.DataTypes.STRING,
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
    sequelize: database_1.default, // Passa a instância do Sequelize
    modelName: 'Item', // Nome do modelo
    tableName: 'itens', // Nome da tabela no banco de dados
    timestamps: false, // Se você não estiver usando colunas createdAt/updatedAt
});
// Sincronizar o modelo com o banco de dados
Item.sync({ alter: true }).then(() => {
    console.log('Tabela "Itens" criada ou alterada com sucesso!');
});
