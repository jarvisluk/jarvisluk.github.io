import { t, locales } from './i18n.js';
const bi = (zh, en) => ({ zh, en });
// Home timeline, oldest first, with the (approximate) year each project was made.
// `lab` entries are side projects (labProjects below), ordered by repo creation date; they expand on hover.
export const timeline = [
 { id: 'matrix', year: 2023 }, { id: 'flexbench', year: 2024 }, { id: 'soundbricks', year: 2024 },
 { id: 'pawpals', year: 2025 }, { id: 'sf-eats', year: 2025 }, { id: 'just-a-2nd', year: 2025 },
 { id: 'gocus', year: 2025 }, { id: 'bambu-lab', year: 2025 },
 { lab: 'damage-sensor-tape', year: 2026 }, { lab: 'do-not-tamper', year: 2026 },
 { lab: 'splatoon-squid-codex-pet', year: 2026 }, { lab: 'codex-order-reset', year: 2026 }, { lab: 'remilia-codex-pet', year: 2026 },
 { lab: 'zzz-proton-fix', year: 2026 }, { lab: 'easyeda-pcb-design', year: 2026 }, { lab: 'dsh-projectless-session', year: 2026 }, { lab: 'dsh-session-index', year: 2026 },
 { id: 'web-style', year: 2026 }, { id: 'shokz', year: 2026 },
];
export const categories = [
 { id: 'all', label: t('categories.all') },
 { id: 'service', label: t('categories.service') },
 { id: 'digital', label: t('categories.digital') },
 { id: 'physical', label: t('categories.physical') },
];
export const projects = [
 {
  id: 'soundbricks', name: 'SoundBricks', cover: 'soundbricks', categories: ['physical', 'digital'], color: '#dedfd3', pages: [20,27],
  subtitle: t('projects.soundbricks.subtitle'),
  type: t('projects.soundbricks.type'),
  intro: t('projects.soundbricks.intro'),
  brief: t('projects.soundbricks.brief'),
  approach: t('projects.soundbricks.approach'),
  output: t('projects.soundbricks.output'),
  chapters: [ [20,t('projects.soundbricks.chapters.0')], [21,t('projects.soundbricks.chapters.1')], [23,t('projects.soundbricks.chapters.2')], [26,t('projects.soundbricks.chapters.3')] ],
 },
 {
  id:'pawpals',name:'PawPals',cover:'pawpals',categories:['service','physical','digital'],color:'#f2eabd',pages:[42,60],
  subtitle:t('projects.pawpals.subtitle'),
  type:t('projects.pawpals.type'),
  intro:t('projects.pawpals.intro'),
  brief:t('projects.pawpals.brief'),
  approach:t('projects.pawpals.approach'),
  output:t('projects.pawpals.output'),
  chapters:[[42,t('projects.pawpals.chapters.0')],[44,t('projects.pawpals.chapters.1')],[48,t('projects.pawpals.chapters.2')],[52,t('projects.pawpals.chapters.3')],[57,t('projects.pawpals.chapters.4')]],
 },
 {
  id:'sf-eats',name:'SF Eats',cover:'sf-eats-cover',categories:['service','digital'],color:'#1f1a16',pages:[1,10],
  subtitle:t('projects.sf-eats.subtitle'),
  type:t('projects.sf-eats.type'),
  intro:t('projects.sf-eats.intro'),
  brief:t('projects.sf-eats.brief'),
  approach:t('projects.sf-eats.approach'),
  output:t('projects.sf-eats.output'),
  chapters:[[1,t('projects.sf-eats.chapters.0')],[3,t('projects.sf-eats.chapters.1')],[5,t('projects.sf-eats.chapters.2')],[7,t('projects.sf-eats.chapters.3')]],
 },
 {
  id:'flexbench',name:'FlexBench',cover:'flexbench',categories:['service','physical'],color:'#ded7cb',pages:[28,35],
  subtitle:t('projects.flexbench.subtitle'),
  type:t('projects.flexbench.type'),
  intro:t('projects.flexbench.intro'),
  brief:t('projects.flexbench.brief'),
  approach:t('projects.flexbench.approach'),
  output:t('projects.flexbench.output'),
  chapters:[[28,t('projects.flexbench.chapters.0')],[29,t('projects.flexbench.chapters.1')],[32,t('projects.flexbench.chapters.2')],[34,t('projects.flexbench.chapters.3')]],
 },
 {
  id:'bambu-lab',name:'Bambu Lab',cover:'bambu-concept',categories:['service','digital'],color:'#dce7cd',pages:[11,18],
  subtitle:t('projects.bambu-lab.subtitle'),
  type:t('projects.bambu-lab.type'),
  intro:t('projects.bambu-lab.intro'),
  brief:t('projects.bambu-lab.brief'),
  approach:t('projects.bambu-lab.approach'),
  output:t('projects.bambu-lab.output'),
  chapters:[[11,t('projects.bambu-lab.chapters.0')],[13,t('projects.bambu-lab.chapters.1')],[15,t('projects.bambu-lab.chapters.2')]],
 },
 {
  id:'matrix',name:'Matrix',cover:'matrix',categories:['physical'],color:'#121b2a',pages:[36,41],
  subtitle:t('projects.matrix.subtitle'),
  type:t('projects.matrix.type'),
  intro:t('projects.matrix.intro'),
  brief:t('projects.matrix.brief'),
  approach:t('projects.matrix.approach'),
  output:t('projects.matrix.output'),
  chapters:[[36,t('projects.matrix.chapters.0')],[37,t('projects.matrix.chapters.1')],[39,t('projects.matrix.chapters.2')],[41,t('projects.matrix.chapters.3')]],
 },
 {
  id:'just-a-2nd',name:'Just A 2nd',cover:'just-a-2nd-cover',categories:['digital'],color:'#f1e0cc',pages:[19,19],
  subtitle:t('projects.just-a-2nd.subtitle'),
  type:t('projects.just-a-2nd.type'),
  intro:t('projects.just-a-2nd.intro'),
  brief:t('projects.just-a-2nd.brief'),
  approach:t('projects.just-a-2nd.approach'),
  output:t('projects.just-a-2nd.output'),
  chapters:[[19,t('projects.just-a-2nd.chapters.0')]],
 },
 {
  id:'gocus',name:'Gocus',cover:'gocus-cover',categories:['digital'],color:'#121212',pages:[],
  subtitle:t('projects.gocus.subtitle'),
  type:t('projects.gocus.type'),
  intro:t('projects.gocus.intro'),
  brief:t('projects.gocus.brief'),
  approach:t('projects.gocus.approach'),
  output:t('projects.gocus.output'),
  chapters:[],
 },
 {
  id:'web-style',name:'Web Style Visualisation',cover:'web-style-cover',categories:['digital'],color:'#e8edf5',pages:[],
  subtitle:t('projects.web-style.subtitle'),
  type:t('projects.web-style.type'),
  intro:t('projects.web-style.intro'),
  brief:t('projects.web-style.brief'),
  approach:t('projects.web-style.approach'),
  output:t('projects.web-style.output'),
  chapters:[],
 },
 {
  id:'shokz',name:'OpenSwim Pro 2 UX Design',cover:'shokz-cover',categories:['digital'],color:'#e9f0f5',pages:[],
  subtitle:t('projects.shokz.subtitle'),
  type:t('projects.shokz.type'),
  intro:t('projects.shokz.intro'),
  brief:t('projects.shokz.brief'),
  approach:t('projects.shokz.approach'),
  output:t('projects.shokz.output'),
  chapters:[],
 },
];
// Interface text: every key under "ui" in the language packs.
export const copy = Object.fromEntries(Object.keys(locales.zh.ui).map(k => [k, t(`ui.${k}`)]));
const gh = repo => `https://github.com/jarvisluk/${repo}`;
// Side projects shown as cards in the Lab section, ordered by quality; repos in the same series share one card.
export const labProjects = [
 {
  id:'death-stranding', series:t('lab.death-stranding.series'), tags:['Web','SVG'],
  media:[{src:'damage-sensor-tape',alt:t('lab.death-stranding.media.0.alt'),cover:true},{src:'do-not-tamper',alt:t('lab.death-stranding.media.1.alt'),cover:true}],
  items:[
   {id:'damage-sensor-tape',date:'2026-04-07',short:'Sensor Tape',thumb:'damage-sensor-tape',name:'Damage Sensor Tape',repo:gh('damage-sensor-tape'),demo:'https://damage-sensor-tape.pages.dev/',stars:6,text:t('lab.death-stranding.items.damage-sensor-tape.text')},
   {id:'do-not-tamper',date:'2026-04-21',short:'Do Not Tamper',thumb:'do-not-tamper',name:'Do Not Tamper',repo:gh('Do-Not-Temper'),demo:'https://do-not-tamper.pages.dev/',text:t('lab.death-stranding.items.do-not-tamper.text')},
  ],
 },
 {
  id:'easyeda', series:t('lab.easyeda.series'), icons:['easyeda'], tags:['EasyEDA Pro','PCB'],
  items:[
   {id:'easyeda-pcb-design',date:'2026-08-10',short:'EasyEDA Skill',icon:'easyeda',name:'EasyEDA PCB Design',repo:gh('easyeda-pcb-design'),text:t('lab.easyeda.items.easyeda-pcb-design.text')},
  ],
 },
 {
  id:'dsh', series:t('lab.dsh.series'), icons:['deepseek'], tags:['DSH','Plugin'], wide:true,
  media:[{src:bi('dsh-projectless-zh','dsh-projectless-en'),alt:t('lab.dsh.media.0.alt'),cover:true}],
  items:[
   {id:'dsh-projectless-session',date:'2026-08-18',short:'Projectless',thumb:bi('dsh-projectless-zh','dsh-projectless-en'),name:'Projectless Session',repo:gh('dsh-projectless-session'),text:t('lab.dsh.items.dsh-projectless-session.text')},
   {id:'dsh-session-index',date:'2026-08-19',short:'Session Index',icon:'deepseek',name:'Session Index',repo:gh('dsh-session-index-plugin'),text:t('lab.dsh.items.dsh-session-index.text')},
  ],
 },
 {
  id:'codex-pets', series:t('lab.codex-pets.series'), icons:['codex'], tags:['Codex','Sprite'],
  media:[{src:'remilia-pet',alt:t('lab.codex-pets.media.0.alt')},{src:'squid-pet',alt:t('lab.codex-pets.media.1.alt'),pixel:true}],
  items:[
   {id:'remilia-codex-pet',date:'2026-07-29',short:'Remilia',thumb:'remilia-pet',name:'Remilia Codex Pet',repo:gh('remilia-codex-pet'),stars:12,text:t('lab.codex-pets.items.remilia-codex-pet.text')},
   {id:'splatoon-squid-codex-pet',date:'2026-07-21',short:'Squid',thumb:'squid-pet',pixel:true,name:'Splatoon Squid Codex Pet',repo:gh('splatoon-squid-codex-pet'),text:t('lab.codex-pets.items.splatoon-squid-codex-pet.text')},
  ],
 },
 {
  id:'fixes', series:t('lab.fixes.series'), icons:['steamdeck','codex'], tags:['Shell','Steam Deck','macOS'],
  items:[
   {id:'zzz-proton-fix',date:'2026-08-06',short:'ZZZ Fix',icon:'steamdeck',name:'ZZZ Proton 11 Fix',repo:gh('zzz-steam-deck-proton11-fix'),text:t('lab.fixes.items.zzz-proton-fix.text')},
   {id:'codex-order-reset',date:'2026-07-21',short:'Order Reset',icon:'codex',name:'Codex Project Order Reset',repo:gh('codex-project-order-reset'),text:t('lab.fixes.items.codex-order-reset.text')},
  ],
 },
];
// Every side project as one timeline entry, keyed by its id.
export const labItems = labProjects.flatMap(g=>g.items.map(item=>({...item,series:g.series})));
export const githubUrl='https://github.com/jarvisluk?tab=repositories&q=&type=&language=&sort=stargazers';
