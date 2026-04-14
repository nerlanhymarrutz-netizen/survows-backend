const express = require('express');
const Message = require('../models/Message');
const auth = require('../middleware/auth');
const router = express.Router();

// Listar todas as mensagens (protegido)
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar mensagens' });
  }
});

// Obter uma mensagem específica (protegido)
router.get('/:id', auth, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Mensagem não encontrada' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar mensagem' });
  }
});

// Criar nova mensagem (público - vem do formulário do site)
router.post('/', async (req, res) => {
  try {
    const { nome, email, telefone, empresa, servico, orcamento, mensagem } = req.body;

    const newMessage = new Message({
      nome,
      email,
      telefone,
      empresa,
      servico,
      orcamento,
      mensagem
    });

    await newMessage.save();
    res.status(201).json({ message: 'Mensagem enviada com sucesso!', data: newMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar mensagem' });
  }
});

// Marcar mensagem como lida (protegido)
router.put('/:id/read', auth, async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { lido: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: 'Mensagem não encontrada' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar mensagem' });
  }
});

// Excluir mensagem (protegido)
router.delete('/:id', auth, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Mensagem não encontrada' });
    }
    res.json({ message: 'Mensagem excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir mensagem' });
  }
});

module.exports = router;
