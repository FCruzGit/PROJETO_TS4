"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputPath = exports.simsDirectory = exports.allowedExtensions = exports.destinationDirectory = exports.sourceDirectory = exports.fs = exports.path = void 0;
//Importações do Node modules
exports.path = require('path');
exports.fs = require('fs-extra');
// Endereço para realizar a Query | MOVER POR EXTENÇÃO | MOVER PARA RAIZ | VERIFICAR DIRETÓRIO VAZIO
exports.sourceDirectory = "C:\\Users\\felip\\OneDrive\\Documentos\\Electronic Arts\\The Sims 4\\Mods\\.HOUSE";
//Endereço DESTINO para MOVER por EXTENÇÃO e Tipos permitidos | MOVER POR EXTENÇÃO
exports.destinationDirectory = 'C:/Users/felip/OneDrive/Documentos/Electronic Arts/The Sims 4/Tray';
exports.allowedExtensions = ['.hhi', '.sgi', '.trayitem', '.householdbinary', '.bpi', '.blueprint'];
// Endereço a listar as pastas | LISTA DIRETORIO
exports.simsDirectory = "C:\\Users\\felip\\OneDrive\\Documentos\\Electronic Arts\\The Sims 4\\Mods\\.SIMS\\PACK.SIMS4IMAGINATION";
// Endereço para salvar o arquivo Json da listagem | LISTA DIRETORIO
exports.outputPath = "C:\\Users\\felip\\WebstormProjects\\projetots4\\jsonDiretorios\\rootDir.json";
