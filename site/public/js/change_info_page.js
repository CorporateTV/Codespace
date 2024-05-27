// Referência ao seletor
var selectElement = document.getElementById("lista_televisoes");


listarDadosTvEmpresa(sessionIdEmpresa).then(tvInfoArrayJson => {
    if (tvInfoArrayJson) {

        tvInfoArrayJson.forEach(tv => {
            // Criar uma nova opção para cada TV
            var option = document.createElement("option");
            option.text = tv.nome;
            option.value = tv.idTelevisao;
            selectElement.add(option);            
        });

        // Adicionar um evento de escuta para o evento change no seletor
        selectElement.addEventListener("change", function () {
            // Obter o valor da opção selecionada
            var selectedOption = selectElement.value;
            
            // Chamar a função para armazenar as propriedades da TV com base na opção selecionada
            armazenarPropriedades(tvInfoArrayJson, selectedOption);
            document.getElementById("nome_tvChart").innerText = sessionStorage.NOME_TV;
            trocarTipoComponente();
        });

    } else {
        console.error("No TV data found for the company.");
    }
});




// Função para armazenar os valores das propriedades da TV
function armazenarPropriedades(tvInfoArray, idTelevisao) {

    // Encontrar a TV correspondente no array de informações da TV
    var tv = tvInfoArray.find(tv => tv.idTelevisao === Number(idTelevisao));

    // Verificar se a TV foi encontrada
    if (tv) {
        // Armazenar as propriedades da TV em variáveis
        var tvName = tv.nome;
        var hostname = tv.hostName;
        var status = "ON";
        var condition = "NORMAL";
        var andar = tv.andar;
        var setor = tv.setor;

        sessionStorage.ID_TV = tv.idTelevisao;
        sessionStorage.NOME_TV = tv.nome;
        sessionStorage.HOSTNAME_TV = tv.hostName;
        sessionStorage.STATUS_TV = "ON";
        sessionStorage.CONDITION_TV = "NORMAL";
        sessionStorage.FLOOR_TV = tv.andar;
        sessionStorage.SECTOR_TV = tv.setor;
        sessionStorage.COMPONENTES_TV = JSON.stringify(tv.componentes);


        // Você pode fazer o que quiser com essas variáveis, por exemplo, exibí-las na interface do usuário
        document.getElementById("nome_tv").innerHTML = tvName;
        document.getElementById("hostname").innerHTML = hostname;
        document.getElementById("status").innerHTML = status;
        document.getElementById("conexao").innerHTML = condition;
        document.getElementById("andar_name").innerHTML = andar;
        document.getElementById("setor_name").innerHTML = setor;
    }
}

