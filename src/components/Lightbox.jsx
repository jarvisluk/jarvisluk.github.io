import React,{useEffect,useRef,useState} from 'react';
import {copy} from '../data';
import {elementPath} from '../caseStudies';
import Arrow from './Arrow';
export default function Lightbox({items,index,setIndex,project,lang,onClose}) {
 const dialog=useRef(null),stage=useRef(null);
 const [zoom,setZoom]=useState(false);
 const item=items[index];
 useEffect(()=>{
  const previous=document.activeElement,element=dialog.current;
  element.showModal();
  element.querySelector('.close-lightbox')?.focus();
  const overflow=document.body.style.overflow;document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=overflow;element.close();previous?.focus();};
 },[]);
 useEffect(()=>{setZoom(false);if(stage.current)stage.current.scrollTo(0,0);},[index]);
 function keys(event){
  if(event.key==='ArrowLeft'&&index>0){event.preventDefault();setIndex(index-1);}
  if(event.key==='ArrowRight'&&index<items.length-1){event.preventDefault();setIndex(index+1);}
 }
 return <dialog className="lightbox asset-lightbox" ref={dialog} onCancel={onClose} onKeyDown={keys} aria-label={`${project.name} — ${item.caption[lang]}`}>
  <div className="lightbox-top"><span>{project.name}<small>{index+1} / {items.length}</small></span><div className="lightbox-tools"><button onClick={()=>setZoom(!zoom)} aria-pressed={zoom}>{zoom?(lang==='zh'?'适合屏幕':'Fit to screen'):(lang==='zh'?'放大细节':'Zoom in')}</button><button onClick={onClose} className="close-lightbox" autoFocus aria-label={copy.close[lang]}><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.5"/></svg></button></div></div>
  <div className={`lightbox-stage ${zoom?'is-zoomed':''}`} ref={stage}><img src={elementPath(item.id)} alt={item.caption[lang]}/></div>
  <p className="lightbox-caption">{item.caption[lang]}</p>
  <div className="lightbox-controls"><button disabled={index===0} onClick={()=>setIndex(index-1)}><Arrow direction="left"/>{lang==='zh'?'上一张':'Previous'}</button><span>{lang==='zh'?'使用左右方向键浏览':'Use arrow keys to browse'}</span><button disabled={index===items.length-1} onClick={()=>setIndex(index+1)}>{lang==='zh'?'下一张':'Next'}<Arrow/></button></div>
 </dialog>;
}
