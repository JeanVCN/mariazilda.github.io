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

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));
document.querySelector('#current-year').textContent = new Date().getFullYear();

const dialog = document.querySelector('.certificate-dialog');
const image = dialog.querySelector('.certificate-image');
const title = dialog.querySelector('.gallery-title');
const subtitle = dialog.querySelector('.gallery-subtitle');
const thumbnails = dialog.querySelector('.thumbnail-list');
let currentCertificate = 0;
let returnFocus;

function showCertificate(index) {
  currentCertificate = (index + certificates.length) % certificates.length;
  const certificate = certificates[currentCertificate];
  image.src = certificate.image;
  image.alt = `Certificado de ${certificate.title} em nome de Maria Zilda Damacena Carvalho`;
  title.textContent = certificate.title;
  subtitle.textContent = certificate.subtitle;
  thumbnails.querySelectorAll('button').forEach((button, buttonIndex) => button.setAttribute('aria-current', String(buttonIndex === currentCertificate)));
}

certificates.forEach((certificate, index) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Ver certificado: ${certificate.title}`);
  button.innerHTML = `<img src="${certificate.image}" alt="" loading="lazy">`;
  button.addEventListener('click', () => showCertificate(index));
  thumbnails.append(button);
});

function openGallery(index, trigger) {
  returnFocus = trigger;
  showCertificate(index);
  dialog.showModal();
  dialog.querySelector('.dialog-close').focus();
}

document.querySelectorAll('[data-certificate]').forEach((button) => button.addEventListener('click', () => openGallery(Number(button.dataset.certificate), button)));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.previous').addEventListener('click', () => showCertificate(currentCertificate - 1));
dialog.querySelector('.next').addEventListener('click', () => showCertificate(currentCertificate + 1));
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => returnFocus?.focus());
dialog.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showCertificate(currentCertificate - 1);
  if (event.key === 'ArrowRight') showCertificate(currentCertificate + 1);
});
