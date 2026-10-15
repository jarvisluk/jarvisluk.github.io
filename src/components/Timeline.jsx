import React, { useEffect, useRef, useState } from 'react';
import { projects, timeline, labItems, copy } from '../data';
import Arrow from './Arrow';
import { localize } from '../localize';
import { format } from '../i18n';
// Home hero: every project as a frame on a horizontal, draggable canvas, oldest first along one line.
// Projects alternate above / below the line; the first project of each year marks the year on the line.
// Side projects (`lab` entries) sit on the same line, one small marker per month, expanding on hover or focus.
// Layout is in canvas units (1 unit = --u px, smaller on phones).
const W=232, STEP=196, START=40, END=230; // END includes the 100-unit margin after the line's "now" marker
// Crop focus for covers whose subject sits off-centre at the frame's 1.6:1 ratio.
const FOCUS={flexbench:'50% 30%',soundbricks:'50% 38%','sf-eats':'50% 8%','bambu-lab':'0 50%'};
const STEMS=[28,46,20,40,32,48,24,44,36,26],MINI_STEMS=[14,22,14,22];
// Spacing: a main frame needs STEP before the next frame; a marker after a frame needs MINI_AFTER, and anything after a marker MINI_STEP.
// Items on the same side stay at least W apart (MINI_AFTER + MINI_STEP >= W).
const MINI_AFTER=130, MINI_STEP=120;
const steps=[];
timeline.forEach((t,i)=>{
 const prev=steps[i-1];
 const x=!prev?START:prev.x+(prev.lab?MINI_STEP:t.lab?MINI_AFTER:STEP);
 steps.push({...t,key:t.id||t.lab.join(),side:i%2?'down':'up',newYear:t.year!==timeline[i-1]?.year,lastOfYear:t.year!==timeline[i+1]?.year,x});
});
const mainIndex=Object.fromEntries(steps.filter(s=>!s.lab).map((s,i)=>[s.id,i]));
const WIDTH=steps.at(-1).x+W+END;

// Side projects from one month: one marker with stacked thumbnails. Hover (mouse), a tap / click on the chip (toggles),
// or keyboard focus inside lists each one with its links.
const labThumb=(item,lang)=>item.thumb?<img src={`/assets/lab/${typeof item.thumb==='string'?item.thumb:item.thumb[lang]}.webp`} alt="" loading="lazy" className={item.pixel?'is-pixel':''}/>:<img src={`/assets/lab/icons/${item.icon}.svg`} alt="" className="is-icon"/>;
function LabCluster({ids,side,stem,lang}) {
 const items=ids.map(id=>labItems.find(l=>l.id===id));
 const [open,setOpen]=useState(false);
 const ext={target:'_blank',rel:'noopener noreferrer',draggable:'false'};
 const month=items[0].date.slice(0,7).replace('-','.');
 return <div className={`tl-card tl-mini is-${side}${open?' is-open':''}`} style={{'--stem':stem}}>
  <button type="button" className="tl-mini-chip" aria-expanded={open} aria-label={`${month} · ${format(copy.sideProjects[lang],{n:items.length})}`} onClick={()=>setOpen(o=>!o)}><span className="tl-mini-stack">{items.map(item=><span key={item.id} className="tl-mini-thumb">{labThumb(item,lang)}</span>)}</span><span className="tl-mini-name">{format(copy.sideProjects[lang],{n:items.length})}</span></button>
  <span className="tl-mini-detail"><span className="tl-mini-inner"><ul>{items.map(item=><li key={item.id}>
   <span className="tl-mini-thumb">{labThumb(item,lang)}</span>
   <span className="tl-mini-text"><a href={item.repo} {...ext}><strong>{item.name}</strong><Arrow diagonal/></a><span>{item.text[lang]}</span></span>
   {item.demo&&<a className="tl-mini-demo" href={item.demo} {...ext}>{copy.demo[lang]}</a>}
  </li>)}</ul></span></span>
 </div>;
}
export default function Timeline({lang}) {
 const canvas=useRef(null);
 useEffect(()=>{
  const el=canvas.current;
  // Drag to pan with a mouse (touch and trackpads scroll natively); a drag doesn't open the frame under it.
  let drag=null;
  const down=e=>{if(e.pointerType==='mouse'&&e.button===0)drag={x:e.clientX,left:el.scrollLeft,moved:false};};
  const move=e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>4&&!drag.moved){drag.moved=true;el.classList.add('is-dragging');}if(drag.moved)el.scrollLeft=drag.left-dx;};
  const up=()=>{if(drag?.moved)setTimeout(()=>el.classList.remove('is-dragging'));drag=null;};
  const click=e=>{if(el.classList.contains('is-dragging')){e.preventDefault();e.stopPropagation();}};
  el.addEventListener('pointerdown',down);addEventListener('pointermove',move);addEventListener('pointerup',up);
  el.addEventListener('click',click,true);
  return()=>{el.removeEventListener('pointerdown',down);removeEventListener('pointermove',move);removeEventListener('pointerup',up);el.removeEventListener('click',click,true);};
 },[]);
 return <div className="timeline">
  <div className="tl-canvas" ref={canvas}>
   <div className="tl-track" style={{'--w':WIDTH}}>
    <span className="tl-line" aria-hidden="true"/>
    <ol style={{'--cw':W}}>{steps.map((s,i)=>{
     // The year marks the first project of each year; phones list newest first, so there it marks the last one.
     const year=<>{s.newYear&&<span className={`tl-year is-first is-${s.side==='up'?'down':'up'}`}>{s.year}</span>}{s.lastOfYear&&<span className="tl-year is-last">{s.year}</span>}</>;
     if(s.lab)return <li key={s.key} className="tl-step is-mini" style={{'--x':s.x}}>
      <span className="tl-dot" aria-hidden="true"/>{year}
      <LabCluster ids={s.lab} side={s.side} stem={MINI_STEMS[i%MINI_STEMS.length]} lang={lang}/>
     </li>;
     const p=projects.find(q=>q.id===s.id),n=mainIndex[s.id];
     return <li key={s.key} className="tl-step" style={{'--x':s.x}}>
      <span className="tl-dot" aria-hidden="true"/>{year}
      <a className={`tl-card is-${s.side}`} style={{'--stem':STEMS[n%STEMS.length]}} href={localize(lang,`/project/${s.id}/`)} draggable="false">
       <span className="tl-name"><span className="tl-index">{String(n+1).padStart(2,'0')}</span>{p.name}</span>
       <span className="tl-frame"><span className="tl-thumb" style={{background:p.color}}><img src={`/assets/${p.cover}.webp`} alt="" style={{objectPosition:FOCUS[s.id]}} loading={n<5?'eager':'lazy'} width="320" height="200"/></span><span className="tl-select" aria-hidden="true"><i/><i/><i/><i/></span></span>
       <small>{p.type[lang]}</small>
      </a>
     </li>;
    })}</ol>
    <span className="tl-end" aria-hidden="true" data-label={copy.now[lang]}><i/></span>
   </div>
  </div>
  <div className="tl-hud" aria-hidden="true">
   <span className="tl-hint">{copy.drag[lang]}</span>
  </div>
 </div>;
}
