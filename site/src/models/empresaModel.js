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
  // function cadastrarGestor(){
  //   console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, idEmpresa);
    
  //   var instrucao = `
  //       INSERT INTO Usuario (nome ,email, senha, fkEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${idEmpresa}');
  //   `;
  //   console.log("Executando a instrução SQL: \n" + instrucao);
  //   return database.executar(instrucao);
  // }

  function cadastrarEmpresa(nomeFantasia, plano){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeFantasia);
    
    var instrucao = `
       INSERT INTO Empresa (nomeFantasia, plano) VALUES ("${nomeFantasia}", '${plano}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }


module.exports = { 
  // cadastrarGestor,
  cadastrarEmpresa, 
  buscarPorId, 
  listar, 
  buscarPornomeEmpresa };
