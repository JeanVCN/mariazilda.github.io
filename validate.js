const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const required = ['styles.css', 'script.js', 'robots.txt', 'sitemap.xml', 'favicon.svg', 'site.webmanifest', 'og-image.jpg'];
const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) throw new Error(`Arquivos ausentes: ${missing.join(', ')}`);
if (!html.includes('application/ld+json')) throw new Error('JSON-LD ausente');
if (!html.includes('lang="pt-BR"')) throw new Error('Idioma do documento ausente');
console.log('Validação estática concluída.');
