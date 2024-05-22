var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.get("/buscar", function (req, res) {
    empresaController.buscarPornomeEmpresa(req, res);
});

router.get("/buscar/:idEmpresa", function (req, res) {
    empresaController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
    empresaController.listar(req, res);
});

router.post("/cadastrarEmpresa",function (req, res){
    empresaController.cadastrarEmpresa(req, res)
})

module.exports = router;