import React from 'react';
import {createRoot,hydrateRoot} from 'react-dom/client';
import '@fontsource-variable/noto-sans-sc';
import '@fontsource-variable/noto-serif-sc';
import App,{normalizePath} from './App';
import './style.css';
import './caseStudy.css';
import './caseBlocks.css';
// Deter casual saving of media: block the context menu / drag on images and videos, Cmd/Ctrl+S,
// and (in production only) the DevTools / view-source shortcuts.
const isMedia=el=>el instanceof Element&&!!el.closest('img,video,picture,svg image');
document.addEventListener('contextmenu',e=>{if(isMedia(e.target))e.preventDefault();});
document.addEventListener('dragstart',e=>{if(isMedia(e.target))e.preventDefault();});
document.addEventListener('keydown',e=>{
 const mod=e.metaKey||e.ctrlKey,code=e.code;
 const save=mod&&code==='KeyS';
 const devtools=code==='F12'||(mod&&(e.altKey||e.shiftKey)&&['KeyI','KeyJ','KeyC'].includes(code))||(mod&&code==='KeyU');
 if(save||(devtools&&!import.meta.env.DEV)){e.preventDefault();e.stopPropagation();}
},true);
// Old hash links (#/project/<id>) move to real paths.
const legacy=location.hash.match(/^#\/project\/([^/]+)/);
if(legacy)history.replaceState(null,'',`/project/${legacy[1]}/`);
const root=document.getElementById('root');
const app=<App initialPath={location.pathname} initialHash={location.hash}/>;
// Hydrate only when the served HTML was prerendered for this route (hosts may fall back to another page).
if(root.dataset.route&&normalizePath(root.dataset.route)===normalizePath(location.pathname))hydrateRoot(root,app);else createRoot(root).render(app);
