import React,{useEffect,useMemo,useState} from 'react';
import {copy,projects} from '../data';
import {caseStudies,elementPath} from '../caseStudies';
import Arrow from './Arrow';
import {localize} from '../localize';
import Lightbox from './Lightbox';
import CaseMedia from './CaseMedia';
import CaseBlock,{blockMedia} from './CaseBlocks';
const labels={canvas:['示例页','Canvas'],studio:['工作台','Studio'],agents:['Agent','Agents'],type:['中文排版','Chinese type'],homepage:['首页','Home'],training:['训练','Training'],player:['播放','Player'],data:['数据','Data'],import:['导入','Import'],courses:['课程','Courses'],tracks:['曲库','Music'],wifi:['配网','Wi-Fi'],films:['影像','Films'],group:['团体点餐','Group orders'],sound:['声音','Sound'],habit:['习惯','Habit'],mistakes:['错题','Mistakes'],platforms:['多端','Platforms'],build:['开发','Build'],graph:['提交图','Graph'],try:['试用','Try it'],library:['组件库','Components'],guidelines:['设计规范','Guidelines'],identity:['图标','Icon'],workspace:['回到编辑器','Workspace'],actions:['操作','Actions'],research:['研究','Research'],interaction:['交互','Interaction'],prototype:['原型','Prototype'],digital:['数字体验','Digital'],testing:['测试','Testing'],outcome:['呈现','Outcome'],context:['情境','Context'],identity:['品牌','Identity'],community:['社区','Community'],planning:['计划','Planning'],ordering:['流程','Journey'],habits:['习惯','Habits'],'co-design':['共创','Co-design'],journey:['旅程','Journey'],assistant:['助手','Assistant'],system:['系统','System'],workflow:['需求','Needs'],space:['空间','Space'],service:['服务','Service'],modules:['模块','Modules'],voices:['访谈','Voices'],process:['流程','Process'],organize:['工具','Tools'],question:['问题','Question'],structure:['结构','Structure'],control:['控制','Control'],making:['制作','Making'],experience:['体验','Experience'],daily:['日常','Daily'],practice:['练习','Practice'],reflect:['反馈','Reflect'],platform:['平台','Platform'],wearable:['穿戴','Wearable'],field:['实测','Field test'],station:['站点','Station'],exhibition:['展陈','Exhibition']};
// Text, line and accent colours for a case page, derived from the project's hue and saturation.
// Light pages keep the site's lightness steps; dark pages (Matrix, Gocus) mirror them.
// Icons for study.actions (lucide download / github, as on the Gocus site).
const ACTION_ICONS={
 external:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>,
 download:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V3M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5"/></svg>,
 github:<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>,
};
function casePalette({tone,surface,theme}){
 const {h=150,s=30,accent='#d7ef69',ink='#7a9a2e'}=tone||{},c=(sat,l)=>`hsl(${h} ${sat}% ${l}%)`,v={'--accent':accent,'--accent-ink':ink};
 if(surface)v['--bg']=surface;
 if(theme==='dark')return {...v,'--ink':c(8,93),'--text':c(7,76),'--muted':c(6,62),'--index':c(10,58),'--rule':c(8,36),'--rule-soft':c(8,30),'--line':c(8,20),'--tint':c(10,14),'--panel':c(10,11),'--on-ink':c(8,62),'--deep':c(12,7)};
 return {...v,'--ink':c(s,13),'--text':c(s*.55,34),'--muted':c(7,43),'--index':c(9,52),'--rule':c(9,65),'--rule-soft':c(10,74),'--line':c(11,81),'--tint':c(22,92),'--on-ink':c(12,82),'--deep':c(s,9)};
}
function Section({section,index,lang,onOpen}){
 return <section id={`chapter-${section.id}`} className={`case-section ${section.tone?'case-tone':''} ${section.dark?'case-dark':''}`}>
  <div className="wrap">
   <div className="case-section-heading"><div><span className="case-index">{String(index+1).padStart(2,'0')}</span><h2>{section.title[lang]}</h2></div><p>{section.body[lang]}</p></div>
   {section.points&&<ul className="case-principles">{section.points.map((p,i)=><li key={i}><span>0{i+1}</span>{p[lang]}</li>)}</ul>}
   {section.steps&&<ol className="case-steps">{section.steps.map((p,i)=><li key={i}><span>0{i+1}</span><p>{p[lang]}</p>{i<section.steps.length-1&&<Arrow/>}</li>)}</ol>}
   {section.blocks?.map((block,i)=><CaseBlock key={`b${i}`} block={block} lang={lang} onOpen={onOpen}/>)}
   {section.groups.map((g,i)=><div className={`media-group layout-${g.layout} ${g.items.length===1?'single-item':''}`} key={i}>{g.items.map((item,j)=><CaseMedia key={`${item.id}-${j}`} item={item} lang={lang} onOpen={onOpen}/>)}</div>)}
   {section.videos&&<div className="case-films">{section.videos.map(video=><figure key={video.src}><video controls controlsList="nodownload noremoteplayback" disablePictureInPicture playsInline preload="none" poster={video.poster} aria-label={video.title[lang]}><source src={video.src} type="video/mp4"/>{lang==='zh'?'浏览器不支持视频播放':'Your browser does not support video playback.'}</video><figcaption>{video.title[lang]}</figcaption></figure>)}</div>}
   {section.references&&<details className="case-references"><summary>{lang==='zh'?'研究资料与早期探索':'Research material & early explorations'}<span>{section.references.length}<Arrow/></span></summary><div className="media-group layout-references">{section.references.map((item,i)=><CaseMedia key={`${item.id}-${i}`} item={item} lang={lang} onOpen={onOpen}/>)}</div></details>}
  </div>
 </section>;
}
export default function ProjectDetail({project,lang}) {
 const study=caseStudies[project.id];
 const [index,setIndex]=useState(null),[active,setActive]=useState(study.sections[0].id);
 const next=projects[(projects.indexOf(project)+1)%projects.length];
 const allMedia=useMemo(()=>{
  const values=[...(study.showcase||[]),...study.sections.flatMap(s=>[...(s.blocks||[]).flatMap(blockMedia),...s.groups.flatMap(g=>g.items),...(s.references||[])])];
  return values.filter((v,i)=>values.findIndex(x=>x.id===v.id)===i);
 },[study]);
 const openMedia=item=>setIndex(allMedia.findIndex(m=>m.id===item.id));
 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive(entry.target.id.replace('chapter-',''));},{rootMargin:'-10% 0px -65% 0px',threshold:0});
  document.querySelectorAll('.case-section').forEach(el=>observer.observe(el));return()=>observer.disconnect();
 },[project.id]);
 // Match the page to the portfolio: its background, so exported boards sit flush, and a palette tinted
 // by the project's own hue (study.tone) in place of the site's green-grey one. Restored on leave.
 useEffect(()=>{
  const root=document.documentElement.style,vars=casePalette(study);
  for(const [k,v] of Object.entries(vars))root.setProperty(k,v);
  if(study.surface)root.background=study.surface;
  root.color=vars['--ink'];
  return()=>{for(const k of Object.keys(vars))root.removeProperty(k);root.background='';root.color='';};
 },[study]);
 function scrollTo(id){document.getElementById(`chapter-${id}`)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});setActive(id);}
 const brief=<div className="brief-grid">{[['challenge','brief'],['approach','approach'],['outcome','output']].map(([label,key],i)=><div key={key}><h3><span>0{i+1}</span>{copy[label][lang]}</h3><p>{project[key][lang]}</p></div>)}</div>;
 return <main id="main" className={`detail reflowed-case${study.surface?" has-surface":""}${study.theme==="dark"?" theme-dark":""}`} style={{'--case-accent':study.accent}}>
  <section className="detail-intro wrap">
   <a className="back-link" href={localize(lang,'/#work')}><Arrow direction="left"/>{copy.back[lang]}</a>
   <div className="detail-heading"><h1>{project.name}</h1><span>{project.type[lang]}</span></div>
   {/* A live hero (Gocus) sits on the right, with the subtitle, description and actions beside it on the left. */}
   {study.heroEmbed?<div className="detail-split"><div><div className="detail-lead is-stacked"><h2>{project.subtitle[lang]}</h2><div><p>{study.oneLiner?.[lang]||project.intro[lang]}</p>{study.credit&&<p className="detail-credit">{study.credit[lang]}</p>}{study.actions&&<div className="detail-actions" style={study.actionColor&&{'--action':study.actionColor[0],'--action-ink':study.actionColor[1]}}>{study.actions.map(a=><a key={a.href} className={a.primary?'is-primary':''} href={a.href} target="_blank" rel="noopener noreferrer">{ACTION_ICONS[a.icon]}{a.label[lang]}</a>)}</div>}</div></div>{brief}</div><div className="case-hero hero-embed"><CaseBlock block={{type:'embed',...study.heroEmbed}} lang={lang}/></div></div>:<>
   <div className="detail-lead"><h2>{project.subtitle[lang]}</h2><div><p>{study.oneLiner?.[lang]||project.intro[lang]}</p>{study.credit&&<p className="detail-credit">{study.credit[lang]}</p>}{study.actions&&<div className="detail-actions" style={study.actionColor&&{'--action':study.actionColor[0],'--action-ink':study.actionColor[1]}}>{study.actions.map(a=><a key={a.href} className={a.primary?'is-primary':''} href={a.href} target="_blank" rel="noopener noreferrer">{ACTION_ICONS[a.icon]}{a.label[lang]}</a>)}</div>}</div></div>
   <figure className={`case-hero hero-${study.heroStyle}`}><img src={elementPath(study.hero)} alt={study.heroCaption?.[lang]||project.subtitle[lang]} fetchPriority="high"/></figure></>}
   {study.showcase?<div className="case-showcase">{study.showcase.map(item=><CaseMedia key={item.id} item={item} lang={lang} onOpen={openMedia}/>)}</div>:
   (study.heroEmbed?null:brief)}
  </section>
  <div className="case-rail"><div className="wrap"><span className="case-rail-title">{project.name}</span><nav aria-label={lang==='zh'?'项目章节':'Project chapters'}>{study.sections.map((s,i)=><button key={s.id} onClick={()=>scrollTo(s.id)} aria-current={active===s.id?'location':undefined}><span>{String(i+1).padStart(2,'0')}</span>{(labels[s.id]||[s.id,s.id])[lang==='zh'?0:1]}</button>)}</nav></div></div>
  {study.sections.map((s,i)=><Section key={s.id} section={s} index={i} lang={lang} onOpen={openMedia}/>)}
  <section className="next-project"><a className="wrap" href={localize(lang,`/project/${next.id}/`)}><span>{copy.next[lang]}</span><div><h2>{next.name}</h2><Arrow diagonal/></div><p>{next.subtitle[lang]}</p></a></section>
  <div className="detail-bottom wrap"><a href={localize(lang,'/#work')}>{copy.back[lang]}<Arrow/></a><span>{copy.name[lang]}</span></div>
  {index!==null&&<Lightbox items={allMedia} index={index} setIndex={setIndex} project={project} lang={lang} onClose={()=>setIndex(null)}/>}
 </main>;
}
