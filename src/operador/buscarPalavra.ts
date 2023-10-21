import * as fs from 'fs';
import * as path from 'path';

// Diretório a ser pesquisado
const diretorio = 'C:\\Users\\felip\\OneDrive\\Documentos\\Electronic Arts\\The Sims 4\\Mods\\.SIMS\\PACK.sugarbaby_sims BUG'; // Substitua pelo caminho do seu diretório

// Palavra-chave a ser procurada nos nomes dos arquivos e pastas | hokusai26
const palavraChave = 'body'; // Substitua pela palavra que deseja procurar

// Função para listar arquivos e pastas com a palavra-chave no nome
function listarArquivosEPastasComPalavraChave(directory: string, keyword: string, excluir: boolean = false): string[] {
    const encontrados: string[] = [];

    const conteudo = fs.readdirSync(directory);

    for (const item of conteudo) {
        const itemPath = path.join(directory, item);

        if (item.includes(keyword)) {
            encontrados.push(itemPath);

            if (excluir && fs.existsSync(itemPath) && fs.statSync(itemPath).isFile()) {
                // Verifica se o arquivo existe antes de tentar excluí-lo
                fs.unlinkSync(itemPath);
                console.log(`Arquivo excluído: ${itemPath}`);
            }
        }

        if (fs.statSync(itemPath).isDirectory()) {
            // Se for uma pasta, chame a função recursivamente
            const encontradosNaSubPasta = listarArquivosEPastasComPalavraChave(itemPath, keyword, excluir);
            encontrados.push(...encontradosNaSubPasta);
        }
    }

    return encontrados;
}

// Chame a função para listar os arquivos e pastas com a palavra-chave (aqui, a exclusão está desativada)
const encontrados = listarArquivosEPastasComPalavraChave(diretorio, palavraChave);

if (encontrados.length > 0) {
    console.log(`Arquivos e pastas encontrados com a palavra-chave "${palavraChave}":`);
    encontrados.forEach((item) => {
        console.log(item);
    });
} else {
    console.log(`Nenhum arquivo ou pasta encontrado com a palavra-chave "${palavraChave}".`);
}
