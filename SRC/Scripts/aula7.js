// PARTE 1 — Mantidos da Aula 6 (copiar, não reescrever)

const saudacao = document.querySelector("#boas-vindas");
const hora = new Date().getHours();
if (saudacao) {
    saudacao.textContent =
        hora < 12
            ? "Bom dia! Qual o seu pedido?"
            : "Boa tarde! Confira nosso cardápio.";
}

const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
        card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "none";
    });
});



// PARTE 2 — DELEGAÇÃO DE EVENTOS (escrever ao vivo)

const main = document.querySelector("main") //Pegar qualquer classe

main.addEventListener("click", (event /*Quem clicou*/) => {
    const clicado = event.target

    if (clicado.classList.contains("btn-menos")) {
        const box = clicado.parentElement //Box - Falar do espaço que só o prato usa, aqui vai fazer o botão , qualquer botão vai ser clicavel
        const spanQtd = box.querySelector(".qtd-valor") //Vai pegar o valor
        const valorAtual = Number(spanQtd.textContent) //Trazendo o conteudo em texto
        spanQtd.textContent = Math.max(1, valorAtual - 1) //Vai aterar o valor, não pode ser menor que 1
        atualizarPrecoCard(box)
        return
    }

    if (clicado.classList.contains("btn-mais")) {
        const box = clicado.parentElement
        const spanQtd = box.querySelector(".qtd-valor")
        spanQtd.textContent = Number(spanQtd.textContent) + 1 //Não vai utilizar o Math.max, pois não tem limite de aumentar
        atualizarPrecoCard(box)
        return
    }




    if (clicado.classList.contains("btn-pedido")) {
        event.preventDefault()

        const card = clicado.parentElement
        const nomePrato = card.querySelector("h3").textContent //Pegar o nome do prato, não seria value pois o usuario não digitou
        const quantidade = card.querySelector(".qtd-valor").textContent
        const precoExibido = card.querySelector(".preco").textContent;

        // efeito visual quando Clicado "Pedir agora"
        clicado.textContent = "✓ Adicionado!"
        clicado.style.backgroundColor = "#27ae60"
        clicado.disabled = true

        setTimeout(() => { //Configurar o tempo
            clicado.textContent = "Pedir Agora"
            clicado.style.backgroundColor = "" //Voltar ao mesmo de antes 
            clicado.disabled = false
        }, 1500) 

        if (!card.querySelector(".badge-adicionado")) { //Vai mostrar os pratos
            card.insertAdjacentHTML(
                "beforeend", //Ultimo filho
                "<span class='badge-adicionado'>✔ No resumo</span>"
            )
        }

        adicionarItemAoResumo(nomePrato, quantidade, precoExibido, card)
    }
}) //Acabou o main ouvinte 



function atualizarPrecoCard(box) /*O Box não é o mesmo de cima mais tem o mesmo sgnf*/{
    const card = box.parentElement // peguei o card
    const spanPreco = card.querySelector(".preco")
    const precoUnitario = parseFloat(spanPreco.getAttribute("data-preco")) //Valor da comida
    const quantidade = Number(box.querySelector(".qtd-valor").textContent) //Valor da quantidade de comida que o usuario colocou, e se deixar sem o tex vai pegar tudo
    const total = precoUnitario * quantidade  // Conta
    spanPreco.textContent = "R$ " + total.toFixed(2).replace(".", ",") // Substituir um visual para outro, pontos virando virgula
    spanPreco.style.color = total > 150 ? "#c0392b" : "#e67e22" //Cor do valor total
}



function adicionarItemAoResumo(nome, qtd, preco, cardOrigem) {
    const secaoResumo = document.querySelector("#secao-resumo")
    const listaResumo = document.querySelector("#lista-resumo")

    if (!secaoResumo || !listaResumo) return

    // Exibe a seção que estava oculta (display:none no CSS)
    secaoResumo.style.display = "block"

    // Passo 1: cria o <li>
    const itemLi = document.createElement("li")
    itemLi.classList.add("item-resumo")

    // Passo 2: cria o <span> com o texto
    const textoSpan = document.createElement("span")
    textoSpan.textContent = qtd + "x " + nome + " — " + preco  //Mostrar os valores de la de cima 

    // Passo 3: cria o botão ✕
    const btnRemover = document.createElement("button")
    btnRemover.textContent = "✕"
    btnRemover.classList.add("btn-remover")



    btnRemover.addEventListener("click", () => {
        itemLi.remove();

        const badge = cardOrigem.querySelector(".badge-adicionado");
        if (badge) badge.remove();

        if (listaResumo.children.length === 0) {
            secaoResumo.style.display = "none";
        }
    });

    // Passo 4: monta a estrutura e insere na página
    itemLi.appendChild(textoSpan);
    itemLi.appendChild(btnRemover);
    listaResumo.appendChild(itemLi);
}


// ─────────────────────────────────────────────────────────
// PARTE 7 (continuação) — Botão Limpar Tudo
//
// Remove todos os filhos da lista usando firstElementChild
// em loop: enquanto existir um filho, remove.
// Depois remove todos os badges dos cards e esconde a seção.
// ─────────────────────────────────────────────────────────

const btnLimpar = document.querySelector("#btn-limpar");
if (btnLimpar) {
    btnLimpar.addEventListener("click", () => {
        const listaResumo = document.querySelector("#lista-resumo");
        const secaoResumo = document.querySelector("#secao-resumo");

        // Remove todos os badges dos cards
        document.querySelectorAll(".badge-adicionado").forEach((b) => b.remove()); //o b serve como uma variavel que remove um a um

        // Remove filhos da lista um a um com firstElementChild
        while (listaResumo.firstElementChild) {
            listaResumo.firstElementChild.remove();
        }

        secaoResumo.style.display = "none";
    });
}