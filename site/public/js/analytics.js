const nomeTv = sessionStorage.NOME_TV; 
const hostname = sessionStorage.HOSTNAME_TV;
const statusTv = sessionStorage.STATUS_TV; 
const condicao = sessionStorage.CONDITION_TV; 
const andar = sessionStorage.FLOOR_TV;
const setor = sessionStorage.SECTOR_TV;


document.getElementById("setor_name").innerHTML = `${setor ?? "Marketing"}`  
document.getElementById("andar_name").innerHTML = `${andar ?? "1"}`

document.getElementById("nome_tv").innerHTML = `${nomeTv ?? "TV-01"}`
document.getElementById("hostname").innerHTML = `${hostname ?? "HOSTNAME1"}`
document.getElementById("conexao").innerHTML = `${condicao ?? "ON"}`
document.getElementById("status").innerHTML = `${statusTv ?? "Normal"}`