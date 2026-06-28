const express = require('express');
const router = express.Router();
const fedapayService = require('../services/fedapayService');

// Initier un paiement
router.post('/initiate', async (req, res) => {
  try {
    const { phoneNumber, amount, reference, userId } = req.body;
    
    if (!phoneNumber || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Numéro de téléphone et montant requis'
      });
    }

    const result = await fedapayService.initiatePayment(
      phoneNumber,
      amount,
      reference,
      userId
    );

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'initiation du paiement',
      error: error.message
    });
  }
});

// Vérifier le statut
router.get('/status/:transactionId', async (req, res) => {
  try {
    const { transactionId } = req.params;
    const result = await fedapayService.checkPaymentStatus(transactionId);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification du paiement',
      error: error.message
    });
  }
});

// Webhook FedaPay
router.post('/webhook', async (req, res) => {
  try {
    console.log('📨 Webhook reçu:', req.body);
    const { event, data } = req.body;
    
    if (event === 'transaction.completed') {
      console.log(`✅ Paiement confirmé: ${data.id}`);
      // Débloquer le cours ici
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('❌ Erreur webhook:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;