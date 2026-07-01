const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const produtos = require("../routes/produtos");
app.use("/produtos", produtos);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
