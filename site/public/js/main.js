function checar() {
  if (check.checked == false) {
    menuItems.style.transform = "translate(0,-100vh)";

  } else {
    menuItems.style.transform = "translate(0px,0px)";
  }

}

function irsegundaPagina() {
  window.scroll({ top: window.innerHeight, behavior: 'smooth' })

}
function irquintaPagina() {
  if(window.innerWidth<2000&& window.innerWidth>1800){
    window.scroll({ top: window.innerHeight*4, behavior: 'smooth' })
  }
  else if(window.innerWidth<=1800 && window.innerWidth>1400){
    window.scroll({ top: window.innerHeight*3.9, behavior: 'smooth' })
  }
  else if(window.innerWidth<=1400 && window.innerWidth>1100){
    window.scroll({ top: window.innerHeight*3.8, behavior: 'smooth' })
  }else if(window.innerWidth<=1100 && window.innerWidth>1070){
    window.scroll({ top: window.innerHeight*3.8, behavior: 'smooth' })
  }
  else if(window.innerWidth<=1070 && window.innerWidth>700){
    window.scroll({ top: window.innerHeight*4.5, behavior: 'smooth' })
  }
  else if(window.innerWidth<=700){
    window.scroll({ top: window.innerHeight*5.1, behavior: 'smooth' })
  }


}

function irLogin() {
  window.location.href = "login.html"

}

var inputCelular = document.getElementById("celular_input");

inputCelular.addEventListener('keypress', () => {

  if (inputCelular.value.length < 1) {
    inputCelular.value += '('
  }
  if (inputCelular.value.length === 3) {
    inputCelular.value += ')'
  }
  if (inputCelular.value.length === 9) {
    inputCelular.value += '-'
  }

})