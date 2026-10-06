import React, { useEffect, useRef } from 'react';
import { projects, timeline, copy } from '../data';
import { localize } from '../localize';
// Home hero: every project as a frame on a horizontal, draggable canvas, oldest first along one line.
// Projects alternate above / below the line; the first project of each year marks the year on the line.
// Layout is in canvas units (1 unit = --u px, smaller on phones).
const W=232, STEP=196, START=40, END=230; // END includes the 100-unit margin after the line's "now" marker
// Crop focus for covers whose subject sits off-centre at the frame's 1.6:1 ratio.
const FOCUS={flexbench:'50% 30%',soundbricks:'50% 38%','sf-eats':'50% 8%','bambu-lab':'0 50%'};
const STEMS=[28,46,20,40,32,48,24,44,36];
const steps=timeline.map((t,i)=>({...t,side:i%2?'down':'up',newYear:t.year!==timeline[i-1]?.year,x:START+i*STEP}));
const WIDTH=steps.at(-1).x+W+END;

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
     const p=projects.find(q=>q.id===s.id);
     return <li key={s.id} className="tl-step" style={{'--x':s.x}}>
      <span className="tl-dot" aria-hidden="true"/>
      {s.newYear&&<span className={`tl-year is-${s.side==='up'?'down':'up'}`}>{s.year}</span>}
      <a className={`tl-card is-${s.side}`} style={{'--stem':STEMS[i]}} href={localize(lang,`/project/${s.id}/`)} draggable="false">
       <span className="tl-name"><span className="tl-index">{String(i+1).padStart(2,'0')}</span>{p.name}</span>
       <span className="tl-frame"><span className="tl-thumb" style={{background:p.color}}><img src={`/assets/${p.cover}.webp`} alt="" style={{objectPosition:FOCUS[s.id]}} loading={i<5?'eager':'lazy'} width="320" height="200"/></span><span className="tl-select" aria-hidden="true"><i/><i/><i/><i/></span></span>
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
