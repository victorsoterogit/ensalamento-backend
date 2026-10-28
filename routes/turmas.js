const express = require('express');
const router = express.Router();
const Turma = require('../models/Turma');

router.get('/', async (req, res) => {
  const lista = await Turma.find().populate('disciplina');
  res.json(lista);
});

router.post('/', async (req, res) => {
  try {
    const turma = await Turma.create(req.body);
    res.status(201).json(turma);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

module.exports = router;