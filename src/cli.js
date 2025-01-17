//Permite ler/acessar/editar arquivos do sistema
import fs from "fs";
import path from "path";
import trataErros from "./erros/funcoesErro.js"
import { contaPalavras  } from "./index.js";
import { montaSaidaArquivo } from "./helpers.js";
import { Command } from "commander";

const program = new Command();

program
    .version("0.0.1")
    .option("-t, --texto <string>", "Caminho do texto a ser procesado")
    .option("-d, --destino <string>", "Caminho da pasta onde salvar o arquivo de resultados")
    .action((options) => {
        const { texto, destino } = options;

        if (!texto || !destino) {
            console.error("Erro: Favor inserir caminho de origem e destino");
            program.help();
            return;
        }

        const caminhoTexto = path.resolve(texto);
        const caminhoDestino = path.resolve(destino);

        try{
            processaArquivo(caminhoTexto, caminhoDestino);
            console.log("Texto processado com sucesso!")
        }catch(erro){
            console.log("Ocorreu um erro no processamento", erro);
        }
    })

program.parse();

// //Retorna um array dos argumentos passados para o terminal no momento da execução
// const caminhoArquivo = process.argv;
// const link = caminhoArquivo[2]; //Recebe o terceiro argumento 
// const endereco = caminhoArquivo[3]; 

function processaArquivo(texto, destino) {
    //Dado o caminho, le o arquivo, o transforma em uma string, e o passa como argumento para a funcao callback
    fs.readFile(texto, 'utf-8', (erro, data) => {    
        try{ //Tenta executar o codigo, caso aconteca um erro, executa o catch
            if(erro) throw erro; //Caso ja exista um erro do readfile, ja executa o catch
            const resultado = contaPalavras(data); //Cria um array de objetoss de contagem de cada palavra por paragrafo
            criaESalvaArquivo(resultado, destino);
        }
        catch(erro){
            console.log(trataErros(erro)); //Funcao que verifica o erro
        }

    })
}

 async function criaESalvaArquivo(listaPalavras, endereco){
     const arquivoNovo = `${endereco}/resultado.txt`
     const textoPalavras = montaSaidaArquivo(listaPalavras);
     try{
         await fs.promises.writeFile(arquivoNovo, textoPalavras);
         console.log("Arquivo Criado")
     } catch(erro){
         throw erro;
     }
 }

// function criaESalvaArquivo(listaPalavras, endereco){
//     const arquivoNovo = `${endereco}/resultado.txt`
//     const textoPalavras = JSON.stringify(listaPalavras);

//     fs.promises.writeFile(arquivoNovo, textoPalavras)
//         .then(() => {
//             //Processamento feito com o resultado da promessa
//             console.log("Arquivo Criado")
//         })
//         .catch((erro) => {
//             throw erro
//         })
//         .finally(() => console.log("Operacao finalizada"))
   
// }