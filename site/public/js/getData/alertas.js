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

            console.log(data);
            console.log(data.ambienteStatus);

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

    componentes.forEach(componente => {
        var tipo = componente.tipoComponente;
        var dataUso = componente.uso_percentual;

        switch (tipo) {
            case "CPU":
                if (dataUso > 80.0) {
                    textoErro += `<span class='status-alerta'>ESTADO CRÍTICO</span> - Uso da CPU elevado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                } else if (dataUso > 60.0) {
                    textoErro += `<span class='status-atencao'>ESTADO ATENÇÃO</span> - Uso da CPU moderado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                }
                break;

            case "Disco":
                if (dataUso > 60.0) {
                    textoErro += `<span class='status-alerta'>ESTADO CRÍTICO</span> - Uso do Disco elevado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                } else if (dataUso > 30.0) {
                    textoErro += `<span class='status-atencao'>ESTADO ATENÇÃO</span> - Uso do Disco moderado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                }
                break;

            case "RAM":
                if (dataUso > 90.0) {
                    console.log("que")
                    textoErro += `<span class='status-alerta'>ESTADO CRÍTICO</span> - Uso da RAM elevado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                } else if (dataUso > 75.0) {
                    textoErro += `<span class='status-atencao'>ESTADO ATENÇÃO</span> - Uso da RAM moderado em ${nomeTv} | ${dataUso.toFixed(2)}%<br>`;
                }
                break;
        }
    });

    if (textoErro) {
        contador+= 1;
        if(contador > 10) {
            document.getElementById("lista_logComponente").innerHTML = ``;
            contador = 0;
        }
        document.getElementById("lista_logComponente").innerHTML += `<li>${textoErro}</li>`;
    } else {
        document.getElementById("lista_logComponente").innerHTML += `<li>Sem alertas para ${nomeTv}</li>`;
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