function createComponent(tvInfo) {
    // Create a new div element for the card
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

    var hostnameP = document.createElement("p");
    hostnameP.textContent = tvInfo.hostname;

    var statusP = document.createElement("p");
    statusP.textContent = tvInfo.status;

    var conditionP = document.createElement("p");
    conditionP.textContent = tvInfo.condition;

    infoTvDiv.appendChild(tvNameP);
    infoTvDiv.appendChild(hostnameP);
    infoTvDiv.appendChild(statusP);
    infoTvDiv.appendChild(conditionP);

    cardDiv.appendChild(containerImgDiv);
    cardDiv.appendChild(infoTvDiv);

    cardDiv.addEventListener("click", function() {
        sessionStorage.NOME_TV = tvInfo.tvName;
        sessionStorage.HOSTNAME_TV = tvInfo.hostname;
        sessionStorage.STATUS_TV = tvInfo.status;
        sessionStorage.CONDITION_TV = tvInfo.condition;
        sessionStorage.FLOOR_TV = tvInfo.floor;
        sessionStorage.SECTOR_TV = tvInfo.sector;
        window.location.href = "analytics.html"; // Replace with your desired URL
    });

    return cardDiv;
}

// Function to create multiple components
function createMultipleComponents(tvInfoArray) {
    var container = document.getElementById("content");
    // Loop through the TV information array and create a component for each entry
    for (var i = 0; i < tvInfoArray.length; i++) {
        var component = createComponent(tvInfoArray[i]);
        container.appendChild(component);
    }
}

// Usage example:
var tvInfoArray = [
    { tvName: "TV-01", hostname: "HOSTNAME1", status: "ON", condition: "Normal", floor: "1", sector: "Marketing" },
    { tvName: "TV-02", hostname: "HOSTNAME2", status: "ON", condition: "Normal", floor: "1", sector: "Marketing" },
    { tvName: "TV-03", hostname: "HOSTNAME3", status: "OFF", condition: "Error", floor: "2", sector: "RH" },
    { tvName: "TV-04", hostname: "HOSTNAME4", status: "ON", condition: "Normal", floor: "4", sector: "Vendas" },
    { tvName: "TV-05", hostname: "HOSTNAME5", status: "OFF", condition: "Error", floor: "1", sector: "Hall" },
    { tvName: "TV-06", hostname: "HOSTNAME6", status: "ON", condition: "Normal", floor: "1", sector: "Marketing" },
    { tvName: "TV-07", hostname: "HOSTNAME7", status: "OF", condition: "Normal", floor: "1", sector: "Marketing" },
    { tvName: "TV-08", hostname: "HOSTNAME8", status: "ON", condition: "Normal", floor: "1", sector: "Marketing" },
];


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
    var visibleComponents = new Set(); // Store the indices of components that should be visible

    for (var i = 0; i < tvInfoArray.length; i++) {
        var tvInfo = tvInfoArray[i];
        if (tvInfo.floor === floor && tvInfo.sector === sector) {
            visibleComponents.add(i); // Add the index of the matching component
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

        // Check if any of the visible components match the current component's info
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

// Initial filtering based on default selection
var defaultFloor = document.getElementById('andar').value;
var defaultSector = document.getElementById('setor').value;
populateSectorOptions(tvInfoArray, defaultFloor);
filterComponents(tvInfoArray, defaultFloor, defaultSector);

// Call the function to create multiple components
createMultipleComponents(tvInfoArray);
