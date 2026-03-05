/* GABARITO 4 */
let userNum = prompt("Escolha de 1 a 10:");
let sortudo = Math.floor(Math.random() * 10) + 1;
if (userNum == sortudo) {
    alert("Parabéns, você ganhou um brinde!");
} else {
    alert("Que pena, o número sorteado foi " + sortudo);
}