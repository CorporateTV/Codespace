const sessaoNomeFantasia = sessionStorage.NOME_FANTASIA;
const sessaoPlano = sessionStorage.PLANO;

const sessaoIdUsuario = sessionStorage.ID_USUARIO;
const sessaoeEmail = sessionStorage.EMAIL_USUARIO;
const sessaoNomeUsuario = sessionStorage.NOME_USUARIO;
const sessaoGestor = sessionStorage.ID_GESTOR;

function verificarGestor(idGestor) {
    return idGestor == 1 ? "Gerente NOC" : "Assistente NOC"; 
}

function selecionarUsuario(idEmpresa, idUsuario) {
    fetch(`http://localhost:3333/usuarios/buscarUsuario?idEmpresa=${idEmpresa}&idUsuario=${idUsuario}`, {
        method: "GET",
    })

    .then(function (resposta) {
        resposta.json().then((usuario) => {
            var valorCargo = usuario[0].fkGestor;
            if(valorCargo == null) {
                valorCargo = 0;
            } else if(valorCargo == 1 || valorCargo > 1) {
                valorCargo = 1;
            }

            console.log(valorCargo);

            document.getElementById("input_gestor_nomeUsuario").value = usuario[0].nome;
            document.getElementById("input_gestor_emailUsuario").value = usuario[0].email;
            document.getElementById("select_gestor_cargo").value = valorCargo;
        })
    })
}