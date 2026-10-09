// Generate the Web Style Visualisation component library (public/embeds/webstyle/library.html) from the running studio.
// Components are lifted from the live DOM (real markup + the studio's own CSS), each wrapped in its ancestors' classes so
// context selectors still apply. Build the studio (jarvisluk/Web_Style_Visualization) and serve it on :4300, then:
//   STUDIO_DIST=<repo>/dist PLAYWRIGHT_NODE_MODULES=<dir containing playwright-core> node scripts/webstyle-demo/library.mjs
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Playwright is not a site dependency; point PLAYWRIGHT_NODE_MODULES at an install (e.g. an npx cache).
const { chromium } = createRequire(path.join(process.env.PLAYWRIGHT_NODE_MODULES || '.', 'x.js'))('playwright-core');

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../public/embeds/webstyle');
const DIST = process.env.STUDIO_DIST;
const URL_ = 'http://localhost:4300/Web_Style_Visualization/?style=liquid-glass';
const cssFile = fs.readdirSync(path.join(DIST, 'assets')).find((f) => f.endsWith('.css'));
// The studio CSS, minus the self-hosted pixel font (only the previewed Retro style uses it).
const cssText = fs.readFileSync(path.join(DIST, 'assets', cssFile), 'utf8').replace(/@font-face\{[^}]*fusion-pixel[^}]*\}/g, '');
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'studio.css'), cssText);

const browser = await chromium.launch({ executablePath: process.env.HOME + '/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, locale: 'en-US' });
await page.goto(URL_);
await page.waitForTimeout(1500);

// outerHTML of the n-th match nested inside shallow copies of its ancestors (marked data-lib-wrap), up to <body>.
const lift = (selector, pick = 0) => page.evaluate(([s, i]) => {
  const el = document.querySelectorAll(s)[i];
  if (!el) return null;
  let html = el.outerHTML;
  for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
    const c = a.cloneNode(false);
    c.removeAttribute('style'); c.removeAttribute('id'); c.setAttribute('data-lib-wrap', '');
    const shell = c.outerHTML; const cut = shell.lastIndexOf('</');
    html = shell.slice(0, cut) + html + shell.slice(cut);
  }
  return html;
}, [selector, pick]);
const raw = (selector, pick = 0) => page.evaluate(([s, i]) => document.querySelectorAll(s)[i]?.outerHTML ?? null, [selector, pick]);
// Inputs keep their live value as an attribute, so the static copy shows the same slider position and colour.
await page.evaluate(() => document.querySelectorAll('input').forEach((i) => i.setAttribute('value', i.value)));

const parts = {};
parts.topbar = (await lift('#topbar'))?.replace(/src="\/Web_Style_Visualization\//g, 'src="https://jarvisluk.github.io/Web_Style_Visualization/');
parts.btnGhost = await raw('.topbar-actions .ui-btn-ghost');
parts.btnSm = await raw('.ins-head .ui-btn-sm');
parts.iconLang = await raw('.topbar-actions .ui-icon-btn', 0);
parts.iconTheme = await raw('.topbar-actions .ui-icon-btn', 1);
parts.iconGit = await raw('.topbar-actions .ui-icon-btn', 2);
parts.chip = await raw('.ins-head .ui-chip');
parts.styleItem = await lift('.style-item', 1);
parts.styleActive = await lift('.style-item.active');
parts.styleCustom = await lift('.style-item-custom');
parts.railHead = await lift('.rail-head');
parts.segmented = await lift('.stage-toolbar .segmented');
parts.url = await lift('.stage-url');
parts.insHead = await lift('.ins-head');
parts.tabs = await lift('.ins-tabs');
parts.special = await lift('.tuning-section-special');
parts.sliderRow = await lift('.tuning-section:not(.tuning-section-special) .tuning-row:has(.tuning-slider)');
parts.colorRow = await lift('.tuning-section:not(.tuning-section-special) .tuning-row:has(.tuning-color-input)');
parts.fontRow = await lift('.tuning-row:has(.tuning-font-select)');
await page.locator('.ins-tab').nth(1).click(); await page.waitForTimeout(400);
parts.btnPrimary = await raw('.ins-pane:not([hidden]) .ui-btn-primary');
parts.codeActions = await lift('.ins-pane:not([hidden]) .ins-actions');
parts.code = await page.evaluate(() => {
  const pre = document.querySelector('.ins-pane:not([hidden]) pre.code-block').cloneNode(true);
  // Keep the opening of the export: the comment, :root and the first six variables.
  const code = pre.querySelector('code'); const keep = []; let lines = 0;
  for (const n of [...code.childNodes]) { keep.push(n); if (n.nodeType === 3 && n.textContent.includes('\n') && ++lines >= 8) break; }
  code.replaceChildren(...keep, document.createTextNode('  …\n}'));
  pre.setAttribute('data-lib-pick', ''); return pre.outerHTML;
});
await page.locator('.ins-tab').nth(2).click(); await page.waitForTimeout(400);
parts.agentStatus = await lift('.ins-pane:not([hidden]) .agent-status');
parts.tools = await page.evaluate(() => { const ul = document.querySelector('.tool-list').cloneNode(true); [...ul.children].slice(3, 6).concat([...ul.children].slice(7)).forEach((li) => li.remove()); return ul.outerHTML; });
parts.agentWay = await lift('.agent-way', 0);
await page.locator('.style-item-custom').click(); await page.waitForTimeout(400);
parts.modal = await page.evaluate(() => document.querySelector('.ui-modal .ui-modal-card')?.outerHTML ?? null);
for (const [k, val] of Object.entries(parts)) console.log(k, val ? val.length : 'MISSING');
await browser.close();

// ---- Static states -------------------------------------------------------------------------------------------
// Every :hover / :active / :focus-visible rule in the studio CSS is duplicated with a class (.is-hover / .is-press /
// .is-focus), so states can sit side by side with the studio's own styling.
const PSEUDO = /:hover|:active|:focus-visible|:focus-within|:focus(?![-\w])/;
const toState = (sel) => sel.replace(/:hover/g, '.is-hover').replace(/:active/g, '.is-press').replace(/:focus-visible|:focus-within|:focus(?![-\w])/g, '.is-focus');
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
      const sels = splitTop(head).filter((x) => PSEUDO.test(x) && !x.includes('::')).map(toState);
      if (sels.length) out += `${sels.join(',')}{${src.slice(open + 1, close)}}`;
    }
    i = close + 1;
  }
  return out;
}
const stateCss = stateRules(cssText);

// ---- Variants (string edits on the lifted markup) -------------------------------------------------------------
const addClass = (html, cls, nth = 0, tag = 'button') => { let n = -1; return html.replace(new RegExp(`<${tag}([^>]*?)class="([^"]*)"`, 'g'), (m, a, c) => (++n === nth ? `<${tag}${a}class="${c} ${cls}"` : m)); };
const hover = (h, nth = 0, tag = 'button') => h && addClass(h, 'is-hover', nth, tag);
const press = (h, nth = 0, tag = 'button') => h && addClass(h, 'is-press', nth, tag);
const focus = (h, nth = 0, tag = 'button') => h && addClass(h, 'is-focus', nth, tag);
const disable = (h) => h && h.replace(/^<button/, '<button disabled');
const unselect = (h) => h && h.replace('style-item active', 'style-item').replace('aria-selected="true"', 'aria-selected="false"');

const L = (en, zh) => `<span data-zh="${zh}">${en}</span>`;
const S = { def: ['Default', '默认'], hover: ['Hover', '悬停'], press: ['Pressed', '按下'], focus: ['Focus', '聚焦'], selected: ['Selected', '选中'], disabled: ['Disabled', '禁用'] };
const s = (label, html, cls = '') => html ? `<figure class="lib-s ${cls}">${html}${label ? `<figcaption>${Array.isArray(label[0]) ? label.map((l) => L(...l)).join(' · ') : L(...label)}</figcaption>` : ''}</figure>` : '';
const tile = (name, cls, body, extra = '') => `<section class="lib-tile ${extra}"><header><h3 data-zh="${name[1]}">${name[0]}</h3><code>${cls}</code></header>${body}</section>`;

// Buttons: variants down, states across.
let buttons = '<div class="lib-bgrid"><span></span>' + [S.def, S.hover, S.press, S.disabled].map((c) => `<em>${L(...c)}</em>`).join('');
for (const [h, label] of [[parts.btnPrimary, ['Primary', '主要']], [parts.btnGhost, ['Ghost', '幽灵']], [parts.btnSm, ['Small', '小号']]]) if (h) buttons += `<em>${L(...label)}</em>${h}${hover(h)}${press(h)}${disable(h)}`;
buttons += '</div>';
const icons = `<div class="lib-row">${s(S.def, parts.iconLang)}${s(S.hover, hover(parts.iconLang))}${s(S.focus, focus(parts.iconLang))}<i class="lib-sep"></i>${s(S.def, parts.iconTheme)}${s(S.def, parts.iconGit?.replace(/href="[^"]*"/, ''))}${s(S.hover, hover(parts.iconGit?.replace(/href="[^"]*"/, ''), 0, 'a'))}</div>`;
const chipOf = (text, accent) => parts.chip?.replace(/>[^<]*<\/span>$/, `>${text}</span>`).replace('class="ui-chip"', `class="ui-chip${accent ? ' ui-chip-accent' : ''}"`);
const chips = `<div class="lib-row">${s(['Category', '分类'], parts.chip)}${s(['Read-only', '只读'], chipOf('read-only'))}${s(['Count', '计数'], chipOf('8'))}${s(['Accent', '强调'], chipOf('modified', true))}</div>`;
const items = `<div class="lib-col lib-rail">${s(S.def, unselect(parts.styleItem))}${s(S.hover, hover(unselect(parts.styleItem)))}${s(S.selected, parts.styleActive)}${s(['Custom', '自定义'], parts.styleCustom)}</div>`;
const segs = `<div class="lib-col">${s(S.selected, parts.segmented)}${s([S.hover, ['Tablet', '平板']], hover(parts.segmented, 1))}</div>`;
const tabs = `<div class="lib-col">${s(S.selected, parts.tabs)}${s([S.hover, ['Code', '代码']], hover(parts.tabs, 1))}${s([S.focus, ['Agent', 'Agent']], focus(parts.tabs, 2))}</div>`;
const rows = `<div class="lib-col lib-pane">${s(['Slider', '滑块'], parts.sliderRow)}${s(['Colour', '取色'], parts.colorRow)}${s(['Font', '字体'], parts.fontRow)}</div>`;

const zh = (en, zhText) => `data-zh="${zhText}">${en}`;
const library = `<!doctype html>
<html lang="en" data-ui-theme="light">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="./studio.css">
<style>${stateCss}</style>
<style>
 html,body{height:auto;overflow:visible;margin:0;background:var(--ui-bg)}
 body{font-family:var(--ui-font);color:var(--ui-text);padding:24px 24px 36px;box-sizing:border-box;-webkit-font-smoothing:antialiased}
 .lib{max-width:1160px;margin:0 auto}
 .lib-top{display:flex;justify-content:space-between;align-items:center;gap:16px;margin:0 0 18px}
 .lib-top p{margin:0;font-size:12px;color:var(--ui-text-3)}
 .lib-board{columns:3 330px;column-gap:28px;column-rule:1px solid var(--ui-border);border-bottom:1px solid var(--ui-border)}
 .lib-tile{break-inside:avoid;margin:0;border-top:1px solid var(--ui-border);padding:16px 0 20px;display:flex;flex-direction:column;gap:12px;overflow:hidden}
 .lib-tile.is-wide{column-span:all}
 .lib-tile>header{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
 .lib-tile>header h3{margin:0;font-size:12px;font-weight:600}
 .lib-tile>header code{font-family:var(--ui-mono);font-size:10px;color:var(--ui-text-3)}
 .lib-s{margin:0;display:flex;flex-direction:column;gap:6px;min-width:0}
 .lib-s figcaption{font-family:var(--ui-mono);font-size:9.5px;color:var(--ui-text-3);letter-spacing:.02em}
 .lib-row{display:flex;flex-wrap:wrap;gap:12px 14px;align-items:flex-start}
 .lib-col{display:grid;gap:12px}
 .lib-sep{width:1px;align-self:stretch;background:var(--ui-border)}
 .lib-bgrid{display:grid;grid-template-columns:auto repeat(4,auto);gap:8px 10px;align-items:center;justify-content:start}
 .lib-bgrid em{font-style:normal;font-family:var(--ui-mono);font-size:9.5px;color:var(--ui-text-3)}
 /* Lifted ancestors only carry classes for context selectors; their layout is neutralised. */
 .lib-s [data-lib-wrap]{display:block!important;height:auto!important;min-height:0!important;max-height:none!important;position:static!important;overflow:visible!important;width:auto!important;padding:0!important;margin:0!important;border:0!important;background:none!important;box-shadow:none!important;grid-template:none!important;transform:none!important}
 .lib-pane,.lib-rail{background:var(--ui-panel);border:1px solid var(--ui-border);border-radius:12px;padding:14px}
 .lib-rail .lib-s .style-item{width:100%}
 .lib-s .topbar{position:static;border:1px solid var(--ui-border);border-radius:12px}
 .lib-s .ins-head,.lib-s .ins-tabs{background:var(--ui-panel)}
 .lib-s .ui-modal-card{position:static;transform:none;margin:0;max-width:100%;box-shadow:var(--ui-shadow)}
 .lib-s pre.code-block{margin:0}
 .lib-s .tool-list{margin:0}
 .theme-switch{flex:none}
 @media(max-width:560px){body{padding:16px 12px 28px}.lib-board{columns:1}.lib-bgrid{grid-template-columns:auto repeat(2,auto)}.lib-bgrid>:nth-child(5n+4),.lib-bgrid>:nth-child(5n+5){display:none}}
</style></head><body><div class="lib">
<div class="lib-top"><p data-zh="组件直接取自 Web Style Visualisation 的工作台界面，使用原版 CSS；状态由原版的 :hover / :active / :focus 规则生成。">Components lifted from the Web Style Visualisation studio with its original CSS. States are generated from its own :hover / :active / :focus rules.</p>
<div class="segmented theme-switch" role="radiogroup"><button type="button" role="radio" aria-checked="true" data-theme="light" ${zh('Light', '浅色')}</button><button type="button" role="radio" aria-checked="false" data-theme="dark" ${zh('Dark', '深色')}</button></div></div>
<div class="lib-board">
${tile(['Top bar', '顶栏'], '.topbar', s(null, parts.topbar), 'is-wide')}
${tile(['Button', '按钮'], '.ui-btn', buttons, 'is-wide')}
${tile(['Style item', '风格条目'], '.style-item', items)}
${tile(['Inspector tabs', '检查器标签'], '.ins-tab', tabs)}
${tile(['Icon button', '图标按钮'], '.ui-icon-btn', icons)}
${tile(['Device switch', '设备切换'], '.segmented', segs)}
${tile(['Signature controls', '专属参数'], '.tuning-section-special', `<div class="lib-col lib-pane">${s(null, parts.special)}</div>`)}
${tile(['Chip', '标签'], '.ui-chip', chips)}
${tile(['Tuning rows', '调参行'], '.tuning-row', rows)}
${tile(['Inspector header', '检查器头部'], '.ins-head', s(null, parts.insHead))}
${tile(['Canvas address', '画布地址'], '.stage-url', s(null, parts.url))}
${tile(['Export', '导出'], '.ins-actions · .code-block', `<div class="lib-col lib-pane">${s(null, parts.codeActions)}${s(null, parts.code)}</div>`)}
${tile(['WebMCP tools', 'WebMCP 工具'], '.agent-status · .tool-list', `<div class="lib-col lib-pane">${s(null, parts.agentStatus)}${s(null, parts.tools)}${s(null, parts.agentWay)}</div>`)}
${tile(['Custom CSS dialog', '自定义 CSS 对话框'], '.ui-modal-card', s(null, parts.modal))}
</div></div><script>
const zh=new URLSearchParams(location.search).get('lang')==='zh';
document.querySelectorAll('[data-zh]').forEach(e=>{if(zh)e.textContent=e.dataset.zh});
document.documentElement.lang=zh?'zh-CN':'en';
// Inside the portfolio the section text already introduces the sheet.
if(window.parent!==window)document.querySelector('.lib-top p').textContent='';
// Light / dark: the studio's own --ui-* tokens switch on html[data-ui-theme].
document.querySelector('.theme-switch').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 document.documentElement.dataset.uiTheme=b.dataset.theme;b.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-checked',x===b))});
// The lifted controls are a specimen: tabs and segments toggle, nothing else acts.
document.addEventListener('click',e=>{
 const seg=e.target.closest('.lib-s .segmented button');
 if(seg){seg.parentElement.querySelectorAll('button').forEach(x=>x.setAttribute('aria-checked',x===seg));return}
 const tab=e.target.closest('.lib-s .ins-tab');
 if(tab){tab.parentElement.querySelectorAll('.ins-tab').forEach(x=>x.setAttribute('aria-selected',x===tab));return}
 if(e.target.closest('input,select,textarea'))return;
 if(e.target.closest('button,a'))e.preventDefault();
});
// Report height so the portfolio can size the iframe.
const post=()=>parent.postMessage({type:'gocus-embed-height',page:'webstyle-library',height:Math.ceil(document.body.getBoundingClientRect().height)},'*');
new ResizeObserver(post).observe(document.body);addEventListener('load',post);
</script></body></html>`;
fs.writeFileSync(path.join(OUT, 'library.html'), library);
console.log('wrote library.html', library.length, 'studio.css', cssText.length);
