const tituloNhoque = document.querySelector('#card-nhoque h3')

const botoesCompra = document.querySelectorAll('.btn-pedido')

const terceiroCard = document.querySelector('.card:nth-child(3)')

const imagem_lasanha = document.querySelector('#foto-destaque')

const card_lasanha = document.querySelector('#card-lasanha')

console.log("1. Mostrando o título nhoque (Pelo id)", tituloNhoque)
console.log("2. Quantidade de botões de pedido: ", botoesCompra.length)
console.log("3. A terceira posição da class .card", terceiroCard)

const data = new Date()
const hora = data.getHours()

const saudacao = document.querySelector('#boas-vindas')
const seuNome = document.querySelector('#nome')

saudacao.textContent = hora < 18 ? "Bem vindo e tenha uma boa tarde!" : "Bem vindo e tenha uma boa noite!"

seuNome.innerHTML = "Meu nome é <em>Luiz</em>"

// imagem_lasanha.alt = "Produto esgotado"

// imagem_lasanha.src = "./src/img/Variados.jpg"

tituloNhoque.style.color = "#a90000"
card_lasanha.classList.add('em-promocao')