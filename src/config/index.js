require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  frontendUrl: process.env.FRONTEND_URL || 'https://www.survows.com',
  backendUrl: process.env.BACKEND_URL || 'https://survows-backend.onrender.com',
  
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/survows',
  
  jwtSecret: process.env.JWT_SECRET || 'survows_default_secret_change_me',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  
  corsOrigins: process.env.NODE_ENV === 'production' 
    ? [
        process.env.FRONTEND_URL || 'https://www.survows.com',
        'https://www.survows.com',
        'https://survows.com',  // ← ADICIONE ESTA LINHA
        'https://survows.netlify.app'  // Opcional, para compatibilidade
      ]
    : ['http://localhost:3000', 'http://localhost:3001'],
  
  maxFileSize: 10 * 1024 * 1024,
};

module.exports = config;
