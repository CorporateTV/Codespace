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

    function buscarEmpresaPnome(){
    fetch(`/empresa/buscar?nomeFantasia=${"Elera."}`, {
        method: "GET",
    })
    .then(function(resposta) {
        // Verifica se a resposta é bem-sucedida (status 200)
        if (!resposta.ok) {
            throw new Error('Erro ao buscar dados');
        }
        // Retorna os dados como JSON
        return resposta.json();
    })
    .then(function(dados) {
        // Manipula os dados conforme necessário
        console.log(dados); // Aqui você pode fazer o que quiser com os dados recebidos
        sessionStorage.ID_EMPRESA = dados[0].idEmpresa;
        console.log(sessionStorage.ID_EMPRESA)
        cadastrarGestor()
    })
    .catch(function(erro) {
        console.error('Erro:', erro);
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

function cadastrarEmpresa() {

    const nomeFantasia = sessionStorage.NOME_FANTASIA;
    const plano = sessionStorage.PLANO
    const cnpj = sessionStorage.CNPJ


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
                buscarEmpresaPnome();

            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        })

    return false;
}

function cadastrarGestor() {
    const nome = sessionStorage.NOME_GESTOR;
    const email = sessionStorage.EMAIL_GESTOR;
    const senha = sessionStorage.SENHA_GESTOR;
    const idEmpresa = sessionStorage.ID_EMPRESA;

    fetch("/usuarios/cadastrarGestor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeGestorServer: nome,
            emailGestorServer: email,
            senhaGestorServer:senha,
            idEmpresaServer:idEmpresa
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

function mudarSelect() {
    const selectElement = document.getElementById("plan"); 
    const plano = selectElement.options[selectElement.selectedIndex].value;
    sessionStorage.PLANO = plano; 
}





function validarEnvio() {
    sessionStorage.PLANO = "Basico"
    var nomeFantasia = input_nomeFantasia.value;
    var regexNome = /^[a-zA-ZÀ-ÿ\s]+$/;
    var email = input_email.value;
    var emailConfirmacao = input_confirmarEmail.value;
    var nome = input_nome.value;
    var cnpj = input_empresa.value;


    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?-=[];,./';
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


    const validacaoNomeFantasia = regexNome.test(nomeFantasia);

    var regexEmail = /^(?!.*@(gmail|hotmail|outlook)\.com).*$/;
    var regex2Email = /^[A-Za-z0-9._%+-]+@(?!.*@(gmail|hotmail|outlook)\.com).*$/;

    const validacaoEmail = regexEmail.test(email);
    const validacao2Email = regex2Email.test(email);
    document.getElementById('nome-error').innerHTML = "";
    document.getElementById('email-error').innerHTML = "";

    if (nomeFantasia.trim() === "") {
        document.getElementById('nome-error').innerHTML = "O campo nome não pode estar vazio";
        document.getElementById('nome-error').style.color = "red";
    }

    if (email.trim() === "") {
        document.getElementById('email-error').innerHTML = "O campo email não pode estar vazio";
        document.getElementById('email-error').style.color = "red";
    }

    if (validacaoNomeFantasia && email == emailConfirmacao && validacaoEmail && validacao2Email) {
        var alertaConfirmacao = document.getElementById('alerta-confirmacao');
        alertaConfirmacao.innerHTML = "Cadastro Confirmado!";
        alertaConfirmacao.style.display = "block";


        sessionStorage.NOME_FANTASIA= input_nomeFantasia.value;
        sessionStorage.NOME_GESTOR = nome
        sessionStorage.EMAIL_GESTOR = email
        sessionStorage.CNPJ = cnpj
        sessionStorage.SENHA_GESTOR = senha
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
    function cadastrar(){
        cadastrarEmpresa()
        chamarEmpresas()

    }

    // else if (!validacaoEmail) {
    //     document.getElementById('email-error').innerHTML = "Só pode usar email corporativo";
    //     document.getElementById('email-error').style.color = "red";
    // }







    


}