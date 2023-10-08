import {path, fs, sourceDirectory} from "./template";

const destinationDirectory = 'C:/Users/felip/OneDrive/Documentos/Electronic Arts/The Sims 4/Tray';
const allowedExtensions = ['.hhi', '.sgi', '.trayitem', '.householdbinary'];

async function moveFilesRecursively(directoryPath: string) {
  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const fileStat = await fs.stat(filePath);

      if (fileStat.isDirectory()) {
        // Se for uma pasta, chame a função recursivamente
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
