const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('script.js', 'utf8');
const required = ['CNAME', 'styles.css', 'whatsapp.css', 'layout-fixes.css', 'motion.css', 'script.js', 'robots.txt', 'sitemap.xml', 'favicon.svg', 'site.webmanifest', 'og-image.jpg', 'assets/icons/whatsapp-white.svg', 'assets/icons/whatsapp-green.svg', 'assets/images/maria-zilda/hero.webp', 'assets/images/maria-zilda/about.webp', 'assets/images/maria-zilda/cta.webp'];
const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) throw new Error(`Arquivos ausentes: ${missing.join(', ')}`);
if (!html.includes('application/ld+json')) throw new Error('JSON-LD ausente');
if (!html.includes('lang="pt-BR"')) throw new Error('Idioma do documento ausente');
if (!script.includes('assets/images/certificates/master-trg.webp')) throw new Error('Galeria de certificados em imagem ausente');
if (!html.includes('https://terapeutamariazilda.com.br/')) throw new Error('Domínio oficial ausente');
console.log('Validação estática concluída.');
