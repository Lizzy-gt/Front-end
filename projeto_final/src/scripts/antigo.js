const topo = document.getElementById("Topo loja")

const links = document.getElementByIdTagName("a")

const listaCards = document.getElementByIdClassName("card")

console.log("1. elemento: ", topo)
console.log("2. o primeiro card da lista: ", listaCards)
console.log("3. a lista completa de links: ", links)
console.log("4. o e endereço (URL) do primeiro links ", links[0].href)
console.log("5. a cor: ", listaCards[0].style.backgroundColor)