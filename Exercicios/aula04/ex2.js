const valorTotal = prompt ("Please value total your count:")
const qntdPessoa = prompt("please how many people in the table")

let pagar = valorTotal / qntdPessoa

alert(`Your friends must ${pagar.toFixed(2)}`)

// /* GABARITO 2 */
// let total = prompt("Valor da conta:");
// let pessoas = prompt("Qtd pessoas:");
// let divisao = total / pessoas;
// alert("Cada amigo deve pagar R$ " + divisao.toFixed(2));