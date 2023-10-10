import fs from "fs";

export function criarNomeUnico(diretorioSaida: string, nomeBase: string): string {
    let contador = 0;
    let nomeArquivo = `${nomeBase}.pdf`;

    while (fs.existsSync(`${diretorioSaida}/${nomeArquivo}`)) {
        contador++;
        nomeArquivo = `${nomeBase}_${contador}.pdf`;
    }

    return nomeArquivo;
}