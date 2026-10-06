import React,{useState,useEffect,useLayoutEffect,useRef} from 'react';
import Header from './components/Header';
import Home from './components/Home';
import ProjectDetail from './components/ProjectDetail';
import {projects,copy} from './data';
import {localize} from './localize';

// Routes: "/" (home, with #work / #lab sections) and "/project/<id>/", in Chinese at the root and English under /en.
// Shared by the client and the prerenderer.
const basePaths=['/',...projects.map(p=>`/project/${p.id}/`)];
export const routes=[...basePaths,...basePaths.map(p=>localize('en',p))];
export const normalizePath=path=>path.replace(/\/+$/,'')||'/';
export function matchRoute(path){
 let clean=normalizePath(path),lang='zh';
 if(clean==='/en'||clean.startsWith('/en/')){lang='en';clean=clean.slice(3)||'/';}
 const id=clean.match(/^\/project\/([^/]+)$/)?.[1];
 const project=id?projects.find(p=>p.id===id)||null:null;
 return {lang,home:clean==='/',project,base:clean==='/'?'/':`${clean}/`};
}
export function pageMeta(path){
 const {lang,project}=matchRoute(path);
 return {lang,title:`${project?project.name+' — ':''}${copy.name[lang]} — ${lang==='zh'?'设计作品集':'Design portfolio'}`,description:project?project.intro[lang]:copy.intro[lang]};
}

export default function App({initialPath,initialHash=''}){
 const [route,setRoute]=useState({path:initialPath,hash:initialHash});
 const {lang,home,project,base}=matchRoute(route.path);
 // Client-side navigation for same-origin links; plain "#..." links (skip link) stay native.
 useEffect(()=>{
  const sync=()=>setRoute({path:location.pathname,hash:location.hash});
  const click=e=>{
   if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
   const a=e.target instanceof Element&&e.target.closest('a[href]');
   if(!a||a.target||a.hasAttribute('download')||a.getAttribute('href').startsWith('#'))return;
   const url=new URL(a.href);
   if(url.origin!==location.origin)return;
   e.preventDefault();
   if(url.href!==location.href)history.pushState(null,'',url.pathname+url.hash);
   sync();
  };
  document.addEventListener('click',click);window.addEventListener('popstate',sync);
  return()=>{document.removeEventListener('click',click);window.removeEventListener('popstate',sync);};
 },[]);
 // The language toggle moves to the same page in the other language and remembers the choice (read by the redirect in index.html).
 const setLang=next=>{try{localStorage.setItem('lang',next);}catch{}const path=localize(next,base);history.pushState(null,'',path+location.hash);setRoute({path,hash:location.hash});};
 useEffect(()=>{document.documentElement.lang=lang==='zh'?'zh-CN':'en';const meta=pageMeta(route.path);document.title=meta.title;document.querySelector('meta[name="description"]').content=meta.description;},[route.path]);
 // Scroll to the section / top on navigation, but keep the position when only the language changes.
 const previous=useRef(null);
 useLayoutEffect(()=>{
  const key=base+route.hash,same=previous.current===key;previous.current=key;
  if(same)return;
  if(route.hash==='#work'||route.hash==='#lab')requestAnimationFrame(()=>document.getElementById(route.hash.slice(1))?.scrollIntoView({block:'start'}));
  else window.scrollTo({top:0,behavior:'instant'});
 },[route]);
 return <><a href="#main" className="skip-link">{lang==='zh'?'跳至内容':'Skip to content'}</a><Header lang={lang} setLang={setLang} detail={!home}/>{home?<Home lang={lang}/>:project?<ProjectDetail key={project.id} project={project} lang={lang}/>:<main id="main" className="not-found wrap"><h1>{copy.notfound[lang]}</h1><a href={localize(lang,'/#work')}>{copy.back[lang]}</a></main>}</>;
}
