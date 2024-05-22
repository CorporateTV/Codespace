var nodemailer = require('nodemailer')

// Rota para receber dados do formulário
async function enviarEmailContato(req, res) {
    const { nome, celular, email, empresa , mensagem } = req.body;

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
        Celular: ${celular}
        Email: ${email}
        Empresa: ${empresa}
        mensagem: 
        ${mensagem}
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

async function enviarEmailConfirmacao(req, res) {
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
        subject: 'Enviando Email test com NODEMAILER',
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
    enviarEmailContato,
    enviarEmailConfirmacao
}
