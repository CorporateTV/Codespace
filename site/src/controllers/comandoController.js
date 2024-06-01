var comandoModel = require("../models/comandoModel");

function inserirComando(req, res) {
    var nomeComando = req.body.nomeComandoServer;
    var idTelevisao = req.body.idTelevisaoServer;

    if (nomeComando == undefined) {
        res.status(400).send("O nome comando está undefined!");
    } else if (idTelevisao == undefined) {
        res.status(400).send("O nome comando está undefined!");
    }

    comandoModel.inserirComando(nomeComando, idTelevisao)
        .then((resultado) => {
            res.json(resultado);
        })
        .catch((erro) => {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar a inserção! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        })
}

function listarComandos(req, res) {
    var idTelevisao = req.params.idTelevisao;

    if (idTelevisao == undefined) {
        res.status(400).send("ID Televisão está undefined")
    } else {
        comandoModel.listarComandos(idTelevisao)
            .then((resultado) => {
                console.log(resultado);
                res.status(200).json(resultado);
            })
            .catch((erro) => {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a inserção! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function atualizarComando(req, res) {
    var nomeComando = req.body.nomeComandoServer;
    var idComando = req.body.idComandoServer;

    if (nomeComando == undefined) {
        res.status(400).send("O nome comando está undefined!");
    } else if (idComando == undefined) {
        res.status(400).send("O nome comando está undefined!");
    }

    comandoModel.atualizarComando(nomeComando, idComando)
        .then((resultado) => {
            res.status(200).send(`Comando: ${nomeComando} | ID Comando: ${idComando}`)
        })
        .catch((erro) => {
            res.status(500).json(erro.sqlMessage);
        })
}

function deletarComando(req, res) {
    var idComando = req.body.idComandoServer;

    if (idComando == undefined) {
        res.status(400).send("O nome comando está undefined!");
    }

    comandoModel.deletarComando(idComando).then((resultado) => {
        res.status(200).send(`Comando da televisão com o id ${idComando} removido com sucesso`)
    })
        .catch((erro) => {
            res.status(500).json(erro.sqlMessage);
        })
}

function ultimoComando(req, res) {
    comandoModel.ultimoComando().then((resultado) => {
        res.status(200).json({ultimoComando: resultado[0].ultimoComando} );
    })
    .catch((erro) => {
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    inserirComando,
    listarComandos,
    atualizarComando,
    deletarComando,
    ultimoComando
}