google.charts.load("current", { packages: ["corechart"] });

var contador = 0;
var monitoramentoIntervalProcessos;

function televisoesInativas(idTelevisao, tipoComponente) {
    fetch(`/medidas/atualizacao-componentes/${idTelevisao}/${tipoComponente}`, { cache: 'no-store' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .then((data) => {
            console.log(data.atualizado);
        })
        .catch(error => {
            console.error(`Conexão com TV indisponível: ${error.message}`);
        });
}

function televisoesEmpresaAtualizadas(idEmpresa) {
    fetch(`/medidas/atualizacao-empresa/${idEmpresa}`, { cache: 'no-store' }).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .then((data) => {
            var qtdInativo = data.quantidadeNaoAtualizadas
            var qtdAtivo = sessionStorage.QUANTIDADE_TV - qtdInativo;

            console.log(data.televisoes);

            let tvInfoArrayJson = data.televisoes;


            createMultipleComponents(tvInfoArrayJson);
            populateFloorOptions(tvInfoArrayJson);

            var defaultAndar = document.getElementById('andar').value;
            populateSectorOptions(tvInfoArrayJson, defaultAndar);
            filterComponents(tvInfoArrayJson);

            document.getElementById('andar').addEventListener('change', function () {
                var andar = this.value;
                populateSectorOptions(tvInfoArrayJson, andar);
                var setor = document.getElementById('setor').value;
                filterComponents(tvInfoArrayJson, andar, setor);
            });

            document.getElementById('setor').addEventListener('change', function () {
                var andar = document.getElementById('andar').value;
                var setor = this.value;
                filterComponents(tvInfoArrayJson, andar, setor);
            });

            drawChartAtualizadosPorSetor(data.ambienteStatus)

            document.getElementById("qtdAtivo").innerText = `${qtdAtivo}`;
            document.getElementById("qtdInativo").innerText = `${qtdInativo}`

            drawChartQuantidadeTv(data.quantidadeNaoAtualizadas, qtdAtivo)
        })
        .catch(error => {
            console.error(`Conexão com TV indisponível: ${error.message}`);
        });
}

function medidadsPorComponentes(idTelevisao) {
    // Função que busca as medidas dos componentes
    function fetchMedidas() {
        fetch(`/medidas/tempo-real-tv/${idTelevisao}`, { cache: 'no-store' })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("Erro na função Componentes medida");
                }
            })
            .then((respostaTv) => {
                if (respostaTv) {
                    alertaMonitoramento(idTelevisao, respostaTv.componentes);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Limpar o intervalo anterior se houver
    if (monitoramentoInterval) {
        clearInterval(monitoramentoInterval);
    }

    // Executar a função imediatamente e definir o intervalo de 5 segundos
    fetchMedidas();
    monitoramentoInterval = setInterval(fetchMedidas, 5000);
}

function processosTv(idTelevisao) {
    // Função que busca as medidas dos componentes
    function fetchMedidas() {
        fetch(`/medidas/processos/${idTelevisao}`, { cache: 'no-store' })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("Erro na função Componentes medida");
                }
            })
            .then((respostaProcessos) => {
                if (respostaProcessos) {
                    console.log(respostaProcessos);
                    listaProcessos(respostaProcessos);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Limpar o intervalo anterior se houver
    if (monitoramentoIntervalProcessos) {
        clearInterval(monitoramentoIntervalProcessos);
    }

    // Executar a função imediatamente e definir o intervalo de 5 segundos
    fetchMedidas();
    monitoramentoIntervalProcessos = setInterval(fetchMedidas, 5000);
}

function alertaMonitoramento(idTelevisao, componentes) {
    var textoErro = '';
    var nomeTv = sessionStorage.NOME_TV; // Assume que o nome da TV é armazenado no sessionStorage

    let statusCritico = false;
    let statusAtencao = false;
    let statusTv = "NORMAL";
    const limiteTempo = 30000;
    let estaAtualizado = true; // Assuming true initially

    componentes.forEach(componente => {
        var tipo = componente.tipoComponente;
        var dataUso = componente.uso_percentual;

        // Adiciona a data atual ao horário para criar um objeto Date válido
        var agora = new Date();
        var [hours, minutes, seconds] = componente.horario.split(':');
        var ultimaAtualizacao = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), hours, minutes, seconds).getTime();

        var agoraTimestamp = agora.getTime();
        var diferencaTempo = agoraTimestamp - ultimaAtualizacao;
        var componenteAtualizado = diferencaTempo <= limiteTempo;

        // Update overall update status
        estaAtualizado = estaAtualizado && componenteAtualizado;

        console.log(ultimaAtualizacao);

        if (componenteAtualizado) {
            switch (tipo) {
                case "CPU":
                    if (dataUso > 80.0) {
                        textoErro += `<span class='status-alerta'>ESTADO CRÍTICO</span> - Uso da CPU elevado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                        statusCritico = true;
                    } else if (dataUso > 60.0) {
                        textoErro += `<span class='status-atencao'>ESTADO ATENÇÃO</span> - Uso da CPU moderado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                        statusAtencao = true;
                    }
                    break;

                case "Disco":
                    if (dataUso > 60.0) {
                        textoErro += `<span class='status-alerta'>ESTADO CRÍTICO</span> - Uso do Disco elevado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                        statusCritico = true;
                    } else if (dataUso > 30.0) {
                        textoErro += `<span class='status-atencao'>ESTADO ATENÇÃO</span> - Uso do Disco moderado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                        statusAtencao = true;
                    }
                    break;

                case "RAM":
                    if (dataUso > 90.0) {
                        textoErro += `<span class='status-alerta'>ESTADO CRÍTICO</span> - Uso da RAM elevado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                        statusCritico = true;
                    } else if (dataUso > 75.0) {
                        textoErro += `<span class='status-atencao'>ESTADO ATENÇÃO</span> - Uso da RAM moderado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                        statusAtencao = true;
                    }
                    break;
            }
        }
    });

    if (statusCritico) {
        statusTv = "CRÍTICO";
    } else if (statusAtencao) {
        statusTv = "ATENÇÃO";
    }

    document.getElementById("status").innerHTML = statusTv;
    document.getElementById("conexao").innerHTML = estaAtualizado ? "ON" : "OFF";

    if (textoErro) {
        contador += 1;
        if (contador > 10) {
            document.getElementById("lista_logComponente").innerHTML = ``;
            contador = 0;
        }
        document.getElementById("lista_logComponente").innerHTML += `<li>${textoErro}</li>`;
    } else {
        document.getElementById("lista_logComponente").innerHTML = `<li>Sem alertas para ${nomeTv}</li>`;
    }
}

function listaProcessos(processos) {
    const listaProcessos = document.getElementById("lista_processos");
    listaProcessos.innerHTML = ''; // Limpar a lista anterior

    processos.sort((a, b) => b.valor - a.valor);

    processos.forEach((processo, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${index + 1}º - ${processo.nomeProcesso} - PID: ${processo.pid} - ${processo.tipoComponente} - ${processo.valor.toFixed(2)}%`;
        listaProcessos.appendChild(listItem);
    });
}