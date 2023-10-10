import { outputPath, simsDirectory } from "./template";

const path = require('path');

const fs = require('fs-extra');

async function getRootDirectories(simsDirectory: string) {
    try {
        const subdirectories = await fs.readdir(simsDirectory);

        const rootDirectories = subdirectories
            .filter((subdir: string) => fs.statSync(path.join(simsDirectory, subdir)).isDirectory())
            .map((subdir: string) => path.join(simsDirectory, subdir));

        return rootDirectories;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        return [];
    }
}

(async () => {
    const rootDirectories = await getRootDirectories(simsDirectory);
    console.log('Pastas raiz encontradas:');
    console.log(rootDirectories);

    // Salvar a lista de pastas raiz em um arquivo JSON
    try {
        await fs.outputJson(outputPath, rootDirectories, { spaces: 2 });
        console.log(`Lista de pastas raiz salva em ${outputPath}`);
    } catch (error) {
        console.error('Ocorreu um erro ao salvar o arquivo JSON:', error);
    }
})();
