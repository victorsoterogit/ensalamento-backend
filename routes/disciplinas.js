const express = require('express');
const router = express.Router();
const Disciplina = require('../models/Disciplina');

router.get('/', async (req, res) => {
  res.json(await Disciplina.find());
});

router.post('/', async (req, res) => {
  try {
    const d = await Disciplina.create(req.body);
    res.status(201).json(d);
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

module.exports = router;