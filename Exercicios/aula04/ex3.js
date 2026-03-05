/* GABARITO 3 */
let valorCompra = prompt("Digite o valor da compra")
// let valor = prompt("Valor da compra:");
// let cupom = prompt("Tem cupom? (sim/nao)").toLowerCase().trim()
// if (valor > 150 ||/*ou*/ cupom == "sim") {
//     console.log("Frete Grátis Liberado");
// } else {
//     console.log("Frete Pago");
// }

let cupom = confirm("Se você possui cupom clique em 'Confimar', se não clique em 'Cancelar' ")
let resposta = valorCompra > 150 || cupom == true ? "Tem frete pago" : "Não tem frete pago"