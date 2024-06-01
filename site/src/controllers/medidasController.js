var medidaModel = require("../models/medidasModel");

function buscarUtlimasMedidasComponente(req, res) {
    const limite_linhas = 7;

    var idTelevisao = req.params.idTelevisao;
    var idComponente = req.params.idComponente;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas para a TV ${idTelevisao} e componente ${idComponente}`);

    medidaModel.buscarUtlimasMedidasComponente(idTelevisao, idComponente, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasComponenteEmTempoReal(req, res) {
    var idTelevisao = req.params.idTelevisao;
    var idComponente = req.params.idComponente;

    console.log(`Recuperando medidas em tempo real para a TV ${idTelevisao} e componente ${idComponente}`);

    medidaModel.buscarMedidasComponenteEmTempoReal(idTelevisao, idComponente).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarMedidasComponenteEmTempoReal,
    buscarUtlimasMedidasComponente
}