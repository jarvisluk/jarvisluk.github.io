// Prerender every route to static HTML after `vite build` + `vite build --ssr src/entry-server.jsx --outDir dist-ssr`.
// Optional: SITE_URL=https://example.com adds canonical / Open Graph URLs and a sitemap.
import {readFileSync,writeFileSync,mkdirSync,rmSync,appendFileSync} from 'node:fs';
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const dist=new URL('../dist/',import.meta.url);
const {render,routes,pageMeta,matchRoute,localize}=await import(new URL('../dist-ssr/entry-server.js',import.meta.url));
const template=readFileSync(new URL('index.html',dist),'utf8');
const site=process.env.SITE_URL?.replace(/\/+$/,'');
const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function page(path,file){
 const {lang,title,description}=pageMeta(path);
 const url=site&&path!=='/404'?site+path:null;
 const {base}=matchRoute(path);
 const alternates=url?[['zh-CN',localize('zh',base)],['en',localize('en',base)],['x-default',localize('zh',base)]].map(([l,p])=>`<link rel="alternate" hreflang="${l}" href="${site}${p}" />`):[];
 const head=[`<meta property="og:type" content="website" />`,`<meta property="og:locale" content="${lang==='zh'?'zh_CN':'en_US'}" />`,`<meta property="og:title" content="${escape(title)}" />`,`<meta property="og:description" content="${escape(description)}" />`,...(url?[`<link rel="canonical" href="${url}" />`,`<meta property="og:url" content="${url}" />`,...alternates]:[])].map(l=>`    ${l}\n`).join('');
 let html=template
  .replace('<html lang="zh-CN">',`<html lang="${lang==='zh'?'zh-CN':'en'}">`)
  .replace(/<title>.*?<\/title>/,`<title>${escape(title)}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/,`$1${escape(description)}`)
  .replace('  </head>',`${head}  </head>`)
  .replace(/\s*<link rel="preload" as="image"[^>]*>/g,'');
 // React emits preload <link>s for fetchPriority="high" images at the start of the markup; move them into <head>.
 const body=render(path),links=body.match(/^(<link[^>]*>)*/)[0];
 html=html.replace('  </head>',links?`    ${links}\n  </head>`:'  </head>').replace('<div id="root"></div>',`<div id="root" data-route="${path}">${body.slice(links.length)}</div>`);
 if(path==='/404')html=html.replace('content="index, follow,','content="noindex, follow,');
 const out=new URL(file,dist);mkdirSync(dirname(fileURLToPath(out)),{recursive:true});writeFileSync(out,html);
 console.log(`prerendered ${path} -> dist/${file}`);
}
for(const path of routes)page(path,`${path.slice(1)}index.html`);
page('/404','404.html');
if(site){
 writeFileSync(new URL('sitemap.xml',dist),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(r=>`  <url><loc>${site}${r}</loc></url>`).join('\n')}\n</urlset>\n`);
 appendFileSync(new URL('robots.txt',dist),`\nSitemap: ${site}/sitemap.xml\n`);
 console.log('wrote dist/sitemap.xml');
}
rmSync(new URL('../dist-ssr/',import.meta.url),{recursive:true,force:true});
