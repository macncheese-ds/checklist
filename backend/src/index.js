const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const checklistRoutes = require('./routes/checklist');

dotenv.config();
const app = express();

// Configurar CORS para permitir acceso desde red local
app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origin (como aplicaciones móviles o Postman)
    if (!origin) return callback(null, true);
    
    // Permitir localhost y IPs de red local
    const allowedOrigins = [
      /^http:\/\/localhost:\d+$/,
      /^http:\/\/127\.0\.0\.1:\d+$/,
      /^http:\/\/192\.168\.\d+\.\d+:\d+$/,
      /^http:\/\/10\.\d+\.\d+\.\d+:\d+$/,
      /^http:\/\/172\.(1[6-9]|2\d|3[01])\.\d+\.\d+:\d+$/
    ];
    
    if (allowedOrigins.some(pattern => pattern.test(origin))) {
      return callback(null, true);
    }
    
    console.log('🚫 CORS blocked origin:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(bodyParser.json());

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Checklist API funcionando correctamente',
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 8600
  });
});

app.use('/api/checklist', checklistRoutes);

const PORT = process.env.PORT || 8600;
app.listen(PORT, '0.0.0.0', () => console.log(`Checklist API on ${PORT}`));