const trackingConfig = window.SITE_TRACKING_CONFIG || {};
const consentStorageKey = 'maria-zilda-cookie-consent';
const attributionStorageKey = 'maria-zilda-attribution';
const attributionKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'gbraid', 'wbraid'];
const whatsappMessage = 'Olá! Vim pelo site da Maria Zilda e gostaria de entender melhor como funciona o atendimento em TRG.';

window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', wait_for_update: 500 });

function readConsent() {
  try { return JSON.parse(localStorage.getItem(consentStorageKey)); } catch { return null; }
}

function hasConsent(category) {
  const consent = readConsent();
  return Boolean(consent && consent[category]);
}

function getAttribution() {
  if (!hasConsent('analysis') && !hasConsent('advertising')) return {};
  try {
    const attribution = JSON.parse(sessionStorage.getItem(attributionStorageKey)) || {};
    return Object.fromEntries(Object.entries(attribution).filter(([key]) => key.startsWith('utm_')));
  } catch { return {}; }
}

function storeAttribution() {
  if (!hasConsent('analysis') && !hasConsent('advertising')) return;
  const params = new URLSearchParams(window.location.search);
  const permittedKeys = hasConsent('advertising') ? attributionKeys : attributionKeys.filter((key) => key.startsWith('utm_'));
  const attribution = Object.fromEntries(permittedKeys.filter((key) => params.has(key)).map((key) => [key, params.get(key)]));
  if (Object.keys(attribution).length) sessionStorage.setItem(attributionStorageKey, JSON.stringify(attribution));
}

function activateGoogleTags() {
  if (!hasConsent('analysis') && !hasConsent('advertising')) return;
  if (!trackingConfig.GTM_CONTAINER_ID || document.querySelector('[data-gtm-loader]')) return;
  const script = document.createElement('script');
  script.async = true;
  script.dataset.gtmLoader = 'true';
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(trackingConfig.GTM_CONTAINER_ID)}`;
  document.head.append(script);
}

function updateConsent(consent) {
  localStorage.setItem(consentStorageKey, JSON.stringify(consent));
  gtag('consent', 'update', {
    analytics_storage: consent.analysis ? 'granted' : 'denied',
    ad_storage: consent.advertising ? 'granted' : 'denied'
  });
  if (!consent.analysis && !consent.advertising) {
    sessionStorage.removeItem(attributionStorageKey);
  } else if (!consent.advertising) {
    try {
      const attribution = JSON.parse(sessionStorage.getItem(attributionStorageKey)) || {};
      ['gclid', 'gbraid', 'wbraid'].forEach((key) => delete attribution[key]);
      if (Object.keys(attribution).length) sessionStorage.setItem(attributionStorageKey, JSON.stringify(attribution));
      else sessionStorage.removeItem(attributionStorageKey);
    } catch { sessionStorage.removeItem(attributionStorageKey); }
  }
  storeAttribution();
  activateGoogleTags();
}

function pushEvent(event, parameters = {}) {
  if (!hasConsent('analysis') && !hasConsent('advertising')) return;
  window.dataLayer.push({ event, ...parameters, page_location: `${window.location.origin}${window.location.pathname}`, ...getAttribution() });
}

function setupConsent() {
  const existingConsent = readConsent();
  const banner = document.createElement('section');
  banner.className = 'cookie-banner';
  banner.setAttribute('aria-labelledby', 'cookie-banner-title');
  banner.innerHTML = '<h2 id="cookie-banner-title">Sua privacidade</h2><p>Usamos cookies necessários para guardar sua escolha. Análise e publicidade dependem da sua autorização.</p><div class="cookie-actions"><button class="cookie-accept" type="button">Aceitar</button><button class="cookie-reject" type="button">Rejeitar</button><button class="cookie-configure" type="button">Configurar</button></div>';
  const dialog = document.createElement('dialog');
  dialog.className = 'cookie-dialog';
  dialog.setAttribute('aria-labelledby', 'cookie-dialog-title');
  dialog.innerHTML = '<form method="dialog"><button class="dialog-close" value="cancel" aria-label="Fechar preferências">×</button><h2 id="cookie-dialog-title">Preferências de cookies</h2><p>Escolha quais categorias não essenciais deseja permitir.</p><label class="cookie-option"><input type="checkbox" checked disabled><span><strong>Estritamente necessários</strong>Guardam sua escolha de privacidade e não podem ser desativados.</span></label><label class="cookie-option"><input name="analysis" type="checkbox"><span><strong>Análise</strong>Ajuda a entender, de forma agregada, como o site é utilizado.</span></label><label class="cookie-option"><input name="advertising" type="checkbox"><span><strong>Publicidade</strong>Permite medir campanhas quando ferramentas Google forem configuradas.</span></label><div class="cookie-actions"><button class="cookie-save" value="save">Salvar preferências</button><button class="cookie-reject" type="button">Rejeitar tudo</button></div></form>';
  document.body.append(banner, dialog);
  let returnFocus;
  const closeBanner = () => banner.remove();
  const save = (consent) => { updateConsent(consent); closeBanner(); if (dialog.open) dialog.close(); };
  const openDialog = (trigger) => {
    returnFocus = trigger || document.activeElement;
    const consent = readConsent();
    dialog.elements.analysis.checked = Boolean(consent?.analysis);
    dialog.elements.advertising.checked = Boolean(consent?.advertising);
    dialog.showModal();
    dialog.querySelector('.dialog-close').focus();
  };
  banner.querySelector('.cookie-accept').addEventListener('click', () => save({ necessary: true, analysis: true, advertising: true }));
  banner.querySelector('.cookie-reject').addEventListener('click', () => save({ necessary: true, analysis: false, advertising: false }));
  banner.querySelector('.cookie-configure').addEventListener('click', () => openDialog(banner.querySelector('.cookie-configure')));
  dialog.querySelector('.cookie-reject').addEventListener('click', () => save({ necessary: true, analysis: false, advertising: false }));
  dialog.addEventListener('close', () => returnFocus?.focus());
  dialog.addEventListener('submit', (event) => {
    event.preventDefault();
    save({ necessary: true, analysis: dialog.elements.analysis.checked, advertising: dialog.elements.advertising.checked });
  });
  document.querySelectorAll('[data-cookie-preferences]').forEach((trigger) => trigger.addEventListener('click', () => openDialog(trigger)));
  if (existingConsent) { closeBanner(); storeAttribution(); activateGoogleTags(); }
}

function setupTracking() {
  document.querySelectorAll('.whatsapp-cta').forEach((link) => {
    link.href = `https://wa.me/5544998659471?text=${encodeURIComponent(whatsappMessage)}`;
    link.addEventListener('click', () => {
      const parameters = { cta_location: link.dataset.ctaLocation, cta_text: link.textContent.trim(), link_url: link.href, ...getAttribution() };
      pushEvent('cta_click', parameters);
      pushEvent('whatsapp_click', parameters);
    });
  });
  document.querySelectorAll('.instagram-cta').forEach((link) => link.addEventListener('click', () => pushEvent('instagram_click', { cta_location: link.dataset.ctaLocation, link_url: link.href })));
  document.querySelectorAll('.accordion details').forEach((item) => item.addEventListener('toggle', () => {
    if (item.open) pushEvent('faq_expand');
  }));
}

const certificates = [
  { title: 'Master Terapeuta TRG', subtitle: 'Formação Master · 180 horas', image: 'assets/images/certificates/master-trg.webp' },
  { title: 'Traumas e Fobias', subtitle: 'Formação Avançada · 30 horas', image: 'assets/images/certificates/traumas-fobias.webp' },
  { title: 'Transtornos de Ansiedade e Sonoros', subtitle: 'Formação Avançada · 30 horas', image: 'assets/images/certificates/ansiedade-sonoros.webp' },
  { title: 'Transtornos Emocionais Graves', subtitle: 'Formação Avançada · 30 horas', image: 'assets/images/certificates/transtornos-emocionais-graves.webp' },
  { title: 'Transtornos Alimentares e de Imagem', subtitle: 'Formação Avançada · 30 horas', image: 'assets/images/certificates/transtornos-alimentares-imagem.webp' },
  { title: 'Transtornos Sexuais', subtitle: 'Formação Avançada · 30 horas', image: 'assets/images/certificates/transtornos-sexuais.webp' },
  { title: 'Leitura Corporal e Comportamental', subtitle: 'Curso de Formação · 40 horas', image: 'assets/images/certificates/leitura-corporal-comportamental.webp' },
  { title: 'TRG Kids', subtitle: 'Certificação em Atendimento Infantil', image: 'assets/images/certificates/trg-kids.webp' }
];

function setupLanding() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') === 'true'; menuToggle.setAttribute('aria-expanded', String(!open)); nav.classList.toggle('open', !open); });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menuToggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }));
  }
  const year = document.querySelector('#current-year'); if (year) year.textContent = new Date().getFullYear();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('.trg-layout, .care-card, .about-layout, .certificate-showcase, .final-layout');
  if (!reduceMotion && 'IntersectionObserver' in window) { const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); currentObserver.unobserve(entry.target); } }), { threshold: 0.12 }); revealTargets.forEach((target) => { target.dataset.reveal = ''; observer.observe(target); }); }
  if (!reduceMotion) window.addEventListener('load', () => window.setTimeout(() => document.documentElement.classList.add('hero-signature-ready'), 420), { once: true });
  const dialog = document.querySelector('.certificate-dialog');
  if (!dialog) return;
  const image = dialog.querySelector('.certificate-image'); const title = dialog.querySelector('.gallery-title'); const subtitle = dialog.querySelector('.gallery-subtitle'); const thumbnails = dialog.querySelector('.thumbnail-list'); let current = 0; let returnFocus;
  function show(index) { current = (index + certificates.length) % certificates.length; const certificate = certificates[current]; image.src = certificate.image; image.alt = `Certificado de ${certificate.title} em nome de Maria Zilda Damacena Carvalho`; title.textContent = certificate.title; subtitle.textContent = certificate.subtitle; thumbnails.querySelectorAll('button').forEach((button, buttonIndex) => button.setAttribute('aria-current', String(buttonIndex === current))); }
  certificates.forEach((certificate, index) => { const button = document.createElement('button'); button.type = 'button'; button.setAttribute('aria-label', `Ver certificado: ${certificate.title}`); button.innerHTML = `<img src="${certificate.image}" alt="" loading="lazy">`; button.addEventListener('click', () => show(index)); thumbnails.append(button); });
  function open(index, trigger) { returnFocus = trigger; show(index); dialog.showModal(); dialog.querySelector('.dialog-close').focus(); pushEvent('certificate_view'); }
  document.querySelectorAll('[data-certificate]').forEach((button) => button.addEventListener('click', () => open(Number(button.dataset.certificate), button)));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close()); dialog.querySelector('.previous').addEventListener('click', () => show(current - 1)); dialog.querySelector('.next').addEventListener('click', () => show(current + 1)); dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); }); dialog.addEventListener('close', () => returnFocus?.focus()); dialog.addEventListener('keydown', (event) => { if (event.key === 'ArrowLeft') show(current - 1); if (event.key === 'ArrowRight') show(current + 1); });
}

setupConsent();
setupTracking();
setupLanding();
