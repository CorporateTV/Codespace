google.charts.load("current", { packages: ["corechart"] });

function drawChartStatusTv(contadorStatus) {

    var qtdNormal = contadorStatus.NORMAL;
    var qtdAtencao = contadorStatus.ATENÇÃO;
    var qtdCritico = contadorStatus.CRÍTICO + contadorStatus.Indisponível
    var totalRegistros = qtdNormal + qtdAtencao + qtdCritico;
    
    var porcentagemNormal = (qtdNormal / totalRegistros) * 100;  
    var porcentagemAtencao = (qtdAtencao / totalRegistros) * 100;  
    var porcentagemCritico = (qtdCritico / totalRegistros) * 100;  

    var dataStatus = google.visualization.arrayToDataTable([
        ['Status', 'Quantidade'],
        ['NORMAL', qtdNormal],
        ['ATENÇÃO', qtdAtencao],
        ['ALERTA', qtdCritico]
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

    document.getElementById("percent-normal").innerHTML = `${porcentagemNormal}%`
    document.getElementById("percent-atencao").innerHTML = `${porcentagemAtencao}%`
    document.getElementById("percent-alerta").innerHTML = `${porcentagemCritico}%`

    document.getElementById("titulo-status").innerHTML = `Status televisões ${sessaoNomeFantasia}`

    var chart = new google.visualization.PieChart(document.getElementById('chart_status'));
    chart.draw(dataStatus, optionsStatus);
}