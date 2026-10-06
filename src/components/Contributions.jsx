import React from 'react';
import data from '../githubContributions.json';
import { copy } from '../data';
// GitHub contribution heatmap from the build-time snapshot (scripts/fetch-contributions.mjs).
const months={zh:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],en:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']};
const cell=11,gap=3,step=cell+gap,top=18;
export default function Contributions({lang}) {
 const start=new Date(`${data.from}T00:00:00Z`),offset=start.getUTCDay();
 const days=data.counts.map((count,i)=>{const d=new Date(start);d.setUTCDate(d.getUTCDate()+i);const slot=i+offset;return{d,count,level:+data.levels[i],x:Math.floor(slot/7),y:slot%7};});
 const weeks=days.at(-1).x+1;
 const labels=days.filter(({d,y})=>d.getUTCDate()<=7&&y===0||false).filter(({x})=>x<weeks-2);
 const label=(d,c)=>lang==='zh'?`${d.toISOString().slice(0,10)} · ${c} 次贡献`:`${c} contribution${c===1?'':'s'} on ${d.toISOString().slice(0,10)}`;
 return <a className="contributions" href={`https://github.com/${data.user}`} target="_blank" rel="noopener noreferrer">
  <div className="contributions-top"><span><strong>{data.total.toLocaleString('en-US')}</strong> {copy.contributionUnit[lang]} · {copy.contributions[lang]}</span><span className="contributions-legend">{copy.less[lang]}{[0,1,2,3,4].map(l=><i key={l} className={`lv${l}`}/>)}{copy.more[lang]}</span></div>
  <div className="contributions-scroll"><svg viewBox={`0 0 ${weeks*step-gap} ${top+7*step-gap}`} role="img" aria-label={`GitHub ${data.total} ${copy.contributionUnit[lang]} ${copy.contributions[lang]}`}>
   {labels.map(({d,x})=><text key={x} x={x*step} y={11}>{months[lang][d.getUTCMonth()]}</text>)}
   {days.map(({d,count,level,x,y})=><rect key={x*7+y} className={`lv${level}`} x={x*step} y={top+y*step} width={cell} height={cell} rx={2}><title>{label(d,count)}</title></rect>)}
  </svg></div>
 </a>;
}
