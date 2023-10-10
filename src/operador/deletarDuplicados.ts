import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import {diretorioRaiz, diretorioDeletados} from "./template";

// Função para calcular o hash de um arquivo
function calcularHash(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('md5');
        const stream = fs.createReadStream(filePath);

        stream.on('data', (data) => {
            hash.update(data);
        });

        stream.on('end', () => {
            resolve(hash.digest('hex'));
        });

        stream.on('error', (error) => {
            reject(error);
        });
    });
}

function gerarNomeArquivoUnico() {
    const dataHoraAtual = new Date().toISOString().replace(/:/g, '-');
    return `resultado_${dataHoraAtual}.json`;
}

const nomeArquivoSaida = gerarNomeArquivoUnico();
const caminhoSaida = path.join(diretorioDeletados, nomeArquivoSaida);

// Função para encontrar e remover arquivos duplicados
async function encontrarRemoverDuplicado(directory: string) {

    const fileHashes: { [hash: string]: string[] } = {};

    // Função recursiva para percorrer o diretório e calcular hashes
    async function processDirectory(dir: string) {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);

            if (fs.statSync(filePath).isDirectory()) {
                await processDirectory(filePath);
            } else {
                const fileHash = await calcularHash(filePath);

                if (!fileHashes[fileHash]) {
                    fileHashes[fileHash] = [];
                }

                fileHashes[fileHash].push(filePath);
            }
        }
    }

    await processDirectory(directory);

    // Registra arquivos deletados e seus endereços
    const deletedFiles: { [hash: string]: string[] } = {};

    // Remova todos os arquivos duplicados, mantendo apenas as duas últimas cópias
    for (const hash in fileHashes) {
        const fileList = fileHashes[hash];

        if (fileList.length > 2) {
            const filesToRemove = fileList.slice(0, -2);

            // Registra os arquivos deletados e seus endereços
            for (const fileToRemove of filesToRemove) {
                if (!deletedFiles[hash]) {
                    deletedFiles[hash] = [];
                }
                deletedFiles[hash].push(fileToRemove);

                fs.unlinkSync(fileToRemove);
                console.log(`Arquivo removido: ${fileToRemove}`);
            }
        }
    }

    // Gerar JSON com informações
    const resultJSON = {
        "arquivosDeletadosTotal": Object.keys(deletedFiles).length,
        "arquivosDeletadosEndereco": deletedFiles,
        "arquivosRestantesLocal": fileHashes
    };

    fs.writeFileSync(caminhoSaida, JSON.stringify(resultJSON, null, 2));
}

encontrarRemoverDuplicado(diretorioRaiz)
    .then(() => {
        console.log(`Resultados salvos em: ${caminhoSaida}`);
        console.log('Processo concluído.');
    })
    .catch((error) => {
        console.error('Ocorreu um erro:', error);
    });
