/* ============================================================
   IBNU AKBAR PORTFOLIO — script.js
   ============================================================ */

'use strict';

/* ── Config ── */
const CONFIG = {
  pages: ['home', 'pengalaman', 'gallery', 'socials'],
  themes: {
    home:       'theme-home',
    pengalaman: 'theme-pengalaman',
    gallery:    'theme-gallery',
    socials:    'theme-socials',
  },
  defaultPage: 'home',
};

/* ── State ── */
let currentPage   = CONFIG.defaultPage;
let isTransitioning = false;
let particleInterval = null;

/* ── DOM ── */
const body       = document.body;
const orbs       = document.querySelectorAll('.orb');
const mobileMenu = document.getElementById('mobile-menu');
const hamburger  = document.getElementById('hamburger');

const STORAGE_KEY = 'portfolio-data';

const DEFAULT_DATA = {
  experiences: [
    {
      id: 'exp-1',
      title: 'TS KOST Website',
      description: 'Membuat dan melakukan hosting website untuk mitra kost. Full deployment dengan domain custom.',
      category: 'Software & Web Development',
      tagText: 'Live & Online',
      tagColor: '#16a34a',
      tagBg: 'rgba(16,185,129,0.15)',
      icon: 'fas fa-house-laptop',
      link: 'https://tskost.vercel.app/',
      gradient: 'linear-gradient(135deg,#10b981,#0d9488)',
    },
    {
      id: 'exp-2',
      title: 'Bank Mutation System',
      description: 'Aplikasi Python simulasi sistem mutasi rekening bank dengan logika transaksi lengkap.',
      category: 'Software & Web Development',
      tagText: 'Logic Success',
      tagColor: '#22d3ee',
      tagBg: 'rgba(6,182,212,0.15)',
      icon: 'fas fa-building-columns',
      link: '',
      gradient: 'linear-gradient(135deg,#0ea5e9,#2563eb)',
    },
    {
      id: 'exp-3',
      title: 'Calorie Calculator',
      description: 'Aplikasi kalkulator kalori dengan input BMI dan rekomendasi diet harian yang user-friendly.',
      category: 'Software & Web Development',
      tagText: 'User Friendly',
      tagColor: '#fb7185',
      tagBg: 'rgba(244,63,94,0.15)',
      icon: 'fas fa-apple-whole',
      link: '',
      gradient: 'linear-gradient(135deg,#f43f5e,#e11d48)',
    },
    {
      id: 'exp-4',
      title: 'Juara 1 — Logo Kampus',
      description: 'Memenangkan kompetisi desain logo identitas kampus tingkat internal.',
      category: 'UI/UX & Graphic Design',
      tagText: 'CHAMPION',
      tagColor: '#92400e',
      tagBg: 'rgba(245,158,11,0.15)',
      icon: 'fas fa-trophy',
      link: '',
      gradient: 'linear-gradient(135deg,#f59e0b,#f97316)',
    },
    {
      id: 'exp-5',
      title: 'Juara 2 — Poster Digital',
      description: 'Runner up kontes desain poster digital tingkat nasional.',
      category: 'UI/UX & Graphic Design',
      tagText: 'RUNNER UP',
      tagColor: '#4338ca',
      tagBg: 'rgba(129,140,248,0.15)',
      icon: 'fas fa-scroll',
      link: '',
      gradient: 'linear-gradient(135deg,#818cf8,#6366f1)',
    },
    {
      id: 'exp-6',
      title: 'Admin IG OSIS Sekolah',
      description: 'Mengelola akun Instagram OSIS sekolah selama 2 tahun, meningkatkan engagement dan follower.',
      category: 'Digital Branding & Social Media',
      tagText: 'Engagement +',
      tagColor: '#db2777',
      tagBg: 'rgba(236,72,153,0.15)',
      icon: 'fab fa-instagram',
      link: '',
      gradient: 'linear-gradient(135deg,#ec4899,#db2777)',
    },
    {
      id: 'exp-7',
      title: 'Admin IG Forum OSIS Prov. SLS',
      description: 'Memimpin divisi digital Forum OSIS Sumatera Selatan, koordinasi konten multi-kota.',
      category: 'Digital Branding & Social Media',
      tagText: 'Leader',
      tagColor: '#a855f7',
      tagBg: 'rgba(168,85,247,0.15)',
      icon: 'fab fa-instagram',
      link: '',
      gradient: 'linear-gradient(135deg,#a855f7,#7c3aed)',
    },
    {
      id: 'exp-8',
      title: 'IKAMUSI IPB University',
      description: 'Memimpin dan mengoordinasikan ratusan mahasiswa baru asal Sumatera Selatan di IPB University untuk memastikan proses adaptasi kampus berjalan lancar.',
      category: 'Pengalaman Organisasi',
      tagText: 'Ketua Angkatan',
      tagColor: '#bae6fd',
      tagBg: 'rgba(59,130,246,0.15)',
      icon: 'fas fa-star',
      link: '',
      gradient: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
    },
    {
      id: 'exp-9',
      title: 'Forum OSIS Sumatera Selatan',
      description: 'Memimpin dan mengawasi kinerja divisi KOMINFO tingkat provinsi dalam mengelola saluran komunikasi resmi organisasi.',
      category: 'Pengalaman Organisasi',
      tagText: 'Ketua Divisi KOMINFO',
      tagColor: '#f5d0fe',
      tagBg: 'rgba(168,85,247,0.15)',
      icon: 'fas fa-wifi',
      link: '',
      gradient: 'linear-gradient(135deg,#a855f7,#ec4899)',
    },
    {
      id: 'exp-10',
      title: 'Forum OSIS Kota Pagar Alam',
      description: 'Mengelola arus kas masuk dan keluar keuangan organisasi secara transparan serta menyusun laporan keuangan bulanan.',
      category: 'Pengalaman Organisasi',
      tagText: 'Bendahara Umum',
      tagColor: '#a7f3d0',
      tagBg: 'rgba(255,255,255,0.15)',
      icon: 'fas fa-wallet',
      link: '',
      gradient: 'linear-gradient(135deg,#10b981,#06b6d4)',
    },
    {
      id: 'exp-11',
      title: 'OSIS SMA Negeri 3 Kota Pagar Alam',
      description: 'Mengukir pencapaian sebagai siswa kelas 10 pertama yang dipercaya memimpin OSIS melalui proses pemilihan demokratis.',
      category: 'Pengalaman Organisasi',
      tagText: 'Ketua OSIS',
      tagColor: '#fef3c7',
      tagBg: 'rgba(255,255,255,0.15)',
      icon: 'fas fa-crown',
      link: '',
      gradient: 'linear-gradient(135deg,#f59e0b,#f97316)',
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'TS KOST Website',
      subtitle: 'Web Development',
      image: 'Project/Mitra.png',
      alt: 'TS Kost Website',
      gradient: 'linear-gradient(135deg,#10b981,#0d9488)',
    },
    {
      id: 'gal-2',
      title: 'Design Project',
      subtitle: 'UI/UX Design',
      image: 'Project/Design.png',
      alt: 'Design Project',
      gradient: 'linear-gradient(135deg,#f59e0b,#f97316)',
    },
    {
      id: 'gal-3',
      title: 'Fostan Project',
      subtitle: 'Graphic Design',
      image: 'Project/Fostan.png',
      alt: 'Fostan Project',
      gradient: 'linear-gradient(135deg,#818cf8,#6366f1)',
    },
    {
      id: 'gal-4',
      title: 'Social Media Kit',
      subtitle: 'Digital Branding',
      image: 'Project/Sosial_Media.png',
      alt: 'Social Media Design',
      gradient: 'linear-gradient(135deg,#ec4899,#a855f7)',
    }
  ]
};

let portfolioData = loadPortfolioData();

function loadPortfolioData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return JSON.parse(JSON.stringify(DEFAULT_DATA));
  try {
    const parsed = JSON.parse(raw);
    return {
      experiences: Array.isArray(parsed.experiences) ? parsed.experiences : JSON.parse(JSON.stringify(DEFAULT_DATA.experiences)),
      gallery: Array.isArray(parsed.gallery) ? parsed.gallery : JSON.parse(JSON.stringify(DEFAULT_DATA.gallery)),
    };
  } catch (error) {
    console.warn('Gagal memuat storage, menggunakan default data.', error);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function savePortfolioData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
}

function resetPortfolioData() {
  portfolioData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  savePortfolioData();
}

function createExperienceCard(item) {
  const card = document.createElement(item.link ? 'a' : 'div');
  if (item.link) {
    card.href = item.link;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'exp-link-card';
  }
  card.innerHTML = `
    <div class="exp-card" style="--card-from:${item.gradient ? item.gradient : '#065f46'}; --card-to:${item.gradient ? item.gradient : '#0d9488'};">
      <div class="exp-card-top" style="background:${item.gradient || 'linear-gradient(135deg,#10b981,#0d9488)'};">
        <i class="${item.icon || 'fas fa-briefcase'}"></i>
        <div style="position:absolute;bottom:0;right:0;width:90px;height:90px;background:rgba(255,255,255,0.1);border-radius:50%;transform:translate(30%,30%);"></div>
      </div>
      <div class="exp-card-body">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        ${item.tagText ? `<span class="exp-chip" style="background:${item.tagBg || 'rgba(249,115,22,0.15)'};color:${item.tagColor || '#f97316'};border:1px solid rgba(248,113,113,0.2);">
          <i class="fas fa-circle-check" style="font-size:.7rem;"></i> ${item.tagText}
        </span>` : ''}
      </div>
    </div>
  `;
  return card;
}

function createCategoryTitle(category) {
  const data = {
    'Software & Web Development': { icon: 'fas fa-laptop-code', gradient: 'linear-gradient(135deg,#06b6d4,#0ea5e9)' },
    'UI/UX & Graphic Design': { icon: 'fas fa-palette', gradient: 'linear-gradient(135deg,#f59e0b,#f97316)' },
    'Digital Branding & Social Media': { icon: 'fas fa-bullhorn', gradient: 'linear-gradient(135deg,#ec4899,#f43f5e)' },
    'Pengalaman Organisasi': { icon: 'fas fa-users', gradient: 'linear-gradient(135deg,#f43f5e,#a855f7)' },
  };

  const meta = data[category] || data['Software & Web Development'];
  const wrapper = document.createElement('div');
  wrapper.className = 'exp-category';
  wrapper.innerHTML = `
    <h2 class="exp-cat-title">
      <span class="cat-icon" style="background:${meta.gradient};">
        <i class="${meta.icon}"></i>
      </span>
      ${category}
    </h2>
    <div class="exp-grid"></div>
  `;
  return wrapper;
}

function renderExperiencePage() {
  let content = document.getElementById('exp-content');
  const page = document.getElementById('pengalaman-page');

  if (!page) return;

  if (!content) {
    const header = page.querySelector('.exp-header');
    content = document.createElement('div');
    content.id = 'exp-content';
    header?.insertAdjacentElement('afterend', content);
  }

  page.querySelectorAll('.exp-category').forEach(el => el.remove());
  content.innerHTML = '';

  const categories = [
    'Software & Web Development',
    'UI/UX & Graphic Design',
    'Digital Branding & Social Media',
    'Pengalaman Organisasi',
  ];

  categories.forEach(category => {
    const items = portfolioData.experiences.filter(item => item.category === category);
    if (!items.length) return;
    const categoryBlock = createCategoryTitle(category);
    const grid = categoryBlock.querySelector('.exp-grid');
    items.forEach(item => grid.appendChild(createExperienceCard(item)));
    content.appendChild(categoryBlock);
  });
}

function renderGalleryPage() {
  const grid = document.getElementById('gal-grid');
  if (!grid) return;
  grid.innerHTML = '';
  if (!portfolioData.gallery.length) {
    grid.innerHTML = '<p style="color:#d1d5db;">Belum ada item gallery. Tambahkan dari dashboard admin.</p>';
    return;
  }
  portfolioData.gallery.forEach(item => {
    const card = document.createElement('div');
    card.className = 'gal-card';
    card.innerHTML = `
      <div class="gal-scan-line"></div>
      <div class="gal-img-wrap">
        <img src="${item.image}" alt="${item.alt}" loading="lazy"
             onerror="this.src='';this.closest('.gal-img-wrap').style.background='${item.gradient || 'linear-gradient(135deg,#10b981,#0d9488)'}';this.style.display='none';">
      </div>
      <div class="gal-overlay">
        <div class="gal-overlay-inner">
          <h4>${item.title}</h4>
          <span>${item.subtitle}</span>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function initAdminPage() {
  body.classList.add('theme-admin');
  renderExperiencePage();
  renderGalleryPage();
  renderAdminExperienceList();
  renderAdminGalleryList();

  const expForm = document.getElementById('exp-form');
  const galForm = document.getElementById('gal-form');

  if (expForm) expForm.addEventListener('submit', handleExperienceSubmit);
  if (galForm) galForm.addEventListener('submit', handleGallerySubmit);

  document.getElementById('reset-default-btn')?.addEventListener('click', e => {
    e.preventDefault();
    resetPortfolioData();
    renderExperiencePage();
    renderGalleryPage();
    renderAdminExperienceList();
    renderAdminGalleryList();
    clearForm('exp');
    clearForm('gal');
  });

  document.getElementById('clear-storage-btn')?.addEventListener('click', e => {
    e.preventDefault();
    localStorage.removeItem(STORAGE_KEY);
    portfolioData = loadPortfolioData();
    renderExperiencePage();
    renderGalleryPage();
    renderAdminExperienceList();
    renderAdminGalleryList();
  });
}

function handleExperienceSubmit(event) {
  event.preventDefault();
  const id = document.getElementById('exp-id').value;
  const item = {
    id: id || `exp-${Date.now()}`,
    title: document.getElementById('exp-title').value.trim(),
    description: document.getElementById('exp-description').value.trim(),
    category: document.getElementById('exp-category').value.trim() || 'Software & Web Development',
    tagText: document.getElementById('exp-tagText').value.trim(),
    tagColor: document.getElementById('exp-tagColor').value,
    tagBg: document.getElementById('exp-tagBg').value.trim() || 'rgba(249,115,22,0.15)',
    icon: document.getElementById('exp-icon').value.trim() || 'fas fa-briefcase',
    link: document.getElementById('exp-link').value.trim(),
    gradient: document.getElementById('exp-gradient').value.trim() || 'linear-gradient(135deg,#10b981,#0d9488)',
  };

  if (id) {
    portfolioData.experiences = portfolioData.experiences.map(exp => exp.id === id ? item : exp);
  } else {
    portfolioData.experiences.unshift(item);
  }

  savePortfolioData();
  renderExperiencePage();
  renderAdminExperienceList();
  clearForm('exp');
}

function handleGallerySubmit(event) {
  event.preventDefault();
  const id = document.getElementById('gal-id').value;
  const item = {
    id: id || `gal-${Date.now()}`,
    title: document.getElementById('gal-title').value.trim(),
    subtitle: document.getElementById('gal-subtitle').value.trim(),
    image: document.getElementById('gal-image').value.trim(),
    alt: document.getElementById('gal-alt').value.trim(),
    gradient: document.getElementById('gal-gradient').value.trim() || 'linear-gradient(135deg,#10b981,#0d9488)',
  };

  if (id) {
    portfolioData.gallery = portfolioData.gallery.map(gal => gal.id === id ? item : gal);
  } else {
    portfolioData.gallery.unshift(item);
  }

  savePortfolioData();
  renderGalleryPage();
  renderAdminGalleryList();
  clearForm('gal');
}

function renderAdminExperienceList() {
  const list = document.getElementById('admin-exp-list');
  if (!list) return;
  list.innerHTML = '';
  if (!portfolioData.experiences.length) {
    list.innerHTML = '<p>Tidak ada pengalaman tersimpan.</p>';
    return;
  }
  portfolioData.experiences.forEach(item => {
    const card = document.createElement('div');
    card.className = 'admin-item';
    card.innerHTML = `
      <div class="admin-item-info">
        <h4>${item.title}</h4>
        <p>${item.category} · ${item.tagText || 'Tanpa label'}</p>
      </div>
      <div class="admin-item-actions">
        <button class="edit-btn" data-id="${item.id}" onclick="editExperience('${item.id}')">Edit</button>
        <button class="delete-btn" data-id="${item.id}" onclick="deleteExperience('${item.id}')">Hapus</button>
      </div>
    `;
    list.appendChild(card);
  });
}

function renderAdminGalleryList() {
  const list = document.getElementById('admin-gal-list');
  if (!list) return;
  list.innerHTML = '';
  if (!portfolioData.gallery.length) {
    list.innerHTML = '<p>Tidak ada gallery tersimpan.</p>';
    return;
  }
  portfolioData.gallery.forEach(item => {
    const card = document.createElement('div');
    card.className = 'admin-item';
    card.innerHTML = `
      <div class="admin-item-info">
        <h4>${item.title}</h4>
        <p>${item.subtitle}</p>
      </div>
      <div class="admin-item-actions">
        <button class="edit-btn" data-id="${item.id}" onclick="editGallery('${item.id}')">Edit</button>
        <button class="delete-btn" data-id="${item.id}" onclick="deleteGallery('${item.id}')">Hapus</button>
      </div>
    `;
    list.appendChild(card);
  });
}

function clearForm(type) {
  const idEl = document.getElementById(`${type}-id`);
  const titleEl = document.getElementById(`${type}-title`);
  const descriptionEl = document.getElementById(`${type}-description`);
  const categoryEl = document.getElementById(`${type}-category`);
  const tagTextEl = document.getElementById(`${type}-tagText`);
  const tagColorEl = document.getElementById(`${type}-tagColor`);
  const tagBgEl = document.getElementById(`${type}-tagBg`);
  const iconEl = document.getElementById(`${type}-icon`);
  const linkEl = document.getElementById(`${type}-link`);
  const gradientEl = document.getElementById(`${type}-gradient`);
  const subtitleEl = document.getElementById(`${type}-subtitle`);
  const imageEl = document.getElementById(`${type}-image`);
  const altEl = document.getElementById(`${type}-alt`);
  const formTitleEl = document.getElementById(`${type}-form-title`);

  if (idEl) idEl.value = '';
  if (titleEl) titleEl.value = '';
  if (descriptionEl) descriptionEl.value = '';
  if (categoryEl) categoryEl.value = '';
  if (tagTextEl) tagTextEl.value = '';
  if (tagColorEl) tagColorEl.value = '#1f2937';
  if (tagBgEl) tagBgEl.value = 'rgba(249,115,22,0.15)';
  if (iconEl) iconEl.value = '';
  if (linkEl) linkEl.value = '';
  if (gradientEl) gradientEl.value = '';
  if (subtitleEl) subtitleEl.value = '';
  if (imageEl) imageEl.value = '';
  if (altEl) altEl.value = '';
  if (formTitleEl) formTitleEl.innerText = type === 'exp' ? 'Tambah Pengalaman Baru' : 'Tambah Item Gallery';
}

function editExperience(id) {
  const item = portfolioData.experiences.find(exp => exp.id === id);
  if (!item) return;
  document.getElementById('exp-id').value = item.id;
  document.getElementById('exp-title').value = item.title;
  document.getElementById('exp-description').value = item.description;
  document.getElementById('exp-category').value = item.category;
  document.getElementById('exp-tagText').value = item.tagText;
  document.getElementById('exp-tagColor').value = item.tagColor;
  document.getElementById('exp-tagBg').value = item.tagBg;
  document.getElementById('exp-icon').value = item.icon;
  document.getElementById('exp-link').value = item.link;
  document.getElementById('exp-gradient').value = item.gradient;
  document.getElementById('exp-form-title').innerText = 'Edit Pengalaman';
}

function editGallery(id) {
  const item = portfolioData.gallery.find(gal => gal.id === id);
  if (!item) return;
  document.getElementById('gal-id').value = item.id;
  document.getElementById('gal-title').value = item.title;
  document.getElementById('gal-subtitle').value = item.subtitle;
  document.getElementById('gal-image').value = item.image;
  document.getElementById('gal-alt').value = item.alt;
  document.getElementById('gal-gradient').value = item.gradient;
  document.getElementById('gal-form-title').innerText = 'Edit Gallery Item';
}

function deleteExperience(id) {
  if (!confirm('Hapus pengalaman ini?')) return;
  portfolioData.experiences = portfolioData.experiences.filter(exp => exp.id !== id);
  savePortfolioData();
  renderExperiencePage();
  renderAdminExperienceList();
}

function deleteGallery(id) {
  if (!confirm('Hapus item gallery ini?')) return;
  portfolioData.gallery = portfolioData.gallery.filter(gal => gal.id !== id);
  savePortfolioData();
  renderGalleryPage();
  renderAdminGalleryList();
}

function isAdminPage() {
  return !!document.getElementById('admin-page');
}

function buildOverlay() {
  const ov = document.createElement('div');
  ov.id = 'page-transition-overlay';
  for (let i = 0; i < 5; i++) {
    const p = document.createElement('div');
    p.className = 'wipe-panel';
    ov.appendChild(p);
  }
  document.body.appendChild(ov);
  return ov;
}
const overlay = buildOverlay();

/* ══════════════════════════════════════
   NAVIGATION  (wipe → swap → wipe out)
   ══════════════════════════════════════ */
function navigateTo(pageId) {
  if (!CONFIG.pages.includes(pageId) || pageId === currentPage || isTransitioning) return;
  isTransitioning = true;

  const prevPage = currentPage;
  const prevEl   = document.getElementById(`${prevPage}-page`);

  /* ── Step 1: apply NEXT theme early (sets wipe color) ── */
  body.className = body.className.replace(/theme-\w+/g, '').trim();
  body.classList.add(CONFIG.themes[pageId]);

  /* ── Step 2: WIPE IN ── */
  overlay.className = 'wipe-in';

  /* ── Step 3: mid-wipe swap (at ~350ms) ── */
  setTimeout(() => {
    /* hide old */
    if (prevEl) {
      prevEl.classList.remove('active');
      prevEl.style.display = 'none';
    }

    /* show new */
    const nextEl = document.getElementById(`${pageId}-page`);
    if (nextEl) {
      nextEl.style.display = 'block';
      /* force reflow */
      nextEl.offsetHeight;
      nextEl.classList.add('active');
    }

    /* update nav buttons */
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageId);
    });

    /* scroll */
    window.scrollTo({ top: 0, behavior: 'instant' });

    /* pulse orbs */
    orbs.forEach(orb => {
      orb.classList.remove('visible');
      setTimeout(() => orb.classList.add('visible'), 80);
    });

    /* close mobile menu */
    closeMobileMenu();

    /* ── Step 4: WIPE OUT ── */
    overlay.className = 'wipe-out';

    setTimeout(() => {
      overlay.className = '';
      isTransitioning = false;

      /* page-specific after-reveal */
      if (pageId === 'pengalaman') animateExpCards();
      if (pageId === 'gallery')    startGalleryParticles();
      else                          stopGalleryParticles();

    }, 420); /* wipe out duration */

  }, 380); /* wipe in duration */

  currentPage = pageId;
}

/* ══════════════════════════════════════
   MOBILE MENU
   ══════════════════════════════════════ */
function toggleMobileMenu() {
  mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
}
function openMobileMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('open');
}
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
}

/* ══════════════════════════════════════
   NAV BUTTON RIPPLE
   ══════════════════════════════════════ */
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const r = document.createElement('span');
    r.className = 'nav-btn-ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px;`;
    this.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
});

/* ══════════════════════════════════════
   PENGALAMAN — cascading card reveal
   ══════════════════════════════════════ */
function animateExpCards() {
  /* Category titles */
  document.querySelectorAll('.exp-cat-title').forEach((title, i) => {
    title.classList.remove('title-visible');
    title.style.opacity = '0';
    setTimeout(() => {
      title.classList.add('title-visible');
    }, 80 + i * 150);
  });

  /* Cards staggered */
  const cards = document.querySelectorAll('.exp-card');
  cards.forEach((card, i) => {
    card.classList.remove('card-visible');
    card.style.opacity = '0';
    setTimeout(() => {
      card.classList.add('card-visible');
    }, 180 + i * 110);
  });
}

/* ══════════════════════════════════════
   GALLERY — floating particles
   ══════════════════════════════════════ */
function startGalleryParticles() {
  stopGalleryParticles();
  const container = document.getElementById('gallery-particles');
  if (!container) return;
  container.innerHTML = '';

  const colors = ['#d946ef','#a855f7','#06b6d4','#ec4899','#818cf8','#e879f9'];

  particleInterval = setInterval(() => {
    const p = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size  = 4 + Math.random() * 9;
    p.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      border-radius:50%;
      left:${Math.random() * 100}%;
      bottom:-20px;
      background:${color};
      box-shadow:0 0 ${size * 2}px ${color};
      pointer-events:none;
      animation:particleRise ${3 + Math.random() * 4}s ease-out forwards;
      opacity:0.9;
    `;
    container.appendChild(p);
    setTimeout(() => p.remove(), 7000);
  }, 250);
}
function stopGalleryParticles() {
  if (particleInterval) { clearInterval(particleInterval); particleInterval = null; }
  const c = document.getElementById('gallery-particles');
  if (c) c.innerHTML = '';
}

/* ══════════════════════════════════════
   HOME — Typewriter
   ══════════════════════════════════════ */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const phrases = ['Full Stack Developer', 'UI/UX Enthusiast', 'Creative Coder', 'Digital Creator', 'Problem Solver'];
  let pIdx = 0, cIdx = 0, deleting = false;

  function type() {
    const current = phrases[pIdx];
    if (!deleting) {
      el.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      el.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 55 : 95);
  }
  setTimeout(type, 800);
}

/* ══════════════════════════════════════
   STACK CARD hover colors
   ══════════════════════════════════════ */
function initStackCards() {
  const colors = {
    figma:'#f24e1e', python:'#3b82f6', html:'#f97316',
    css:'#0ea5e9', javascript:'#eab308', json:'#10b981',
    mysql:'#2563eb', rstudio:'#1e40af',
  };
  document.querySelectorAll('.stack-card[data-tech]').forEach(card => {
    const color = colors[card.dataset.tech] || '#6366f1';
    card.style.setProperty('--c', color);
    card.addEventListener('mouseenter', () => { card.querySelector('i').style.color = color; });
    card.addEventListener('mouseleave', () => { card.querySelector('i').style.color = ''; });
  });
}

/* ══════════════════════════════════════
   SCROLL REVEAL
   ══════════════════════════════════════ */
function initScrollReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ══════════════════════════════════════
   INJECT KEYFRAMES
   ══════════════════════════════════════ */
function injectKeyframes() {
  const s = document.createElement('style');
  s.textContent = `
    @keyframes particleRise {
      0%   { transform: translateY(0) scale(1) rotate(0deg); opacity: 0.9; }
      80%  { opacity: 0.6; }
      100% { transform: translateY(-100vh) scale(0.2) rotate(180deg); opacity: 0; }
    }
    .reveal {
      opacity: 0; transform: translateY(32px);
      transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.56,0.64,1);
    }
    .reveal.revealed { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(s);
}

/* ══════════════════════════════════════
   INIT
   ══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  /* initial theme & page */
  if (isAdminPage()) {
    body.classList.add('theme-admin');
    const adminEl = document.getElementById('admin-page');
    if (adminEl) {
      adminEl.style.display = 'block';
      adminEl.classList.add('active');
    }
  } else {
    body.classList.add(CONFIG.themes[CONFIG.defaultPage]);
    const initEl = document.getElementById(`${CONFIG.defaultPage}-page`);
    if (initEl) { initEl.style.display = 'block'; initEl.classList.add('active'); }
  }

  /* initial nav active */
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === CONFIG.defaultPage);
  });

  /* orbs */
  setTimeout(() => orbs.forEach(o => o.classList.add('visible')), 200);

  /* features */
  injectKeyframes();
  initTypewriter();
  initStackCards();
  initScrollReveal();
  if (isAdminPage()) initAdminPage();
  if (document.getElementById('exp-content')) renderExperiencePage();
  if (document.getElementById('gal-grid')) renderGalleryPage();
});

/* close mobile menu on outside click */
document.addEventListener('click', e => {
  if (mobileMenu && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    closeMobileMenu();
  }
});

window.editExperience = editExperience;
window.deleteExperience = deleteExperience;
window.editGallery = editGallery;
window.deleteGallery = deleteGallery;
window.clearForm = clearForm;

