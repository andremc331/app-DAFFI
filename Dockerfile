# Usar a imagem base oficial do Node.js
FROM node:18

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências (package.json e package-lock.json)
COPY back/package*.json ./

# Compilar o código TypeScript
RUN npm run build

# Instalar as dependências da aplicação
RUN npm install

# Copiar todo o código da aplicação para dentro do container
COPY back/ ./

# Expor a porta que o backend está configurado para ouvir
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]