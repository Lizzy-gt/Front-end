# 🍕 Sabor Digital - Sistema de Cadastro com Multer

> Sistema completo de cadastro de produtos com upload de imagens integrado ao backend

## 🎯 Visão Geral

Sistema full-stack para gerenciamento de cardápio de restaurante com:
- ✅ Frontend responsivo com upload de imagens
- ✅ Backend com Node.js/Express
- ✅ Integração com Multer para upload
- ✅ Banco de dados MySQL
- ✅ CRUD completo de produtos

---

## 📁 Estrutura do Projeto

```
Aula8/
├── 📄 CADASTRO_SETUP.md          ← Guia de configuração (LEIA ISTO!)
├── 📄 FLUXO_INTEGRACAO.md        ← Fluxo de dados visual
├── 📄 MIGRATION.md               ← Scripts SQL para banco
├── 📄 API_TEST.http              ← Testes de API (REST Client)
├── 📄 install.sh                 ← Script de instalação automática
├── 📄 README.md                  ← Este arquivo
│
├── 📂 frontend/
│   ├── 📄 cadastro.html          ⭐ Página de cadastro (NOVO!)
│   ├── 📄 index.html
│   ├── 📄 pedido.html
│   │
│   └── 📂 src/
│       ├── 📂 scripts/
│       │   ├── 📄 cadastro.js    ⭐ Script de integração (NOVO!)
│       │   ├── 📄 api.js
│       │   ├── 📄 main.js
│       │   └── 📄 pedido.js
│       │
│       ├── 📂 styles/
│       │   ├── 📄 cadastro.css   ⭐ Estilos do cadastro (NOVO!)
│       │   ├── 📄 style.css
│       │   ├── 📄 global.css
│       │   └── 📄 pedidos.css
│       │
│       └── 📂 img/
│
└── 📂 backend/
    ├── 📄 package.json
    ├── 📄 .env.example           ⭐ Exemplo de variáveis (NOVO!)
    ├── 📄 .gitignore             ⭐ Ignore de arquivos (NOVO!)
    │
    ├── 📂 uploads/               ⭐ Pasta de uploads (NOVA!)
    │   ├── 📂 jpgFiles/
    │   ├── 📂 pngFiles/
    │   └── 📂 pdfFiles/
    │
    └── 📂 src/
        ├── 📄 app.js             ✏️ Modificado (suporte a arquivos estáticos)
        ├── 📄 server.js
        │
        ├── 📂 config/
        │   ├── 📄 database.js
        │   └── 📄 multer.js
        │
        ├── 📂 controllers/
        │   ├── 📄 ProdutoController.js ✏️ Modificado (novo método)
        │   ├── 📄 CardapioController.js
        │   └── 📄 PedidoController.js
        │
        ├── 📂 services/
        │   ├── 📄 ProdutoService.js    ✏️ Modificado (suporte a imagem)
        │   ├── 📄 CardapioService.js
        │   └── 📄 PedidoService.js
        │
        ├── 📂 repositories/
        │   ├── 📄 ProdutoRepository.js ✏️ Modificado (suporte a imagem)
        │   ├── 📄 CardapioRepository.js
        │   └── 📄 PedidoRepository.js
        │
        └── 📂 routes/
            ├── 📄 index.js            ✏️ Modificado (nova rota /upload)
            ├── 📄 produtoRoutes.js
            ├── 📄 cardapioRoutes.js
            └── 📄 pedidoRoutes.js
```

**Legenda:**
- ⭐ **NOVO** - Arquivo criado
- ✏️ **MODIFICADO** - Arquivo existente que foi alterado

---

## 🚀 Quick Start (5 minutos)

### 1. Clonar/Acessar o Projeto
```bash
cd "Aula8"
```

### 2. Configurar Banco de Dados

**Opção A: MySQL GUI (phpMyAdmin, Workbench)**
- Copie o SQL de `MIGRATION.md`
- Cole no seu cliente MySQL
- Execute

**Opção B: Linha de comando**
```bash
mysql -u root -p < MIGRATION.md
```

### 3. Configurar Backend
```bash
cd backend
cp .env.example .env
# Edite o arquivo .env com suas credenciais
npm install
npm start
```

O servidor estará em `http://localhost:3000`

### 4. Servir Frontend
```bash
# Em outro terminal
npx http-server frontend -p 8000
```

Abra `http://localhost:8000/cadastro.html`

---

## ✨ Funcionalidades

### 📝 Frontend (cadastro.html)

| Feature | Descrição |
|---------|-----------|
| 📋 Formulário | Campos: Nome, Descrição, Preço, Categoria |
| 🖼️ Upload | Drag-and-drop ou clique para selecionar |
| 👁️ Preview | Visualização em tempo real da imagem |
| 📱 Responsivo | Funciona em desktop, tablet e mobile |
| 📊 Listagem | Exibe todos os produtos cadastrados |
| 🔄 Dinâmico | Recarrega lista após cada ação |
| ✅ Validação | Valida campos antes de enviar |
| 💬 Feedback | Mensagens de sucesso/erro visual |

### 🔌 Backend (API REST)

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/produtos` | GET | Lista todos os produtos |
| `/produtos/:id` | GET | Busca um produto |
| `/produtos` | POST | Cria produto (sem imagem) |
| `/produtos/:id` | PUT | Atualiza produto |
| `/produtos/:id` | DELETE | Deleta produto |
| **`/upload`** | **POST** | **Cria produto COM imagem** ⭐ |
| `/upload-multiplo` | POST | Upload de múltiplos arquivos |

---

## 🔄 Fluxo de Funcionamento

```
1. Usuário acessa cadastro.html
   ↓
2. Preenche formulário + seleciona imagem
   ↓
3. Clica em "Cadastrar"
   ↓
4. Frontend valida dados
   ↓
5. Envia FormData para POST /upload
   ↓
6. Multer intercepta e salva arquivo
   ↓
7. Controller recebe arquivo + dados
   ↓
8. Service processa e valida
   ↓
9. Repository salva no banco
   ↓
10. Frontend carrega lista atualizada
    ↓
11. Imagem é servida pelo Express (uploads/)
    ↓
12. Produto aparece com imagem na lista
```

Ver [FLUXO_INTEGRACAO.md](FLUXO_INTEGRACAO.md) para diagrama visual completo.

---

## 🛠️ Arquivos Importantes

### Para Desenvolvedores

| Arquivo | Propósito |
|---------|-----------|
| [CADASTRO_SETUP.md](CADASTRO_SETUP.md) | **📖 Guia completo de setup** |
| [MIGRATION.md](MIGRATION.md) | **🗄️ Scripts SQL do banco** |
| [FLUXO_INTEGRACAO.md](FLUXO_INTEGRACAO.md) | **📊 Fluxo de dados visual** |
| [API_TEST.http](API_TEST.http) | **🧪 Testes de API** |

### Frontend

| Arquivo | Função |
|---------|--------|
| `frontend/cadastro.html` | Estrutura HTML |
| `frontend/src/scripts/cadastro.js` | Lógica e API calls |
| `frontend/src/styles/cadastro.css` | Estilos responsivos |

### Backend

| Arquivo | Função |
|---------|--------|
| `backend/src/controllers/ProdutoController.js` | Lógica de requisições |
| `backend/src/services/ProdutoService.js` | Regras de negócio |
| `backend/src/repositories/ProdutoRepository.js` | Acesso ao banco |
| `backend/src/config/multer.js` | Configuração de upload |
| `backend/src/app.js` | Configuração Express |

---

## 📦 Dependências

### Backend (package.json)
```json
{
  "dependencies": {
    "express": "^5.2.1",
    "multer": "^2.1.1",
    "mysql2": "^3.22.3",
    "dotenv": "^17.4.2"
  }
}
```

### Frontend
- HTML5 Nativo
- CSS3 Nativo
- JavaScript ES6 Nativo
- Sem dependências! ✨

---

## 🔐 Segurança

### Validações Implementadas

✅ **Frontend:**
- Validação de campos obrigatórios
- Validação de tipo de arquivo
- Validação de tamanho de arquivo

✅ **Backend:**
- Validação de extensão de arquivo
- Validação de tipos de dado
- Validação de range de preço
- Tratamento de erros robusto
- Sanitização de caminhos

✅ **Banco de Dados:**
- Prepared statements (evita SQL injection)
- Índices para performance
- Tipos de dados apropriados

---

## 🐛 Troubleshooting

### Problema: "Cannot connect to database"
```bash
# Verifique o arquivo .env
cat backend/.env

# Certifique-se que MySQL está rodando
# Windows: Services > MySQL
# Mac: brew services start mysql
# Linux: systemctl start mysql
```

### Problema: "Imagem não aparece"
```javascript
// Verifique se o Express está servindo arquivos estáticos
// Em app.js deve ter:
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
```

### Problema: "Port 3000 já está em uso"
```bash
# Encontre o processo usando a porta
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Mude a porta no .env
PORT=3001
```

Ver [CADASTRO_SETUP.md](CADASTRO_SETUP.md) para mais troubleshooting.

---

## 📚 Documentação Adicional

1. **[CADASTRO_SETUP.md](CADASTRO_SETUP.md)** - Guia completo de setup e uso
2. **[MIGRATION.md](MIGRATION.md)** - Scripts SQL e estrutura do banco
3. **[FLUXO_INTEGRACAO.md](FLUXO_INTEGRACAO.md)** - Diagrama visual do fluxo
4. **[API_TEST.http](API_TEST.http)** - Exemplos de testes de API

---

## 🎨 Paleta de Cores

```css
--cor-primaria:   #ff6b35  (Laranja)
--cor-secundaria: #004e89  (Azul)
--cor-sucesso:    #28a745  (Verde)
--cor-erro:       #dc3545  (Vermelho)
--cor-aviso:      #ffc107  (Amarelo)
```

---

## 📋 Checklist de Deploy

- [ ] Banco de dados criado e testado
- [ ] Arquivo `.env` configurado
- [ ] Pasta `uploads/` criada
- [ ] Backend iniciado com sucesso
- [ ] Frontend acessível
- [ ] Cadastro funciona
- [ ] Imagens são salvas
- [ ] Imagens são exibidas
- [ ] Deletar funciona
- [ ] Testes de API passam

---

## 🤝 Contribuindo

Para adicionar novas funcionalidades:

1. Crie nova branch: `git checkout -b feature/nova-funcionalidade`
2. Faça suas alterações
3. Teste localmente
4. Atualize documentação
5. Faça commit: `git commit -m "Add: nova funcionalidade"`
6. Push para branch: `git push origin feature/nova-funcionalidade`
7. Abra um Pull Request

---

## 📞 Suporte

Dúvidas sobre:
- **Setup**: Leia [CADASTRO_SETUP.md](CADASTRO_SETUP.md)
- **Banco de dados**: Leia [MIGRATION.md](MIGRATION.md)
- **Integração**: Leia [FLUXO_INTEGRACAO.md](FLUXO_INTEGRACAO.md)
- **Testes de API**: Use [API_TEST.http](API_TEST.http)

---

## 📜 Licença

Projeto de aprendizado SENAI - Liberdade total de uso e modificação

---

## ✅ Status do Projeto

| Componente | Status |
|-----------|--------|
| Frontend Cadastro | ✅ Completo |
| Backend API | ✅ Completo |
| Multer Integration | ✅ Completo |
| MySQL Integration | ✅ Completo |
| Documentação | ✅ Completa |
| Testes | ⏳ Em progresso |
| Edição de Produtos | ⏳ Em progresso |

---

## 🎯 Próximos Passos (Roadmap)

- [ ] Implementar edição de produtos
- [ ] Adicionar filtros por categoria
- [ ] Implementar busca de produtos
- [ ] Adicionar paginação
- [ ] Autenticação de admin
- [ ] Validação de email
- [ ] Envio de emails de confirmação
- [ ] Dark mode
- [ ] PWA (Progressive Web App)

---

**Última atualização:** 2024
**Versão:** 1.0
**Autor:** Sistema de Cadastro - SENAI

---

## 🎓 Aprendizados

Este projeto ensina:

✅ HTML5 semântico e acessível
✅ CSS3 com Grid e Flexbox responsivos
✅ JavaScript ES6+ (async/await, fetch, FormData)
✅ Node.js/Express (rotas, middlewares, handlers)
✅ Multer (upload de arquivos)
✅ MySQL (tabelas, índices, prepared statements)
✅ Padrão MVC (Model-View-Controller)
✅ RESTful API design
✅ CORS e segurança
✅ Versionamento com Git

---

**🚀 Pronto para começar? Leia [CADASTRO_SETUP.md](CADASTRO_SETUP.md)!**
