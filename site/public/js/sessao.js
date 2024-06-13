var sessaoNomeFantasia = sessionStorage.NOME_FANTASIA;
var sessaoPlano = sessionStorage.PLANO;

var sessaoIdUsuario = sessionStorage.ID_USUARIO;
var sessaoeEmail = sessionStorage.EMAIL_USUARIO;
var sessaoNomeUsuario = sessionStorage.NOME_USUARIO;
var sessaoGestor = sessionStorage.ID_GESTOR;
var sessionIdEmpresa = sessionStorage.ID_EMPRESA;

function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;


    if (email == null || nome == null) {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

if (sessionStorage.ID_GESTOR == "null" || sessionStorage.ID_GESTOR == 0) {
    tipo_dash.href = 'dashboard.html'
} else {
    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("control_center").style.display = "none"; // Ou "inline", "flex", etc.
    });
    tipo_dash.href = "dashboard_funcionario.html"
}  