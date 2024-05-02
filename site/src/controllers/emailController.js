var bodyParser = require('body-parser');
var nodemailer = require('nodemailer')

// Rota para receber dados do formulário
async function enviar(req, res) {
    const { nome, sobrenome, cargo, celular, email, empresa } = req.body;

    // Configurações de envio de email
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        auth: {
            user: 'marcelo.souza@sptech.school',
            pass: '#Gf43363952848'
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    // Corpo do email
    const mailOptions = {
        from: 'marcelo.souza@sptech.school',
        to: 'marcelo.souza@sptech.school',
        subject: 'Novo contato recebido',
        text: `
        Nome: ${nome}
        Sobrenome: ${sobrenome}
        Cargo: ${cargo}
        Celular: ${celular}
        Email: ${email}
        Empresa: ${empresa}
      `
    };

    // Envia o email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erro ao enviar email');
        } else {
            console.log('Email enviado: ' + info.response);
            res.status(200).send('Email enviado com sucesso');
        }
    });
};

module.exports = {
    enviar
}