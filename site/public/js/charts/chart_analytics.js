google.charts.load("current", { packages: ["corechart"] });
google.charts.load('current', { 'packages': ['line'] });

google.charts.setOnLoadCallback(drawChartHistoricoTv);

const tiposComponentes = ["CPU", "Disco", "RAM"];

function drawChartHistoricoTv() {
    var dataHistorico = google.visualization.arrayToDataTable([
        ['Status', 'Quantidade'],
        ['Inativo', 16 - 8],
        ['Ativo', 16],
    ]);

    var optionsHistoricoTv = {
        pieHole: 0.55,
        backgroundColor: 'transparent',
        pieSliceBorderColor: "transparent",
        legend: 'none',
        chartArea: {
            bottom: 40,
            left: "20%",
            width: "60%",
            height: "60%",
            backgroundColor: 'transparent'
        },
        width: 300,
        height: 300,
        colors: ['#D8474D', '#29AB48'],
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_historico'));
    chart.draw(dataHistorico, optionsHistoricoTv);
}

function iniciarGraficos(idTelevisao, tipoComponente) {
    switch (tipoComponente) {
        case "CPU":
            drawCharMonitoramento(idTelevisao, 'chart_cpu', 'CPU');
            break;
        case "Disco":
            drawCharMonitoramento(idTelevisao, 'chart_disco', 'Disco');
            break;
        case "RAM":
            drawCharMonitoramento(idTelevisao, 'chart_ram', 'RAM');
            break;
        default:
            console.error('Tipo de componente desconhecido');
    }
}

function alertaMonitoramento(idTelevisao, componentes) {
    var textoErro = '';
    var nomeTv = sessionStorage.NOME_TV; // Assume que o nome da TV é armazenado no sessionStorage

    componentes.forEach(componente => {
        var tipo = componente.tipoComponente;
        var dataUso = componente.uso_percentual;

        switch (tipo) {
            case "CPU":
                if (dataUso > 80.0) {
                    textoErro += `ESTADO CRÍTICO - Uso da CPU elevado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                } else if (dataUso > 60.0) {
                    textoErro += `ESTADO ATENÇÃO - Uso da CPU moderado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                }
                break;

            case "Disco":
                if (dataUso > 60.0) {
                    textoErro += `ESTADO CRÍTICO - Uso do Disco elevado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                } else if (dataUso > 30.0) {
                    textoErro += `ESTADO ATENÇÃO - Uso do Disco moderado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                }
                break;

            case "RAM":
                if (dataUso > 90.0) {
                    textoErro += `ESTADO CRÍTICO - Uso da RAM elevado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                } else if (dataUso > 75.0) {
                    textoErro += `ESTADO ATENÇÃO - Uso da RAM moderado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                }
                break;
        }
    });

    if (textoErro) {
        console.log(textoErro);
        document.getElementById("lista_logComponente").innerHTML += `<li>${textoErro}</li>`;
    } else {
        document.getElementById("lista_logComponente").innerHTML += `<li>Sem alertas para ${nomeTv}</li>`;
    }
}

function drawCharMonitoramento(idTelevisao, chartElementId, tipo) {
    fetch(`/medidas/ultimas/${idTelevisao}/${tipo}`, { cache: 'no-store' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).then(data => {
        if (data) {
            console.log(`Dados recebidos para ${tipo}: ${JSON.stringify(data)}`);

            var dataMonitoramento = new google.visualization.DataTable();
            dataMonitoramento.addColumn('string', 'Data');
            dataMonitoramento.addColumn('number', 'Uso (%)');

            var rows = data.map(item => [item.dataRegistro, item.usoComponente]);
            dataMonitoramento.addRows(rows);

            var optionsMonitoramento = {
                legend: { position: 'none' },
                backgroundColor: 'transparent',
                chartArea: {
                    left: 0,
                    top: 0,
                    width: "90%",
                    height: "100%",
                    backgroundColor: 'transparent'
                },
                colors: ['white'],
                axes: { x: { 0: { side: 'bottom' } } },
                hAxis: {
                    textStyle: { color: 'white' },
                    gridlines: { color: 'white' }
                },
                vAxis: {
                    textStyle: { color: 'white' },
                    format: '#\'%\'',
                    viewWindow: { min: 0, max: 100 }
                }
            };

            var chart = new google.charts.Line(document.getElementById(chartElementId));
            chart.draw(dataMonitoramento, google.charts.Line.convertOptions(optionsMonitoramento));

            // Comça a atualizar após plotar os 7 primeiros registros
            usoComponentesTempoReal(idTelevisao, tipo, chart, dataMonitoramento, optionsMonitoramento);
        }
    }).catch(error => {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function usoComponentesTempoReal(idTelevisao, tipo, chart, dataMonitoramento, optionsMonitoramento) {
    fetch(`/medidas/tempo-real-componentes/${idTelevisao}/${tipo}`, { cache: 'no-store' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).then(novoRegistro => {
        if (novoRegistro) {

            if (novoRegistro.length > 0) {
                var ultimoRegistro = novoRegistro[0];
                var novaLinha = [ultimoRegistro.dataRegistro, ultimoRegistro.usoComponente];

                // Limita o gráfico para 7 registros, removendo a primeira linha 
                if (dataMonitoramento.getNumberOfRows() >= 7) {
                    dataMonitoramento.removeRow(0);
                }

                // Adicionar linha
                dataMonitoramento.addRow(novaLinha);

                // Redesenhar gráfico 
                chart.draw(dataMonitoramento, google.charts.Line.convertOptions(optionsMonitoramento));
            }
        }

        // Define o tempo que a função de atualizar o gráfico será acionada novamente
        setTimeout(() => usoComponentesTempoReal(idTelevisao, tipo, chart, dataMonitoramento, optionsMonitoramento), 5000);
    }).catch(error => {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);

        // Continua atualizando mesmo com erro
        setTimeout(() => usoComponentesTempoReal(idTelevisao, tipo, chart, dataMonitoramento, optionsMonitoramento), 5000);
    });
}

function medidadsPorComponentes(idTelevisao) {
    // Função que busca as medidas dos componentes
    function fetchMedidas() {
        fetch(`/medidas/tempo-real-tv/${idTelevisao}`, { cache: 'no-store' })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("Erro na função Componentes medida");
                }
            })
            .then((respostaTv) => {
                if (respostaTv) {
                    alertaMonitoramento(idTelevisao, respostaTv.componentes);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Limpar o intervalo anterior se houver
    if (monitoramentoInterval) {
        clearInterval(monitoramentoInterval);
    }

    // Executar a função imediatamente e definir o intervalo de 5 segundos
    fetchMedidas();
    monitoramentoInterval = setInterval(fetchMedidas, 5000);
}