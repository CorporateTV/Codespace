google.charts.load("current", { packages: ["corechart"] });
google.charts.load('current', {'packages':['line']});

google.charts.setOnLoadCallback(drawChartHistoricoTv);

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

function iniciarGraficos(idTelevisao, idComponente, tipoComponente) {
    switch (tipoComponente) {
        case "CPU":
            drawCharMonitoramento(idTelevisao, idComponente, 'chart_cpu', 'CPU');
            break;
        case "Disco":
            drawCharMonitoramento(idTelevisao, idComponente, 'chart_disco', 'Disco');
            break;
        case "RAM":
            drawCharMonitoramento(idTelevisao, idComponente, 'chart_ram', 'RAM');
            break;
        default:
            console.error('Tipo de componente desconhecido');
    }
}

function drawCharMonitoramento(idTelevisao, idComponente, chartElementId, tipo) {
    fetch(`/medidas/ultimas/${idTelevisao}/${idComponente}`, { cache: 'no-store' }).then(response => {
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
            usoComponentesTempoReal(idTelevisao, idComponente, chart, dataMonitoramento, optionsMonitoramento);
        }
    }).catch(error => {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function usoComponentesTempoReal(idTelevisao, idComponente, chart, dataMonitoramento, optionsMonitoramento) {
    fetch(`/medidas/tempo-real-componentes/${idTelevisao}/${idComponente}`, { cache: 'no-store' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).then(novoRegistro => {
        if (novoRegistro) {
            console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);

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
        setTimeout(() => usoComponentesTempoReal(idTelevisao, idComponente, chart, dataMonitoramento, optionsMonitoramento), 5000);
    }).catch(error => {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        
        // Continua atualizando mesmo com erro
        setTimeout(() => usoComponentesTempoReal(idTelevisao, idComponente, chart, dataMonitoramento, optionsMonitoramento), 5000);
    });
}
