var medidaModel = require("../models/medidasModel");
var tvModel = require("../models/tvModel");

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
    var limiteTempo = 5000; // 5 minutos em milissegundos

    console.log(`Verificando atualização para todas as televisões da empresa ${idEmpresa}`);

    tvModel.listarDadosTv(idEmpresa).then(function (televisoes) {
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
                        nomeTv: tv.nome,
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


module.exports = {
    buscarMedidasComponenteEmTempoReal,
    buscarUtlimasMedidasComponente,
    verificarAtualizacaoComponente,
    verificarAtualizacaoTelevisoesEmpresa
}