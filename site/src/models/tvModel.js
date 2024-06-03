var database = require("../database/config");

function quantidadeTvEmpresa(idEmpresa) {

    sql = `SELECT COUNT(*) AS quantidade FROM Televisao JOIN Ambiente ON fkAmbiente = IdAmbiente JOIN Empresa ON fkEmpresa = IdEmpresa WHERE idEmpresa = ${idEmpresa}`;

    console.log("Executando a instrução SQL: \n" + sql);
    return(database.executar(sql));

}

function listarDadosTv(idEmpresa) {
    sql = `SELECT * FROM Televisao as televisao JOIN Ambiente as ambiente ON fkAmbiente = IdAmbiente 
    JOIN Empresa as empresa ON fkEmpresa = IdEmpresa WHERE idEmpresa = ${idEmpresa}`

    console.log("Executando a instrução SQL: \n" + sql);
    return(database.executar(sql));    
}


module.exports = {
    quantidadeTvEmpresa,
    listarDadosTv
}