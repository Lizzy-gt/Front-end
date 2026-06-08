## 📊 Fluxo de Integração - Sistema de Cadastro com Multer

```
┌─────────────────────────────────────────────────────────────────┐
│                       FRONTEND (Cliente)                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐                                           │
│  │  cadastro.html   │ ◄────┐                                    │
│  └────────┬─────────┘      │                                    │
│           │                │                                    │
│    Formulário com:         │                                    │
│    • Nome                  │                                    │
│    • Descrição             │                                    │
│    • Preço                 │  cadastro.js                       │
│    • Categoria      ────────┤  • Valida dados                   │
│    • Upload Imagem         │  • Cria FormData                   │
│           │                │  • Envia requisição POST           │
│           │                │  • Carrega lista de produtos       │
│           ▼                │                                    │
│    ┌────────────────┐      │                                    │
│    │  cadastro.css  │──────┘                                    │
│    └────────────────┘                                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
                           │
                           │ HTTP POST /upload
                           │ FormData: {nome, descricao, preco, 
                           │            categoria, arquivo}
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND (Servidor)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────┐                    │
│  │  routes/index.js                        │                    │
│  │  ┌─────────────────────────────────────┤                     │
│  │  │ POST /upload → multer.single()      │                     │
│  │  └──────────────┬──────────────────────┘                     │
│  └────────────────┼──────────────────────────┐                  │
│                   │                          │                  │
│                   ▼                          ▼                  │
│  ┌──────────────────────────┐   ┌──────────────────────┐        │
│  │   config/multer.js       │   │ ProdutoController    │        │
│  │ • Valida extensão        │   │ .cadastrarComImagem()│        │
│  │ • Define destino         │   └──────────┬───────────┘        │
│  │ • Gera nome único        │              │                    │
│  │ • Cria pasta             │              ▼                    │
│  └──────────────┬───────────┘   ┌──────────────────────┐        │
│                 │                │ ProdutoService       │        │
│                 │                │ .cadastrarProduto()  │        │
│                 │                └──────────┬───────────┘        │
│                 │                           │                   │
│                 │                           ▼                   │
│                 │                ┌──────────────────────┐        │
│                 │                │ ProdutoRepository    │        │
│                 │                │ .create(dados)       │        │
│                 │                └──────────┬───────────┘        │
│                 │                           │                   │
│                 │                           ▼                   │
│                 │            ┌──────────────────────┐            │
│                 └──────────► │  MySQL Database      │            │
│                              │  • Salva dados       │            │
│                              │  • Retorna ID        │            │
│                              └────────┬─────────────┘            │
│                                       │                          │
└───────────────────────────────────────┼──────────────────────────┘
                                        │
                 HTTP 201 + JSON Response
                 {sucesso: true, id: X}
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ARQUIVO (Servidor)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  uploads/                                                       │
│  ├── jpgFiles/                                                  │
│  │   └── 1234567890-imagem.jpg                                  │
│  ├── pngFiles/                                                  │
│  └── pdfFiles/                                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Requisição Detalhado

### 1️⃣ **Frontend envia dados do formulário**

```javascript
FormData {
  nome: "Pizza Margherita",
  descricao: "Pizza clássica...",
  preco: "45.90",
  categoria: "Prato",
  arquivo: File { name: "pizza.jpg", ... }
}

↓ POST http://localhost:3000/upload
```

### 2️⃣ **Multer intercepta a requisição**

```javascript
config/multer.js → detecta tipo de arquivo
  • Validação de extensão
  • Cria diretório (uploads/jpgFiles/)
  • Renomeia arquivo: 1234567890-pizza.jpg
  • Salva em disco
```

### 3️⃣ **Controlador recebe arquivo + dados**

```javascript
req.file = {
  fieldname: "arquivo",
  originalname: "pizza.jpg",
  filename: "1234567890-pizza.jpg",
  path: "uploads/jpgFiles/1234567890-pizza.jpg"
}

req.body = {
  nome: "Pizza Margherita",
  descricao: "Pizza clássica...",
  preco: "45.90",
  categoria: "Prato"
}
```

### 4️⃣ **Service processa dados**

```javascript
novoProduto = {
  nome: "Pizza Margherita",
  descricao: "Pizza clássica...",
  preco: 45.90,
  categoria: "Prato",
  imagem: "uploads/jpgFiles/1234567890-pizza.jpg"
}
```

### 5️⃣ **Repository salva no banco**

```sql
INSERT INTO produto 
(nome, descricao, preco, categoria, imagem) 
VALUES ('Pizza Margherita', '...', 45.90, 'Prato', 'uploads/jpgFiles/1234567890-pizza.jpg')
```

### 6️⃣ **Resposta retorna ao frontend**

```json
{
  "sucesso": true,
  "mensagem": "Produto cadastrado com sucesso",
  "id": 1
}
```

### 7️⃣ **Frontend carrega lista de produtos**

```javascript
GET http://localhost:3000/produtos

↓ Response

{
  "sucesso": true,
  "dados": [
    {
      "id": 1,
      "nome": "Pizza Margherita",
      "imagem": "uploads/jpgFiles/1234567890-pizza.jpg",
      ...
    }
  ]
}
```

### 8️⃣ **Imagem é servida pelo Express**

```
GET http://localhost:3000/uploads/jpgFiles/1234567890-pizza.jpg
↓
app.use("/uploads", express.static(...))
↓
Arquivo é servido do disco
```

---

## 📦 Estrutura de Dados

### Tabela: `produto`

```sql
┌────┬──────────┬──────────┬────────┬──────────┬──────────────────┬──────────┐
│ id │   nome   │ descricao│ preco  │ categoria│     imagem       │disponivel│
├────┼──────────┼──────────┼────────┼──────────┼──────────────────┼──────────┤
│ 1  │ Pizza    │ ...      │ 45.90  │ Prato    │uploads/jpg/...   │ true     │
│ 2  │ Coca     │ ...      │ 8.50   │ Bebida   │uploads/jpg/...   │ true     │
│ 3  │ Pudim    │ ...      │ 12.00  │ Sobremesa│uploads/jpg/...   │ true     │
└────┴──────────┴──────────┴────────┴──────────┴──────────────────┴──────────┘
```

---

## ✅ Checklist de Funcionamento

- [ ] Banco de dados criado com tabela `produto`
- [ ] Campo `imagem` adicionado à tabela
- [ ] Pastas de uploads criadas (`jpgFiles`, `pngFiles`, `pdfFiles`)
- [ ] Arquivo `.env` configurado com dados de banco
- [ ] Backend iniciado com `npm start`
- [ ] Frontend acessível em `http://localhost:8000`
- [ ] Formulário carrega sem erros no console
- [ ] Drag-and-drop de imagem funciona
- [ ] Preview da imagem aparece
- [ ] Ao clicar em "Cadastrar", não há erro de CORS
- [ ] Mensagem de sucesso aparece
- [ ] Imagem é salva na pasta `uploads/jpgFiles/`
- [ ] Produto aparece na lista abaixo
- [ ] Imagem é exibida na lista de produtos
- [ ] Botão deletar remove o produto
- [ ] Dados persistem ao recarregar a página

---

## 🚨 Erros Comuns e Soluções

| Erro | Causa | Solução |
|------|-------|---------|
| `ENOTDIR: not a directory` | Pasta uploads não existe | `mkdir -p backend/uploads/jpgFiles` |
| `Cannot POST /upload` | Rota não existe | Verifique `routes/index.js` |
| `Network error` | Backend offline | Execute `npm start` no backend |
| CORS error | Requisição bloqueada | Frontend e backend em portas diferentes |
| Imagem não aparece | Caminho incorreto no BD | Verifique campo `imagem` |
| Arquivo muito grande | Limite excedido | Aumente `storage.fileSize` |

---

## 🔗 Conexões e Dependências

```
cadastro.html
    ├─→ cadastro.js (integração com API)
    ├─→ cadastro.css (estilização)
    └─→ API Backend (localhost:3000)
        ├─→ ProdutoController
        ├─→ ProdutoService
        ├─→ ProdutoRepository
        └─→ MySQL Database
            └─→ Tabela: produto
```

---

**Última atualização:** 2024
**Versão:** 1.0
