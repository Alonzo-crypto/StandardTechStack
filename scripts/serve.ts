import http from 'http';
import { promises as fs } from 'fs';
import * as fssync from 'fs';
import path from 'path';
import { marked } from 'marked';

type Args = {
  dir?: string;
  port?: number;
};

function parseArgs(argv: string[]): Args {
  const args: Args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--dir' && argv[i + 1]) {
      args.dir = argv[i + 1];
      i += 1;
    } else if (a === '--port' && argv[i + 1]) {
      const p = Number(argv[i + 1]);
      if (!Number.isNaN(p)) args.port = p;
      i += 1;
    }
  }
  return args;
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.js': return 'text/javascript; charset=utf-8';
    case '.mjs': return 'text/javascript; charset=utf-8';
    case '.json': return 'application/json; charset=utf-8';
    case '.md': return 'text/markdown; charset=utf-8';
    case '.txt': return 'text/plain; charset=utf-8';
    case '.svg': return 'image/svg+xml';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    case '.ico': return 'image/x-icon';
    case '.pdf': return 'application/pdf';
    case '.xml': return 'application/xml; charset=utf-8';
    default: return 'application/octet-stream';
  }
}

function safeJoin(rootDir: string, requestPath: string): string | null {
  const decoded = decodeURIComponent(requestPath);
  const normalized = path.normalize(decoded).replace(/^\\+|^\/+/, '');
  const abs = path.join(rootDir, normalized);
  const rel = path.relative(rootDir, abs);
  if (rel.startsWith('..') || path.isAbsolute(rel)) return null;
  return abs;
}

async function serveFile(res: http.ServerResponse, filePath: string): Promise<void> {
  const ctype = getContentType(filePath);
  res.setHeader('Content-Type', ctype);
  // Use stream for large files
  await new Promise<void>((resolve, reject) => {
    const stream = fssync.createReadStream(filePath);
    stream.on('error', reject);
    stream.on('end', () => resolve());
    stream.pipe(res);
  });
}

async function directoryListing(rootDir: string, dirPath: string, urlPath: string): Promise<string> {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const items = entries
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((e) => ({
      name: e.name + (e.isDirectory() ? '/' : ''),
      href: path.posix.join(urlPath.replace(/\\/g, '/'), e.name + (e.isDirectory() ? '/' : '')),
    }));

  const rel = path.relative(rootDir, dirPath).replace(/\\/g, '/') || '.';
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Index of ${rel}</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; padding: 16px; }
      a { text-decoration: none; }
      ul { list-style: none; padding-left: 0; }
      li { margin: 6px 0; }
      .crumbs { margin-bottom: 12px; }
      .crumbs a { color: #0366d6; }
      code, pre { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
    </style>
  </head>
  <body>
    <div class="crumbs">${breadcrumb(urlPath)}</div>
    <h1>Index of ${rel}</h1>
    <ul>
      ${items.map((i) => `<li><a href="${encodeURI(i.href)}">${escapeHtml(i.name)}</a></li>`).join('\n      ')}
    </ul>
  </body>
  </html>`;
}

function breadcrumb(urlPath: string): string {
  const parts = urlPath.replace(/\\/g, '/').split('/').filter(Boolean);
  const crumbs = ['<a href="/">/</a>'];
  let acc = '';
  for (const p of parts) {
    acc += `/${p}`;
    crumbs.push(`<a href="${encodeURI(acc + '/')}">${escapeHtml(p)}</a>`);
  }
  return crumbs.join(' &raquo; ');
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function wrapHtml(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; margin: 0; }
      header { padding: 12px 16px; background: #0f172a; color: #fff; }
      main { padding: 16px; max-width: 960px; margin: 0 auto; }
      pre, code { background: #0b1020; color: #e2e8f0; padding: 2px 4px; border-radius: 4px; }
      pre { padding: 12px; overflow: auto; }
      h1, h2, h3, h4, h5 { margin-top: 1.2em; }
      a { color: #0366d6; }
      table { border-collapse: collapse; }
      th, td { border: 1px solid #cbd5e1; padding: 6px 8px; }
    </style>
  </head>
  <body>
    <header><strong>${escapeHtml(title)}</strong></header>
    <main>
      ${bodyHtml}
    </main>
  </body>
</html>`;
}

async function start(): Promise<void> {
  const argv = parseArgs(process.argv.slice(2));
  const scriptsDir = __dirname;
  const baseDir = path.resolve(scriptsDir, '..');
  const rootDir = path.resolve(scriptsDir, argv.dir ?? '..');
  const port = argv.port ?? 5173;

  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', 'http://localhost');
      const reqPath = url.pathname;
      const raw = url.searchParams.get('raw') === '1';
      const abs = safeJoin(rootDir, reqPath);
      if (!abs) {
        res.statusCode = 403;
        res.end('Forbidden');
        return;
      }

      let stat: fssync.Stats;
      try {
        stat = await fs.stat(abs);
      } catch {
        res.statusCode = 404;
        res.end('Not Found');
        return;
      }

      if (stat.isDirectory()) {
        // Prefer README.md if present (render as HTML)
        const readmeCandidates = ['README.md', 'readme.md', 'Readme.md'];
        for (const name of readmeCandidates) {
          const candidate = path.join(abs, name);
          try {
            const cstat = await fs.stat(candidate);
            if (cstat.isFile()) {
              const md = await fs.readFile(candidate, 'utf8');
              const html = marked.parse(md);
              const titled = wrapHtml(name, String(html));
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(titled);
              return;
            }
          } catch { /* ignore */ }
        }

        // Then try index.html
        const idx = path.join(abs, 'index.html');
        try {
          const idxStat = await fs.stat(idx);
          if (idxStat.isFile()) {
            await serveFile(res, idx);
            return;
          }
        } catch { /* ignore */ }

        // Finally, directory listing
        const html = await directoryListing(baseDir, abs, reqPath.endsWith('/') ? reqPath : reqPath + '/');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
        return;
      }

      if (path.extname(abs).toLowerCase() === '.md' && !raw) {
        const md = await fs.readFile(abs, 'utf8');
        const html = marked.parse(md);
        const titled = wrapHtml(path.basename(abs), String(html));
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(titled);
        return;
      }

      await serveFile(res, abs);
    } catch (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });

  await new Promise<void>((resolve) => server.listen(port, resolve));
  // eslint-disable-next-line no-console
  console.log(`Serving ${rootDir} at http://localhost:${port}`);
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server:', err);
  process.exit(1);
});


