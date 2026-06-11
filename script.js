/**
 * Campo & Cidade — script.js
 * JavaScript puro (Vanilla JS)
 * Módulos: Nav | Scroll | Gallery | Curiosidades | Quiz | Impactos | Formulário | Topo
 */

'use strict';

/* =============================================
   UTILITÁRIOS
   ============================================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* =============================================
   1. NAVEGAÇÃO RESPONSIVA
   ============================================= */
(function initNav() {
  const toggle  = $('#navToggle');
  const menu    = $('#navMenu');
  const header  = $('#site-header');

  // Criar overlay para fechar menu
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  document.body.appendChild(overlay);

  function openMenu() {
    menu.classList.add('open');
    overlay.classList.add('show');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    menu.classList.remove('open');
    overlay.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });
  overlay.addEventListener('click', closeMenu);

  // Fechar ao clicar num link
  $$('.nav-link', menu).forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fechar com Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  // Sombra e link ativo ao rolar
  const navLinks = $$('.nav-link');
  const sections = $$('section[id]');

  function onScroll() {
    // Header sombra
    header.classList.toggle('scrolled', window.scrollY > 20);

    // Highlight link ativo
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* =============================================
   2. ANIMAÇÕES AO ROLAR (Reveal)
   ============================================= */
(function initReveal() {
  const items = $$('.reveal');
  if (!items.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      // Escalonamento suave entre irmãos
      const siblings = $$('.reveal', entry.target.parentElement);
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 0.08}s`;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => obs.observe(el));
})();

/* =============================================
   3. GALERIA INTERATIVA
   ============================================= */
(function initGallery() {
  const grid = $('#galleryGrid');
  if (!grid) return;

  const cards = [
    {
      title: 'Colheita ao Amanhecer',
      desc: 'Agricultores iniciam o trabalho antes do sol nascer, garantindo que os alimentos cheguem frescos às cidades.',
      bg: '#5a8a3c',
      svg: `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#FF7043"/>
            <stop offset="60%" style="stop-color:#FFA726"/>
            <stop offset="100%" style="stop-color:#5a8a3c"/>
          </linearGradient>
        </defs>
        <rect width="320" height="240" fill="url(#g1)"/>
        <ellipse cx="160" cy="240" rx="200" ry="90" fill="#3d6b28"/>
        <!-- Sol -->
        <circle cx="160" cy="90" r="35" fill="#FFCC02" opacity=".9"/>
        <!-- Trigo -->
        <g fill="#c8a850">
          <ellipse cx="60" cy="170" rx="6" ry="22" transform="rotate(-10,60,185)"/>
          <ellipse cx="80" cy="165" rx="6" ry="24" transform="rotate(8,80,182)"/>
          <ellipse cx="100" cy="168" rx="6" ry="22" transform="rotate(-5,100,183)"/>
          <ellipse cx="120" cy="162" rx="6" ry="25" transform="rotate(12,120,179)"/>
          <ellipse cx="140" cy="166" rx="6" ry="23" transform="rotate(-8,140,182)"/>
          <ellipse cx="200" cy="165" rx="6" ry="24" transform="rotate(6,200,181)"/>
          <ellipse cx="220" cy="168" rx="6" ry="22" transform="rotate(-12,220,183)"/>
          <ellipse cx="240" cy="163" rx="6" ry="25" transform="rotate(9,240,180)"/>
          <ellipse cx="260" cy="167" rx="6" ry="23" transform="rotate(-7,260,182)"/>
        </g>
        <!-- Colheitadeira silhueta -->
        <rect x="130" y="155" width="60" height="30" rx="4" fill="#333" opacity=".7"/>
        <circle cx="145" cy="185" r="10" fill="#222" opacity=".8"/>
        <circle cx="175" cy="185" r="12" fill="#222" opacity=".8"/>
      </svg>`
    },
    {
      title: 'Feira Urbana',
      desc: 'Feiras livres são pontos de encontro entre campo e cidade, onde produtores vendem diretamente ao consumidor.',
      bg: '#2c82c9',
      svg: `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="240" fill="#f5f0e8"/>
        <!-- Barracas -->
        <polygon points="20,120 100,80 180,120" fill="#e74c3c"/>
        <rect x="30" y="120" width="140" height="60" fill="#f39c12"/>
        <polygon points="140,120 220,80 300,120" fill="#27ae60"/>
        <rect x="150" y="120" width="140" height="60" fill="#2ecc71"/>
        <!-- Produtos -->
        <circle cx="70" cy="135" r="8" fill="#e74c3c"/>
        <circle cx="90" cy="132" r="8" fill="#f9a825"/>
        <circle cx="110" cy="135" r="7" fill="#27ae60"/>
        <circle cx="200" cy="135" r="8" fill="#8B4513"/>
        <circle cx="220" cy="132" r="7" fill="#27ae60"/>
        <circle cx="240" cy="135" r="8" fill="#e74c3c"/>
        <!-- Pessoas -->
        <circle cx="160" cy="145" r="10" fill="#f4c28b"/>
        <rect x="155" y="155" width="10" height="20" rx="2" fill="#3498db"/>
        <circle cx="55" cy="148" r="9" fill="#c8956c"/>
        <rect x="50" y="157" width="10" height="18" rx="2" fill="#e74c3c"/>
        <!-- Chão -->
        <rect x="0" y="185" width="320" height="55" fill="#9e9e9e"/>
      </svg>`
    },
    {
      title: 'Irrigação Inteligente',
      desc: 'Sistemas de irrigação por gotejamento controlados por sensores economizam até 70% de água em comparação ao método tradicional.',
      bg: '#1a5276',
      svg: `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB"/>
            <stop offset="100%" style="stop-color:#e0f4ff"/>
          </linearGradient>
        </defs>
        <rect width="320" height="240" fill="url(#g3)"/>
        <rect x="0" y="170" width="320" height="70" fill="#5a8a3c"/>
        <!-- Tubos -->
        <rect x="40" y="130" width="240" height="8" rx="4" fill="#2980b9"/>
        <!-- Gotejadores -->
        <g fill="#3498db" opacity=".8">
          <ellipse cx="80" cy="148" rx="3" ry="7"/>
          <ellipse cx="120" cy="153" rx="3" ry="7"/>
          <ellipse cx="160" cy="148" rx="3" ry="7"/>
          <ellipse cx="200" cy="153" rx="3" ry="7"/>
          <ellipse cx="240" cy="148" rx="3" ry="7"/>
        </g>
        <!-- Plantas irrigadas -->
        <g>
          <rect x="75" y="160" width="6" height="20" rx="2" fill="#2d5a1a"/>
          <ellipse cx="78" cy="156" rx="14" ry="12" fill="#2ecc71"/>
          <rect x="155" y="158" width="6" height="22" rx="2" fill="#2d5a1a"/>
          <ellipse cx="158" cy="154" rx="14" ry="12" fill="#27ae60"/>
          <rect x="235" y="160" width="6" height="20" rx="2" fill="#2d5a1a"/>
          <ellipse cx="238" cy="156" rx="14" ry="12" fill="#2ecc71"/>
        </g>
        <!-- Sensor -->
        <rect x="150" y="90" width="20" height="36" rx="3" fill="#e74c3c"/>
        <circle cx="160" cy="82" r="10" fill="#c0392b"/>
        <circle cx="160" cy="82" r="5" fill="#f9d342"/>
        <!-- Ondas sensor -->
        <path d="M145 75 Q 140 68 145 61" stroke="#f9d342" stroke-width="1.5" fill="none" opacity=".7"/>
        <path d="M175 75 Q 180 68 175 61" stroke="#f9d342" stroke-width="1.5" fill="none" opacity=".7"/>
      </svg>`
    },
    {
      title: 'Cidade Sustentável',
      desc: 'Hortas verticais e telhados verdes transformam espaços urbanos em mini-fazendas que produzem alimentos e reduzem o calor.',
      bg: '#145a32',
      svg: `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="240" fill="#87CEEB"/>
        <!-- Prédio com horta vertical -->
        <rect x="80" y="50" width="160" height="160" rx="4" fill="#3498db"/>
        <!-- Andares -->
        <g fill="#2980b9">
          <rect x="80" y="50" width="160" height="10" rx="2"/>
          <rect x="80" y="100" width="160" height="8"/>
          <rect x="80" y="148" width="160" height="8"/>
        </g>
        <!-- Janelas -->
        <g fill="#f9d342" opacity=".7">
          <rect x="95" y="62" width="20" height="16" rx="1"/>
          <rect x="125" y="62" width="20" height="16" rx="1"/>
          <rect x="155" y="62" width="20" height="16" rx="1"/>
          <rect x="185" y="62" width="20" height="16" rx="1"/>
          <rect x="95" y="112" width="20" height="16" rx="1"/>
          <rect x="125" y="112" width="20" height="16" rx="1"/>
          <rect x="185" y="112" width="20" height="16" rx="1"/>
          <rect x="95" y="160" width="20" height="16" rx="1"/>
          <rect x="155" y="160" width="20" height="16" rx="1"/>
          <rect x="185" y="160" width="20" height="16" rx="1"/>
        </g>
        <!-- Horta vertical lateral -->
        <rect x="240" y="50" width="30" height="160" rx="3" fill="#8B4513"/>
        <g fill="#2ecc71">
          <ellipse cx="255" cy="68" rx="16" ry="12"/>
          <ellipse cx="255" cy="100" rx="16" ry="12"/>
          <ellipse cx="255" cy="132" rx="16" ry="12"/>
          <ellipse cx="255" cy="164" rx="16" ry="12"/>
          <ellipse cx="255" cy="196" rx="16" ry="12"/>
        </g>
        <!-- Telhado verde -->
        <rect x="80" y="40" width="160" height="14" rx="2" fill="#27ae60"/>
        <g fill="#2ecc71">
          <ellipse cx="110" cy="38" rx="14" ry="10"/>
          <ellipse cx="160" cy="35" rx="14" ry="10"/>
          <ellipse cx="210" cy="38" rx="14" ry="10"/>
        </g>
        <!-- Chão -->
        <rect x="0" y="210" width="320" height="30" fill="#7f8c8d"/>
      </svg>`
    },
    {
      title: 'Logística e Transporte',
      desc: 'Uma frota de 2 milhões de caminhões percorre as estradas brasileiras diariamente, levando alimentos do campo à cidade.',
      bg: '#7d3c98',
      svg: `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g5" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#87CEEB"/>
            <stop offset="70%" style="stop-color:#87CEEB"/>
            <stop offset="70%" style="stop-color:#9e9e9e"/>
            <stop offset="100%" style="stop-color:#757575"/>
          </linearGradient>
        </defs>
        <rect width="320" height="240" fill="url(#g5)"/>
        <!-- Estrada -->
        <rect x="0" y="168" width="320" height="72" fill="#616161"/>
        <rect x="0" y="168" width="320" height="6" fill="#757575"/>
        <!-- Faixas da estrada -->
        <g fill="#f9d342" opacity=".8">
          <rect x="20" y="196" width="40" height="6" rx="3"/>
          <rect x="80" y="196" width="40" height="6" rx="3"/>
          <rect x="140" y="196" width="40" height="6" rx="3"/>
          <rect x="200" y="196" width="40" height="6" rx="3"/>
          <rect x="260" y="196" width="40" height="6" rx="3"/>
        </g>
        <!-- Caminhão grande -->
        <rect x="30" y="140" width="110" height="42" rx="4" fill="#e74c3c"/>
        <rect x="30" y="120" width="36" height="25" rx="3" fill="#c0392b"/>
        <rect x="33" y="123" width="28" height="16" rx="2" fill="#87ceeb" opacity=".8"/>
        <circle cx="50" cy="184" r="13" fill="#222"/>
        <circle cx="50" cy="184" r="6" fill="#888"/>
        <circle cx="115" cy="184" r="13" fill="#222"/>
        <circle cx="115" cy="184" r="6" fill="#888"/>
        <!-- Carga -->
        <rect x="68" y="126" width="70" height="56" rx="2" fill="#f39c12" opacity=".85"/>
        <line x1="103" y1="126" x2="103" y2="182" stroke="#e67e22" stroke-width="2"/>
        <!-- Nuvem de campo ao fundo -->
        <ellipse cx="260" cy="80" rx="35" ry="18" fill="white" opacity=".8"/>
        <ellipse cx="244" cy="88" rx="20" ry="12" fill="white" opacity=".8"/>
        <ellipse cx="276" cy="88" rx="22" ry="12" fill="white" opacity=".8"/>
        <!-- Carro pequeno -->
        <rect x="190" y="158" width="55" height="22" rx="4" fill="#2ecc71"/>
        <rect x="198" y="148" width="30" height="14" rx="3" fill="#27ae60"/>
        <circle cx="202" cy="182" r="8" fill="#222"/>
        <circle cx="232" cy="182" r="8" fill="#222"/>
        <circle cx="202" cy="182" r="3.5" fill="#888"/>
        <circle cx="232" cy="182" r="3.5" fill="#888"/>
      </svg>`
    },
    {
      title: 'Tecnologia no Campo',
      desc: 'Drones equipados com câmeras multiespectrais monitoram a saúde das plantas e ajudam a identificar pragas antes que se alastrem.',
      bg: '#1a5276',
      svg: `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g6" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#2980b9"/>
            <stop offset="55%" style="stop-color:#87CEEB"/>
            <stop offset="55%" style="stop-color:#5a8a3c"/>
            <stop offset="100%" style="stop-color:#2d6a4f"/>
          </linearGradient>
        </defs>
        <rect width="320" height="240" fill="url(#g6)"/>
        <!-- Plantação regular -->
        <g fill="#2d5a1a">
          <rect x="20" y="138" width="8" height="30" rx="3"/>
          <rect x="45" y="134" width="8" height="34" rx="3"/>
          <rect x="70" y="138" width="8" height="30" rx="3"/>
          <rect x="95" y="135" width="8" height="33" rx="3"/>
          <rect x="120" y="138" width="8" height="30" rx="3"/>
          <rect x="145" y="134" width="8" height="34" rx="3"/>
          <rect x="170" y="138" width="8" height="30" rx="3"/>
          <rect x="195" y="135" width="8" height="33" rx="3"/>
          <rect x="220" y="138" width="8" height="30" rx="3"/>
          <rect x="245" y="134" width="8" height="34" rx="3"/>
          <rect x="270" y="138" width="8" height="30" rx="3"/>
          <rect x="295" y="135" width="8" height="33" rx="3"/>
        </g>
        <!-- Drone no centro -->
        <g transform="translate(140,60)">
          <!-- Corpo -->
          <rect x="-12" y="-8" width="24" height="16" rx="4" fill="#2c3e50"/>
          <!-- Braços -->
          <rect x="-35" y="-3" width="23" height="5" rx="2" fill="#34495e"/>
          <rect x="12" y="-3" width="23" height="5" rx="2" fill="#34495e"/>
          <!-- Hélices -->
          <ellipse cx="-34" cy="-4" rx="16" ry="4" fill="#95a5a6" opacity=".7"/>
          <ellipse cx="34" cy="-4" rx="16" ry="4" fill="#95a5a6" opacity=".7"/>
          <!-- Câmera -->
          <circle cx="0" cy="10" r="6" fill="#e74c3c"/>
          <circle cx="0" cy="10" r="3" fill="#333"/>
          <!-- Sinal -->
          <path d="M0 -10 Q -12 -25 0 -38" stroke="#f9d342" stroke-width="1.5" fill="none" opacity=".7"/>
          <path d="M0 -10 Q 12 -25 0 -38" stroke="#f9d342" stroke-width="1.5" fill="none" opacity=".7"/>
        </g>
        <!-- Feixe do drone -->
        <path d="M140 68 L100 138 L180 138 Z" fill="#f9d342" opacity=".15"/>
        <!-- Linha pontilhada área escaneada -->
        <rect x="100" y="134" width="80" height="36" fill="none" stroke="#f9d342" stroke-width="1.5" stroke-dasharray="4,3" opacity=".7"/>
      </svg>`
    }
  ];

  cards.forEach((card, idx) => {
    const el = document.createElement('div');
    el.className = 'gallery-card reveal';
    el.setAttribute('tabindex', '0');
    el.setAttribute('aria-label', card.title);
    el.innerHTML = `
      <div class="gallery-card__visual" style="background:${card.bg}">
        ${card.svg}
      </div>
      <div class="gallery-card__overlay">
        <h3>${card.title}</h3>
        <p>${card.desc}</p>
      </div>`;
    grid.appendChild(el);

    // Acessibilidade: mostrar overlay no foco
    el.addEventListener('focus', () => el.querySelector('.gallery-card__overlay').style.opacity = '1');
    el.addEventListener('blur',  () => el.querySelector('.gallery-card__overlay').style.opacity = '');
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const ov = el.querySelector('.gallery-card__overlay');
        ov.style.opacity = ov.style.opacity === '1' ? '' : '1';
      }
    });
  });
})();

/* =============================================
   4. CURIOSIDADES (carrossel dinâmico)
   ============================================= */
(function initCuriosidades() {
  const display = $('#curDisplay');
  const prevBtn = $('#curPrev');
  const nextBtn = $('#curNext');
  const counter = $('#curCounter');
  const dotsWrap = $('#curDots');
  if (!display) return;

  const items = [
    { icon: '🌾', text: 'O Brasil é o maior exportador mundial de açúcar, soja, carne bovina e suco de laranja, alimentando mais de 1 bilhão de pessoas em outros países.', fonte: 'Fonte: MAPA, 2024' },
    { icon: '🏙️', text: 'Em 1950, apenas 36% dos brasileiros viviam em cidades. Hoje, esse número chega a 87% — uma das urbanizações mais rápidas do mundo.', fonte: 'Fonte: IBGE, 2023' },
    { icon: '🚚', text: 'Um único caminhão frigorífico pode transportar até 28 toneladas de alimentos por viagem, equivalente a 56.000 embalagens de 500g.', fonte: 'Fonte: CNT' },
    { icon: '💧', text: 'A agricultura consome cerca de 70% da água doce utilizada no planeta, tornando a gestão hídrica o maior desafio do século XXI.', fonte: 'Fonte: FAO' },
    { icon: '🤖', text: 'Tratores autônomos guiados por GPS já plantam com precisão de 2 centímetros, reduzindo o desperdício de sementes em até 15%.', fonte: 'Fonte: Embrapa, 2023' },
    { icon: '🌱', text: 'O Brasil tem a segunda maior biodiversidade do planeta, e 60% dos polinizadores essenciais para a agricultura dependem de florestas nativas preservadas.', fonte: 'Fonte: WWF Brasil' },
    { icon: '📱', text: 'Existem mais de 1.500 startups de agtech no Brasil — o maior ecossistema de inovação agrícola da América Latina.', fonte: 'Fonte: Agtech Garage, 2024' },
    { icon: '🏗️', text: 'Uma horta urbana de 1m² pode produzir até 25 kg de alimentos por ano, contribuindo para a segurança alimentar em grandes cidades.', fonte: 'Fonte: EMATER' },
  ];

  let current = 0;

  // Criar dots
  items.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'cur-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Curiosidade ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function render(idx) {
    const item = items[idx];
    display.classList.add('fade');
    setTimeout(() => {
      display.innerHTML = `
        <div class="curiosidade-number">Curiosidade ${idx + 1} de ${items.length}</div>
        <div class="curiosidade-icon" aria-hidden="true">${item.icon}</div>
        <p class="curiosidade-text">${item.text}</p>
        <p class="curiosidade-fonte">${item.fonte}</p>`;
      counter.textContent = `${idx + 1} / ${items.length}`;
      $$('.cur-dot', dotsWrap).forEach((d, i) => d.classList.toggle('active', i === idx));
      display.classList.remove('fade');
    }, 200);
  }

  function goTo(idx) {
    current = (idx + items.length) % items.length;
    render(current);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Swipe mobile
  let startX = 0;
  display.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  display.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goTo(current + 1) : goTo(current - 1);
  }, { passive: true });

  // Auto-avançar
  let autoTimer = setInterval(() => goTo(current + 1), 7000);
  [prevBtn, nextBtn, dotsWrap].forEach(el => {
    el.addEventListener('click', () => {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 7000);
    });
  });

  render(0);
})();

/* =============================================
   5. QUIZ EDUCATIVO
   ============================================= */
(function initQuiz() {
  const wrapper = $('#quizWrapper');
  if (!wrapper) return;

  const questions = [
    {
      q: 'Qual porcentagem do PIB brasileiro é representada pelo agronegócio?',
      opts: ['Cerca de 5%', 'Cerca de 15%', 'Cerca de 27%', 'Cerca de 45%'],
      ans: 2,
      exp: 'O agronegócio representa aproximadamente 27% do PIB brasileiro, tornando o Brasil uma das maiores potências agrícolas do mundo.'
    },
    {
      q: 'Qual tecnologia permite monitorar plantações por satélite identificando áreas com estresse hídrico?',
      opts: ['Bluetooth agrícola', 'Geoprocessamento e sensoriamento remoto', 'Rádio AM rural', 'Código de barras no campo'],
      ans: 1,
      exp: 'O geoprocessamento e sensoriamento remoto usam imagens de satélite para analisar índices de vegetação e detectar problemas antes que causem grandes perdas.'
    },
    {
      q: 'Quanto da água doce do planeta é consumida pela agricultura?',
      opts: ['Cerca de 20%', 'Cerca de 40%', 'Cerca de 70%', 'Cerca de 90%'],
      ans: 2,
      exp: 'A agricultura consome cerca de 70% de toda a água doce utilizada no planeta, tornando a irrigação inteligente uma prioridade global.'
    },
    {
      q: 'O que é a agricultura regenerativa?',
      opts: [
        'Cultivo usando apenas agrotóxicos sintéticos',
        'Técnicas que restauram a saúde do solo e sequestram carbono',
        'Plantio em estufas de vidro em cidades',
        'Sistema de plantio exclusivo para exportação'
      ],
      ans: 1,
      exp: 'A agricultura regenerativa usa técnicas que restauram a vida do solo, como rotação de culturas, cobertura vegetal e mínimo revolvimento, beneficiando o clima.'
    },
    {
      q: 'Em que ano o Brasil teve 87% de sua população vivendo em cidades?',
      opts: ['1950', '1980', '2000', '2023'],
      ans: 3,
      exp: 'De acordo com o IBGE, o Brasil atingiu 87% de população urbana em 2023, uma das maiores taxas de urbanização do mundo.'
    },
    {
      q: 'Qual produto o Brasil lidera como maior exportador mundial?',
      opts: ['Arroz', 'Trigo', 'Soja', 'Milho'],
      ans: 2,
      exp: 'O Brasil é o maior exportador mundial de soja, respondendo por mais de 30% das exportações globais do grão.'
    },
    {
      q: 'O que é agro urbana ou hidroponia?',
      opts: [
        'Criação de animais em apartamentos',
        'Cultivo de plantas em ambientes controlados, sem solo',
        'Exportação de alimentos via aérea',
        'Produção de fertilizantes químicos'
      ],
      ans: 1,
      exp: 'A hidroponia é uma técnica de cultivo sem solo, usando soluções nutritivas. Permite produzir alimentos dentro das cidades, reduzindo o transporte e o desperdício.'
    }
  ];

  let current = 0;
  let score   = 0;
  let answered = false;

  function render() {
    const q = questions[current];
    const progress = ((current) / questions.length) * 100;

    wrapper.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-progress-bar-wrap" role="progressbar" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso do quiz">
          <div class="quiz-progress-fill" style="width:${progress}%"></div>
        </div>
        <div class="quiz-meta">
          <span>Pergunta ${current + 1} de ${questions.length}</span>
          <span>Pontuação: ${score}</span>
        </div>
        <p class="quiz-question">${q.q}</p>
        <div class="quiz-options" role="list">
          ${q.opts.map((opt, i) => `
            <button class="quiz-option" data-idx="${i}" role="listitem">
              <span class="quiz-opt-icon" aria-hidden="true">${['🅐','🅑','🅒','🅓'][i]}</span>
              ${opt}
            </button>`).join('')}
        </div>
        <div class="quiz-feedback" id="quizFeedback"></div>
        <div class="quiz-nav">
          <button class="btn btn--primary" id="quizNext" style="display:none">
            ${current + 1 < questions.length ? 'Próxima →' : 'Ver Resultado'}
          </button>
        </div>
      </div>`;

    answered = false;

    $$('.quiz-option', wrapper).forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const chosen = parseInt(btn.dataset.idx);
        const isCorrect = chosen === q.ans;
        if (isCorrect) score++;

        // Feedback visual
        $$('.quiz-option', wrapper).forEach((b, i) => {
          b.disabled = true;
          if (i === q.ans) b.classList.add('correct');
          else if (i === chosen && !isCorrect) b.classList.add('wrong');
        });

        const feedback = $('#quizFeedback', wrapper);
        feedback.textContent = isCorrect ? `✅ Correto! ${q.exp}` : `❌ Errado. ${q.exp}`;
        feedback.className = `quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;

        $('#quizNext', wrapper).style.display = '';
      });
    });

    $('#quizNext', wrapper).addEventListener('click', () => {
      current++;
      if (current < questions.length) {
        render();
      } else {
        renderResult();
      }
    });
  }

  function renderResult() {
    const pct  = Math.round((score / questions.length) * 100);
    let msg, emoji;
    if (pct === 100)      { msg = 'Perfeito! Você é um especialista em campo e cidade!'; emoji = '🏆'; }
    else if (pct >= 70)   { msg = 'Ótimo resultado! Você entende bem a relação campo-cidade.'; emoji = '🌾'; }
    else if (pct >= 40)   { msg = 'Bom esforço! Continue explorando o site para aprender mais.'; emoji = '📚'; }
    else                   { msg = 'Continue lendo o site — há muito mais para descobrir!'; emoji = '🌱'; }

    wrapper.innerHTML = `
      <div class="quiz-card quiz-result">
        <div style="font-size:3rem;margin-bottom:.5rem" aria-hidden="true">${emoji}</div>
        <h3 style="color:var(--blue-deep);margin-bottom:.5rem">Resultado Final</h3>
        <div class="quiz-result__score" aria-label="${score} de ${questions.length} acertos">${score}/${questions.length}</div>
        <p class="quiz-result__label">${pct}% de acertos</p>
        <p class="quiz-result__msg">${msg}</p>
        <button class="btn btn--primary" id="quizRestart">Jogar Novamente</button>
      </div>`;

    $('#quizRestart', wrapper).addEventListener('click', () => {
      current = 0; score = 0;
      render();
    });
  }

  render();
})();

/* =============================================
   6. BARRAS DE IMPACTO ANIMADAS
   ============================================= */
(function initImpacts() {
  const grid = $('#impactsGrid');
  if (!grid) return;

  const data = [
    { label: 'Participação do Agronegócio no PIB', value: '26,7%', pct: 27, color: 'green',  note: 'O setor movimenta mais de R$ 2 trilhões por ano na economia brasileira.' },
    { label: 'Alimentos Exportados pelo Brasil',   value: '15%',   pct: 15, color: 'blue',   note: 'O Brasil alimenta cerca de 800 milhões de pessoas no mundo com suas exportações.' },
    { label: 'Redução no Uso de Agrotóxicos com Agricultura de Precisão', value: '-40%', pct: 40, color: 'amber', note: 'Tecnologias de precisão reduzem o uso de insumos sem comprometer a produtividade.' },
    { label: 'Brasileiros em Área Urbana',         value: '87%',   pct: 87, color: 'green',  note: 'A urbanização intensificou a dependência das cidades em relação à produção rural.' },
    { label: 'Energia Limpa na Matriz Brasileira', value: '48%',   pct: 48, color: 'blue',   note: 'Biomassa, hidrelétricas e vento movem quase metade da matriz energética do Brasil.' },
    { label: 'Redução do Desperdício com Logística Fria', value: '-30%', pct: 30, color: 'amber', note: 'Cadeia de frio reduz perdas de alimentos perecíveis em até 30% no trajeto campo-cidade.' },
    { label: 'Empregos Ligados ao Agronegócio',   value: '33%',   pct: 33, color: 'earth',  note: 'Um em cada três trabalhadores brasileiros tem sua renda ligada ao agronegócio.' },
  ];

  data.forEach(item => {
    const div = document.createElement('div');
    div.className = 'impact-item reveal';
    div.innerHTML = `
      <div class="impact-header">
        <span class="impact-label">${item.label}</span>
        <span class="impact-value">${item.value}</span>
      </div>
      <div class="impact-bar-track" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="${item.label}: ${item.value}">
        <div class="impact-bar-fill impact-bar-fill--${item.color}" data-pct="${item.pct}"></div>
      </div>
      <p class="impact-note">${item.note}</p>`;
    grid.appendChild(div);
  });

  // Animar barras quando visíveis
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const fill  = entry.target.querySelector('.impact-bar-fill');
      const track = entry.target.querySelector('.impact-bar-track');
      if (!fill) return;
      const pct = fill.dataset.pct;
      setTimeout(() => {
        fill.style.width = pct + '%';
        track.setAttribute('aria-valuenow', pct);
      }, 200);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  $$('.impact-item', grid).forEach(el => obs.observe(el));
})();

/* =============================================
   7. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
   ============================================= */
(function initForm() {
  const form    = $('#contactForm');
  const success = $('#formSuccess');
  if (!form) return;

  const campos = {
    contNome:     { erroId: 'erroNome',     validate: v => v.trim().length >= 3  ? '' : 'Por favor, informe seu nome (mínimo 3 caracteres).' },
    contEmail:    { erroId: 'erroEmail',    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Informe um e-mail válido.' },
    contAssunto:  { erroId: 'erroAssunto',  validate: v => v !== '' ? '' : 'Selecione um assunto.' },
    contMensagem: { erroId: 'erroMensagem', validate: v => v.trim().length >= 20 ? '' : 'A mensagem deve ter pelo menos 20 caracteres.' },
  };

  function showError(erroId, msg) {
    const el = $('#' + erroId);
    if (el) el.textContent = msg;
  }
  function clearError(erroId) { showError(erroId, ''); }

  function validateField(inputId) {
    const field = campos[inputId];
    if (!field) return true;
    const input = $('#' + inputId, form);
    if (!input) return true;
    const msg = field.validate(input.value);
    showError(field.erroId, msg);
    input.classList.toggle('input-error', !!msg);
    input.classList.toggle('input-ok',    !msg);
    return !msg;
  }

  // Validação em tempo real
  Object.keys(campos).forEach(id => {
    const input = $('#' + id, form);
    if (input) {
      input.addEventListener('input',  () => validateField(id));
      input.addEventListener('change', () => validateField(id));
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    let valid = true;
    Object.keys(campos).forEach(id => { if (!validateField(id)) valid = false; });

    // Checkbox termos
    const termos = $('#contTermos', form);
    if (!termos.checked) {
      showError('erroTermos', 'Você precisa aceitar os termos para continuar.');
      valid = false;
    } else {
      clearError('erroTermos');
    }

    if (!valid) return;

    // Simular envio
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Enviando…';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      Object.keys(campos).forEach(id => {
        const input = $('#' + id, form);
        if (input) { input.classList.remove('input-ok', 'input-error'); }
      });
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      btn.textContent = 'Enviar Mensagem';
      btn.disabled = false;
    }, 1200);
  });
})();

/* =============================================
   8. BOTÃO VOLTAR AO TOPO
   ============================================= */
(function initBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* =============================================
   9. HIGHLIGHT SEÇÃO ATIVA NA TIMELINE
   ============================================= */
(function initTimelineObserver() {
  const items = $$('.timeline-item');
  if (!items.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(el => obs.observe(el));
})();

/* =============================================
   10. SMOOTH SCROLL para links internos
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    const offset = 80; // altura do header fixo
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
