const nodemailer = require('nodemailer');

var codConfirm;
var nome;
var sobrenome;
var empresa;
var email;
var senha;

function generateSecurityCode() {
    var codConfirm = Math.floor(10000 + Math.random() * 900000);
}

function cadastrar(){
nome = input_nome.value;
sobrenome = input_sobrenome.value;
empresa = input_empresa.value;
email = input_email.value;
senha = input_senha.value;

var regexNome = /^[a-zA-ZÀ-ÿ\s]+$/
console.log(nome)
const validacaoNome = regexNome.test(nome);
console.log(validacaoNome)

var regexSobrenome = /^[a-zA-ZÀ-ÿ\s]+$/ 
console.log(sobrenome)
const validacaoSobrenome = regexSobrenome.test(sobrenome);
console.log(validacaoSobrenome)

var regexEmail = /^(?!.*@(gmail|hotmail|outlook)\.com).*$/;
var regex2Email = /^[A-Za-z0-9._%+-]+@(?!.*@(gmail|hotmail|outlook)\.com).*$/;
console.log(email)
const validacaoEmail = regexEmail.test(email);
console.log(validacaoEmail)
console.log(email)
const validacao2Email = regex2Email.test(email);
console.log(validacao2Email)

var regexSenha = /^[A-Za-z0-9À-ÿ\s]{8,50}$/
console.log(senha)
const validacaoSenha = regexSenha.test(senha);
console.log(validacaoSenha)

if(validacaoNome && 
validacaoSobrenome == true && 
validacao2Email == true && 
validacaoEmail == true && 
validacaoSenha == true)alert("cadastro confirmado")
else if (validacaoNome == false)alert("O campo nome está preenchido de forma incorreta")
else if (validacaoSobrenome == false)alert("O campo sobrenome está preenchido de forma incorreta")
else if (validacaoEmail == false)alert("Só pode usar email corporativo")
else if (validacaoSenha == false)alert("A senha deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial")

generateSecurityCode();

    const transport = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false, 
        auth: {
            user: 'guilherme.sgoncalves@sptech.school',
            pass: '#Gf56077598810',
        }
    });
    
    transport.sendMail({
        from: 'Lysing <guilherme.sgoncalves@sptech.school>',
        to: email,
        subject: 'Enviando Email test com NODEMAILER',
        html: `<p>O código de confirmação é: ${codConfirm}</p>`,
        text: `O código de confirmação é: ${codConfirm}` 
    })
    .then(() => console.log('Email enviado com sucesso!'))
    .then(() => console.log(codConfirm))
    .catch((err) => console.error('Erro ao enviar email:', err));


    var codValidar = number1.value + number2.value + number3.value + number4.value + number1.value + number2.value;

}

function validarCod(){
    generateSecurityCode()
    
    if(codConfirm == codValidar ) {
        return alert("Código certo!")
     }
}


module.exports = {
    cadastrar,
    validarCod
}