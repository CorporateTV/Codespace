function listarEmpresas() {
    fetch("/empresa/listar", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((empresas) => {
                empresas.forEach((empresa) => {
                    let id = 1
                    chamarEmpresas(id, empresa.nomeFantasia)
                    id++
                    // listaEmpresas.innerHTML += `<option value='${empresa.idEmpresa}'>${empresa.nomeFantasia}</option>`;
                });
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}


function chamarEmpresas(id, nomeFantasia){
    let divFilho = document.createElement('div');
    let divPai = document.getElementById('list-empresas_ID')

    divPai.appendChild(divFilho);
    divFilho.id = id;
    divFilho.className = 'empresa'
    divFilho.innerHTML = nomeFantasia
}

window.onload = function() {
    listarEmpresas();
};

function cadastrar() {
    const nomeFantasia = sessionStorage.NOME_FANTASIA;
    const plano = sessionStorage.PLANO


    // Enviando o valor da nova input
    fetch("/empresa/cadastrarEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeFantasiaServer: nomeFantasia,
            planoServer: plano

        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Cadastro realizado com sucesso!")

            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
        

    return false;
}
function mudarSelect() {
    const selectElement = document.getElementById("plan"); // Obtém o elemento <select>
    const plano = selectElement.options[selectElement.selectedIndex].value;
    sessionStorage.PLANO = plano; // Salva o plano na sessão
    console.log("Plano selecionado:", plano); // Imprime o plano selecionado no console
}



function validarEnvio() {
    var nomeFantasia = input_nomeFantasia.value;
    var regexNome = /^[a-zA-ZÀ-ÿ\s]+$/;

    const validacaoNomeFantasia = regexNome.test(nomeFantasia);

    // var regexEmail = /^(?!.*@(gmail|hotmail|outlook)\.com).*$/;
    // var regex2Email = /^[A-Za-z0-9._%+-]+@(?!.*@(gmail|hotmail|outlook)\.com).*$/;

    // const validacaoEmail = regexEmail.test(email);
    // const validacao2Email = regex2Email.test(email);
    // document.getElementById('nome-error').innerHTML = "";
    // document.getElementById('email-error').innerHTML = "";

    if (nomeFantasia.trim() === "") {
        document.getElementById('nome-error').innerHTML = "O campo nome não pode estar vazio";
        document.getElementById('nome-error').style.color = "red";
    }

    // if (email.trim() === "") {
    //     document.getElementById('email-error').innerHTML = "O campo email não pode estar vazio";
    //     document.getElementById('email-error').style.color = "red";
    // }



    if (validacaoNomeFantasia) {
        var alertaConfirmacao = document.getElementById('alerta-confirmacao');
        alertaConfirmacao.innerHTML = "Cadastro Confirmado!";
        alertaConfirmacao.style.display = "block";


        sessionStorage.NOME_FANTASIA= input_nomeFantasia.value;
        
        // sessionStorage.EMAIL_USUARIO = input_email.value;
        // sessionStorage.ID_EMPRESA = listaEmpresas.value;


        // emailConfirmacao();

        // setTimeout(function () {
        //     alertaConfirmacao.style.display = "none";
        //     window.location.href = "verificacao.html";
        // }, 3000);
        cadastrar()

    }
    else if (!validacaoNomeFantasia) {
        document.getElementById('nome-error').innerHTML = "O campo nome está preenchido de forma incorreta";
        document.getElementById('nome-error').style.color = "red";
    }

    // else if (!validacaoEmail) {
    //     document.getElementById('email-error').innerHTML = "Só pode usar email corporativo";
    //     document.getElementById('email-error').style.color = "red";
    // }


}