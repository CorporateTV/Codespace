var nodemailer = require('nodemailer')

// Rota para receber dados do formulário
async function enviarEmailContato(req, res) {
    const { nome, sobrenome, cargo, celular, email, empresa } = req.body;

    // Configurações de envio de email
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        auth: {
            user: 'matheus.shoji@sptech.school',
            pass: '#Gf48021646888'
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    // Corpo do email
    const mailOptions = {
        from: 'matheus.shoji@sptech.school',
        to: 'matheus.shoji@sptech.school',
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

async function enviarEmailConfirmacao(req, res) {
    const { nome, email, codigo} = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        auth: {
            user: 'matheus.shoji@sptech.school',
            pass: '#Gf48021646888'
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    const mailOptions = {
        from: 'LiSync <matheus.shoji@sptech.school>',
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
