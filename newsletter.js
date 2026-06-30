// ==========================================
// NEWSLETTER.JS — Système d'inscription
// ==========================================

const NEWSLETTER_KEY = 'apprendre_tout_newsletter_subscribers';

// Récupérer les abonnés
function getSubscribers() {
  try {
    const data = localStorage.getItem(NEWSLETTER_KEY);
    return data ? JSON.parse(data) : [];
  } catch (_) {
    return [];
  }
}

// Sauvegarder les abonnés
function saveSubscribers(subscribers) {
  try {
    localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(subscribers));
  } catch (_) {
    console.error('Impossible de sauvegarder les abonnés');
  }
}

// Compter les abonnés
function getSubscriberCount() {
  return getSubscribers().length;
}

// S'inscrire à la newsletter
function subscribeToNewsletter(email) {
  if (!email || !validateEmail(email)) {
    return { success: false, message: 'Veuillez entrer un email valide.' };
  }

  const subscribers = getSubscribers();
  
  // Vérifier si déjà inscrit
  if (subscribers.some(s => s.email === email)) {
    return { success: false, message: 'Cet email est déjà inscrit à la newsletter.' };
  }

  // Ajouter l'abonné
  const newSubscriber = {
    email: email,
    date: new Date().toISOString(),
    source: 'website'
  };
  subscribers.push(newSubscriber);
  saveSubscribers(subscribers);

  return { 
    success: true, 
    message: '✅ Inscription réussie ! Tu recevras bientôt nos actualités.',
    count: subscribers.length
  };
}

// Afficher la popup newsletter
function showNewsletterPopup() {
  const popup = document.getElementById('newsletter-popup');
  if (!popup) return;

  // Vérifier si l'utilisateur a déjà vu la popup
  const hasSeenPopup = localStorage.getItem('newsletter_popup_seen');
  if (hasSeenPopup) return;

  // Afficher après 5 secondes
  setTimeout(() => {
    popup.classList.add('active');
  }, 5000);
}

// Fermer la popup
function closeNewsletterPopup() {
  const popup = document.getElementById('newsletter-popup');
  if (popup) {
    popup.classList.remove('active');
    localStorage.setItem('newsletter_popup_seen', 'true');
  }
}

// Gérer l'inscription depuis la popup
function handleNewsletterPopupSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('newsletter-popup-email');
  const message = document.getElementById('newsletter-popup-message');
  const email = input.value.trim();

  const result = subscribeToNewsletter(email);
  
  message.textContent = result.message;
  message.className = 'newsletter-message ' + (result.success ? 'success' : 'error');
  message.style.display = 'block';

  if (result.success) {
    input.value = '';
    // Mettre à jour le compteur
    updateNewsletterCounter();
    // Fermer la popup après 2 secondes
    setTimeout(() => {
      closeNewsletterPopup();
    }, 2500);
  }
}

// Gérer l'inscription depuis la section newsletter
function handleNewsletterSectionSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('newsletter-email');
  const message = document.getElementById('newsletter-message');
  const email = input.value.trim();

  const result = subscribeToNewsletter(email);
  
  message.textContent = result.message;
  message.className = 'newsletter-message ' + (result.success ? 'success' : 'error');
  message.style.display = 'block';

  if (result.success) {
    input.value = '';
    updateNewsletterCounter();
  }
}

// Mettre à jour le compteur d'abonnés
function updateNewsletterCounter() {
  const counters = document.querySelectorAll('.newsletter-count');
  const count = getSubscriberCount();
  counters.forEach(counter => {
    counter.textContent = count;
  });
}

// Validation email (réutilisée)
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  // Mettre à jour le compteur
  updateNewsletterCounter();

  // Gérer la soumission du formulaire dans la section
  const sectionForm = document.getElementById('newsletter-section-form');
  if (sectionForm) {
    sectionForm.addEventListener('submit', handleNewsletterSectionSubmit);
  }

  // Gérer la soumission du formulaire dans la popup
  const popupForm = document.getElementById('newsletter-popup-form');
  if (popupForm) {
    popupForm.addEventListener('submit', handleNewsletterPopupSubmit);
  }

  // Gérer la fermeture de la popup
  const closeBtn = document.getElementById('newsletter-popup-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeNewsletterPopup);
  }

  // Fermer la popup en cliquant à l'extérieur
  const popup = document.getElementById('newsletter-popup');
  if (popup) {
    popup.addEventListener('click', function(e) {
      if (e.target === this) {
        closeNewsletterPopup();
      }
    });
  }

  // Afficher la popup après un délai
  showNewsletterPopup();
});

// Exposer les fonctions globalement
window.subscribeToNewsletter = subscribeToNewsletter;
window.getSubscriberCount = getSubscriberCount;
window.updateNewsletterCounter = updateNewsletterCounter;
window.closeNewsletterPopup = closeNewsletterPopup;
window.showNewsletterPopup = showNewsletterPopup;