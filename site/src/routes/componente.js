var express = require("express");
var router = express.Router();

var componenteController = require("../controllers/componenteController")

router.get("/componentesTv/:idTv", function(req, res) {
    componenteController.componentesTv(req, res);
});

module.exports = router;