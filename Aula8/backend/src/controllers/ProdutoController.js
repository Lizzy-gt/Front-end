const ProdutoService = require('../services/ProdutoService');
const path = require('path');

class ProdutoController {
    async listar(req, res) {
        try {
            const resultado = await ProdutoService.listarProdutos();
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async buscarPorId(req, res) {
        try {
            const resultado = await ProdutoService.buscarProdutoPorId(req.params.id);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async uploadImagem(req, res) {
        const files = req.files && req.files.length ? req.files : (req.file ? [req.file] : []);

        if (!files || files.length === 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Arquivo inválido'
            });
        }

        const arquivos = files.map(f => ({
            fieldname: f.fieldname,
            filename: f.filename,
            path: f.path
        }));

        return res.status(200).json({
            sucesso: true,
            mensagem: arquivos.length > 1 ? 'Arquivos enviados com sucesso' : 'Arquivo enviado com sucesso',
            arquivos
        });
    }

    async cadastrarComImagem(req, res) {
        try {
            const { nome, descricao, preco, categoria } = req.body;
            const file = req.file;

            // Validar dados obrigatórios
            if (!nome || !descricao || !preco) {
                if (file) {
                    // Se houver erro, deletar arquivo temporário se necessário
                }
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Nome, descrição e preço são obrigatórios"
                });
            }

            // Preparar caminho relativo da imagem
            let caminhoImagem = null;
            if (file) {
                const relativePath = path.relative(path.join(__dirname, '../../'), file.path).replace(/\\/g, '/');
                caminhoImagem = relativePath.startsWith('uploads/')
                    ? relativePath
                    : `uploads/${relativePath}`;
            }

            const novoProduto = {
                nome,
                descricao,
                preco: parseFloat(preco),
                categoria: categoria || null,
                imagem: caminhoImagem
            };

            const resultado = await ProdutoService.cadastrarProduto(novoProduto);
            res.status(201).json(resultado);
        } catch (erro) {
            console.error('Erro ao cadastrar produto:', erro);
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro ao cadastrar produto",
                erro: erro.stack || erro
            });
        }
    }

    async cadastrar(req, res) {
        try {
            const resultado = await ProdutoService.cadastrarProduto(req.body);
            res.status(201).json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async atualizar(req, res) {
        try {
            const resultado = await ProdutoService.atualizarProduto(req.params.id, req.body);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }

    async deletar(req, res) {
        try {
            const resultado = await ProdutoService.deletarProduto(req.params.id);
            res.json(resultado);
        } catch (erro) {
            res.status(erro.status || 500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro.stack || erro
            });
        }
    }
}

module.exports = new ProdutoController();
