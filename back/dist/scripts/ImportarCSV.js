"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importarCSV = void 0;
var fs_1 = __importDefault(require("fs"));
var papaparse_1 = __importDefault(require("papaparse"));
var itemModel_1 = require("../models/itemModel"); // Ajuste o caminho ao modelo Sequelize
var importarCSV = function () { return __awaiter(void 0, void 0, void 0, function () {
    var csvData, fixedCsvData, parsed, _i, _a, row, err_1, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 10, , 11]);
                return [4 /*yield*/, fs_1.default.promises.readFile('./src/data/sintetico.csv', 'utf8')];
            case 1:
                csvData = _b.sent();
                fixedCsvData = csvData.replace(/"\s*$/, '');
                parsed = papaparse_1.default.parse(fixedCsvData, {
                    header: true,
                    skipEmptyLines: true,
                    quoteChar: '"', // Especifica o delimitador de campos entre aspas
                    dynamicTyping: true, // Tenta converter os tipos de dados automaticamente
                    delimiter: ',', // Especifica o delimitador (se não for vírgula)
                    escapeChar: '\\', // Adiciona um caractere de escape
                    comments: '#', // Ignora linhas que começam com #
                });
                if (parsed.errors.length > 0) {
                    console.error('Erros encontrados durante o parsing do CSV:', parsed.errors);
                    return [2 /*return*/];
                }
                _i = 0, _a = parsed.data;
                _b.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 9];
                row = _a[_i];
                if (!(row &&
                    row.codigo &&
                    row.nome &&
                    row.unidade &&
                    !isNaN(parseFloat(row.material)) &&
                    !isNaN(parseFloat(row.maoDeObra)) &&
                    !isNaN(parseFloat(row.total)) &&
                    parseFloat(row.material) >= 0 && // Permite material igual a 0
                    parseFloat(row.maoDeObra) >= 0 && // Permite mão de obra igual a 0
                    parseFloat(row.total) >= 0) // Permite total igual a 0
                ) return [3 /*break*/, 7]; // Permite total igual a 0
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 6]);
                return [4 /*yield*/, itemModel_1.Item.create({
                        codigo: row.codigo,
                        nome: row.nome,
                        unidade: row.unidade,
                        material: parseFloat(row.material),
                        maoDeObra: parseFloat(row.maoDeObra),
                        total: parseFloat(row.total),
                    })];
            case 4:
                _b.sent();
                return [3 /*break*/, 6];
            case 5:
                err_1 = _b.sent();
                if (err_1 instanceof Error) {
                    console.error('Erro ao salvar item:', err_1.message);
                    // Caso deseje registrar o erro em um arquivo de log
                    fs_1.default.appendFileSync('./src/data/error_log.txt', "Erro ao salvar item: ".concat(JSON.stringify(row), " - ").concat(err_1.message, "\n"));
                }
                else {
                    console.error('Erro desconhecido ao salvar item:', err_1);
                }
                return [3 /*break*/, 6];
            case 6: return [3 /*break*/, 8];
            case 7:
                console.warn('Dados inválidos encontrados e ignorados:', row);
                // Caso deseje registrar os dados inválidos
                fs_1.default.appendFileSync('./src/data/invalid_data_log.txt', "Dados inv\u00E1lidos: ".concat(JSON.stringify(row), "\n"));
                _b.label = 8;
            case 8:
                _i++;
                return [3 /*break*/, 2];
            case 9:
                console.log('Dados importados para o banco!');
                return [3 /*break*/, 11];
            case 10:
                err_2 = _b.sent();
                if (err_2 instanceof Error) {
                    console.error('Erro ao ler ou processar o arquivo CSV:', err_2.message);
                }
                else {
                    console.error('Erro desconhecido ao ler ou processar o arquivo CSV:', err_2);
                }
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.importarCSV = importarCSV;
(0, exports.importarCSV)().catch(console.error);
