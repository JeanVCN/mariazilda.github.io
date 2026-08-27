const certificates = [
  ['certificate (15).pdf', 'Leitura Corporal e Comportamental'], ['certificate (16).pdf', 'TRG Kids'], ['certificate (17).pdf', 'Transtornos de Ansiedade e Sonoros'], ['certificate (18).pdf', 'Transtornos Emocionais Graves'], ['certificate (19).pdf', 'Transtornos Sexuais'], ['certificate (20).pdf', 'Traumas e Fobias'], ['certificate (21).pdf', 'Transtornos Alimentares e de Imagem'], ['certificate (22).pdf', 'Master Terapeuta TRG']
];
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => { const open = menuToggle.getAttribute('aria-expanded') === 'true'; menuToggle.setAttribute('aria-expanded', !open); nav.classList.toggle('open', !open); });
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { menuToggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }));
document.querySelector('#current-year').textContent = new Date().getFullYear();
const dialog = document.querySelector('.certificate-dialog');
const documentFrame = dialog.querySelector('.certificate-document');
const caption = dialog.querySelector('.gallery-caption');
const pdfLink = dialog.querySelector('.pdf-link');
let current = 0;
function showCertificate(index) { current = (index + certificates.length) % certificates.length; const [file, title] = certificates[current]; documentFrame.src = file; documentFrame.title = `Certificado de ${title} em nome de Maria Zilda Damacena Carvalho`; caption.textContent = title; pdfLink.href = file; }
function openGallery(index = 0) { showCertificate(index); dialog.showModal(); dialog.querySelector('.dialog-close').focus(); }
document.querySelector('.certificate-trigger').addEventListener('click', () => openGallery());
document.querySelector('[data-certificate]').addEventListener('click', (event) => openGallery(Number(event.currentTarget.dataset.certificate)));
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.querySelector('.gallery-prev').addEventListener('click', () => showCertificate(current - 1));
dialog.querySelector('.gallery-next').addEventListener('click', () => showCertificate(current + 1));
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
