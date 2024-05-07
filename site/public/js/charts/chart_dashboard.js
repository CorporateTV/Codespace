/* Gráfico usuários */

google.charts.load("current", { packages: ["corechart"] });

google.charts.setOnLoadCallback(drawChartUsuarios);

google.charts.setOnLoadCallback(drawChartQuantidadeTv);

google.charts.setOnLoadCallback(drawChart);

function drawChartUsuarios() {
    var dataUsuarios = google.visualization.arrayToDataTable([
        ['Cargo', 'Quantidade'],
        ['Gerente', 2],
        ['Assistentes NOC', 8],
    ]);

    var optionsUsuarios = {
        pieHole: 0.4,
        legend: 'none',
        backgroundColor: 'transparent',
        chartArea: {
            width: "100%",
            height: "80%",
            
        },
        width: 200,
        height: 150,
        pieSliceBorderColor : "transparent",
        colors: ['#4F699C', '#8095bf']
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_usuarios'));
    chart.draw(dataUsuarios, optionsUsuarios);
}

/* Gráfico Quantidade TV */


function drawChartQuantidadeTv() {
    var dataQtdTelevisoes = google.visualization.arrayToDataTable([
        ['Status', 'Quantidade'],
        ['Inativo', 5],
        ['Ativo', 15],
    ]);

    var optionsQtdTelevisoes = {
        pieHole: 0.4,
        legend: 'none',
        backgroundColor: 'transparent',
        chartArea: {
            width: "100%",
            height: "80%",
            
        },
        width: 200,
        height: 150,
        pieSliceBorderColor : "transparent",
        colors: ['#D8474D', '#29AB48']
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_qtdTv'));
    chart.draw(dataQtdTelevisoes, optionsQtdTelevisoes);
}


/* Gráfico Dashboard setores */

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Setor' ,'ON', 'OFF'],
        ['Marketing', 8, 2],
        ['RH', 4, 1],
        ['Vendas', 5, 3],
        ['Hall', 6, 1]
    ]);

    var options = {
        width: 600,
        height: 400,
        backgroundColor: 'transparent',
        bar: { groupWidth: '75%' },
        isStacked: true,
        vAxis: {
            title: 'Quantidade de Televisões ',
            titleTextStyle: {
                color: 'white'
            },
            textStyle: {
                color: 'white'
            }
        },
        hAxis: {
            textStyle: {
                color: 'white'
            }
        },
        legendTextStyle: {
            color: 'white'
        }
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("chart_porSetor"));
    chart.draw(data, options);
}