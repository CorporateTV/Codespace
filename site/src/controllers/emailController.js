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
            user: 'lisync_tech@outlook.com',
            pass: 'Lisynctech'
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    // Corpo do email
    const mailOptions = {
        from: 'lisync_tech@outlook.com',
        to: 'lisync_tech@outlook.com',
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