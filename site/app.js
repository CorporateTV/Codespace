process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 8080;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var empresaRouter = require("./src/routes/empresa");
var emailRouter = require("./src/routes/email");
var tvRouter = require("./src/routes/tv");
var ambienteRouter = require("./src/routes/ambiente");
var componenteRouter = require("./src/routes/componente");
var comandoRouter = require("./src/routes/comando");
var medidasRouter = require("./src/routes/medidas");
var janelaRouter = require("./src/routes/janela");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/email", emailRouter);
app.use("/empresa", empresaRouter);
app.use("/tv", tvRouter);
app.use("/ambiente", ambienteRouter);
app.use("/componente", componenteRouter);
app.use("/comando", comandoRouter);
app.use("/medidas", medidasRouter);
app.use("/janela", janelaRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});