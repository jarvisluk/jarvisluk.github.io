import {existsSync,readFileSync} from 'node:fs';
import {caseStudies,elementPath} from '../src/caseStudies.js';
import {blockMedia} from '../src/components/blockMedia.js';
const dimensions=JSON.parse(readFileSync(new URL('../src/assetDimensions.json',import.meta.url)));
const failures=[];let count=0;
for(const [id,study] of Object.entries(caseStudies)){
 const assets=[{id:study.hero},...(study.showcase||[]),...study.sections.flatMap(s=>[...(s.blocks||[]).flatMap(blockMedia),...s.groups.flatMap(g=>g.items),...(s.references||[])])];
 for(const v of study.sections.flatMap(s=>(s.blocks||[]).filter(b=>b.type==='video')))assets.push({id:v.poster});
 const unique=new Set(assets.map(a=>a.id));count+=unique.size;
 for(const asset of assets){
  if(!existsSync(new URL(`../public${elementPath(asset.id)}`,import.meta.url)))failures.push(`${id}: missing ${asset.id}`);
  if(!dimensions[asset.id]?.width||!dimensions[asset.id]?.height)failures.push(`${id}: missing dimensions for ${asset.id}`);
 }
 for(const video of study.sections.flatMap(s=>s.videos||[])){for(const file of [video.src,video.poster])if(!existsSync(new URL(`../public${file}`,import.meta.url)))failures.push(`${id}: missing video asset ${file}`);}
 const sectionIds=new Set();
 for(const s of study.sections){
  if(sectionIds.has(s.id))failures.push(`${id}: duplicate chapter ${s.id}`);sectionIds.add(s.id);
  if(!s.title.zh||!s.title.en||!s.body.zh||!s.body.en)failures.push(`${id}: incomplete translation ${s.id}`);
  for(const asset of [...(s.blocks||[]).flatMap(blockMedia),...s.groups.flatMap(g=>g.items),...(s.references||[])])if(!asset.caption.zh||!asset.caption.en)failures.push(`${id}: incomplete caption ${asset.id}`);
 }
 console.log(`${id}: ${study.sections.length} chapters, ${unique.size} independent assets`);
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log(`PASS: ${count} project assets, all paths, dimensions and translations valid.`);
