function entrar() {
  var emailVar = input_email.value;
  var senhaVar = input_senha.value;


  if (emailVar == "" || senhaVar == "") {
    alert("Não é permitido campos em branco")
    return false;
  }
  else {
    setInterval(5000);
  }

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        console.log(resposta);

        resposta.json().then((json) => {
          console.log(json);
          console.log(JSON.stringify(json));
          sessionStorage.EMAIL_USUARIO = json.email;
          sessionStorage.NOME_USUARIO = json.nomeUsuario;
          sessionStorage.ID_USUARIO = json.idUsuario;
          sessionStorage.ID_GESTOR = json.idGestor ?? 0;
          sessionStorage.ID_EMPRESA = json.idEmpresa ?? 0;

          if (json.idGestor == null && json.idEmpresa != null) {
            alert("Gestor")
            setTimeout(function () {
              window.location.href = "./dashboard/dashboard.html";
            }, 1000); 
          } else if (json.idEmpresa != null) {
            alert("Assistente")
            setTimeout(function () {
              window.location.href = "./dashboard/dashboard_funcionario.html";
              
            }, 1000); 
          }else{
            alert("Administrador")
            setTimeout(function () {
              window.location.href = "./cadastro-admin.html";
            }, 1000);
          }

        });
      } else {
        console.log("Houve um erro ao tentar realizar o login!");

        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}