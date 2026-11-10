import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const ssrDir = path.join(rootDir, 'dist-ssr');
const templatePath = path.join(distDir, 'index.html');
const entryPath = path.join(ssrDir, 'entry-server.js');

async function prerender() {
  const { render } = await import(pathToFileURL(entryPath).href);
  const appHtml = render();
  let html = fs.readFileSync(templatePath, 'utf-8');
  const marker = '<div id="root"></div>';

  if (!html.includes(marker)) {
    throw new Error('Could not find <div id="root"></div> marker in dist/index.html');
  }

  // Inline compiled CSS into <head> to eliminate render-blocking stylesheet roundtrip
  const cssLinkMatch = html.match(/<link\s+rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/);
  if (cssLinkMatch) {
    const cssRelPath = cssLinkMatch[1].replace(/^\//, '');
    const cssFullPath = path.join(distDir, cssRelPath);
    if (fs.existsSync(cssFullPath)) {
      const cssContent = fs.readFileSync(cssFullPath, 'utf-8');
      html = html.replace(cssLinkMatch[0], () => `<style>${cssContent}</style>`);
      fs.rmSync(cssFullPath, { force: true });
      console.log(`[prerender] Inlined critical CSS (${(cssContent.length / 1024).toFixed(2)} kB)`);
    }
  }

  html = html.replace(marker, () => `<div id="root" data-ssr="true">${appHtml}</div>`);

  fs.writeFileSync(templatePath, html, 'utf-8');
  fs.rmSync(ssrDir, { recursive: true, force: true });
  console.log('[prerender] Injected static SSG HTML into dist/index.html');
}

prerender().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exit(1);
});
