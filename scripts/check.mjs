import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '../dist');
async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path)); else files.push(path);
  }
  return files;
}
const files = await walk(root);
const pages = files.filter(p => p.endsWith('.html'));
const html = new Map(await Promise.all(pages.map(async path => [path, await readFile(path, 'utf8')])));
let checked = 0;
for (const [path, source] of html) {
  assert.equal((source.match(/<h1[ >]/g) || []).length, 1, path + ': expected one h1');
  assert(source.includes('lang="en"'), path + ': missing language');
  assert(source.includes('name="description"'), path + ': missing description');
  assert(!/lorem ipsum|TODO|your name|placeholder/i.test(source), path + ': unfinished content');
  for (const match of source.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (/^(https?:|mailto:|data:)/.test(value)) continue;
    const url = new URL(value, 'https://sange-creator.github.io' + path.slice(root.length));
    let local = join(root, decodeURIComponent(url.pathname));
    if (url.pathname.endsWith('/')) local = join(local, 'index.html');
    await stat(local).catch(() => { throw Error(path + ': broken local link ' + value); });
    if (url.hash && local.endsWith('.html')) {
      const target = html.get(local) || await readFile(local, 'utf8');
      assert(target.includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"'), path + ': missing fragment ' + value);
    }
    checked++;
  }
}
for (const filename of ['Saange_Tamang_Academic_CV.pdf', 'handover-study.pdf']) {
  const file = await readFile(join(root, 'assets/documents', filename));
  assert(file.subarray(0, 5).toString() === '%PDF-', filename + ': not a PDF');
}
assert(!files.some(f => /transcript|TRIBHUVAN UNIVERSITY|\.env|credential|token\.json/i.test(f)), 'Private source file in public output');
const cv = html.get(join(root, 'cv/index.html'));
assert((cv.match(/class="cv-pdf-viewer"/g) || []).length === 1 && cv.includes('download="Saange_Tamang_Academic_CV.pdf"'), 'Expected one current CV preview and download');
assert(!files.some(f => f.endsWith('Saange_Tamang_Research_CV.pdf')), 'Older CV should not be published');
const home = html.get(join(root, 'index.html'));
assert(home.includes('Wireless communications') && home.toLowerCase().includes('machine learning'), 'Missing balanced interests');
assert(home.includes('Electronics, Communication and Information Engineer'), 'Missing engineering identity');
assert(home.includes('Licensed Engineer') && home.includes('Nepal Engineering Council'), 'Missing professional license');
assert(home.toLowerCase().includes('wireless communications') && home.includes('5G/6G') && home.toLowerCase().includes('radio access networks'), 'Missing wireless research interests');
assert(home.toLowerCase().includes('deep learning') && home.toLowerCase().includes('neural networks') && home.toLowerCase().includes('graph neural networks'), 'Missing AI/ML research interests');
assert(home.includes('class="social-link"') && home.includes('linkedin.com/in/saange-tamang') && home.includes('github.com/Sange-creator'), 'Missing icon-led social links');
assert(home.includes('semesters 7–8') && home.includes('Semester 6'), 'Missing corrected project history');
assert(home.includes('Accepted for presentation'), 'Missing research status');
assert(home.includes('First Division') && !home.includes('top of faculty'), 'Unexpected academic claim');
for (const text of ['Kathmandu Model College', 'Secondary Education Examination (SEE)', 'GPA 3.9', '2018', '2019–2021', 'Paschimanchal Campus']) {
  assert(home.includes(text), 'Missing education detail: ' + text);
}
assert((home.match(/class="timeline-entry"/g) || []).length === 3, 'Expected all three education timeline entries');

assert(!home.includes('profile-rail') && !html.get(join(root, 'research/index.html')).includes('profile-rail'), 'Profile rail should not constrict or repeat across pages');
const projectAnchors = ['major-project', 'solvote', 'jamjamnepal', 'computer-networks', 'clipboard-history'];
const projectPositions = projectAnchors.map(id => home.indexOf('href="/projects/#' + id + '"', home.indexOf('class="project-index"')));
assert(projectPositions.every((position, index) => position >= 0 && (index === 0 || position > projectPositions[index - 1])), 'Unexpected homepage project order');
const projectPage = html.get(join(root, 'projects/index.html'));
const detailPositions = projectAnchors.map(id => projectPage.indexOf('id="' + id + '"'));
assert(detailPositions.every((position, index) => position >= 0 && (index === 0 || position > detailPositions[index - 1])), 'Unexpected project detail order');
assert(home.includes('saange-tamang.webp') && home.includes('Portrait of Saange Tamang'), 'Missing supplied portrait');
assert(projectPage.includes('AI integration planned') && projectPage.includes('Wireshark'), 'Missing project status or assignment evidence');
console.log('Checked ' + pages.length + ' pages, ' + checked + ' local links/assets, PDFs, privacy exclusions, and core content.');
