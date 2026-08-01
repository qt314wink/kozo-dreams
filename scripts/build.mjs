import { cp, mkdir, rm, stat, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(path.join(root, 'index.html'), path.join(dist, 'index.html'));
for (const dir of ['assets', 'data']) {
  try {
    await cp(path.join(root, dir), path.join(dist, dir), { recursive: true });
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}
const buf = await readFile(path.join(dist, 'index.html'));
const info = await stat(path.join(dist, 'index.html'));
await writeFile(path.join(dist, 'build-manifest.json'), JSON.stringify({
  version: '3.2.0',
  builtAt: new Date().toISOString(),
  files: { 'index.html': { bytes: info.size, sha256: createHash('sha256').update(buf).digest('hex') } }
}, null, 2));
console.log(`Built ${dist}`);
