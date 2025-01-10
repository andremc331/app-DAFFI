# Usar uma imagem base do Node.js
FROM node:18

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos do projeto para o diretório de trabalho
COPY . .

# Instalar dependências
RUN npm install

# Compilar o código TypeScript
RUN npm run build

# Expor a porta que o app vai rodar
EXPOSE 3001

# Rodar o app
CMD ["npm", "start"]