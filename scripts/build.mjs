import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import nunjucks from 'nunjucks';
import sharp from 'sharp';
import { profile } from '../content/profile.mjs';

const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, 'site'), dist, { recursive: true });
const imageDir = join(dist, 'assets/images');
const sizes = {};
for (const file of await readdir(imageDir)) {
  if (!file.endsWith('.png')) continue;
  const name = file.slice(0, -4);
  const { data, info } = await sharp(join(imageDir, file))
    .resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 88 }).toBuffer({ resolveWithObject: true });
  await writeFile(join(imageDir, name + '.webp'), data);
  sizes[name] = { width: info.width, height: info.height };
  await rm(join(imageDir, file));
}
const fontDir = join(dist, 'assets/fonts');
await mkdir(fontDir, { recursive: true });
for (const family of ['source-serif-4', 'source-sans-3']) {
  for (const weight of [400, 600]) {
    const file = family + '-latin-' + weight + '-normal.woff2';
    await cp(join(root, 'node_modules/@fontsource', family, 'files', file), join(fontDir, file));
  }
  await cp(join(root, 'node_modules/@fontsource', family, 'LICENSE'), join(fontDir, family + '-LICENSE.txt'));
}
const env = nunjucks.configure(join(root, 'templates'), { autoescape: true, throwOnUndefined: true });
const pages = [
  { template: 'home.njk', file: 'index.html', path: '/', title: 'Saange Tamang | Wireless Communications & Machine Learning', nav: 'home', description: 'Saange Tamang’s research, engineering projects, and academic background in wireless communications and machine learning.' },
  { template: 'research.njk', file: 'research/index.html', path: '/research/', title: 'Research | Saange Tamang', nav: 'research', description: 'Graph attention and Double DQN for cellular handover: methods, paired simulation evaluation, findings, and limitations.' },
  { template: 'projects.njk', file: 'projects/index.html', path: '/projects/', title: 'Projects | Saange Tamang', nav: 'projects', description: 'Wireless and ML research projects, SolVote, JAMJAMNEPAL tourism development, Packet Tracer and Wireshark networking labs, and macOS software.' },
  { template: 'cv.njk', file: 'cv/index.html', path: '/cv/', title: 'Curriculum Vitae | Saange Tamang', nav: 'cv', description: 'Academic CV, research experience, telecommunications internship, technical preparation, and verified course credentials.' },
  { template: '404.njk', file: '404.html', path: '/404.html', title: 'Page not found | Saange Tamang', nav: '', description: 'Return to Saange Tamang’s academic website.' }
];
for (const page of pages) {
  const target = join(dist, page.file);
  await mkdir(resolve(target, '..'), { recursive: true });
  await writeFile(target, env.render(page.template, { profile, page, sizes }));
}
await writeFile(join(dist, '.nojekyll'), '');
await writeFile(join(dist, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + profile.url + '/sitemap.xml\n');
const urls = pages.filter(p => p.nav).map(p => '  <url><loc>' + profile.url + p.path + '</loc></url>').join('\n');
await writeFile(join(dist, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n');
await writeFile(join(dist, 'assets/documents/handover-study.bib'), '@unpublished{tamang2026handover,\n  author = {Tamang, Saange and Kandel, Sulav},\n  title = {' + profile.paperTitle + '},\n  year = {2026},\n  note = {Accepted for presentation at the 19th IOE Graduate Conference; proceedings citation pending},\n  url = {' + profile.code + '}\n}\n');
const socialSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="white"/><rect x="80" y="90" width="60" height="4" fill="#793743"/><text x="80" y="230" font-family="Georgia,serif" font-size="76" fill="#26282b">Saange Tamang</text><text x="80" y="325" font-family="Arial,sans-serif" font-size="34" fill="#793743">Wireless Communications</text><text x="80" y="375" font-family="Arial,sans-serif" font-size="34" fill="#793743">&amp; Machine Learning</text><path d="M80 465H1120" stroke="#dcdde0"/><text x="80" y="525" font-family="Arial,sans-serif" font-size="24" fill="#62666c">Research · Projects · Academic background</text></svg>';
await sharp(Buffer.from(socialSvg)).png().toFile(join(dist, 'assets/images/social-preview.png'));
console.log('Built ' + pages.length + ' static pages, optimized figures, local fonts, sitemap, and citation.');
