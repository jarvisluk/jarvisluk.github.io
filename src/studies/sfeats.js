// SF Eats, rebuilt from the group's final presentation (SD5431 Group 2), which the portfolio reuses on pp. 1-10.
// Boards and stills come from scripts/build_sf_eats.py; every caption describes what the image shows.
import {t} from '../i18n.js';
const img=(id,caption,kind='photo')=>({id,caption,kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const board=(id,caption,layout='board')=>({type:'media',layout,items:[img(id,caption,'diagram')]});

export default {
 tone:{h:150,s:28,accent:'#b6e2c0',ink:'#2f8a4f'},
 accent:'#dcebdd',surface:'#ffffff',hero:'sf-board-key',heroStyle:'board',
 heroCaption:t('studies.sf-eats.heroCaption'),
 oneLiner:t('studies.sf-eats.oneLiner'),
 credit:t('studies.sf-eats.credit'),
 showcase:[
  img('sf-vehicle',t('studies.sf-eats.showcase.sf-vehicle.caption')),
  img('sf-still-home',t('studies.sf-eats.showcase.sf-still-home.caption')),
  img('sf-still-plan',t('studies.sf-eats.showcase.sf-still-plan.caption')),
  img('sf-still-track',t('studies.sf-eats.showcase.sf-still-track.caption')),
  img('sf-still-share',t('studies.sf-eats.showcase.sf-still-share.caption')),
  img('sf-still-bowl',t('studies.sf-eats.showcase.sf-still-bowl.caption'))],
 sections:[
  sec('films',t('studies.sf-eats.films.title'),t('studies.sf-eats.films.body'),[
   {type:'video',title:t('studies.sf-eats.films.blocks.0.title'),src:'/assets/video/sf-eats-concept.mp4',poster:'sf-still-share'},
  ]),
  sec('identity',t('studies.sf-eats.identity.title'),t('studies.sf-eats.identity.body'),[
   board('sf-board-mascot',t('studies.sf-eats.identity.blocks.0.items.sf-board-mascot.caption')),
   board('sf-board-community',t('studies.sf-eats.identity.blocks.1.items.sf-board-community.caption')),
  ]),
  sec('group',t('studies.sf-eats.group.title'),t('studies.sf-eats.group.body'),[
   board('sf-board-group',t('studies.sf-eats.group.blocks.0.items.sf-board-group.caption')),
  ]),
  sec('planning',t('studies.sf-eats.planning.title'),t('studies.sf-eats.planning.body'),[
   board('sf-board-plan',t('studies.sf-eats.planning.blocks.0.items.sf-board-plan.caption')),
  ]),
  sec('ordering',t('studies.sf-eats.ordering.title'),t('studies.sf-eats.ordering.body'),[
   board('sf-board-order',t('studies.sf-eats.ordering.blocks.0.items.sf-board-order.caption')),
  ],{steps:[t('studies.sf-eats.ordering.steps.0'),t('studies.sf-eats.ordering.steps.1'),t('studies.sf-eats.ordering.steps.2'),t('studies.sf-eats.ordering.steps.3')]}),
  sec('habits',t('studies.sf-eats.habits.title'),t('studies.sf-eats.habits.body'),[
   board('sf-board-streak',t('studies.sf-eats.habits.blocks.0.items.sf-board-streak.caption')),
  ]),
  sec('research',t('studies.sf-eats.research.title'),t('studies.sf-eats.research.body'),[
   board('sf-board-survey',t('studies.sf-eats.research.blocks.0.items.sf-board-survey.caption')),
   board('sf-board-stakeholders',t('studies.sf-eats.research.blocks.1.items.sf-board-stakeholders.caption')),
   board('sf-board-ideation',t('studies.sf-eats.research.blocks.2.items.sf-board-ideation.caption')),
  ],{points:[t('studies.sf-eats.research.points.0'),t('studies.sf-eats.research.points.1'),t('studies.sf-eats.research.points.2')]}),
  sec('service',t('studies.sf-eats.service.title'),t('studies.sf-eats.service.body'),[
   board('sf-board-blueprint',t('studies.sf-eats.service.blocks.0.items.sf-board-blueprint.caption')),
   board('sf-board-journey',t('studies.sf-eats.service.blocks.1.items.sf-board-journey.caption')),
   board('sf-board-scenario',t('studies.sf-eats.service.blocks.2.items.sf-board-scenario.caption')),
  ]),
 ],
};
