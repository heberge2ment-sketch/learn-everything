document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ==========================================
     1. LOADER
     ========================================== */
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => { loader.classList.add('hidden'); }, 600);
  }

  /* ==========================================
     2. AUTHENTIFICATION — Gestion du menu
     ========================================== */
  function updateAuthUI() {
    const menuAuth = document.getElementById('menu-auth');
    const heroAuth = document.getElementById('hero-auth-status');
    const currentUser = Auth ? Auth.getCurrentUser() : null;
    if (!menuAuth) return;

    if (currentUser) {
      menuAuth.innerHTML = `
        <span class="auth-user">
          <span class="auth-user-avatar">${currentUser.avatar || '😊'}</span>
          <span>${currentUser.username}</span>
        </span>
        <a href="dashboard.html" class="auth-btn auth-btn-register" style="background:rgba(108,60,225,0.12);color:var(--color-primary);">📊 Tableau de bord</a>
        <a href="forum.html" class="auth-btn auth-btn-login" style="background:rgba(29,161,242,0.08);color:#1DA1F2;">💬 Forum</a>
        <a href="certificate.html" class="auth-btn auth-btn-register" style="background:rgba(255,215,0,0.12);color:#FFD700;">🎓 Certificat</a>
        <button class="auth-btn auth-btn-logout" id="auth-logout-btn">🚪 Déconnexion</button>
      `;
      const logoutBtn = document.getElementById('auth-logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
          e.preventDefault();
          if (confirm('Veux-tu vraiment te déconnecter ?')) {
            if (Auth && Auth.logout) Auth.logout();
          }
        });
      }
      if (heroAuth) {
        heroAuth.innerHTML = `
          <p class="auth-greeting" style="color:rgba(255,255,255,0.8);">
            👋 Bonjour <strong style="color:#FFD700;">${currentUser.username}</strong> ! 
            ${currentUser.stats?.totalSessions === 1 ? 'Bienvenue pour ta première visite ! 🎉' : 'Ravi de te revoir !'}
          </p>
          <a href="dashboard.html" class="auth-cta">📊 Voir mon tableau de bord →</a>
        `;
      }
      const infoBanner = document.getElementById('courses-info-banner');
      if (infoBanner) infoBanner.style.display = 'none';
    } else {
      menuAuth.innerHTML = `
        <a href="login.html" class="auth-btn auth-btn-login">🔑 Connexion</a>
        <a href="register.html" class="auth-btn auth-btn-register">✨ S'inscrire</a>
      `;
      if (heroAuth) {
        heroAuth.innerHTML = `
          <p class="auth-greeting" style="color:rgba(255,255,255,0.6);">
            🌟 Explore tous les métiers librement. 
            <a href="register.html" style="color:#FFD700; font-weight:600; text-decoration:none;">Crée un compte</a> 
            pour suivre ta progression !
          </p>
          <a href="register.html" class="auth-cta">✨ Créer un compte gratuit →</a>
        `;
      }
      const infoBanner = document.getElementById('courses-info-banner');
      if (infoBanner) infoBanner.style.display = 'flex';
    }
  }

  if (typeof Auth !== 'undefined') {
    updateAuthUI();
  } else {
    const checkAuth = setInterval(() => {
      if (typeof Auth !== 'undefined') {
        updateAuthUI();
        clearInterval(checkAuth);
      }
    }, 100);
  }

  /* ==========================================
     3. MODALES D'INVITATION
     ========================================== */
  let signupModalShown = false;
  function showSignupModal() {
    if (signupModalShown) return;
    if (Auth && Auth.getCurrentUser()) return;
    const modal = document.getElementById('signup-modal');
    if (!modal) return;
    signupModalShown = true;
    setTimeout(() => { modal.classList.add('active'); }, 8000);
  }

  document.getElementById('signup-modal-close')?.addEventListener('click', function() {
    document.getElementById('signup-modal')?.classList.remove('active');
  });
  document.getElementById('signup-modal')?.addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('active');
  });
  document.getElementById('signup-modal-later')?.addEventListener('click', function() {
    document.getElementById('signup-modal')?.classList.remove('active');
  });

  document.getElementById('login-modal-close')?.addEventListener('click', function() {
    document.getElementById('login-modal')?.classList.remove('active');
  });
  document.getElementById('login-modal')?.addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('active');
  });
  document.getElementById('login-modal-later')?.addEventListener('click', function() {
    document.getElementById('login-modal')?.classList.remove('active');
  });

  const coursesSection = document.getElementById('courses');
  if (coursesSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { showSignupModal(); observer.disconnect(); }
      });
    }, { threshold: 0.3 });
    observer.observe(coursesSection);
  }

  window.showLoginModal = function() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.classList.add('active');
  };

  /* ==========================================
     4. FONCTIONS UTILITAIRES
     ========================================== */
  function getPurchasedCourses() {
    const user = Auth ? Auth.getCurrentUser() : null;
    if (!user) return [];
    const users = window.getUsers ? window.getUsers() : {};
    const userData = users[user.id];
    return userData?.followingCourses || [];
  }

  function savePurchasedCourses(courseIds) {
    const user = Auth ? Auth.getCurrentUser() : null;
    if (!user) return;
    const users = window.getUsers ? window.getUsers() : {};
    const userData = users[user.id];
    if (!userData) return;
    userData.followingCourses = courseIds;
    if (window.saveUsers) window.saveUsers(users);
  }

  /* ==========================================
     5. CHARGEMENT DES COURS
     ========================================== */
  function renderCourses() {
    const grid = document.getElementById('courses-grid');
    const searchInput = document.getElementById('courses-search');
    const filterSelect = document.getElementById('courses-filter');
    const emptyMsg = document.getElementById('courses-empty');
    const counterEl = document.getElementById('courses-count');
    if (!grid) return;
    if (typeof COURSES_DATA === 'undefined') {
      grid.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 2rem; grid-column: 1 / -1;">❌ Erreur : les données des cours ne sont pas chargées.</p>';
      return;
    }

    function getCourses() {
      let courses = [...COURSES_DATA];
      const query = searchInput?.value.trim().toLowerCase() || '';
      if (query) {
        courses = courses.filter(c => c.title.toLowerCase().includes(query) || c.category.toLowerCase().includes(query) || c.description.toLowerCase().includes(query) || c.skills.some(s => s.toLowerCase().includes(query)));
      }
      const category = filterSelect?.value || 'all';
      if (category !== 'all') courses = courses.filter(c => c.category === category);
      return courses;
    }

    function render() {
      const courses = getCourses();
      const currentUser = Auth ? Auth.getCurrentUser() : null;
      const purchased = getPurchasedCourses();
      if (counterEl) counterEl.textContent = courses.length;
      if (courses.length === 0) { grid.innerHTML = ''; if (emptyMsg) emptyMsg.style.display = 'block'; return; }
      if (emptyMsg) emptyMsg.style.display = 'none';

      grid.innerHTML = courses.map(course => {
        const isFollowing = purchased.includes(course.id);
        return `
          <article class="course-card glass" data-course-id="${course.id}">
            <div class="course-card-header">
              <span class="course-icon">${course.icon}</span>
              <span class="course-category">${course.category}</span>
            </div>
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="course-meta">
              <span>📚 ${course.lessons.length} leçons</span>
              <span>⏱️ ${course.duration}</span>
              <span>📊 ${course.level}</span>
            </div>
            <div class="course-skills">${course.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}</div>
            <div class="course-footer">
              ${currentUser ? `
                <button class="button button-primary course-follow-btn" data-course-id="${course.id}" style="font-size:0.85rem;padding:0.6rem 1.5rem;">
                  ${isFollowing ? '✅ Suivi' : '📖 Suivre ce cours'}
                </button>
              ` : `
                <button class="button button-secondary" style="font-size:0.85rem;padding:0.6rem 1.5rem;background:rgba(255,215,0,0.15);color:#FFD700;" onclick="showLoginModal()">🔒 Se connecter</button>
              `}
            </div>
          </article>
        `;
      }).join('');

      document.querySelectorAll('.course-follow-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const courseId = this.dataset.courseId;
          const user = Auth ? Auth.getCurrentUser() : null;
          if (!user) { showLoginModal(); return; }
          followCourse(courseId);
        });
      });

      document.querySelectorAll('.course-card').forEach((card, index) => {
        setTimeout(() => { card.classList.add('visible'); }, index * 100);
      });
    }

    searchInput?.addEventListener('input', render);
    filterSelect?.addEventListener('change', render);
    render();
    return render;
  }

  /* ==========================================
     6. SUIVRE UN COURS
     ========================================== */
  window.followCourse = function(courseId) {
    const user = Auth.getCurrentUser();
    if (!user) { showLoginModal(); return; }

    const users = window.getUsers ? window.getUsers() : {};
    const userData = users[user.id];
    if (!userData) return;

    if (!userData.followingCourses) userData.followingCourses = [];
    if (userData.followingCourses.includes(courseId)) {
      alert('✅ Tu suis déjà ce cours !');
      return;
    }

    userData.followingCourses.push(courseId);
    if (!userData.stats) userData.stats = {};
    userData.stats.coursesFollowing = userData.followingCourses.length;
    if (window.saveUsers) window.saveUsers(users);
    
    const updatedUser = { ...userData };
    delete updatedUser.password;
    if (window.saveCurrentUser) window.saveCurrentUser(updatedUser);

    const course = COURSES_DATA.find(c => c.id === courseId);
    alert(`🎉 Tu as commencé "${course?.title || 'ce cours'}" !\n\nRends-toi sur ton tableau de bord pour continuer.`);
    renderCourses();
  };

  /* ==========================================
     7. AUTRES FONCTIONS
     ========================================== */
  window.saveGuestProgress = function() {
    if (Auth && Auth.getCurrentUser()) { alert('✅ Tu es déjà connecté ! Tes données sont sauvegardées automatiquement.'); return; }
    const doneMap = loadDoneTopics ? loadDoneTopics() : {};
    const total = document.querySelectorAll('#topics-cards .card').length || 4;
    const doneCount = Object.values(doneMap).filter(Boolean).length;
    if (doneCount === 0) { alert('📚 Marque d\'abord quelques thèmes comme "Vu" avant de sauvegarder !'); return; }
    try {
      localStorage.setItem('guest_progress', JSON.stringify(doneMap));
      localStorage.setItem('guest_progress_date', new Date().toISOString());
      alert('✅ Progression sauvegardée localement !\n\nCrée un compte pour la retrouver sur tous tes appareils.');
      showSignupModal();
    } catch (_) { alert('❌ Impossible de sauvegarder.'); }
  };

  /* ==========================================
     8. THÈME CLAIR/SOMBRE
     ========================================== */
  const themeToggle = document.querySelector('.theme-toggle');
  const themeIcon = themeToggle?.querySelector('.theme-icon');
  const body = document.body;
  function setTheme(theme) {
    if (theme === 'dark') { body.classList.add('dark-theme'); if (themeIcon) themeIcon.textContent = '☀️'; }
    else { body.classList.remove('dark-theme'); if (themeIcon) themeIcon.textContent = '🌙'; }
    try { localStorage.setItem('theme', theme); } catch (_) {}
  }
  if (themeToggle) {
    let saved; try { saved = localStorage.getItem('theme'); } catch (_) {}
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(saved || (prefersDark ? 'dark' : 'light'));
    themeToggle.addEventListener('click', function() {
      const isDark = body.classList.contains('dark-theme');
      setTheme(isDark ? 'light' : 'dark');
    });
  }

  /* ==========================================
     9. PARTICULES FLOTTANTES
     ========================================== */
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const colors = ['#6C3CE1', '#FF6B8A', '#FFD700', '#4A90E2', '#00D2A0'];
    for (let i = 0; i < 40; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 6 + 2;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 15;
      const delay = Math.random() * 10;
      const color = colors[Math.floor(Math.random() * colors.length)];
      Object.assign(particle.style, {
        position: 'absolute', width: size + 'px', height: size + 'px',
        background: color, borderRadius: '50%',
        left: x + '%', top: y + '%',
        opacity: 0.15 + Math.random() * 0.2,
        filter: 'blur(1px)',
        animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      });
      container.appendChild(particle);
    }
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.2); }
        66% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(0.8); }
        100% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1); }
      }
    `;
    document.head.appendChild(style);
  }
  createParticles();

  /* ==========================================
     10. SCROLL
     ========================================== */
  const backToTop = document.querySelector('.back-to-top');
  const progressBar = document.getElementById('progress-bar');
  const sections = document.querySelectorAll('main section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const link = document.querySelector(`.menu a[href="#${sectionId}"]`);
      if (!link) return;
      link.classList.toggle('active-link', scrollY >= sectionTop && scrollY < sectionTop + sectionHeight);
    });
  }

  function updateReadingProgress() {
    if (!progressBar) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    progressBar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
  }

  function onScroll() {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
    updateActiveLink();
    updateReadingProgress();
  }
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() { onScroll(); ticking = false; });
      ticking = true;
    }
  });
  if (backToTop) {
    backToTop.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }
  updateActiveLink();
  updateReadingProgress();

  /* ==========================================
     11. ANIMATIONS AU SCROLL
     ========================================== */
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, observerOptions);
  document.querySelectorAll('.feature-card, .step-card, .course-card').forEach(el => { observer.observe(el); });

  /* ==========================================
     12. FONCTIONS POUR LES THÈMES
     ========================================== */
  function loadDoneTopics() {
    try { const raw = localStorage.getItem('learning-site-topics-done'); return raw ? JSON.parse(raw) : {}; } catch (_) { return {}; }
  }
  function updateProgressSummary(doneMap) {
    const progressLabel = document.getElementById('progress-label');
    const progressTrackFill = document.getElementById('progress-track-fill');
    const total = document.querySelectorAll('#topics-cards .card').length || 4;
    const doneCount = Object.values(doneMap).filter(Boolean).length;
    if (progressLabel) progressLabel.textContent = doneCount + ' / ' + total + ' thèmes explorés';
    if (progressTrackFill && total > 0) progressTrackFill.style.width = Math.round((doneCount / total) * 100) + '%';
  }
  function initTopicsProgress() {
    const doneMap = loadDoneTopics();
    document.querySelectorAll('#topics-cards .card').forEach(card => {
      const topicId = card.getAttribute('data-topic-id');
      const checkbox = card.querySelector('.topic-done-checkbox');
      if (!checkbox || !topicId) return;
      const isDone = Boolean(doneMap[topicId]);
      checkbox.checked = isDone;
      card.classList.toggle('is-done', isDone);
      checkbox.addEventListener('change', function() {
        doneMap[topicId] = this.checked;
        card.classList.toggle('is-done', this.checked);
        try { localStorage.setItem('learning-site-topics-done', JSON.stringify(doneMap)); } catch (_) {}
        updateProgressSummary(doneMap);
      });
    });
    updateProgressSummary(doneMap);
  }

  setTimeout(initTopicsProgress, 300);

  /* ==========================================
     13. INITIALISATION DES COURS
     ========================================== */
  setTimeout(function() {
    if (typeof COURSES_DATA !== 'undefined') {
      renderCourses();
    } else {
      setTimeout(function() {
        if (typeof COURSES_DATA !== 'undefined') renderCourses();
        else {
          const grid = document.getElementById('courses-grid');
          if (grid) grid.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 2rem; grid-column: 1 / -1;">❌ Erreur : les données des cours ne sont pas chargées.</p>';
        }
      }, 500);
    }
  }, 300);

  if (typeof Auth !== 'undefined') {
    const origLogin = Auth.login;
    Auth.login = function(email, password) {
      const result = origLogin.call(this, email, password);
      if (result.success) {
        setTimeout(() => { renderCourses(); updateAuthUI(); }, 300);
      }
      return result;
    };
  }

  window.showLoginModal = showLoginModal;
  window.showSignupModal = showSignupModal;
  window.renderCourses = renderCourses;
  window.updateAuthUI = updateAuthUI;
  window.followCourse = window.followCourse;
  window.saveGuestProgress = window.saveGuestProgress;

  console.log('✦ Apprendre Tout — Plateforme de formation ✦');
});