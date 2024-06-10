var database = require("../database/config");

function buscarPorId(idEmpresa) {
  var query = `select * from Empresa where idEmpresa = '${idEmpresa}'`;

  return database.executar(query);
}

function listar() {
  var query = `select * from Empresa`;

  return database.executar(query);
}

function buscarPornomeEmpresa(nomeEmpresa) {
  var query = `select * from Empresa where nomeFantasia = '${nomeEmpresa}'`;
  return database.executar(query);
}
function cadastrarGestor(nome, email, senha, idEmpresa) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, idEmpresa);

  var instrucao = `
        INSERT INTO Usuario (nomeUsuario ,email, fkEmpresa ,senha) VALUES ('${nome}', '${email}',  '${idEmpresa}','${senha}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function cadastrarEmpresa(nomeFantasia,cnpj, plano) {
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeFantasia);

  var instrucao = `
       INSERT INTO Empresa (nomeFantasia, cnpj , plano) VALUES ("${nomeFantasia}","${cnpj}", '${plano}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function quantidadeUsuarios(idEmpresa) {
  var sql = `SELECT COUNT(*) AS quantidadeUsuarios FROM Usuario JOIN Empresa ON fkEmpresa = idEmpresa WHERE idEmpresa = ${idEmpresa}`;

  return database.executar(sql);
}

function listarUsuariosEmpresa(idEmpresa) {
  var sql = `SELECT idUsuario, nomeUsuario, email, fkGestor FROM Usuario JOIN Empresa as empresa ON fkEmpresa = idEmpresa WHERE idEmpresa = ${idEmpresa}`;

  return database.executar(sql);
}

function atualizarEmpresa(nomeFantasia, cnpj, idEmpresa, plano) {
  var instrucao = `UPDATE Empresa set nomeFantasia = "${nomeFantasia}", cnpj = "${cnpj}", plano ="${plano}"  WHERE idEmpresa = ${idEmpresa};`;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}


module.exports = {
  atualizarEmpresa,
  cadastrarGestor,
  cadastrarEmpresa,
  buscarPorId,
  listar,
  buscarPornomeEmpresa,
  quantidadeUsuarios,
  listarUsuariosEmpresa
};
