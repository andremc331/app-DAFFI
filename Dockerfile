# Definir a imagem base
FROM node:20

# Criar um novo usuário chamado 'app'
RUN useradd -m app

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json package-lock*.json ./

# Ajustar permissões para garantir que o usuário 'app' tenha controle sobre os arquivos
RUN chown -R app /app

# Alternar para o usuário 'app' antes de instalar as dependências
USER app

# Instalar as dependências do projeto
RUN npm install --no-cache

# Copiar o restante dos arquivos do projeto
COPY --chown=app:app . ./

# Construir o projeto (se necessário)
RUN npm run build

# Instalar o serve globalmente (se não estiver no package.json)
RUN npm install -g serve

# Definir o comando de execução
CMD ["serve", "-s", "build", "-l", "3000"]
