import {sourceDirectory, destinationDirectory, allowedExtensions} from "../operador/template";

const path = require('path');

const fs = require('fs-extra');

async function moveFilesRecursively(directoryPath: string) {
  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileStat = await fs.stat(filePath);

      // Verifica as pastas
      if (fileStat.isDirectory()) {
        await moveFilesRecursively(filePath);
      } else {
        // Se for um arquivo, verifique a extensão e mova, se corresponder
        const fileExtension = path.extname(file);

        if (allowedExtensions.includes(fileExtension)) {
          const destinationPath = path.join(destinationDirectory, file);
          await fs.move(filePath, destinationPath, { overwrite: true });
          console.log(`Arquivo ${file} movido para ${destinationPath}`);
        }
      }
    }
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

moveFilesRecursively(sourceDirectory);
