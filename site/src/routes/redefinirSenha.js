var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/redefinirSenha", function (req, res) {
    usuarioController.redefinirSenha(req, res);
});

module.exports = router;
