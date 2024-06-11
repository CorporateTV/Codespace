var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");


router.get("/buscar/:idEmpresa", function (req, res) {
    empresaController.buscarPorId(req, res);
});

router.get("/buscarEmpresaPnome/:nomeEmpresa", function (req, res) {
    empresaController.buscarPornomeEmpresa(req, res);
});

router.get("/listar", function (req, res) {
    empresaController.listar(req, res);
});

router.post("/cadastrarEmpresa",function (req, res){

    empresaController.cadastrarEmpresa(req, res);
})

router.get("/quantidadeUsuarios/:idEmpresa", function (req, res) {
    empresaController.quantidadeUsuarios(req, res);
})

router.get("/listarUsuariosEmpresa/:idEmpresa", function (req, res) {
    empresaController.listarUsuariosEmpresa(req, res);
})

router.post("/atualizarEmpresa", function (req, res) {
    empresaController.atualizarEmpresa(req, res);
})

module.exports = router;