import { sourceDirectory} from "./template";

const path = require('path');

const fs = require('fs-extra');

async function verificaDiretorio(diretorio: string) {
    try {
        const arquivos = await fs.promises.readdir(diretorio);

        for (const arquivo of arquivos) {
            const caminhoCompleto = path.join(diretorio, arquivo);
            const stats = await fs.promises.stat(caminhoCompleto);

            if (stats.isDirectory()) {
                const conteudoDiretorio = await fs.promises.readdir(caminhoCompleto);
                if (conteudoDiretorio.length === 0) {
                    console.log(`A pasta ${caminhoCompleto} está vazia e será excluída.`);
                    await fs.promises.rmdir(caminhoCompleto);
                } else if (conteudoDiretorio.length === 1 && /^readme$/i.test(conteudoDiretorio[0])) {
                    console.log(`A pasta ${caminhoCompleto} está vazia (apenas contém um arquivo README) e será excluída.`);
                    await fs.promises.rmdir(caminhoCompleto);
                }
            }
        }
    } catch (err) {
        console.error(`Erro ao verificar o diretório: ${err}`);
    }
}

const diretorioParaVerificar = sourceDirectory;

verificaDiretorio(diretorioParaVerificar);
