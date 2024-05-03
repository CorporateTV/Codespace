function validarCod() {
    var number1 = document.getElementById('number1').value;
    var number2 = document.getElementById('number2').value;
    var number3 = document.getElementById('number3').value;
    var number4 = document.getElementById('number4').value;
    var number5 = document.getElementById('number5').value;
    var number6 = document.getElementById('number6').value;

    var codValidar = number1 + number2 + number3 + number4 + number5 + number6;
    
    if (codConfirm == codValidar ) {
        var alertaConfirmacao = document.getElementById('alerta-confirmacao');
        alertaConfirmacao.innerHTML = "Código Certo!";
        alertaConfirmacao.style.display = "block"; 

     
        setTimeout(function() {
            alertaConfirmacao.style.display = "none";
            window.location.href = "../public/login.html";
        }, 3000);
    } else {
        var alertaErro = document.getElementById('alerta-erro');
        alertaErro.innerHTML = "Código incorreto. Por favor, tente novamente.";
        alertaErro.style.display = "block"; 

   
        setTimeout(function() {
            alertaErro.style.display = "none";
        }, 3000);
    }
}