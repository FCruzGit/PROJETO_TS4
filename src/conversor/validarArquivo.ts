import {imagemAConverter, diretorioImagem, diretorioSaida} from "../operador/template";
import { criarPDFComJPG } from './JPGtoPDF';
import { criarPDFComJFIF } from './JFIFtoPDF';
import { criarPDFComPNG } from './PNGtoPDF';
import { criarPDFComJPEG } from './JPEGtoPDF';
import path from 'path';

interface FuncaoConversao { (caminhoImagem: string, saidaPDF: string): Promise<void>; }
const extensoesParaFuncao: Record<string, FuncaoConversao> = {'.jpg': criarPDFComJPG, '.jpeg': criarPDFComJPEG, '.jfif': criarPDFComJFIF, '.png': criarPDFComPNG};

function isSupportedExtension(filename: string): boolean {
    const supportedExtensions = ['.jpg', '.jpeg', '.jfif', '.png'];
    const ext = path.extname(filename).toLowerCase();
    return supportedExtensions.includes(ext);
}

if (isSupportedExtension(imagemAConverter)) {
    const caminhoImagem = path.join(diretorioImagem, imagemAConverter);
    const saidaPDF = diretorioSaida;
    const extensao = path.extname(imagemAConverter).toLowerCase();

    const funcaoDeConversao = extensoesParaFuncao[extensao];

    if (funcaoDeConversao) {
        funcaoDeConversao(caminhoImagem, saidaPDF);
    } else {
        console.error('Extensão de imagem não suportada.');
    }
} else {
    console.error('Extensão de imagem não suportada.');
}
