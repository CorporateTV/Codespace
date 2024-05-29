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

function listarComponentes(idTv) {
    return fetch(`/componente/componentesTv/${idTv}`, {
        method: "GET",
    })
    .then(function (resposta) {
        if (!resposta.ok) {
            throw new Error('Network response was not ok ' + resposta.statusText);
        }
        return resposta.json();
    })
    .then((data) => {
        /* console.log(data.find(componente => componente.tipoComponente === "CPU")); */
        return data;
    })
    .catch(function (erro) {
        console.log(`#ERRO: ${erro}`);
    });
}

function selecionarComponente(idTv, tipoComponente) {
    return fetch(`/componente/componentesTv/${idTv}`, {
        method: "GET",
    })
    .then(function (resposta) {
        if (!resposta.ok) {
            throw new Error('Network response was not ok ' + resposta.statusText);
        }
        return resposta.json();
    })
    .then((data) => {
        // Filtrar os componentes pelo tipo especificado
        const componenteFiltrado = data.find(componente => componente.tipoComponente === tipoComponente);
        return componenteFiltrado ? [componenteFiltrado.tipoComponente, componenteFiltrado.modelo] : null;
    })
    .catch(function (erro) {
        console.log(`#ERRO: ${erro}`);
        return null; // Retorna null em caso de erro
    });
}