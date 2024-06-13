function tabConfiguracao(evt, optionValue) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-links");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(optionValue).style.display = "block";
    evt.currentTarget.className += " active";
  }

  document.getElementById("defaultOpen").click();

function buscarEmpresaPnome(nomeEmpresa) {

    fetch(`/empresa/buscarEmpresaPnome/${nomeEmpresa}`, {
        method: "GET",
    })
        .then(function (resposta) {
            // Verifica se a resposta é bem-sucedida (status 200)
            if (!resposta.ok) {
                throw new Error('Erro ao buscar dados');
            }
            return resposta.json();
            
        })
        .then(function (dados) {
            sessionStorage.ID_EMPRESA_CADASTRO = dados[0].idEmpresa

        })
        .catch(function (erro) {
            console.error('Erro:', erro);
            return false;
        });
}

function editInputGestor() {
    var inputsElementGestor = document.querySelectorAll(".input-edit-gestor");
    var buttonEditGestor = document.getElementById("button-edit-gestor");
    var selectCargoGestor = document.getElementById("select_gestor_cargo");
  
    var modoEdicao = false;
    
  
    inputsElementGestor.forEach(function (input) {
      input.readOnly = !input.readOnly;
      if (input.readOnly) {
        modoEdicao = true;
      }
    });
    
  
    selectCargoGestor.disabled = !selectCargoGestor.disabled;
  
    if (modoEdicao) {
      buttonEditGestor.style.display = "none";
    } else {
      buttonEditGestor.style.display = "block";
    }
  }

function mudarSelect() {
    const selectElement = document.getElementById("plan");
    const plano = selectElement.options[selectElement.selectedIndex].value;
    sessionStorage.PLANO = plano;
}


function validarEnvio() {
    sessionStorage.PLANO = "Basico"
    var nomeFantasia = input_nomeFantasia_cadastro.value;
    var regexNome = /^[a-zA-ZÀ-ÿ\s]+$/;
    var email = input_email_cadastro.value;
    var emailConfirmacao = input_confirmarEmail.value;
    var nome = input_nome_cadastro.value;
    var cnpj = input_empresa_CNPJ.value;

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
        
        cadastrarEmpresaGestor()
    }
    else if (!validacaoNomeFantasia) {
        document.getElementById('nome-error').innerHTML = "O campo nome está preenchido de forma incorreta";
        document.getElementById('nome-error').style.color = "red";
    }


    function cadastrarEmpresaGestor() {

        var dadosEmpresa = {
            nomeFantasia: input_nomeFantasia_cadastro.value,
            plano: plan.value,
            cnpj: input_empresa_CNPJ.value
        };


        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?-=[];,./';
        let senha = caracteres.charAt(Math.floor(Math.random() * 26));
        senha += caracteres.charAt(26 + Math.floor(Math.random() * 26));
        senha += caracteres.charAt(52 + Math.floor(Math.random() * 22));
        for (let i = 0; i < 5; i++) {
            senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        senha = senha.split('').sort(() => Math.random() - 0.5).join('');


        var dadosGestor = {
            nome: input_nome_cadastro.value,
            email: input_email_cadastro.value,
            senha: senha
        };


        fetch("/empresa/cadastrarEmpresa", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosEmpresa)
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    if (buscarEmpresaPnome(input_nomeFantasia_cadastro.value) != false) {

                        let idEmpresa = sessionStorage.ID_EMPRESA_CADASTRO
                        console.log(sessionStorage.ID_EMPRESA_CADASTRO);
                        dadosGestor.fkEmpresa = idEmpresa;
                        
                        fetch("/usuarios/gestorCadastrar", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(dadosGestor)
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log("Empresa e gestor cadastrados com sucesso!");
                            })
                            .catch(error => {
                                console.error("Erro ao cadastrar gestor:", error);
                            });
                    }
                } else {
                    throw "Houve um erro ao tentar realizar o cadastro!";
                }
            })
            .catch(error => {
                console.error("Erro ao cadastrar empresa:", error);
            });

    }

    // else if (!validacaoEmail) {
    //     document.getElementById('email-error').innerHTML = "Só pode usar email corporativo";
    //     document.getElementById('email-error').style.color = "red";
    // }
}

function atualizarInformacoesCadastro() {
    editInputGestor()
    atualizarEmpresa(sessionStorage.ID_EMPRESA)
    atualizarPerfil(sessionStorage.ID_GESTOR_EMPRESA);
    listarEmpresas();
}

function resetCredenciais() {
    input_nome_fantasia.value = ""
    input_CNPJ.value = ""
    input_nome_perfil.value = ""
    input_email_perfil.value = ""
}



