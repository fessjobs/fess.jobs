(function () {
  const C = window.SITE_CONTENT;

  const ICONS = {
    blueprint: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21V8l9-5 9 5v13H3z"/><path d="M9 21v-7h6v7"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.7 6.3a4 4 0 1 0-5.66 5.66L3 18l3 3 6.04-6.04a4 4 0 0 0 5.66-5.66l-3-3z"/></svg>',
    sofa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 13h16v6H4z"/><path d="M4 13V8a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3M16 13V8a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v5M5 19v2M19 19v2"/></svg>',
    staging: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="14" rx="1"/><path d="M3 17l5-5 4 4 5-6 4 4"/></svg>',
    renovation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 21l7-7M14 7l3-3 4 4-3 3M11 10l6 6-3 3-6-6z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="8" r="4"/><path d="M11 11l9 9M16 16l3-3M18 18l2-2"/></svg>',
    location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-7.4 7-12a7 7 0 1 0-14 0c0 4.6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h4l2 5-2.5 2a11 11 0 0 0 5.5 5.5l2-2.5 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/></svg>',
  };

  const LOGO_SVG = `
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#129b6b"/>
      <path d="M9 22.5 19.5 13 30 22.5" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14 21v8h11v-8" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 29v-5h-5v5" stroke="#ff6b4a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  function el(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function renderBrand(target) {
    target.innerHTML = `
      <span class="brand-mark">${LOGO_SVG}</span>
      <span class="brand-name"><strong>${C.brand.name}</strong><span>${C.brand.nameSuffix}</span></span>
    `;
  }

  function renderNav() {
    const nav = document.getElementById('main-nav');
    nav.innerHTML = C.nav.map(item => `<a href="${item.href}">${item.label}</a>`).join('');
  }

  function renderHero() {
    document.getElementById('hero-eyebrow').textContent = C.hero.eyebrow;
    document.getElementById('hero-title').textContent = C.hero.title;
    document.getElementById('hero-subtitle').textContent = C.hero.subtitle;
    document.getElementById('hero-cta').innerHTML = `
      <a class="btn btn-primary" href="${C.hero.ctaPrimary.href}">${C.hero.ctaPrimary.label}</a>
      <a class="btn btn-secondary" href="${C.hero.ctaSecondary.href}">${C.hero.ctaSecondary.label}</a>
    `;
    document.getElementById('hero-stats').innerHTML = C.hero.stats.map(s => `
      <div><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>
    `).join('');
  }

  function renderServices() {
    document.getElementById('services-grid').innerHTML = C.services.map(s => `
      <div class="service-card">
        <div class="service-icon">${ICONS[s.icon] || ICONS.wrench}</div>
        <h3>${s.title}</h3>
        <p>${s.text}</p>
      </div>
    `).join('');
  }

  function renderProcess() {
    document.getElementById('process-grid').innerHTML = C.process.map(p => `
      <div class="process-step">
        <span class="step-number">${p.step}</span>
        <h3>${p.title}</h3>
        <p>${p.text}</p>
      </div>
    `).join('');
  }

  function renderAccommodations() {
    document.getElementById('accommodations-intro').textContent = C.accommodations.intro;
    document.getElementById('accommodations-list').innerHTML = C.accommodations.listings.map(l => `
      <div class="listing-card">
        <div class="listing-image"><span class="placeholder-label">Foto folgt: ${l.name}</span></div>
        <div class="listing-body">
          <span class="listing-badge">${l.badge}</span>
          <h3>${l.name}</h3>
          <p class="listing-operator">${l.operator}</p>
          <p class="listing-location">${ICONS.location} ${l.location}</p>
          <p>${l.description}</p>
          <a class="btn btn-primary" href="${l.bookingUrl}">${l.bookingLabel}</a>
        </div>
      </div>
    `).join('');
  }

  function renderCraftsmen() {
    document.getElementById('craftsmen-intro').textContent = C.craftsmen.intro;
    document.getElementById('craftsmen-note').textContent = C.craftsmen.note;
    document.getElementById('craftsmen-grid').innerHTML = C.craftsmen.list.map(p => `
      <div class="setcard">
        <div class="setcard-image">${p.name.split(' ').map(n => n[0]).join('')}</div>
        <div class="setcard-body">
          <h4>${p.name}</h4>
          <div class="setcard-trade">${p.trade}</div>
          <div class="setcard-region">${p.region}</div>
          <div class="setcard-rating">★ ${p.rating}</div>
          <a class="btn btn-secondary btn-block" href="#kontakt">Jetzt buchen</a>
        </div>
      </div>
    `).join('');
  }

  function renderAbout() {
    document.getElementById('about-title').textContent = C.about.title;
    document.getElementById('about-text').textContent = C.about.text;
    document.getElementById('about-stats').innerHTML = C.about.stats.map(s => `
      <div class="about-stat"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>
    `).join('');
    document.getElementById('testimonials-list').innerHTML = C.testimonials.map(t => `
      <div class="testimonial">
        <p>"${t.quote}"</p>
        <div class="author">${t.author}</div>
      </div>
    `).join('');
  }

  function renderContact() {
    document.getElementById('contact-heading').textContent = C.contact.heading;
    document.getElementById('contact-text').textContent = C.contact.text;
    document.getElementById('contact-info').innerHTML = `
      <div class="contact-info-item">
        <span class="icon">${ICONS.location}</span>
        <div><div class="label">Adresse</div><div class="value">${C.contact.address}</div></div>
      </div>
      <div class="contact-info-item">
        <span class="icon">${ICONS.phone}</span>
        <div><div class="label">Telefon</div><div class="value">${C.contact.phone}</div></div>
      </div>
      <div class="contact-info-item">
        <span class="icon">${ICONS.mail}</span>
        <div><div class="label">E-Mail</div><div class="value">${C.contact.email}</div></div>
      </div>
      <div class="contact-info-item">
        <span class="icon">${ICONS.clock}</span>
        <div><div class="label">Erreichbarkeit</div><div class="value">${C.contact.hours}</div></div>
      </div>
    `;

    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      const subject = encodeURIComponent('Anfrage über janke-solutions.de von ' + name);
      const body = encodeURIComponent(`${message}\n\nKontakt: ${name} (${email})`);
      window.location.href = `${C.contact.formAction}?subject=${subject}&body=${body}`;
    });
  }

  function renderFooter() {
    document.getElementById('footer-brand').innerHTML = `
      <span class="brand-mark" style="width:28px;height:28px;">${LOGO_SVG}</span>
      <span>${C.brand.name} ${C.brand.nameSuffix}</span>
    `;
    document.getElementById('footer-links').innerHTML = C.footer.links.map(l => `<a href="${l.href}">${l.label}</a>`).join('');
    document.getElementById('footer-copy').textContent = `© ${new Date().getFullYear()} ${C.footer.copyright}`;
  }

  function initNavToggle() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('main-nav');
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
  }

  document.title = C.meta.title;
  document.querySelector('meta[name="description"]').setAttribute('content', C.meta.description);

  renderBrand(document.getElementById('brand-logo'));
  renderNav();
  renderHero();
  renderServices();
  renderAccommodations();
  renderCraftsmen();
  renderProcess();
  renderAbout();
  renderContact();
  renderFooter();
  initNavToggle();
})();
