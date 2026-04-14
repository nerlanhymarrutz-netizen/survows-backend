const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  telefone: {
    type: String,
    trim: true
  },
  empresa: {
    type: String,
    trim: true
  },
  servico: {
    type: String,
    enum: ['ecommerce', 'portfolio', 'webapp', 'landing', 'outro'],
    required: true
  },
  orcamento: {
    type: String,
    enum: ['ate-5000', '5000-10000', '10000-20000', '20000-50000', 'acima-50000'],
    required: true
  },
  mensagem: {
    type: String,
    required: true
  },
  lido: {
    type: Boolean,
    default: false
  },
  respondido: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageSchema);
