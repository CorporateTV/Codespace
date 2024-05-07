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
    tvNameP.textContent = tvInfo.tvName;
    tvNameP.id = "nome_tv_componente"

    var hostnameP = document.createElement("p");
    hostnameP.textContent = tvInfo.hostname;
    hostnameP.id = "hostname_componente"

    var statusP = document.createElement("p");
    statusP.textContent = tvInfo.status;
    statusP.id = "status_componente"

    var conditionP = document.createElement("p");
    conditionP.textContent = tvInfo.condition;
    conditionP.id = "condition_componente"

    infoTvDiv.appendChild(tvNameP);
    infoTvDiv.appendChild(hostnameP);
    infoTvDiv.appendChild(statusP);
    infoTvDiv.appendChild(conditionP);

    cardDiv.appendChild(containerImgDiv);
    cardDiv.appendChild(infoTvDiv);

    cardDiv.addEventListener("click", function () {
        sessionStorage.NOME_TV = tvInfo.tvName;
        sessionStorage.HOSTNAME_TV = tvInfo.hostname;
        sessionStorage.STATUS_TV = tvInfo.status;
        sessionStorage.CONDITION_TV = tvInfo.condition;
        sessionStorage.FLOOR_TV = tvInfo.floor;
        sessionStorage.SECTOR_TV = tvInfo.sector;
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
    const uniqueFloors = new Set(); // Usando um Set para garantir valores únicos
    const selectElement = document.getElementById('andar');

    // Limpa as opções existentes
    selectElement.innerHTML = '';

    // Encontra todos os andares únicos na lista tvInfoArray
    tvInfoArray.forEach(tvInfo => {
        uniqueFloors.add(tvInfo.floor);
    });

    // Adiciona as opções de andar ao menu suspenso
    uniqueFloors.forEach(floor => {
        const option = document.createElement('option');
        option.value = floor;
        option.textContent = floor;
        selectElement.appendChild(option);
    });
}

populateFloorOptions(tvInfoArray);

function getUniqueSectorsInFloor(tvInfoArray, floor) {
    const uniqueSectors = new Set(); // Usando um Set para garantir valores únicos

    // Encontra todos os setores únicos para o andar especificado
    tvInfoArray.forEach(tvInfo => {
        if (tvInfo.floor === floor) {
            uniqueSectors.add(tvInfo.sector);
        }
    });

    return Array.from(uniqueSectors); // Convertendo o Set para uma array
}

function populateSectorOptions(tvInfoArray, floor) {
    const selectElement = document.getElementById('setor');
    const uniqueSectors = getUniqueSectorsInFloor(tvInfoArray, floor);

    // Limpa as opções existentes
    selectElement.innerHTML = '';

    // Adiciona as opções de setor ao menu suspenso
    uniqueSectors.forEach(sector => {
        const option = document.createElement('option');
        option.value = sector;
        option.textContent = sector;
        selectElement.appendChild(option);
    });
}

function filterComponents(tvInfoArray, floor, sector) {
    var visibleComponents = new Set();

    for (var i = 0; i < tvInfoArray.length; i++) {
        var tvInfo = tvInfoArray[i];
        if (tvInfo.floor === floor && tvInfo.sector === sector) {
            visibleComponents.add(i);
        }
    }

    var components = document.querySelectorAll('.card');

    for (var j = 0; j < components.length; j++) {
        var component = components[j];
        var infoTv = component.querySelector('.info-tv');
        var tvName = infoTv.children[0].textContent;
        var hostname = infoTv.children[1].textContent;
        var status = infoTv.children[2].textContent;
        var condition = infoTv.children[3].textContent;

        if ([...visibleComponents].some(index => {
            var tvInfo = tvInfoArray[index];
            return tvName === tvInfo.tvName && hostname === tvInfo.hostname && status === tvInfo.status && condition === tvInfo.condition;
        })) {
            component.style.display = 'block';
        } else {
            component.style.display = 'none';
        }
    }
}

document.getElementById('andar').addEventListener('change', function () {
    var floor = this.value;
    populateSectorOptions(tvInfoArray, floor); // Atualiza as opções de setor primeiro
    var sector = document.getElementById('setor').value;
    filterComponents(tvInfoArray, floor, sector); // Filtra os componentes depois
});

document.getElementById('setor').addEventListener('change', function () {
    var floor = document.getElementById('andar').value;
    var sector = this.value;
    filterComponents(tvInfoArray, floor, sector);
});

// Iniciar valores padrões de andar e setor

var defaultFloor = document.getElementById('andar').value;
var defaultSector = document.getElementById('setor').value;
populateSectorOptions(tvInfoArray, defaultFloor);
filterComponents(tvInfoArray, defaultFloor, defaultSector);

createMultipleComponents(tvInfoArray);


