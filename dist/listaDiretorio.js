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
function getRootDirectories(simsDirectory) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const subdirectories = yield template_1.fs.readdir(simsDirectory);
            const rootDirectories = subdirectories
                .filter((subdir) => template_1.fs.statSync(template_1.path.join(simsDirectory, subdir)).isDirectory())
                .map((subdir) => template_1.path.join(simsDirectory, subdir));
            return rootDirectories;
        }
        catch (error) {
            console.error('Ocorreu um erro:', error);
            return [];
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const rootDirectories = yield getRootDirectories(template_1.simsDirectory);
    console.log('Pastas raiz encontradas:');
    console.log(rootDirectories);
    // Salvar a lista de pastas raiz em um arquivo JSON
    try {
        yield template_1.fs.outputJson(template_1.outputPath, rootDirectories, { spaces: 2 });
        console.log(`Lista de pastas raiz salva em ${template_1.outputPath}`);
    }
    catch (error) {
        console.error('Ocorreu um erro ao salvar o arquivo JSON:', error);
    }
}))();
