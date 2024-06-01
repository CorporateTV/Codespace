var idTv = sessionStorage.ID_TV; 
var nomeTv = sessionStorage.NOME_TV; 
var hostname = sessionStorage.HOSTNAME_TV;
var statusTv = sessionStorage.STATUS_TV; 
var condicao = sessionStorage.CONDITION_TV; 
var andar = sessionStorage.FLOOR_TV;
var setor = sessionStorage.SECTOR_TV;


document.getElementById("setor_name").innerHTML = `${setor ?? "Marketing"}`  
document.getElementById("andar_name").innerHTML = `${andar ?? "1"}`

document.getElementById("nome_tv").innerHTML = `${nomeTv ?? "TV-01"}`
document.getElementById("nome_tv_modal").innerHTML = `${nomeTv ?? "TV-01"}`
document.getElementById("hostname").innerHTML = `${hostname ?? "HOSTNAME1"}`
document.getElementById("conexao").innerHTML = `${condicao ?? "ON"}`
document.getElementById("status").innerHTML = `${statusTv ?? "Normal"}`