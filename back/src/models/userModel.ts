import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

class User extends Model {
  // Método para comparar a senha fornecida com o hash armazenado
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

// Antes de salvar o usuário, fazer o hash da senha
User.addHook('beforeCreate', async (user: any) => {
  const salt = await bcrypt.genSalt(10);  // Gerar o salt
  user.password = await bcrypt.hash(user.password, salt);  // Criptografar a senha
});

export default User;