const nomeTv = sessionStorage.NOME_TV; 
const hostname = sessionStorage.HOSTNAME_TV;
const statusTv = sessionStorage.STATUS_TV; 
const condicao = sessionStorage.CONDITION_TV; 
const andar = sessionStorage.FLOOR_TV;
const setor = sessionStorage.SECTOR_TV;


document.getElementById("setor_name").innerHTML = `${setor}`
document.getElementById("andar_name").innerHTML = `${andar}`

document.getElementById("nome_tv").innerHTML = `${nomeTv}`
document.getElementById("hostname").innerHTML = `${hostname}`
document.getElementById("conexao").innerHTML = `${condicao}`
document.getElementById("status").innerHTML = `${statusTv}`