var tvModel = require("../models/tvModel");
var componenteModel = require("../models/componenteModel");

function quantidadeTvEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;

    tvModel.quantidadeTvEmpresa(idEmpresa).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json({ quantidade: resultado[0].quantidade });
        } else {
            res.status(204).json({ quantidade: 0 });
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as Televiões: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}

function listarDadosEmpresaTv(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("IdEmpresa está indefinido")
    } else {
        tvModel.listarDadosEmpresaTv(idEmpresa).then((resultado) => {

            console.log("TV encontrados: " + resultado.length);

            if (resultado.length > 0) {
                let tvsComComponentes = [];

                let fetchComponentes = resultado.map(tv => {
                    return componenteModel.componentesTv(tv.idTelevisao)
                        .then((resultadoComponentes) => {
                            return {
                                idTelevisao: tv.idTelevisao,
                                nomeTelevisao: tv.nomeTelevisao,
                                taxaAtualizacao: tv.taxaAtualizacao,
                                hostname: tv.hostname,
                                fkAmbiente: tv.fkAmbiente,
                                idAmbiente: tv.idAmbiente,
                                setor: tv.setor,
                                andar: tv.andar,
                                fkEmpresa: tv.fkEmpresa,
                                idEmpresa: tv.idEmpresa,
                                componentes: resultadoComponentes.length > 0 ? resultadoComponentes : []
                            };
                        });
                });

                Promise.all(fetchComponentes).then(tvsComComponentes => {
                    res.status(200).json(tvsComComponentes);
                }).catch(error => {
                    console.log("Houve um erro ao buscar os componentes das TVs: ", error.sqlMessage);
                    res.status(500).json(error.sqlMessage);
                });

            } else {
                res.status(204).json([])
            }

        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as Televiões: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        })
    }
}

function dadosTv(req, res) {
    var idTv = req.params.idEmpresa;

    tvModel.dadosTv(idTv).then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log("Houve um erro tv não existe: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    quantidadeTvEmpresa,
    listarDadosEmpresaTv,
    dadosTv
}