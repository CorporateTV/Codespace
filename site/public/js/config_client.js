// Tab para página configurações 

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

function tabGestor(idGestor) {
  var usuarioGestor = idGestor == 1;
  if(!usuarioGestor) {
    const element = document.getElementById("cadastroFuncionarios");
    element.remove();
  }
}

/* TAB PERFIL */

function exibirPlanoPerfil() {
  const nomePlano = sessionStorage.PLANO;
  const licencasUtilizadas = sessionStorage.QUANTIDADE_TV;
  var totalTvPorPlano; 

  document.getElementById("text_empresa_plano").innerText = nomePlano;
  

  switch(nomePlano) {
      case "Enterprise":
          document.getElementById("text_empresa_licencas").innerText = "50";
          totalTvPorPlano = 50;
          break;
      case "Corporativo":
          document.getElementById("text_empresa_licencas").innerText = "25";
          console.log("Entrou");
          totalTvPorPlano = 25;
          break;
      case "Basico":
          document.getElementById("text_empresa_licencas").innerText = "10";
          totalTvPorPlano = 10;
          break;
      default:
          console.log("Plano desconhecido");
          totalTvPorPlano = 0;
          document.getElementById("text_empresa_licencas").innerText = "0";
          break;
  }
  
} 

function atualizarPerfil() {
  document.getElementById("button-edit-profile").style.display = "none";
  console.log("Atualizou perfil")
}


/* Inputs */

document.getElementById("input_nome_perfil").value = sessaoNomeUsuario;
document.getElementById("input_email_perfil").value = sessaoeEmail;
document.getElementById("input_cargo_perfil").value = verificarGestor(sessaoGestor);

function editInput(inputId) {
  var inputElement = document.getElementById(inputId);
  inputElement.readOnly = !inputElement.readOnly;

  document.getElementById("button-edit-profile").style.display = "block";
}

/* Dados empresa */

document.getElementById("text_empresa_nomeFantasia").innerText = sessaoNomeFantasia;

/* Dados container-tab-profile */

document.getElementById("profile_description_nome").innerText = sessaoNomeUsuario;
document.getElementById("profile_description_empresa").innerText = sessaoNomeFantasia;
document.getElementById("profile_description_email").innerText = sessaoeEmail;
document.getElementById("profile_description_cargo").innerText = verificarGestor(sessaoGestor);

tabGestor(sessaoGestor);
exibirPlanoPerfil()

/* TAB CADASTRO FUNCIONARIOS */

