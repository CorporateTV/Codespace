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
  window.scroll({ top: window.innerHeight*4, behavior: 'smooth' })

}

function irLogin() {
  window.location.href = "login.html"

}

celularInput.addEventListener('keypress', () => {

  if (celularInput.value.length < 1) {
    celularInput.value += '('
  }
  if (celularInput.value.length === 3) {
    celularInput.value += ')'
  }
  if (celularInput.value.length === 9) {
    celularInput.value += '.'
  }

})