// Load intro. While the page loads, a curtain (index.html) holds the screen: the brand square flips and a thin
// bar fills on lime. Once loaded, the bar completes and the curtain lifts with a dark band trailing it, the headline
// rises in, and then — on home opened at the top — the project timeline plays: a square runs along the line from
// the earliest project to now, drawing it, with the canvas panning along; each project pops up as it's passed.
// Other pages (and home opened at #work / #lab) just fade in under the curtain.
// All times in ms.
const T={
 minLoad:900,     // the curtain shows at least this long…
 maxLoad:3500,    // …and at most this long, loaded or not
 bar:250,         // loading bar completes
 lift:950, band:120, // curtain lifts; the dark band follows this much later
 headline:450, stagger:90, rise:1100, // from the start of the lift
 header:650, fade:800,
 run:1000,        // from the start of the lift: the timeline starts
 pop:350,         // runner square appears on the line
 runMin:2200, runMax:4200, runPerPx:1.6, // earliest → now, scaled to the line's length
 card:700,
};
const RUN=[.65,0,.35,1];
const ease={inOut:'cubic-bezier(.76,0,.24,1)',out:'cubic-bezier(.16,1,.3,1)'};
const frame=()=>new Promise(requestAnimationFrame);
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
// Value of cubic-bezier RUN at time fraction t.
function easeAt(t,[x1,y1,x2,y2]=RUN){
 const at=(u,a,b)=>3*a*u*(1-u)**2+3*b*u*u*(1-u)+u**3;
 let lo=0,hi=1;
 for(let i=0;i<30;i++){const mid=(lo+hi)/2;if(at(mid,x1,x2)<t)lo=mid;else hi=mid;}
 return at(lo,y1,y2);
}

export function playIntro(){
 const root=document.documentElement,curtain=document.getElementById('intro');
 if(!root.classList.contains('intro')||!curtain)return;
 window.__introStarted=true;
 const loaded=new Promise(resolve=>{
  if(document.readyState==='complete')resolve();else addEventListener('load',resolve,{once:true});
  setTimeout(resolve,T.maxLoad);
 });
 const held=wait(T.minLoad-(Date.now()-(window.__introT0||0)));
 Promise.all([loaded,held]).then(async()=>{
  for(let i=0;i<60&&!document.getElementById('main');i++)await frame(); // dev renders client-side
  const anims=[],add=(el,keyframes,opts)=>el&&anims.push(el.animate(keyframes,{fill:'both',easing:ease.out,...opts}));
  const line=root.classList.contains('intro-hero')&&document.querySelector('.tl-line');
  // 1. Curtain: the bar completes, then the lime cover lifts with the dark band trailing it.
  const bar=curtain.querySelector('.intro-bar i');
  bar.style.animation='none';
  add(bar,[{transform:getComputedStyle(bar).transform},{transform:'scaleX(1)'}],{duration:T.bar});
  const lift=[{transform:'none'},{transform:'translateY(-100%)'}];
  add(curtain.querySelector('.intro-cover'),lift,{duration:T.lift,delay:T.bar,easing:ease.inOut});
  add(curtain.querySelector('.intro-band'),lift,{duration:T.lift,delay:T.bar+T.band,easing:ease.inOut});
  // 2. Page: header and headline come in under the lifting curtain.
  const t=T.bar;
  add(document.querySelector('.header'),[{opacity:0,transform:'translateY(-16px)'},{opacity:1,transform:'none'}],{duration:T.fade,delay:t+T.header});
  if(line){
   document.querySelectorAll('.hero h1 .line-in').forEach((el,i)=>add(el,[{transform:'translateY(120%) rotate(6deg)'},{transform:'none'}],{duration:T.rise,delay:t+T.headline+i*T.stagger}));
   // 3. Timeline.
   await wait(t+T.run);
   await timeline(line,add);
  }else add(document.getElementById('main'),[{opacity:0,transform:'translateY(40px)'},{opacity:1,transform:'none'}],{duration:T.rise,delay:t+T.headline});
  await Promise.all(anims.map(a=>a.finished));
  // Hand back to the stylesheet: final keyframes equal the default styles, so dropping both is seamless.
  root.classList.remove('intro','intro-hero');curtain.remove();anims.forEach(a=>a.cancel());
  if(line)line.style.transform=''; // drawn inline by the run
 });
}

// Each project pops up: year and dot, then the frame (from the line's side on desktop, from the left on phones).
function revealStep(step,add,vertical){
 step.querySelectorAll('.tl-year').forEach(year=>add(year,[{opacity:0},{opacity:1}],{duration:T.fade}));
 add(step.querySelector('.tl-dot'),[{transform:'scale(0)'},{transform:'scale(2.2)',background:'#d7ef69'},{transform:'none'}],{duration:500});
 step.querySelectorAll('.tl-card').forEach(card=>{
  const dir=vertical?'translateX(-16px)':card.classList.contains('is-up')?'translateY(24px)':'translateY(-24px)';
  add(card,[{opacity:0,transform:dir},{opacity:1,transform:'none'}],{duration:T.card,delay:60});
  add(card.querySelector('img'),[{transform:'scale(1.3)'},{transform:'none'}],{duration:T.card*1.6,delay:60});
 });
}
// Phones (newest first): the vertical line draws down from "now" through the first screen, popping up each project it passes;
// the projects below the fold are shown when it finishes. A touch or scroll shows everything at once.
async function timelineVertical(line,add){
 const steps=[...document.querySelectorAll('.tl-step')],top=line.getBoundingClientRect().top,fold=innerHeight-top;
 const at=steps.map(step=>step.querySelector('.tl-dot').getBoundingClientRect().top-top);
 const length=Math.min(line.offsetHeight,fold),duration=Math.min(T.runMax,Math.max(T.runMin*.6,length*T.runPerPx));
 let skipped=false;const skip=()=>{skipped=true;},events=['pointerdown','wheel','touchstart','scroll'];
 events.forEach(t=>addEventListener(t,skip,{passive:true}));
 const shown=new Set();
 await new Promise(done=>{
  let t0=null;
  const tick=now=>{
   t0??=now;
   const p=skipped?1:easeAt(Math.min(1,(now-t0)/duration)),d=p*length;
   line.style.transform=`scaleY(${p<1?d/line.offsetHeight:1})`;
   steps.forEach((step,i)=>{if(!shown.has(step)&&(at[i]<=d||p===1)){shown.add(step);revealStep(step,add,true);}});
   if(p<1)requestAnimationFrame(tick);else done();
  };
  requestAnimationFrame(tick);
 });
 events.forEach(t=>removeEventListener(t,skip));
 add(document.querySelector('.tl-end'),[{opacity:0},{opacity:1}],{duration:T.fade});
 add(document.querySelector('.view-switch'),[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:T.fade});
}

// A square drops onto the start of the line and runs to its end, drawing it; the canvas pans to keep the square
// near its middle. Touching the canvas mid-run hands control to the visitor: everything left is revealed at once.
async function timeline(line,add){
 if(matchMedia('(max-width:700px)').matches)return timelineVertical(line,add);
 const canvas=line.closest('.tl-canvas'),size=9;
 canvas.scrollLeft=0;
 const c=canvas.getBoundingClientRect(),r=line.getBoundingClientRect();
 // The line is still scaled to 0 here, so take its length from layout, not from its (transformed) box.
 const length=line.offsetWidth,travel=length-size,follow=c.width*.5,base=r.left-c.left;
 const maxScroll=canvas.scrollWidth-canvas.clientWidth;
 const runner=document.createElement('div');
 runner.setAttribute('aria-hidden','true');
 Object.assign(runner.style,{position:'fixed',zIndex:300,left:`${r.left}px`,top:`${r.top-size/2}px`,width:`${size}px`,height:`${size}px`,background:'#d7ef69',pointerEvents:'none'});
 document.body.append(runner);
 await runner.animate([{transform:'scale(0) rotate(-90deg)'},{transform:'none'}],{duration:T.pop,easing:'cubic-bezier(.3,1.6,.5,1)'}).finished;
 const steps=[...document.querySelectorAll('.tl-step')].map(step=>{const d=step.querySelector('.tl-dot').getBoundingClientRect();return {step,at:d.left+d.width/2-r.left-size/2,shown:false};});
 const reveal=s=>{s.shown=true;revealStep(s.step,add,false);};
 const duration=Math.min(T.runMax,Math.max(T.runMin,length*T.runPerPx));
 let skipped=false;
 const skip=()=>{skipped=true;},events=['pointerdown','wheel','touchstart'];
 events.forEach(t=>canvas.addEventListener(t,skip,{passive:true}));
 await new Promise(done=>{
  let t0=null; // starts on the first frame, so a page loaded in a background tab still plays once shown
  const tick=now=>{
   t0??=now;
   const p=skipped?1:easeAt(Math.min(1,(now-t0)/duration)),d=p*travel;
   if(!skipped)canvas.scrollLeft=Math.min(maxScroll,Math.max(0,base+d-follow));
   runner.style.transform=`translate(${d-canvas.scrollLeft}px,0)`;
   line.style.transform=`scaleX(${(d+size)/length})`;
   steps.forEach(s=>{if(!s.shown&&d>=s.at)reveal(s);});
   if(p<1)requestAnimationFrame(tick);else done();
  };
  requestAnimationFrame(tick);
 });
 // The runner becomes the "now" marker.
 events.forEach(t=>canvas.removeEventListener(t,skip));
 add(document.querySelector('.tl-end'),[{opacity:0},{opacity:1}],{duration:1});
 add(document.querySelector('.tl-hud'),[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:T.fade});
 add(document.querySelector('.view-switch'),[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:T.fade});
 runner.remove();
}
