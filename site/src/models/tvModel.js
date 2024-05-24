var database = require("../database/config");

function quantidadeTvEmpresa(idEmpresa) {

    sql = `SELECT COUNT(*) FROM Televisao JOIN Ambiente ON fkAmbiente = IdAmbiente JOIN Empresa ON fkEmpresa = IdEmpresa WHERE idEmpresa = ${idEmpresa}`;

    console.log("Executando a instrução SQL: \n" + sql);
    return(database.executar(sql));

}

module.exports = {
    quantidadeTvEmpresa
}