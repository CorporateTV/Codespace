var express = require("express");
var router = express.Router();

var codigoController = require("../controllers/codigoController");

//Recebendo os dados do html e direcionando para a função enviar de emailController.js
router.post("/cadastrar", function (req, res) {
    codigoController.cadastrar(req, res);
});

module.exports = router;