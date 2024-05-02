google.charts.load("current", { packages: ["corechart"] });
google.charts.load('current', { 'packages': ['line'] });


/* Carregar gráficos */

google.charts.setOnLoadCallback(drwaChartTempoAtividade);

google.charts.setOnLoadCallback(drawChartHistoricoTv);

google.charts.setOnLoadCallback(drawChartHistoricoTv);

google.charts.setOnLoadCallback(drawCharMonitoramento);

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

function drawCharMonitoramento() {
    var dataMonitoramento = new google.visualization.DataTable();
    dataMonitoramento.addColumn('number', 'Data:Hora');
    dataMonitoramento.addColumn('number', 'Uso (%)');

    dataMonitoramento.addRows([
        [1, 10.8],
        [2, 15.9],
        [3, 25.2],
        [4, 34.7],
        [5, 50.9],
        [6, 67.8],
        [7, 72.6],
        [8, 80.3],
        [9, 83.9],
        [10, 92.8],
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
            }
        }

    };

    var chart = new google.charts.Line(document.getElementById('chart_monitoramento'));

    chart.draw(dataMonitoramento, google.charts.Line.convertOptions(optionsMonitoramento));

}