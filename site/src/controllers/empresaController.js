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

// function cadastrarGestor(){

// }
function cadastrarEmpresa(req,res){
  // Crie uma variável que vá recuperar os valores do arquivo cadastro-admin.html
  var nomeFantasia = req.body.nomeFantasiaServer;
  var plano = req.body.planoServer;
  console.log(nomeFantasia)
  

 // Faça as validações dos valores
 if (nomeFantasia == undefined) {
     res.status(400).send("Seu nomeFantasia está undefined!");
 } 

 // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
 empresaModel.cadastrarEmpresa(nomeFantasia,plano)
     .then(
         function (resultado) {
             res.json(resultado);
         }
     ).catch(
         function (erro) {
             console.log(erro);
             console.log(
                 "\nHouve um erro ao realizar o cadastro! Erro: ",
                 erro.sqlMessage
             );
             res.status(500).json(erro.sqlMessage);
         }
     );
 }


module.exports = {
  cadastrarEmpresa,
  // cadastrarGestor,
  buscarPorId,
  listar,
  buscarPornomeEmpresa
};
