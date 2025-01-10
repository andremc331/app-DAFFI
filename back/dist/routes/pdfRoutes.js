"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const pythonExecutor_1 = require("../scripts/pythonExecutor");
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
app.post('/', async (req, res) => {
    const dados = req.body;
    try {
        // Chama o script Python para gerar o PDF
        const result = await (0, pythonExecutor_1.gerarPDF)(dados);
        // Se o script Python retornou o nome do arquivo gerado
        const filePath = result.trim();
        // Verifica se o arquivo foi gerado corretamente
        const fullFilePath = path_1.default.resolve(filePath);
        // Envia o PDF de volta para o cliente
        res.sendFile(fullFilePath, (err) => {
            if (err) {
                console.error('Erro ao enviar o arquivo:', err);
                return res.status(500).send('Erro ao gerar o relatório');
            }
        });
    }
    catch (error) {
        console.error('Erro ao gerar o PDF:', error);
        return res.status(500).send('Erro ao gerar o relatório');
    }
});
exports.default = app;
