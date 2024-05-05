// Referência ao seletor
var selectElement = document.getElementById("lista_televisoes");


tvInfoArray.forEach(tv => {
    // Criar uma nova opção para cada TV
    var option = document.createElement("option");
    option.text = tv.tvName;
    option.value = tv.tvName;
    selectElement.add(option);
});

// Função para armazenar os valores das propriedades da TV
function armazenarPropriedades(tvName) {
    // Encontrar a TV correspondente no array de informações da TV
    var tv = tvInfoArray.find(tv => tv.tvName === tvName);

    // Verificar se a TV foi encontrada
    if (tv) {
        // Armazenar as propriedades da TV em variáveis
        var hostname = tv.hostname;
        var status = tv.status;
        var condition = tv.condition;
        var floor = tv.floor;
        var sector = tv.sector; 

        sessionStorage.NOME_TV = tv.tvName;
        sessionStorage.HOSTNAME_TV = tv.hostname;
        sessionStorage.STATUS_TV = tv.status;
        sessionStorage.CONDITION_TV = tv.condition;
        sessionStorage.FLOOR_TV = tv.floor;
        sessionStorage.SECTOR_TV = tv.sector;


        // Você pode fazer o que quiser com essas variáveis, por exemplo, exibí-las na interface do usuário
        document.getElementById("nome_tv").innerHTML = tvName;
        document.getElementById("hostname").innerHTML = hostname;
        document.getElementById("status").innerHTML = status;
        document.getElementById("conexao").innerHTML = condition;
        document.getElementById("andar_name").innerHTML = floor;
        document.getElementById("setor_name").innerHTML = sector;
    }
}

// Adicionar um evento de escuta para o evento change no seletor
selectElement.addEventListener("change", function() {
    // Obter o valor da opção selecionada
    var selectedOption = selectElement.value;

    // Chamar a função para armazenar as propriedades da TV com base na opção selecionada
    armazenarPropriedades(selectedOption);
});