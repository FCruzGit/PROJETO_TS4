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
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("./template");
const destinationDirectory = 'C:/Users/felip/OneDrive/Documentos/Electronic Arts/The Sims 4/Tray';
const allowedExtensions = ['.hhi', '.sgi', '.trayitem', '.householdbinary'];
function moveFilesRecursively(directoryPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield template_1.fs.readdir(directoryPath);
            for (const file of files) {
                const filePath = template_1.path.join(directoryPath, file);
                const fileStat = yield template_1.fs.stat(filePath);
                if (fileStat.isDirectory()) {
                    // Se for uma pasta, chame a função recursivamente
                    yield moveFilesRecursively(filePath);
                }
                else {
                    // Se for um arquivo, verifique a extensão e mova, se corresponder
                    const fileExtension = template_1.path.extname(file);
                    if (allowedExtensions.includes(fileExtension)) {
                        const destinationPath = template_1.path.join(destinationDirectory, file);
                        yield template_1.fs.move(filePath, destinationPath, { overwrite: true });
                        console.log(`Arquivo ${file} movido para ${destinationPath}`);
                    }
                }
            }
        }
        catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    });
}
moveFilesRecursively(template_1.sourceDirectory);
