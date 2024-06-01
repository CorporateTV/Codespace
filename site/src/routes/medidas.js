var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidasController");

router.get("/ultimas/:idTelevisao/:idComponente", function (req, res) {
    medidaController.buscarUtlimasMedidasComponente(req, res);
})

router.get("/tempo-real-componentes/:idTelevisao/:idComponente", function (req, res) {
    medidaController.buscarMedidasComponenteEmTempoReal(req, res);
})

module.exports = router;