// Matrix — Emergence Necessity, rebuilt from its laid-out portfolio PDF (six dark pages) and the installation video.
// Boards and stills come from scripts/build_matrix.py; every caption describes what the image shows.
import {t} from '../i18n.js';
const img=(id,caption,kind='photo')=>({id,caption,kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,dark:true,...extra});
const board=(id,caption,layout='board')=>({type:'media',layout,items:[img(id,caption,'diagram')]});

export default {
 tone:{h:205,s:30,accent:'#9fd1f2',ink:'#5aaee6'},
 accent:'#d9e8f1',surface:'#000000',theme:'dark',hero:'mx-hero',heroStyle:'board',
 heroCaption:t('studies.matrix.heroCaption'),
 oneLiner:t('studies.matrix.oneLiner'),
 credit:t('studies.matrix.credit'),
 showcase:[
  img('mx-still-blue',t('studies.matrix.showcase.mx-still-blue.caption')),
  img('mx-still-white',t('studies.matrix.showcase.mx-still-white.caption')),
  img('mx-still-hand',t('studies.matrix.showcase.mx-still-hand.caption')),
  img('mx-still-colour',t('studies.matrix.showcase.mx-still-colour.caption')),
  img('mx-still-violet',t('studies.matrix.showcase.mx-still-violet.caption')),
  img('mx-detail',t('studies.matrix.showcase.mx-detail.caption'))],
 sections:[
  sec('films',t('studies.matrix.films.title'),t('studies.matrix.films.body'),[
   {type:'video',title:t('studies.matrix.films.blocks.0.title'),youtube:'t3h_mF45gQY',bilibili:'BV1iyVYzBE4a',poster:'mx-still-blue'},
  ]),
  sec('question',t('studies.matrix.question.title'),t('studies.matrix.question.body'),[
   board('mx-board-origin',t('studies.matrix.question.blocks.0.items.mx-board-origin.caption')),
   board('mx-board-emergence',t('studies.matrix.question.blocks.1.items.mx-board-emergence.caption')),
  ]),
  sec('experience',t('studies.matrix.experience.title'),t('studies.matrix.experience.body'),[
   board('mx-board-final',t('studies.matrix.experience.blocks.0.items.mx-board-final.caption')),
  ]),
  sec('structure',t('studies.matrix.structure.title'),t('studies.matrix.structure.body'),[
   board('mx-board-structure',t('studies.matrix.structure.blocks.0.items.mx-board-structure.caption')),
  ],{steps:[t('studies.matrix.structure.steps.0'),t('studies.matrix.structure.steps.1'),t('studies.matrix.structure.steps.2'),t('studies.matrix.structure.steps.3')]}),
  sec('control',t('studies.matrix.control.title'),t('studies.matrix.control.body'),[
   board('mx-board-control',t('studies.matrix.control.blocks.0.items.mx-board-control.caption')),
  ],{steps:[t('studies.matrix.control.steps.0'),t('studies.matrix.control.steps.1'),t('studies.matrix.control.steps.2'),t('studies.matrix.control.steps.3')]}),
 ],
};
