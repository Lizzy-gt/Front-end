# Guia de Migração do Banco de Dados

## SQL para Criar Tabela de Produtos com Suporte a Imagens

```sql
USE sabor_digital;

DROP TABLE IF EXISTS produto;

CREATE TABLE produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100),
    imagem VARCHAR(500),
    disponivel BOOLEAN DEFAULT true,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_categoria (categoria),
    INDEX idx_criado_em (criado_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir alguns produtos de exemplo
INSERT INTO produto (nome, descricao, preco, categoria, disponivel) VALUES
('Pizza Margherita', 'Pizza clássica com tomate fresco, mozzarella e manjericão', 45.90, 'Prato', true),
('Refrigerante Coca-Cola', 'Lata de 350ml', 8.50, 'Bebida', true),
('Pudim de Leite Condensado', 'Pudim caseiro feito com leite condensado', 12.00, 'Sobremesa', true),
('Bruschetta de Tomate', 'Pão tostado com tomate, alho e azeite', 18.90, 'Entrada', true);
```

## Estrutura da Tabela

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INT | ID único do produto (auto incremento) |
| `nome` | VARCHAR(255) | Nome do produto |
| `descricao` | TEXT | Descrição detalhada |
| `preco` | DECIMAL(10,2) | Preço com 2 casas decimais |
| `categoria` | VARCHAR(100) | Categoria do produto |
| `imagem` | VARCHAR(500) | Caminho da imagem no servidor |
| `disponivel` | BOOLEAN | Status de disponibilidade |
| `criado_em` | TIMESTAMP | Data de criação |
| `atualizado_em` | TIMESTAMP | Data de última atualização |

## Atualizar Tabela Existente

Se você já possui a tabela sem o campo `imagem`, execute:

```sql
ALTER TABLE produto ADD COLUMN imagem VARCHAR(500) AFTER categoria;
```

## Verificar Estrutura

```sql
DESCRIBE produto;
```

## Exemplo de Consultas Úteis

### Listar todos os produtos
```sql
SELECT * FROM produto ORDER BY criado_em DESC;
```

### Buscar por categoria
```sql
SELECT * FROM produto WHERE categoria = 'Prato' AND disponivel = true;
```

### Contar produtos por categoria
```sql
SELECT categoria, COUNT(*) as total FROM produto GROUP BY categoria;
```

### Atualizar preço de um produto
```sql
UPDATE produto SET preco = 55.90 WHERE id = 1;
```

### Verificar espaço em disco usado por imagens
```sql
SELECT 
    COUNT(*) as total_produtos,
    SUM(CHAR_LENGTH(imagem)) as tamanho_caracteres
FROM produto
WHERE imagem IS NOT NULL;
```
