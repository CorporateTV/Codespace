document.getElementById("nome_tvChart").innerText = sessionStorage.NOME_TV;

function trocarTipoComponente() {
    const tituloComponente = document.getElementById("nome_componente");
    const modelosComponentes = document.getElementById("modelos_componentes");
    const graficoCpu = document.getElementById("chart_cpu");
    const graficoRam = document.getElementById("chart_ram");
    const graficoDisco = document.getElementById("chart_disco");

    var sessionIdTv = sessionStorage.ID_TV;
    let tipoGrafico = lista_componente.value;

    selecionarComponente(sessionIdTv, tipoGrafico).then((tipoComponente) => {
        switch (tipoComponente[0]) {
            case "CPU":
                tituloComponente.innerHTML = `CPU`;
                modelosComponentes.innerHTML = tipoComponente[1]
                graficoCpu.style.display = "block";
                graficoRam.style.display = "none";
                graficoDisco.style.display = "none";
                google.charts.setOnLoadCallback(drawCharMonitoramentoCpu);
                drawCharMonitoramentoCpu();
                break;
            case "RAM":
                tituloComponente.innerHTML = `RAM`;
                modelosComponentes.innerHTML = tipoComponente[1]
                graficoCpu.style.display = "none";
                graficoRam.style.display = "block";
                graficoDisco.style.display = "none";
                google.charts.setOnLoadCallback(drawCharMonitoramentoRam);
                drawCharMonitoramentoRam();
                break;
            case "Disco":
                tituloComponente.innerHTML = `Disco`;
                modelosComponentes.innerHTML = tipoComponente[1]
                graficoCpu.style.display = "none";
                graficoRam.style.display = "none";
                graficoDisco.style.display = "block";
                google.charts.setOnLoadCallback(drawCharMonitoramentoDisco);
                drawCharMonitoramentoDisco();
                break;
            default:
                tituloComponente.innerHTML = `Sem componente`;
                modelosComponentes.innerHTML = `Sem componente`
                graficoCpu.style.display = "block";
                graficoRam.style.display = "none";
                graficoDisco.style.display = "none";
        }
    }).catch((erro) => {
        tituloComponente.innerHTML = `Sem componente`;
        modelosComponentes.innerHTML = `Sem componente`
        console.error(`Erro ao listar componentes: ${erro}`);
    });


    /* const lista_modelos = ['Intel(R) Core(TM) i3-6100 3.70Ghz', 'Memória RAM 8,0 GiB', 'KINGSTON SA400S37240G']  */


}