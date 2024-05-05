 // JavaScript
 function validarFormulario() {
    const nome = document.getElementById('nome_input').value.trim();
    const sobrenome = document.getElementById('sobrenome_input').value.trim();
    const cargo = document.getElementById('cargo_input').value.trim();
    const celular = document.getElementById('celular_input').value.trim();
    const email = document.getElementById('email_input').value.trim();
    const empresa = document.getElementById('empresa_input').value.trim();

    // Expressões regulares para validar os campos
    const regexNome = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s']+$/; // Aceita letras, espaços e apóstrofos
    
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Verifica se o email tem formato válido

    // Validação do nome e sobrenome
    if (!regexNome.test(nome) || !regexNome.test(sobrenome)) {
        alert("Por favor, insira apenas letras nos campos de nome e sobrenome.");
        return false;
    }

    // Validação do cargo
    if (!regexNome.test(cargo)) {
        alert("Por favor, insira apenas letras no campo de cargo.");
        return false;
    }

    // Validação do email
    if (!regexEmail.test(email)) {
        alert("Por favor, insira um email válido.");
        return false;
    }

    // Se todas as validações passarem, retorna verdadeiro
    return true;
}

function enviarFormulario() {
    if (validarFormulario()) {
        const nome = document.getElementById('nome_input').value;
        const sobrenome = document.getElementById('sobrenome_input').value;
        const cargo = document.getElementById('cargo_input').value;
        const celular = document.getElementById('celular_input').value;
        const email = document.getElementById('email_input').value;
        const empresa = document.getElementById('empresa_input').value;

        const formData = {
            nome: nome,
            sobrenome: sobrenome,
            cargo: cargo,
            celular: celular,
            email: email,
            empresa: empresa
        };

        fetch("/email/enviarEmailContato", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error("Erro ao enviar os dados");
            })
            .then(data => {
                console.log(data); // Exibe a resposta do servidor no console
            })
            .catch(error => {
                console.error(error); // Exibe erros no console
            });
    }
};