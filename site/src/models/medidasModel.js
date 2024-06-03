var database = require("../database/config");

function buscarUtlimasMedidasComponente(idTelevisao, tipoComponente, limite_linhas) {
    sql = ``

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        sql = `SELECT date_format(dataHora,'%H:%i:%s') as dataRegistro, valor as usoComponente, 
        fkComponente as idComponente, comp.tipoComponente, tv.nome as nomeTv FROM 
        LogComponente JOIN Componente as comp ON fkComponente = idComponente
        JOIN Televisao as tv ON fkTelevisao = idTelevisao
        WHERE idTelevisao = ${idTelevisao} AND tipoComponente = '${tipoComponente}' 
        order by idLogComponente desc limit ${limite_linhas};`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + sql);
    return database.executar(sql);
}

function buscarMedidasComponenteEmTempoReal(idTelevisao, tipoComponente) {
    sql = ``

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        sql = `SELECT date_format(dataHora,'%H:%i:%s') as dataRegistro, valor as usoComponente, 
        fkComponente as idComponente, comp.tipoComponente, tv.nome as nomeTv FROM 
        LogComponente JOIN Componente as comp ON fkComponente = idComponente
        JOIN Televisao as tv ON fkTelevisao = idTelevisao 
        WHERE idTelevisao = ${idTelevisao} AND tipoComponente = '${tipoComponente}'
        order by idLogComponente desc limit 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    return database.executar(sql);
}

function buscarUltimaAtualizacaoComponente(idTelevisao, tipoComponente) {
    let sql = ``;

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        sql = `SELECT 
                    date_format(dataHora,'%Y-%m-%d %H:%i:%s') as dataRegistro, 
                    valor as usoComponente, 
                    fkComponente as idComponente, 
                    comp.tipoComponente, 
                    tv.nome as nomeTv 
                FROM 
                    LogComponente 
                JOIN 
                    Componente as comp ON fkComponente = idComponente
                JOIN 
                    Televisao as tv ON fkTelevisao = idTelevisao 
                WHERE 
                    idTelevisao = ${idTelevisao} AND tipoComponente = '${tipoComponente}'
                ORDER BY 
                    idLogComponente DESC 
                LIMIT 1;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return;
    }

    return database.executar(sql);
}


module.exports = {
    buscarUtlimasMedidasComponente,
    buscarMedidasComponenteEmTempoReal,
    buscarUltimaAtualizacaoComponente
}