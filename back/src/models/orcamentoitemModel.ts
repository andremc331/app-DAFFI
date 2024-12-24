//orcamentoitemModel

import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Item } from './itemModel';
import { Orcamento } from './orcamentoModel';

const OrcamentoItem = sequelize.define('OrcamentoItem', {
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    material: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    maoDeObra: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    tableName: 'orcamento_items',  // Ajustando o nome da tabela para o padrão plural com underscore
  });

  
  export { OrcamentoItem };