google.charts.load("current", { packages: ["corechart"] });

function televisoesInativas(idTelevisao, tipoComponente) {
    fetch(`/medidas/atualizacao-componentes/${idTelevisao}/${tipoComponente}`, { cache: 'no-store' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .then((data) => {
            console.log(data.atualizado);
        })
        .catch(error => {
            console.error(`Conexão com TV indisponível: ${error.message}`);
        });
}

function televisoesEmpresaAtualizadas(idEmpresa) {
    fetch(`/medidas/atualizacao-empresa/${idEmpresa}`, { cache: 'no-store' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .then((data) => {
            var qtdInativo = data.quantidadeNaoAtualizadas
            var qtdAtivo = sessionStorage.QUANTIDADE_TV - qtdInativo;

            console.log(data);
            console.log(data.ambienteStatus);

            drawChartAtualizadosPorSetor(data.ambienteStatus)

            document.getElementById("qtdAtivo").innerText = `${qtdAtivo}`;
            document.getElementById("qtdInativo").innerText = `${qtdInativo}`

            drawChartQuantidadeTv(data.quantidadeNaoAtualizadas, qtdAtivo)
        })
        .catch(error => {
            console.error(`Conexão com TV indisponível: ${error.message}`);
        });
}

televisoesEmpresaAtualizadas(sessionIdEmpresa);