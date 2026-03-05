const nomeSeu = prompt("Please put your first name:")
const sobrenomeSeu = prompt("Please put your last name:")

let nomeFormatado = nomeSeu.trim().toLowerCase()
let sobrenomeFormatado = sobrenomeSeu.trim().toLowerCase()
let quantidadeLetras = nomeFormatado.length + sobrenomeFormatado.length

alert(`Welcome dear ${nomeFormatado} ${sobrenomeFormatado}`)
alert(`Total of letter is: ${quantidadeLetras} `)

//Exercício que eu fiz//

//Exercíco que o prof fez//

/* GABARITO 1 */

// let n = prompt("Nome:").trim();
// let s = prompt("Sobrenome:").trim();
// let completo = n + " " + s;
// alert(completo.toLowerCase());
// alert("Seu nome tem " + completo.length + " caracteres.");





