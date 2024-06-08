var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidasController");

router.get("/ultimas/:idTelevisao/:tipoComponente", function (req, res) {
    medidaController.buscarUtlimasMedidasComponente(req, res);
})

router.get("/tempo-real-componentes/:idTelevisao/:tipoComponente", function (req, res) {
    medidaController.buscarMedidasComponenteEmTempoReal(req, res);
})

router.get("/atualizacao-componentes/:idTelevisao/:tipoComponente", function (req, res) {
    medidaController.verificarAtualizacaoComponente(req, res);
})

router.get("/atualizacao-empresa/:idEmpresa", function (req, res) {
    medidaController.verificarAtualizacaoTelevisoesEmpresa(req, res);
})

router.get("/tempo-real-tv/:idTelevisao", function (req, res) {
    medidaController.buscarMedidasComponentesTv(req, res);
})

module.exports = router;