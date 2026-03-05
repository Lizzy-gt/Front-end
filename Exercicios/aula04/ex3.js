/* GABARITO 3 */
let valor = prompt("Valor da compra:");
let cupom = prompt("Tem cupom? (sim/nao)");
if (valor > 150 || cupom == "sim") {
    console.log("Frete Grátis Liberado");
} else {
    console.log("Frete Pago");
}