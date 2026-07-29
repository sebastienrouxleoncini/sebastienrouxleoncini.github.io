// ---------- Tabs ----------
function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  function activate(tabId, pushHash) {
    buttons.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    panels.forEach(p => p.classList.toggle('active', p.id === 'tab-' + tabId));
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    if (pushHash) history.replaceState(null, '', '#' + tabId);
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => activate(btn.dataset.tab, true));
  });

  const initial = (location.hash || '#cv').slice(1);
  activate(['cv', 'projects', 'contact'].includes(initial) ? initial : 'cv', false);
}

// ---------- Carousels ----------
function initCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(root => {
    const track = root.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const dotsWrap = root.querySelector('.car-dots');
    const prevBtn = root.querySelector('.car-btn.prev');
    const nextBtn = root.querySelector('.car-btn.next');
    let index = 0;

    if (slides.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
    }

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'car-dot';
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', () => go(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }
    function go(i) {
      index = (i + slides.length) % slides.length;
      render();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => go(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => go(index + 1));

    // swipe support
    let startX = null;
    track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });

    render();
  });
}

// ---------- Language toggle (English default, French translations below) ----------
const frText = {
  'bio': "Salut, je suis Seb ! Je suis ingénieur mécanicien et j'aime construire des choses qui survivent au monde réel. Je passe mon temps libre dans ou sur l'océan, et à la montagne. N'hésite pas à me contacter si tu veux échanger !",
  'tab-projects': "Projets",

  'cv-airaro-date': "Mars 2026 – Sept. 2026",
  'cv-airaro-title': "Ingénieur R&D",
  'cv-airaro-org': "AIRARO SAS — Projet de Master",
  'cv-airaro-desc': "A construit un outil de dimensionnement à partir de données réelles d'une centrale SWAC, combinant modélisation thermique, hydraulique et économique. A identifié des améliorations augmentant le COP de 25%.",

  'cv-odewa-date': "Sept. 2025 – Fév. 2026",
  'cv-odewa-title': "Ingénieur R&D",
  'cv-odewa-org': "ODEWA — Polynésie française",
  'cv-odewa-desc': "Responsable du cycle complet d'une machine automatisée d'extraction de déchets sous-marins : cahier des charges, CAO, FEA, fabrication et validation sur le terrain. 1 tonne extraite en 2 jours sur site.",

  'cv-biorob-date': "Fév. 2025 – Juil. 2025",
  'cv-biorob-title': "Pieds biomimétiques compliants",
  'cv-biorob-org': "BioRob Lab, EPFL",
  'cv-biorob-desc': "Conception et test en banc d'essai de pieds compliants pour un robot salamandre ; intégrés et validés par capture de mouvement — +15% d'efficacité de locomotion.",

  'cv-rrl-date': "Sept. 2024 – Fév. 2025",
  'cv-rrl-title': "Plateforme robotique à 3 degrés de liberté",
  'cv-rrl-org': "Reconfigurable Robotics Lab, EPFL",
  'cv-rrl-desc': "Redessiné la structure de la plateforme pour porter un humain ; développé un pipeline temps réel vidéo-vers-mouvement pour la piloter.",

  'cv-zf-date': "Sept. 2023 – Mars 2024",
  'cv-zf-title': "Optimisation du stockage d'énergie",
  'cv-zf-org': "Collaboration avec ZF Group",
  'cv-zf-desc': "Démonstrateur physique à échelle réduite avec électronique Arduino pour une station d'échange de batteries, complété par une étude de modèle économique.",

  'cv-master-date': "2023 – 2026",
  'cv-master-title': "Master en génie mécanique",
  'cv-master-org': "EPFL — Design & Production, mineur en Management de la Technologie et Entrepreneuriat",

  'cv-racing-date': "Fév. 2022 – Août 2023",
  'cv-racing-title': "Propulsion électrique in-wheel",
  'cv-racing-org': "EPFL Racing Team — Formula Student",
  'cv-racing-desc': "Conception et optimisation d'une boîte de vitesses in-wheel sous fortes contraintes thermiques, de masse et réglementaires, du concept jusqu'à la voiture de course.",

  'cv-bachelor-date': "2019 – 2023",
  'cv-bachelor-title': "Bachelor en génie mécanique",

  'lang-label': "Langues —",
  'lang-value': "Français (natif, C2), Anglais (courant, C2)",

  'odewa-date': "Sept. 2025 – Fév. 2026",
  'odewa-title': "Une machine d'extraction fonctionnelle en 6 mois",
  'odewa-meta': "ODEWA — Stage d'ingénierie R&D, Polynésie française",
  'odewa-text': "Conception, fabrication et test sur le terrain d'une machine automatisée d'extraction de déchets, déployée sur une ferme perlière en Polynésie française — seul ingénieur du cahier des charges à la CAO, au dimensionnement structurel, à la fabrication et à la validation in situ, en six mois. Les données du premier prototype guident aujourd'hui une machine de seconde génération.",
  'odewa-keyfig-big': "1 tonne en 2 jours",
  'odewa-keyfig-desc': "de déchets sous-marins extraits et nettoyés durant la validation sur le terrain",

  'airaro-date': "Mars 2026 – Sept. 2026",
  'airaro-title': "Un outil de dimensionnement construit à partir de données réelles",
  'airaro-meta': "AIRARO SAS — Projet de Master, stage d'ingénierie R&D",
  'airaro-text': "Analyse des données d'exploitation en temps réel d'une centrale SWAC et développement d'un outil de dimensionnement thermique, hydraulique et économique pour guider la conception de futures installations, aujourd'hui intégré au business plan de l'entreprise.",
  'airaro-keyfig-desc': "gain de coefficient de performance identifié par l'outil de dimensionnement",

  'biorob-date': "Fév. 2025 – Juil. 2025",
  'biorob-title': "Pieds compliants pour un robot salamandre",
  'biorob-meta': "BioRob Laboratory, EPFL — projet de recherche",
  'biorob-text': "Conception et test en banc d'essai de pieds compliants pour un robot de type salamandre, puis intégration et validation sur la plateforme par capture de mouvement.",
  'biorob-keyfig-big': "+15% d'efficacité de locomotion",
  'biorob-keyfig-desc': "mesuré sur le robot après intégration des pieds compliants",

  'rrl-date': "Sept. 2024 – Fév. 2025",
  'rrl-title': "Repenser une plateforme à 3 degrés de liberté pour porter un humain",
  'rrl-meta': "Reconfigurable Robotics Laboratory, EPFL — projet de recherche",
  'rrl-text': "Redessiné la structure d'une plateforme à 3 degrés de liberté pour porter un humain en toute sécurité, et développé un pipeline temps réel qui extrait la locomotion depuis une vidéo pour la piloter.",

  'zf-date': "Sept. 2023 – Mars 2024",
  'zf-title': "Intégration matérielle pour un optimiseur de station d'échange de batteries",
  'zf-meta': "Collaboration avec ZF Group",
  'zf-text': "Construction d'un démonstrateur physique à échelle réduite d'une station d'échange de batteries, traduisant les décisions d'un modèle d'optimisation en comportement matériel réel.",

  'motor-date': "Fév. 2022 – Août 2023",
  'motor-title': "Moteur et boîte de vitesses in-wheel pour une voiture Formula Student",
  'motor-text': "Conception de la boîte de vitesses et intégration du système de propulsion in-wheel pour une voiture Formula Student, du concept jusqu'à la voiture de course.",
  'motor-linkbox-lbl': "En savoir plus",

  'gripper-date': "Sept. 2024 – Janv. 2025",
  'gripper-title': "Une pince simple et efficace pour un bras robotique",
  'gripper-meta': "Projet personnel",
  'gripper-text': "Construction d'une pince qui fixe la force de préhension mécaniquement plutôt que par un contrôle actif, avec un capteur pour peser ce qu'elle tient.",

  'hull-date': "Janv. 2024 – Juin 2024",
  'hull-title': "Robot autonome de nettoyage de coque",
  'hull-meta': "Étude de développement produit, phase concept",
  'hull-text': "Étude de concept pour un robot autonome de nettoyage de coques de bateaux, des besoins utilisateurs jusqu'au choix d'architecture et à la conception détaillée.",

  'contact-eyebrow': "Me contacter",
  'contact-title': "Construisons quelque chose qui survit au contact de la réalité",
  'footer-sub': "Portfolio d'ingénierie",
};

function initI18n() {
  const nodes = document.querySelectorAll('[data-i18n]');
  nodes.forEach(el => { el.dataset.orig = el.textContent; });
  const btn = document.getElementById('lang-toggle');

  function apply(lang) {
    nodes.forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = (lang === 'fr' && frText[key]) ? frText[key] : el.dataset.orig;
    });
    document.documentElement.lang = lang;
    btn.textContent = lang === 'en' ? 'FR' : 'EN';
    localStorage.setItem('lang', lang);
  }

  let lang = localStorage.getItem('lang') || 'en';
  btn.addEventListener('click', () => {
    lang = lang === 'en' ? 'fr' : 'en';
    apply(lang);
  });
  apply(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initCarousels();
  initI18n();
});
