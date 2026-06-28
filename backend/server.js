// ==========================================
// SERVER — Apprendre Tout
// ==========================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// Routes API
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API Apprendre Tout', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Routes de paiement FedaPay
const paymentRoutes = require('./routes/payment');
app.use('/api/payment', paymentRoutes);

// Route de test
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'Le serveur fonctionne !' });
});

// Servir les fichiers statiques
app.use(express.static('.'));

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error('❌ Erreur:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  console.log(`📱 API: http://localhost:${PORT}/api`);
  console.log(`💳 Paiement: http://localhost:${PORT}/api/payment`);
});