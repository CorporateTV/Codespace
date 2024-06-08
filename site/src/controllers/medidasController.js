var medidaModel = require("../models/medidasModel");
var tvModel = require("../models/tvModel");
var componenteModel = require("../models/componenteModel")

function buscarUtlimasMedidasComponente(req, res) {
    const limite_linhas = 7;

    var idTelevisao = req.params.idTelevisao;
    var tipoComponente = req.params.tipoComponente;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas para a TV ${idTelevisao} e componente ${tipoComponente}`);

    medidaModel.buscarUtlimasMedidasComponente(idTelevisao, tipoComponente, limite_linhas).then(function (resultado) {
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
    var tipoComponente = req.params.tipoComponente;

    console.log(`Recuperando medidas em tempo real para a TV ${idTelevisao} e componente ${tipoComponente}`);

    medidaModel.buscarMedidasComponenteEmTempoReal(idTelevisao, tipoComponente).then(function (resultado) {
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

function verificarAtualizacaoComponente(req, res) {
    var idTelevisao = req.params.idTelevisao;
    var tipoComponente = req.params.tipoComponente;
    var limiteTempo = 5000; // 5 segundos

    console.log(`Verificando atualização para a TV ${idTelevisao} e componente ${tipoComponente}`);

    medidaModel.buscarUltimaAtualizacaoComponente(idTelevisao, tipoComponente).then(function (resultado) {
        if (resultado.length > 0) {
            var ultimaAtualizacao = new Date(resultado[0].dataRegistro).getTime();
            var agora = new Date().getTime();
            var diferencaTempo = agora - ultimaAtualizacao;

            if (diferencaTempo > limiteTempo) {
                res.status(200).json({
                    atualizado: false,
                    mensagem: "O componente não está sendo atualizado."
                });
            } else {
                res.status(200).json({
                    atualizado: true,
                    mensagem: "O componente está sendo atualizado."
                });
            }
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao verificar a atualização do componente.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function verificarAtualizacaoTelevisoesEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;
    var limiteTempo = 30000; 
    console.log(`Verificando atualização para todas as televisões da empresa ${idEmpresa}`);

    tvModel.listarDadosEmpresaTv(idEmpresa).then(function (televisoes) {
        if (televisoes.length > 0) {
            let verificacoes = televisoes.map(tv => {
                return Promise.all([
                    medidaModel.buscarUltimaAtualizacaoComponente(tv.idTelevisao, 'CPU'),
                    medidaModel.buscarUltimaAtualizacaoComponente(tv.idTelevisao, 'Disco'),
                    medidaModel.buscarUltimaAtualizacaoComponente(tv.idTelevisao, 'RAM')
                ]).then(resultados => {
                    let atualizado = resultados.every(resultado => {
                        if (resultado.length > 0) {
                            var ultimaAtualizacao = new Date(resultado[0].dataRegistro).getTime();
                            var agora = new Date().getTime();
                            var diferencaTempo = agora - ultimaAtualizacao;
                            return diferencaTempo <= limiteTempo;
                        }
                        return false;
                    });

                    return {
                        idTelevisao: tv.idTelevisao,
                        nomeTv: tv.nomeTelevisao,
                        atualizado: atualizado,
                        setor: tv.setor
                    };
                });
            });

            Promise.all(verificacoes).then(resultados => {
                let televisoesNaoAtualizadas = resultados.filter(tv => !tv.atualizado);
                let ambientesSatus = {};

                resultados.forEach(tv => {
                    if (!ambientesSatus[tv.setor]) {
                        ambientesSatus[tv.setor] = { atualizado: 0, naoAtualizado: 0 };
                    }

                    if (tv.atualizado) {
                        ambientesSatus[tv.setor].atualizado += 1;
                    } else {
                        ambientesSatus[tv.setor].naoAtualizado += 1;
                    }
                });

                res.status(200).json({
                    quantidadeNaoAtualizadas: televisoesNaoAtualizadas.length,
                    televisoesNaoAtualizadas: televisoesNaoAtualizadas,
                    ambienteStatus: ambientesSatus
                });

            }).catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao verificar a atualização dos componentes.", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
        } else {
            res.status(204).send("Nenhuma televisão encontrada para esta empresa!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as televisões da empresa.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasComponentesTv(req, res) {
    var idTv = req.params.idTelevisao;

    tvModel.dadosTv(idTv).then((dadosTv) => {
        if (dadosTv.length > 0) {
            componenteModel.componentesTv(idTv).then((respostaComponentes) => {
                let promessasLogs = respostaComponentes.map((componente) => {
                    return new Promise((resolve, reject) => {
                        medidaModel.buscarMedidasComponenteEmTempoReal(idTv, componente.tipoComponente)
                            .then((log) => {
                                if (log.length > 0) {
                                    resolve({
                                        idComponente: log[0].idComponente,
                                        tipoComponente: log[0].tipoComponente,
                                        uso_percentual: log[0].usoComponente,
                                        horario: log[0].dataRegistro
                                    });
                                } else {
                                    resolve({
                                        idComponente: componente.idComponente,
                                        tipoComponente: componente.tipoComponente,
                                        uso_percentual: null,
                                        horario: null
                                    });
                                }
                            })
                            .catch((erro) => {
                                reject(erro);
                            });
                    });
                });

                Promise.all(promessasLogs).then((componentesInfo) => {
                    let resultado = {
                        id_televisao: dadosTv[0].idTelevisao,
                        nome_televisao: dadosTv[0].nomeTelevisao,
                        componentes: componentesInfo
                    };
                    res.status(200).json(resultado);
                }).catch((erro) => {
                    console.log(erro);
                    console.log("Houve um erro ao buscar os logs dos componentes: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                });
            }).catch((erro) => {
                console.log(erro);
                console.log("Houve um erro ao buscar os componentes da televisão: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
        } else {
            res.status(204).json([]);
        }
    }).catch((erro) => {
        console.log(erro);
        console.log("Houve um erro ao buscar as televisões: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasProcessos(req, res) {
    var idTelevisao = req.params.idTelevisao;

    medidaModel.buscarMedidasProcessos(idTelevisao).then(function (resultado) {
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
    buscarUtlimasMedidasComponente,
    verificarAtualizacaoComponente,
    verificarAtualizacaoTelevisoesEmpresa,
    buscarMedidasComponentesTv,
    buscarMedidasProcessos
}