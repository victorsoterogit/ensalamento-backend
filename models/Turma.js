const mongoose = require('mongoose');

const TurmaSchema = new mongoose.Schema({
  codigo: { type: String, required: true },
  disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true },
  professor: String,
  semestre: { type: Number, required: true },
  ano: { type: Number, required: true },
  numeroAlunos: { type: Number, required: true },
  horarios: [{
    diaSemana: { type: Number, enum: [1,2,3,4,5,6] },
    horaInicio: String,
    horaFim: String
  }],
  ambienteAlocado: { type: mongoose.Schema.Types.ObjectId, ref: 'Ambiente', default: null },
  status: { type: String, enum: ['pendente', 'alocada', 'sem_espaco'], default: 'pendente' }
});

module.exports = mongoose.model('Turma', TurmaSchema);