//Importações do Node modules
export const path = require('path');
export const fs = require('fs-extra');

// Endereço para realizar a Query | MOVER POR EXTENÇÃO | MOVER PARA RAIZ | VERIFICAR DIRETÓRIO VAZIO
export const sourceDirectory = "C:\\Users\\felip\\OneDrive\\Documentos\\Electronic Arts\\The Sims 4\\Mods\\.HOUSE"

//Endereço DESTINO para MOVER por EXTENÇÃO e Tipos permitidos | MOVER POR EXTENÇÃO
export const destinationDirectory = 'C:/Users/felip/OneDrive/Documentos/Electronic Arts/The Sims 4/Tray';
export const allowedExtensions = ['.hhi', '.sgi', '.trayitem', '.householdbinary', '.bpi', '.blueprint'];

// Endereço a listar as pastas | LISTA DIRETORIO
export const simsDirectory = "C:\\Users\\felip\\OneDrive\\Documentos\\Electronic Arts\\The Sims 4\\Mods\\.SIMS\\PACK.SIMS4IMAGINATION"

// Endereço para salvar o arquivo Json da listagem | LISTA DIRETORIO
export const outputPath = "C:\\Users\\felip\\WebstormProjects\\projetots4\\src\\asset\\json\\listagem01"

