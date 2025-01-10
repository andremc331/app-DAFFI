"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gerarPDF = gerarPDF;
const child_process_1 = require("child_process");
async function gerarPDF(dados) {
    return new Promise((resolve, reject) => {
        const pythonProcess = (0, child_process_1.spawn)('python', ['src/python/app.py', JSON.stringify(dados)]);
        pythonProcess.stdout.on('data', (data) => resolve(data.toString().trim()));
        pythonProcess.stderr.on('data', (data) => {
            console.error('Erro no script Python:', data.toString());
            reject(data.toString());
        });
    });
}
