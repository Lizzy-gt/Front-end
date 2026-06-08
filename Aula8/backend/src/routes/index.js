const express = require("express");
const router = express.Router();
const produtoRoutes = require("./produtoRoutes");
const produtoController = require("../controllers/produtoController");
const upload = require("../config/multer");

router.get("/", (req, res) => {
  res.json({
    mensagem: "API SABOR DIGITAL",
    versao: "5.0.8",
  });
});

router.post("/upload", (req, res) => {
  upload.array("arquivo", 5)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ sucesso: false, mensagem: err.message });
    }
    return produtoController.uploadImagem(req, res);
  });
});

router.use("/produtos", produtoRoutes); //Diversas rotas diferente e precisa de um arquivo que centraliza os end points

module.exports = router;
