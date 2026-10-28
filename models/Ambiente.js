const mongoose = require('mongoose');

const AmbienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  bloco: String,
  capacidade: { type: Number, required: true },
  tipo: { 
    type: String, 
    enum: ['sala_aula', 'auditorio', 'laboratorio'], 
    required: true 
  },
  recursos: [String],
  ativo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Ambiente', AmbienteSchema);