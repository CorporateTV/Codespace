var express = require("express");
var router = express.Router();

var tvController = require("../controllers/tvController")

router.get("/quantidadeTv/:idEmpresa", function(req, res) {
    tvController.quantidadeTvEmpresa(req, res);
});

router.get("/listarDadosTv/:idEmpresa", function(req, res) {
    tvController.listarDadosEmpresaTv(req, res);
})

router.get("/dados-tv/:idTelevisao", function(req, res) {
    tvController.dadosTv(req, res);
})

module.exports = router;