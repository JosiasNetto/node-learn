export function contaPalavras(texto) {
    const paragrafos = extraiParagrafos(texto);
    const contagem = paragrafos.flatMap((paragrafo) => { //Retorna um array de objetos, sem os arrays vazios devido o flat
        if(!paragrafo) return [];
        return verificaPalavrasDuplicadas(paragrafo);
    })
    return contagem;  //Imprimi o array de objetos
}

function extraiParagrafos(texto){
    return texto.toLowerCase().split("\n"); //Separa o texto em um array de paragrafos
}

function limpaPalavras(palavra) {   //Retira caracteres especiais da sring
    return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
}

function verificaPalavrasDuplicadas(texto) {    //Retorna o objeto de palavras contadas
    const listaPalavras = texto.split(" "); //Array das palavras do texto
    const resultado = {}; //Objeto que armazenara a contagem das palavras

    //Percorre o array, adcionando/incremetando o valor no objeto resultado
    listaPalavras.forEach(palavra => {
        if(palavra.length >= 3){
            const palavraLimpa = limpaPalavras(palavra);
            resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1
        }
    })
    return resultado; //Retorna o objeto da contagem
}