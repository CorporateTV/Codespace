function validarEnvio() {

    var nome = document.getElementById('input_nomeFunc').value;
    var email = document.getElementById('input_emailFunc').value;
    var email2 = document.getElementById('input_email2Func').value;
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?-=[];,./';
    
    //gerar ao menos uma letra maiúscula
    let senha = caracteres.charAt(Math.floor(Math.random() * 26));

    //pelo menos uma letra minúscula
    senha += caracteres.charAt(26 + Math.floor(Math.random() * 26));

    //pelo menos um caractere especial
    senha += caracteres.charAt(52 + Math.floor(Math.random() * 22));

    //e  Completar a senha com outros caracteres aleatórios
    for (let i = 0; i < 5; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    //Embaralhaando a senha
    senha = senha.split('').sort(() => Math.random() - 0.5).join('');

   

    var regexNome = /^[a-zA-ZÀ-ÿ\s]+$/;
    const validacaoNome = regexNome.test(nome);


    var regexEmail = /^(?!.*@(gmail|hotmail|outlook)\.com).*$/;
    var regex2Email = /^[A-Za-z0-9._%+-]+@(?!.*@(gmail|hotmail|outlook)\.com).*$/;

    const validacaoEmail = regexEmail.test(email);



    document.getElementById('nome-error').innerHTML = "";
    document.getElementById('email-error').innerHTML = "";
    document.getElementById('email-error2').innerHTML = "";


    if (nome.trim() === "") {
        document.getElementById('nome-error').innerHTML = "O campo nome não pode estar vazio";
        document.getElementById('nome-error').style.color = "red";
    }

    if (email.trim() === "") {
        document.getElementById('email-error').innerHTML = "O campo email não pode estar vazio";
        document.getElementById('email-error').style.color = "red";
    }
    if(email !== email2){
        document.getElementById('email-error2').innerHTML = "Os emails devem se coincidir";
        document.getElementById('email-error2').style.color = "red";
    }


    if (email == email2 && validacaoEmail && validacaoNome) {
        var alertaConfirmacao = document.getElementById('alerta-confirmacao');
        // alertaConfirmacao.innerHTML = "Cadastro Confirmado!";
        // alertaConfirmacao.style.display = "none";

        sessionStorage.NOME_USUARIO = nome;
        sessionStorage.EMAIL_USUARIO = email;
        sessionStorage.SENHA_USUARIO = senha;
        console.log(sessionStorage.ID_EMPRESA)

        cadastrar()

    }
    else if (!validacaoNome) {
        document.getElementById('nome-error').innerHTML = "O campo nome está preenchido de forma incorreta";
        document.getElementById('nome-error').style.color = "red";
    }

    else if (!validacaoEmail) {
        document.getElementById('email-error').innerHTML = "Só pode usar email corporativo";
        document.getElementById('email-error').style.color = "red";
    }

    document.getElementById('input_nomeFunc').value = ""
    document.getElementById('input_emailFunc').value = ""
    document.getElementById('input_email2Func').value = ""




}

function cadastrar() {
    const nome = sessionStorage.NOME_USUARIO;
    const idEmpresa = sessionStorage.ID_EMPRESA;
    const email = sessionStorage.EMAIL_USUARIO;
    const senha = sessionStorage.SENHA_USUARIO;

    console.log(nome)
    console.log(idEmpresa)
    console.log(email)
    console.log(senha)


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
                alert("Cadastro de funcionários realizado com sucesso!")
                document.getElementsByClassName(".container-input").style.display = "none"
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
        window.onload

    return false;
}

