import { promises as fs } from 'fs';
import * as path from 'path';

type Lang = 'en' | 'es';

async function ensureDir(dirPath: string): Promise<void> {
  await fs.mkdir(dirPath, { recursive: true });
}

async function listMarkdownFilesRecursive(rootDir: string): Promise<string[]> {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const entryPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      // Skip common non-doc directories if present
      if (['node_modules', '.git', 'build'].includes(entry.name)) continue;
      files.push(...(await listMarkdownFilesRecursive(entryPath)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.md')) {
      files.push(entryPath);
    }
  }
  return files;
}

function sortDocs(filePaths: string[], langDir: string): string[] {
  const rel = (p: string) => path.relative(langDir, p).replace(/\\/g, '/');
  const rootReadme = path.join(langDir, 'README.md');
  const withMeta = filePaths.map((abs) => ({ abs, rel: rel(abs) }));

  // Priority: root README.md first, then other root-level files, then nested files
  withMeta.sort((a, b) => {
    const aIsRootReadme = path.resolve(a.abs) === path.resolve(rootReadme) ? 1 : 0;
    const bIsRootReadme = path.resolve(b.abs) === path.resolve(rootReadme) ? 1 : 0;
    if (aIsRootReadme !== bIsRootReadme) return bIsRootReadme - aIsRootReadme;

    const aDepth = a.rel.split('/').length;
    const bDepth = b.rel.split('/').length;
    if (aDepth !== bDepth) return aDepth - bDepth;

    return a.rel.localeCompare(b.rel);
  });

  return withMeta.map((m) => m.abs);
}

async function concatenateLanguageDocs(lang: Lang, baseDir: string, outDir: string): Promise<string> {
  const langDir = path.join(baseDir, lang);
  const allMd = await listMarkdownFilesRecursive(langDir);
  const sorted = sortDocs(allMd, langDir);

  const outFile = path.join(outDir, `StandardTechStack-${lang}.md`);
  const parts: string[] = [];

  // Top-level title
  const title = lang === 'en' ? '# FIBEX Standard Technology Stack (Combined – English)\n' : '# Stack Tecnológico Estándar de FIBEX (Combinado – Español)\n';
  parts.push(title, '\n');

  for (const absPath of sorted) {
    const relPath = path.relative(baseDir, absPath).replace(/\\/g, '/');
    const content = await fs.readFile(absPath, 'utf8');

    // Separator and per-file heading
    parts.push(`<!-- File: ${relPath} -->\n`);
    parts.push(`## ${relPath}\n`); // Heading with a blank line follows implicitly
    parts.push('\n');
    parts.push(content.trimEnd());
    parts.push('\n\n');
  }

  await fs.writeFile(outFile, parts.join(''), 'utf8');
  return outFile;
}

async function main(): Promise<void> {
  const scriptsDir = __dirname;
  const baseDir = path.resolve(scriptsDir, '..');
  const outDir = path.join(baseDir, 'docs');
  await ensureDir(outDir);

  const [enOut, esOut] = await Promise.all([
    concatenateLanguageDocs('en', baseDir, outDir),
    concatenateLanguageDocs('es', baseDir, outDir),
  ]);

  // eslint-disable-next-line no-console
  console.log(`Combined docs generated:\n- ${enOut}\n- ${esOut}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to concatenate documentation:', err);
  process.exitCode = 1;
});


