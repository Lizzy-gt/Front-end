# Guia de Configuração - Sistema de Cadastro com Multer

## 📋 Descrição

Sistema completo de cadastro de produtos com:
- ✅ Integração frontend com HTML, CSS e JavaScript
- ✅ Upload de imagens via Multer
- ✅ Backend com Express.js
- ✅ Banco de dados MySQL
- ✅ CRUD completo (Criar, Ler, Atualizar, Deletar)

---

## 🚀 Configuração Rápida

### 1. **Banco de Dados**

Execute o seguinte comando SQL para criar a tabela de produtos com suporte a imagens:

```sql
CREATE TABLE IF NOT EXISTS produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  categoria VARCHAR(100),
  imagem VARCHAR(500),
  disponivel BOOLEAN DEFAULT true,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. **Backend - Instalar Dependências**

```bash
cd backend
npm install
```

### 3. **Backend - Variáveis de Ambiente**

Crie um arquivo `.env` na pasta `backend/`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
DB_PORT=3306

PORT=3000
NODE_ENV=development
```

### 4. **Backend - Iniciar Servidor**

```bash
npm start
# ou para desenvolvimento com auto-reload:
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

### 5. **Frontend - Iniciar**

Abra o arquivo `frontend/cadastro.html` em um navegador ou use um servidor local:

```bash
# Usando Python 3
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server frontend -p 8000
```

Acesse em `http://localhost:8000`

---

## 📁 Estrutura de Pastas

```
backend/
├── uploads/
│   ├── jpgFiles/      # Imagens JPG
│   ├── pngFiles/      # Imagens PNG
│   └── pdfFiles/      # PDFs
├── src/
│   ├── config/
│   │   ├── database.js    # Conexão MySQL
│   │   └── multer.js      # Configuração de upload
│   ├── controllers/
│   │   └── ProdutoController.js   # Lógica de requisições
│   ├── services/
│   │   └── ProdutoService.js      # Regras de negócio
│   ├── repositories/
│   │   └── ProdutoRepository.js   # Acesso ao banco
│   ├── routes/
│   │   ├── index.js
│   │   └── produtoRoutes.js
│   ├── app.js
│   └── server.js
└── package.json

frontend/
├── cadastro.html      # Página de cadastro
├── index.html
├── pedido.html
└── src/
    ├── scripts/
    │   ├── cadastro.js     # Integração com API
    │   ├── api.js
    │   ├── main.js
    │   └── pedido.js
    └── styles/
        ├── cadastro.css    # Estilização
        ├── style.css
        └── global.css
```

---

## 🔌 Endpoints da API

### Produtos

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/produtos` | Lista todos os produtos |
| GET | `/produtos/:id` | Busca produto por ID |
| POST | `/produtos` | Cria novo produto (sem imagem) |
| PUT | `/produtos/:id` | Atualiza produto |
| DELETE | `/produtos/:id` | Deleta produto |

### Upload de Imagens

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/upload` | Cadastra produto COM imagem (integrado) |
| POST | `/upload-multiplo` | Upload de múltiplos arquivos |

---

## 📝 Exemplos de Uso

### 1. **Cadastrar Produto com Imagem** (Recomendado)

```javascript
const formData = new FormData();
formData.append('nome', 'Pizza Margherita');
formData.append('descricao', 'Pizza clássica com tomate e queijo');
formData.append('preco', '45.90');
formData.append('categoria', 'Prato');
formData.append('arquivo', fileInput.files[0]); // Arquivo da imagem

fetch('http://localhost:3000/upload', {
  method: 'POST',
  body: formData
})
.then(res => res.json())
.then(data => console.log(data));
```

### 2. **Listar Todos os Produtos**

```javascript
fetch('http://localhost:3000/produtos')
  .then(res => res.json())
  .then(data => console.log(data.dados));
```

### 3. **Deletar Produto**

```javascript
fetch('http://localhost:3000/produtos/1', {
  method: 'DELETE'
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 🎨 Características do Frontend

### Página de Cadastro (`cadastro.html`)

✨ **Funcionalidades:**
- Formulário responsivo com validação
- Drag-and-drop para upload de imagens
- Preview em tempo real da imagem selecionada
- Exibição dinâmica de produtos cadastrados
- Botões para editar e deletar produtos
- Mensagens de sucesso/erro visual
- Design moderno com cores personalizadas

### Campos do Formulário

- **Nome** - Texto obrigatório
- **Descrição** - Textarea obrigatório
- **Preço** - Número com 2 casas decimais
- **Categoria** - Select (Bebida, Prato, Sobremesa, Entrada)
- **Imagem** - Upload de arquivo com validação

---

## 🛠️ Troubleshooting

### Erro: "ENOTDIR" na pasta uploads

**Solução:** As pastas foram criadas automaticamente. Se o erro persistir, crie manualmente:

```bash
mkdir -p backend/uploads/{jpgFiles,pngFiles,pdfFiles}
```

### Erro: "Cannot POST /upload"

**Solução:** Certifique-se de que:
1. O servidor backend está rodando na porta 3000
2. O arquivo `.env` está configurado corretamente
3. O multer está importado nas rotas

### Imagens não aparecem

**Solução:**
1. Verifique o caminho no banco de dados
2. Certifique-se de que `app.use("/uploads", ...)` está no `app.js`
3. Teste direto: `http://localhost:3000/uploads/jpgFiles/nome_arquivo.jpg`

### Erro de conexão com banco

**Solução:**
1. Verifique credenciais no `.env`
2. Certifique-se que MySQL está rodando
3. Execute o script SQL para criar a tabela

---

## 📚 Arquivos Modificados/Criados

### ✅ Criados
- `frontend/cadastro.html` - Página de cadastro
- `frontend/src/scripts/cadastro.js` - Script de integração
- `frontend/src/styles/cadastro.css` - Estilos
- `backend/uploads/` - Pasta de uploads

### ✅ Modificados
- `backend/src/app.js` - Adicionado suporte a arquivos estáticos
- `backend/src/routes/index.js` - Adicionada rota de upload
- `backend/src/controllers/ProdutoController.js` - Novo método `cadastrarComImagem`
- `backend/src/services/ProdutoService.js` - Suporte a campo imagem
- `backend/src/repositories/ProdutoRepository.js` - Suporte a campo imagem

---

## 🎯 Próximos Passos

1. ✅ Testar o cadastro de produtos
2. ✅ Verificar uploads de imagens
3. ⭐ Implementar edição de produtos
4. ⭐ Adicionar filtro por categoria
5. ⭐ Implementar busca de produtos
6. ⭐ Adicionar autenticação de admin

---

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação:
- Express.js: https://expressjs.com
- Multer: https://github.com/expressjs/multer
- MySQL2: https://github.com/sidorares/node-mysql2

---

**Última atualização:** 2024
**Status:** ✅ Funcional e Pronto para Usar
