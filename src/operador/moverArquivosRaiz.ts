import {sourceDirectory} from "../operador/template";

const path = require('path');

const fs = require('fs-extra');

async function moveFilesFromSubfoldersToRoot(directoryPath: string) {
    try {
        const files = await fs.readdir(directoryPath);

        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const fileStat = await fs.stat(filePath);

            if (fileStat.isDirectory()) {
                // Se for uma pasta, chame a função recursivamente
                await moveFilesFromSubfoldersToRoot(filePath);

                // Após mover os arquivos, verifique se a pasta está vazia
                const folderContents = await fs.readdir(filePath);
                if (folderContents.length === 0) {
                    await fs.rmdir(filePath);
                    console.log(`Pasta vazia ${filePath} excluída.`);
                }
            } else {
                // Se for um arquivo, mova-o para a pasta raiz
                const fileName = path.basename(filePath);
                const destinationPath = path.join(sourceDirectory, fileName);

                await fs.move(filePath, destinationPath, { overwrite: true });
                console.log(`Arquivo ${fileName} movido para ${destinationPath}`);
            }
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

moveFilesFromSubfoldersToRoot(sourceDirectory);