import React from 'react';
import { useState } from 'react';
import { projects, categories, copy, githubUrl, labProjects } from '../data';
import Arrow from './Arrow';
import { localize } from '../localize';
import Contributions from './Contributions';
import Timeline from './Timeline';
function ProjectCard({project,index,lang}) {
 return <article className={`project-card project-${project.id}`}>
  <a href={localize(lang,`/project/${project.id}/`)} className="project-link" aria-label={`${project.name} — ${project.subtitle[lang]}`}>
   <div className="project-image" style={{background:project.color}}><img src={`/assets/${project.cover}.webp`} alt={project.subtitle[lang]} loading="lazy" width="1600" height="1100"/><span className="image-link"><Arrow diagonal/></span></div>
   <div className="project-caption"><div><h3><span className="project-number">{String(index+1).padStart(2,'0')} /</span>{project.name}</h3><p>{project.subtitle[lang]}</p><span className="project-type">{project.type[lang]}</span></div><Arrow/></div>
  </a>
 </article>;
}
const ext={target:'_blank',rel:'noopener noreferrer'};
function LabCard({group,lang}) {
 return <article className={`lab-card lab-${group.id}${group.wide?' is-wide':''}`}>
  <div className="lab-card-top"><span className={group.icons?'has-icons':''}>{group.icons?.map(i=><img key={i} className="lab-icon" src={`/assets/lab/icons/${i}.svg`} alt="" width="16" height="16"/>)}{group.series[lang]}</span><span>{group.tags.join(' · ')}</span></div>
  {group.media&&<div className="lab-media">{group.media.map(m=>{const src=typeof m.src==='string'?m.src:m.src[lang];return <figure key={src} className={`${m.cover?'is-cover':''} ${m.pixel?'is-pixel':''}`}><img src={`/assets/lab/${src}.webp`} alt={m.alt[lang]} loading="lazy"/></figure>;})}</div>}
  <div className="lab-items">{group.items.map(item=><div className="lab-item" key={item.name}>
   <h3><a href={item.repo} {...ext}>{item.name}<Arrow diagonal/></a>{item.stars?<small>★ {item.stars}</small>:null}</h3>
   <p>{item.text[lang]}</p>
   {item.demo&&<a className="lab-demo" href={item.demo} {...ext}>{copy.demo[lang]}<Arrow/></a>}
  </div>)}</div>
 </article>;
}
export default function Home({lang}) {
 const [filter,setFilter]=useState('all');
 const filtered=projects.filter(p=>filter==='all'||p.categories.includes(filter));
 return <>
  <main id="main">
   <section className={`hero timeline-hero wrap ${lang==='zh'?'hero-zh':''}`} aria-label={lang==='zh'?'介绍':'Introduction'}>
    <div className="hero-copy">
     <h1>{(lang==='en'?['Design for','a little more','possibility.']:['以设计，','探索多一点','可能。']).map((t,i)=>{const Line=i===1?'em':'span';return <Line key={i}><span className="line-in">{t}</span></Line>;})}</h1>
    </div>
    <Timeline lang={lang}/>
   </section>
   <section id="work" className="work wrap">
    <div className="section-top"><h2>{copy.selected[lang]} <em>{copy.works[lang]}</em><sup>{String(projects.length).padStart(2,'0')}</sup></h2><div className="filters" aria-label={lang==='zh'?'筛选项目':'Filter projects'}>{categories.map(c=><button key={c.id} onClick={()=>setFilter(c.id)} className={filter===c.id?'selected':''} aria-pressed={filter===c.id}>{c.label[lang]}</button>)}</div></div>
    <div className="project-grid" key={filter}>{filtered.map(p=><ProjectCard key={p.id} project={p} index={projects.indexOf(p)} lang={lang}/>)}</div>
    <p className="project-count" aria-live="polite">{lang==='zh'?`正在展示 ${filtered.length} 个项目`:`Showing ${filtered.length} projects`}<span>IDEAS INTO EXPERIENCES</span></p>
   </section>
   <section id="lab" className="lab wrap">
    <p className="section-label">{copy.labLabel[lang]}</p>
    <div className="lab-head"><h2>{copy.labTitle[lang]}<br/><em>{copy.labItalic[lang]}</em></h2><div className="lab-cta"><p>{copy.labText[lang]}</p><a className="lab-go" href={githubUrl} {...ext}>{copy.labAll[lang]}<span className="circle-arrow"><Arrow diagonal/></span></a></div></div>
    <Contributions lang={lang}/>
    <div className="lab-grid">{labProjects.map(g=><LabCard key={g.id} group={g} lang={lang}/>)}</div>
   </section>
  </main>
  <footer className="footer"><div className="wrap"><div className="footer-main"><p>{copy.closer[lang]}</p></div><div className="footer-bottom"><span>{copy.name[lang]}</span><span className="footer-links"><a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub<Arrow diagonal/></a><a href={localize(lang,'/')}>{copy.top[lang]}<Arrow direction="up"/></a></span></div></div></footer>
 </>;
}
