const express = require('express');
const router = express.Router();
const Servidor = require('../models/servidor.model');

// CREATE
router.post('/', async (req, res) => {
  const { nome, email, senha } = req.body;

  await Servidor.create({ nome, email, senha });

  res.redirect('/servidores/list');
});

// READ
router.get('/list', async (req, res) => {
  const servidores = await Servidor.findAll({ raw: true });
  res.render('listarServidores', { servidores });
});

// EDIT FORM
router.get('/:id/edit', async (req, res) => {
  const servidor = await Servidor.findByPk(req.params.id, { raw: true });
  res.render('editarServidor', { servidor });
});

// UPDATE
router.post('/update', async (req, res) => {
  const { id, nome, email, senha } = req.body;

  const servidor = await Servidor.findByPk(id);

  servidor.nome = nome;
  servidor.email = email;
  servidor.senha = senha;

  await servidor.save();

  res.redirect('/servidores/list');
});

// DELETE
router.post('/delete', async (req, res) => {
  await Servidor.destroy({
    where: { id: req.body.id }
  });

  res.redirect('/servidores/list');
});

module.exports = router;