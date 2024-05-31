const sessaoNomeFantasia = sessionStorage.NOME_FANTASIA;
const sessaoPlano = sessionStorage.PLANO;

const sessaoIdUsuario = sessionStorage.ID_USUARIO;
const sessaoeEmail = sessionStorage.EMAIL_USUARIO;
const sessaoNomeUsuario = sessionStorage.NOME_USUARIO;
const sessaoGestor = sessionStorage.ID_GESTOR;


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