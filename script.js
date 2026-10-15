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
  'bio': "Bonjour, moi c'est Sébastien ! Ingénieur d'études, je conçois des systèmes concrets, des premiers calculs thermiques, structurels et hydrauliques jusqu'aux prototypes testés sur le terrain. Ce qui me passionne : construire des systèmes qui fonctionnent vraiment, de la robotique aux énergies renouvelables. N'hésitez pas à me contacter pour échanger !",
  'role': "Ingénieur d'études · Procédés · Conception mécanique · Prototypage",
  'tab-projects': "Projets",

  'cv-airaro2-date': "sept. 2026 – janv. 2027",
  'cv-airaro2-title': "Ingénieur d'études",
  'cv-airaro2-org': "AIRARO SAS · CDD",
  'cv-airaro2-desc': "Modélisation et dimensionnement de centrales SWAC (climatisation par eau de mer profonde), rédaction de dossiers d'appel d'offres. Développement de l'outil de dimensionnement conçu pendant mon stage de fin d'études.",

  'cv-airaro-date': "mars 2026 – sept. 2026",
  'cv-airaro-title': "Ingénieur R&D · Stage de fin d'études",
  'cv-airaro-org': "AIRARO SAS · Projet de Master EPFL",
  'cv-airaro-desc': "Développement d'un outil de dimensionnement de centrales SWAC à partir des données d'exploitation d'une installation en service, couplant modèles thermique, hydraulique et économique. Identification d'optimisations augmentant le COP de 25 %.",

  'cv-odewa-date': "sept. 2025 – févr. 2026",
  'cv-odewa-title': "Ingénieur R&D · Stage",
  'cv-odewa-org': "ODEWA · Polynésie française",
  'cv-odewa-desc': "Responsable de l'ensemble du développement d'une machine automatisée d'extraction de déchets sous-marins : cahier des charges, conception CAO, dimensionnement par éléments finis, fabrication et validation sur site. 1 tonne de déchets extraite en 2 jours lors des essais.",

  'cv-biorob-date': "févr. 2025 – juil. 2025",
  'cv-biorob-title': "Pieds biomimétiques souples",
  'cv-biorob-org': "Laboratoire BioRob, EPFL",
  'cv-biorob-desc': "Conception de pieds souples pour un robot de type salamandre, caractérisation sur banc d'essai dédié, puis intégration et validation par capture de mouvement : +15 % d'efficacité de locomotion.",

  'cv-rrl-date': "sept. 2024 – févr. 2025",
  'cv-rrl-title': "Plateforme robotique à 3 degrés de liberté",
  'cv-rrl-org': "Reconfigurable Robotics Lab, EPFL",
  'cv-rrl-desc': "Refonte de la structure de la plateforme pour supporter le poids d'une personne, et développement d'une chaîne de traitement en temps réel qui extrait la locomotion d'une vidéo pour la piloter.",

  'cv-zf-date': "sept. 2023 – mars 2024",
  'cv-zf-title': "Optimisation du stockage d'énergie",
  'cv-zf-org': "Projet en collaboration avec ZF Group",
  'cv-zf-desc': "Réalisation d'un démonstrateur physique à échelle réduite d'une station d'échange de batteries, piloté par Arduino, complétée par une étude de modèle économique.",

  'cv-master-date': "2023 – 2026",
  'cv-master-title': "Master en génie mécanique",
  'cv-master-org': "EPFL · Spécialisation conception et production, mineur en management de la technologie et entrepreneuriat",

  'cv-racing-date': "févr. 2022 – août 2023",
  'cv-racing-title': "Moteur-roue électrique et volant",
  'cv-racing-org': "EPFL Racing Team · Formula Student",
  'cv-racing-desc': "Conception et optimisation d'un réducteur intégré à la roue, sous fortes contraintes thermiques, de masse et réglementaires, du concept à la voiture en compétition. Conception et fabrication d'un volant ergonomique en fibre de carbone à commandes électroniques intégrées.",

  'cv-bachelor-date': "2019 – 2023",
  'cv-bachelor-title': "Bachelor en génie mécanique",

  'lang-label': "Langues :",
  'lang-value': "français (langue maternelle), anglais (courant, C2)",

  'odewa-date': "sept. 2025 – févr. 2026",
  'odewa-title': "Une machine d'extraction opérationnelle en 6 mois",
  'odewa-meta': "ODEWA · Stage ingénieur R&D, Polynésie française",
  'odewa-text': "Conception, fabrication et validation sur site d'une machine automatisée d'extraction des déchets sous-marins issus de la perliculture en Polynésie française. Seul ingénieur du projet, du cahier des charges à la validation in situ, en passant par la CAO, le dimensionnement structurel et la fabrication, le tout en six mois. Les données recueillies sur ce premier prototype orientent aujourd'hui la conception d'une seconde génération.",
  'odewa-keyfig-big': "1 tonne en 2 jours",
  'odewa-keyfig-desc': "de déchets sous-marins extraits et nettoyés lors des essais sur site",

  'airaro-date': "mars 2026 – sept. 2026",
  'airaro-title': "Un outil de dimensionnement SWAC fondé sur des données réelles",
  'airaro-meta': "AIRARO SAS · Stage de fin d'études (projet de Master)",
  'airaro-text': "Analyse des données d'exploitation d'une centrale SWAC (Sea Water Air Conditioning, climatisation par eau de mer profonde) en service, et développement d'un outil de dimensionnement couplant modèles thermique, hydraulique et économique pour concevoir les futures installations. L'outil est aujourd'hui intégré au business plan de l'entreprise.",
  'airaro-keyfig-big': "COP +25 %",
  'airaro-keyfig-desc': "gain de performance identifié grâce à l'outil de dimensionnement",

  'biorob-date': "févr. 2025 – juil. 2025",
  'biorob-title': "Pieds souples pour un robot salamandre",
  'biorob-meta': "Laboratoire BioRob, EPFL · projet de recherche",
  'biorob-text': "Conception et caractérisation sur banc d'essai de pieds souples pour un robot de type salamandre, puis intégration sur le robot et validation par capture de mouvement.",
  'biorob-keyfig-big': "+15 % d'efficacité de locomotion",
  'biorob-keyfig-desc': "mesuré sur le robot après intégration des pieds souples",

  'rrl-date': "sept. 2024 – févr. 2025",
  'rrl-title': "Refonte d'une plateforme à 3 degrés de liberté pour porter une personne",
  'rrl-meta': "Reconfigurable Robotics Laboratory, EPFL · projet de recherche",
  'rrl-text': "Refonte de la structure d'une plateforme à 3 degrés de liberté pour porter une personne en toute sécurité, et développement d'une chaîne de traitement en temps réel qui extrait la locomotion d'une vidéo pour piloter la plateforme.",

  'zf-date': "sept. 2023 – mars 2024",
  'zf-title': "Intégration matérielle d'un optimiseur de station d'échange de batteries",
  'zf-meta': "Projet en collaboration avec ZF Group",
  'zf-text': "Réalisation d'un démonstrateur physique à échelle réduite d'une station d'échange de batteries, qui traduit en direct les décisions d'un modèle d'optimisation en comportement matériel.",

  'motor-date': "févr. 2022 – août 2023",
  'motor-title': "Moteur-roue, réducteur et volant pour une voiture de Formula Student",
  'motor-text': "Conception du réducteur et intégration du système de propulsion par moteur-roue d'une voiture de Formula Student, du concept à la voiture en compétition. Conception et fabrication d'un volant ergonomique en fibre de carbone, à commandes électroniques intégrées.",
  'motor-linkbox-lbl': "En savoir plus",

  'gripper-date': "sept. 2024 – janv. 2025",
  'gripper-title': "Une pince simple et efficace pour bras robotisé",
  'gripper-meta': "Projet personnel",
  'gripper-text': "Conception d'une pince dont la force de serrage est limitée mécaniquement, sans asservissement actif, complétée par un capteur qui pèse l'objet saisi.",

  'hull-date': "janv. 2024 – juin 2024",
  'hull-title': "Robot autonome de nettoyage de coques",
  'hull-meta': "Étude de développement produit, phase d'avant-projet",
  'hull-text': "Étude de conception d'un robot autonome de nettoyage de coques de bateaux, de l'analyse des besoins au choix d'architecture et à la conception détaillée.",

  'contact-eyebrow': "Me contacter",
  'contact-title': "Construisons ensemble quelque chose qui tient la route",
  'footer-sub': "Portfolio d'ingénierie",
};

// Skill tags: keyed by their English text (software names stay as is)
const frTags = {
  "3D Printing": "Impression 3D",
  "Actuator Selection": "Choix des actionneurs",
  "Carbon Fiber Composites": "Composites carbone",
  "Compliant Mechanism Design": "Conception de mécanismes souples",
  "Concept-to-Prototype": "Du concept au prototype",
  "Electronics Integration": "Intégration électronique",
  "Energy Systems": "Systèmes énergétiques",
  "Ergonomics": "Ergonomie",
  "FEA": "Calcul par éléments finis",
  "Field Testing": "Essais sur site",
  "Gear Design": "Conception d'engrenages",
  "Mechanical Design": "Conception mécanique",
  "Motion Capture": "Capture de mouvement",
  "Product Development": "Développement produit",
  "Rapid Prototyping": "Prototypage rapide",
  "Real-Time Video Processing": "Traitement vidéo en temps réel",
  "Sensor Integration": "Intégration de capteurs",
  "Structural FEA (Abaqus)": "Calcul de structure par éléments finis (Abaqus)",
  "Systems Architecture": "Architecture système",
  "Techno-Economic Analysis": "Analyse technico-économique",
  "Test Bench Design": "Conception de bancs d'essai",
  "Thermal & Hydraulic Modeling": "Modélisation thermique et hydraulique",
  "Thermal & Mass Optimization": "Optimisation thermique et massique",
};

const frTitle = "Sébastien Roux · Ingénieur d'études";

function initI18n() {
  const nodes = document.querySelectorAll('[data-i18n]');
  nodes.forEach(el => { el.dataset.orig = el.textContent; });
  const tagNodes = document.querySelectorAll('.tag-list li');
  tagNodes.forEach(el => { el.dataset.orig = el.textContent; });
  const origTitle = document.title;
  const btn = document.getElementById('lang-toggle');

  function apply(lang) {
    const fr = lang === 'fr';
    nodes.forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = (fr && frText[key]) ? frText[key] : el.dataset.orig;
    });
    tagNodes.forEach(el => {
      const orig = el.dataset.orig;
      el.textContent = (fr && frTags[orig]) ? frTags[orig] : orig;
    });
    document.title = fr ? frTitle : origTitle;
    document.documentElement.lang = lang;
    btn.textContent = fr ? 'EN' : 'FR';
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
