// SoundBricks, rebuilt from the laid-out portfolio pages (Lu_Junrong_Portfolio.pdf, pp. 20–27) and the NAS originals.
// Media come from scripts/build_soundbricks.py; every caption describes what the image shows.
// Children and teachers at the centre stay anonymous: no faces, names or institution marks.
import {t} from '../i18n.js';
const img=(id,caption,kind='photo')=>({id,caption,kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const board=(id,caption,layout='board')=>({type:'media',layout,items:[img(id,caption,'diagram')]});

export default {
 tone:{h:18,s:22,accent:'#f8c3a6',ink:'#c4613d'},
 accent:'#e3eedd',surface:'#fffcf9',hero:'sb-hero',heroStyle:'photo',
 heroCaption:t('studies.soundbricks.heroCaption'),
 oneLiner:t('studies.soundbricks.oneLiner'),
 credit:t('studies.soundbricks.credit'),
 showcase:[
  img('sb-towers',t('studies.soundbricks.showcase.sb-towers.caption')),
  img('sb-play-469',t('studies.soundbricks.showcase.sb-play-469.caption')),
  img('sb-houses',t('studies.soundbricks.showcase.sb-houses.caption')),
  img('sb-glow',t('studies.soundbricks.showcase.sb-glow.caption')),
  img('sb-play-149',t('studies.soundbricks.showcase.sb-play-149.caption')),
  img('sb-five',t('studies.soundbricks.showcase.sb-five.caption')),
  img('sb-hand',t('studies.soundbricks.showcase.sb-hand.caption')),
  img('sb-app-bricks',t('studies.soundbricks.showcase.sb-app-bricks.caption'))],
 sections:[
  sec('outcome',t('studies.soundbricks.outcome.title'),t('studies.soundbricks.outcome.body'),[
   {type:'media',layout:'editorial',items:[
    img('sb-set',t('studies.soundbricks.outcome.blocks.0.items.sb-set.caption')),
    img('sb-types',t('studies.soundbricks.outcome.blocks.0.items.sb-types.caption')),
    img('sb-base',t('studies.soundbricks.outcome.blocks.0.items.sb-base.caption'))]},
   {type:'media',layout:'gallery',items:[
    img('sb-play-213',t('studies.soundbricks.outcome.blocks.1.items.sb-play-213.caption')),
    img('sb-play-197',t('studies.soundbricks.outcome.blocks.1.items.sb-play-197.caption')),
    img('sb-play-293',t('studies.soundbricks.outcome.blocks.1.items.sb-play-293.caption')),
    img('sb-play-245',t('studies.soundbricks.outcome.blocks.1.items.sb-play-245.caption'))]},
   board('sb-board-phones',t('studies.soundbricks.outcome.blocks.2.items.sb-board-phones.caption')),
   {type:'media',layout:'pair',items:[
    img('sb-patterns',t('studies.soundbricks.outcome.blocks.3.items.sb-patterns.caption')),
    img('sb-pattern-book',t('studies.soundbricks.outcome.blocks.3.items.sb-pattern-book.caption'))]},
  ]),
  sec('films',t('studies.soundbricks.films.title'),t('studies.soundbricks.films.body'),[
   {type:'video',title:t('studies.soundbricks.films.blocks.0.title'),youtube:'G_39gM8YMLA',bilibili:'BV1QdVYzcEyg',poster:'sb-poster-making'},
  ]),
  sec('research',t('studies.soundbricks.research.title'),t('studies.soundbricks.research.body'),[
   board('sb-board-background',t('studies.soundbricks.research.blocks.0.items.sb-board-background.caption')),
   board('sb-board-field',t('studies.soundbricks.research.blocks.1.items.sb-board-field.caption')),
   {type:'quotes',items:[
    {text:t('studies.soundbricks.research.blocks.2.items.0.text'),who:t('studies.soundbricks.research.blocks.2.items.0.who'),tag:t('studies.soundbricks.research.blocks.2.items.0.tag')},
    {text:t('studies.soundbricks.research.blocks.2.items.1.text'),who:t('studies.soundbricks.research.blocks.2.items.1.who'),tag:t('studies.soundbricks.research.blocks.2.items.1.tag')},
    {text:t('studies.soundbricks.research.blocks.2.items.2.text'),who:t('studies.soundbricks.research.blocks.2.items.2.who'),tag:t('studies.soundbricks.research.blocks.2.items.2.tag')},
   ]},
   board('sb-board-toys',t('studies.soundbricks.research.blocks.3.items.sb-board-toys.caption')),
  ]),
  sec('interaction',t('studies.soundbricks.interaction.title'),t('studies.soundbricks.interaction.body'),[
   board('sb-board-concept',t('studies.soundbricks.interaction.blocks.0.items.sb-board-concept.caption'),'board narrow'),
  ]),
  sec('prototype',t('studies.soundbricks.prototype.title'),t('studies.soundbricks.prototype.body'),[
   board('sb-board-prototype',t('studies.soundbricks.prototype.blocks.0.items.sb-board-prototype.caption')),
   {type:'media',layout:'gallery',items:[
    img('sb-proc-acrylic',t('studies.soundbricks.prototype.blocks.1.items.sb-proc-acrylic.caption')),
    img('sb-proc-shell',t('studies.soundbricks.prototype.blocks.1.items.sb-proc-shell.caption')),
    img('sb-proc-circuit',t('studies.soundbricks.prototype.blocks.1.items.sb-proc-circuit.caption')),
    img('sb-proc-base',t('studies.soundbricks.prototype.blocks.1.items.sb-proc-base.caption')),
    img('sb-proc-wiring',t('studies.soundbricks.prototype.blocks.1.items.sb-proc-wiring.caption')),
    img('sb-proc-reading',t('studies.soundbricks.prototype.blocks.1.items.sb-proc-reading.caption'))]},
  ]),
  sec('digital',t('studies.soundbricks.digital.title'),t('studies.soundbricks.digital.body'),[
   board('sb-board-app',t('studies.soundbricks.digital.blocks.0.items.sb-board-app.caption')),
  ]),
  sec('testing',t('studies.soundbricks.testing.title'),t('studies.soundbricks.testing.body'),[
   board('sb-board-test-1',t('studies.soundbricks.testing.blocks.0.items.sb-board-test-1.caption')),
   board('sb-board-test-2',t('studies.soundbricks.testing.blocks.1.items.sb-board-test-2.caption')),
  ]),
 ],
};
