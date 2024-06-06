var idUsuarioSelecionado;

function verificarGestor(idGestor) {
    return idGestor > 0 ? "Assistente NOC" : "Gerente NOC";
}
function cadastrarGestor(idEmpresa) {
    const nome = input_nome.value;
    const email = input_email.value;


    
    
    fetch("/usuarios/cadastrarGestor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeGestorServer: nome,
            emailGestorServer: email,
            senhaGestorServer: senha,
            idEmpresaServer: idEmpresa
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Cadastro realizado com sucesso!");
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
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

function selecionarGestor(idEmpresa) {
    fetch(`http://localhost:3333/usuarios/buscarGestor?idEmpresa=${idEmpresa}`, {
        method: "GET",
    })
    .then(function (resposta) {
        return resposta.text();  // Lê a resposta como texto
    })
    .then(function (texto) {
        try {
            const usuario = JSON.parse(texto);  // Tenta converter o texto para JSON
            console.log(usuario);  // Log do JSON convertido

            // Atualiza os valores dos inputs se o JSON for válido
            if (Array.isArray(usuario) && usuario.length > 0) {
                sessionStorage.ID_GESTOR_EMPRESA = usuario[0].idUsuario
                document.getElementById("input_nome_perfil").value = usuario[0].nome;
                document.getElementById("input_email_perfil").value = usuario[0].email;
            } else {
                console.error("Resposta JSON não é um array ou está vazio:", usuario);
            }
        } catch (e) {
            console.error("Erro ao analisar JSON:", e, "Resposta recebida:", texto);
        }
    })
    .catch(function (erro) {
        console.error("Erro na requisição fetch:", erro);
    });
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