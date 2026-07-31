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
  'bio': "Bonjour, moi c'est Sébastien ! Ingénieur mécanicien, je suis passionné par la conception de systèmes, leur mise à l'épreuve et leur amélioration continue. De la robotique aux systèmes énergétiques renouvelables, je suis toujours curieux de contribuer à faire avancer le monde. N'hésitez pas à me contacter si vous souhaitez échanger !",
  'tab-projects': "Projets",

  'cv-airaro-date': "Mars 2026 – Sept. 2026",
  'cv-airaro-title': "Ingénieur en R&D",
  'cv-airaro-org': "AIRARO SAS · Travail de Master",
  'cv-airaro-desc': "Conception d'un outil de dimensionnement à partir de données réelles d'une centrale SWAC, combinant modélisation thermique, hydraulique et économique. Mise en évidence de leviers d'amélioration portant le COP à +25 %.",

  'cv-odewa-date': "Sept. 2025 – Fév. 2026",
  'cv-odewa-title': "Ingénieur en R&D",
  'cv-odewa-org': "ODEWA · Polynésie française",
  'cv-odewa-desc': "Responsable du cycle complet d'une machine automatisée d'extraction de déchets sous-marins : cahier des charges, conception CAO, dimensionnement par éléments finis, fabrication et validation sur le terrain. 1 tonne de déchets extraite en 2 jours sur site.",

  'cv-biorob-date': "Fév. 2025 – Juil. 2025",
  'cv-biorob-title': "Pieds biomimétiques compliants",
  'cv-biorob-org': "BioRob Lab, EPFL",
  'cv-biorob-desc': "Conception et caractérisation, en banc d'essai, de pieds compliants pour un robot salamandre ; intégration sur le robot et validation par capture de mouvement, avec un gain de 15 % en efficacité de locomotion.",

  'cv-rrl-date': "Sept. 2024 – Fév. 2025",
  'cv-rrl-title': "Plateforme robotique à 3 degrés de liberté",
  'cv-rrl-org': "Reconfigurable Robotics Lab, EPFL",
  'cv-rrl-desc': "Refonte de la structure de la plateforme pour supporter le poids d'un humain, et développement d'un pipeline temps réel extrayant la locomotion d'une vidéo pour piloter la plateforme.",

  'cv-zf-date': "Sept. 2023 – Mars 2024",
  'cv-zf-title': "Optimisation du stockage d'énergie",
  'cv-zf-org': "Collaboration avec ZF Group",
  'cv-zf-desc': "Démonstrateur physique à échelle réduite, intégrant de l'électronique Arduino, pour une station d'échange de batteries, complété par une étude de modèle économique.",

  'cv-master-date': "2023 – 2026",
  'cv-master-title': "Master en génie mécanique",
  'cv-master-org': "EPFL · spécialisation Conception et Production, mineur Management de la Technologie et Entrepreneuriat",

  'cv-racing-date': "Fév. 2022 – Août 2023",
  'cv-racing-title': "Propulsion électrique in-wheel",
  'cv-racing-org': "EPFL Racing Team · Formula Student",
  'cv-racing-desc': "Conception et optimisation d'une boîte de vitesses in-wheel sous fortes contraintes thermiques, massiques et réglementaires, du concept jusqu'à la voiture de course.",

  'cv-bachelor-date': "2019 – 2023",
  'cv-bachelor-title': "Bachelor en génie mécanique",

  'lang-label': "Langues :",
  'lang-value': "Français (natif, C2), Anglais (courant, C2)",

  'odewa-date': "Sept. 2025 – Fév. 2026",
  'odewa-title': "Une machine d'extraction opérationnelle en 6 mois",
  'odewa-meta': "ODEWA · Stage d'ingénierie R&D, Polynésie française",
  'odewa-text': "Conception, fabrication et validation sur le terrain d'une machine automatisée d'extraction de déchets sous-marins, déployée sur une ferme perlière en Polynésie française. Seul ingénieur sur ce projet, du cahier des charges jusqu'à la validation in situ, en passant par la CAO, le dimensionnement structurel et la fabrication, le tout en six mois. Les données recueillies sur ce premier prototype orientent aujourd'hui la conception d'une seconde génération de la machine.",
  'odewa-keyfig-big': "1 tonne en 2 jours",
  'odewa-keyfig-desc': "de déchets sous-marins récoltés et nettoyés lors des essais sur le terrain",

  'airaro-date': "Mars 2026 – Sept. 2026",
  'airaro-title': "Un outil de dimensionnement SWAC conçu à partir de données réelles",
  'airaro-meta': "AIRARO SAS · Travail de Master en R&D",
  'airaro-text': "Analyse de données d'exploitation réelles d'une centrale SWAC (Sea Water Air Conditioning) et développement d'un outil de dimensionnement thermique, hydraulique et économique pour guider la conception des futures installations, aujourd'hui intégré au plan d'affaires de l'entreprise.",
  'airaro-keyfig-desc': "gain de performance (COP) identifié grâce à l'outil de dimensionnement",

  'biorob-date': "Fév. 2025 – Juil. 2025",
  'biorob-title': "Pieds compliants pour un robot salamandre",
  'biorob-meta': "BioRob Laboratory, EPFL · projet de recherche",
  'biorob-text': "Conception et caractérisation, en banc d'essai, de pieds compliants pour un robot de type salamandre, puis intégration sur la plateforme et validation par capture de mouvement.",
  'biorob-keyfig-big': "+15 % d'efficacité de locomotion",
  'biorob-keyfig-desc': "mesuré sur le robot après intégration des pieds compliants",

  'rrl-date': "Sept. 2024 – Fév. 2025",
  'rrl-title': "Refonte d'une plateforme à 3 degrés de liberté pour porter un humain",
  'rrl-meta': "Reconfigurable Robotics Laboratory, EPFL · projet de recherche",
  'rrl-text': "Refonte de la structure d'une plateforme à 3 degrés de liberté pour porter un humain en toute sécurité, associée au développement d'un pipeline temps réel extrayant la locomotion d'une vidéo pour piloter la plateforme.",

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
  'gripper-text': "Conception d'une pince dont la force de préhension est fixée mécaniquement plutôt que par un contrôle actif, complétée par un capteur qui pèse l'objet saisi.",

  'hull-date': "Janv. 2024 – Juin 2024",
  'hull-title': "Robot autonome de nettoyage de coque",
  'hull-meta': "Étude de développement produit, phase avant-projet",
  'hull-text': "Étude de concept pour un robot autonome de nettoyage de coques de bateaux, des besoins utilisateurs jusqu'au choix d'architecture et à la conception détaillée.",

  'contact-eyebrow': "Me contacter",
  'contact-title': "Construisons ensemble quelque chose qui tient la route",
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

// ---------- CV timeline -> Projects tab links ----------
function initTimelineLinks() {
  document.querySelectorAll('.timeline-item[data-project]').forEach(item => {
    item.addEventListener('click', () => {
      const projectId = item.dataset.project;
      const target = document.getElementById(projectId);
      if (!target) return;

      document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === 'projects'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'tab-projects'));
      history.replaceState(null, '', '#projects');

      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('project-highlight');
        setTimeout(() => target.classList.remove('project-highlight'), 1400);
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initCarousels();
  initI18n();
  initTimelineLinks();
});
