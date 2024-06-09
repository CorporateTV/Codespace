var idTv = sessionStorage.ID_TV;
var nomeTv = sessionStorage.NOME_TV;
var hostname = sessionStorage.HOSTNAME_TV;
var statusTv = sessionStorage.STATUS_TV;
var andar = sessionStorage.FLOOR_TV;
var setor = sessionStorage.SECTOR_TV;
var conexao = sessionStorage.CONEXAO_TV;
// Intervalo para alterar monitoramento das tv's
var monitoramentoInterval;

document.getElementById("setor_name").innerHTML = `${setor}`
document.getElementById("andar_name").innerHTML = `${andar}`

document.getElementById("nome_tv").innerHTML = `${nomeTv}`
document.getElementById("nome_tv_modal").innerHTML = `${nomeTv}`
document.getElementById("hostname").innerHTML = `${hostname}`
document.getElementById("conexao").innerHTML = `${conexao}`;
document.getElementById("status").innerHTML = `${statusTv}`
