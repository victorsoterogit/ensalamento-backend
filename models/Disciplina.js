const mongoose = require('mongoose');

const DisciplinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  codigo: { type: String, unique: true },
  tipoAula: { type: String, enum: ['teorica', 'pratica', 'mista'], default: 'teorica' }
});

module.exports = mongoose.model('Disciplina', DisciplinaSchema);