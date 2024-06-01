var database = require("../database/config");

function listarAmbientes(empresaId) {

  instrucaoSql = `select * from Ambiente where fkEmpresa = ${empresaId}`;

  return database.executar(instrucaoSql);
}

module.exports = {
    listarAmbientes
}
