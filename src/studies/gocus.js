// Gocus, built from the official site (gocus.pages.dev), the GitHub repository (jarvisluk/Gocus, v0.1.12) and its releases.
// The panel, component library and guidelines are live pages in public/embeds/gocus (see scripts/gocus-demo/);
// the only bitmap is the hero board (scripts/gocus-demo/hero.html). The icon breakdown (public/embeds/gocus/icon) uses the repository's original SVG geometry.
import {t} from '../i18n.js';
const img=(id,caption,kind='diagram')=>({id,caption,kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,dark:true,...extra});
const EMBED='/embeds/gocus/panel/';

export default {
 tone:{h:40,s:20,accent:'#f2b431',ink:'#f2b431'},
 accent:'#f2b431',surface:'#121212',theme:'dark',hero:'gc-site-hero',heroStyle:'board',
 // The first screen is the working panel itself (Gocus 0.1.12 on a recorded snapshot of its repository); the site's
 // two download buttons sit with the title and description above it.
 heroEmbed:{src:`${EMBED}index.html`,fixed:true,width:342,height:760,title:t('studies.gocus.heroEmbed.title')},
 actions:[
  {href:'https://github.com/jarvisluk/gocus/releases/latest',label:t('studies.gocus.actions.0.label'),icon:'download',primary:true},
  {href:'https://github.com/jarvisluk/gocus/releases',label:t('studies.gocus.actions.1.label'),icon:'github'},
 ],
 heroCaption:t('studies.gocus.heroCaption'),
 oneLiner:t('studies.gocus.oneLiner'),
 credit:t('studies.gocus.credit'),
 sections:[
  sec('context',t('studies.gocus.context.title'),t('studies.gocus.context.body'),[
  ],{points:[t('studies.gocus.context.points.0'),t('studies.gocus.context.points.1'),t('studies.gocus.context.points.2')]}),
  sec('graph',t('studies.gocus.graph.title'),t('studies.gocus.graph.body'),[
   {type:'embed',src:'/embeds/gocus/code/index.html?part=graph',height:900,title:t('studies.gocus.graph.blocks.0.title')},
  ]),
  sec('build',t('studies.gocus.build.title'),t('studies.gocus.build.body'),[
   {type:'embed',src:'/embeds/gocus/code/index.html?part=repo',height:700,title:t('studies.gocus.build.blocks.0.title')},
 
  ],{points:[t('studies.gocus.build.points.0'),t('studies.gocus.build.points.1'),t('studies.gocus.build.points.2')]}),
  sec('library',t('studies.gocus.library.title'),t('studies.gocus.library.body'),[
   {type:'embed',src:`${EMBED}library.html`,height:1400,title:t('studies.gocus.library.blocks.0.title')},
  ]),
  sec('guidelines',t('studies.gocus.guidelines.title'),t('studies.gocus.guidelines.body'),[
   {type:'embed',src:`${EMBED}guidelines.html`,height:1000,title:t('studies.gocus.guidelines.blocks.0.title')},
  ]),
  sec('identity',t('studies.gocus.identity.title'),t('studies.gocus.identity.body'),[
   {type:'embed',src:'/embeds/gocus/icon/index.html',height:1500,title:t('studies.gocus.identity.blocks.0.title')},
  ],{navLabel:t('studies.gocus.identity.navLabel')}),
 ],
};
