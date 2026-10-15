// Dump every string in the language packs (src/locales), in page order, for copy review.
// Usage: node scripts/export-copy.mjs > copy.json
import {locales,languages} from '../src/i18n.js';
import {projects} from '../src/data.js';
const names=Object.fromEntries(projects.map(p=>[p.id,p.name]));
const sheetOf=key=>{
 const [ns,id]=key.split('.');
 if(ns==='ui'||ns==='categories')return '全站界面';
 if(ns==='lab')return '小尝试 Lab';
 if(ns==='projects'||ns==='studies')return names[id]??id;
 if(ns==='drafts')return '未上线草稿';
 return ns;
};
const get=(pack,key)=>key.split('.').reduce((v,k)=>v?.[k],pack);
const flat=(v,prefix,out)=>{
 if(typeof v==='string'){out.push(prefix);return out;}
 for(const [k,x] of Object.entries(v))flat(x,prefix?`${prefix}.${k}`:k,out);
 return out;
};
const rows=flat(locales[languages[0]],'',[]).map(key=>({sheet:sheetOf(key),key,...Object.fromEntries(languages.map(lang=>[lang,get(locales[lang],key)]))}));
// Group by sheet in first-seen order, so a project's info sits right before its case study.
const order=[...new Set(rows.map(r=>r.sheet))];
rows.sort((a,b)=>order.indexOf(a.sheet)-order.indexOf(b.sheet));
console.log(JSON.stringify(rows));
