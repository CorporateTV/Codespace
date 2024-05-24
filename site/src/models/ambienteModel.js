var database = require("../database/config");

function listarAmbientes(empresaId) {

  instrucaoSql = `select * from Ambiente where fkEmpresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
    listarAmbientes
}
