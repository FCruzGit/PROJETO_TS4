"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../operador/template");
const JPGtoPDF_1 = require("./JPGtoPDF");
const JFIFtoPDF_1 = require("./JFIFtoPDF");
const PNGtoPDF_1 = require("./PNGtoPDF");
const JPEGtoPDF_1 = require("./JPEGtoPDF");
const path_1 = __importDefault(require("path"));
const extensoesParaFuncao = { '.jpg': JPGtoPDF_1.criarPDFComJPG, '.jpeg': JPEGtoPDF_1.criarPDFComJPEG, '.jfif': JFIFtoPDF_1.criarPDFComJFIF, '.png': PNGtoPDF_1.criarPDFComPNG };
function isSupportedExtension(filename) {
    const supportedExtensions = ['.jpg', '.jpeg', '.jfif', '.png'];
    const ext = path_1.default.extname(filename).toLowerCase();
    return supportedExtensions.includes(ext);
}
if (isSupportedExtension(template_1.imagemAConverter)) {
    const caminhoImagem = path_1.default.join(template_1.diretorioImagem, template_1.imagemAConverter);
    const saidaPDF = template_1.diretorioSaida;
    const extensao = path_1.default.extname(template_1.imagemAConverter).toLowerCase();
    const funcaoDeConversao = extensoesParaFuncao[extensao];
    if (funcaoDeConversao) {
        funcaoDeConversao(caminhoImagem, saidaPDF);
    }
    else {
        console.error('Extensão de imagem não suportada.');
    }
}
else {
    console.error('Extensão de imagem não suportada.');
}
