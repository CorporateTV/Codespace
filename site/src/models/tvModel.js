var database = require("../database/config");

function quantidadeTvEmpresa(idEmpresa) {

    sql = `SELECT COUNT(*) AS quantidade FROM Televisao JOIN Ambiente ON fkAmbiente = IdAmbiente JOIN Empresa ON fkEmpresa = IdEmpresa WHERE idEmpresa = ${idEmpresa}`;

    return(database.executar(sql));

}

function listarDadosEmpresaTv(idEmpresa) {
    sql = `SELECT * FROM Televisao as televisao JOIN Ambiente as ambiente ON fkAmbiente = IdAmbiente 
    JOIN Empresa as empresa ON fkEmpresa = IdEmpresa WHERE idEmpresa = ${idEmpresa}`

    return(database.executar(sql));    
}

function dadosTv(idTelevisao) {
    sql = `SELECT * FROM Televisao WHERE idTelevisao = ${idTelevisao}`;

    return(database.executar(sql));
}

module.exports = {
    quantidadeTvEmpresa,
    listarDadosEmpresaTv,
    dadosTv
}