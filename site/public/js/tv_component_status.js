function createComponentStatus(tvInfo) {
    var cardDiv = document.createElement("div");
    cardDiv.className = "card-tv-status bg-status-ok";

    var infoTvDiv = document.createElement("div");
    infoTvDiv.className = "card-status-text";

    var hostnameP = document.createElement("p");
    hostnameP.textContent = tvInfo.hostname;
    hostnameP.id = "hostname_status"

    var subtitleP = document.createElement("p");
    subtitleP.textContent = 'Localização:';

    var localizacaoP = document.createElement("p");
    localizacaoP.textContent = `${tvInfo.floor} - ${tvInfo.sector}` ;
    localizacaoP.id = "localizacao_status"

    infoTvDiv.appendChild(hostnameP);
    infoTvDiv.appendChild(subtitleP);
    infoTvDiv.appendChild(localizacaoP);

    var containerImgDiv = document.createElement("card-tv-status");
    containerImgDiv.className = "container-img";

    var img = document.createElement("img");
    img.src = "../assets/monitor.png";
    img.alt = "Monitor";

    containerImgDiv.appendChild(img);

    cardDiv.appendChild(infoTvDiv);
    cardDiv.appendChild(containerImgDiv);

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


function createMultipleComponentsStatus(tvInfoArray) {
    var container = document.getElementById("content");

    for (var i = 0; i < tvInfoArray.length; i++) {
        var component = createComponentStatus(tvInfoArray[i]);
        container.appendChild(component);
    }
}

createMultipleComponentsStatus(tvInfoArray);