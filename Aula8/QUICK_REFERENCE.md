# ⚡ Quick Reference - Comandos e Atalhos

## 🚀 Inicializar Projeto

### Backend - Primeira Vez
```bash
cd backend
npm install
cp .env.example .env
# Edite .env com suas credenciais
npm start
```

### Frontend - Servir Localmente
```bash
# Opção 1: Python 3
python -m http.server 8000

# Opção 2: Node (http-server)
npx http-server frontend -p 8000

# Opção 3: Node.js simples
node -e "require('http').createServer((req, res) => { require('fs').readFile('./frontend' + req.url, (e, d) => res.end(d)) }).listen(8000)"
```

---

## 🔗 URLs de Acesso

| Recurso | URL |
|---------|-----|
| Página de Cadastro | `http://localhost:8000/cadastro.html` |
| API Base | `http://localhost:3000` |
| Listar Produtos | `http://localhost:3000/produtos` |
| Upload de Arquivo | `POST http://localhost:3000/upload` |
| Arquivos de Upload | `http://localhost:3000/uploads/jpgFiles/` |

---

## 📡 Endpoints da API

### Produtos (CRUD)

```bash
# GET - Listar todos
curl http://localhost:3000/produtos

# GET - Por ID
curl http://localhost:3000/produtos/1

# POST - Criar (sem imagem)
curl -X POST http://localhost:3000/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Pizza","descricao":"...","preco":45.90,"categoria":"Prato"}'

# POST - Criar COM imagem (MultiPart)
curl -X POST http://localhost:3000/upload \
  -F "nome=Pizza" \
  -F "descricao=Pizza clássica" \
  -F "preco=45.90" \
  -F "categoria=Prato" \
  -F "arquivo=@pizza.jpg"

# PUT - Atualizar
curl -X PUT http://localhost:3000/produtos/1 \
  -H "Content-Type: application/json" \
  -d '{"preco":55.90}'

# DELETE - Deletar
curl -X DELETE http://localhost:3000/produtos/1
```

---

## 🗄️ Comandos MySQL

### Setup Inicial

```sql
-- Criar banco
CREATE DATABASE sabor_digital;
USE sabor_digital;

-- Criar tabela (copiar de MIGRATION.md)
CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100),
    imagem VARCHAR(500),
    disponivel BOOLEAN DEFAULT true,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Verificar tabela
DESCRIBE produto;
```

### Consultas Úteis

```sql
-- Listar tudo
SELECT * FROM produto;

-- Contar
SELECT COUNT(*) FROM produto;

-- Por categoria
SELECT * FROM produto WHERE categoria = 'Prato';

-- Buscar imagens nulas
SELECT * FROM produto WHERE imagem IS NULL;

-- Atualizar preço
UPDATE produto SET preco = 55.90 WHERE id = 1;

-- Deletar
DELETE FROM produto WHERE id = 1;

-- Buscar por padrão
SELECT * FROM produto WHERE nome LIKE '%pizza%';
```

---

## 📁 Estrutura de Pastas

```bash
# Criar pastas de upload
mkdir -p backend/uploads/{jpgFiles,pngFiles,pdfFiles}

# Listar conteúdo
ls -la backend/uploads/jpgFiles/

# Limpar uploads (cuidado!)
rm -rf backend/uploads/jpgFiles/*
```

---

## 🛠️ Arquivos de Configuração

### .env (Backend)
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=sabor_digital
DB_PORT=3306
PORT=3000
NODE_ENV=development
```

### package.json (Backend)
```json
{
  "name": "sabor-digital-api",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^5.2.1",
    "multer": "^2.1.1",
    "mysql2": "^3.22.3",
    "dotenv": "^17.4.2"
  }
}
```

---

## 🧪 Testar Localmente

### Com REST Client (VS Code)

1. Instale extensão "REST Client"
2. Abra `API_TEST.http`
3. Clique em "Send Request" ao lado de cada endpoint

### Com Postman

1. Importe os endpoints
2. Configure o ambiente com `http://localhost:3000`
3. Execute requisições

### Com cURL (Terminal)

```bash
# Copie os comandos de QUICK_REFERENCE.md
curl -X GET http://localhost:3000/produtos
```

---

## 🔧 Troubleshooting Rápido

### Problema: Port em uso
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <pid> /F

# macOS/Linux
lsof -i :3000
kill -9 <pid>
```

### Problema: Multer erro
```bash
# Verifique permissões da pasta
chmod 755 backend/uploads -R

# Recrie pasta
rm -rf backend/uploads
mkdir -p backend/uploads/{jpgFiles,pngFiles,pdfFiles}
```

### Problema: Banco não conecta
```bash
# Verifique credenciais
cat backend/.env

# Teste conexão
mysql -u root -p nome_banco -e "SELECT 1;"
```

### Problema: Imagem não aparece
```bash
# Verifique arquivo existe
ls backend/uploads/jpgFiles/

# Teste URL direto
curl http://localhost:3000/uploads/jpgFiles/1234567890-imagem.jpg
```

---

## 📊 Verificar Saúde do Sistema

```bash
# Verificar se Node rodando
ps aux | grep node

# Verificar se MySQL rodando
ps aux | grep mysql

# Verificar portas abertas
netstat -tuln | grep 3000  # Backend
netstat -tuln | grep 8000  # Frontend

# Verificar espaço disco
df -h backend/uploads/

# Verificar tamanho dos uploads
du -sh backend/uploads/
```

---

## 🎯 Checklist de Deploy

```bash
# 1. Verificar dependências
node --version  # v14+
npm --version   # v6+
mysql --version # v5.7+

# 2. Verificar pastas
ls -la backend/uploads/
ls -la frontend/

# 3. Verificar banco
mysql -u root -p sabor_digital -e "DESCRIBE produto;"

# 4. Verificar .env
cat backend/.env  # Não deve ter valores padrão

# 5. Instalar e iniciar
cd backend
npm install
npm start

# 6. Testar em outra aba
curl http://localhost:3000/

# 7. Servir frontend
npx http-server frontend -p 8000
```

---

## 🚨 Logs Importantes

### Onde encontrar erros

```bash
# Backend (stdout)
# Verificar saída do npm start

# Frontend (Console)
# F12 > Console > Filtrar erros

# Banco (MySQL)
# Consultar SHOW ENGINE INNODB STATUS;

# Sistema de Arquivos
# ls -la backend/uploads/jpgFiles/
# tail -f backend/uploads/error.log
```

---

## 📚 Documentação Rápida

| Arquivo | Propósito |
|---------|-----------|
| README.md | Visão geral |
| CADASTRO_SETUP.md | Setup detalhado |
| MIGRATION.md | Scripts SQL |
| FLUXO_INTEGRACAO.md | Diagrama visual |
| API_TEST.http | Exemplos de testes |
| RESUMO_IMPLEMENTACAO.md | O que foi feito |
| **QUICK_REFERENCE.md** | **Este arquivo!** |

---

## 🎓 Exemplos de Integração

### JavaScript no Frontend

```javascript
// Upload com imagem
const formData = new FormData();
formData.append('nome', 'Pizza');
formData.append('descricao', 'Deliciosa');
formData.append('preco', 45.90);
formData.append('categoria', 'Prato');
formData.append('arquivo', fileInput.files[0]);

fetch('http://localhost:3000/upload', {
  method: 'POST',
  body: formData
})
.then(r => r.json())
.then(d => console.log(d));
```

### Node.js no Backend

```javascript
// Multer middleware
const upload = require('./config/multer');

router.post('/upload', upload.single('arquivo'), (req, res) => {
  console.log(req.file);      // Arquivo
  console.log(req.body);      // Dados
  // Processar...
  res.json({ sucesso: true });
});
```

### SQL no Banco

```sql
-- Inserir com imagem
INSERT INTO produto 
(nome, descricao, preco, categoria, imagem) 
VALUES 
('Pizza', 'Clássica', 45.90, 'Prato', 'uploads/jpgFiles/1234567890-pizza.jpg');

-- Buscar com imagem
SELECT id, nome, preco, imagem FROM produto WHERE imagem IS NOT NULL;
```

---

## ⌨️ Atalhos Úteis

### Terminal

```bash
# VS Code Terminal
Ctrl+` (Windows/Linux)
Cmd+` (macOS)

# Novo terminal
Ctrl+Shift+` (Windows/Linux)
Cmd+Shift+` (macOS)

# Split terminal
Ctrl+\ (Windows/Linux)
Cmd+\ (macOS)
```

### VS Code

```bash
# Abrir arquivo rápido
Ctrl+P

# Buscar em arquivos
Ctrl+Shift+F

# Ir para linha
Ctrl+G

# Format documento
Shift+Alt+F

# Expandir seleção
Shift+Alt+→

# Comentar linha
Ctrl+/
```

---

## 📈 Performance

### Otimizações Implementadas

```sql
-- Índice em categoria (MIGRATION.md)
CREATE INDEX idx_categoria ON produto(categoria);

-- Índice em criado_em
CREATE INDEX idx_criado_em ON produto(criado_em);
```

### Dicas de Performance

```javascript
// Lazy loading de imagens
<img loading="lazy" src="..." />

// Cache de produtos
localStorage.setItem('produtos', JSON.stringify(data));

// Debounce em busca
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

---

## 🔐 Segurança

### Validações Implementadas

```javascript
// Frontend
- Tipo de arquivo (imagem)
- Tamanho de arquivo (5MB)
- Campos obrigatórios
- Preço positivo

// Backend
- Validação de extensão
- Validação de tipo MIME
- Prepared statements
- Sanitização de path
- Limites de requisição
```

---

## 🌐 CORS

Se receber erro CORS, adicione ao `app.js`:

```javascript
const cors = require('cors');
app.use(cors());
```

E instale: `npm install cors`

---

## 📞 Ajuda Rápida

- **Não conecta ao banco?** → Verifique `.env`
- **Porta em uso?** → Mude `PORT` em `.env`
- **Arquivo não salva?** → Verifique permissões de pasta
- **Imagem não aparece?** → Verifique caminho no banco
- **API não responde?** → Verifique `npm start`

---

**Última atualização:** 2024
**Versão:** 1.0

---

🚀 **Dica:** Salve este arquivo como favorito para referência rápida!
