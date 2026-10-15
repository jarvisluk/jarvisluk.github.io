// Bambu Lab, rebuilt from the group's final presentation (SD5412 "Untitled Fridays"), which the portfolio reuses on pp. 11-18.
// Boards and store stills come from scripts/build_bambu.py; every caption describes what the image shows.
// Interviewees and workshop participants stay anonymous: their photos and the workshop recap video are left out.
import {t} from '../i18n.js';
const img=(id,caption,kind='photo')=>({id,caption,kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const board=(id,caption,layout='board')=>({type:'media',layout,items:[img(id,caption,'diagram')]});

export default {
 tone:{h:138,s:24,accent:'#b8e6c0',ink:'#1f9a4b'},
 accent:'#dce7cd',surface:'#fefaf4',hero:'bb-board-concept',heroStyle:'board',
 heroCaption:t('studies.bambu-lab.heroCaption'),
 oneLiner:t('studies.bambu-lab.oneLiner'),
 credit:t('studies.bambu-lab.credit'),
 sections:[
  sec('films',t('studies.bambu-lab.films.title'),t('studies.bambu-lab.films.body'),[
   {type:'video',title:t('studies.bambu-lab.films.blocks.0.title'),src:'/assets/video/bambu-demo.mp4',poster:'bb-board-floor-after'},
  ]),
  sec('digital',t('studies.bambu-lab.digital.title'),t('studies.bambu-lab.digital.body'),[
   board('bb-board-features',t('studies.bambu-lab.digital.blocks.0.items.bb-board-features.caption')),
  ]),
  sec('assistant',t('studies.bambu-lab.assistant.title'),t('studies.bambu-lab.assistant.body'),[
   board('bb-board-chatbot',t('studies.bambu-lab.assistant.blocks.0.items.bb-board-chatbot.caption')),
  ]),
  sec('journey',t('studies.bambu-lab.journey.title'),t('studies.bambu-lab.journey.body'),[
   board('bb-board-floor-after',t('studies.bambu-lab.journey.blocks.0.items.bb-board-floor-after.caption')),
   board('bb-board-floor-before',t('studies.bambu-lab.journey.blocks.1.items.bb-board-floor-before.caption')),
  ]),
  sec('co-design',t('studies.bambu-lab.co-design.title'),t('studies.bambu-lab.co-design.body'),[
   board('bb-board-codesign',t('studies.bambu-lab.co-design.blocks.0.items.bb-board-codesign.caption')),
   board('bb-board-insights',t('studies.bambu-lab.co-design.blocks.1.items.bb-board-insights.caption')),
  ],{steps:[t('studies.bambu-lab.co-design.steps.0'),t('studies.bambu-lab.co-design.steps.1'),t('studies.bambu-lab.co-design.steps.2')]}),
  sec('research',t('studies.bambu-lab.research.title'),t('studies.bambu-lab.research.body'),[
   board('bb-board-goals',t('studies.bambu-lab.research.blocks.0.items.bb-board-goals.caption')),
   board('bb-board-stakeholders',t('studies.bambu-lab.research.blocks.1.items.bb-board-stakeholders.caption')),
   board('bb-board-painpoints',t('studies.bambu-lab.research.blocks.2.items.bb-board-painpoints.caption')),
  ],{points:[t('studies.bambu-lab.research.points.0'),t('studies.bambu-lab.research.points.1'),t('studies.bambu-lab.research.points.2')]}),
  sec('service',t('studies.bambu-lab.service.title'),t('studies.bambu-lab.service.body'),[
   board('bb-board-blueprint-1',t('studies.bambu-lab.service.blocks.0.items.bb-board-blueprint-1.caption')),
   board('bb-board-blueprint-2',t('studies.bambu-lab.service.blocks.1.items.bb-board-blueprint-2.caption')),
   board('bb-board-process',t('studies.bambu-lab.service.blocks.2.items.bb-board-process.caption')),
   board('bb-board-outcomes',t('studies.bambu-lab.service.blocks.3.items.bb-board-outcomes.caption')),
  ]),
 ],
};
