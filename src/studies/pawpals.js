// PawPals, rebuilt from the laid-out deck (Figma 毕设开题汇报 Page 2, exported as PawPals.pdf) and the NAS originals.
// Media come from scripts/build_pawpals.py; every caption describes what the image shows.
import {t} from '../i18n.js';
const img=(id,caption,kind='photo')=>({id,caption,kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const board=(id,caption,layout='board')=>({type:'media',layout,items:[img(id,caption,'diagram')]});

export default {
 tone:{h:42,s:26,accent:'#f6d878',ink:'#9c7a1c'},
 accent:'#fff3cf',hero:'pp-hero',heroStyle:'photo',
 heroCaption:t('studies.pawpals.heroCaption'),
 oneLiner:t('studies.pawpals.oneLiner'),
 credit:t('studies.pawpals.credit'),
 // Finished results first; the process follows in the chapters below.
 showcase:[
  img('pp-station-cluster',t('studies.pawpals.showcase.pp-station-cluster.caption')),
  img('pp-real-collar',t('studies.pawpals.showcase.pp-real-collar.caption')),
  img('pp-cat-collar',t('studies.pawpals.showcase.pp-cat-collar.caption')),
  img('pp-pcbs',t('studies.pawpals.showcase.pp-pcbs.caption')),
  img('pp-table-graphics',t('studies.pawpals.showcase.pp-table-graphics.caption')),
  img('pp-logo-panel',t('studies.pawpals.showcase.pp-logo-panel.caption')),
  img('pp-app-mock',t('studies.pawpals.showcase.pp-app-mock.caption'),'screen'),
  img('pp-collar-close',t('studies.pawpals.showcase.pp-collar-close.caption'))],
 sections:[
  sec('exhibition',t('studies.pawpals.exhibition.title'),t('studies.pawpals.exhibition.body'),[
   {type:'media',layout:'wide',items:[img('pp-ex-wide',t('studies.pawpals.exhibition.blocks.0.items.pp-ex-wide.caption'))]},
   {type:'media',layout:'gallery',items:[
    img('pp-ex-side',t('studies.pawpals.exhibition.blocks.1.items.pp-ex-side.caption')),
    img('pp-ex-cat',t('studies.pawpals.exhibition.blocks.1.items.pp-ex-cat.caption')),
    img('pp-ex-table',t('studies.pawpals.exhibition.blocks.1.items.pp-ex-table.caption')),
    img('pp-ex-stamps',t('studies.pawpals.exhibition.blocks.1.items.pp-ex-stamps.caption')),
    img('pp-ex-lid',t('studies.pawpals.exhibition.blocks.1.items.pp-ex-lid.caption')),
    img('pp-ex-paws',t('studies.pawpals.exhibition.blocks.1.items.pp-ex-paws.caption'))]},
  ]),
  sec('films',t('studies.pawpals.films.title'),t('studies.pawpals.films.body'),[
   {type:'video',title:t('studies.pawpals.films.blocks.0.title'),src:'/assets/video/pawpals-demo.mp4',poster:'pp-poster-demo'},
   {type:'video',title:t('studies.pawpals.films.blocks.1.title'),src:'/assets/video/pawpals-making.mp4',poster:'pp-poster-making'},
  ]),
  sec('context',t('studies.pawpals.context.title'),t('studies.pawpals.context.body'),[
   board('pp-board-origin',t('studies.pawpals.context.blocks.0.items.pp-board-origin.caption')),
   board('pp-board-intervention',t('studies.pawpals.context.blocks.1.items.pp-board-intervention.caption')),
  ]),
  sec('system',t('studies.pawpals.system.title'),t('studies.pawpals.system.body'),[
   board('pp-board-stakeholders',t('studies.pawpals.system.blocks.0.items.pp-board-stakeholders.caption')),
   board('pp-board-blueprint',t('studies.pawpals.system.blocks.1.items.pp-board-blueprint.caption')),
  ]),
  sec('platform',t('studies.pawpals.platform.title'),t('studies.pawpals.platform.body'),[
   {type:'media',layout:'ui-pair',items:[
    img('pp-ui-desktop',t('studies.pawpals.platform.blocks.0.items.pp-ui-desktop.caption'),'screen'),
    img('pp-ui-phones',t('studies.pawpals.platform.blocks.0.items.pp-ui-phones.caption'),'screen')]},
   board('pp-board-journey',t('studies.pawpals.platform.blocks.1.items.pp-board-journey.caption')),
   board('pp-board-ia',t('studies.pawpals.platform.blocks.2.items.pp-board-ia.caption')),
  ]),
  sec('wearable',t('studies.pawpals.wearable.title'),t('studies.pawpals.wearable.body'),[
   {type:'heading',text:t('studies.pawpals.wearable.blocks.0.text')},
   {type:'media',layout:'gallery',items:[
    img('pp-hw-devboard',t('studies.pawpals.wearable.blocks.1.items.pp-hw-devboard.caption')),
    img('pp-hw-pcb',t('studies.pawpals.wearable.blocks.1.items.pp-hw-pcb.caption')),
    img('pp-hw-battery',t('studies.pawpals.wearable.blocks.1.items.pp-hw-battery.caption'))]},
   board('pp-board-gps',t('studies.pawpals.wearable.blocks.2.items.pp-board-gps.caption')),
   board('pp-board-hardware',t('studies.pawpals.wearable.blocks.3.items.pp-board-hardware.caption')),
   {type:'heading',text:t('studies.pawpals.wearable.blocks.4.text')},
   {type:'media',layout:'gallery',items:[
    img('pp-test-grey',t('studies.pawpals.wearable.blocks.5.items.pp-test-grey.caption')),
    img('pp-test-backpack',t('studies.pawpals.wearable.blocks.5.items.pp-test-backpack.caption')),
    img('pp-test-walk',t('studies.pawpals.wearable.blocks.5.items.pp-test-walk.caption')),
    img('pp-test-fpc',t('studies.pawpals.wearable.blocks.5.items.pp-test-fpc.caption')),
    img('pp-test-logo',t('studies.pawpals.wearable.blocks.5.items.pp-test-logo.caption')),
    img('pp-test-calico',t('studies.pawpals.wearable.blocks.5.items.pp-test-calico.caption'))]},
   board('pp-board-research',t('studies.pawpals.wearable.blocks.6.items.pp-board-research.caption')),
  ]),
  sec('station',t('studies.pawpals.station.title'),t('studies.pawpals.station.body'),[
   board('pp-board-behaviour',t('studies.pawpals.station.blocks.0.items.pp-board-behaviour.caption')),
   {type:'media',layout:'editorial',items:[
    img('pp-station-field',t('studies.pawpals.station.blocks.1.items.pp-station-field.caption')),
    img('pp-station-espnow',t('studies.pawpals.station.blocks.1.items.pp-station-espnow.caption')),
    img('pp-station-sensor',t('studies.pawpals.station.blocks.1.items.pp-station-sensor.caption'))]},
   {type:'media',layout:'gallery',items:[
    img('pp-render-cluster',t('studies.pawpals.station.blocks.2.items.pp-render-cluster.caption'),'object'),
    img('pp-render-tower',t('studies.pawpals.station.blocks.2.items.pp-render-tower.caption'),'object'),
    img('pp-render-hex',t('studies.pawpals.station.blocks.2.items.pp-render-hex.caption'),'object')]},
  ]),
 ],
};
