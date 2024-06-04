var sessionIdEmpresa = sessionStorage.ID_EMPRESA;

function dadosEmpresa(idEmpresa) {
    fetch(`/empresa/buscar/${idEmpresa}`, {
        method: "GET",
    })

    .then(function (resposta) {
        if(!resposta.ok) {
            throw new Error('response was not ok ' + resposta.statusText);
        }

        resposta.json().then((data) => {
            console.log(data);
            console.log(data[0].plano)
            sessionStorage.NOME_FANTASIA = data[0].nomeFantasia;
            sessionStorage.CNPJ = data[0].cnpj;
            sessionStorage.PLANO = data[0].plano;
            sessionStorage.ID_EMPRESA = data[0].idEmpresa

        })
    })
}

function exibirDadosPlano() {
    const nomePlano = sessionStorage.PLANO;
    const licencasUtilizadas = sessionStorage.QUANTIDADE_TV;
    var totalTvPorPlano; 

    document.getElementById("text_nomePlano").innerText = nomePlano;
    document.getElementById("text_planoUtilizado").innerText = licencasUtilizadas;
    

    switch(nomePlano) {
        case "Enterprise":
            document.getElementById("text_planoTotal").innerText = "50";
            totalTvPorPlano = 50;
            break;
        case "Corporativo":
            document.getElementById("text_planoTotal").innerText = "25";
            console.log("Entrou");
            totalTvPorPlano = 25;
            break;
        case "Basico":
            document.getElementById("text_planoTotal").innerText = "10";
            totalTvPorPlano = 10;
            break;
        default:
            console.log("Plano desconhecido");
            totalTvPorPlano = 0;
            document.getElementById("text_planoTotal").innerText = "0";
            break;
    }
    

    const quantidadeDisponivel = totalTvPorPlano - Number(licencasUtilizadas);
    document.getElementById("text_planoDisponivel").innerText = quantidadeDisponivel;

} 

function quantidadeTv(idEmpresa) {
    fetch(`/tv/quantidadeTv/${idEmpresa}`, {
        method: "GET",
    })
    
    .then(function (resposta) {
        if(!resposta.ok) {
            throw new Error('response was not ok ' + resposta.statusText);
        }

        /* Estrutura para acessar propriedade de um objeto */

        resposta.json().then((data) => {
            const quantidade = data.quantidade;
            sessionStorage.QUANTIDADE_TV = quantidade;
            document.getElementById("text_quantidadeTv").innerText = quantidade;
        }); 
    })

    .catch(function (error) {
        console.error("Erro: ", error);
    });
}

function quantidadeUsuarios(idEmpresa) {
    fetch(`/empresa/quantidadeUsuarios/${idEmpresa}`, {
        method: "GET",
    })
    
    .then(function (resposta) {
        if(!resposta.ok) {
            throw new Error('response was not ok ' + resposta.statusText);
        }

        /* Estrutura para acessar propriedade de um objeto */

        resposta.json().then((data) => {
            const quantidade = data.quantidadeUsuarios;
            document.getElementById("text_quantidadeUsuarios").innerText = quantidade;
        }); 
    })

    .catch(function (error) {
        console.error("Erro: ", error);
    });
}



function listarAmbientes(idEmpresa) {
    fetch(`/ambiente/listar/${idEmpresa}`, {
        method: "GET",
    })

    .then(function (resposta) {
        resposta.json().then((ambientes) => {
            ambientes.forEach((ambiente) => {
                console.log(`${ambiente.setor} + ${ambiente.andar}`)
            });
        });
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function listarUsuariosEmpresa(idEmpresa) {
    fetch(`/empresa/listarUsuariosEmpresa/${idEmpresa}`, {
        method: "GET",
    })

    .then(function (resposta) {

        resposta.json().then((usuarios) => {
            usuarios.forEach((usuario) => {
                console.log(usuario.nome);
                const spanElement = document.createElement("span");
                spanElement.className = "opcaoEmpresa";
                spanElement.id = usuario.idUsuario;
                spanElement.textContent = usuario.nome;
                spanElement.onclick = function() {
                    selecionarUsuario(idEmpresa, usuario.idUsuario);
                    idUsuarioSelecionado = this.id;
                };
                lista_usuarios_empresa.appendChild(spanElement);
            })
        })
    })
}


function listarEmpresas() {

    fetch("/empresa/listar", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((empresas) => {
                empresas.forEach((empresa) => {
                    let divFilho = document.createElement('div');
                    let divPai = document.getElementById('list-empresas_ID')
                    divFilho.id = empresa.idEmpresa;
                    divFilho.className = 'empresa'
                    divFilho.innerHTML = empresa.nomeFantasia
                    divFilho.classList.add('divFilhoEmpresa');
                    divPai.appendChild(divFilho);
                    divFilho.onclick = function() {
                        console.log("UAI")
                        selecionarGestor(empresa.idEmpresa)
                        buscarDadosCadastroAdmin(this.id)
                        // idUsuarioSelecionado = this.id;
                    };
                });
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function buscarDadosCadastroAdmin(id){

    dadosEmpresa(id);
    input_nome_fantasia.value = sessionStorage.getItem('NOME_FANTASIA');
    input_CNPJ.value = sessionStorage.getItem('CNPJ');

    console.log(id)
}


function atualizarEmpresa(idEmpresa) {
    const nomeFantasia = input_nome_fantasia.value;
    const cnpj = input_CNPJ.value;



    fetch(`/Empresa/atualizarEmpresa`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeFantasiaServer: nomeFantasia,
            cnpjServer: cnpj,
            idEmpresaServer: idEmpresa,
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





/* Execução das funções */

dadosEmpresa(sessionIdEmpresa);

// Funções página Dashboard
listarAmbientes(sessionIdEmpresa);
