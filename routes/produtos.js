//cod tiago
const express = require('express');

const router = express.Router();

let produtos = [];
let proximoId = 1;

router.post('/', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ mensagem: 'Nome e preco sao obrigatorios.' });
  }

  const produto = {
    id: proximoId++,
    nome,
    preco,
  };

  produtos.push(produto);
  return res.status(201).json(produto);
});

router.get('/', (req, res) => {
  return res.json(produtos);
});

router.put('/:id', (req, res) => {
  const produto = produtos.find((item) => item.id === Number(req.params.id));

  if (!produto) {
    return res.status(404).json({ mensagem: 'Produto nao encontrado.' });
  }

  const { nome, preco } = req.body;

  if (nome) {
    produto.nome = nome;
  }

  if (preco) {
    produto.preco = preco;
  }

  return res.json(produto);
});

router.delete('/:id', (req, res) => {
  const tamanhoInicial = produtos.length;
  produtos = produtos.filter((item) => item.id !== Number(req.params.id));

  if (produtos.length === tamanhoInicial) {
    return res.status(404).json({ mensagem: 'Produto nao encontrado.' });
  }

  return res.json({ mensagem: 'Produto removido com sucesso.' });
});

module.exports = router;
