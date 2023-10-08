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
function moveFilesFromSubfoldersToRoot(directoryPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield template_1.fs.readdir(directoryPath);
            for (const file of files) {
                const filePath = template_1.path.join(directoryPath, file);
                const fileStat = yield template_1.fs.stat(filePath);
                if (fileStat.isDirectory()) {
                    // Se for uma pasta, chame a função recursivamente
                    yield moveFilesFromSubfoldersToRoot(filePath);
                    // Após mover os arquivos, verifique se a pasta está vazia
                    const folderContents = yield template_1.fs.readdir(filePath);
                    if (folderContents.length === 0) {
                        yield template_1.fs.rmdir(filePath);
                        console.log(`Pasta vazia ${filePath} excluída.`);
                    }
                }
                else {
                    // Se for um arquivo, mova-o para a pasta raiz
                    const fileName = template_1.path.basename(filePath);
                    const destinationPath = template_1.path.join(template_1.sourceDirectory, fileName);
                    yield template_1.fs.move(filePath, destinationPath, { overwrite: true });
                    console.log(`Arquivo ${fileName} movido para ${destinationPath}`);
                }
            }
        }
        catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    });
}
moveFilesFromSubfoldersToRoot(template_1.sourceDirectory);
