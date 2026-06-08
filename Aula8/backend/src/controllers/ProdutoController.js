const ProdutoService = require('../services/ProdutoService');

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

        async uploadImagem (req, res) {

    const files = req.files && req.files.length ? req.files : (req.file ? [req.file] : []);

    if (!files || files.length === 0) {
      return res.status(400).json({
        message: 'Arquivo inválido'
      });
    }

    const arquivos = files.map(f => ({
      fieldname: f.fieldname,
      filename: f.filename,
      path: f.path
    }));

    return res.status(200).json({
      message: arquivos.length > 1 ? 'Arquivos enviados com sucesso' : 'Arquivo enviado com sucesso',
      arquivos
    })}

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
