"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.diretorioSaida = exports.imagemAConverter = exports.diretorioImagem = exports.diretorioDeletados = exports.diretorioRaiz = exports.outputPath = exports.simsDirectory = exports.allowedExtensions = exports.destinationDirectory = exports.sourceDirectory = void 0;
exports.sourceDirectory = "C:\\Users\\felip\\OneDrive\\Documentos\\Electronic Arts\\The Sims 4\\Mods\\.HOUSE";
//Endereço DESTINO para MOVER por EXTENÇÃO e Tipos permitidos | MOVER POR EXTENÇÃO
exports.destinationDirectory = 'C:/Users/felip/OneDrive/Documentos/Electronic Arts/The Sims 4/Tray';
exports.allowedExtensions = ['.hhi', '.sgi', '.trayitem', '.householdbinary', '.bpi', '.blueprint'];
// Endereço a listar as pastas | LISTA DIRETORIO
exports.simsDirectory = "C:\\Users\\felip\\OneDrive\\Documentos\\Electronic Arts\\The Sims 4\\Mods\\.SIMS\\PACK.SIMS4IMAGINATION";
// Endereço para salvar o arquivo Json da listagem | LISTA DIRETORIO
exports.outputPath = "C:\\Users\\felip\\WebstormProjects\\projetots4\\src\\asset\\json\\listagem01";
// DELETAR DUPLICADOS
exports.diretorioRaiz = 'C:\\Users\\felip\\OneDrive\\Documentos\\Electronic Arts\\The Sims 4\\Mods\\.Slider';
exports.diretorioDeletados = "C:\\Users\\felip\\WebstormProjects\\projetots4\\src\\asset\\deletados";
// CONVERSORES DE IMAGEM | DIRETÓRIO, ARQUIVO e SAÍDA | VALIDAR ARQUIVO
exports.diretorioImagem = 'C:\\Users\\felip\\OneDrive\\Imagens\\Memes';
const nomeImagem = 'Fqi6YqHXoAA6w9X';
const extensao = '.JFIF';
exports.imagemAConverter = nomeImagem + extensao;
exports.diretorioSaida = 'C:/Users/felip/WebstormProjects/projetots4/src/asset/convertido';
