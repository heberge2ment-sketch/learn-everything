// ==========================================
// TEST DE CONNEXION FEDAPAY
// ==========================================

const fedapayService = require('./backend/services/fedapayService');

async function testFedapay() {
  console.log('🧪 Test de connexion FedaPay...');
  console.log('----------------------------------------');
  console.log(`🔑 API Key: ${process.env.FEDAPAY_API_KEY?.substring(0, 10)}...`);
  console.log(`📞 Numéro: ${process.env.FEDAPAY_COLLECTION_ACCOUNT}`);
  console.log('----------------------------------------');
  
  // Tester la connexion
  console.log('1️⃣ Test d\'authentification...');
  const authTest = await fedapayService.testConnection();
  
  if (authTest.success) {
    console.log('✅ ' + authTest.message);
    
    // Tester un paiement réel (avec un petit montant)
    console.log('\n2️⃣ Test d\'initiation de paiement (réel)...');
    console.log('   ⚠️  Ceci va envoyer une vraie demande de paiement FedaPay !');
    
    const phoneNumber = '0146075817'; // Ton numéro de test
    const amount = 100; // 100 FCFA (petit montant pour test)
    const reference = 'TEST-' + Date.now();
    
    console.log(`   📞 Téléphone: ${phoneNumber}`);
    console.log(`   💰 Montant: ${amount} FCFA`);
    console.log(`   📋 Référence: ${reference}`);
    
    const result = await fedapayService.initiatePayment(phoneNumber, amount, reference, 'test-user');
    
    if (result.success) {
      console.log('✅ Paiement initié avec succès !');
      console.log(`   Payment ID: ${result.paymentId}`);
      console.log(`   URL: ${result.paymentUrl}`);
      console.log(`   Message: ${result.message}`);
      
      // Vérifier le statut après 3 secondes
      console.log('\n3️⃣ Vérification du statut...');
      setTimeout(async () => {
        const status = await fedapayService.checkPaymentStatus(result.paymentId);
        console.log(`   Statut: ${status.status}`);
        console.log(`   Succès: ${status.isSuccessful ? '✅ Oui' : '❌ Non'}`);
        console.log(`   En attente: ${status.isPending ? '⏳ Oui' : '❌ Non'}`);
        
        console.log('\n✅ Test terminé !');
        console.log('   📱 Vérifie ton téléphone pour confirmer le paiement.');
      }, 3000);
      
    } else {
      console.log('❌ Échec:', result.message);
    }
    
  } else {
    console.log('❌ ' + authTest.message);
    console.log(`   Erreur: ${authTest.error}`);
    
    console.log('\n💡 VÉRIFICATIONS:');
    console.log('   1. API Key et Secret sont-ils corrects ?');
    console.log('   2. As-tu souscrit aux produits FedaPay ?');
    console.log('   3. Le service FedaPay est-il disponible ?');
  }
}

testFedapay();