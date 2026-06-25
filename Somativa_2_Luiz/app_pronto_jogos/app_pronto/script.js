const CHAVE_STORAGE = "#meus_jogos";

document.addEventListener("DOMContentLoaded", function () {
  configurarFormulario();
  renderizarJogos();
  excluirJogo();
});

/* ============================================================
   2) CONFIGURAR SUBMIT DO FORMULÁRIO
   ============================================================ */
function configurarFormulario() {
  const form = document.querySelector("#form-jogo");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const jogo = {
      titulo: document.querySelector("#input-titulo").value,
      produtora: document.querySelector("#input-produtora").value,
      nota: Number(document.querySelector("#input-nota").value),
      comentario: document.querySelector("#input-comentario").value,
    };

    salvarJogo(jogo);
    form.reset();
    renderizarJogos();
  });
}

/* ============================================================
   3) SALVAR JOGO NO LOCALSTORAGE
   ============================================================ */
function salvarJogo(jogo) {
  const lista = document.querySelector("#lista-jogos");
  lista.push(jogo);

  localStorage.setItem(lista);
}

/* ============================================================
   4) MOSTRAR OS JOGOS NA TELA
   ============================================================ */
let meusJogos = [];

function salvarJogo(jogo) {
  meusJogos.push(jogo);

  localStorage.setItem("meusJogos", JSON.stringify(meusJogos));

  renderizarJogos();
}

function renderizarJogos() {
  const ul = document.querySelector("#lista-jogos");
  const msgVazio = document.querySelector("#msg-vazio");

  ul.innerHTML = "";

  if (meusJogos.length === 0) {
    msgVazio.style.display = "block";
    return;
  }
  msgVazio.style.display = "none";

  meusJogos.forEach((jogo, indice) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${jogo.titulo}</strong>
      <div class="meta">Produtora: ${jogo.produtora} • Nota: ${jogo.nota}/5</div>
      <div class="comentario">"${jogo.comentario}"</div>
      <button class="btn-excluir" data-index="${indice}">Excluir</button>
    `;
    ul.appendChild(li);
  });
}
/* ============================================================
   6) EXCLUIR JOGO
   ============================================================ */
function excluirJogo(indice) {
  const lista = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [];
  lista.splice(indice, 1);
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
  renderizarJogos();
}
