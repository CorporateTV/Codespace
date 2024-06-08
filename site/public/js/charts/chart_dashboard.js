/* Gráfico usuários */
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

function drawChartUsuarios() {
    var jsonData = $.ajax({
        url: `http://localhost:3333/usuarios/quantidadeUsuariosPorTipo/${sessionStorage.ID_EMPRESA}`,
        dataType: "json",
        async: false
    }).responseText;

    // Parse the JSON data
    var data = JSON.parse(jsonData);

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


function drawChartQuantidadeTv(qtdInativo, qtdAtivo) {
    var dataQtdTelevisoes = google.visualization.arrayToDataTable([
        ['Status', 'Quantidade'],
        ['Inativo', qtdInativo],
        ['Ativo', qtdAtivo],
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

function drawChartAtualizadosPorSetor(ambientesStatus) {

    console.log(ambientesStatus)

    const ambientesData =[['Setor', 'ON', 'OFF']];

    for (const [setor, status] of Object.entries(ambientesStatus)) {
        ambientesData.push([setor, status.atualizado, status.naoAtualizado])
    }

    var dataChart = google.visualization.arrayToDataTable(ambientesData);

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
    chart.draw(dataChart, options);
}

quantidadeUsuariosPorTipo(sessionIdEmpresa)