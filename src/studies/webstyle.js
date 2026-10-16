// Web Style Visualisation, from the live studio (jarvisluk.github.io/Web_Style_Visualization) and its repository
// (jarvisluk/Web_Style_Visualization, "Studio redesign, WebMCP tools, and Chinese typography", Oct 2026).
// The blocks embed the live site with ?style= presets, plus a component sheet lifted from the studio (scripts/webstyle-demo/library.mjs
// -> public/embeds/webstyle); the only bitmap is the hero (a capture of the studio in Liquid Glass).
import {t} from '../i18n.js';
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const SITE='https://jarvisluk.github.io/Web_Style_Visualization/';
const live=(style,height,text)=>({type:'embed',site:true,src:`${SITE}?style=${style}`,height,title:text,caption:text,href:`${SITE}?style=${style}`});

export default {
 tone:{h:220,s:30,accent:'#cfe0ff',ink:'#0a6fe0'},
 accent:'#e8edf5',surface:'#ffffff',hero:'ws-hero',heroStyle:'board',
 heroCaption:t('studies.web-style.heroCaption'),
 oneLiner:t('studies.web-style.oneLiner'),
 credit:t('studies.web-style.credit'),
 actionColor:['#0a84ff','#ffffff'],
 actions:[
  {href:SITE,label:t('studies.web-style.actions.0.label'),icon:'external',primary:true},
  {href:'https://github.com/jarvisluk/Web_Style_Visualization',label:t('studies.web-style.actions.1.label'),icon:'github'},
 ],
 sections:[
  sec('context',t('studies.web-style.context.title'),t('studies.web-style.context.body'),[
   live('liquid-glass',860,t('studies.web-style.context.blocks.0.title')),
  ],{points:[t('studies.web-style.context.points.0'),t('studies.web-style.context.points.1'),t('studies.web-style.context.points.2')]}),
  sec('canvas',t('studies.web-style.canvas.title'),t('studies.web-style.canvas.body'),[
   live('editorial',860,t('studies.web-style.canvas.blocks.0.title')),
  ]),
  sec('studio',t('studies.web-style.studio.title'),t('studies.web-style.studio.body'),[],{points:[t('studies.web-style.studio.points.0'),t('studies.web-style.studio.points.1'),t('studies.web-style.studio.points.2')]}),
  sec('library',t('studies.web-style.library.title'),t('studies.web-style.library.body'),[
   {type:'embed',src:'/embeds/webstyle/library.html',height:1700,title:t('studies.web-style.library.blocks.0.title')},
  ]),
  sec('agents',t('studies.web-style.agents.title'),t('studies.web-style.agents.body'),[
   {type:'gateways',
    // Chips are the real tool, method and parameter names, so they stay untranslated.
    items:[
     {chips:['list_styles','get_current_style','get_variable_definitions','apply_style','set_variables','reset_style','export_css','get_share_url']},
     {chips:['applyStyle()','applyVariables()','exportCSS()']},
     {chips:['?style=','?variables=']},
     {chips:['SKILL.md']},
    ].map((x,i)=>({...x,name:t(`studies.web-style.agents.blocks.0.items.${i}.name`),who:t(`studies.web-style.agents.blocks.0.items.${i}.who`),note:t(`studies.web-style.agents.blocks.0.items.${i}.note`)}))},
  ]),
 ],
};
