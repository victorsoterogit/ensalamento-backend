const express = require('express');
const router = express.Router();
const Ambiente = require('../models/Ambiente');

// Listar todos
router.get('/', async (req, res) => {
  const lista = await Ambiente.find({ ativo: true });
  res.json(lista);
});

// Cadastrar
router.post('/', async (req, res) => {
  try {
    const amb = await Ambiente.create(req.body);
    res.status(201).json(amb);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

module.exports = router;