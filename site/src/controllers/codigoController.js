var bodyParser = require('body-parser');
var nodemailer = require('nodemailer')

async function cadastrar(req, res) {
    const { nome, email, codigo} = req.body;

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

    const mailOptions = {
        from: 'lisync_tech@outlook.com',
        to: email,
        subject: 'Código de Confirmação',
        html: `<p>Olá ${nome}, o seu código de confirmação é: <b>${codigo}</b></p>`,
        text: `Olá ${nome}, o seu código de confirmação é: ${codigo}` 
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
    cadastrar
}