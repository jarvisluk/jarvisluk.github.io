import React,{useEffect,useRef,useState} from 'react';
import CaseMedia from './CaseMedia';
import {elementPath} from '../caseStudies';
import {blockMedia} from './blockMedia.js';
import {copy} from '../data';
import {format} from '../i18n';
export {blockMedia};
// Native content blocks for rebuilt case studies. Text stays HTML; images open in the shared lightbox.
const t=(v,lang)=>v?.[lang]??v;

function Problems({block,lang,onOpen}){
 return <ol className="fb-problems">{block.items.map((p,i)=><li key={i}><CaseMedia item={p.image} lang={lang} onOpen={onOpen}/><h3><span>0{i+1}</span>{t(p.title,lang)}</h3><p>{t(p.body,lang)}</p></li>)}</ol>;
}

function Quotes({block,lang}){
 return <div className="fb-quotes">{block.items.map((q,i)=><blockquote key={i} className={q.tutor?'is-tutor':''}><p>{t(q.text,lang)}</p><footer><span>{t(q.who,lang)}</span><em>{t(q.tag,lang)}</em></footer></blockquote>)}</div>;
}

function Persona({block,lang}){
 return <div className="fb-persona">
  <div className="fb-persona-id"><span>{t(block.label,lang)}</span><h3>{t(block.name,lang)}</h3><dl>{block.facts.map((f,i)=><div key={i}><dt>{t(f[0],lang)}</dt><dd>{t(f[1],lang)}</dd></div>)}</dl></div>
  {['pains','needs'].map(k=><div key={k} className={`fb-persona-list is-${k}`}><h4>{copy[k][lang]}</h4><ul>{block[k].map((x,i)=><li key={i}>{t(x,lang)}</li>)}</ul></div>)}
 </div>;
}

function Stages({block,lang,onOpen}){
 const head=copy.workflowHead[lang];
 return <><ol className="fb-stages">{block.items.map((s,i)=><li key={i} className={s.workshop?'needs-workshop':''}>
  <CaseMedia item={s.image} lang={lang} onOpen={onOpen}/>
  <div className="fb-stage-text"><span className="fb-stage-index">0{i+1}</span><h3>{t(s.name,lang)}</h3><p>{t(s.detail,lang)}</p>
   <dl>{[s.space,s.tools,s.need,s.place].map((v,j)=><div key={j}><dt>{head[j]}</dt><dd>{t(v,lang)}</dd></div>)}</dl></div>
 </li>)}</ol>{block.note&&<p className="fb-note">{t(block.note,lang)}</p>}</>;
}

function Spaces({block,lang,onOpen}){
 const head=copy.spaceHead[lang];
 const list=<ul className="fb-space-list">{block.items.map((s,i)=><li key={i} className={s.suitable?'is-suitable':'is-unsuitable'}>
   <CaseMedia item={s.image} lang={lang} onOpen={onOpen}/>
   <div><h3>{s.color&&<i className="fb-dot" style={{background:s.color}}/>}{t(s.name,lang)}<span>{s.suitable?copy.suitable[lang]:copy.unsuitable[lang]}</span></h3>
    <dl><div><dt>{head[0]}</dt><dd>{t(s.space,lang)}</dd></div><div><dt>{head[1]}</dt><dd>{t(s.traffic,lang)}</dd></div></dl>
    <p>{t(s.note,lang)}</p>{s.works.length>0&&<ul className="fb-tags">{s.works.map((w,j)=><li key={j}>{t(w,lang)}</li>)}</ul>}</div>
  </li>)}</ul>;
 return <div className={`fb-spaces ${block.layout?`is-${block.layout}`:''}`}>
  <div className="fb-spaces-main"><div className="fb-spaces-diagram"><CaseMedia item={block.diagram} lang={lang} onOpen={onOpen}/></div>{list}</div>
  <div className="fb-spaces-foot">{block.map&&<div className="fb-spaces-map"><CaseMedia item={block.map} lang={lang} onOpen={onOpen}/></div>}
  {block.conclusion&&<p className="fb-conclusion">{t(block.conclusion,lang)}</p>}</div>
 </div>;
}

function Actors({block,lang}){
 return <ul className="fb-actors">{block.items.map((a,i)=><li key={i}><h3>{t(a.name,lang)}</h3><p>{t(a.role,lang)}</p>{a.app&&<p className="fb-actor-app">{t(a.app,lang)}</p>}</li>)}</ul>;
}

function Blueprint({block,lang}){
 const cols=block.phases.reduce((n,p)=>n+p.span,0);
 return <figure className="fb-blueprint">
  <div className="fb-blueprint-scroll" tabIndex={0} aria-label={t(block.caption,lang)}>
   <div className="fb-blueprint-grid" style={{'--cols':cols}}>
    <div className="fb-bp-label fb-bp-phase-label">{copy.phase[lang]}</div>
    {block.phases.map((p,i)=><div key={i} className="fb-bp-phase" style={{gridColumn:`span ${p.span}`}}>{t(p.label,lang)}</div>)}
    {block.lanes.map((lane,i)=><React.Fragment key={i}>
     {lane.line&&<div className="fb-bp-line" style={{gridColumn:`1 / span ${cols+1}`}}><span>{t(lane.line,lang)}</span></div>}
     <div className={`fb-bp-label is-${lane.kind}`}>{t(lane.label,lang)}</div>
     {lane.cells.map((c,j)=>{const text=c?.text||c,span=c?.span||1;return <div key={j} className={`fb-bp-cell is-${lane.kind} ${c?'':'is-empty'}`} style={span>1?{gridColumn:`span ${span}`}:undefined}>{c?t(text,lang):''}</div>;})}
    </React.Fragment>)}
   </div>
  </div>
  <figcaption>{t(block.caption,lang)}</figcaption>
 </figure>;
}

function Tools({block,lang,onOpen}){
 return <div className="fb-tools">{block.groups.map((g,i)=><section key={i} className="fb-tool-group">
  <header><h3>{t(g.module,lang)}</h3><p>{t(g.body,lang)}</p></header>
  <ul>{g.tools.map((x,j)=><li key={j}><CaseMedia item={x} lang={lang} onOpen={onOpen}/></li>)}</ul>
 </section>)}</div>;
}

function Modules({block,lang,onOpen}){
 return <div className="fb-modules">{block.items.map((m,i)=><article key={i} className={`fb-module layout-${m.images.length}`}>
  <div className="fb-module-text"><span>0{i+1}</span><h3>{t(m.name,lang)}</h3><p>{t(m.body,lang)}</p>{m.specs&&<ul className="fb-specs">{m.specs.map((s,j)=><li key={j}><strong>{s[0]}</strong>{t(s[1],lang)}</li>)}</ul>}</div>
  <div className="fb-module-media">{m.images.map((img,j)=><CaseMedia key={img.id} item={img} lang={lang} onOpen={onOpen}/>)}</div>
 </article>)}</div>;
}

function Story({block,lang,onOpen}){
 return <ol className="fb-story">{block.steps.map((s,i)=><li key={i}>
  <div className="fb-story-head"><span>0{i+1}</span><h3>{t(s.title,lang)}</h3></div>
  <div className="fb-story-body">
   <CaseMedia item={s.scene} lang={lang} onOpen={onOpen}/>
   <div className="fb-story-side"><dl>{s.roles.map((r,j)=><div key={j}><dt>{t(r[0],lang)}</dt><dd>{t(r[1],lang)}</dd></div>)}</dl>
    <div className="fb-screens">{s.screens.map(x=><CaseMedia key={x.id} item={x} lang={lang} onOpen={onOpen}/>)}</div></div>
  </div>
 </li>)}</ol>;
}

// Click-to-load embed: Chinese defaults to Bilibili, English to YouTube; either can be chosen.
function Video({block,lang}){
 if(block.src)return <figure className="fb-video">
  <div className="fb-video-frame"><video controls controlsList="nodownload noremoteplayback" disablePictureInPicture playsInline preload="none" poster={elementPath(block.poster)} aria-label={t(block.title,lang)}><source src={block.src} type="video/mp4"/></video></div>
  <figcaption><span>{t(block.title,lang)}</span></figcaption>
 </figure>;
 const sources=[block.bilibili&&{key:'bilibili',label:copy.bilibili[lang],src:`https://player.bilibili.com/player.html?bvid=${block.bilibili}&autoplay=1&high_quality=1`,href:`https://www.bilibili.com/video/${block.bilibili}`},
  block.youtube&&{key:'youtube',label:'YouTube',src:`https://www.youtube-nocookie.com/embed/${block.youtube}?autoplay=1&rel=0`,href:`https://youtu.be/${block.youtube}`}].filter(Boolean);
 const preferred=lang==='zh'?'bilibili':'youtube';
 const [choice,setChoice]=useState(null),[playing,setPlaying]=useState(false);
 const current=sources.find(s=>s.key===(choice||preferred))||sources[0];
 return <figure className="fb-video">
  <div className="fb-video-frame">{playing?<iframe src={current.src} title={t(block.title,lang)} allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen/>:
   <button className="fb-video-poster" onClick={()=>setPlaying(true)}><img src={elementPath(block.poster)} alt="" loading="lazy"/><span className="fb-play"><svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>{format(copy.playOn[lang],{source:current.label})}</span></button>}</div>
  <figcaption><span>{t(block.title,lang)}</span>{sources.length>1&&<span className="fb-video-sources" role="group" aria-label={copy.videoSource[lang]}>{sources.map(s=><button key={s.key} aria-pressed={current.key===s.key} onClick={()=>{setChoice(s.key);}}>{s.label}</button>)}</span>}<a href={current.href} target="_blank" rel="noopener noreferrer">{copy.openNew[lang]} ↗</a></figcaption>
 </figure>;
}

// Live page from public/embeds (a working app or a styled component sheet), or a whole external site (block.site) in a framed window.
// Embeds post their height so the frame fits; external sites keep block.height.
function Embed({block,lang}){
 const ref=useRef(null),[height,setHeight]=useState(block.height);
 const src=`${block.src}${block.src.includes('?')?'&':'?'}lang=${lang}`;
 useEffect(()=>{
  if(block.fixed)return;
  const on=e=>{if(e.source===ref.current?.contentWindow&&e.data?.type==='gocus-embed-height')setHeight(Math.ceil(e.data.height));};
  window.addEventListener('message',on);return()=>window.removeEventListener('message',on);
 },[block.fixed]);
 return <figure className={`case-embed ${block.fixed?'is-app':'is-sheet'}${block.site?' is-site':''}`}>
  <div className="case-embed-frame" style={block.fixed?{width:block.width,height:block.height}:undefined}>
   <iframe ref={ref} src={src} title={t(block.title,lang)} loading="lazy" style={block.fixed?undefined:{height}}/>
  </div>
  {block.caption&&<figcaption>{t(block.caption,lang)}{block.href&&<a href={block.href} target="_blank" rel="noopener noreferrer">{block.hrefLabel?t(block.hrefLabel,lang):copy.openNew[lang]} ↗</a>}</figcaption>}
 </figure>;
}

const renderers={problems:Problems,quotes:Quotes,persona:Persona,stages:Stages,spaces:Spaces,actors:Actors,blueprint:Blueprint,tools:Tools,modules:Modules,story:Story,video:Video,embed:Embed};
export default function CaseBlock({block,lang,onOpen}){
 if(block.type==='media')return <div className={`media-group layout-${block.layout} ${block.items.length===1?'single-item':''}`}>{block.items.map((item,j)=><CaseMedia key={`${item.id}-${j}`} item={item} lang={lang} onOpen={onOpen}/>)}</div>;
 if(block.type==='heading')return <h3 className="fb-subheading">{t(block.text,lang)}</h3>;
 const Block=renderers[block.type];
 return Block?<Block block={block} lang={lang} onOpen={onOpen}/>:null;
}
