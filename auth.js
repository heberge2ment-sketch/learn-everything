// ==========================================
// AUTH.JS — Gestion des comptes utilisateurs
// ==========================================

const USERS_KEY = 'apprendre_tout_users';
const CURRENT_USER_KEY = 'apprendre_tout_current_user';

function getUsers() {
  try { const data = localStorage.getItem(USERS_KEY); return data ? JSON.parse(data) : {}; } catch (_) { return {}; }
}

function saveUsers(users) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch (_) { console.error('Impossible de sauvegarder les utilisateurs'); }
}

function getCurrentUser() {
  try { const data = localStorage.getItem(CURRENT_USER_KEY); return data ? JSON.parse(data) : null; } catch (_) { return null; }
}

function saveCurrentUser(user) {
  try { localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user)); } catch (_) { console.error('Impossible de sauvegarder l\'utilisateur courant'); }
}

function clearCurrentUser() {
  try { localStorage.removeItem(CURRENT_USER_KEY); } catch (_) {}
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateUsername(username) {
  return username.length >= 2 && username.length <= 30;
}

// ==========================================
// SYSTÈME DE BADGES ET RÉCOMPENSES
// ==========================================

const BADGES_DATA = {
  'premier-cours': {
    id: 'premier-cours',
    name: 'Premier Pas',
    icon: '🚀',
    description: 'Acheter son premier cours',
    category: 'progression'
  },
  'cours-5': {
    id: 'cours-5',
    name: 'Apprenti',
    icon: '📚',
    description: 'Acheter 5 cours',
    category: 'progression'
  },
  'cours-10': {
    id: 'cours-10',
    name: 'Érudit',
    icon: '🧠',
    description: 'Acheter 10 cours',
    category: 'progression'
  },
  'cours-25': {
    id: 'cours-25',
    name: 'Expert',
    icon: '🎓',
    description: 'Acheter 25 cours',
    category: 'progression'
  },
  'cours-50': {
    id: 'cours-50',
    name: 'Maître',
    icon: '🏆',
    description: 'Acheter 50 cours',
    category: 'progression'
  },
  'quiz-perfect': {
    id: 'quiz-perfect',
    name: 'Score Parfait',
    icon: '💯',
    description: 'Obtenir 100% à un quiz',
    category: 'competence'
  },
  'certificate-1': {
    id: 'certificate-1',
    name: 'Certifié',
    icon: '📜',
    description: 'Obtenir un premier certificat',
    category: 'competence'
  },
  'forum-1': {
    id: 'forum-1',
    name: 'Premier Message',
    icon: '💬',
    description: 'Écrire son premier message sur le forum',
    category: 'participation'
  },
  'review-1': {
    id: 'review-1',
    name: 'Premier Avis',
    icon: '⭐',
    description: 'Laisser un premier avis sur un cours',
    category: 'participation'
  },
  'early-bird': {
    id: 'early-bird',
    name: 'Précurseur',
    icon: '🌅',
    description: 'S\'inscrire pendant la première semaine',
    category: 'special'
  }
};

// Fonction pour vérifier et attribuer les badges
function checkAndAssignBadges(userId) {
  const users = getUsers();
  const user = users[userId];
  if (!user) return [];

  const stats = user.stats || {};
  const badges = user.badges || [];
  const newBadges = [];

  // Vérifier les badges de progression
  const purchasedCount = user.purchasedCourses?.length || 0;
  
  const badgeChecks = {
    'premier-cours': purchasedCount >= 1,
    'cours-5': purchasedCount >= 5,
    'cours-10': purchasedCount >= 10,
    'cours-25': purchasedCount >= 25,
    'cours-50': purchasedCount >= 50
  };

  // Vérifier les badges de compétence
  const certificates = stats.certificates || 0;
  const quizPerfect = stats.quizPerfect || 0;

  Object.assign(badgeChecks, {
    'quiz-perfect': quizPerfect >= 1,
    'certificate-1': certificates >= 1
  });

  // Vérifier les badges de participation
  const forumMessages = stats.forumMessages || 0;
  const reviews = stats.reviews || 0;

  Object.assign(badgeChecks, {
    'forum-1': forumMessages >= 1,
    'review-1': reviews >= 1
  });

  // Vérifier les badges spéciaux
  const signupDate = new Date(user.createdAt);
  const now = new Date();
  const daysSinceSignup = Math.floor((now - signupDate) / (1000 * 60 * 60 * 24));

  badgeChecks['early-bird'] = daysSinceSignup <= 7;

  // Attribuer les nouveaux badges
  for (const [badgeId, condition] of Object.entries(badgeChecks)) {
    if (condition && !badges.includes(badgeId)) {
      newBadges.push(badgeId);
    }
  }

  // Mettre à jour les badges
  if (newBadges.length > 0) {
    user.badges = [...badges, ...newBadges];
    saveUsers(users);
    // Notifier l'utilisateur
    newBadges.forEach(badgeId => {
      const badge = BADGES_DATA[badgeId];
      if (badge) {
        showBadgeNotification(badge);
      }
    });
  }

  return newBadges;
}

// Afficher une notification de badge
function showBadgeNotification(badge) {
  const notification = document.createElement('div');
  notification.className = 'badge-notification';
  notification.innerHTML = `
    <span class="badge-icon">${badge.icon}</span>
    <div class="badge-title">🏅 Nouveau badge débloqué !</div>
    <div style="font-weight:700;font-size:1.2rem;color:#FFD700;">${badge.name}</div>
    <div class="badge-desc">${badge.description}</div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s ease';
    setTimeout(() => notification.remove(), 500);
  }, 5000);
}

// Obtenir les badges d'un utilisateur
function getUserBadges(userId) {
  const users = getUsers();
  const user = users[userId];
  if (!user) return [];
  
  const badges = user.badges || [];
  return badges.map(id => BADGES_DATA[id]).filter(b => b);
}

// Calculer la progression d'un badge
function getBadgeProgress(userId, badgeId) {
  const users = getUsers();
  const user = users[userId];
  if (!user) return { current: 0, target: 1, percentage: 0 };

  const stats = user.stats || {};
  const purchasedCount = user.purchasedCourses?.length || 0;
  const certificates = stats.certificates || 0;
  const forumMessages = stats.forumMessages || 0;
  const reviews = stats.reviews || 0;

  const progressMap = {
    'premier-cours': { current: Math.min(purchasedCount, 1), target: 1 },
    'cours-5': { current: Math.min(purchasedCount, 5), target: 5 },
    'cours-10': { current: Math.min(purchasedCount, 10), target: 10 },
    'cours-25': { current: Math.min(purchasedCount, 25), target: 25 },
    'cours-50': { current: Math.min(purchasedCount, 50), target: 50 },
    'quiz-perfect': { current: Math.min(stats.quizPerfect || 0, 1), target: 1 },
    'certificate-1': { current: Math.min(certificates, 1), target: 1 },
    'forum-1': { current: Math.min(forumMessages, 1), target: 1 },
    'review-1': { current: Math.min(reviews, 1), target: 1 },
    'early-bird': { current: 1, target: 1 }
  };

  const progress = progressMap[badgeId] || { current: 0, target: 1 };
  return {
    ...progress,
    percentage: Math.min((progress.current / progress.target) * 100, 100)
  };
}

// ==========================================
// AUTH PRINCIPAL
// ==========================================

const Auth = {
  register: function(username, email, password) {
    if (!validateUsername(username)) {
      return { success: false, message: 'Le nom d\'utilisateur doit faire entre 2 et 30 caractères.' };
    }
    if (!validateEmail(email)) {
      return { success: false, message: 'Veuillez entrer un email valide.' };
    }
    if (!validatePassword(password)) {
      return { success: false, message: 'Le mot de passe doit faire au moins 6 caractères.' };
    }
    const users = getUsers();
    for (const key in users) {
      if (users[key].email === email) return { success: false, message: 'Cet email est déjà utilisé.' };
      if (users[key].username === username) return { success: false, message: 'Ce nom d\'utilisateur est déjà pris.' };
    }
    const userId = generateId();
    const newUser = {
      id: userId, username, email, password,
      createdAt: new Date().toISOString(),
      avatar: this.getRandomAvatar(),
      theme: 'light',
      notes: '',
      topicsDone: {},
      learningPath: 'beginner',
      stats: { topicsCompleted: 0, lastLogin: new Date().toISOString(), totalSessions: 0, certificates: 0, quizPerfect: 0, forumMessages: 0, reviews: 0 },
      followingCourses: [],
      purchasedCourses: [],
      badges: []
    };
    users[userId] = newUser;
    saveUsers(users);
    this.login(email, password);
    return { success: true, message: 'Inscription réussie !', user: newUser };
  },

  login: function(email, password) {
    const users = getUsers();
    for (const key in users) {
      const user = users[key];
      if (user.email === email && user.password === password) {
        user.stats.lastLogin = new Date().toISOString();
        user.stats.totalSessions = (user.stats.totalSessions || 0) + 1;
        saveUsers(users);
        const userCopy = { ...user };
        delete userCopy.password;
        saveCurrentUser(userCopy);
        this.loadUserData(userCopy);
        
        // Vérifier les badges à la connexion
        checkAndAssignBadges(user.id);
        
        return { success: true, message: 'Connexion réussie !', user: userCopy };
      }
    }
    return { success: false, message: 'Email ou mot de passe incorrect.' };
  },

  logout: function() {
    const currentUser = this.getCurrentUser();
    if (currentUser) this.saveCurrentUserData(currentUser);
    clearCurrentUser();
    window.location.href = 'login.html';
  },

  getCurrentUser: function() { return getCurrentUser(); },
  isLoggedIn: function() { return !!this.getCurrentUser(); },
  requireAuth: function() {
    if (!this.isLoggedIn()) { window.location.href = 'login.html'; return false; }
    return true;
  },

  updateProfile: function(data) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false, message: 'Vous devez être connecté.' };
    const users = getUsers();
    const user = users[currentUser.id];
    if (!user) return { success: false, message: 'Utilisateur non trouvé.' };
    if (data.username && validateUsername(data.username)) {
      for (const key in users) {
        if (users[key].username === data.username && key !== currentUser.id) {
          return { success: false, message: 'Ce nom d\'utilisateur est déjà pris.' };
        }
      }
      user.username = data.username;
      currentUser.username = data.username;
    }
    if (data.avatar) { user.avatar = data.avatar; currentUser.avatar = data.avatar; }
    if (data.theme) { user.theme = data.theme; currentUser.theme = data.theme; }
    saveUsers(users);
    saveCurrentUser(currentUser);
    return { success: true, message: 'Profil mis à jour !', user: currentUser };
  },

  loadUserData: function(user) {
    if (!user) return;
    const prefix = 'user_' + user.id + '_';
    const notes = localStorage.getItem(prefix + 'notes');
    if (notes !== null && document.getElementById('quick-note')) {
      document.getElementById('quick-note').value = notes;
    }
    const topicsDone = localStorage.getItem(prefix + 'topics_done');
    if (topicsDone && document.querySelectorAll('.topic-done-checkbox').length) {
      try {
        const done = JSON.parse(topicsDone);
        document.querySelectorAll('.topic-done-checkbox').forEach(checkbox => {
          const card = checkbox.closest('.card');
          if (card) {
            const topicId = card.getAttribute('data-topic-id');
            if (done[topicId]) { checkbox.checked = true; card.classList.add('is-done'); }
          }
        });
      } catch (_) {}
    }
  },

  saveCurrentUserData: function(user) {
    if (!user) return;
    const prefix = 'user_' + user.id + '_';
    const noteTextarea = document.getElementById('quick-note');
    if (noteTextarea) localStorage.setItem(prefix + 'notes', noteTextarea.value);
    const doneTopics = {};
    document.querySelectorAll('.topic-done-checkbox:checked').forEach(checkbox => {
      const card = checkbox.closest('.card');
      if (card) {
        const topicId = card.getAttribute('data-topic-id');
        if (topicId) doneTopics[topicId] = true;
      }
    });
    localStorage.setItem(prefix + 'topics_done', JSON.stringify(doneTopics));
  },

  getRandomAvatar: function() {
    const avatars = ['😊','😎','🤩','🧠','🚀','🌈','⭐','🎯','💪','🌟','🔥','💡','🎨','🦋','🌺','🍀'];
    return avatars[Math.floor(Math.random() * avatars.length)];
  },

  resetPassword: function(email) {
    const users = getUsers();
    for (const key in users) {
      if (users[key].email === email) {
        return { success: true, message: 'Un lien de réinitialisation a été envoyé à votre email.' };
      }
    }
    return { success: false, message: 'Aucun compte trouvé avec cet email.' };
  }
};

window.Auth = Auth;
window.getUsers = getUsers;
window.saveUsers = saveUsers;
window.getCurrentUser = getCurrentUser;
window.saveCurrentUser = saveCurrentUser;
window.clearCurrentUser = clearCurrentUser;
window.BADGES_DATA = BADGES_DATA;
window.checkAndAssignBadges = checkAndAssignBadges;
window.getUserBadges = getUserBadges;
window.getBadgeProgress = getBadgeProgress;

console.log('🔐 Système d\'authentification chargé');