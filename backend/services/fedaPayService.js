// ==========================================
// FEDAPAY SERVICE — Intégration FedaPay
// ==========================================

const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

class FedaPayService {
  constructor() {
    this.apiKey = process.env.FEDAPAY_API_KEY;
    this.secretKey = process.env.FEDAPAY_SECRET_KEY;
    this.mode = process.env.FEDAPAY_MODE || 'sandbox';
    this.baseUrl = this.mode === 'live' 
      ? 'https://api.fedapay.com/v1'
      : 'https://sandbox-api.fedapay.com/v1';
    
    if (!this.apiKey) {
      console.warn('⚠️ FEDAPAY_API_KEY manquante dans .env');
    }
    
    console.log(`🔐 FedaPay initialisé en mode ${this.mode}`);
  }

  async testConnection() {
    try {
      const response = await axios.get(`${this.baseUrl}/transactions`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return {
        success: true,
        message: 'Connexion à FedaPay réussie !',
        mode: this.mode,
        token: this.apiKey?.substring(0, 10) + '...'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Échec de connexion à FedaPay',
        error: error.response?.data?.message || error.message
      };
    }
  }

  async initiatePayment(phoneNumber, amount, reference, userId) {
    try {
      if (!this.apiKey) {
        return { success: false, message: 'Clé API FedaPay non configurée' };
      }

      const cleanPhone = this.formatPhoneNumber(phoneNumber);
      const payload = {
        amount: amount,
        currency: 'XOF',
        reference: reference || `PAY-${Date.now()}`,
        description: 'Achat de cours - Apprendre Tout',
        customer: {
          phone_number: cleanPhone,
          email: `${userId || 'guest'}@apprendre-tout.com`
        },
        callback_url: `${process.env.APP_URL || 'http://localhost:3000'}/payment-callback`,
        return_url: `${process.env.APP_URL || 'http://localhost:3000'}/payment-success`
      };

      const response = await axios.post(`${this.baseUrl}/transactions`, payload, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;
      
      return {
        success: true,
        paymentId: data.id,
        paymentUrl: data.payment_url,
        status: data.status,
        message: 'Paiement initié avec succès',
        transaction: data
      };
    } catch (error) {
      console.error('❌ Erreur FedaPay:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de l\'initiation du paiement',
        error: error.message
      };
    }
  }

  async checkPaymentStatus(transactionId) {
    try {
      const response = await axios.get(`${this.baseUrl}/transactions/${transactionId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;
      
      return {
        status: data.status,
        isSuccessful: data.status === 'completed' || data.status === 'approved',
        isPending: data.status === 'pending' || data.status === 'initiated',
        transaction: data
      };
    } catch (error) {
      console.error('❌ Erreur vérification:', error.message);
      return {
        status: 'unknown',
        isSuccessful: false,
        isPending: false,
        error: error.message
      };
    }
  }

  formatPhoneNumber(phone) {
    let cleaned = phone.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('0') && cleaned.length === 9) {
      cleaned = '229' + cleaned.substring(1);
    }
    return cleaned;
  }
}

module.exports = new FedaPayService();