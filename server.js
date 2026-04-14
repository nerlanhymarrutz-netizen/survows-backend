const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/database');
const config = require('./src/config');

// Carregar variáveis de ambiente
require('dotenv').config();

// Conectar ao banco de dados
connectDB();

const app = express();

// Configuração CORS mais permissiva para desenvolvimento
app.use(cors({
  origin: config.corsOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging para debug
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Rotas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/messages', require('./src/routes/messages'));

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'API Survows está funcionando!',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// Frontend está hospedado no Netlify separadamente
// Servir arquivos estáticos do frontend em produção (COMENTADO)
// if (config.nodeEnv === 'production') {
//   app.use(express.static(path.join(__dirname, '../../frontend/build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../../frontend/build', 'index.html'));
//   });
// }

// Tratamento de erros 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Iniciar servidor
app.listen(config.port, () => {
  console.log(`\n🚀 Servidor rodando na porta ${config.port}`);
  console.log(`📍 Backend: ${config.backendUrl}`);
  console.log(`🔗 Frontend permitido: ${config.frontendUrl}`);
  console.log(`🌍 Ambiente: ${config.nodeEnv}`);
  console.log(`📡 API Health: ${config.backendUrl}/api/health\n`);
});