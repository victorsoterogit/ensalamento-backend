const express = require('express');
const router = express.Router();
const Turma = require('../models/Turma');
const Ambiente = require('../models/Ambiente');

function horariosConflitam(hAlvo, horariosExistentes) {
  for (const h of horariosExistentes) {
    if (h.diaSemana !== hAlvo.diaSemana) continue;
    const ini1 = hAlvo.horaInicio, fim1 = hAlvo.horaFim;
    const ini2 = h.horaInicio, fim2 = h.horaFim;
    if (ini1 < fim2 && fim1 > ini2) return true;
  }
  return false;
}

router.post('/executar', async (req, res) => {
  try {
    const turmas = await Turma.find({}).populate('disciplina');
    const ambientes = await Ambiente.find({ ativo: true }).sort({ capacidade: 1 });

    await Turma.updateMany({}, { ambienteAlocado: null, status: 'pendente' });

    const resultado = { alocadas: 0, semEspaco: 0, detalhes: [] };

    for (const turma of turmas) {
      let tiposAceitos = ['sala_aula', 'auditorio', 'laboratorio'];
      if (turma.disciplina?.tipoAula === 'pratica') {
        tiposAceitos = ['laboratorio'];
      }

      const candidatos = ambientes.filter(
        amb => amb.capacidade >= turma.numeroAlunos && tiposAceitos.includes(amb.tipo)
      );

      let ambienteIdeal = null;
      for (const amb of candidatos) {
        const ocupadas = await Turma.find({ ambienteAlocado: amb._id, status: 'alocada' });
        let conflito = false;
        for (const hTurma of turma.horarios) {
          for (const ocup of ocupadas) {
            if (horariosConflitam(hTurma, ocup.horarios)) {
              conflito = true;
              break;
            }
          }
          if (conflito) break;
        }
        if (!conflito) {
          ambienteIdeal = amb;
          break;
        }
      }

      if (ambienteIdeal) {
        turma.ambienteAlocado = ambienteIdeal._id;
        turma.status = 'alocada';
        resultado.alocadas++;
        resultado.detalhes.push({ turma: turma.codigo, ambiente: ambienteIdeal.nome });
      } else {
        turma.status = 'sem_espaco';
        resultado.semEspaco++;
        resultado.detalhes.push({ turma: turma.codigo, problema: 'Sem espaço' });
      }
      await turma.save();
    }

    res.json(resultado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

module.exports = router;