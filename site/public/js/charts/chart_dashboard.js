/* Gráfico usuários */
google.charts.load("current", { packages: ["corechart"] });


google.charts.setOnLoadCallback(drawChartQuantidadeTv);

google.charts.setOnLoadCallback(drawChart);

google.charts.setOnLoadCallback(drawChartUsuarios);

function quantidadeUsuariosPorTipo(idEmpresa) {
    fetch(`/usuarios/quantidadeUsuariosPorTipo/${idEmpresa}`, {
        method: "GET",
    })
    .then(function (resposta) {
        if (!resposta.ok) {
            throw new Error('Network response was not ok ' + resposta.statusText);
        }
        return resposta.json(); 
    })
    .then((data) => {
        console.log(data);
        const qtdAssistenteNoc = data.assitenteNoc;
        const qtdGerenteNoc = data.gestorNoc;
        document.getElementById("text_qtdAssistente").innerText = qtdAssistenteNoc;
        document.getElementById("text_qtdGerente").innerText = qtdGerenteNoc;


        
    })
    .catch(function (error) {
        console.error('Error:', error);
    });
}

/* function drawChartUsuarios() {

    fetch(`/usuarios/quantidadeUsuariosPorTipo/${sessionStorage.ID_EMPRESA}`, {
        method: "GET",
    })

    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })

    .then(data => {
        console.log(data)

        var dataUsuarios = google.visualization.arrayToDataTable([
            ['Cargo', 'Quantidade'],
            ['Gerente', data.gestorNoc],
            ['Assistentes NOC', data.assitenteNoc],
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
    })

    .catch(error => {
        console.error("Error:", error);
    });
} */

function drawChartUsuarios() {
    var jsonData = $.ajax({
        url: `http://localhost:3333/usuarios/quantidadeUsuariosPorTipo/${sessionStorage.ID_EMPRESA}`,
        dataType: "json",
        async: false
    }).responseText;

    // Parse the JSON data
    var data = JSON.parse(jsonData);
    console.log(data);

    // Create a DataTable and add columns
    var dataUsuarios = new google.visualization.DataTable();
    dataUsuarios.addColumn('string', 'Cargo');
    dataUsuarios.addColumn('number', 'Quantidade');

    // Add rows using the parsed data
    dataUsuarios.addRows([
        ['Gerente', Number(data.gestorNoc)],
        ['Assistentes NOC', Number(data.assitenteNoc)]
    ]);

    // Set chart options
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
        pieSliceBorderColor: "transparent",
        colors: ['#4F699C', '#8095bf']
    };

    // Draw the chart
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

quantidadeUsuariosPorTipo(sessionIdEmpresa)