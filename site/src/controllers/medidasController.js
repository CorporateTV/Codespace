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
            let fetchComponentes = televisoes.map(tv => {
                return componenteModel.componentesTv(tv.idTelevisao)
                    .then((resultadoComponentes) => {
                        return {
                            ...tv,
                            componentes: resultadoComponentes.length > 0 ? resultadoComponentes : []
                        };
                    });
            });

            Promise.all(fetchComponentes).then(tvsComComponentes => {
                let verificacoes = tvsComComponentes.map(tv => {
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

                        let statusCritico = false;
                        let statusAtencao = false;
                        let statusTv = "NORMAL";

                        resultados.forEach(registro => {
                            if (registro.length > 0 && atualizado) {
                                var tipo = registro[0].tipoComponente;
                                var usoComponente = registro[0].usoComponente;

                                switch (tipo) {
                                    case "CPU":
                                        if (usoComponente > 80.0) {
                                            statusCritico = true;
                                        } else if (usoComponente > 60.0) {
                                            statusAtencao = true;
                                        }
                                        break;
                                    case "Disco":
                                        if (usoComponente > 60.0) {
                                            statusCritico = true;
                                        } else if (usoComponente > 30.0) {
                                            statusAtencao = true;
                                        }
                                        break;
                                    case "RAM":
                                        if (usoComponente > 90.0) {
                                            statusCritico = true;
                                        } else if (usoComponente > 75.0) {
                                            statusAtencao = true;
                                        }
                                        break;
                                }
                            } else {
                                statusTv = "Indisponível"
                            }
                        });

                        if (statusCritico) {
                            statusTv = "CRÍTICO";
                        } else if (statusAtencao) {
                            statusTv = "ATENÇÃO";
                        }

                        return {
                            ...tv,
                            atualizado: atualizado,
                            conexao: atualizado ? "ON" : "OFF",
                            status: statusTv
                        };
                    });
                });

                Promise.all(verificacoes).then(resultados => {
                    let televisoesNaoAtualizadas = resultados.filter(tv => !tv.atualizado);
                    let ambientesStatus = {};

                    resultados.forEach(tv => {
                        if (!ambientesStatus[tv.setor]) {
                            ambientesStatus[tv.setor] = { atualizado: 0, naoAtualizado: 0 };
                        }

                        if (tv.atualizado) {
                            ambientesStatus[tv.setor].atualizado += 1;
                        } else {
                            ambientesStatus[tv.setor].naoAtualizado += 1;
                        }
                    });

                    res.status(200).json({
                        quantidadeNaoAtualizadas: televisoesNaoAtualizadas.length,
                        televisoesNaoAtualizadas: televisoesNaoAtualizadas,
                        ambienteStatus: ambientesStatus,
                        televisoes: resultados
                    });

                }).catch(function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao verificar a atualização dos componentes.", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                });
            }).catch(error => {
                console.log("Houve um erro ao buscar os componentes das TVs: ", error.sqlMessage);
                res.status(500).json(error.sqlMessage);
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