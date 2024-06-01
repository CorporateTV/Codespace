var express = require("express");
var router = express.Router();

var comandoController = require("../controllers/comandoController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/inserirComando", function (req, res) {
    comandoController.inserirComando(req, res);
})

router.post("/atualizarComando", function (req, res) {
    comandoController.atualizarComando(req, res);
});

router.post("/deletarComando", function (req, res) {
    comandoController.deletarComando(req, res);
})

router.get("/listarComandos/:idTelevisao", function (req, res) {
    comandoController.listarComandos(req, res);
})

router.get("/ultimoComando", function (req, res) {
    comandoController.ultimoComando(req, res);
})

module.exports = router;