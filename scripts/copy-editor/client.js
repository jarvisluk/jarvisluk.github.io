// Copy mode (dev only, injected by plugin.mjs): outline every piece of language-pack text on the page,
// edit it in place, and keep a per-key "reviewed" mark. Toggle with Alt+C or the 文案 button.
// Text is matched by value against the packs, so components need no markup.

const LS='copy-editor', SS='copy-editor-resume';
const store={get(k,d){try{return JSON.parse(localStorage.getItem(`${LS}:${k}`))??d;}catch{return d;}},set(k,v){try{localStorage.setItem(`${LS}:${k}`,JSON.stringify(v));}catch{}}};
const CJK=/[一-鿿]/;
const norm=s=>s.replace(/\s+/g,' ').trim();
const lang=()=>document.documentElement.lang.startsWith('zh')?'zh':'en';
const get=(pack,key)=>key.split('.').reduce((v,k)=>v?.[k],pack);

let packs=null, on=false, items=[], current=-1, onlyOpen=false;
let reviewed=store.get('reviewed',{}); // `${lang}:${key}` -> the text that was reviewed; editing it clears the mark

const flat=(v,prefix,out=[])=>{if(typeof v==='string')out.push([prefix,v]);else if(v&&typeof v==='object')for(const [k,x] of Object.entries(v))flat(x,prefix?`${prefix}.${k}`:k,out);return out;};
function buildIndex(){
 const exact=new Map(),patterns=[];
 for(const [key,value] of flat(packs[lang()],'')){
  const v=norm(value);if(!v)continue;
  if(/\{\w+\}/.test(v)){
   const re=new RegExp('^'+v.split(/\{\w+\}/).map(p=>p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('.+?')+'$');
   patterns.push([re,key]);
  }else (exact.get(v)??exact.set(v,[]).get(v)).push(key);
 }
 // Identical text can live under several keys (e.g. "个人项目" on every case page): prefer this page's own.
 const page=location.pathname.match(/\/project\/([^/]+)/)?.[1];
 const rank=k=>page&&(k.startsWith(`studies.${page}.`)||k.startsWith(`projects.${page}.`))?0:k.startsWith('ui.')?1:2;
 for(const keys of exact.values())keys.sort((a,b)=>rank(a)-rank(b));
 return {find(text){const t=norm(text);if(!t)return null;const hit=exact.get(t);if(hit)return hit;const p=patterns.find(([re])=>re.test(t));return p?[p[1]]:null;}};
}
const isReviewed=key=>reviewed[`${lang()}:${key}`]===get(packs[lang()],key);

// ---------- scanning ----------
function scan(){
 const index=buildIndex(),root=document.getElementById('root');
 document.querySelectorAll('[data-ce]').forEach(el=>{el.removeAttribute('data-ce');el.removeAttribute('data-ce-i');});
 items=[];
 const seen=new Set();
 // One entry per key: every element showing that text points to it (visible text wins over alt / aria-label).
 const byKey=new Map();
 const add=it=>{
  const id=it.kind==='miss'?`miss:${norm(it.el.textContent)}`:it.keys[0],had=byKey.get(id);
  if(!had){it.els=it.kind==='attr'?[]:[it.el];byKey.set(id,it);items.push(it);return;}
  if(it.kind!=='attr'){had.els.push(it.el);if(had.kind==='attr'){had.kind='text';had.el=it.el;}}
 };
 const inMatched=el=>{for(let p=el.parentElement;p;p=p.parentElement)if(seen.has(p))return true;return false;};
 for(const el of root.querySelectorAll('*')){
  if(el.closest('script,style,iframe,.ce-panel'))continue;
  const own=[...el.childNodes].filter(n=>n.nodeType===3&&n.data.trim());
  if(own.length){
   let keys=index.find(el.textContent);
   if(!keys)for(const n of own){keys=index.find(n.data);if(keys)break;}
   if(keys){add({el,keys,kind:'text'});seen.add(el);}
   else if(lang()==='zh'&&own.some(n=>CJK.test(n.data))&&!inMatched(el))add({el,keys:[],kind:'miss'});
  }
  for(const attr of ['alt','aria-label','title']){
   const v=el.getAttribute(attr);if(!v)continue;
   const keys=index.find(v);
   if(keys&&!seen.has(el))add({el,keys,kind:'attr',attr});
  }
 }
 items.forEach((it,i)=>it.els.forEach(el=>{
  el.setAttribute('data-ce',it.kind==='miss'?'miss':isReviewed(it.keys[0])?'done':'todo');
  el.setAttribute('data-ce-i',i);
 }));
 renderList();
}

// ---------- panel ----------
const css=`
html.ce-on [data-ce]{outline:1px dashed #2f6fdb;outline-offset:2px;cursor:pointer}
html.ce-on [data-ce=done]{outline:1px solid #2e9e5b}
html.ce-on [data-ce=miss]{outline:1px dashed #d9452b;cursor:help}
html.ce-on [data-ce].ce-current{outline:2px solid #2f6fdb;outline-offset:3px;background:#2f6fdb14}
html.ce-on [data-ce]:hover{background:#2f6fdb10}
.ce-toggle{position:fixed;left:14px;bottom:14px;z-index:2147483646;font:500 12px/1 -apple-system,'PingFang SC',sans-serif;padding:9px 12px;border-radius:999px;background:#182f28;color:#fff;border:0;cursor:pointer;opacity:.75;box-shadow:0 2px 10px #0003}
.ce-toggle:hover,html.ce-on .ce-toggle{opacity:1}
.ce-panel{position:fixed;right:14px;top:14px;bottom:14px;width:min(380px,calc(100vw - 28px));z-index:2147483647;background:#fff;color:#1b1f1d;border-radius:12px;box-shadow:0 8px 40px #0003;display:none;flex-direction:column;font:13px/1.55 -apple-system,'PingFang SC',sans-serif;overflow:hidden}
html.ce-on .ce-panel{display:flex}
.ce-panel *{box-sizing:border-box;font:inherit}
.ce-head{display:flex;align-items:center;gap:8px;padding:12px 14px;border-bottom:1px solid #e6e8e4;background:#f6f7f3}
.ce-head b{font-weight:600}.ce-head span{color:#69716c;font-size:12px;flex:1}
.ce-btn{border:1px solid #d5d9d3;background:#fff;border-radius:7px;padding:5px 9px;cursor:pointer;color:#1b1f1d;white-space:nowrap}
.ce-btn:hover{background:#f1f3ef}.ce-btn.primary{background:#182f28;border-color:#182f28;color:#fff}.ce-btn:disabled{opacity:.4;cursor:default}
.ce-edit{padding:12px 14px;border-bottom:1px solid #e6e8e4;display:none;flex-direction:column;gap:8px}
.ce-edit.show{display:flex}
.ce-key{font:11px/1.4 ui-monospace,Menlo,monospace;color:#69716c;word-break:break-all}
.ce-edit label{font-size:11px;color:#69716c;display:flex;justify-content:space-between}
.ce-edit textarea{width:100%;min-height:64px;resize:vertical;border:1px solid #d5d9d3;border-radius:7px;padding:7px 8px;line-height:1.6;color:#1b1f1d;background:#fff}
.ce-edit textarea:focus{outline:2px solid #2f6fdb55;border-color:#2f6fdb}
.ce-row{display:flex;gap:6px;align-items:center;flex-wrap:wrap}.ce-row .grow{flex:1}
.ce-msg{font-size:12px;color:#69716c}.ce-msg.err{color:#c2381e}
.ce-list{overflow:auto;flex:1;padding:6px 0}
.ce-item{display:flex;gap:8px;padding:6px 14px;cursor:pointer;align-items:flex-start}
.ce-item:hover{background:#f6f7f3}.ce-item.cur{background:#eaf1fd}
.ce-dot{flex:none;width:8px;height:8px;border-radius:50%;margin-top:6px;border:1.5px solid #2f6fdb}
.ce-item.done .ce-dot{background:#2e9e5b;border-color:#2e9e5b}.ce-item.miss .ce-dot{border-color:#d9452b;border-style:dashed}
.ce-item p{margin:0;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
.ce-item small{display:block;color:#8a918c;font-size:11px}
`;
const panel=document.createElement('aside');panel.className='ce-panel';panel.setAttribute('data-copy-editor','');
panel.innerHTML=`<div class="ce-head"><b>文案核对</b><span class="ce-stats"></span><button class="ce-btn ce-filter">只看未核对</button><button class="ce-btn ce-close" title="Alt+C">关闭</button></div>
<div class="ce-edit"><div class="ce-key"></div>
<label>中文<span class="ce-hint-zh"></span></label><textarea class="ce-zh" lang="zh-CN"></textarea>
<label>English<span class="ce-hint-en"></span></label><textarea class="ce-en" lang="en"></textarea>
<div class="ce-row"><button class="ce-btn ce-prev" title="Alt+↑">↑ 上一条</button><button class="ce-btn ce-next" title="Alt+↓">下一条 ↓</button><span class="grow"></span><button class="ce-btn ce-mark" title="Alt+Enter">标为已核对</button><button class="ce-btn primary ce-save" title="⌘/Ctrl+Enter">保存</button></div>
<div class="ce-msg"></div></div><div class="ce-list"></div>`;
const toggleBtn=document.createElement('button');toggleBtn.className='ce-toggle';toggleBtn.textContent='文案';toggleBtn.title='文案核对模式（Alt+C）';
const $=s=>panel.querySelector(s);

function visible(){return items.filter(it=>!onlyOpen||(it.kind!=='miss'&&!isReviewed(it.keys[0])));}
function renderList(){
 const list=visible(),texts=items.filter(i=>i.kind!=='miss'),done=texts.filter(i=>isReviewed(i.keys[0])).length,miss=items.length-texts.length;
 $('.ce-stats').textContent=`本页 ${texts.length} 条 · 已核对 ${done}${miss?` · 未收录 ${miss}`:''}`;
 $('.ce-filter').textContent=onlyOpen?'显示全部':'只看未核对';
 $('.ce-list').innerHTML='';
 for(const it of list){
  const i=items.indexOf(it),row=document.createElement('div');
  row.className=`ce-item ${it.kind==='miss'?'miss':isReviewed(it.keys[0])?'done':''} ${i===current?'cur':''}`;
  const text=it.kind==='miss'?norm(it.el.textContent):get(packs[lang()],it.keys[0]);
  const where=it.kind==='miss'?'不在语言包里（写在代码或数据里）':it.kind==='attr'?`${it.attr==='alt'?'图片描述':'读屏文字'} · ${it.keys[0]}`:it.keys[0];
  row.innerHTML='<i class="ce-dot"></i><div><p></p><small></small></div>';
  row.querySelector('p').textContent=text;row.querySelector('small').textContent=where;
  row.onclick=()=>select(i,true);
  $('.ce-list').append(row);
  if(i===current)row.scrollIntoView({block:'nearest'});
 }
}
function select(i,scroll){
 current=i;const it=items[i];
 document.querySelectorAll('.ce-current').forEach(e=>e.classList.remove('ce-current'));
 if(!it){$('.ce-edit').classList.remove('show');renderList();return;}
 it.els.forEach(el=>el.classList.add('ce-current'));
 if(scroll)it.el.scrollIntoView({block:'center',behavior:'smooth'});
 const edit=$('.ce-edit');edit.classList.add('show');
 const miss=it.kind==='miss';
 $('.ce-key').textContent=miss?'这段文字不在语言包里，需要在代码或数据文件里改':it.keys.join('  ·  ')+(it.keys.length>1?'（同一段文字用在多处，会一起改第一条）':'');
 for(const l of ['zh','en']){
  const ta=$(`.ce-${l}`);ta.value=miss?'':get(packs[l],it.keys[0])??'';ta.disabled=miss;
  const holes=(ta.value.match(/\{\w+\}/g)||[]).join(' ');
  $(`.ce-hint-${l}`).textContent=holes?`保留 ${holes}`:'';
 }
 if(miss)$('.ce-zh').value=norm(it.el.textContent);
 $('.ce-save').disabled=$('.ce-mark').disabled=miss;
 $('.ce-mark').textContent=!miss&&isReviewed(it.keys[0])?'取消已核对':'标为已核对';
 msg('');renderList();
 setTimeout(()=>{if(!miss)$('.ce-zh').focus({preventScroll:true});});
}
function step(d){const list=visible().map(it=>items.indexOf(it));if(!list.length)return;const at=list.indexOf(current);select(list[at<0?0:Math.min(list.length-1,Math.max(0,at+d))],true);}
function msg(t,err){const m=$('.ce-msg');m.textContent=t;m.classList.toggle('err',!!err);}
function mark(){
 const it=items[current];if(!it||it.kind==='miss')return;
 const k=`${lang()}:${it.keys[0]}`;
 if(isReviewed(it.keys[0]))delete reviewed[k];else reviewed[k]=get(packs[lang()],it.keys[0]);
 store.set('reviewed',reviewed);scan();select(current);
}
async function save(){
 const it=items[current];if(!it||it.kind==='miss')return;
 const key=it.keys[0],values={},expect={};
 for(const l of ['zh','en']){const v=$(`.ce-${l}`).value.trim(),old=get(packs[l],key);if(v!==old){values[l]=v;expect[l]=old;}}
 if(!Object.keys(values).length){msg('没有改动');return;}
 // Saving rewrites the language pack and Vite reloads the page; come back to the same place.
 sessionStorage.setItem(SS,JSON.stringify({path:location.pathname+location.hash,y:scrollY,key,lang:lang()}));
 // A saved edit counts as reviewed in the language it was made in.
 if(values[lang()]!==undefined){reviewed[`${lang()}:${key}`]=values[lang()];store.set('reviewed',reviewed);}
 msg('保存中…');
 const res=await fetch('/__copy',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({key,values,expect})}).catch(e=>({ok:false,json:async()=>({error:String(e)})}));
 const data=await res.json();
 if(!res.ok){sessionStorage.removeItem(SS);msg(data.error||'保存失败',true);return;}
 msg('已保存，页面刷新中…');
}

// ---------- events ----------
function setOn(v){
 on=v;document.documentElement.classList.toggle('ce-on',on);store.set('on',on);
 if(on)scan();else{document.querySelectorAll('.ce-current').forEach(e=>e.classList.remove('ce-current'));current=-1;}
}
document.addEventListener('click',e=>{
 if(!on||e.target.closest('[data-copy-editor],.ce-toggle'))return;
 const el=e.target.closest('[data-ce-i]');if(!el)return;
 e.preventDefault();e.stopPropagation();select(+el.dataset.ceI);
},true);
document.addEventListener('keydown',e=>{
 if(e.altKey&&e.code==='KeyC'){e.preventDefault();setOn(!on);return;}
 if(!on)return;
 if(e.altKey&&e.key==='ArrowDown'){e.preventDefault();step(1);}
 else if(e.altKey&&e.key==='ArrowUp'){e.preventDefault();step(-1);}
 else if(e.altKey&&e.key==='Enter'){e.preventDefault();mark();}
 else if((e.metaKey||e.ctrlKey)&&e.key==='Enter'&&e.target.closest('.ce-panel')){e.preventDefault();save();}
});
$('.ce-close').onclick=()=>setOn(false);
$('.ce-filter').onclick=()=>{onlyOpen=!onlyOpen;renderList();};
$('.ce-prev').onclick=()=>step(-1);$('.ce-next').onclick=()=>step(1);
$('.ce-mark').onclick=mark;$('.ce-save').onclick=save;
toggleBtn.onclick=()=>setOn(!on);

// Re-scan when the page changes (navigation, language switch, filters), keeping the selection by key.
let timer;
new MutationObserver(muts=>{
 if(!on)return;
 clearTimeout(timer);timer=setTimeout(()=>{const key=items[current]?.keys[0];scan();if(key){const i=items.findIndex(it=>it.keys[0]===key);i>=0?select(i):select(-1);}},250);
}).observe(document.getElementById('root'),{childList:true,subtree:true,characterData:true});

const style=document.createElement('style');style.textContent=css;
document.head.append(style);document.body.append(toggleBtn,panel);
packs=await (await fetch('/__copy')).json();
const resume=JSON.parse(sessionStorage.getItem(SS)||'null');sessionStorage.removeItem(SS);
if(resume||store.get('on',false)){
 // Wait for the app (and its scroll-to-top on load) to settle before restoring.
 await new Promise(r=>document.readyState==='complete'?r():addEventListener('load',r,{once:true}));
 await new Promise(r=>setTimeout(r,400));
 setOn(true);
 if(resume&&location.pathname+location.hash===resume.path){
  scrollTo({top:resume.y,behavior:'instant'});
  const i=items.findIndex(it=>it.keys[0]===resume.key);
  if(i>=0){select(i);msg('已保存');}
 }
}
