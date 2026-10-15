// Just A 2nd, rebuilt from the App Store listing (id6756837888, v1.2), portfolio p. 19 and the app's source
// (github.com/jarvisluk/pitchlab-swift). Media come from scripts/build_just_a_2nd.py; every caption describes what the image shows.
import {t} from '../i18n.js';
const img=(id,caption,kind='photo')=>({id,caption,kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const phones=(...items)=>({type:'media',layout:'phones',items:items.map(([id,caption])=>img(id,caption,'screen'))});
const tile=(id,caption,layout='board')=>({type:'media',layout,items:[img(id,caption,'diagram')]});

export default {
 tone:{h:22,s:30,accent:'#ffc7a3',ink:'#de6f2e'},
 accent:'#ffe1cc',surface:'#ffffff',hero:'j2-board',heroStyle:'board',
 heroCaption:t('studies.just-a-2nd.heroCaption'),
 oneLiner:t('studies.just-a-2nd.oneLiner'),
 credit:t('studies.just-a-2nd.credit'),
 showcase:[
  img('j2-show-trio',t('studies.just-a-2nd.showcase.j2-show-trio.caption')),
  img('j2-show-feedback',t('studies.just-a-2nd.showcase.j2-show-feedback.caption')),
  img('j2-show-dark',t('studies.just-a-2nd.showcase.j2-show-dark.caption')),
  img('j2-show-ipad',t('studies.just-a-2nd.showcase.j2-show-ipad.caption')),
  img('j2-show-mac',t('studies.just-a-2nd.showcase.j2-show-mac.caption')),
  img('j2-show-settings',t('studies.just-a-2nd.showcase.j2-show-settings.caption'))],
 sections:[
  sec('practice',t('studies.just-a-2nd.practice.title'),t('studies.just-a-2nd.practice.body'),[
   phones(['j2-ui-listen',t('studies.just-a-2nd.practice.blocks.0.items.j2-ui-listen.caption')],['j2-ui-correct',t('studies.just-a-2nd.practice.blocks.0.items.j2-ui-correct.caption')],['j2-ui-wrong',t('studies.just-a-2nd.practice.blocks.0.items.j2-ui-wrong.caption')]),
  ],{steps:[t('studies.just-a-2nd.practice.steps.0'),t('studies.just-a-2nd.practice.steps.1'),t('studies.just-a-2nd.practice.steps.2')]}),
  sec('sound',t('studies.just-a-2nd.sound.title'),t('studies.just-a-2nd.sound.body'),[
  ],{points:[t('studies.just-a-2nd.sound.points.0'),t('studies.just-a-2nd.sound.points.1'),t('studies.just-a-2nd.sound.points.2')]}),
  sec('habit',t('studies.just-a-2nd.habit.title'),t('studies.just-a-2nd.habit.body'),[
   phones(['j2-ui-home',t('studies.just-a-2nd.habit.blocks.0.items.j2-ui-home.caption')],['j2-ui-progress',t('studies.just-a-2nd.habit.blocks.0.items.j2-ui-progress.caption')],['j2-ui-stats',t('studies.just-a-2nd.habit.blocks.0.items.j2-ui-stats.caption')]),
  ]),
  sec('mistakes',t('studies.just-a-2nd.mistakes.title'),t('studies.just-a-2nd.mistakes.body'),[
   phones(['j2-ui-mistakes',t('studies.just-a-2nd.mistakes.blocks.0.items.j2-ui-mistakes.caption')],['j2-ui-settings',t('studies.just-a-2nd.mistakes.blocks.0.items.j2-ui-settings.caption')]),
  ]),
  sec('platforms',t('studies.just-a-2nd.platforms.title'),t('studies.just-a-2nd.platforms.body'),[
   {type:'media',layout:'pair',items:[img('j2-show-ipad',t('studies.just-a-2nd.platforms.blocks.0.items.j2-show-ipad.caption')),img('j2-show-mac',t('studies.just-a-2nd.platforms.blocks.0.items.j2-show-mac.caption'))]},
   phones(['j2-ui-dark-home',t('studies.just-a-2nd.platforms.blocks.1.items.j2-ui-dark-home.caption')],['j2-ui-dark-listen',t('studies.just-a-2nd.platforms.blocks.1.items.j2-ui-dark-listen.caption')],['j2-ui-dark-wrong',t('studies.just-a-2nd.platforms.blocks.1.items.j2-ui-dark-wrong.caption')]),
  ]),
  sec('build',t('studies.just-a-2nd.build.title'),t('studies.just-a-2nd.build.body'),[
  ],{points:[t('studies.just-a-2nd.build.points.0'),t('studies.just-a-2nd.build.points.1'),t('studies.just-a-2nd.build.points.2')]}),
 ],
};
