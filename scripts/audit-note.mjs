import { mkdir, writeFile } from 'node:fs/promises';
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
await mkdir('audits', { recursive: true });
const file = `audits/visual-audit-${stamp}.md`;
const body = `# Kozo Dreams visual audit\n\n- Date: ${new Date().toISOString()}\n- Device / browser:\n- Viewport / orientation:\n- Branch / commit:\n\n## First impression\n\n## Flow clarity\n\n## Visual hierarchy and typography\n\n## Interaction behavior\n\n## Motion quality and reduced-motion behavior\n\n## Conversion / completion confidence\n\n## Defects\n\n| Severity | Location | Expected | Observed | Screenshot |\n|---|---|---|---|---|\n| | | | | |\n\n## Keep / change / remove\n`;
await writeFile(file, body);
console.log(file);
