// Dev-only copy mode: injects the on-page copy editor (client.js) and saves its edits into src/locales.
// Never part of `vite build`.
import {readFileSync,writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const LOCALES=fileURLToPath(new URL('../../src/locales/',import.meta.url));
const read=lang=>JSON.parse(readFileSync(`${LOCALES}${lang}.json`,'utf8'));
const get=(pack,key)=>key.split('.').reduce((v,k)=>v?.[k],pack);
function set(pack,key,value){
 const path=key.split('.'),last=path.pop();
 const parent=path.reduce((v,k)=>v[k],pack);
 parent[last]=value;
}
const holes=s=>(s.match(/\{\w+\}/g)||[]).sort().join(' ');
const body=req=>new Promise((resolve,reject)=>{let s='';req.on('data',c=>s+=c);req.on('end',()=>{try{resolve(JSON.parse(s));}catch(e){reject(e);}});});
const send=(res,status,data)=>{res.statusCode=status;res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));};

export default function copyEditor(){
 return {
  name:'copy-editor',
  apply:'serve',
  transformIndexHtml:()=>[{tag:'script',attrs:{type:'module',src:'/scripts/copy-editor/client.js'},injectTo:'body'}],
  configureServer(server){
   server.middlewares.use('/__copy',async(req,res)=>{
    try{
     const langs=['zh','en'];
     if(req.method==='GET')return send(res,200,Object.fromEntries(langs.map(l=>[l,read(l)])));
     if(req.method!=='POST')return send(res,405,{error:'GET or POST'});
     // {key, values:{zh?,en?}, expect:{zh?,en?}}: expect is the text the editor started from, so a stale page cannot overwrite newer copy.
     const {key,values,expect={}}=await body(req);
     const packs=Object.fromEntries(langs.map(l=>[l,read(l)]));
     for(const [lang,value] of Object.entries(values)){
      const live=get(packs[lang],key);
      if(typeof live!=='string')return send(res,400,{error:`${key} 不在 ${lang} 语言包里`});
      if(lang in expect&&expect[lang]!==live)return send(res,409,{error:`${lang} 文案在别处被改过，请刷新页面再改`,live});
      if(holes(live)!==holes(value))return send(res,400,{error:`${lang} 请保留占位符 ${holes(live)}`});
      set(packs[lang],key,value);
     }
     for(const lang of Object.keys(values)){
      writeFileSync(`${LOCALES}${lang}.json`,JSON.stringify(packs[lang],null,1)+'\n');
     }
     // Vite then reloads the page; the editor restores its scroll position and selection.
     send(res,200,{ok:true});
    }catch(e){send(res,500,{error:String(e.message||e)});}
   });
  },
 };
}
