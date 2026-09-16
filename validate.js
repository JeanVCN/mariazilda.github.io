const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('script.js', 'utf8');
const policy = fs.readFileSync('politica-de-privacidade/index.html', 'utf8');
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const trackingConfig = fs.readFileSync('tracking-config.js', 'utf8');
const required = ['CNAME', 'styles.css', 'whatsapp.css', 'layout-fixes.css', 'motion.css', 'privacy.css', 'script.js', 'tracking-config.js', 'politica-de-privacidade/index.html', '404.html', 'robots.txt', 'sitemap.xml', 'favicon.svg', 'site.webmanifest', 'og-image.jpg', 'assets/icons/whatsapp-white.svg', 'assets/icons/whatsapp-green.svg', 'assets/images/maria-zilda/hero.webp', 'assets/images/maria-zilda/about.webp', 'assets/images/maria-zilda/cta.webp'];
const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) throw new Error(`Arquivos ausentes: ${missing.join(', ')}`);
if (!html.includes('application/ld+json')) throw new Error('JSON-LD ausente');
if (!html.includes('lang="pt-BR"')) throw new Error('Idioma do documento ausente');
if (!script.includes('assets/images/certificates/master-trg.webp')) throw new Error('Galeria de certificados em imagem ausente');
if (!html.includes('https://terapeutamariazilda.com.br/')) throw new Error('Domínio oficial ausente');
if (!html.includes('data-cta-location')) throw new Error('Identificação de CTAs ausente');
if (!['analytics_storage', 'ad_storage', 'ad_user_data', 'ad_personalization'].every((field) => script.includes(field))) throw new Error('Consent Mode incompleto');
if (!script.includes('const form = dialog.querySelector(\'form\');')) throw new Error('Formulário de preferências ausente');
if (script.includes('dialog.elements')) throw new Error('Uso incorreto de dialog.elements');
if (!script.includes('class="dialog-close" type="button"')) throw new Error('Botão de fechar inseguro');
if (!script.includes('class="cookie-save" type="submit"')) throw new Error('Botão de salvar sem submit explícito');
if (!script.includes('href="/politica-de-privacidade/"')) throw new Error('Link da política ausente no banner');
if (!/GTM_CONTAINER_ID:\s*''/.test(trackingConfig) || !/GA4_MEASUREMENT_ID:\s*''/.test(trackingConfig) || !/GOOGLE_ADS_ID:\s*''/.test(trackingConfig)) throw new Error('IDs Google devem permanecer vazios');
if (/GTM-[A-Z0-9]+|G-[A-Z0-9]+|AW-[A-Z0-9]+/.test(trackingConfig)) throw new Error('ID Google fictício encontrado');
if (/utm_|gclid|gbraid|wbraid/i.test(script.match(/const whatsappMessage = .*;/)?.[0] || '')) throw new Error('Mensagem do WhatsApp contém atribuição');
if (policy.includes('[PENDENTE')) {
  if (!policy.includes('name="robots" content="noindex, follow"')) throw new Error('Política provisória deve permanecer noindex');
  if (sitemap.includes('politica-de-privacidade')) throw new Error('Política provisória não pode estar no sitemap');
}
console.log('Validação estática concluída.');
