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


module.exports = { buscarPorId, listar, buscarPornomeEmpresa };
