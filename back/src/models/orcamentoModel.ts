//orcamentoModel

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Importe seu sequelize

// Definindo os tipos para o Orcamento
export interface OrcamentoAttributes {
  id: number;
  nome: string;
  total: number;
  userId: number;
}

// Definindo os tipos para criação de Orcamento
export interface OrcamentoCreationAttributes {
  total: number;
  nome: string;
  userId: number;
}

// Definindo o modelo Orcamento
export class Orcamento extends Model<OrcamentoAttributes, OrcamentoCreationAttributes> implements OrcamentoAttributes {
  public id!: number;
  public nome!: string;
  public total!: number;
  public userId!: number;
}

Orcamento.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',  // Nome da tabela de usuários no banco de dados
        key: 'id',       // Chave primária na tabela de usuários
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Orcamento',
    tableName: 'orcamentos',  // Corrigido para o nome correto da tabela
  }
);