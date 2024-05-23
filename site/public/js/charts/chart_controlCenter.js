google.charts.load("current", { packages: ["corechart"] });

google.charts.setOnLoadCallback(drawChartStatusTv);

function drawChartStatusTv() {
    var dataStatus = google.visualization.arrayToDataTable([
        ['Status', 'Quantidade'],
        ['NORMAL', 7],
        ['ATENÇÃO', 2],
        ['ALERTA', 2],
    ]);

    var optionsStatus = {
        legend: 'none',
        backgroundColor: 'transparent',
        chartArea: {
            width: "100%",
            height: "80%",
            
        },
        width: 400,
        height: 250,
        pieSliceBorderColor : "transparent",
        colors: ['#0FCF51', '#EBB52A', '#DC2020']
    };

    var chart = new google.visualization.PieChart(document.getElementById('chart_status'));
    chart.draw(dataStatus, optionsStatus);
}