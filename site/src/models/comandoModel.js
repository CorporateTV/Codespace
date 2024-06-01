var database = require("../database/config");

function inserirComando(nomeComando, idTelevisao) {
    sql = `INSERT INTO Comando (nome, fkTelevisao) VALUES ('${nomeComando}', ${idTelevisao});`

    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

function listarComandos(idTelevisao) {
    sql = `SELECT * FROM Comando WHERE fkTelevisao = ${idTelevisao};`

    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

function atualizarComando(nomeComando, idComando) {
    sql = `UPDATE Comando SET nome = '${nomeComando}' WHERE idComando = ${idComando};`

    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

function deletarComando(idTelevisao) {
    sql = `DELETE FROM Comando WHERE idComando = ${idTelevisao};`

    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

function ultimoComando() {
    sql = `SELECT MAX(idComando) AS ultimoComando FROM Comando;`;

    return database.executar(sql);
} 


module.exports = {
    inserirComando,
    listarComandos,
    atualizarComando,
    deletarComando,
    ultimoComando
}