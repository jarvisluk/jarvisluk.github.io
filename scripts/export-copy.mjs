// Dump every bilingual {zh,en} string on the site, in reading order, for copy review.
// Usage: node scripts/export-copy.mjs > copy.json
import {projects,copy,categories} from '../src/data.js';
import {caseStudies} from '../src/caseStudies.js';
const KEY={title:'标题',body:'正文',caption:'图注',name:'名称',subtitle:'副标题',type:'类型',intro:'简介',brief:'问题',approach:'路径',output:'产出',oneLiner:'一句话介绍',heroCaption:'主图图注',showcase:'成品图墙',sections:'章节',blocks:'模块',groups:'图组',items:'条目',points:'要点',steps:'步骤',references:'参考资料',text:'文字',label:'标签',note:'注释',conclusion:'结论',who:'受访者',tag:'标签',facts:'信息',pains:'痛点',needs:'需求',detail:'说明',space:'空间',tools:'工具',traffic:'人流',works:'适合工作',role:'角色',app:'App 功能',phases:'阶段',lanes:'泳道',cells:'格子',line:'分隔线',module:'模块名',specs:'规格',roles:'角色',scene:'场景图',screens:'界面',chapters:'PDF 章节',need:'需要工坊',place:'最适合',diagram:'图',map:'地图',images:'图片',image:'图片',videos:'视频'};
const rows=[];
function walk(v,path,sheet,ctx,inArray=false){
 if(!v||typeof v!=='object')return;
 if(typeof v.zh==='string'&&typeof v.en==='string'){rows.push({sheet,path:path.join('.'),where:ctx.concat(path.slice(-1).map(k=>KEY[k]||k)).join(' · '),zh:v.zh,en:v.en});return;}
 const entries=Array.isArray(v)?v.map((x,i)=>[i,x]):Object.entries(v);
 for(const [k,x] of entries){
  let c=ctx;
  if(Array.isArray(v)&&!inArray){
   const tag=x&&typeof x==='object'?(x.id&&!x.caption?`#${x.id}`:x.id?x.id:''):'';
   c=ctx.concat(`${String(k+1).padStart(2,'0')}${tag?' '+tag:''}`);
  }else if(KEY[k]&&x&&typeof x==='object'&&!(typeof x.zh==='string'))c=ctx.concat(KEY[k]);
  walk(x,[...path,k],sheet,c,Array.isArray(v)&&Array.isArray(x));
 }
}
walk(copy,['copy'],'全站界面',['界面文字']);
walk(categories,['categories'],'全站界面',['分类']);
for(const p of projects){
 const {id,...meta}=p;
 walk(meta,['project',id],p.name,['项目信息']);
 const s=caseStudies[id];
 if(s)walk(s,['study',id],p.name,[]);
}
console.log(JSON.stringify(rows));
