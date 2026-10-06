// Generate the Gocus component library and design guidelines pages from the built demo panel.
// Components are lifted from the running panel (real markup + the panel's own CSS), each wrapped in its ancestors'
// classes so context selectors still apply. Run while the portfolio dev server serves public/ on :5199:
//   PLAYWRIGHT_NODE_MODULES=<dir containing playwright> node scripts/gocus-demo/library.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Playwright is not a site dependency; point PLAYWRIGHT_NODE_MODULES at an install (e.g. an npx cache).
const { chromium } = createRequire(path.join(process.env.PLAYWRIGHT_NODE_MODULES || '.', 'x.js'))('playwright');

const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public/embeds/gocus/panel');
const URL_ = 'http://localhost:5199/embeds/gocus/panel/index.html';
const css = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8').match(/href="(\.\/assets\/index-[^"]+\.css)"/)[1];
const data = JSON.parse(fs.readFileSync(path.join(DIR, 'demo-data.json'), 'utf8'));
const branchColors = [...new Set(data.allCommits.map((c) => c.branchColor).filter(Boolean))].slice(0, 8);

const browser = await chromium.launch({ executablePath: process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell' });
const page = await browser.newPage({ viewport: { width: 342, height: 760 } });
await page.goto(URL_);
await page.waitForTimeout(2000);

// outerHTML of el nested inside shallow copies of its ancestors (marked data-lib-wrap), up to #root.
const lift = (selector, pick = 0) => page.evaluate(([s, i]) => {
  const el = typeof s === 'string' ? document.querySelectorAll(s)[i] : null;
  if (!el) return null;
  let html = el.outerHTML;
  for (let a = el.parentElement; a && a.id !== 'root' && a !== document.body; a = a.parentElement) {
    const c = a.cloneNode(false);
    const vars = [...(a.style || [])].filter((p) => p.startsWith('--')).map((p) => `${p}:${a.style.getPropertyValue(p)}`).join(';');
    c.removeAttribute('style'); if (vars) c.setAttribute('style', vars);
    c.removeAttribute('id'); c.setAttribute('data-lib-wrap', '');
    const shell = c.outerHTML; const cut = shell.lastIndexOf('</');
    html = shell.slice(0, cut) + html + shell.slice(cut);
  }
  return html;
}, [selector, pick]);

const parts = {};
// Plain outerHTML for context-free ui-* primitives.
const raw = (selector, pick = 0) => page.evaluate(([s, i]) => document.querySelectorAll(s)[i]?.outerHTML ?? null, [selector, pick]);
// Mark the n-th match so lift() can find it again.
const mark = (selector, pick = 0) => page.evaluate(([s, i]) => { document.querySelectorAll('[data-lib-pick]').forEach((e) => e.removeAttribute('data-lib-pick')); const e = document.querySelectorAll(s)[i]; if (e) e.setAttribute('data-lib-pick', ''); return !!e; }, [selector, pick]);
const liftMarked = async (selector, pick = 0) => (await mark(selector, pick)) ? lift('[data-lib-pick]') : null;

parts.header = await lift('header.peek-header');
parts.iconButton = await raw('header .header-actions .icon-button');
parts.worktree = await page.evaluate(() => {
  const el = [...document.querySelectorAll('[class*=worktree]')].find((e) => e.textContent.includes('Current worktree') && e.textContent.length < 80);
  if (!el) return null; el.setAttribute('data-lib-wt', ''); return true;
}) && await lift('[data-lib-wt]');
parts.view = await lift('.commit-view-strip');
parts.pill = await lift('.commit-title-line .ref-pill');
parts.pillSet = await page.evaluate(() => [...new Map([...document.querySelectorAll('.commit-title-line .ref-pill')].map((e) => [e.style.getPropertyValue('--branch-color').trim(), e.textContent.trim()])).entries()].slice(0, 6));
parts.footer = await lift('footer');
await page.locator('button.commit-select').nth(1).click(); await page.waitForTimeout(400);
parts.rowSelected = await page.evaluate(() => { const b = document.querySelector('.commit-select[aria-pressed=true]'); b.closest('.commit-content').setAttribute('data-lib-sel', ''); return true; }) && await lift('[data-lib-sel]');
await page.locator('.commit-actions button').first().click(); await page.waitForTimeout(500);
await page.evaluate(() => document.querySelectorAll('section.ui-dialog input').forEach((i) => i.setAttribute('value', i.value)));
parts.dialog = await lift('section.ui-dialog');
parts.buttonPrimary = await raw('section.ui-dialog .ui-button.primary');
parts.buttonSecondary = await raw('section.ui-dialog .ui-dialog-actions .ui-button:not(.primary)');
parts.input = await raw('section.ui-dialog .ui-input');
await page.keyboard.press('Escape'); await page.waitForTimeout(300);
await page.click('button.commit-search-toggle'); await page.keyboard.type('release'); await page.waitForTimeout(500);
await page.evaluate(() => document.querySelectorAll('.commit-search input').forEach((i) => i.setAttribute('value', i.value)));
parts.search = await lift('.commit-search');
await page.keyboard.press('Escape'); await page.keyboard.press('Escape'); await page.waitForTimeout(300);
await page.click('button.branch-view-trigger'); await page.waitForTimeout(400);
await page.evaluate(() => { const m = document.querySelector('#branch-ref-menu'); [...m.querySelectorAll('.branch-ref-menu-row')].slice(5).forEach((r) => r.remove()); [...m.children].filter((c) => !c.querySelector('button') ).forEach((c) => c.remove()); m.querySelectorAll('*').forEach((e) => { e.style.height = ''; e.style.maxHeight = ''; }); m.style.height = ''; });
parts.branchMenu = await lift('#branch-ref-menu');
await page.keyboard.press('Escape'); await page.waitForTimeout(300);
await page.click('button.workspace-open-menu-toggle'); await page.waitForTimeout(400);
await page.evaluate(() => { const m = [...document.querySelectorAll('[role=menu]')].pop(); m.setAttribute('data-lib-apps', ''); [...m.querySelectorAll('.ui-menu-item')].slice(5).forEach((r) => r.remove()); });
parts.appsMenu = await lift('[data-lib-apps]');
await page.keyboard.press('Escape'); await page.waitForTimeout(300);
await page.click('button.footer-settings'); await page.waitForTimeout(500);
parts.uiIconButton = await raw('.settings-page-header .ui-icon-button');
parts.buttonIcon = await raw('.settings-reset');
parts.segmented = await raw('.settings-page .ui-segmented', 0);
parts.segmented2 = await raw('.settings-page .ui-segmented', 1);
parts.disclosure = await raw('.settings-refresh-frame');
parts.disclosureValue = await page.evaluate(() => [...document.querySelectorAll('.settings-page .ui-disclosure-frame')].find((f) => f.querySelector('.ui-disclosure-value')?.textContent.trim())?.outerHTML ?? null);
parts.toggleRow = await liftMarked('.settings-page .settings-row:has(.ui-toggle)');
parts.formSection = await lift('.settings-page .ui-form-section:nth-child(2)');
for (const [k, v] of Object.entries(parts)) console.log(k, v ? (typeof v === 'string' ? v.length : JSON.stringify(v)) : 'MISSING');

// Icons are inline SVG in the lifted markup; images reference ./assets relative to the panel, which also holds these pages.
const shared = `<!doctype html>
<html lang="en" data-theme="dark" data-theme-preset="graphite" data-density="compact" data-graph-style="solid">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="${css}">
<style>
 html,body{background:#121212;margin:0}
 body{font-family:var(--user-font);color:var(--text);padding:28px 24px 40px;box-sizing:border-box}
 .lib{max-width:1080px;margin:0 auto}
 .lib-intro{color:var(--text-muted);font-size:13px;line-height:1.6;margin:0 0 26px;max-width:640px}
 .lib-grid{columns:3 320px;column-gap:32px;column-rule:1px solid var(--border-soft);border-bottom:1px solid var(--border-soft)}
 .lib-card{break-inside:avoid;margin:0;border-top:1px solid var(--border-soft);padding:16px 0 20px;display:flex;flex-direction:column;gap:12px;min-width:0}
 .lib-card.wide{column-span:all}
 .dims{display:flex;flex-wrap:wrap;gap:14px 12px;align-items:flex-end}
 .dims figure{margin:0;display:grid;justify-items:start;gap:4px;min-width:64px}
 .dims i{display:block;border:1px solid var(--border);background:var(--surface-strong);box-sizing:border-box}
 .dims code{font-family:var(--mono-font);font-size:10px;color:var(--text-muted)}
 .dims .v{font-size:10px}
 .lib-card h3{margin:0;font-size:13px;font-weight:700;color:var(--text)}
 .lib-card p{margin:0;font-size:12px;line-height:1.55;color:var(--text-muted)}
 .lib-spec{background:var(--panel-solid);border-radius:12px;padding:10px;width:342px;max-width:100%;box-sizing:border-box;position:relative;overflow:hidden}
 .lib-spec.flush{padding:0}
 :is(.lib-spec,.cv) [data-lib-wrap]{height:auto!important;min-height:0!important;max-height:none!important;position:static!important;overflow:visible!important;transform:none!important;inset:auto!important;width:auto!important;padding:0!important;margin:0!important;border:0!important;background:none!important;box-shadow:none!important;display:block!important;animation:none!important}
 :is(.lib-spec,.cv) :is([role=menu],.ui-dialog,#branch-ref-menu){position:static!important;inset:auto!important;transform:none!important;opacity:1!important;visibility:visible!important;max-height:none!important}
 #branch-ref-menu,#branch-ref-menu *{height:auto;max-height:none!important}
 .lib-spec .peek-header .branch-pill{display:none}
 .lib-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
 .tok{display:grid;grid-template-columns:minmax(0,150px) 48px minmax(0,1fr);gap:12px;align-items:center;padding:5px 0;font-size:12px}
 .tok code{font-family:var(--mono-font);color:var(--text-muted);font-size:11px}
 .tok .v{color:var(--text-faint);font-family:var(--mono-font);font-size:11px}
 .sw{display:grid;grid-template-columns:repeat(auto-fill,minmax(92px,1fr));gap:12px 10px}
 .sw div{font-size:10px;min-width:0}
 .sw i{display:block;height:26px;border-radius:6px;box-shadow:inset 0 0 0 1px var(--border-soft)}
 .sw span{display:block;padding:5px 0 0;color:var(--text-muted);font-family:var(--mono-font);line-height:1.35;overflow-wrap:anywhere}
 .sw b{color:var(--text);font-family:var(--user-font)}
 .sw em{font-style:normal}
 .tok.t{grid-template-columns:minmax(0,120px) 40px minmax(0,1fr);padding:5px 0;border-top:0}
 .tok.t>span:last-child{display:flex;gap:10px;flex-wrap:wrap;align-items:baseline}
 .bar{height:10px;background:var(--main);border-radius:3px}
 .rules{margin:0;padding:0;list-style:none;display:grid;gap:10px}
 .rules li{display:grid;grid-template-columns:22px 1fr;gap:10px;font-size:12.5px;line-height:1.6;color:var(--text)}
 .rules b{color:var(--main);font-family:var(--mono-font);font-weight:600}
 .rules span{color:var(--text-muted)}
 /* Component board */
 .board{columns:3 320px;column-gap:32px;column-rule:1px solid var(--border-soft);border-bottom:1px solid var(--border-soft)}
 .tile{break-inside:avoid;margin:0;border-top:1px solid var(--border-soft);padding:16px 0 20px;display:flex;flex-direction:column;gap:10px;overflow:hidden}
 .tile>header{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
 .tile>header h3{margin:0;font-size:12px;font-weight:700}
 .tile>header code{font-family:var(--mono-font);font-size:10px;color:var(--text-faint)}
 .s{margin:0;display:flex;flex-direction:column;gap:5px;min-width:0}
 .s figcaption{font-family:var(--mono-font);font-size:9.5px;color:var(--text-faint);letter-spacing:.02em}
 .row{display:flex;flex-wrap:wrap;gap:12px 14px;align-items:flex-start}
 .col{display:grid;gap:10px}
 .sep{width:1px;align-self:stretch;background:var(--border-soft)}
 .bgrid{display:grid;grid-template-columns:auto repeat(3,auto);gap:8px 10px;align-items:center;justify-content:start}
 .bgrid em{font-style:normal;font-family:var(--mono-font);font-size:9.5px;color:var(--text-faint)}
 .s.is-menu{align-items:flex-start}
 .s [data-lib-wrap]{height:auto!important;min-height:0!important;max-height:none!important;position:static!important;overflow:visible!important;transform:none!important;inset:auto!important;width:auto!important;padding:0!important;margin:0!important;border:0!important;background:none!important;box-shadow:none!important;display:block!important;animation:none!important}
 .s :is([role=menu],.ui-dialog,#branch-ref-menu){position:static!important;inset:auto!important;transform:none!important;opacity:1!important;visibility:visible!important;max-height:none!important}
 .s .ui-toggle,.s .settings-row{width:100%}
 .tile .ui-dialog{width:100%!important;max-width:100%!important;box-sizing:border-box}
 @media(max-width:520px){.board{columns:1}}
 @media(max-width:520px){body{padding:18px 12px 28px}.tok{grid-template-columns:120px 54px 1fr}}
</style></head><body><div class="lib">`;
const end = (js) => `</div><script>
const zh=new URLSearchParams(location.search).get('lang')==='zh';
document.querySelectorAll('[data-zh]').forEach(e=>{if(zh)e.textContent=e.dataset.zh});
document.documentElement.lang=zh?'zh-CN':'en';
// Inside the portfolio the section text already introduces the sheet.
if(window.parent!==window)document.querySelector('.lib-intro')?.remove();
${js}
// Report height so the portfolio can size the iframe.
const post=()=>parent.postMessage({type:'gocus-embed-height',page:location.pathname.split('/').pop(),height:document.documentElement.scrollHeight},'*');
new ResizeObserver(post).observe(document.body);addEventListener('load',post);
</script></body></html>`;
const card = (en, zh, pen, pzh, body, cls = '') => `<section class="lib-card ${cls}"><h3 data-zh="${zh}">${en}</h3><p data-zh="${pzh}">${pen}</p>${body}</section>`;
const spec = (html, cls = '') => `<div class="lib-spec ${cls}">${html || ''}</div>`;

// ---- Static states -------------------------------------------------------------------------------------------
// Every :hover / :focus* rule in the panel's CSS is duplicated with a class (.is-hover / .is-focus), so each state
// can be shown side by side with the panel's own styling. Gocus defines no :active styles, so there is no pressed state.
const cssText = fs.readFileSync(path.join(DIR, css), 'utf8');
const PSEUDO = /:hover|:focus-visible|:focus-within|:focus(?![-\w])/;
const toState = (sel) => sel.replace(/:hover/g, '.is-hover').replace(/:focus-visible|:focus-within|:focus(?![-\w])/g, '.is-focus');
const splitTop = (str) => { const out = []; let d = 0, cur = ''; for (const ch of str) { if (ch === '(' || ch === '[') d++; if (ch === ')' || ch === ']') d--; if (ch === ',' && !d) { out.push(cur); cur = ''; } else cur += ch; } out.push(cur); return out; };
function stateRules(src) {
  let out = '', i = 0;
  const block = (from) => { let d = 0; for (let j = from; j < src.length; j++) { if (src[j] === '{') d++; else if (src[j] === '}' && --d === 0) return j; } return src.length; };
  while (i < src.length) {
    const open = src.indexOf('{', i); if (open < 0) break;
    const head = src.slice(i, open).trim(), close = block(open);
    if (head.startsWith('@')) {
      if (/^@(media|supports|layer|container)/.test(head)) { const inner = stateRules(src.slice(open + 1, close)); if (inner) out += `${head}{${inner}}`; }
    } else {
      const sels = splitTop(head).filter((x) => PSEUDO.test(x) && !x.includes(':root')).map(toState);
      if (sels.length) out += `${sels.join(',')}{${src.slice(open + 1, close)}}`;
    }
    i = close + 1;
  }
  return out;
}
const stateCss = stateRules(cssText);
const hasRule = (re) => re.test(cssText);

// ---- Variants ------------------------------------------------------------------------------------------------
// v(html, ...mods): parse in the browser, apply {sel, add, rm, attr, unattr, text, keep, del} and serialise.
const v = (html, ...mods) => html && page.evaluate(([h, ms]) => {
  const t = document.createElement('template'); t.innerHTML = h; const root = t.content.firstElementChild;
  const find = (s) => s === ':root' ? [root] : [...(root.matches(s) ? [root] : []), ...root.querySelectorAll(s)];
  for (const m of ms) for (const el of find(m.sel)) {
    if (m.add) el.classList.add(...m.add.split(' '));
    if (m.rm) el.classList.remove(...m.rm.split(' '));
    for (const [k, val] of Object.entries(m.attr || {})) el.setAttribute(k, val);
    for (const k of m.unattr || []) el.removeAttribute(k);
    if (m.text != null) { const tn = [...el.childNodes].filter((n) => n.nodeType === 3).pop(); if (tn) tn.textContent = m.text; else el.textContent = m.text; }
    if (m.style) for (const [k, val] of Object.entries(m.style)) el.style.setProperty(k, val);
    if (m.del) el.remove();
  }
  return root.outerHTML;
}, [html, mods]);

// ---- Sheet ---------------------------------------------------------------------------------------------------
// A compact board of cards: each card is one component (or family) with its states composed side by side,
// labelled with small captions instead of a matrix.
const L = (en, zh) => `<span data-zh="${zh}">${en}</span>`;
const S = { def: ['Default', '默认'], hover: ['Hover', '悬停'], focus: ['Focus', '聚焦'], active: ['Active', '选中'], selected: ['Selected', '选中'], open: ['Open', '展开'], disabled: ['Disabled', '禁用'], off: ['Off', '关'], on: ['On', '开'], empty: ['Empty', '空'], filled: ['Filled', '已输入'] };
const s = (label, html, cls = '') => html ? `<figure class="s ${cls}">${html}${label ? `<figcaption>${Array.isArray(label[0]) ? label.map((l) => L(...l)).join(' · ') : L(...label)}</figcaption>` : ''}</figure>` : '';
const tile = (name, cls, body, extra = '') => `<section class="tile ${extra}"><header><h3 data-zh="${name[1]}">${name[0]}</h3><code>${cls}</code></header>${body}</section>`;
const st = (html, sel, extra = {}) => v(html, { sel, ...extra });
const hover = (h, sel = ':root') => st(h, sel, { add: 'is-hover' });
const focus = (h, sel = ':root') => st(h, sel, { add: 'is-focus' });
const disable = (h, sel = ':root') => st(h, sel, { attr: { disabled: '' } });

// Buttons: variants down, states across.
let buttons = '<div class="bgrid"><span></span>' + [S.def, S.hover, S.disabled].map((c) => `<em>${L(...c)}</em>`).join('');
for (const [h, label] of [[parts.buttonPrimary, ['Primary', '主要']], [parts.buttonSecondary, ['Secondary', '次要']], [parts.buttonIcon, ['Icon', '图标']]]) if (h) buttons += `<em>${L(...label)}</em>${h}${await hover(h)}${await disable(h)}`;
buttons += '</div>';
// Icon buttons
const ib = parts.iconButton, uib = parts.uiIconButton;
const icons = `<div class="row">${s(S.def, uib)}${s(S.hover, uib && await hover(uib))}${s(S.disabled, uib && await disable(uib))}<i class="sep"></i>${s(S.def, ib)}${s(S.hover, ib && await hover(ib))}${s(S.active, ib && await st(ib, ':root', { add: 'is-active', attr: { 'aria-pressed': 'true' } }))}</div>`;
// Segmented
const segPick = (h, i) => v(h, { sel: 'button', rm: 'is-active', attr: { 'aria-pressed': 'false' } }, { sel: `button:nth-child(${i})`, add: 'is-active', attr: { 'aria-pressed': 'true' } });
const seg = parts.segmented, seg2 = parts.segmented2;
const segs = `<div class="row">${s(S.selected, seg && await segPick(seg, 1))}${s(S.hover, seg && await v(await segPick(seg, 1), { sel: 'button:nth-child(2)', add: 'is-hover' }))}${s(S.selected, seg2 && await segPick(seg2, 2))}</div>`;
// Switch
const tog = parts.toggleRow;
const toggles = tog ? `<div class="col">${s(S.off, await v(tog, { sel: 'input', unattr: ['checked'] }))}${s(S.on, await v(tog, { sel: 'input', attr: { checked: '' } }))}</div>` : '';
// View chips
const stripBase = parts.view && await v(parts.view, { sel: '.view-chip', rm: 'is-active', attr: { 'aria-pressed': 'false' } });
const chips = stripBase ? `<div class="col">${s(S.def, stripBase)}${s([S.hover, ['Current', '当前']], await st(stripBase, '.view-chip:nth-child(2)', { add: 'is-hover' }))}${s([S.active, ['Current', '当前']], await st(stripBase, '.view-chip:nth-child(2)', { add: 'is-active', attr: { 'aria-pressed': 'true' } }))}${s([S.open, ['Branch', '分支']], await st(stripBase, '.branch-view-trigger', { add: 'is-open', attr: { 'aria-expanded': 'true' } }))}</div>` : '';
// Inputs
const inp = parts.input, srch = parts.search;
const inputs = `<div class="col">${s(S.empty, inp && await v(inp, { sel: ':root', attr: { value: '', placeholder: 'branch-name' } }))}${s(S.filled, inp && await v(inp, { sel: ':root', attr: { value: 'feature/commit-graph' } }))}</div>`;
const search = srch ? `<div class="col">${s(S.empty, await v(srch, { sel: 'input', attr: { value: '' } }))}${s(S.filled, srch)}${s(S.focus, await focus(srch, '.commit-search'))}</div>` : '';
// Disclosure
const d1 = parts.disclosure, d2 = parts.disclosureValue;
const disclosure = `<div class="col">${s(S.def, d1)}${s(S.hover, d1 && await hover(d1, '.ui-disclosure-button'))}${s([S.def, ['With count', '带计数']], d2)}</div>`;
// Pills
let pills = '<div class="row">';
for (const [color, text] of parts.pillSet || []) pills += s([color, color], await v(parts.pill, { sel: '.ref-pill', style: { '--branch-color': color }, text }));
const branchPill = (parts.header || '').match(/<span class="branch-pill"[\s\S]*?<\/span>/)?.[0];
pills += s(['Branch pill', '分支标签'], branchPill) + '</div>';
// Commit rows: one commit, three states.
const row = parts.rowSelected && await v(parts.rowSelected, { sel: '.is-selected', rm: 'is-selected' }, { sel: '.commit-select', attr: { 'aria-pressed': 'false' } }, { sel: '.commit-actions', del: true });
const rows = row ? `<div class="col">${s(S.def, row)}${s(S.hover, await hover(row, '.commit-row'))}${s(S.selected, parts.rowSelected)}</div>` : '';
// Menus: states composed inside one real menu.
const apps = parts.appsMenu && await hover(parts.appsMenu, '.ui-menu-item:nth-child(3)');
const branches = parts.branchMenu && await v(parts.branchMenu, { sel: '.branch-ref-menu-row:nth-child(2) .ui-menu-item', add: 'is-hover' }, { sel: '.branch-ref-menu-row:nth-child(3) .branch-switch-button', add: 'is-hover' });

const library = shared + `<style>${stateCss}</style>
<p class="lib-intro" data-zh="这些组件直接取自 Gocus 0.1.12 的界面，使用原版 CSS；状态由原版的 :hover / :focus 规则生成。">Components lifted from the Gocus 0.1.12 interface with its original CSS. States are generated from the interface’s own :hover and :focus rules.</p>
<div class="board">
${tile(['Button', '按钮'], '.ui-button', buttons)}
${tile(['Commit row', '提交行'], '.commit-row', rows)}
${tile(['Open-in menu', '打开方式菜单'], '.ui-menu-item', s([[...S.active, ], ['Hover · row 3', '悬停 · 第 3 项']], apps, 'is-menu'))}
${tile(['Icon button', '图标按钮'], '.ui-icon-button · .icon-button', icons)}
${tile(['View chips', '视图切换'], '.view-chip', chips)}
${tile(['Branch menu', '分支菜单'], '.branch-ref-menu', s([S.hover, ['Switch hover', '切换按钮悬停']], branches, 'is-menu'))}
${tile(['Segmented control', '分段控件'], '.ui-segmented', segs)}
${tile(['Search field', '搜索框'], '.commit-search', search)}
${tile(['Confirmation dialog', '确认对话框'], '.ui-dialog', s(null, parts.dialog))}
${tile(['Ref pill', '引用标签'], '.ref-pill · .branch-pill', pills)}
${tile(['Disclosure', '展开项'], '.ui-disclosure-frame', disclosure)}
${tile(['Worktree card', '工作树卡片'], '.worktree-trigger', s(null, parts.worktree))}
${tile(['Switch', '开关'], '.ui-toggle', toggles)}
${tile(['Text field', '文本框'], '.ui-input', inputs)}
${tile(['Panel header', '面板头部'], '.peek-header', s(null, parts.header), 'is-flush')}
${tile(['Footer', '页脚'], '.peek-footer', s(null, parts.footer), 'is-flush')}
${tile(['Settings section', '设置分组'], '.ui-form-section', s(null, parts.formSection))}
</div>` + end(`
document.addEventListener('click',e=>{
 const seg=e.target.closest('.ui-segmented button');
 if(seg){const g=seg.closest('.ui-segmented');g.querySelectorAll('button').forEach(b=>{const on=b===seg;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',on)});return}
 const chip=e.target.closest('.commit-view-strip .view-chip');
 if(chip){chip.closest('.commit-view-strip').querySelectorAll('.view-chip').forEach(b=>{const on=b===chip;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',on)});e.preventDefault();return}
 if(e.target.closest('input'))return;
 if(e.target.closest('button,a'))e.preventDefault();
});
`);

const typeRows = [
  ['Display', '展示', '--type-display-size', 'Empty-state headings only', '只用于空状态标题'],
  ['Page title', '页面标题', '--type-page-title-size', 'App header or top-level page', '应用头部或顶层页面'],
  ['Heading 1', '一级标题', '--type-heading-1-size', 'Primary panel headings', '主要面板标题'],
  ['Heading 2', '二级标题', '--type-heading-2-size', 'Cards, dialogs, item titles', '卡片、对话框、条目标题'],
  ['Body strong', '强调正文', '--type-body-strong-size', 'Stats and selected metadata', '统计数字、选中项信息'],
  ['Body', '正文', '--type-body-size', 'Normal copy, hashes, small controls', '常规文字、哈希、小控件'],
  ['Caption', '说明', '--type-caption-size', 'Helper text, timestamps', '辅助说明、时间'],
  ['Micro', '微型', '--type-micro-size', 'Graph labels, tiny badges', '提交图标注、小徽标'],
];
const colors = [
  ['--stage-bg', 'Stage', '舞台'], ['--panel-solid', 'Panel', '面板'], ['--surface-strong', 'Surface', '表面'], ['--surface-hover', 'Hover', '悬停'],
  ['--text', 'Text', '文字'], ['--text-muted', 'Muted', '次要'], ['--text-faint', 'Faint', '弱化'],
  ['--main', 'Main', '主色'], ['--success', 'Additions', '新增'], ['--danger', 'Deletions', '删除'],
];
const guidelines = shared + `
<p class="lib-intro" data-zh="Gocus 是一个紧凑的工具面板，应该读起来像一条窄的桌面工具，而不是一张大的内容页。下面的数值都从界面实际使用的 CSS token 读取。">Gocus is a compact utility surface: it should read like a narrow desktop tool, not a large content page. Every value below is read from the CSS tokens the interface uses.</p>
<div class="lib-grid">
${card('Type scale', '字号层级', 'Semantic roles over a compact 10–20px scale. Raw px sizes are not allowed in UI rules.', '在 10–20px 的紧凑字号上分出语义角色；界面样式里不允许直接写 px 字号', `<div>${typeRows.map(([en, zh, v, uen, uzh]) => `<div class="tok t"><span style="font-size:var(${v});font-weight:${v.includes('strong') || v.includes('heading') || v.includes('title') || v.includes('display') ? 720 : 560}" data-zh="${zh}">${en}</span><span class="v" data-var="${v}"></span><span><code>${v}</code><span style="color:var(--text-faint);font-size:11px" data-zh="${uzh}">${uen}</span></span></div>`).join('')}</div>`, 'wide')}
${card('Colour', '颜色', 'A graphite dark theme with one amber accent; green and red only for additions and deletions.', '石墨色的深色主题，只有一个琥珀色强调色；绿色和红色只用于增删行数', `<div class="sw">${colors.map(([v, en, zh]) => `<div><i style="background:var(${v})"></i><span><b data-zh="${zh}">${en}</b> <em class="v" data-var="${v}"></em><br>${v}</span></div>`).join('')}</div>`, 'wide')}
${card('Branch lanes', '分支轨道', 'Lane colours from the recorded repository graph; ref pills reuse them.', '录制仓库提交图里的轨道颜色，引用标签沿用同一种颜色', `<div class="sw">${branchColors.map((c) => `<div><i style="background:${c}"></i><span>${c}</span></div>`).join('')}</div>`)}
${card('Spacing', '间距', 'Eight steps from 2 to 16px.', '从 2px 到 16px，共八级', ['--space-xxs', '--space-xs', '--space-sm', '--space-md', '--space-lg', '--space-xl', '--space-2xl', '--space-3xl'].map((v) => `<div class="tok"><code>${v}</code><span class="v" data-var="${v}"></span><div class="bar" style="width:calc(var(${v}) * 5);max-width:100%"></div></div>`).join(''))}
${card('Radius & size', '圆角与尺寸', 'Corners follow the native macOS window; controls stay between 26 and 34px.', '圆角跟随 macOS 原生窗口；控件高度保持在 26–34px 之间', `<div class="dims">${['--radius-sm', '--radius-md', '--radius-lg', '--window-radius'].map((v) => `<figure><i style="width:40px;height:40px;border-radius:var(${v})"></i><code>${v.replace('--', '')}</code><span class="v" data-var="${v}"></span></figure>`).join('')}</div><div class="dims">${['--control-sm', '--control-md', '--control-lg', '--control-xl', '--menu-row-height', '--footer-height', '--panel-header-height'].map((v) => `<figure><i style="width:40px;height:var(${v});border-radius:var(--radius-md)"></i><code>${v.replace('--', '').replace('-height', '')}</code><span class="v" data-var="${v}"></span></figure>`).join('')}</div>`)}
</div>` + end(`
const cs=getComputedStyle(document.documentElement);
const resolve=v=>{const p=document.createElement('div');p.style.cssText='position:absolute;visibility:hidden;width:var('+v+');color:var('+v+')';document.body.appendChild(p);const s=getComputedStyle(p);const isColor=/^#|rgb|hsl|color-mix/.test(cs.getPropertyValue(v).trim());const out=isColor?s.color:s.width;p.remove();if(isColor){const m=out.match(/[\\d.]+/g).map(Number);return '#'+m.slice(0,3).map(x=>Math.round(x).toString(16).padStart(2,'0')).join('')+(m.length>3&&m[3]<1?' · '+Math.round(m[3]*100)+'%':'')}return out.replace(/\\.\\d+px/,'px')};
document.querySelectorAll('[data-var]').forEach(e=>{e.textContent=resolve(e.dataset.var)});
`);

await browser.close();
fs.writeFileSync(path.join(DIR, 'library.html'), library);
fs.writeFileSync(path.join(DIR, 'guidelines.html'), guidelines);
console.log('wrote library.html', library.length, 'guidelines.html', guidelines.length);
