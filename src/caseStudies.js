import dimensions from './assetDimensions.json' with {type:'json'};
import {enrichStudies} from './libraryStudies.js';
import flexbench from './studies/flexbench.js';
import soundbricks from './studies/soundbricks.js';
import pawpals from './studies/pawpals.js';
import sfeats from './studies/sfeats.js';
import bambu from './studies/bambu.js';
import matrix from './studies/matrix.js';
import justa2nd from './studies/justa2nd.js';
import gocus from './studies/gocus.js';
import shokz from './studies/shokz.js';
import webstyle from './studies/webstyle.js';
// Reflowed case studies. Text is native HTML; media are independent visual elements.
const b=(zh,en)=>({zh,en});
const img=(id,zh,en,kind='photo')=>({id:typeof id==='number'?`x${id}`:id,caption:b(zh,en),kind});
const imgs=(ids,zh,en,kind='photo')=>ids.map((id,i)=>img(id,`${zh} ${String(i+1).padStart(2,'0')}`,`${en} ${String(i+1).padStart(2,'0')}`,kind));
const group=(layout,items)=>({layout,items});
const sec=(id,title,body,groups,extra={})=>({id,title,body,groups,...extra});
export const caseStudies={
 'soundbricks':soundbricks,
 'flexbench':flexbench,
 'matrix':matrix,
 'just-a-2nd':justa2nd,
 'gocus':gocus,
 'shokz':shokz,
 'web-style':webstyle,
 'sf-eats':sfeats,
 'bambu-lab':bambu,
 'pawpals':pawpals
};
enrichStudies(caseStudies);
// `v` is a content hash written by the build scripts, so regenerated images are not served from a stale cache.
export const elementPath=id=>`/assets/elements/${id}${id.endsWith('.svg')?'':'.webp'}${dimensions[id]?.v?`?v=${dimensions[id].v}`:''}`;
