document.addEventListener("DOMContentLoaded", function () { /*As funções que estão ai dentro quando for reniciado ele salva*/
  exibirBoasVindas();
  exibirDataFooter();
  fecharMenuAoNavegar();
});

function exibirBoasVindas() {
  const agora = new Date();
  const hora = agora.getHours();
  const minutos = agora.getMinutes();
  const horaExata = hora + minutos / 60;

  let saudacao;
  if (horaExata >= 5 && horaExata < 12) {
    saudacao = "Bom dia! Qual o seu pedido?";
  } else if (horaExata >= 12 && horaExata < 18) {
    saudacao = "Boa tarde! Confira nosso cardápio.";
  } else {
    saudacao = "Boa noite! Ainda dá tempo de pedir.";
  }

  const elemSaudacao = document.querySelector("#boas-vindas");
  if (elemSaudacao) elemSaudacao.textContent = saudacao;
}

// ─────────────────────────────────────────────────────────────────────────────
// exibirDataFooter()
// Aula 8: exibe a data atual no rodapé de todas as páginas.
//   O #data-hora-footer existe em index.html, cadastro.html e pedidos.html.
//
// toLocaleDateString com opções formata em português completo:
//   "quinta-feira, 12 de março de 2026"
// ─────────────────────────────────────────────────────────────────────────────
function exibirDataFooter() {
  const elemFooter = document.querySelector("#data-hora-footer");
  if (!elemFooter) return;

  const agora = new Date();
  const dataFormatada = agora.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  elemFooter.textContent = dataFormatada;
}

// ─────────────────────────────────────────────────────────────────────────────
// fecharMenuAoNavegar()
// Aula 3 (Design Responsivo): no mobile, fecha o menu hambúrguer
//   automaticamente ao clicar em qualquer link de navegação.
//
// window.matchMedia verifica se uma media query CSS está ativa —
//   a mesma lógica do @media (max-width: 600px) do CSS, acessível pelo JS.
//   Se não for mobile, encerra sem adicionar eventos desnecessários.
// ─────────────────────────────────────────────────────────────────────────────
function fecharMenuAoNavegar() {
  const isMobile = window.matchMedia("(max-width: 600px)").matches;
  if (!isMobile) return;

  const linksMenu = document.querySelectorAll("#menu a");
  linksMenu.forEach(function (link) {
    link.addEventListener("click", function () {
      const checkbox = document.querySelector("#bt_menu");
      if (checkbox) checkbox.checked = false;
    });
  });
}
