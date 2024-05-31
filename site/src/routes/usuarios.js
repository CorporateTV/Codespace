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

router.post("/atualizarPerfilGestor", function (req, res) {
    usuarioController.atualizarPerfilGestor(req, res);
})

router.post("/gestorCadastrar", function (req, res) {
    usuarioController.gestorCadastrar(req, res);
})

router.get("/quantidadeUsuariosPorTipo/:idEmpresa", function(req, res) {
    usuarioController.quantidadeUsuariosPorTipo(req, res);
});

router.get("/buscarUsuario", function(req, res) {
    usuarioController.buscarUsuario(req, res);
});


module.exports = router;