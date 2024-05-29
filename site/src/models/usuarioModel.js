var database = require("../database/config")


function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT idUsuario, email, fkGestor ,fkEmpresa as idEmpresa FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nome, email, senha, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, idEmpresa);
    
    var instrucao = `
        INSERT INTO Usuario (nome ,email, senha, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${idEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarPerfil(nome, email, idFuncionario) {
    var instrucao = `
        
    UPDATE funcionario set nome = '${nome}', email = '${email}' WHERE idFuncionario = ${idFuncionario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function quantidadeUsuariosPorTipo(idEmpresa) {
    var sql = `SELECT SUM(CASE WHEN fkGestor IS NULL THEN 1 ELSE 0 END) AS assitenteNoc, SUM(CASE WHEN fkGestor IS NOT NULL THEN 1 ELSE 0 END) 
    AS gestorNoc FROM Usuario WHERE fkEmpresa = ${idEmpresa};`;
    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
  }

module.exports = {
    autenticar,
    cadastrar,
    atualizarPerfil,
    quantidadeUsuariosPorTipo
};