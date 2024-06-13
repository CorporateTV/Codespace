google.charts.load("current", { packages: ["corechart"] });
google.charts.load('current', { 'packages': ['line'] });

const tiposComponentes = ["CPU", "Disco", "RAM"];

function iniciarGraficos(idTelevisao, tipoComponente) {
    fetch(`/tv/dados-tv/${idTelevisao}`).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .then((dadosTv) => {
            
            const taxaAtualizacao = dadosTv[0].taxaAtualizacao;

            switch (tipoComponente) {
                case "CPU":
                    drawCharMonitoramento(idTelevisao, 'chart_cpu', 'CPU', taxaAtualizacao);
                    break;
                case "Disco":
                    drawCharMonitoramento(idTelevisao, 'chart_disco', 'Disco', taxaAtualizacao);
                    break;
                case "RAM":
                    drawCharMonitoramento(idTelevisao, 'chart_ram', 'RAM', taxaAtualizacao);
                    break;
                default:
                    console.error('Tipo de componente desconhecido');
            }
            processosTv(idTelevisao);
        })
        .catch(error => {
            console.error(`Conexão com TV indisponível: ${error.message}`);
        });
}

iniciarGraficos(sessionStorage.ID_TV, 'CPU')

function drawChartStatusAnalytcs(contadorStatus) {
    var qtdNormal = contadorStatus.NORMAL;
    var qtdAtencao = contadorStatus.ATENÇÃO;
    var qtdCritico = contadorStatus.CRÍTICO + contadorStatus.Indisponível

    var dataStatus = google.visualization.arrayToDataTable([
        ['Status', 'Quantidade'],
        ['NORMAL', qtdNormal],
        ['ATENÇÃO',qtdAtencao],
        ['ALERTA', qtdCritico]
    ]);

    var optionsStatus = {
        backgroundColor: 'transparent',
        legend: {
            textStyle: {color: 'white'},
        },
        chartArea: {
            width: "100%",
            height: "80%",
        },
        width: 150,
        height: 125,
        pieSliceBorderColor : "transparent",
        colors: ['#0FCF51', '#EBB52A', '#DC2020']
    };

    document.getElementById("titulo-status-analytcs").innerHTML = `TV's ${sessaoNomeFantasia}`

    var chart = new google.visualization.PieChart(document.getElementById('chart_historico'));
    chart.draw(dataStatus, optionsStatus);
}

function drawCharMonitoramento(idTelevisao, chartElementId, tipo, taxaAtualizacao) {
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

            console.log(taxaAtualizacao)

            // Comça a atualizar após plotar os 7 primeiros registros
            usoComponentesTempoReal(idTelevisao, tipo, chart, dataMonitoramento, optionsMonitoramento, taxaAtualizacao);
        }
    }).catch(error => {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function usoComponentesTempoReal(idTelevisao, tipo, chart, dataMonitoramento, optionsMonitoramento, taxaAtualizacao) {
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

        console.log(taxaAtualizacao)

        // Define o tempo que a função de atualizar o gráfico será acionada novamente
        setTimeout(() => usoComponentesTempoReal(idTelevisao, tipo, chart, dataMonitoramento, optionsMonitoramento, taxaAtualizacao), taxaAtualizacao + 5000);
    }).catch(error => {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        // Continua atualizando mesmo com erro
        setTimeout(() => usoComponentesTempoReal(idTelevisao, tipo, chart, dataMonitoramento, optionsMonitoramento, taxaAtualizacao), taxaAtualizacao + 5000);
    });
}

function listarJanelas(idTelevisao) {
    fetch(`/janela/listaJanelas/${idTelevisao}`, { cache: 'no-store' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .then((data) => {
            const listaJanelas = document.getElementById("lista_janelas");
            listaJanelas.innerHTML = ''; // Limpar a lista anterior


            data.forEach((janela, index) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `${index + 1} - Pid: ${janela.pidJanela} | ${janela.titulo}`
                listaJanelas.appendChild(listItem);
            })
        })
        .catch(error => {
            console.error(`Conexão com TV indisponível: ${error.message}`);
        });
}

listarJanelas(idTv);