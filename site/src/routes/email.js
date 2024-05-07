var express = require("express");
var router = express.Router();

var emailController = require("../controllers/emailController");

//Recebendo os dados do html e direcionando para a função enviar de emailController.js
router.post("/enviarEmailContato", function (req, res) {
    emailController.enviarEmailContato(req, res);
});

router.post("/enviarEmailConfirmacao", function (req, res) {
    emailController.enviarEmailConfirmacao(req, res);
});

module.exports = router;