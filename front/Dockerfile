# Definir a imagem base
FROM node:20

# Criar um novo usuário chamado 'app'
RUN useradd -m app

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar todos os arquivos do projeto para dentro do container
COPY --chown=app:app . ./

# Ajustar permissões para garantir que o usuário 'app' tenha controle sobre os arquivos
RUN chown -R app /app

# Alternar para o usuário 'app'
USER app

# Instalar as dependências do projeto
RUN npm install --no-cache

# Construir o projeto
RUN npm run build

# Instalar o serve globalmente (se não estiver no package.json)
RUN npm install -g serve

# Definir o comando de execução
CMD ["serve", "-s", "build", "-l", "3000"]