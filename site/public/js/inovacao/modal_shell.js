const modal = document.getElementById("modalShell");
const buttonModal = document.getElementById("btn-comandos");
const closeBtn = document.getElementsByClassName("close-modal")[0];

buttonModal.onclick = function () {
    modal.style.display = "block";
}

closeBtn.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

