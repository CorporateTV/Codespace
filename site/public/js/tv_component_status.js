function listarDadosTvEmpresaComponentes(idEmpresa) {
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

function createComponentStatus(tvInfo) {

    var cardDiv = document.createElement("div");

    if(tvInfo.status == 'CRÍTICO' || tvInfo.status == 'Indisponível') {
        cardDiv.className = "card-tv-status bg-status-alerta";
    } else if (tvInfo.status == 'ATENÇÃO') {
        cardDiv.className = "card-tv-status bg-status-atencao";
    } else {
        cardDiv.className = "card-tv-status bg-status-ok";
    }
    
    var infoTvDiv = document.createElement("div");
    infoTvDiv.className = "card-status-text";

    var hostnameP = document.createElement("p");
    hostnameP.textContent = tvInfo.hostname;
    hostnameP.id = "hostname_status"

    var subtitleP = document.createElement("p");
    subtitleP.textContent = 'Localização:';

    var localizacaoP = document.createElement("p");
    localizacaoP.textContent = `${tvInfo.andar} - ${tvInfo.setor}` ;
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
        sessionStorage.ID_TV = tvInfo.idTelevisao;
        sessionStorage.NOME_TV = tvInfo.nomeTelevisao;
        sessionStorage.HOSTNAME_TV = tvInfo.hostname;
        sessionStorage.STATUS_TV = tvInfo.status;
        sessionStorage.CONEXAO_TV = tvInfo.conexao;
        sessionStorage.FLOOR_TV = tvInfo.andar;
        sessionStorage.SECTOR_TV = tvInfo.setor;
        sessionStorage.COMPONENTES_TV = JSON.stringify(tvInfo.componentes);
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
