# Definir a imagem base
FROM node:16

# Criar e definir o diretório de trabalho
WORKDIR /app

# Copiar o arquivo package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências (sem cache)
RUN npm install --no-cache

# Copiar o resto dos arquivos do projeto
COPY . .

# Build do projeto
RUN npm run build

# Expor a porta onde a aplicação estará rodando
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]