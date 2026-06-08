const API = 'http://localhost:3000'

async function loadProdutos() {
  const container = document.getElementById("cardapio");
  container.innerHTML = "";
  let produtos = [];
  try {
    const res = await fetch(`${API}/produtos`);
    if (res.ok) {
      produtos = await res.json();
    } else throw new Error("api error");
  } catch (e) {
    const stored = localStorage.getItem("produtos");
    produtos = stored ? JSON.parse(stored) : [];
  }

  if (produtos.length === 0) {
    container.innerHTML =
      '<p style="padding:1rem">Nenhum prato cadastrado.</p>';
    return;
  }

  produtos.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    const img = document.createElement("img");
    img.src = p.imagem || "https://via.placeholder.com/400x300?text=Sem+imagem";
    const body = document.createElement("div");
    body.className = "card-body";
    const h3 = document.createElement("h3");
    h3.textContent = p.nome;
    const desc = document.createElement("p");
    desc.textContent = p.descricao || "";
    const meta = document.createElement("div");
    meta.className = "meta";
    const cat = document.createElement("span");
    cat.textContent = p.categoria || "";
    const price = document.createElement("span");
    price.className = "price";
    price.textContent = p.preco ? `R$ ${Number(p.preco).toFixed(2)}` : "";
    meta.appendChild(cat);
    meta.appendChild(price);
    body.appendChild(h3);
    body.appendChild(desc);
    body.appendChild(meta);

    // ações (editar)
    const actions = document.createElement("div");
    actions.style.marginTop = "0.5rem";
    const editBtn = document.createElement("button");
    editBtn.className = "btn";
    editBtn.textContent = "Editar";
    editBtn.addEventListener("click", () => openEditModal(p));
    actions.appendChild(editBtn);
    body.appendChild(actions);

    card.appendChild(img);
    card.appendChild(body);
    container.appendChild(card);
  });
}

window.addEventListener("load", () => {
  loadProdutos();
});

// Abre modal simples para editar o prato
function openEditModal(produto) {
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <h3>Editar: ${produto.nome}</h3>
    <form id="editForm">
      <label>Nome<input name="nome" value="${(produto.nome || "").replace(/"/g, "&quot;")}" required></label>
      <label>Descrição<textarea name="descricao" required>${(produto.descricao || "").replace(/</g, "&lt;")}</textarea></label>
      <label>Preço<input name="preco" value="${produto.preco || ""}" required></label>
      <label>Categoria<input name="categoria" value="${produto.categoria || ""}" required></label>
      <label>Imagem (arquivo)<input name="imagem" type="file" accept="image/*" /></label>
      <div style="display:flex;gap:.5rem;justify-content:flex-end;margin-top:.5rem">
        <button type="button" id="cancelEdit" class="btn">Cancelar</button>
        <button type="submit" class="btn primary">Salvar</button>
      </div>
    </form>
  `;
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  overlay
    .querySelector("#cancelEdit")
    .addEventListener("click", () => overlay.remove());
  overlay.querySelector('#editForm').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const form = e.target
    const nome = form.nome.value.trim()
    const descricao = form.descricao.value.trim()
    const preco = form.preco.value.trim()
    const categoria = form.categoria.value.trim()
    const file = form.imagem.files && form.imagem.files[0]

    const id = produto.id || produto._id || String(Date.now())
    const formData = new FormData()
    formData.append('nome', nome)
    formData.append('descricao', descricao)
    formData.append('preco', preco)
    formData.append('categoria', categoria)
    if(file) formData.append('imagem', file)

    await editarProduto(id, formData)
    overlay.remove()
    loadProdutos()
  })
}

// Envia PUT /produtos/:id e atualiza localStorage como fallback
async function editarProduto(id, dados){
  try{
    const res = await fetch(`${API}/produtos/${id}`, { method: 'PUT', body: dados instanceof FormData ? dados : JSON.stringify(dados), headers: dados instanceof FormData ? {} : { 'Content-Type': 'application/json' } })
    if(res.ok){
      const servidor = await res.json().catch(()=>null)
      const stored = localStorage.getItem('produtos')
      const lista = stored?JSON.parse(stored):[]
      const idx = lista.findIndex(x=>x.id==id||x._id==id)
      const toStore = servidor || (dados instanceof FormData ? { id, nome: dados.get('nome'), descricao: dados.get('descricao'), preco: Number(dados.get('preco')), categoria: dados.get('categoria'), imagem: servidor && servidor.imagem || '' } : dados)
      if(idx>-1) lista[idx]=toStore
      else lista.unshift(toStore)
      localStorage.setItem('produtos', JSON.stringify(lista))
      return toStore
    }else throw new Error('API error')
  }catch(err){
    const stored = localStorage.getItem('produtos')
    const lista = stored?JSON.parse(stored):[]
    const idx = lista.findIndex(x=>x.id==id||x._id==id)
    let dadosObj = dados
    if(dados instanceof FormData){
      dadosObj = { id, nome: dados.get('nome'), descricao: dados.get('descricao'), preco: Number(dados.get('preco')), categoria: dados.get('categoria'), imagem: '' }
    }
    if(idx>-1) lista[idx]=dadosObj
    else lista.unshift(dadosObj)
    localStorage.setItem('produtos', JSON.stringify(lista))
    return dadosObj
  }
}
