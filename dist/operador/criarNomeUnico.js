"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarNomeUnico = void 0;
const fs_1 = __importDefault(require("fs"));
function criarNomeUnico(diretorioSaida, nomeBase) {
    let contador = 0;
    let nomeArquivo = `${nomeBase}.pdf`;
    while (fs_1.default.existsSync(`${diretorioSaida}/${nomeArquivo}`)) {
        contador++;
        nomeArquivo = `${nomeBase}_${contador}.pdf`;
    }
    return nomeArquivo;
}
exports.criarNomeUnico = criarNomeUnico;
