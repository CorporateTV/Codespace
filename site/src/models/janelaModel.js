var database = require("../database/config");

function buscarJanelas(idTelevisao) {
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        sql = `
        SELECT j.idJanela, j.pidJanela, j.titulo, j.localizacao, j.visivel, j.fkTelevisao
        FROM Janela AS j
        JOIN Televisao AS tv ON j.fkTelevisao = tv.idTelevisao
        WHERE j.idJanela IN (
        SELECT MIN(idJanela)
            FROM Janela
            WHERE fkTelevisao = ${idTelevisao}
            GROUP BY titulo
        )
        ORDER BY j.idJanela DESC LIMIT 5;
          `;
    } else if (process.env.AMBIENTE_PROCESSO == "producao") {
        sql = `
        SELECT j.idJanela, j.pidJanela, j.titulo, j.localizacao, j.visivel, j.fkTelevisao
        FROM Janela AS j
        JOIN Televisao AS tv ON j.fkTelevisao = tv.idTelevisao
        WHERE j.idJanela IN (
        SELECT MIN(idJanela)
            FROM Janela
            WHERE fkTelevisao = ${idTelevisao}
            GROUP BY titulo
        )
        ORDER BY j.idJanela DESC LIMIT 5;
      `;
    }

    return database.executar(sql);
}

module.exports = {
    buscarJanelas
};