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

function alertaMonitoramento(respostas) {
    var textoErro = '';
    var nomeTv = respostas[0][0].nomeTv; // Assume que todas as respostas têm o mesmo nome de TV

    respostas.forEach(resposta => {
        if (resposta.length > 0) {
            var tipo = resposta[0].tipoComponente;
            var dataUso = resposta[0].usoComponente;

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
                        textoErro += `ESTADO ATENÇÃO - Uso da RAM modreado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                    } 
                    break;
            }
        }
    });

    if (textoErro) {
        console.log(textoErro);
        document.getElementById("lista_logComponente").innerHTML += `<li>${textoErro}</li>`;
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
            usoComponentesTempoReal(idTelevisao, chart, dataMonitoramento, optionsMonitoramento);
        }
    }).catch(error => {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function usoComponentesTempoReal(idTelevisao, chart, dataMonitoramento, optionsMonitoramento) {
    let promises = tiposComponentes.map(tipo =>
        fetch(`/medidas/tempo-real-componentes/${idTelevisao}/${tipo}`, { cache: 'no-store' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Nenhum dado encontrado ou erro na API');
                }
            })
    );

    Promise.all(promises).then(registros => {
        registros.forEach(novoRegistro => {
            if (novoRegistro && novoRegistro.length > 0) {
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
        });

        // Chamar a função de alerta monitoramento com os novos registros
        alertaMonitoramento(registros);

        // Define o tempo que a função de atualizar o gráfico será acionada novamente
        setTimeout(() => usoComponentesTempoReal(idTelevisao, chart, dataMonitoramento, optionsMonitoramento), 5000);
        document.getElementById("conexao").innerHTML = "ON";
    }).catch(error => {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);

        // Continua atualizando mesmo com erro
        setTimeout(() => usoComponentesTempoReal(idTelevisao, chart, dataMonitoramento, optionsMonitoramento), 5000);
        document.getElementById("conexao").innerHTML = "OFF";
    });
}
