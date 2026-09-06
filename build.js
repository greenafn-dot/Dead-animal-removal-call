/* build.js — bundles the site into one self-contained HTML file.
   No dependencies: node build.js

   Produces:
     dist/index.html        a complete standalone page, hostable anywhere
     dist/artifact.html     the same page as body-only, for Claude Artifacts

   The source stays multi-file; this only inlines it. */

const fs = require('fs');
const path = require('path');

const root = __dirname;
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

let html = read('index.html');

/* Inline the stylesheet. */
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g,
  (_, href) => `<style>\n${read(href)}\n</style>`);

/* Inline every script, in order, preserving it. */
html = html.replace(/<script src="([^"]+)"><\/script>/g,
  (_, src) => `<script>\n${read(src)}\n</script>`);

/* No images/ directory ships in a single file. */
html = html.replace('<body>', '<body>\n<script>window.DAR_PHOTOS = false;</script>');

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/index.html'), html);

/* Artifacts supply their own <!doctype>, <head> and <body>, so strip the
   wrapper and hoist <title> and <style> to the top of the fragment. */
const head = html.match(/<head>([\s\S]*?)<\/head>/)[1];
const body = html.match(/<body>([\s\S]*?)<\/body>/)[1];
const title = head.match(/<title>[\s\S]*?<\/title>/)[0];
const style = head.match(/<style>[\s\S]*?<\/style>/)[0];

fs.writeFileSync(path.join(root, 'dist/artifact.html'),
  `${title}\n${style}\n${body.trim()}\n`);

const kb = (p) => (fs.statSync(path.join(root, p)).size / 1024).toFixed(0) + ' KB';
console.log(`dist/index.html     ${kb('dist/index.html')}  standalone`);
console.log(`dist/artifact.html  ${kb('dist/artifact.html')}  body-only`);
