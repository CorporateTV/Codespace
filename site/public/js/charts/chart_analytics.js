google.charts.load("current", { packages: ["corechart"] });
google.charts.load('current', { 'packages': ['line'] });


/* Carregar gráficos */

google.charts.setOnLoadCallback(drwaChartTempoAtividade);

google.charts.setOnLoadCallback(drawChartHistoricoTv);

google.charts.setOnLoadCallback(drawChartHistoricoTv);

function drwaChartTempoAtividade() {
    var dataTempoAtividade = google.visualization.arrayToDataTable([
        ['Tempo', 'Ligado', 'Desligado'],
        ['Tempo', 8, 2],
    ]);

    var options_fullStacked = {
        isStacked: 'percent',
        height: 50,
        backgroundColor: 'transparent',
        legend: 'none',
        colors: ['#8095bf', '#0F172A'],
        bar: { groupWidth: '100%' },
        legendTextStyle: {
            color: 'white'
        },
        vAxis: {
            textStyle: {
                color: 'white'
            }
        }
    };

    var chart = new google.visualization.BarChart(document.getElementById("chart_tempoAtividade"));
    chart.draw(dataTempoAtividade, options_fullStacked);

}

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


/* Gráficos de monitoramento */

google.charts.setOnLoadCallback(drawCharMonitoramentoCpu);
google.charts.setOnLoadCallback(drawCharMonitoramentoRam);
google.charts.setOnLoadCallback(drawCharMonitoramentoDisco);

function drawCharMonitoramentoCpu() {
    var dataMonitoramento = new google.visualization.DataTable();
    dataMonitoramento.addColumn('string', 'Período');
    dataMonitoramento.addColumn('number', 'Uso (%)');

    dataMonitoramento.addRows([
        ['00:00', 10.8],
        ['01:00', 15.9],
        ['02:00', 25.2],
        ['03:00', 34.7],
        ['04:00', 50.9],
        ['05:00', 67.8],
        ['06:00', 72.6],
        ['07:00', 80.3],
        ['08:00', 83.9],
        ['09:00', 92.8],
    ]);

    var optionsMonitoramento = {
        legend: {
            position: 'none'
        },
        backgroundColor: 'transparent',
        chartArea: {
            left: 0,
            top: 0,
            width: "90%",
            height: "100%",
            backgroundColor: 'transparent'
        },
        colors: 'white',
        axes: {
            x: {
                0: { side: 'bottom' }
            }
        },
        hAxis: {
            textStyle: {
                color: 'white'
            },
            gridlines: {
                color: 'white',
            },
        },
        vAxis: {
            textStyle: {
                color: 'white'
            },
            format: '#\'%\'', // Display values as percentages
            viewWindow: {
                min: 0,
                max: 100
            }
        }

    };

    var chart = new google.charts.Line(document.getElementById('chart_cpu'));

    chart.draw(dataMonitoramento, google.charts.Line.convertOptions(optionsMonitoramento));

}


function drawCharMonitoramentoRam() {
    var dataMonitoramento = new google.visualization.DataTable();
    dataMonitoramento.addColumn('string', 'Período');
    dataMonitoramento.addColumn('number', 'Uso (%)');

    dataMonitoramento.addRows([
        ['00:00', 30.8],
        ['01:00', 35.9],
        ['02:00', 45.2],
        ['03:00', 34.7],
        ['04:00', 40.9],
        ['05:00', 57.8],
        ['06:00', 62.6],
        ['07:00', 70.3],
        ['08:00', 73.9],
        ['09:00', 82.8],
    ]);

    var optionsMonitoramento = {
        legend: {
            position: 'none'
        },
        backgroundColor: 'transparent',
        chartArea: {
            left: 0,
            top: 0,
            width: "90%",
            height: "100%",
            backgroundColor: 'transparent'
        },
        colors: 'white',
        axes: {
            x: {
                0: { side: 'bottom' }
            }
        },
        hAxis: {
            textStyle: {
                color: 'white'
            },
            gridlines: {
                color: 'white',
            },
        },
        vAxis: {
            textStyle: {
                color: 'white'
            },
            format: '#\'%\'', // Display values as percentages
            viewWindow: {
                min: 0,
                max: 100
            }
        }

    };

    var chart = new google.charts.Line(document.getElementById('chart_ram'));

    chart.draw(dataMonitoramento, google.charts.Line.convertOptions(optionsMonitoramento));

}


function drawCharMonitoramentoDisco() {
    var dataMonitoramento = new google.visualization.DataTable();
    dataMonitoramento.addColumn('string', 'Período');
    dataMonitoramento.addColumn('number', 'Uso (%)');

    dataMonitoramento.addRows([
        ['00:00', 0.8],
        ['01:00', 5.9],
        ['02:00', 5.2],
        ['03:00', 4.7],
        ['04:00', 0.9],
        ['05:00', 7.8],
        ['06:00', 2.6],
        ['07:00', 8.3],
        ['08:00', 8.9],
        ['09:00', 9.8],
    ]);

    var optionsMonitoramento = {
        legend: {
            position: 'none'
        },
        backgroundColor: 'transparent',
        chartArea: {
            left: 0,
            top: 0,
            width: "90%",
            height: "100%",
            backgroundColor: 'transparent'
        },
        colors: 'white',
        axes: {
            x: {
                0: { side: 'bottom' }
            }
        },
        hAxis: {
            textStyle: {
                color: 'white'
            },
            gridlines: {
                color: 'white',
            }
        },
        vAxis: {
            textStyle: {
                color: 'white'
            },
            format: '#\'%\'', // Display values as percentages
            viewWindow: {
                min: 0,
                max: 100
            }
        }

    };

    var chart = new google.charts.Line(document.getElementById('chart_disco'));

    chart.draw(dataMonitoramento, google.charts.Line.convertOptions(optionsMonitoramento));

}