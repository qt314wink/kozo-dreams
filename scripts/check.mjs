import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
await access(path.join(root, 'index.html'));
const html = await readFile(path.join(root, 'index.html'), 'utf8');
const failures = [];
if (!/<meta\s+name="viewport"/i.test(html)) failures.push('Missing viewport meta tag');
if (!/<title>[^<]+<\/title>/i.test(html)) failures.push('Missing document title');
if (!/<script[\s>]/i.test(html)) failures.push('Missing runtime script');
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('Kozo Dreams checks passed.');
