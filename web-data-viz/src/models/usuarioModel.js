var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO Usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function responder(fkUsuario, acertos) {
    // Busca o maior numeroTentativas do usuário
    const buscaSql = `
        SELECT IFNULL(MAX(numeroTentativas), 0) + 1 AS proximaTentativa
        FROM Quiz
        WHERE fkUsuario = ${fkUsuario};
    `;
    const resultado = await database.executar(buscaSql);
    const numeroTentativas = resultado[0].proximaTentativa;

    // Insere a nova tentativa com o número correto
    var instrucaoSql = `
        INSERT INTO Quiz (fkUsuario, numeroTentativas, acertos)
        VALUES ('${fkUsuario}', '${numeroTentativas}', '${acertos}');
    `;
    return database.executar(instrucaoSql);
}

function tentativas(fkUsuario) {
    var instrucaoSql = `
        SELECT numeroTentativas, acertos
        FROM Quiz
        WHERE fkUsuario = ${fkUsuario}
        ORDER BY numeroTentativas;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    responder,
    tentativas
};