import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Item = sequelize.define('Item', {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false, // Código do item
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false, // Especificação do item
  },
  unidade: {
    type: DataTypes.STRING,
    allowNull: false, // Unidade de medida
  },
  material: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false, // Custo de material
  },
  maoDeObra: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false, // Custo de mão de obra
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false, // Custo total
  },
});

// Sincronizar o modelo com o banco de dados (criar a tabela se não existir)
Item.sync({ alter: true }).then(() => {
  console.log('Tabela "Itens" criada ou alterada com sucesso!');
});

export { Item };