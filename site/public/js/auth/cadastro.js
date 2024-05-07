function validarEnvio() {

    var nome = input_nome.value;
    var sobrenome = input_sobrenome.value;
    var email = input_email.value;
    var senha = input_senha.value;

    var regexNome = /^[a-zA-ZÀ-ÿ\s]+$/;
    const validacaoNome = regexNome.test(nome);

    var regexSobrenome = /^[a-zA-ZÀ-ÿ\s]+$/;
    const validacaoSobrenome = regexSobrenome.test(sobrenome);

    var regexEmail = /^(?!.*@(gmail|hotmail|outlook)\.com).*$/;
    var regex2Email = /^[A-Za-z0-9._%+-]+@(?!.*@(gmail|hotmail|outlook)\.com).*$/;

    const validacaoEmail = regexEmail.test(email);
    const validacao2Email = regex2Email.test(email);

    var regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
    const validacaoSenha = regexSenha.test(senha);

    document.getElementById('nome-error').innerHTML = "";
    document.getElementById('sobrenome-error').innerHTML = "";
    document.getElementById('email-error').innerHTML = "";
    document.getElementById('senha-error').innerHTML = "";

    if (nome.trim() === "") {
        document.getElementById('nome-error').innerHTML = "O campo nome não pode estar vazio";
        document.getElementById('nome-error').style.color = "red";
    }

    if (sobrenome.trim() === "") {
        document.getElementById('sobrenome-error').innerHTML = "O campo sobrenome não pode estar vazio";
        document.getElementById('sobrenome-error').style.color = "red";
    }

    if (email.trim() === "") {
        document.getElementById('email-error').innerHTML = "O campo email não pode estar vazio";
        document.getElementById('email-error').style.color = "red";
    }

    if (senha.trim() === "") {
        document.getElementById('senha-error').innerHTML = "O campo senha não pode estar vazio";
        document.getElementById('senha-error').style.color = "red";
    }


    if (validacaoNome && validacaoSobrenome && validacao2Email && validacaoEmail && validacaoSenha) {
        var alertaConfirmacao = document.getElementById('alerta-confirmacao');
        alertaConfirmacao.innerHTML = "Cadastro Confirmado!";
        alertaConfirmacao.style.display = "block";


        sessionStorage.NOME_USUARIO = input_nome.value;
        sessionStorage.SOBRENOME_USUARIO = input_sobrenome.value;
        sessionStorage.EMAIL_USUARIO = input_email.value;
        sessionStorage.ID_EMPRESA = listaEmpresas.value;
        sessionStorage.SENHA_USUARIO = input_senha.value;

        emailConfirmacao();

        setTimeout(function () {
            alertaConfirmacao.style.display = "none";
            window.location.href = "verificacao.html";
        }, 3000);

    }
    else if (!validacaoNome) {
        document.getElementById('nome-error').innerHTML = "O campo nome está preenchido de forma incorreta";
        document.getElementById('nome-error').style.color = "red";
    }
    else if (!validacaoSobrenome) {
        document.getElementById('sobrenome-error').innerHTML = "O campo sobrenome está preenchido de forma incorreta";
        document.getElementById('sobrenome-error').style.color = "red";
    }
    else if (!validacaoEmail) {
        document.getElementById('email-error').innerHTML = "Só pode usar email corporativo";
        document.getElementById('email-error').style.color = "red";
    }
    else if (!validacaoSenha) {
        document.getElementById('senha-error').innerHTML = "A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial";
        document.getElementById('senha-error').style.color = "red";
    }

}


function emailConfirmacao() {

    const nome = document.getElementById('input_nome').value;
    const email = document.getElementById('input_email').value;

    const codigo = Math.floor(100000 + Math.random() * 900000).toString().substring(0, 6);

    localStorage.setItem('codigo', codigo);

    const formData = {
        nome: nome,
        email: email,
        codigo: codigo
    };

    fetch("/email/enviarEmailConfirmacao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error("Erro ao enviar os dados");
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}


function listarEmpresas() {
    fetch("/empresa/listar", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((empresas) => {
                empresas.forEach((empresa) => {
                    listaEmpresas.innerHTML += `<option value='${empresa.idEmpresa}'>${empresa.nomeFantasia}</option>`;
                });
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

const codigo = localStorage.getItem('codigo');
if (codigo) {
    console.log("Código recuperado:", codigo);
} else {
    console.log("Nenhum código encontrado no localStorage.");
}

function validarCod() {
    var codValidar = number1.value + number2.value + number3.value + number4.value + number5.value + number6.value;
    var codigo = localStorage.getItem('codigo');

    if (codigo == codValidar) {
        var alertaConfirmacao = document.getElementById('alerta-confirmacao');
        alertaConfirmacao.innerHTML = "Código Correto!";
        alertaConfirmacao.style.display = "block";

        setTimeout(function () {
            alertaConfirmacao.style.display = "none";
            cadastrar();
        }, 3000);
    } else {
        var alertaErro = document.getElementById('alerta-erro');
        alertaErro.innerHTML = "Código incorreto. Por favor, tente novamente.";
        alertaErro.style.display = "block";

        setTimeout(function () {
            alertaErro.style.display = "none";
        }, 3000);
    }
}

function cadastrar() {
    const nome = sessionStorage.NOME_USUARIO + sessionStorage.SOBRENOME_USUARIO;
    const idEmpresa = sessionStorage.ID_EMPRESA;
    const email = sessionStorage.EMAIL_USUARIO;
    const senha = sessionStorage.SENHA_USUARIO;

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha,
            empresaServer: idEmpresa
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...")

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");

            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}