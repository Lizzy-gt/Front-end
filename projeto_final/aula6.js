const inputQtd = document.querySelector("#qtd-lasanha")
const precoTexto = document.querySelector("#preco-lasanha")

if (inputQtd && precoTexto){
    inputQtd.addEventListener("input", () =>{
        const precoUnitario = 45.0
        const total = Number(inputQtd.value) * precoUnitario
        precoTexto.textContent = `R${total.toFixed(2)}` 
    })
}