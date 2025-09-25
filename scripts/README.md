# Scripts

Utility scripts to build and serve the StandardTechStack documentation.

## Prerequisites

- Node.js 18+ and pnpm

## Install

```bash
cd StandardTechStack/scripts
pnpm i
```

## Build combined docs (EN/ES)

Concatenates all Markdown files under `../en` and `../es` into `../docs/StandardTechStack-en.md` and `../docs/StandardTechStack-es.md`.

```bash
# TypeScript directly
pnpm run concat

# Or compile then run with Node
pnpm run concat:node
```

Notes:

- Root `README.md` for each language is placed first; remaining files are sorted by depth/name.
- Each source file is separated with a heading and an HTML comment indicating its path.

## Serve documentation

Serves a directory over HTTP with directory listing and Markdown rendered as HTML (via `marked`).

```bash
# Serve the generated docs folder on port 5173
pnpm run serve -- --dir .. --port 5173

# Or build and run with Node
pnpm run serve:node -- --dir .. --port 5173
```

Behavior:

- If a directory contains `README.md`, it is rendered by default at that path.
- Append `?raw=1` to view the raw Markdown instead of rendered HTML.

## Examples (PowerShell)

```powershell
cd StandardTechStack/scripts
pnpm i
pnpm run concat
pnpm run serve -- --dir .. --port 5173
# Open http://localhost:5173/
```


