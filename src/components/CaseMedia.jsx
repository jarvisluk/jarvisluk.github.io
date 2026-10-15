import React from 'react';
import {elementPath} from '../caseStudies';
import {copy} from '../data';
import {format} from '../i18n';
import dimensions from '../assetDimensions.json';
export default function CaseMedia({item,lang,onOpen,eager=false}) {
 const size=dimensions[item.id]||{width:1000,height:700};
 return <figure className={`case-media media-${item.kind}`}>
  <button className="asset-button" onClick={()=>onOpen(item)} aria-label={format(copy.enlarge[lang],{caption:item.caption[lang]})}>
   <img src={elementPath(item.id)} alt={item.caption[lang]} width={size.width} height={size.height} loading={eager?'eager':'lazy'} decoding="async"/>
   <span className="asset-zoom" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" stroke="currentColor" strokeWidth="1.5"/></svg></span>
  </button>
  <figcaption>{item.caption[lang]}</figcaption>
 </figure>;
}
