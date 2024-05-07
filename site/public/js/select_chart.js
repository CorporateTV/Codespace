function trocarTipoComponente() {
    const tituloComponente = document.getElementById("nome_componente");
    const modelosComponentes = document.getElementById("modelos_componentes");
    const graficoCpu = document.getElementById("chart_cpu");
    const graficoRam = document.getElementById("chart_ram");
    const graficoDisco = document.getElementById("chart_disco");

    let tipoGrafico = lista_componente.value;
    const lista_modelos = ['Intel(R) Core(TM) i3-6100 3.70Ghz', 'Memória RAM 8,0 GiB', 'KINGSTON SA400S37240G'] 

    switch (tipoGrafico) {
        default:
            tituloComponente.innerHTML = `CPU`;
            modelosComponentes.innerHTML = `${lista_modelos[0]}`
            graficoCpu.style.display = "block";
            graficoRam.style.display = "none";
            graficoDisco.style.display = "none";
            google.charts.setOnLoadCallback(drawCharMonitoramentoCpu);
            drawCharMonitoramentoCpu();
            break;
        case "ram":
            tituloComponente.innerHTML = `RAM`;
            modelosComponentes.innerHTML = `${lista_modelos[1]}`
            graficoCpu.style.display = "none";
            graficoRam.style.display = "block";
            graficoDisco.style.display = "none";
            google.charts.setOnLoadCallback(drawCharMonitoramentoRam);
            drawCharMonitoramentoRam();
            break;
        case "disco":
            tituloComponente.innerHTML = `Disco`;
            modelosComponentes.innerHTML = `${lista_modelos[2]}`
            graficoCpu.style.display = "none";
            graficoRam.style.display = "none";
            graficoDisco.style.display = "block";
            google.charts.setOnLoadCallback(drawCharMonitoramentoDisco);
            drawCharMonitoramentoDisco();
            break

    }
}