class Prato {
    constructor(nome, preco) {
        this.nome = nome
        this.preco = preco
    }

    exibirEmReais(total) {
        return "R$ " + total.toFixed(2)
    }

}

const lasanha = new Prato("Lasanha Bolonhesa", 45.00)


alert("Welcom to restarunt Flavor & Know")

console.log("Teste")

const cliente = prompt("Welcome customer, please put your name:")

let nomeFormatado = cliente.trim().toUpperCase()

alert("Welcome Sr. " + nomeFormatado)

const horaAgora = new Date()

const hora = horaAgora.getHours()

if (hora < 11) {
    alert(`Good Morning, ${nomeFormatado}, appreciate the delicacies to of breakfast!`)
    console.log("before of 11am")
} else {
    alert(`Good afternoon ${nomeFormatado}, appreciate the lunch`)
    console.log("after of 11am")
}

const querPrato = confirm(`Talk my dear ${nomeFormatado} you wants a dish?`)

if (querPrato) {
    let quantidade = prompt("Today we have Lasanha a Bolonhesa, how many do you want?")
    let total = lasanha.preco * quantidade
    // alert(total)
    alert(`Cool, yout totaly of ${lasanha.nome} is of: ${lasanha.exibirEmReais(total)} `)
} else {
    ("Okk, Thankss for visit, go back forever!")
}