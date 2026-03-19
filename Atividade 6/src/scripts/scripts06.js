
const botao = document.getElementById("btn-curtir")
const contador = document.getElementById("contador")
let curtidas = 0 //Armazenas os valores
botao.addEventListener("click", () => { //Começa o click
    curtidas++ // adicionar
    contador.textContent = curtidas // mostra na tela as curtidas
})

const campoTexto = document.getElementById("campo-texto")
const previewTexto = document.getElementById("preview-texto") //Selecionar um id especifico
campoTexto.addEventListener("input", () => {
    previewTexto.textContent = "Digitando: " + (campoTexto.value || "...") //Substituir o campo que estava la
})


const caixaCor = document.getElementById("caixa-cor")
caixaCor.addEventListener("mouseenter", () => {
    caixaCor.style.background = "#3498db"
})
caixaCor.addEventListener("mouseleave", () => {
    caixaCor.style.background = "#95a5a6"
}) //Ele vai ficar assim caso não tiver mouse por cima