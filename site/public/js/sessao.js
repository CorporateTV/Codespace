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


function alterarLinkPorTipoUsuario() {
    if(sessionStorage.ID_GESTOR == "null") {
        tipo_dash.href = 'dashboard.html'
    } else {
        control_center.remove();
        tipo_dash.href = "dashboard_funcionario.html"
    }  
} 