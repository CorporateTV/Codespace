var sessionIdEmpresa = sessionStorage.ID_EMPRESA;

function quantidadeTv(idEmpresa) {
    fetch(`/tv/quantidadeTv/${idEmpresa}`, {
        method: "GET",
    })
    
    .then(function (resposta) {
        console.log(resposta.json); 
    })
} 

function listarAmbientes(idEmpresa) {
    fetch(`/ambiente/listar/${idEmpresa}`, {
        method: "GET",
    })

    .then(function (resposta) {
        resposta.json().then((ambientes) => {
            ambientes.forEach((ambiente) => {
                console.log(`${ambiente.setor} + ${ambiente.andar}`)
            });
        });
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

var tvInfoArray = [
    { tvName: "TV-01", hostname: "HOSTNAME1", status: "ON", condition: "Normal", floor: "1", sector: "Marketing" },
    { tvName: "TV-02", hostname: "HOSTNAME2", status: "ON", condition: "Normal", floor: "1", sector: "Marketing" },
    { tvName: "TV-03", hostname: "HOSTNAME3", status: "OFF", condition: "Error", floor: "2", sector: "RH" },
    { tvName: "TV-04", hostname: "HOSTNAME4", status: "ON", condition: "Normal", floor: "4", sector: "Vendas" },
    { tvName: "TV-05", hostname: "HOSTNAME5", status: "OFF", condition: "Error", floor: "1", sector: "Hall" },
    { tvName: "TV-06", hostname: "HOSTNAME6", status: "ON", condition: "Normal", floor: "1", sector: "Marketing" },
    { tvName: "TV-07", hostname: "HOSTNAME7", status: "OF", condition: "Normal", floor: "1", sector: "Marketing" },
    { tvName: "TV-08", hostname: "HOSTNAME8", status: "ON", condition: "Normal", floor: "1", sector: "Marketing" },
    { tvName: "TV-09", hostname: "HOSTNAME9", status: "ON", condition: "Normal", floor: "1", sector: "Hall" },
    { tvName: "TV-10", hostname: "HOSTNAME10", status: "ON", condition: "Normal", floor: "4", sector: "Vendas" },
    { tvName: "TV-11", hostname: "HOSTNAME11", status: "ON", condition: "Normal", floor: "4", sector: "Vendas" },
];

console.log();
quantidadeTv(sessionIdEmpresa)
listarAmbientes(sessionIdEmpresa);