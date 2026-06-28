// ==========================================
// COURSES.JS — Tous les métiers du monde
// ==========================================

const COURSES_DATA = [
  // ==========================================
  // SECTEUR : INFORMATIQUE & TECHNOLOGIE
  // ==========================================
  {
    id: 'dev-web',
    icon: '💻',
    title: 'Développement Web',
    category: 'Informatique',
    level: 'Débutant à Avancé',
    duration: '6 mois',
    price: 150000,
    description: 'Apprends à créer des sites web modernes avec HTML, CSS, JavaScript et les frameworks populaires.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Base de données'],
    videos: [
      { title: 'Introduction au Web', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '15:30' },
      { title: 'HTML & CSS - Partie 1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '22:15' }
    ],
    quiz: [
      { question: 'Quelle est la balise HTML pour un lien ?', options: ['<link>', '<a>', '<href>', '<url>'], correct: 1 },
      { question: 'Quelle propriété CSS change la couleur du texte ?', options: ['background-color', 'text-color', 'color', 'font-color'], correct: 2 },
      { question: 'JavaScript est un langage...', options: ['Compilé', 'Interprété', 'Compilé et interprété', 'Aucune'], correct: 1 }
    ],
    exercises: [
      { title: 'Créer une page web', description: 'Crée une page HTML avec un titre et un paragraphe.', difficulty: 'Facile', solution: 'Utilise <h1> et <p>' },
      { title: 'Styliser une page', description: 'Ajoute du CSS pour rendre la page attrayante.', difficulty: 'Moyen', solution: 'Utilise les propriétés color, font-size, margin' }
    ],
    lessons: [
      { title: 'Introduction au Web', duration: '2h' },
      { title: 'HTML & CSS', duration: '8h' },
      { title: 'JavaScript', duration: '10h' },
      { title: 'React', duration: '12h' },
      { title: 'Node.js', duration: '10h' }
    ]
  },
  {
    id: 'data-science',
    icon: '📊',
    title: 'Data Science',
    category: 'Informatique',
    level: 'Intermédiaire à Avancé',
    duration: '8 mois',
    price: 250000,
    description: 'Découvre l\'analyse de données, le machine learning et l\'intelligence artificielle.',
    skills: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Visualisation'],
    videos: [
      { title: 'Python pour la Data', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '20:00' }
    ],
    quiz: [
      { question: 'Quelle bibliothèque Python est utilisée pour l\'analyse de données ?', options: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn'], correct: 0 },
      { question: 'Qu\'est-ce que le machine learning ?', options: ['Une bibliothèque', 'Un algorithme', 'Une technique d\'apprentissage', 'Un langage'], correct: 2 }
    ],
    exercises: [
      { title: 'Analyse de données', description: 'Charge un fichier CSV et affiche les statistiques.', difficulty: 'Moyen', solution: 'Utilise pandas.read_csv() et describe()' }
    ],
    lessons: [
      { title: 'Python pour la Data', duration: '8h' },
      { title: 'Analyse de données', duration: '10h' },
      { title: 'Machine Learning', duration: '14h' },
      { title: 'Deep Learning', duration: '12h' }
    ]
  },
  {
    id: 'dev-mobile',
    icon: '📱',
    title: 'Développement Mobile',
    category: 'Informatique',
    level: 'Intermédiaire',
    duration: '7 mois',
    price: 180000,
    description: 'Crée des applications mobiles pour iOS et Android avec React Native et Flutter.',
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'API'],
    videos: [
      { title: 'React Native', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '25:00' }
    ],
    quiz: [
      { question: 'React Native permet de créer des apps pour ?', options: ['iOS seulement', 'Android seulement', 'iOS et Android', 'Web seulement'], correct: 2 }
    ],
    exercises: [
      { title: 'Première app React Native', description: 'Crée une app "Hello World".', difficulty: 'Facile', solution: 'Utilise npx react-native init' }
    ],
    lessons: [
      { title: 'React Native', duration: '10h' },
      { title: 'Flutter', duration: '10h' },
      { title: 'iOS Développement', duration: '8h' },
      { title: 'Android Développement', duration: '8h' }
    ]
  },
  {
    id: 'cybersecurite',
    icon: '🔒',
    title: 'Cybersécurité',
    category: 'Informatique',
    level: 'Intermédiaire à Avancé',
    duration: '8 mois',
    price: 220000,
    description: 'Protège les systèmes et les données contre les cyberattaques et les menaces.',
    skills: ['Sécurité réseau', 'Cryptographie', 'Pentesting', 'GDPR'],
    videos: [
      { title: 'Fondamentaux de la sécurité', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '18:30' }
    ],
    quiz: [
      { question: 'Qu\'est-ce que le pentesting ?', options: ['Un test de performance', 'Un test d\'intrusion', 'Un test de compatibilité', 'Un test de charge'], correct: 1 }
    ],
    exercises: [
      { title: 'Analyse de vulnérabilités', description: 'Identifie les failles d\'une application web.', difficulty: 'Difficile', solution: 'Utilise OWASP ZAP' }
    ],
    lessons: [
      { title: 'Fondamentaux de la sécurité', duration: '6h' },
      { title: 'Sécurité réseau', duration: '8h' },
      { title: 'Cryptographie', duration: '6h' },
      { title: 'Pentesting', duration: '10h' }
    ]
  },
  {
    id: 'dev-jeux',
    icon: '🎮',
    title: 'Développement de Jeux Vidéo',
    category: 'Informatique',
    level: 'Débutant à Avancé',
    duration: '9 mois',
    price: 200000,
    description: 'Apprends à créer des jeux vidéo avec Unity, Unreal Engine et C#.',
    skills: ['Unity', 'C#', 'Unreal Engine', 'Game Design', '3D'],
    lessons: [
      { title: 'Introduction au Game Design', duration: '4h' },
      { title: 'Unity', duration: '12h' },
      { title: 'C#', duration: '10h' },
      { title: 'Unreal Engine', duration: '12h' }
    ]
  },
  {
    id: 'ia-ml',
    icon: '🧠',
    title: 'Intelligence Artificielle',
    category: 'Informatique',
    level: 'Avancé',
    duration: '10 mois',
    price: 300000,
    description: 'Maîtrise les concepts avancés de l\'IA, du deep learning et des réseaux de neurones.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'],
    lessons: [
      { title: 'Fondamentaux de l\'IA', duration: '8h' },
      { title: 'Deep Learning', duration: '14h' },
      { title: 'NLP', duration: '10h' },
      { title: 'Computer Vision', duration: '10h' }
    ]
  },
  {
    id: 'cloud-architect',
    icon: '☁️',
    title: 'Architecte Cloud',
    category: 'Informatique',
    level: 'Intermédiaire à Avancé',
    duration: '6 mois',
    price: 200000,
    description: 'Deviens expert en infrastructure cloud avec AWS, Azure et Google Cloud.',
    skills: ['AWS', 'Azure', 'Google Cloud', 'DevOps', 'Kubernetes'],
    lessons: [
      { title: 'Introduction au Cloud', duration: '4h' },
      { title: 'AWS', duration: '10h' },
      { title: 'Azure', duration: '8h' },
      { title: 'DevOps', duration: '8h' }
    ]
  },
  {
    id: 'blockchain',
    icon: '⛓️',
    title: 'Blockchain & Crypto',
    category: 'Informatique',
    level: 'Intermédiaire',
    duration: '5 mois',
    price: 180000,
    description: 'Comprends la blockchain, les smart contracts et le développement d\'applications décentralisées.',
    skills: ['Blockchain', 'Solidity', 'Ethereum', 'Web3', 'Smart Contracts'],
    lessons: [
      { title: 'Fondamentaux de la Blockchain', duration: '4h' },
      { title: 'Solidity', duration: '8h' },
      { title: 'Web3', duration: '6h' },
      { title: 'DApps', duration: '8h' }
    ]
  },

  // ==========================================
  // SECTEUR : MARKETING & COMMUNICATION
  // ==========================================
  {
    id: 'marketing-digital',
    icon: '📈',
    title: 'Marketing Digital',
    category: 'Marketing',
    level: 'Débutant à Intermédiaire',
    duration: '4 mois',
    price: 120000,
    description: 'Maîtrise les stratégies marketing sur les réseaux sociaux, SEO, SEA et emailing.',
    skills: ['SEO', 'SEA', 'Social Media', 'Emailing', 'Analytics'],
    lessons: [
      { title: 'Fondamentaux du Marketing', duration: '4h' },
      { title: 'SEO & Référencement', duration: '6h' },
      { title: 'Publicité en ligne', duration: '6h' },
      { title: 'Médias sociaux', duration: '4h' }
    ]
  },
  {
    id: 'community-manager',
    icon: '📱',
    title: 'Community Management',
    category: 'Marketing',
    level: 'Débutant',
    duration: '3 mois',
    price: 80000,
    description: 'Apprends à gérer les communautés en ligne et les réseaux sociaux professionnellement.',
    skills: ['Social Media', 'Gestion de communauté', 'Modération', 'Stratégie de contenu'],
    lessons: [
      { title: 'Introduction au CM', duration: '2h' },
      { title: 'Réseaux sociaux', duration: '4h' },
      { title: 'Gestion de crise', duration: '3h' },
      { title: 'Analyse des données', duration: '3h' }
    ]
  },
  {
    id: 'seo-expert',
    icon: '🔍',
    title: 'Expert SEO',
    category: 'Marketing',
    level: 'Intermédiaire',
    duration: '4 mois',
    price: 130000,
    description: 'Maîtrise les techniques avancées de référencement naturel pour optimiser la visibilité web.',
    skills: ['SEO', 'Analyse de mots-clés', 'Backlinks', 'Content Strategy', 'Technical SEO'],
    lessons: [
      { title: 'Fondamentaux SEO', duration: '4h' },
      { title: 'Recherche de mots-clés', duration: '4h' },
      { title: 'Content Strategy', duration: '6h' },
      { title: 'Technical SEO', duration: '6h' }
    ]
  },
  {
    id: 'copywriting',
    icon: '✍️',
    title: 'Copywriting',
    category: 'Marketing',
    level: 'Débutant',
    duration: '3 mois',
    price: 70000,
    description: 'Apprends à rédiger des textes persuasifs pour le marketing et la publicité.',
    skills: ['Rédaction', 'Persuasion', 'Storytelling', 'Créativité'],
    lessons: [
      { title: 'Les bases du Copywriting', duration: '3h' },
      { title: 'Storytelling', duration: '4h' },
      { title: 'Techniques persuasives', duration: '4h' },
      { title: 'Rédaction publicitaire', duration: '3h' }
    ]
  },
  {
    id: 'branding',
    icon: '🏷️',
    title: 'Branding & Identité de Marque',
    category: 'Marketing',
    level: 'Intermédiaire',
    duration: '4 mois',
    price: 110000,
    description: 'Crée et développe des marques fortes avec une identité visuelle et une stratégie cohérente.',
    skills: ['Stratégie de marque', 'Identité visuelle', 'Positionnement', 'Naming'],
    lessons: [
      { title: 'Fondamentaux du Branding', duration: '4h' },
      { title: 'Stratégie de marque', duration: '6h' },
      { title: 'Identité visuelle', duration: '6h' },
      { title: 'Positionnement', duration: '4h' }
    ]
  },
  {
    id: 'email-marketing',
    icon: '📧',
    title: 'Email Marketing',
    category: 'Marketing',
    level: 'Débutant',
    duration: '2 mois',
    price: 60000,
    description: 'Maîtrise les campagnes d\'emailing, l\'automatisation et la délivrabilité.',
    skills: ['Emailing', 'Automatisation', 'Lead Nurturing', 'Analyse des données'],
    lessons: [
      { title: 'Introduction à l\'Email', duration: '2h' },
      { title: 'Création de campagnes', duration: '4h' },
      { title: 'Automatisation', duration: '3h' },
      { title: 'Analyse et optimisation', duration: '3h' }
    ]
  },

  // ==========================================
  // SECTEUR : DESIGN & CRÉATIF
  // ==========================================
  {
    id: 'design-graphique',
    icon: '🎨',
    title: 'Design Graphique',
    category: 'Design',
    level: 'Débutant à Avancé',
    duration: '5 mois',
    price: 140000,
    description: 'Apprends les fondamentaux du design, la typographie, la mise en page et les outils créatifs.',
    skills: ['Figma', 'Photoshop', 'Illustrator', 'UX/UI', 'Typographie'],
    lessons: [
      { title: 'Principes du Design', duration: '4h' },
      { title: 'Figma', duration: '8h' },
      { title: 'Photoshop', duration: '6h' },
      { title: 'UX Design', duration: '8h' }
    ]
  },
  {
    id: 'ux-ui-design',
    icon: '🖌️',
    title: 'UX/UI Design',
    category: 'Design',
    level: 'Intermédiaire',
    duration: '5 mois',
    price: 160000,
    description: 'Deviens expert en conception d\'expériences utilisateur et d\'interfaces intuitives.',
    skills: ['UX Research', 'Wireframing', 'Prototypage', 'UI Design', 'Usability Testing'],
    lessons: [
      { title: 'UX Research', duration: '6h' },
      { title: 'Wireframing', duration: '6h' },
      { title: 'Prototypage', duration: '8h' },
      { title: 'UI Design', duration: '8h' }
    ]
  },
  {
    id: 'motion-design',
    icon: '🎬',
    title: 'Motion Design',
    category: 'Design',
    level: 'Intermédiaire',
    duration: '4 mois',
    price: 130000,
    description: 'Apprends à créer des animations et des vidéos dynamiques avec After Effects.',
    skills: ['After Effects', 'Animation', 'Cinema 4D', 'Vidéo'],
    lessons: [
      { title: 'After Effects', duration: '8h' },
      { title: 'Animation 2D', duration: '6h' },
      { title: 'Animation 3D', duration: '6h' },
      { title: 'Montage vidéo', duration: '4h' }
    ]
  },
  {
    id: 'photographie',
    icon: '📷',
    title: 'Photographie',
    category: 'Design',
    level: 'Débutant à Intermédiaire',
    duration: '3 mois',
    price: 90000,
    description: 'Maîtrise les techniques de photographie, la composition, la lumière et le post-traitement.',
    skills: ['Composition', 'Lumière', 'Post-traitement', 'Lightroom'],
    lessons: [
      { title: 'Bases de la photo', duration: '3h' },
      { title: 'Composition et cadrage', duration: '4h' },
      { title: 'Maîtrise de la lumière', duration: '4h' },
      { title: 'Post-traitement', duration: '5h' }
    ]
  },
  {
    id: 'illustration',
    icon: '🖍️',
    title: 'Illustration Digitale',
    category: 'Design',
    level: 'Débutant',
    duration: '4 mois',
    price: 100000,
    description: 'Apprends à créer des illustrations numériques avec Procreate, Photoshop et Illustrator.',
    skills: ['Procreate', 'Illustrator', 'Techniques d\'illustration', 'Créativité'],
    lessons: [
      { title: 'Introduction à l\'illustration', duration: '3h' },
      { title: 'Procreate', duration: '6h' },
      { title: 'Techniques avancées', duration: '6h' },
      { title: 'Projets pratiques', duration: '5h' }
    ]
  },
  {
    id: 'architecture-interieur',
    icon: '🏛️',
    title: 'Architecture d\'Intérieur',
    category: 'Design',
    level: 'Débutant à Avancé',
    duration: '6 mois',
    price: 150000,
    description: 'Conçois des espaces intérieurs fonctionnels et esthétiques avec SketchUp et AutoCAD.',
    skills: ['SketchUp', 'AutoCAD', '3D', 'Décoration', 'Planification'],
    lessons: [
      { title: 'Introduction au design', duration: '4h' },
      { title: 'SketchUp', duration: '8h' },
      { title: 'AutoCAD', duration: '8h' },
      { title: 'Projets pratiques', duration: '6h' }
    ]
  },

  // ==========================================
  // SECTEUR : BUSINESS & ENTREPRENEURIAT
  // ==========================================
  {
    id: 'entrepreneuriat',
    icon: '🚀',
    title: 'Entrepreneuriat',
    category: 'Business',
    level: 'Débutant à Avancé',
    duration: '6 mois',
    price: 160000,
    description: 'Apprends à créer et gérer ton entreprise, du business plan au développement commercial.',
    skills: ['Business Plan', 'Finance', 'Marketing', 'Gestion', 'Leadership'],
    lessons: [
      { title: 'Créer son entreprise', duration: '6h' },
      { title: 'Business Plan', duration: '8h' },
      { title: 'Finance d\'entreprise', duration: '6h' },
      { title: 'Stratégie commerciale', duration: '6h' }
    ]
  },
  {
    id: 'gestion-projet',
    icon: '📋',
    title: 'Gestion de Projet',
    category: 'Business',
    level: 'Débutant à Intermédiaire',
    duration: '4 mois',
    price: 120000,
    description: 'Maîtrise les méthodologies de gestion de projet Agile, Scrum et Waterfall.',
    skills: ['Agile', 'Scrum', 'Kanban', 'Planification', 'Leadership'],
    lessons: [
      { title: 'Fondamentaux du PM', duration: '4h' },
      { title: 'Agile & Scrum', duration: '6h' },
      { title: 'Planification', duration: '4h' },
      { title: 'Gestion d\'équipe', duration: '4h' }
    ]
  },
  {
    id: 'finance-personnelle',
    icon: '💰',
    title: 'Finance Personnelle',
    category: 'Business',
    level: 'Débutant',
    duration: '3 mois',
    price: 70000,
    description: 'Apprends à gérer ton argent, investir et préparer ta retraite sereinement.',
    skills: ['Budget', 'Épargne', 'Investissement', 'Retraite', 'Gestion des dettes'],
    lessons: [
      { title: 'Bases de la finance', duration: '3h' },
      { title: 'Budget et épargne', duration: '4h' },
      { title: 'Investissement', duration: '4h' },
      { title: 'Retraite et planification', duration: '3h' }
    ]
  },
  {
    id: 'commerce-international',
    icon: '🌍',
    title: 'Commerce International',
    category: 'Business',
    level: 'Intermédiaire',
    duration: '5 mois',
    price: 140000,
    description: 'Découvre les rouages du commerce international, des douanes aux contrats.',
    skills: ['Commerce', 'Douanes', 'Logistique', 'Contrats', 'Négociation'],
    lessons: [
      { title: 'Bases du commerce', duration: '4h' },
      { title: 'Logistique internationale', duration: '6h' },
      { title: 'Droit des affaires', duration: '6h' },
      { title: 'Négociation', duration: '4h' }
    ]
  },
  {
    id: 'rh-management',
    icon: '👥',
    title: 'Ressources Humaines',
    category: 'Business',
    level: 'Débutant à Intermédiaire',
    duration: '4 mois',
    price: 110000,
    description: 'Maîtrise la gestion des talents, le recrutement et le droit du travail.',
    skills: ['Recrutement', 'Gestion des talents', 'Droit du travail', 'Formation'],
    lessons: [
      { title: 'Bases des RH', duration: '4h' },
      { title: 'Recrutement', duration: '4h' },
      { title: 'Droit du travail', duration: '6h' },
      { title: 'Gestion des conflits', duration: '4h' }
    ]
  },

  // ==========================================
  // SECTEUR : SANTÉ & MÉDICAL
  // ==========================================
  {
    id: 'infirmier',
    icon: '🏥',
    title: 'Métier d\'Infirmier',
    category: 'Santé',
    level: 'Débutant à Avancé',
    duration: '12 mois',
    price: 200000,
    description: 'Formation complète pour devenir infirmier : soins, techniques et éthique.',
    skills: ['Soins', 'Pharmacologie', 'Éthique', 'Urgences', 'Psychologie'],
    lessons: [
      { title: 'Bases des soins', duration: '8h' },
      { title: 'Pharmacologie', duration: '6h' },
      { title: 'Soins d\'urgence', duration: '8h' },
      { title: 'Éthique médicale', duration: '4h' }
    ]
  },
  {
    id: 'medecine-generale',
    icon: '🩺',
    title: 'Médecine Générale',
    category: 'Santé',
    level: 'Avancé',
    duration: '24 mois',
    price: 400000,
    description: 'Formation approfondie en médecine générale : diagnostic, traitement et prévention.',
    skills: ['Diagnostic', 'Traitement', 'Prévention', 'Urgences', 'Pathologies'],
    lessons: [
      { title: 'Anatomie', duration: '10h' },
      { title: 'Diagnostic', duration: '12h' },
      { title: 'Traitements', duration: '10h' },
      { title: 'Urgences', duration: '8h' }
    ]
  },
  {
    id: 'dentiste',
    icon: '🦷',
    title: 'Dentisterie',
    category: 'Santé',
    level: 'Avancé',
    duration: '18 mois',
    price: 350000,
    description: 'Formation complète pour devenir dentiste : soins, chirurgie et prothèses.',
    skills: ['Soins dentaires', 'Chirurgie', 'Prothèses', 'Radiologie', 'Hygiène'],
    lessons: [
      { title: 'Bases de la dentisterie', duration: '8h' },
      { title: 'Chirurgie dentaire', duration: '10h' },
      { title: 'Prothèses', duration: '8h' },
      { title: 'Radiologie', duration: '4h' }
    ]
  },
  {
    id: 'pharmacien',
    icon: '💊',
    title: 'Pharmacien',
    category: 'Santé',
    level: 'Intermédiaire à Avancé',
    duration: '14 mois',
    price: 280000,
    description: 'Formation complète en pharmacie : médicaments, conseils et gestion.',
    skills: ['Pharmacologie', 'Médicaments', 'Conseil', 'Gestion de pharmacie'],
    lessons: [
      { title: 'Pharmacologie', duration: '8h' },
      { title: 'Médicaments', duration: '10h' },
      { title: 'Conseil patient', duration: '6h' },
      { title: 'Gestion de pharmacie', duration: '4h' }
    ]
  },
  {
    id: 'nutritionniste',
    icon: '🥗',
    title: 'Nutritionniste',
    category: 'Santé',
    level: 'Intermédiaire',
    duration: '6 mois',
    price: 130000,
    description: 'Apprends la nutrition clinique, les régimes et la prévention des maladies.',
    skills: ['Nutrition', 'Diététique', 'Biodisponibilité', 'Prévention'],
    lessons: [
      { title: 'Bases de la nutrition', duration: '6h' },
      { title: 'Diététique', duration: '8h' },
      { title: 'Nutrition clinique', duration: '8h' },
      { title: 'Prévention', duration: '4h' }
    ]
  },

  // ==========================================
  // SECTEUR : ART & CULTURE
  // ==========================================
  {
    id: 'musicien',
    icon: '🎵',
    title: 'Musicien Professionnel',
    category: 'Art',
    level: 'Débutant à Avancé',
    duration: '8 mois',
    price: 120000,
    description: 'Apprends la théorie musicale, le solfège et la pratique instrumentale.',
    skills: ['Solfège', 'Instrument', 'Harmonie', 'Composition', 'Improvisation'],
    lessons: [
      { title: 'Théorie musicale', duration: '6h' },
      { title: 'Solfège', duration: '8h' },
      { title: 'Pratique instrumentale', duration: '10h' },
      { title: 'Composition', duration: '6h' }
    ]
  },
  {
    id: 'acteur',
    icon: '🎭',
    title: 'Art Dramatique',
    category: 'Art',
    level: 'Débutant à Intermédiaire',
    duration: '6 mois',
    price: 100000,
    description: 'Développe tes compétences en jeu d\'acteur, improvisation et mise en scène.',
    skills: ['Jeu d\'acteur', 'Improvisation', 'Mise en scène', 'Expression', 'Prise de parole'],
    lessons: [
      { title: 'Bases du théâtre', duration: '4h' },
      { title: 'Techniques d\'acteur', duration: '8h' },
      { title: 'Improvisation', duration: '6h' },
      { title: 'Mise en scène', duration: '4h' }
    ]
  },
  {
    id: 'danses',
    icon: '💃',
    title: 'Danse',
    category: 'Art',
    level: 'Débutant',
    duration: '4 mois',
    price: 80000,
    description: 'Apprends plusieurs styles de danse : classique, moderne et contemporain.',
    skills: ['Technique', 'Chorégraphie', 'Expression corporelle', 'Rythme'],
    lessons: [
      { title: 'Techniques de danse', duration: '6h' },
      { title: 'Chorégraphie', duration: '8h' },
      { title: 'Expression corporelle', duration: '4h' },
      { title: 'Styles de danse', duration: '6h' }
    ]
  },
  {
    id: 'peintre',
    icon: '🖼️',
    title: 'Peinture Artistique',
    category: 'Art',
    level: 'Débutant',
    duration: '4 mois',
    price: 70000,
    description: 'Maîtrise les techniques de peinture : acrylique, aquarelle, huile.',
    skills: ['Peinture', 'Couleurs', 'Composition', 'Techniques', 'Créativité'],
    lessons: [
      { title: 'Introduction', duration: '3h' },
      { title: 'Techniques de peinture', duration: '6h' },
      { title: 'Couleurs et composition', duration: '4h' },
      { title: 'Projets pratiques', duration: '5h' }
    ]
  },

  // ==========================================
  // SECTEUR : BÂTIMENT & TRAVAUX
  // ==========================================
  {
    id: 'maçon',
    icon: '🧱',
    title: 'Maçonnerie',
    category: 'Bâtiment',
    level: 'Débutant',
    duration: '4 mois',
    price: 60000,
    description: 'Apprends les techniques de maçonnerie : construction, rénovation et finitions.',
    skills: ['Construction', 'Rénovation', 'Lecture de plans', 'Finitions'],
    lessons: [
      { title: 'Bases de la maçonnerie', duration: '4h' },
      { title: 'Techniques de construction', duration: '6h' },
      { title: 'Rénovation', duration: '4h' },
      { title: 'Finitions', duration: '4h' }
    ]
  },
  {
    id: 'electricien',
    icon: '⚡',
    title: 'Électricien',
    category: 'Bâtiment',
    level: 'Débutant',
    duration: '5 mois',
    price: 75000,
    description: 'Formation complète pour devenir électricien : installations, sécurité et dépannage.',
    skills: ['Installations', 'Câblage', 'Sécurité', 'Dépannage', 'Normes'],
    lessons: [
      { title: 'Bases de l\'électricité', duration: '4h' },
      { title: 'Installations', duration: '8h' },
      { title: 'Sécurité électrique', duration: '4h' },
      { title: 'Dépannage', duration: '4h' }
    ]
  },
  {
    id: 'plombier',
    icon: '🔧',
    title: 'Plomberie',
    category: 'Bâtiment',
    level: 'Débutant',
    duration: '4 mois',
    price: 65000,
    description: 'Maîtrise les techniques de plomberie : installations, réparations et maintenance.',
    skills: ['Installations', 'Réparations', 'Maintenance', 'Lecture de plans'],
    lessons: [
      { title: 'Bases de la plomberie', duration: '4h' },
      { title: 'Installations', duration: '6h' },
      { title: 'Réparations', duration: '6h' },
      { title: 'Maintenance', duration: '4h' }
    ]
  },
  {
    id: 'menuiserie',
    icon: '🪵',
    title: 'Menuiserie',
    category: 'Bâtiment',
    level: 'Débutant',
    duration: '5 mois',
    price: 70000,
    description: 'Apprends le travail du bois : fabrication, assemblage et finitions.',
    skills: ['Travail du bois', 'Assemblage', 'Fabrication', 'Finitions'],
    lessons: [
      { title: 'Bases de la menuiserie', duration: '4h' },
      { title: 'Techniques de travail', duration: '8h' },
      { title: 'Assemblage', duration: '6h' },
      { title: 'Finitions', duration: '4h' }
    ]
  },
  {
    id: 'soudeur',
    icon: '🔥',
    title: 'Soudure',
    category: 'Bâtiment',
    level: 'Débutant à Intermédiaire',
    duration: '4 mois',
    price: 70000,
    description: 'Maîtrise les techniques de soudure : MIG, TIG et électrode.',
    skills: ['MIG', 'TIG', 'Électrode', 'Sécurité', 'Lecture de plans'],
    lessons: [
      { title: 'Bases de la soudure', duration: '4h' },
      { title: 'Techniques MIG/TIG', duration: '8h' },
      { title: 'Sécurité', duration: '3h' },
      { title: 'Pratique', duration: '5h' }
    ]
  },

  // ==========================================
  // SECTEUR : AGRICULTURE & ENVIRONNEMENT
  // ==========================================
  {
    id: 'agriculteur',
    icon: '🌾',
    title: 'Agriculture',
    category: 'Agriculture',
    level: 'Débutant',
    duration: '6 mois',
    price: 60000,
    description: 'Apprends les techniques agricoles modernes : culture, élevage et gestion.',
    skills: ['Culture', 'Élevage', 'Gestion', 'Irrigation', 'Machines'],
    lessons: [
      { title: 'Bases de l\'agriculture', duration: '6h' },
      { title: 'Techniques de culture', duration: '8h' },
      { title: 'Élevage', duration: '6h' },
      { title: 'Gestion', duration: '4h' }
    ]
  },
  {
    id: 'jardinier',
    icon: '🌱',
    title: 'Jardinier Paysagiste',
    category: 'Agriculture',
    level: 'Débutant',
    duration: '3 mois',
    price: 50000,
    description: 'Crée et entretiens des espaces verts : jardins, parcs et aménagements.',
    skills: ['Jardinage', 'Aménagement', 'Entretien', 'Plantes', 'Design'],
    lessons: [
      { title: 'Bases du jardinage', duration: '3h' },
      { title: 'Aménagement paysager', duration: '4h' },
      { title: 'Entretien', duration: '4h' },
      { title: 'Plantes', duration: '3h' }
    ]
  },
  {
    id: 'viticulture',
    icon: '🍇',
    title: 'Viticulture',
    category: 'Agriculture',
    level: 'Débutant',
    duration: '4 mois',
    price: 60000,
    description: 'Apprends les techniques de culture de la vigne et de production viticole.',
    skills: ['Vigne', 'Vinification', 'Terroir', 'Gestion'],
    lessons: [
      { title: 'Bases de la viticulture', duration: '4h' },
      { title: 'Techniques de culture', duration: '6h' },
      { title: 'Vinification', duration: '4h' },
      { title: 'Gestion', duration: '3h' }
    ]
  },

  // ==========================================
  // SECTEUR : TRANSPORT & LOGISTIQUE
  // ==========================================
  {
    id: 'chauffeur-poids-lourd',
    icon: '🚛',
    title: 'Chauffeur Poids Lourd',
    category: 'Transport',
    level: 'Débutant',
    duration: '3 mois',
    price: 50000,
    description: 'Formation pour obtenir le permis poids lourd et conduire professionnellement.',
    skills: ['Conduite', 'Sécurité routière', 'Réglementation', 'Logistique'],
    lessons: [
      { title: 'Bases de la conduite', duration: '4h' },
      { title: 'Sécurité routière', duration: '4h' },
      { title: 'Réglementation', duration: '3h' },
      { title: 'Pratique', duration: '6h' }
    ]
  },
  {
    id: 'logisticien',
    icon: '📦',
    title: 'Logisticien',
    category: 'Transport',
    level: 'Débutant',
    duration: '4 mois',
    price: 65000,
    description: 'Maîtrise la gestion des flux, des stocks et de la chaîne logistique.',
    skills: ['Supply Chain', 'Gestion des stocks', 'Transport', 'Informatique'],
    lessons: [
      { title: 'Bases de la logistique', duration: '4h' },
      { title: 'Gestion des stocks', duration: '6h' },
      { title: 'Transport', duration: '4h' },
      { title: 'Informatique logistique', duration: '4h' }
    ]
  },

  // ==========================================
  // SECTEUR : HÔTELLERIE & RESTAURATION
  // ==========================================
  {
    id: 'cuisinier',
    icon: '🍳',
    title: 'Cuisinier Professionnel',
    category: 'Hôtellerie',
    level: 'Débutant à Intermédiaire',
    duration: '5 mois',
    price: 80000,
    description: 'Apprends les techniques culinaires, la cuisine internationale et la gestion de cuisine.',
    skills: ['Techniques culinaires', 'Pâtisserie', 'Gestion', 'Hygiène', 'Créativité'],
    lessons: [
      { title: 'Bases de la cuisine', duration: '6h' },
      { title: 'Techniques', duration: '8h' },
      { title: 'Pâtisserie', duration: '6h' },
      { title: 'Gestion de cuisine', duration: '4h' }
    ]
  },
  {
    id: 'pâtissier',
    icon: '🧁',
    title: 'Pâtissier',
    category: 'Hôtellerie',
    level: 'Débutant',
    duration: '4 mois',
    price: 70000,
    description: 'Maîtrise l\'art de la pâtisserie : viennoiseries, desserts et chocolat.',
    skills: ['Pâtisserie', 'Chocolat', 'Viennoiseries', 'Décoration', 'Créativité'],
    lessons: [
      { title: 'Bases de la pâtisserie', duration: '4h' },
      { title: 'Viennoiseries', duration: '6h' },
      { title: 'Desserts', duration: '6h' },
      { title: 'Décoration', duration: '4h' }
    ]
  },
  {
    id: 'serveur',
    icon: '🍽️',
    title: 'Serveur en Restaurant',
    category: 'Hôtellerie',
    level: 'Débutant',
    duration: '2 mois',
    price: 40000,
    description: 'Apprends le service en salle, le savoir-être et la gestion de la relation client.',
    skills: ['Service', 'Relation client', 'Savoir-être', 'Gestion des tensions'],
    lessons: [
      { title: 'Bases du service', duration: '3h' },
      { title: 'Relation client', duration: '3h' },
      { title: 'Savoir-être', duration: '2h' },
      { title: 'Pratique', duration: '4h' }
    ]
  },

  // ==========================================
  // SECTEUR : SERVICES & BIEN-ÊTRE
  // ==========================================
  {
    id: 'coiffeur',
    icon: '💇',
    title: 'Coiffeur',
    category: 'Services',
    level: 'Débutant',
    duration: '4 mois',
    price: 60000,
    description: 'Apprends les techniques de coiffure : coupes, coloration et coiffage.',
    skills: ['Coupes', 'Coloration', 'Coiffage', 'Conseil client', 'Hygiène'],
    lessons: [
      { title: 'Bases de la coiffure', duration: '4h' },
      { title: 'Techniques de coupe', duration: '6h' },
      { title: 'Coloration', duration: '4h' },
      { title: 'Pratique', duration: '6h' }
    ]
  },
  {
    id: 'esthéticienne',
    icon: '💄',
    title: 'Esthéticienne',
    category: 'Services',
    level: 'Débutant',
    duration: '4 mois',
    price: 65000,
    description: 'Formation complète en soins esthétiques : visage, corps et maquillage.',
    skills: ['Soins du visage', 'Soins du corps', 'Maquillage', 'Conseil client'],
    lessons: [
      { title: 'Bases de l\'esthétique', duration: '4h' },
      { title: 'Soins du visage', duration: '6h' },
      { title: 'Soins du corps', duration: '4h' },
      { title: 'Maquillage', duration: '6h' }
    ]
  },
  {
    id: 'masseur',
    icon: '💆',
    title: 'Masseur Thérapeute',
    category: 'Services',
    level: 'Débutant à Intermédiaire',
    duration: '6 mois',
    price: 90000,
    description: 'Apprends les techniques de massage et de relaxation pour le bien-être.',
    skills: ['Massage', 'Relaxation', 'Anatomie', 'Écoute', 'Bien-être'],
    lessons: [
      { title: 'Bases du massage', duration: '4h' },
      { title: 'Techniques', duration: '8h' },
      { title: 'Anatomie', duration: '4h' },
      { title: 'Pratique', duration: '6h' }
    ]
  },

  // ==========================================
  // SECTEUR : ÉDUCATION & ENSEIGNEMENT
  // ==========================================
  {
    id: 'enseignant',
    icon: '👨‍🏫',
    title: 'Enseignant',
    category: 'Éducation',
    level: 'Débutant à Intermédiaire',
    duration: '8 mois',
    price: 100000,
    description: 'Formation complète pour devenir enseignant : pédagogie, psychologie et gestion de classe.',
    skills: ['Pédagogie', 'Psychologie', 'Gestion de classe', 'Communication'],
    lessons: [
      { title: 'Bases de la pédagogie', duration: '6h' },
      { title: 'Psychologie de l\'enfant', duration: '8h' },
      { title: 'Gestion de classe', duration: '6h' },
      { title: 'Communication', duration: '4h' }
    ]
  },
  {
    id: 'formateur',
    icon: '📚',
    title: 'Formateur Professionnel',
    category: 'Éducation',
    level: 'Intermédiaire',
    duration: '6 mois',
    price: 110000,
    description: 'Apprends à concevoir et animer des formations pour adultes.',
    skills: ['Ingénierie pédagogique', 'Animation', 'Évaluation', 'Management'],
    lessons: [
      { title: 'Ingénierie pédagogique', duration: '6h' },
      { title: 'Techniques d\'animation', duration: '8h' },
      { title: 'Évaluation', duration: '4h' },
      { title: 'Management', duration: '4h' }
    ]
  },

  // ==========================================
  // SECTEUR : MÉTIERS ARTISANAUX
  // ==========================================
  {
    id: 'bijoutier',
    icon: '💍',
    title: 'Bijouterie',
    category: 'Artisanat',
    level: 'Débutant',
    duration: '6 mois',
    price: 80000,
    description: 'Apprends l\'art de la bijouterie : sertissage, polissage et création.',
    skills: ['Bijouterie', 'Sertissage', 'Polissage', 'Création'],
    lessons: [
      { title: 'Bases de la bijouterie', duration: '4h' },
      { title: 'Sertissage', duration: '8h' },
      { title: 'Polissage', duration: '4h' },
      { title: 'Création', duration: '6h' }
    ]
  },
  {
    id: 'cordonnier',
    icon: '👞',
    title: 'Cordonnerie',
    category: 'Artisanat',
    level: 'Débutant',
    duration: '4 mois',
    price: 50000,
    description: 'Maîtrise la réparation et la fabrication de chaussures artisanales.',
    skills: ['Réparation', 'Fabrication', 'Cuir', 'Techniques'],
    lessons: [
      { title: 'Bases de la cordonnerie', duration: '3h' },
      { title: 'Réparation', duration: '4h' },
      { title: 'Fabrication', duration: '6h' },
      { title: 'Travail du cuir', duration: '5h' }
    ]
  },

  // ==========================================
  // SECTEUR : MÉDIAS & COMMUNICATION
  // ==========================================
  {
    id: 'journaliste',
    icon: '📰',
    title: 'Journalisme',
    category: 'Médias',
    level: 'Débutant à Intermédiaire',
    duration: '6 mois',
    price: 100000,
    description: 'Apprends les techniques d\'enquête, de rédaction et de reportage.',
    skills: ['Enquête', 'Rédaction', 'Reportage', 'Éthique', 'Communication'],
    lessons: [
      { title: 'Bases du journalisme', duration: '4h' },
      { title: 'Techniques d\'enquête', duration: '6h' },
      { title: 'Rédaction', duration: '6h' },
      { title: 'Éthique', duration: '3h' }
    ]
  },
  {
    id: 'video-maker',
    icon: '🎥',
    title: 'Vidéaste',
    category: 'Médias',
    level: 'Débutant à Intermédiaire',
    duration: '4 mois',
    price: 90000,
    description: 'Maîtrise la création vidéo : tournage, montage et diffusion.',
    skills: ['Tournage', 'Montage', 'Éclairage', 'Son', 'Post-production'],
    lessons: [
      { title: 'Bases de la vidéo', duration: '3h' },
      { title: 'Tournage', duration: '6h' },
      { title: 'Montage', duration: '8h' },
      { title: 'Post-production', duration: '4h' }
    ]
  },

  // ==========================================
  // SECTEUR : SPORT & FITNESS
  // ==========================================
  {
    id: 'coach-sportif',
    icon: '💪',
    title: 'Coach Sportif',
    category: 'Sport',
    level: 'Débutant à Intermédiaire',
    duration: '5 mois',
    price: 80000,
    description: 'Formation pour devenir coach sportif : techniques, nutrition et motivation.',
    skills: ['Fitness', 'Nutrition', 'Motivation', 'Techniques sportives'],
    lessons: [
      { title: 'Bases du coaching', duration: '4h' },
      { title: 'Techniques sportives', duration: '6h' },
      { title: 'Nutrition sportive', duration: '4h' },
      { title: 'Motivation', duration: '3h' }
    ]
  },
  {
    id: 'yoga-instructeur',
    icon: '🧘',
    title: 'Instructeur de Yoga',
    category: 'Sport',
    level: 'Débutant',
    duration: '4 mois',
    price: 70000,
    description: 'Apprends les postures de yoga, la méditation et la respiration.',
    skills: ['Postures', 'Méditation', 'Respiration', 'Relaxation'],
    lessons: [
      { title: 'Bases du yoga', duration: '4h' },
      { title: 'Postures', duration: '8h' },
      { title: 'Méditation', duration: '4h' },
      { title: 'Respiration', duration: '3h' }
    ]
  }
];

if (typeof window !== 'undefined') {
  window.COURSES_DATA = COURSES_DATA;
  console.log('✅ ' + COURSES_DATA.length + ' cours chargés !');
}