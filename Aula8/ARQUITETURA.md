# 🏗️ Arquitetura do Sistema - Diagrama Visual

## Arquitetura em 3 Camadas

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CAMADA DE APRESENTAÇÃO                       │
│                              FRONTEND                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌────────────────────────┐         ┌──────────────────────────┐   │
│   │   cadastro.html        │         │    cadastro.css          │   │
│   │  (Estrutura HTML5)     │         │   (Estilos Responsivos)  │   │
│   │                        │         │                          │   │
│   │ • Formulário           │         │ • Grid/Flexbox           │   │
│   │ • Upload Area          │         │ • Cores temáticas        │   │
│   │ • Lista de Produtos    │         │ • Animações              │   │
│   │ • Navegação            │         │ • Media queries           │   │
│   └────────┬───────────────┘         └──────────────────────────┘   │
│            │                                                          │
│            └─────────────────┬────────────────────────┐              │
│                              │                        │              │
│                    ┌─────────▼──────────┐             │              │
│                    │ cadastro.js        │             │              │
│                    │(Lógica Frontend)   │             │              │
│                    │                    │             │              │
│                    │ • Validação        │             │              │
│                    │ • Eventos          │             │              │
│                    │ • Fetch API        │             │              │
│                    │ • Renderização     │             │              │
│                    └────────┬───────────┘             │              │
│                             │                        │              │
│                    HTTP POST/GET/DELETE               │              │
│                             │                        │              │
│                             ▼ (JavaScript Nativo)   │              │
└──────────────────────────────┼────────────────────────┼──────────────┘
                               │                        │
                ┌──────────────┴─────────────────────┐  │
                │  INTERNET (HTTP/REST)             │  │
                └──────────────────────────────────┬─┘  │
                                                   │    │
┌──────────────────────────────────────────────────▼────▼──────────────┐
│                     CAMADA DE APLICAÇÃO                               │
│                        BACKEND (Node.js)                              │
├────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────┐    ┌──────────────────┐    ┌────────────┐ │
│  │  routes/index.js   │    │  config/multer.js│    │ app.js     │ │
│  │  (Roteamento)      │    │ (Upload Config)  │    │ (Express)  │ │
│  │                    │    │                  │    │            │ │
│  │ POST /upload       │    │ • Storage        │    │ • Server   │ │
│  │ GET /produtos      │◄──▶│ • File naming    │    │ • Middlew. │ │
│  │ DELETE /produtos   │    │ • Destination    │    │ • Routes   │ │
│  └────┬───────────────┘    └──────────────────┘    └─────┬──────┘ │
│       │                                                   │         │
│       ▼                                                   │         │
│  ┌────────────────────────────────────────┐             │         │
│  │  ProdutoController                     │             │         │
│  │  ┌──────────────────────────────────┐  │             │         │
│  │  │ cadastrarComImagem(req, res)  ◄──┼──┴─────────────┘         │
│  │  │ listar(req, res)                │  │                        │
│  │  │ buscarPorId(req, res)           │  │                        │
│  │  │ deletar(req, res)               │  │                        │
│  │  └──────────┬───────────────────────┘  │                        │
│  └─────────────┼───────────────────────────┘                        │
│                │                                                     │
│                ▼                                                     │
│  ┌──────────────────────────────────────┐                          │
│  │  ProdutoService                      │                          │
│  │  ┌────────────────────────────────┐  │                          │
│  │  │ cadastrarProduto(dados)        │  │                          │
│  │  │ listarProdutos()               │  │                          │
│  │  │ buscarProdutoPorId(id)         │  │                          │
│  │  │ deletarProduto(id)             │  │                          │
│  │  └──────────┬─────────────────────┘  │                          │
│  └─────────────┼──────────────────────────┘                         │
│                │                                                     │
│                ▼                                                     │
│  ┌──────────────────────────────────────┐                          │
│  │  ProdutoRepository                   │                          │
│  │  ┌────────────────────────────────┐  │                          │
│  │  │ create(produtoData)            │  │                          │
│  │  │ findAll()                      │  │                          │
│  │  │ findById(id)                   │  │                          │
│  │  │ delete(id)                     │  │                          │
│  │  └──────────┬─────────────────────┘  │                          │
│  └─────────────┼──────────────────────────┘                         │
│                │                                                     │
│    ┌───────────┴─────────────────┐                                  │
│    │  SQL Queries                │                                  │
│    │  mysql2/promise             │                                  │
│    └───────────┬─────────────────┘                                  │
│                │                                                     │
└────────────────┼──────────────────────────────────────────────────┘
                 │
    ┌────────────┴────────────────┐
    │   FILESYSTEM ACCESS         │
    └────────────┬────────────────┘
                 │
    ┌────────────▼────────────────┐
    │    uploads/ (Disk)          │
    │  ├── jpgFiles/              │
    │  ├── pngFiles/              │
    │  └── pdfFiles/              │
    └─────────────────────────────┘

                 │
┌────────────────▼──────────────────────────────────────────────────┐
│                    CAMADA DE DADOS                                 │
│                    DATABASE (MySQL)                                │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────┐              │
│  │            Tabela: produto                     │              │
│  ├────────────────────────────────────────────────┤              │
│  │ id     INT            (PK, AI)                 │              │
│  │ nome   VARCHAR(255)   (NOT NULL)               │              │
│  │ descricao TEXT        (NOT NULL)               │              │
│  │ preco  DECIMAL(10,2)  (NOT NULL)               │              │
│  │ categoria VARCHAR(100)                         │              │
│  │ imagem VARCHAR(500)   ← Caminho arquivo       │              │
│  │ disponivel BOOLEAN    (DEFAULT true)           │              │
│  │ criado_em TIMESTAMP   (DEFAULT CURRENT)        │              │
│  │ atualizado_em TIMESTAMP (AUTO UPDATE)          │              │
│  │                                                │              │
│  │ Índices:                                       │              │
│  │ • idx_categoria (categoria)                    │              │
│  │ • idx_criado_em (criado_em)                    │              │
│  └────────────────────────────────────────────────┘              │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Fluxo de Dados - Cadastro com Imagem

```
USUÁRIO AÇÃO
    │
    ├─→ 1. Preenche formulário + seleciona imagem
    │
    └─→ 2. Clica "Cadastrar"
         │
         ▼
    ┌────────────────────────┐
    │ cadastro.js            │
    │ (Validação Frontend)   │
    └────────┬───────────────┘
             │
             │ FormData {
             │   nome: "Pizza",
             │   descricao: "...",
             │   preco: 45.90,
             │   categoria: "Prato",
             │   arquivo: File object
             │ }
             │
             ▼
    ┌────────────────────────┐
    │ POST /upload           │
    │ HTTP Request           │
    │ multipart/form-data    │
    └────────┬───────────────┘
             │
    ┌────────▼──────────────────────────┐
    │        BACKEND (Node.js)           │
    │                                    │
    │ 1. Express recebe requisição       │
    │ 2. Multer intercepta               │
    │    • Valida extensão               │
    │    • Verifica tamanho              │
    │    • Renomeia arquivo              │
    │    • Salva em disco                │
    │    • Passa para controller         │
    │                                    │
    │ 3. Controller recebe               │
    │    • req.file (arquivo salvo)      │
    │    • req.body (dados do form)      │
    │    • Valida dados                  │
    │    • Chama service                 │
    │                                    │
    │ 4. Service processa                │
    │    • Prepara objeto                │
    │    • Valida regras                 │
    │    • Chama repository              │
    │                                    │
    │ 5. Repository salva                │
    │    • Monta SQL INSERT              │
    │    • Executa query                 │
    │    • Retorna ID                    │
    │                                    │
    └────────┬──────────────────────────┘
             │
    ┌────────▼──────────────────────────┐
    │    BANCO DE DADOS (MySQL)         │
    │                                    │
    │ INSERT INTO produto (             │
    │   nome, descricao, preco,         │
    │   categoria, imagem               │
    │ ) VALUES (...)                    │
    │                                    │
    │ → Cria novo registro              │
    │ → Retorna insertId = X            │
    │                                    │
    └────────┬──────────────────────────┘
             │
             │ Response:
             │ {
             │   "sucesso": true,
             │   "id": X,
             │   "mensagem": "..."
             │ }
             │
    ┌────────▼──────────────────────────┐
    │    FRONTEND (cadastro.js)         │
    │                                    │
    │ 1. Recebe resposta                │
    │ 2. Se OK:                         │
    │    • Exibe mensagem sucesso       │
    │    • Limpa formulário             │
    │    • Recarrega lista de produtos  │
    │ 3. GET /produtos                  │
    │                                    │
    └────────┬──────────────────────────┘
             │
    ┌────────▼──────────────────────────┐
    │    Lista de Produtos              │
    │    (Renderiza cards)              │
    │                                    │
    │ ┌─────────────────────┐           │
    │ │ [Pizza]             │           │
    │ │ ┌─────────────────┐ │           │
    │ │ │   [Imagem]      │ │           │
    │ │ ├─────────────────┤ │           │
    │ │ │ Nome: Pizza     │ │           │
    │ │ │ Preço: R$ 45.90 │ │           │
    │ │ │ [Deletar] [Edit]│ │           │
    │ │ └─────────────────┘ │           │
    │ └─────────────────────┘           │
    │                                    │
    │ Imagem servida por:                │
    │ http://localhost:3000/uploads/...  │
    │                                    │
    └────────┬──────────────────────────┘
             │
             ▼
    ┌────────────────────────┐
    │ USUÁRIO VÊ RESULTADO   │
    │ ✅ Produto cadastrado! │
    │ ✅ Com imagem visível  │
    └────────────────────────┘
```

---

## Estrutura MVC

```
┌──────────────────────────────────────────────────────────────┐
│                          MODEL (Dados)                        │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ProdutoRepository                                           │
│  • findAll()      → SELECT * FROM produto                    │
│  • findById(id)   → SELECT * FROM produto WHERE id = ?       │
│  • create(data)   → INSERT INTO produto (...) VALUES (...)   │
│  • update(id, data) → UPDATE produto SET ... WHERE id = ?    │
│  • delete(id)     → DELETE FROM produto WHERE id = ?         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
           ▲                                          ▼
           │                                    [MySQL Database]
           │
┌──────────┴──────────────────────────────────────────────────┐
│                      VIEW (Apresentação)                     │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Frontend:                    Backend:                       │
│  • cadastro.html             • HTTP Response (JSON)         │
│  • cadastro.css              • Status codes                 │
│  • cadastro.js               • Headers                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
           ▲                                          ▼
           │                                     [User Browser]
           │
┌──────────┴──────────────────────────────────────────────────┐
│                    CONTROLLER (Lógica)                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ProdutoController                                           │
│  • listar(req, res)           → Chamar Service.listarProd  │
│  • buscarPorId(req, res)      → Chamar Service.buscarById  │
│  • cadastrarComImagem(req, res) → Processar arquivo + dados│
│  • deletar(req, res)          → Chamar Service.deletarProd │
│                                                              │
│  ProdutoService                                              │
│  • validarDados(dados)                                       │
│  • chamarRepository()                                        │
│  • tratarErros()                                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
           ▲
           │
    [HTTP Request]
```

---

## Stack Tecnológico

```
┌─────────────────────────────────────────────┐
│           FRONTEND STACK                    │
├─────────────────────────────────────────────┤
│                                             │
│  HTML5          (Estrutura)                 │
│  CSS3           (Estilização)               │
│  JavaScript ES6 (Interatividade)            │
│  • fetch API                                │
│  • FormData                                 │
│  • Event Listeners                          │
│  • Promise/async-await                      │
│                                             │
│  Zero external dependencies! ✨             │
│                                             │
└─────────────────────────────────────────────┘
           │                           │
           ▼                           ▼
    ┌───────────────┐        ┌──────────────┐
    │  REST API     │        │ File Storage │
    │  HTTP/HTTPS   │        │ /uploads/    │
    └───────────────┘        └──────────────┘

┌─────────────────────────────────────────────┐
│           BACKEND STACK                     │
├─────────────────────────────────────────────┤
│                                             │
│  Node.js         (Runtime)                  │
│  Express.js      (Framework)                │
│  Multer          (File upload)              │
│  MySQL2/promise  (Database driver)          │
│  Dotenv          (Env config)               │
│                                             │
│  Arquitetura: MVC (Model-View-Controller)   │
│                                             │
└─────────────────────────────────────────────┘
           │                    │
           ▼                    ▼
    ┌────────────┐      ┌──────────────┐
    │  Multer    │      │   MySQL 5.7+ │
    │   Config   │      │   Database   │
    └────────────┘      └──────────────┘
```

---

## Comunicação Entre Camadas

```
FRONTEND                          BACKEND

cadastro.js                      app.js
    │                              │
    ├──→ FormData                  │
    │    (multipart)               │
    │                              │
    └──→ fetch POST /upload ──────→ routes/index.js
                                   │
                                   ├──→ multer middleware
                                   │    • Salva arquivo
                                   │    • Passa para controller
                                   │
                                   └──→ ProdutoController
                                        ├──→ validar()
                                        ├──→ ProdutoService
                                        │    ├──→ processar()
                                        │    └──→ ProdutoRepository
                                        │         └──→ pool.query()
                                        │              │
                                        │              ▼
                                        │         MySQL (INSERT)
                                        │              │
                                        │    ◀────────┘
                                        │
                                   ◀───┴─── JSON Response
                                        │    {
    ◀──────────────────────────────────┘     "sucesso": true,
         mensagem sucesso                    "id": X
         atualiza lista (GET /produtos)   }
```

---

## Segurança em Camadas

```
┌──────────────────────────────────┐
│  FRONTEND (Validação do Cliente) │
├──────────────────────────────────┤
│ • Tipo de arquivo               │
│ • Tamanho de arquivo            │
│ • Campos obrigatórios           │
│ • Preço positivo                │
└──────────────────────────────────┘
           ▼
┌──────────────────────────────────┐
│  MULTER (Validação de Upload)    │
├──────────────────────────────────┤
│ • Extensão de arquivo           │
│ • Tamanho máximo                │
│ • Tipo MIME                     │
│ • Path traversal prevention     │
└──────────────────────────────────┘
           ▼
┌──────────────────────────────────┐
│  CONTROLLER (Validação Lógica)   │
├──────────────────────────────────┤
│ • Dados obrigatórios            │
│ • Range de valores              │
│ • Tipos de dados                │
│ • Tratamento de erro            │
└──────────────────────────────────┘
           ▼
┌──────────────────────────────────┐
│  DATABASE (Prepared Statements)  │
├──────────────────────────────────┤
│ • Prevenção SQL Injection       │
│ • Parâmetros vinculados         │
│ • Tipos de dados                │
│ • Constraints                   │
└──────────────────────────────────┘
```

---

## Deployment (Futuro)

```
┌─────────────────────────────────┐
│    Ambiente Local (Desenvolvimento)
├─────────────────────────────────┤
│ Frontend: localhost:8000         │
│ Backend:  localhost:3000         │
│ Database: localhost:3306         │
└─────────────────────────────────┘
           ▼
┌─────────────────────────────────┐
│    Servidor Production (Futuro)  │
├─────────────────────────────────┤
│ Frontend: CDN (CloudFlare)      │
│ Backend:  AWS/Heroku/VPS        │
│ Database: AWS RDS/DigitalOcean  │
│ Storage:  AWS S3/Cloud Storage  │
└─────────────────────────────────┘
```

---

**Última atualização:** 2024
**Versão:** 1.0
