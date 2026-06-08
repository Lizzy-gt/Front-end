#!/bin/bash
# Script de Instalação Completa - Sistema de Cadastro com Multer
# Execute este script para configurar tudo automaticamente

echo "=========================================="
echo "  Instalação do Sistema de Cadastro"
echo "=========================================="
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado!"
    echo "Baixe em: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js versão: $(node --version)"
echo ""

# Navegar para pasta backend
cd backend || exit

echo "📦 Instalando dependências do backend..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependências instaladas com sucesso!"
else
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo ""
echo "📁 Criando pastas de upload..."
mkdir -p uploads/{jpgFiles,pngFiles,pdfFiles}
echo "✅ Pastas criadas!"

echo ""
echo "⚙️  Configurando .env..."

if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Arquivo .env criado com sucesso!"
    echo "   ⚠️  IMPORTANTE: Edite o arquivo .env com suas configurações de banco!"
else
    echo "ℹ️  Arquivo .env já existe"
fi

echo ""
echo "=========================================="
echo "  ✅ Instalação Concluída!"
echo "=========================================="
echo ""
echo "📝 Próximos passos:"
echo ""
echo "1️⃣  Edite o arquivo 'backend/.env' com as credenciais do seu banco:"
echo "   DB_HOST, DB_USER, DB_PASSWORD, DB_NAME"
echo ""
echo "2️⃣  Execute o script SQL em MIGRATION.md para criar a tabela"
echo ""
echo "3️⃣  Inicie o servidor backend:"
echo "   cd backend"
echo "   npm start"
echo ""
echo "4️⃣  Em outro terminal, sirva o frontend:"
echo "   npx http-server frontend -p 8000"
echo ""
echo "5️⃣  Abra no navegador:"
echo "   http://localhost:8000/cadastro.html"
echo ""
echo "📚 Leia CADASTRO_SETUP.md para mais informações"
echo "=========================================="
