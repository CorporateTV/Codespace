const modal = document.getElementById("modalShell");
const buttonModal = document.getElementById("btn-comandos");
const closeBtn = document.getElementsByClassName("close-modal")[0];

buttonModal.onclick = function () {
    modal.style.display = "block";
    idTv = sessionStorage.ID_TV
    console.log(idTv)
    listarComandos(idTv);
}

closeBtn.onclick = function () {
    modal.style.display = "none";
    document.getElementById('messageFeed').innerText = "";

}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById('messageFeed').innerText = "";
    }
}
function desligarComando(idTelevisao) {
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
