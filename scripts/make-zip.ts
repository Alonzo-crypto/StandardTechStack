import { promises as fs } from 'fs';
import * as fssync from 'fs';
import * as path from 'path';
import archiver from 'archiver';
import ignore from 'ignore';

async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

async function readGitignore(baseDir: string): Promise<ReturnType<typeof ignore>> {
  const ig = ignore();
  const gitignorePath = path.join(baseDir, '.gitignore');
  try {
    const raw = await fs.readFile(gitignorePath, 'utf8');
    ig.add(raw.split('\n'));
  } catch {
    // ignore if not found
  }
  // Default ignores for packaging
  ig.add([
    'node_modules/',
    '.git/',
    'docs/',
    'build/',
    'releases/',
    'scripts/node_modules/',
    'scripts/dist/',
    '*.log',
    '.DS_Store',
    'Thumbs.db',
  ]);
  return ig;
}

async function listAllFiles(dir: string): Promise<string[]> {
  const out: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await listAllFiles(abs)));
    } else if (entry.isFile()) {
      out.push(abs);
    }
  }
  return out;
}

async function main(): Promise<void> {
  const scriptsDir = __dirname;
  const baseDir = path.resolve(scriptsDir, '..'); // StandardTechStack root

  const ig = await readGitignore(baseDir);

  // Collect files
  const allFiles = await listAllFiles(baseDir);
  const files = allFiles
    .filter((abs) => !abs.includes(path.sep + 'releases' + path.sep))
    .map((abs) => ({ abs, rel: path.relative(baseDir, abs).replace(/\\/g, '/') }))
    .filter(({ rel }) => rel.length > 0 && !ig.ignores(rel));

  // Prepare output
  const releasesDir = path.join(baseDir, 'releases');
  await ensureDir(releasesDir);
  const now = new Date();
  const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const hm = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  const zipPath = path.join(releasesDir, `StandardTechStack-${ymd}-${hm}.zip`);

  // Create archive
  await new Promise<void>((resolve, reject) => {
    const output = fssync.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', () => resolve());
    archive.on('warning', (err) => {
      if ((err as any).code === 'ENOENT') {
        // eslint-disable-next-line no-console
        console.warn(err);
      } else {
        reject(err);
      }
    });
    archive.on('error', (err) => reject(err));
    archive.pipe(output);

    for (const f of files) {
      archive.file(f.abs, { name: f.rel });
    }

    archive.finalize().catch(reject);
  });

  // eslint-disable-next-line no-console
  console.log(`ZIP created at: ${zipPath}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to create ZIP:', err);
  process.exit(1);
});


