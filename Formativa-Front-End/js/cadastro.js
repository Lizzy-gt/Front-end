document.getElementById('formCadastro').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const form = e.target
  const nome = form.nome.value.trim()
  const descricao = form.descricao.value.trim()
  const preco = form.preco.value.trim()
  const categoria = form.categoria.value.trim()
  const file = form.imagem.files && form.imagem.files[0]

  // Validações simples
  if(!nome || !descricao || !preco || !categoria){ alert('Preencha todos os campos obrigatórios.'); return }
  if(isNaN(Number(preco))){ alert('Preço inválido. Use apenas números.'); return }

  const API = 'http://localhost:3000'

  // prepare FormData for upload
  const formData = new FormData()
  formData.append('nome', nome)
  formData.append('descricao', descricao)
  formData.append('preco', preco)
  formData.append('categoria', categoria)
  if(file) formData.append('imagem', file)

  try{
    const res = await fetch(`${API}/produtos`, { method: 'POST', body: formData })
    if(!res.ok) throw new Error('Erro na API')
    const criado = await res.json().catch(()=>null)
    if(criado){ if(!criado.id && criado._id) criado.id = criado._id; if(!criado.id) criado.id = String(Date.now()) }
    // atualizar localStorage com o objeto retornado ou com fallback
    const stored = localStorage.getItem('produtos')
    const lista = stored?JSON.parse(stored):[]
    const toStore = criado || { id: String(Date.now()), nome, descricao, preco: Number(preco), categoria, imagem: (criado && criado.imagem) || '' }
    lista.unshift(toStore)
    localStorage.setItem('produtos', JSON.stringify(lista))
    location.href='index.html'
  }catch(err){
    // fallback: ler arquivo local como dataURL se houver
    const produto = { id: String(Date.now()), nome, descricao, preco: Number(preco), categoria, imagem: '' }
    if(file){
      produto.imagem = await new Promise((resolve)=>{
        const fr = new FileReader()
        fr.onload = ()=> resolve(fr.result)
        fr.readAsDataURL(file)
      })
    }
    const stored = localStorage.getItem('produtos')
    const lista = stored?JSON.parse(stored):[]
    lista.unshift(produto)
    localStorage.setItem('produtos', JSON.stringify(lista))
    location.href='index.html'
  }
})
