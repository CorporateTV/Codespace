var idUsuarioSelecionado;

function verificarGestor(idGestor) {
    return idGestor > 0 ? "Assistente NOC" : "Gerente NOC";
}

function selecionarUsuario(idEmpresa, idUsuario) {
    fetch(`http://localhost:3333/usuarios/buscarUsuario?idEmpresa=${idEmpresa}&idUsuario=${idUsuario}`, {
        method: "GET",
    })

        .then(function (resposta) {
            resposta.json().then((usuario) => {
                var valorCargo = usuario[0].fkGestor;
                if (valorCargo == null) {
                    valorCargo = "null";
                } else if (valorCargo == 1 || valorCargo > 1) {
                    valorCargo = 1;
                }

                console.log(valorCargo);

                document.getElementById("input_gestor_nomeUsuario").value = usuario[0].nome;
                document.getElementById("input_gestor_emailUsuario").value = usuario[0].email;
                document.getElementById("select_gestor_cargo").value = valorCargo;
            })
        })
}

function atualizarPerfil(idUsuario) {
    const nomePerfil = input_nome_perfil.value;
    const emailPerfil = input_email_perfil.value;

    console.log(nomePerfil);
    console.log(emailPerfil);

    fetch(`/usuarios/atualizarPerfil`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomePerfil,
            emailServer: emailPerfil,
            idServer: idUsuario,
        }),
    })

        .then(function (resposta) {
            console.log("Resposta atualização:" + resposta);

            var buttonEditProfile = document.getElementById("button-edit-profile");
            var inputsElement = document.querySelectorAll(".input-edit-profile");

            inputsElement.forEach(function (input) {
                input.readOnly
            });

            buttonEditProfile.style.display = "none";


            if (resposta.ok) {
                console.log("Perfil atualizado com sucesso!")

                sessionStorage.EMAIL_USUARIO = emailPerfil;
                sessionStorage.NOME_USUARIO = nomePerfil;

            } else {
                throw "Houve um erro ao tentar realizar o perfil!";
            };
        })

        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        })
}

function atualizarPerfilGestor() {
    const nomePerfil = input_gestor_nomeUsuario.value;
    const emailPerfil = input_gestor_emailUsuario.value;
    var cargoValor = select_gestor_cargo.value;

    console.log(cargoValor);
    console.log(idUsuarioSelecionado);

    if (cargoValor == 1) {
        console.log("Assistente NOC");
    } else {
        console.log("Gestor")
        cargoValor = null;
    }

    console.log(nomePerfil);
    console.log(emailPerfil);

    fetch(`/usuarios/atualizarPerfilGestor`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomePerfil,
            emailServer: emailPerfil,
            idCargoServer: cargoValor,
            idServer: idUsuarioSelecionado,
        }),
    })

        .then(function (resposta) {
            console.log("Resposta atualização:" + resposta);

            var inputsElementGestor = document.querySelectorAll(".input-edit-gestor");
            var buttonEditGestor = document.getElementById("button-edit-gestor");
            var selectCargoGestor = document.getElementById("select_gestor_cargo");

            inputsElementGestor.forEach(function (input) {
                input.readOnly
            });

            buttonEditGestor.style.display = "none";

            selectCargoGestor.disabled;

            if (resposta.ok) {
                console.log("Perfil atualizado com sucesso!")
            } else {
                throw "Houve um erro ao tentar realizar o perfil!";
            };
        })

        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        })
}