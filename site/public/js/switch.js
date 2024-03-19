// Form Container 
const formArea = document.getElementById('container-switch');

// Form
const loginDiv = document.getElementById('login-side');
const signupDiv = document.getElementById('cadastro-side');

// Form Switch
const switchEffect = document.querySelectorAll('.troca-botao');

// Show Sign Up Form
switchEffect[0].addEventListener('click', () => {
  loginDiv.style.transform = 'translateX(-120%)';
  signupDiv.style.transform = 'translateX(0)';
  formArea.style.height = '80%';

});

// Show Login Form
switchEffect[1].addEventListener('click', () => {
  loginDiv.style.transform = 'translateX(0)';
  signupDiv.style.transform = 'translateX(-120%)';
  
  formArea.style.height = '55%';
});

