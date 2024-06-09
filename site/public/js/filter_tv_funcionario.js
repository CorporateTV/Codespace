var sessionIdEmpresa = sessionStorage.ID_EMPRESA;

function listarDadosTvEmpresa(idEmpresa) {
    return fetch(`/tv/listarDadosTv/${idEmpresa}`, {
        method: "GET",
    })
    .then(function (resposta) {
        if (!resposta.ok) {
            throw new Error('Network response was not ok ' + resposta.statusText);
        }

        return resposta.json();
        
    })
    .then((data) => {
        return data;
    })
    .catch(function (erro) {
        console.log(`#ERRO: ${erro}`);
    });
}

function createComponent(tvInfo) {
    var cardDiv = document.createElement("div");
    cardDiv.className = "card";

    var containerImgDiv = document.createElement("div");
    containerImgDiv.className = "container-img";

    var img = document.createElement("img");
    img.src = "../assets/monitor.png";
    img.alt = "Monitor";

    containerImgDiv.appendChild(img);

    var infoTvDiv = document.createElement("div");
    infoTvDiv.className = "info-tv";

    var tvNameP = document.createElement("p");
    tvNameP.textContent = tvInfo.nome;
    tvNameP.id = "nome_tv_componente";

    var hostnameP = document.createElement("p");
    hostnameP.textContent = tvInfo.hostName;
    hostnameP.id = "hostname_componente";

    var statusP = document.createElement("p");
    statusP.textContent = "ON";
    statusP.id = "status_componente";

    var conditionP = document.createElement("p");
    conditionP.textContent = "NORMAL";
    conditionP.id = "condition_componente";

    infoTvDiv.appendChild(tvNameP);
    infoTvDiv.appendChild(hostnameP);
    infoTvDiv.appendChild(statusP);
    infoTvDiv.appendChild(conditionP);

    cardDiv.appendChild(containerImgDiv);
    cardDiv.appendChild(infoTvDiv);

    cardDiv.addEventListener("click", function () {
        sessionStorage.ID_TV = tvInfo.idTelevisao;
        sessionStorage.NOME_TV = tvInfo.nome;
        sessionStorage.HOSTNAME_TV = tvInfo.hostName;
        sessionStorage.STATUS_TV = "ON";
        sessionStorage.CONDITION_TV = "NORMAL";
        sessionStorage.FLOOR_TV = tvInfo.andar;
        sessionStorage.SECTOR_TV = tvInfo.setor;
        sessionStorage.COMPONENTES_TV = JSON.stringify(tvInfo.componentes);

        window.location.href = "analytics.html";
    });

    return cardDiv;
}

function createMultipleComponents(tvInfoArray) {
    var container = document.getElementById("content");

    for (var i = 0; i < tvInfoArray.length; i++) {
        var component = createComponent(tvInfoArray[i]);
        container.appendChild(component);
    }
}

function populateFloorOptions(tvInfoArray) {
    const andaresUnicos = new Set();
    const selectElement = document.getElementById('andar');

    selectElement.innerHTML = '';

    tvInfoArray.forEach(tvInfo => {
        andaresUnicos.add(tvInfo.andar);
    });

    andaresUnicos.forEach(andar => {
        const option = document.createElement('option');
        option.value = andar;
        option.textContent = andar;
        selectElement.appendChild(option);
    });
}

function getUniqueSectorsInFloor(tvInfoArray, andar) {
    const setoresUnicos = new Set();

    tvInfoArray.forEach(tvInfo => {
        if (tvInfo.andar === andar) {
            setoresUnicos.add(tvInfo.setor);
        }
    });

    return Array.from(setoresUnicos);
}

function populateSectorOptions(tvInfoArray, andar) {
    const selectElement = document.getElementById('setor');
    const uniqueSectors = getUniqueSectorsInFloor(tvInfoArray, andar);

    selectElement.innerHTML = '';

    uniqueSectors.forEach(setor => {
        const option = document.createElement('option');
        option.value = setor;
        option.textContent = setor;
        selectElement.appendChild(option);
    });
}

function filterComponents(tvInfoArray, andar, setor) {
    var components = document.querySelectorAll('.card');

    for (var j = 0; j < components.length; j++) {
        var component = components[j];
        var infoTv = component.querySelector('.info-tv');
        var tvName = infoTv.children[0].textContent;
        var hostname = infoTv.children[1].textContent;

        var tvInfo = tvInfoArray.find(tv => tv.nome === tvName && tv.hostName === hostname);

        if (andar && setor) {
            if (tvInfo.andar === andar && tvInfo.setor === setor) {
                component.style.display = 'block';
            } else {
                component.style.display = 'none';
            }
        } else if (andar) {
            if (tvInfo.andar === andar) {
                component.style.display = 'block';
            } else {
                component.style.display = 'none';
            }
        } else if (setor) {
            if (tvInfo.setor === setor) {
                component.style.display = 'block';
            } else {
                component.style.display = 'none';
            }
        } else {
            component.style.display = 'block';
        }
    }
}


listarDadosTvEmpresa(sessionIdEmpresa).then(tvInfoArrayJson => {
    if (tvInfoArrayJson) {
        createMultipleComponents(tvInfoArrayJson);
        populateFloorOptions(tvInfoArrayJson);

        var defaultAndar = document.getElementById('andar').value;
        populateSectorOptions(tvInfoArrayJson, defaultAndar);
        filterComponents(tvInfoArrayJson);

        document.getElementById('andar').addEventListener('change', function () {
            var andar = this.value;
            populateSectorOptions(tvInfoArrayJson, andar);
            var setor = document.getElementById('setor').value;
            filterComponents(tvInfoArrayJson, andar, setor);
        });

        document.getElementById('setor').addEventListener('change', function () {
            var andar = document.getElementById('andar').value;
            var setor = this.value;
            filterComponents(tvInfoArrayJson, andar, setor);
        });

    } else {
        console.error("No TV data found for the company.");
    }
});
