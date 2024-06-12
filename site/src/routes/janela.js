var express = require("express");
var router = express.Router();

var janelaController = require("../controllers/janelaController");

router.get("/listaJanelas/:idTelevisao", function (req, res) {
    janelaController.buscarJanelas(req, res);
})

module.exports = router;