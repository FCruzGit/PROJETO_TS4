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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarPDFComJPEG = void 0;
const pdf_lib_1 = require("pdf-lib");
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const criarNomeUnico_1 = require("../operador/criarNomeUnico");
function criarPDFComJPEG(jpegPath, diretorioSaida) {
    return __awaiter(this, void 0, void 0, function* () {
        const pdfDoc = yield pdf_lib_1.PDFDocument.create();
        const page = pdfDoc.addPage([612, 792]);
        const jpegBuffer = yield (0, sharp_1.default)(jpegPath).toBuffer();
        const jpegImage = yield pdfDoc.embedJpg(jpegBuffer);
        const jpegDims = jpegImage.scale(1);
        const jpegWidth = jpegDims.width;
        const jpegHeight = jpegDims.height;
        const pageWidth = page.getSize().width;
        const pageHeight = page.getSize().height;
        const scale = Math.min(pageWidth / jpegWidth, pageHeight / jpegHeight);
        const resizedWidth = jpegWidth * scale;
        const resizedHeight = jpegHeight * scale;
        page.drawImage(jpegImage, {
            x: (pageWidth - resizedWidth) / 2,
            y: (pageHeight - resizedHeight) / 2,
            width: resizedWidth,
            height: resizedHeight,
        });
        // Função para criar um nome de arquivo único com base no diretório de saída e no nome base
        const nomeBase = 'JPEG_convertido';
        const nomeArquivo = (0, criarNomeUnico_1.criarNomeUnico)(diretorioSaida, nomeBase);
        const caminhoCompleto = `${diretorioSaida}/${nomeArquivo}`;
        const pdfBytes = yield pdfDoc.save();
        fs_1.default.writeFileSync(caminhoCompleto, pdfBytes);
    });
}
exports.criarPDFComJPEG = criarPDFComJPEG;
