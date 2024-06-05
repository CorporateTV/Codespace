var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/atualizarPerfil", function (req, res) {
    usuarioController.atualizarPerfil(req, res);
})

router.post("/cadastrarGestor", function (req, res) {
    usuarioController.cadastrarGestor(req, res);
})

router.get("/quantidadeUsuariosPorTipo/:idEmpresa", function(req, res) {
    usuarioController.quantidadeUsuariosPorTipo(req, res);
});

router.post("/redefinirSenha", function (req, res) {
    usuarioController.redefinirSenha(req, res);
});

module.exports = router;