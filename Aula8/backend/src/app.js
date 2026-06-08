const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors');
const routes = require("./routes");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Permite requisições do frontend (CORS)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

// Servir arquivos estáticos da pasta de uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/", routes);

module.exports = app;
