var empresaModel = require("../models/empresaModel");

function buscarPornomeEmpresa(req, res) {
  var nomeEmpresa = req.params.nomeEmpresa;
  
  empresaModel.buscarPornomeEmpresa(nomeEmpresa).then((resultado) => {
    res.status(200).json(resultado);
  });

}



function buscarPorId(req, res) {
  var idEmpresa = req.params.idEmpresa;

  empresaModel.buscarPorId(idEmpresa).then((resultado) => {
    res.status(200).json(resultado);
  });
}


function cadastrarEmpresa(req,res){
  // Crie uma variável que vá recuperar os valores do arquivo cadastro-admin.html
  // var nomeFantasia = req.body.nomeFantasiaServer;
  // var plano = req.body.planoServer;
  // console.log(nomeFantasia)
  const { nomeFantasia,cnpj, plano } = req.body;
  

 // Faça as validações dos valores
 if (nomeFantasia == undefined) {
     res.status(400).send("Seu nomeFantasia está undefined!");
 } 

 // Passe os valores como parâmetro e vá para o arquivo empresaModel.js
 empresaModel.cadastrarEmpresa(nomeFantasia,cnpj,plano)
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

function quantidadeUsuarios(req, res) {
  var idEmpresa = req.params.idEmpresa;

  empresaModel.quantidadeUsuarios(idEmpresa).then((resultado) => {
      if (resultado.length > 0) {
          res.status(200).json({ quantidadeUsuarios: resultado[0].quantidadeUsuarios});
      } else {
          res.status(204).json({quantidadeUsuarios: 0});
      }
  }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao buscar as Usuários: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listarUsuariosEmpresa(req, res) {
  var idEmpresa = req.params.idEmpresa;

  empresaModel.listarUsuariosEmpresa(idEmpresa).then((resultadoUsuarios) => {
    res.status(200).json(resultadoUsuarios);
  })
}
function atualizarEmpresa(req, res) {
  var nomeFantasia = req.body.nomeFantasiaServer;
  var cnpj = req.body.cnpjServer;
  var idEmpresa = req.body.idEmpresaServer;
  var plano = req.body.planoServer;

  if (nomeFantasia == undefined) {
      res.status(400).send("Seu nome está undefined!");
  }
  if (cnpj == undefined) {
      res.status(400).send("Seu nome está undefined!");
  }

  empresaModel.atualizarEmpresa(nomeFantasia, cnpj, idEmpresa , plano).then(function (resultado) {
      res.status(200).send(`Perfil atualizado com sucesso: ${nomeFantasia} + ${cnpj} + ${idEmpresa} + ${plano}`);
  }).catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
  })
}
module.exports = {
  atualizarEmpresa,
  cadastrarEmpresa,
  buscarPorId,
  listar,
  buscarPornomeEmpresa,
  quantidadeUsuarios,
  listarUsuariosEmpresa
};
