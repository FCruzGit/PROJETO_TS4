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
function verificaDiretorio(diretorio) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const arquivos = yield template_1.fs.promises.readdir(diretorio);
            for (const arquivo of arquivos) {
                const caminhoCompleto = template_1.path.join(diretorio, arquivo);
                const stats = yield template_1.fs.promises.stat(caminhoCompleto);
                if (stats.isDirectory()) {
                    const conteudoDiretorio = yield template_1.fs.promises.readdir(caminhoCompleto);
                    if (conteudoDiretorio.length === 0) {
                        console.log(`A pasta ${caminhoCompleto} está vazia e será excluída.`);
                        yield template_1.fs.promises.rmdir(caminhoCompleto);
                    }
                    else if (conteudoDiretorio.length === 1 && /^readme$/i.test(conteudoDiretorio[0])) {
                        console.log(`A pasta ${caminhoCompleto} está vazia (apenas contém um arquivo README) e será excluída.`);
                        yield template_1.fs.promises.rmdir(caminhoCompleto);
                    }
                }
            }
        }
        catch (err) {
            console.error(`Erro ao verificar o diretório: ${err}`);
        }
    });
}
const diretorioParaVerificar = template_1.sourceDirectory;
verificaDiretorio(diretorioParaVerificar);
