const BASE_URL = "http://localhost:4000";

const formulario = document.getElementById("formularioCadastro");
const uploadArea = document.getElementById("uploadArea");
const inputImagem = document.getElementById("imagem");
const previewImagem = document.getElementById("previewImagem");
const nomeArquivo = document.getElementById("nomeArquivo");
const mensagem = document.getElementById("mensagem");
const listaProdutos = document.getElementById("listaProdutos");

// ============ Funcionalidades de Upload ============

// Drag and drop
uploadArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadArea.classList.add("dragover");
});

uploadArea.addEventListener("dragleave", () => {
  uploadArea.classList.remove("dragover");
});

uploadArea.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadArea.classList.remove("dragover");

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    inputImagem.files = files;
    exibirPreviewImagem(files[0]);
  }
});

// Clique na área de upload
uploadArea.addEventListener("click", () => {
  inputImagem.click();
});

// Mudança no input de arquivo
inputImagem.addEventListener("change", (e) => {
  if (e.target.files.length > 0) {
    exibirPreviewImagem(e.target.files[0]);
  }
});

function exibirPreviewImagem(file) {
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = (e) => {
      previewImagem.src = e.target.result;
      previewImagem.style.display = "block";
      nomeArquivo.textContent = file.name;
      uploadArea.style.display = "none";
    };

    reader.readAsDataURL(file);
  } else {
    mostrarMensagem("Erro: Selecione uma imagem válida!", "erro");
  }
}

// ============ Envio do Formulário ============

formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();

  // Adicionar campos de texto
  formData.append("nome", document.getElementById("nome").value);
  formData.append("descricao", document.getElementById("descricao").value);
  formData.append("preco", document.getElementById("preco").value);
  formData.append("categoria", document.getElementById("categoria").value);

  // Adicionar arquivo de imagem
  if (inputImagem.files.length > 0) {
    formData.append("arquivo", inputImagem.files[0]);
  } else {
    mostrarMensagem("Erro: Selecione uma imagem!", "erro");
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      body: formData, // NÃO definir Content-Type, o navegador vai definir automaticamente
    });

    const dados = await response.json();

    if (response.ok) {
      mostrarMensagem("Produto cadastrado com sucesso!", "sucesso");
      formulario.reset();
      previewImagem.style.display = "none";
      uploadArea.style.display = "block";
      nomeArquivo.textContent = "";
      carregarProdutos();
    } else {
      mostrarMensagem(`Erro: ${dados.mensagem || "Erro ao cadastrar"}`, "erro");
    }
  } catch (erro) {
    console.error("Erro na requisição:", erro);
    mostrarMensagem("Erro ao conectar com o servidor!", "erro");
  }
});

// ============ Carregamento de Produtos ============

async function carregarProdutos() {
  try {
    const response = await fetch(`${BASE_URL}/produtos`);
    const dados = await response.json();

    if (response.ok && dados.dados && Array.isArray(dados.dados)) {
      exibirProdutos(dados.dados);
    } else {
      listaProdutos.innerHTML =
        '<p class="sem-produtos">Nenhum produto cadastrado ainda</p>';
    }
  } catch (erro) {
    console.error("Erro ao carregar produtos:", erro);
    listaProdutos.innerHTML = '<p class="sem-produtos">Erro ao carregar produtos</p>';
  }
}

function exibirProdutos(produtos) {
  if (produtos.length === 0) {
    listaProdutos.innerHTML = '<p class="sem-produtos">Nenhum produto cadastrado</p>';
    return;
  }

  listaProdutos.innerHTML = produtos
    .map(
      (produto) => `
    <div class="card-produto">
      <div class="produto-imagem">
        ${
          produto.imagem
            ? `<img src="${BASE_URL}/${produto.imagem}" alt="${produto.nome}" />`
            : '<p>Sem imagem</p>'
        }
      </div>
      <div class="produto-info">
        <h3>${produto.nome}</h3>
        <p class="descricao">${produto.descricao}</p>
        <p class="categoria"><strong>Categoria:</strong> ${produto.categoria}</p>
        <p class="preco"><strong>Preço:</strong> R$ ${parseFloat(produto.preco).toFixed(2)}</p>
        <div class="produto-acoes">
          <button class="btn btn-editar" onclick="editarProduto(${produto.id})">Editar</button>
          <button class="btn btn-deletar" onclick="deletarProduto(${produto.id})">Deletar</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// ============ Deletar Produto ============

async function deletarProduto(id) {
  if (confirm("Tem certeza que deseja deletar este produto?")) {
    try {
      const response = await fetch(`${BASE_URL}/produtos/${id}`, {
        method: "DELETE",
      });

      const dados = await response.json();

      if (response.ok) {
        mostrarMensagem("Produto deletado com sucesso!", "sucesso");
        carregarProdutos();
      } else {
        mostrarMensagem(`Erro: ${dados.mensagem}`, "erro");
      }
    } catch (erro) {
      console.error("Erro ao deletar:", erro);
      mostrarMensagem("Erro ao deletar produto!", "erro");
    }
  }
}

// ============ Editar Produto ============

function editarProduto(id) {
  alert("Funcionalidade de edição será implementada em breve!");
}

// ============ Mensagens ============

function mostrarMensagem(texto, tipo = "info") {
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
  mensagem.style.display = "block";

  setTimeout(() => {
    mensagem.style.display = "none";
  }, 5000);
}

// ============ Inicialização ============

document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos();
});
