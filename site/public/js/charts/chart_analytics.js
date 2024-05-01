google.charts.load("current", { packages: ["corechart"] });
google.charts.load('current', {'packages':['line']});


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
        colors: ['#0F172A', '#8095bf'],
        bar: { groupWidth: '100%' },
        legendTextStyle: {
            color: 'white'
        },
        vAxis: {
            titleTextStyle: {
                color: 'white'
            },
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
        ['Inativo', 5],
        ['Ativo', 15],
    ]);

    var optionsHistoricoTv = {
        pieHole: 0.6,
        backgroundColor: 'transparent',
        pieSliceBorderColor: "transparent",
        legend: 'none',
        width: 225,
        height: 250,
        colors: ['#D8474D', '#29AB48'],
        title: "Histórico ideal",
        titleTextStyle: {
            color: 'white',
            fontSize: 18,
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_historico'));
    chart.draw(dataHistorico, optionsHistoricoTv);
}

function drawCharMonitoramento() {
    var dataMonitoramento = new google.visualization.DataTable();
    dataMonitoramento.addColumn('number', 'Data:Hora');
    dataMonitoramento.addColumn('number', 'Uso (%)');

    dataMonitoramento.addRows([
        [1, 37.8],
        [2, 30.9],
        [3, 25.2],
        [4, 11.7],
        [5, 11.9],
        [6, 8.8],
        [7, 7.6],
        [8, 12.3],
        [9, 16.9],
        [10, 12.8],
    ]);

    var optionsMonitoramento = {
        backgroundColor: 'transparent',
        chartArea:{
            left:0,
            top:0,
            width:"100%",
            height:"100%",
            backgroundColor: 'transparent'
        },
        colors: 'white',
        height: '50%',
        width: '100%',
        axes: {
            x: {
              0: {side: 'bottom'}
            }
        },
        hAxis: {
            textStyle: {
                color: 'white'
            },
            gridlines: {
                color: 'white',
            }
        }
  
    };

    var chart = new google.charts.Line(document.getElementById('chart_monitoramento'));

    chart.draw(dataMonitoramento, google.charts.Line.convertOptions(optionsMonitoramento));

}