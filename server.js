const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conectar MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Banco conectado!'))
  .catch(err => console.log('❌ Erro BD:', err));

// Rotas
app.use('/api/ambientes', require('./routes/ambientes'));
app.use('/api/turmas', require('./routes/turmas'));
app.use('/api/alocacao', require('./routes/alocacao'));

app.get('/', (req, res) => res.send('API do Sistema de Ensalamento 🎓'));

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));