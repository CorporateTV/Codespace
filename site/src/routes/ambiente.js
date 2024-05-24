var express = require("express");
var router = express.Router();

var ambienteController = require("../controllers/ambienteController");

router.get("/listar/:idEmpresa", function (req, res) {
  ambienteController.listarAmbientes(req, res);
});


module.exports = router;