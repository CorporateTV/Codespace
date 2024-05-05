var empresaModel = require("../models/empresaModel");

function buscarPornomeEmpresa(req, res) {
    var nomeEmpresa = req.query.nomeFantasia;
  
    empresaModel.buscarPornomeEmpresa(nomeEmpresa).then((resultado) => {
      res.status(200).json(resultado);
    });
  }


function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var idEmpresa = req.params.idEmpresa;

  empresaModel.buscarPorId(idEmpresa).then((resultado) => {
    res.status(200).json(resultado);
  });
}

module.exports = {
  buscarPorId,
  listar,
  buscarPornomeEmpresa
};
