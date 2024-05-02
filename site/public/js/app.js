const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Middleware para analisar dados de formulário
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para receber dados do formulário
app.post('/index', (req, res) => {
  const { nome, sobrenome, cargo, celular, email, empresa } = req.body;

  // Configurações de envio de email
  const transporter = nodemailer.createTransport({
    service: 'smtp-mail.outlook.com',
    auth: {
      user: 'marcelo.souza@sptech.school',
      pass: '#Gf43363952848'
    }
  });

  // Corpo do email
  const mailOptions = {
    from: 'marcelo.souza@sptech.school',
    to: 'marcelo.souza555@outlook.com',
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
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
