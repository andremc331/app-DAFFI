import { Sequelize } from 'sequelize';

// Criação da instância do Sequelize para se conectar ao PostgreSQL
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', // Host onde o banco de dados está rodando
  port: 5432,        // Porta padrão do PostgreSQL
  username: 'postgres', // Nome de usuário do banco de dados
  password: '123',   // Senha do banco de dados
  database: 'daffi',   // Nome do banco de dados
  logging: false,          // Desabilitar logs (opcional)
});

// Testar a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados realizada com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

  sequelize.sync({ force: false })  // O parâmetro "force: false" garante que ele não apagará as tabelas existentes
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar modelos:', err);
  });  

export default sequelize;