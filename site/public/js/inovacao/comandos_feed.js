var numeroUltimoComando;

function ultimoComando() {
    return fetch(`/comando/ultimoComando`, {
        method: "GET",
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Network response was not ok ' + resposta.statusText);
            }
            return resposta.json();
        })
        .then((valor) => {
            numeroUltimoComando = valor.ultimoComando;
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });
}

function escreverComando(idComando, comando) {
    const messageFeed = document.getElementById('messageFeed');

    const message = document.createElement('div');
    message.className = 'massage-comando';
    message.id = idComando;

    const title = document.createElement('p');
    title.id = 'title-massage';
    title.innerHTML = `Comando: <span id="comando">${comando}</span>`;
    message.appendChild(title);

    const editButton = document.createElement('button');
    editButton.className = 'edit-massage-button';
    editButton.innerText = 'Editar';
    editButton.onclick = () => editMessage(message, title, idComando);
    message.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-massage-button';
    deleteButton.innerText = 'Deletar';
    deleteButton.onclick = () => deleteMessage(message);
    message.appendChild(deleteButton);

    const result = document.createElement('div');
    result.className = 'massage-resultado';
    result.innerHTML = '<p>Resultado comando</p>';
    message.appendChild(result);

    messageFeed.insertBefore(message, messageFeed.firstChild);
}

function enviarComando(idTelevisao) {
    const messageInput = document.getElementById('messageInput');
    var comando = messageInput.value.trim();

    if (comando === '') return;

    fetch("/comando/inserirComando", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeComandoServer: comando,
            idTelevisaoServer: idTelevisao
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error("Houve um erro ao tentar realizar o cadastro!");
            }
        })
        .then((data) => {
            ultimoComando();

            console.log(numeroUltimoComando);

            var novoValorComando = numeroUltimoComando + 1;

            escreverComando(novoValorComando, comando);
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    messageInput.value = '';
    return false;
}

function listarComandos(idTelevisao) {
    fetch(`/comando/listarComandos/${idTelevisao}`, {
        method: "GET",
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Network response was not ok ' + resposta.statusText);
            }
            return resposta.json();
        })
        .then((data) => {
            data.forEach(comando => {
                escreverComando(comando.idComando, comando.nome);
            });
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });
}

function editMessage(message, title, idComando) {
    const command = title.querySelector('#comando').innerText;
    const novoComando = prompt('Edit your message:', command);
    if (novoComando !== null && novoComando.trim() !== '') {
        fetch("/comando/atualizarComando", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeComandoServer: novoComando,
                idComandoServer: idComando
            }),
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    title.querySelector('#comando').innerText = novoComando;
                } else {
                    throw new Error("Houve um erro ao tentar atualizar o comando!");
                }
            })
            .catch(function (erro) {
                console.log(`#ERRO: ${erro}`);
            });
    }
}

function deleteMessage(message) {
    const idComando = message.id;

    fetch("/comando/deletarComando", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idComandoServer: idComando
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                message.remove();
            } else {
                throw new Error("Houve um erro ao tentar deletar o comando!");
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });
}

ultimoComando();