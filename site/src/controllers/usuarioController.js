var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String
                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        res.json({
                            idUsuario: resultadoAutenticar[0].idUsuario,
                            email: resultadoAutenticar[0].email,
                            nomeUsuario: resultadoAutenticar[0].nomeUsuario,
                            senha: resultadoAutenticar[0].senha,
                            idGestor: resultadoAutenticar[0].idGestor,
                            idEmpresa: resultadoAutenticar[0].idEmpresa
                        })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idEmpresa = req.body.idEmpresaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Sua empresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, idEmpresa)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


function atualizarPerfil(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var idFuncionario = req.body.idServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }
    if (email == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }

    usuarioModel.atualizarPerfil(nome, email, idFuncionario).then(function (resultado) {
        res.status(200).send(`Perfil atualizado com sucesso: ${nome} + ${email} + ${idFuncionario}`);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}

function atualizarPerfilGestor(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var idCargo = req.body.idCargoServer;
    var idFuncionario = req.body.idServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }
    if (email == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }

    usuarioModel.atualizarPerfilGestor(nome, email, idCargo, idFuncionario).then(function (resultado) {
        res.status(200).send(`Perfil atualizado com sucesso: ${nome} + ${email} + ${idCargo} + ${idFuncionario}`);
    }).catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
    })
}


function gestorCadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idEmpresa = req.body.idEmpresaServer;

    usuarioModel.gestorCadastrar(nome, email, senha, idEmpresa).then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function quantidadeUsuariosPorTipo(req, res) {
    var idEmpresa = req.params.idEmpresa;
  
    usuarioModel.quantidadeUsuariosPorTipo(idEmpresa).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a quantidade de usuários: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUsuario(req, res) {
    var idEmpresa = req.query.idEmpresa;
    var idUsuario = req.query.idUsuario;

    usuarioModel.buscarUsuario(idEmpresa, idUsuario).then((resultado) => {
        res.status(200).json(resultado);
    })
}

function buscarGestor(req, res) {
    var idEmpresa = req.query.idEmpresa;
    usuarioModel.buscarGestor(idEmpresa).then((resultado) => {
        res.status(200).json(resultado);
    })
}

function redefinirSenha(req, res) {
    var novaSenha = req.body.novaSenha;
    var confirmacaoSenha = req.body.confirmacaoSenha;

    if (novaSenha !== confirmacaoSenha) {
        res.status(400).send("As senhas não coincidem!");
        return;
    }

    
    usuarioModel.redefinirSenha(novaSenha)
        .then(function () {
            res.status(200).send("Senha redefinida com sucesso!");
        })
        .catch(function (erro) {
            console.error(erro);
            res.status(500).send("Erro ao redefinir a senha.");
        });
}


module.exports = {
    buscarGestor,
    gestorCadastrar,
    autenticar,
    cadastrar,
    atualizarPerfil,
    atualizarPerfilGestor,
    quantidadeUsuariosPorTipo,
    buscarUsuario,
    redefinirSenha
}