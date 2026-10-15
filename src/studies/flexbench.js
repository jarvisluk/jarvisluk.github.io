// FlexBench, rebuilt from the Figma portfolio boards and the original NAS camera files.
// Media come from scripts/build_flexbench.py; every caption describes what the image shows.
import {t} from '../i18n.js';
const img=(id,caption,kind='photo')=>({id,caption,kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const low=t('studies.flexbench.levels.low'),high=t('studies.flexbench.levels.high'),medium=t('studies.flexbench.levels.medium');

export default {
 tone:{h:34,s:22,accent:'#ecd3a8',ink:'#9a7036'},
 accent:'#e8dfd1',hero:'fb-hero',heroStyle:'photo',
 heroCaption:t('studies.flexbench.heroCaption'),
 oneLiner:t('studies.flexbench.oneLiner'),
 credit:t('studies.flexbench.credit'),
 // Finished results first; the process follows in the chapters below.
 showcase:[
  img('fb-final-front',t('studies.flexbench.showcase.fb-final-front.caption')),
  img('fb-final-pegboard-side',t('studies.flexbench.showcase.fb-final-pegboard-side.caption')),
  img('fb-story-setup',t('studies.flexbench.showcase.fb-story-setup.caption')),
  img('fb-final-drawer-tools',t('studies.flexbench.showcase.fb-final-drawer-tools.caption')),
  img('fb-final-box-tools',t('studies.flexbench.showcase.fb-final-box-tools.caption')),
  img('fb-final-snap-hand',t('studies.flexbench.showcase.fb-final-snap-hand.caption')),
  img('fb-final-fold-2',t('studies.flexbench.showcase.fb-final-fold-2.caption')),
  img('fb-story-use',t('studies.flexbench.showcase.fb-story-use.caption'))],
 sections:[
  sec('modules',t('studies.flexbench.modules.title'),t('studies.flexbench.modules.body'),[
   {type:'media',layout:'editorial',items:[
    img('fb-final-front',t('studies.flexbench.modules.blocks.0.items.fb-final-front.caption')),
    img('fb-final-pegboard-side',t('studies.flexbench.modules.blocks.0.items.fb-final-pegboard-side.caption')),
    img('fb-final-frame',t('studies.flexbench.modules.blocks.0.items.fb-final-frame.caption')),
   ]},
   {type:'modules',items:[
    {name:t('studies.flexbench.modules.blocks.1.items.0.name'),body:t('studies.flexbench.modules.blocks.1.items.0.body'),specs:[['160 mm',t('studies.flexbench.modules.blocks.1.items.0.specs.0.1')]],images:[
     img('fb-final-snap-hand',t('studies.flexbench.modules.blocks.1.items.0.images.fb-final-snap-hand.caption')),
     img('fb-final-snap-detail',t('studies.flexbench.modules.blocks.1.items.0.images.fb-final-snap-detail.caption'))]},
    {name:t('studies.flexbench.modules.blocks.1.items.1.name'),body:t('studies.flexbench.modules.blocks.1.items.1.body'),specs:[['80 mm',t('studies.flexbench.modules.blocks.1.items.1.specs.0.1')],['35 mm',t('studies.flexbench.modules.blocks.1.items.1.specs.1.1')]],images:[
     img('fb-final-drawers',t('studies.flexbench.modules.blocks.1.items.1.images.fb-final-drawers.caption')),
     img('fb-final-drawer-tools',t('studies.flexbench.modules.blocks.1.items.1.images.fb-final-drawer-tools.caption')),
     img('fb-final-grid',t('studies.flexbench.modules.blocks.1.items.1.images.fb-final-grid.caption'))]},
    {name:t('studies.flexbench.modules.blocks.1.items.2.name'),body:t('studies.flexbench.modules.blocks.1.items.2.body'),images:[
     img('fb-final-box-tools',t('studies.flexbench.modules.blocks.1.items.2.images.fb-final-box-tools.caption')),
     img('fb-final-box-back',t('studies.flexbench.modules.blocks.1.items.2.images.fb-final-box-back.caption'))]},
    {name:t('studies.flexbench.modules.blocks.1.items.3.name'),body:t('studies.flexbench.modules.blocks.1.items.3.body'),specs:[['15 / 80 mm',t('studies.flexbench.modules.blocks.1.items.3.specs.0.1')]],images:[
     img('fb-final-pegboard-power',t('studies.flexbench.modules.blocks.1.items.3.images.fb-final-pegboard-power.caption')),
     img('fb-final-fold-1',t('studies.flexbench.modules.blocks.1.items.3.images.fb-final-fold-1.caption')),
     img('fb-final-fold-2',t('studies.flexbench.modules.blocks.1.items.3.images.fb-final-fold-2.caption')),
     img('fb-final-fold-use',t('studies.flexbench.modules.blocks.1.items.3.images.fb-final-fold-use.caption'))]},
   ]},
  ]),
  sec('films',t('studies.flexbench.films.title'),t('studies.flexbench.films.body'),[
   {type:'video',title:t('studies.flexbench.films.blocks.0.title'),youtube:'v_wOtFdhkD8',bilibili:'BV1a9VYzaE7Q',poster:'fb-make-saw'},
   {type:'media',layout:'pair',items:[
    img('fb-make-frame',t('studies.flexbench.films.blocks.1.items.fb-make-frame.caption')),
    img('fb-make-drill',t('studies.flexbench.films.blocks.1.items.fb-make-drill.caption')),
   ]},
  ]),
  sec('context',t('studies.flexbench.context.title'),t('studies.flexbench.context.body'),[
   {type:'media',layout:'board narrow',items:[img('fb-campus',t('studies.flexbench.context.blocks.0.items.fb-campus.caption'))]},
   {type:'problems',items:[
    {title:t('studies.flexbench.context.blocks.1.items.0.title'),body:t('studies.flexbench.context.blocks.1.items.0.body'),image:img('fb-hall-clutter',t('studies.flexbench.context.blocks.1.items.0.image.caption'))},
    {title:t('studies.flexbench.context.blocks.1.items.1.title'),body:t('studies.flexbench.context.blocks.1.items.1.body'),image:img('fb-corridor-boxes',t('studies.flexbench.context.blocks.1.items.1.image.caption'))},
    {title:t('studies.flexbench.context.blocks.1.items.2.title'),body:t('studies.flexbench.context.blocks.1.items.2.body'),image:img('fb-toolroom',t('studies.flexbench.context.blocks.1.items.2.image.caption'))},
   ]},
  ]),
  sec('voices',t('studies.flexbench.voices.title'),t('studies.flexbench.voices.body'),[
   {type:'quotes',items:[
    {who:t('studies.flexbench.voices.blocks.0.items.0.who'),tag:t('studies.flexbench.voices.blocks.0.items.0.tag'),text:t('studies.flexbench.voices.blocks.0.items.0.text')},
    {who:t('studies.flexbench.voices.blocks.0.items.1.who'),tag:t('studies.flexbench.voices.blocks.0.items.1.tag'),text:t('studies.flexbench.voices.blocks.0.items.1.text')},
    {who:t('studies.flexbench.voices.blocks.0.items.2.who'),tag:t('studies.flexbench.voices.blocks.0.items.2.tag'),text:t('studies.flexbench.voices.blocks.0.items.2.text')},
    {who:t('studies.flexbench.voices.blocks.0.items.3.who'),tag:t('studies.flexbench.voices.blocks.0.items.3.tag'),text:t('studies.flexbench.voices.blocks.0.items.3.text')},
    {who:t('studies.flexbench.voices.blocks.0.items.4.who'),tag:t('studies.flexbench.voices.blocks.0.items.4.tag'),text:t('studies.flexbench.voices.blocks.0.items.4.text')},
    {who:t('studies.flexbench.voices.blocks.0.items.5.who'),tag:t('studies.flexbench.voices.blocks.0.items.5.tag'),text:t('studies.flexbench.voices.blocks.0.items.5.text')},
    {who:t('studies.flexbench.voices.blocks.0.items.6.who'),tag:t('studies.flexbench.voices.blocks.0.items.6.tag'),tutor:true,text:t('studies.flexbench.voices.blocks.0.items.6.text')},
   ]},
   {type:'persona',label:t('studies.flexbench.voices.blocks.1.label'),name:t('studies.flexbench.voices.blocks.1.name'),
    facts:[[t('studies.flexbench.voices.blocks.1.facts.0.0'),t('studies.flexbench.voices.blocks.1.facts.0.1')],[t('studies.flexbench.voices.blocks.1.facts.1.0'),t('studies.flexbench.voices.blocks.1.facts.1.1')],[t('studies.flexbench.voices.blocks.1.facts.2.0'),t('studies.flexbench.voices.blocks.1.facts.2.1')]],
    pains:[t('studies.flexbench.voices.blocks.1.pains.0'),t('studies.flexbench.voices.blocks.1.pains.1'),t('studies.flexbench.voices.blocks.1.pains.2'),t('studies.flexbench.voices.blocks.1.pains.3'),t('studies.flexbench.voices.blocks.1.pains.4')],
    needs:[t('studies.flexbench.voices.blocks.1.needs.0'),t('studies.flexbench.voices.blocks.1.needs.1'),t('studies.flexbench.voices.blocks.1.needs.2')]},
  ]),
  sec('process',t('studies.flexbench.process.title'),t('studies.flexbench.process.body'),[
   {type:'stages',items:[
    {name:t('studies.flexbench.process.blocks.0.items.0.name'),detail:t('studies.flexbench.process.blocks.0.items.0.detail'),space:low,tools:low,need:t('studies.flexbench.process.blocks.0.items.0.need'),place:t('studies.flexbench.process.blocks.0.items.0.place'),image:img('fb-wf-lofi',t('studies.flexbench.process.blocks.0.items.0.image.caption'))},
    {name:t('studies.flexbench.process.blocks.0.items.1.name'),detail:t('studies.flexbench.process.blocks.0.items.1.detail'),space:low,tools:low,need:t('studies.flexbench.process.blocks.0.items.1.need'),place:t('studies.flexbench.process.blocks.0.items.1.place'),image:img('fb-wf-electronics',t('studies.flexbench.process.blocks.0.items.1.image.caption'))},
    {name:t('studies.flexbench.process.blocks.0.items.2.name'),detail:t('studies.flexbench.process.blocks.0.items.2.detail'),space:low,tools:low,need:t('studies.flexbench.process.blocks.0.items.2.need'),place:t('studies.flexbench.process.blocks.0.items.2.place'),image:img('fb-wf-digital',t('studies.flexbench.process.blocks.0.items.2.image.caption'),'screen')},
    {name:t('studies.flexbench.process.blocks.0.items.3.name'),detail:t('studies.flexbench.process.blocks.0.items.3.detail'),space:t('studies.flexbench.process.blocks.0.items.3.space'),tools:t('studies.flexbench.process.blocks.0.items.3.tools'),need:t('studies.flexbench.process.blocks.0.items.3.need'),place:t('studies.flexbench.process.blocks.0.items.3.place'),image:img('fb-wf-outside',t('studies.flexbench.process.blocks.0.items.3.image.caption'))},
    {name:t('studies.flexbench.process.blocks.0.items.4.name'),detail:t('studies.flexbench.process.blocks.0.items.4.detail'),space:high,tools:high,need:t('studies.flexbench.process.blocks.0.items.4.need'),place:t('studies.flexbench.process.blocks.0.items.4.place'),workshop:true,image:img('fb-wf-making',t('studies.flexbench.process.blocks.0.items.4.image.caption'))},
    {name:t('studies.flexbench.process.blocks.0.items.5.name'),detail:t('studies.flexbench.process.blocks.0.items.5.detail'),space:high,tools:high,need:t('studies.flexbench.process.blocks.0.items.5.need'),place:t('studies.flexbench.process.blocks.0.items.5.place'),workshop:true,image:img('fb-wf-finishing',t('studies.flexbench.process.blocks.0.items.5.image.caption'))},
   ],note:t('studies.flexbench.process.blocks.0.note')},
  ]),
  sec('space',t('studies.flexbench.space.title'),t('studies.flexbench.space.body'),[
   {type:'spaces',layout:'stack',diagram:img('fb-board-axo',t('studies.flexbench.space.blocks.0.diagram.caption'),'diagram'),map:img('fb-board-map',t('studies.flexbench.space.blocks.0.map.caption'),'diagram'),items:[
    {color:'#8fb0d6',name:t('studies.flexbench.space.blocks.0.items.0.name'),space:t('studies.flexbench.space.blocks.0.items.0.space'),traffic:low,suitable:true,note:t('studies.flexbench.space.blocks.0.items.0.note'),works:[t('studies.flexbench.space.blocks.0.items.0.works.0'),t('studies.flexbench.space.blocks.0.items.0.works.1'),t('studies.flexbench.space.blocks.0.items.0.works.2')],image:img('fb-space-hall',t('studies.flexbench.space.blocks.0.items.0.image.caption'))},
    {color:'#e8e8e8',name:t('studies.flexbench.space.blocks.0.items.1.name'),space:t('studies.flexbench.space.blocks.0.items.1.space'),traffic:low,suitable:true,note:t('studies.flexbench.space.blocks.0.items.1.note'),works:[t('studies.flexbench.space.blocks.0.items.1.works.0'),t('studies.flexbench.space.blocks.0.items.1.works.1'),t('studies.flexbench.space.blocks.0.items.1.works.2'),t('studies.flexbench.space.blocks.0.items.1.works.3')],image:img('fb-space-classroom',t('studies.flexbench.space.blocks.0.items.1.image.caption'))},
    {color:'#f2c450',name:t('studies.flexbench.space.blocks.0.items.2.name'),space:t('studies.flexbench.space.blocks.0.items.2.space'),traffic:high,suitable:false,note:t('studies.flexbench.space.blocks.0.items.2.note'),works:[],image:img('fb-space-hall-corridor',t('studies.flexbench.space.blocks.0.items.2.image.caption'))},
    {color:'#a8dba0',name:t('studies.flexbench.space.blocks.0.items.3.name'),space:t('studies.flexbench.space.blocks.0.items.3.space'),traffic:medium,suitable:true,note:t('studies.flexbench.space.blocks.0.items.3.note'),works:[t('studies.flexbench.space.blocks.0.items.3.works.0'),t('studies.flexbench.space.blocks.0.items.3.works.1'),t('studies.flexbench.space.blocks.0.items.3.works.2')],image:img('fb-space-corridor',t('studies.flexbench.space.blocks.0.items.3.image.caption'))},
    {color:'#ee6f5a',name:t('studies.flexbench.space.blocks.0.items.4.name'),space:t('studies.flexbench.space.blocks.0.items.4.space'),traffic:medium,suitable:true,note:t('studies.flexbench.space.blocks.0.items.4.note'),works:[t('studies.flexbench.space.blocks.0.items.4.works.0'),t('studies.flexbench.space.blocks.0.items.4.works.1'),t('studies.flexbench.space.blocks.0.items.4.works.2')],image:img('fb-space-eaves',t('studies.flexbench.space.blocks.0.items.4.image.caption'))},
   ],conclusion:t('studies.flexbench.space.blocks.0.conclusion')},
  ],{dark:true}),
  sec('system',t('studies.flexbench.system.title'),t('studies.flexbench.system.body'),[
   {type:'actors',items:[
    {name:t('studies.flexbench.system.blocks.0.items.0.name'),role:t('studies.flexbench.system.blocks.0.items.0.role')},
    {name:t('studies.flexbench.system.blocks.0.items.1.name'),role:t('studies.flexbench.system.blocks.0.items.1.role'),app:t('studies.flexbench.system.blocks.0.items.1.app')},
    {name:t('studies.flexbench.system.blocks.0.items.2.name'),role:t('studies.flexbench.system.blocks.0.items.2.role'),app:t('studies.flexbench.system.blocks.0.items.2.app')},
    {name:t('studies.flexbench.system.blocks.0.items.3.name'),role:t('studies.flexbench.system.blocks.0.items.3.role'),app:t('studies.flexbench.system.blocks.0.items.3.app')},
   ]},
   {type:'blueprint',caption:t('studies.flexbench.system.blocks.1.caption'),
    phases:[{label:t('studies.flexbench.system.blocks.1.phases.0.label'),span:4},{label:t('studies.flexbench.system.blocks.1.phases.1.label'),span:3},{label:t('studies.flexbench.system.blocks.1.phases.2.label'),span:1}],
    lanes:[
     {label:t('studies.flexbench.system.blocks.1.lanes.0.label'),kind:'evidence',cells:[null,{text:t('studies.flexbench.system.blocks.1.lanes.0.cells.1.text'),span:2},t('studies.flexbench.system.blocks.1.lanes.0.cells.2'),null,t('studies.flexbench.system.blocks.1.lanes.0.cells.4'),t('studies.flexbench.system.blocks.1.lanes.0.cells.5'),t('studies.flexbench.system.blocks.1.lanes.0.cells.6')]},
     {label:t('studies.flexbench.system.blocks.1.lanes.1.label'),kind:'journey',cells:[t('studies.flexbench.system.blocks.1.lanes.1.cells.0'),t('studies.flexbench.system.blocks.1.lanes.1.cells.1'),t('studies.flexbench.system.blocks.1.lanes.1.cells.2'),null,t('studies.flexbench.system.blocks.1.lanes.1.cells.4'),null,null,t('studies.flexbench.system.blocks.1.lanes.1.cells.7')]},
     {label:t('studies.flexbench.system.blocks.1.lanes.2.label'),kind:'journey',cells:[t('studies.flexbench.system.blocks.1.lanes.2.cells.0'),null,t('studies.flexbench.system.blocks.1.lanes.2.cells.2'),t('studies.flexbench.system.blocks.1.lanes.2.cells.3'),t('studies.flexbench.system.blocks.1.lanes.2.cells.4'),t('studies.flexbench.system.blocks.1.lanes.2.cells.5'),t('studies.flexbench.system.blocks.1.lanes.2.cells.6'),t('studies.flexbench.system.blocks.1.lanes.2.cells.7')]},
     {line:t('studies.flexbench.system.blocks.1.lanes.3.line'),label:t('studies.flexbench.system.blocks.1.lanes.3.label'),kind:'front',cells:[null,null,t('studies.flexbench.system.blocks.1.lanes.3.cells.2'),t('studies.flexbench.system.blocks.1.lanes.3.cells.3'),null,t('studies.flexbench.system.blocks.1.lanes.3.cells.5'),t('studies.flexbench.system.blocks.1.lanes.3.cells.6'),null]},
     {label:t('studies.flexbench.system.blocks.1.lanes.4.label'),kind:'front',cells:[null,t('studies.flexbench.system.blocks.1.lanes.4.cells.1'),null,null,null,null,t('studies.flexbench.system.blocks.1.lanes.4.cells.6'),null]},
     {line:t('studies.flexbench.system.blocks.1.lanes.5.line'),label:t('studies.flexbench.system.blocks.1.lanes.5.label'),kind:'back',cells:[null,t('studies.flexbench.system.blocks.1.lanes.5.cells.1'),t('studies.flexbench.system.blocks.1.lanes.5.cells.2'),null,t('studies.flexbench.system.blocks.1.lanes.5.cells.4'),t('studies.flexbench.system.blocks.1.lanes.5.cells.5'),t('studies.flexbench.system.blocks.1.lanes.5.cells.6'),t('studies.flexbench.system.blocks.1.lanes.5.cells.7')]},
     {line:t('studies.flexbench.system.blocks.1.lanes.6.line'),label:t('studies.flexbench.system.blocks.1.lanes.6.label'),kind:'support',cells:[t('studies.flexbench.system.blocks.1.lanes.6.cells.0'),null,t('studies.flexbench.system.blocks.1.lanes.6.cells.2'),t('studies.flexbench.system.blocks.1.lanes.6.cells.3'),t('studies.flexbench.system.blocks.1.lanes.6.cells.4'),null,t('studies.flexbench.system.blocks.1.lanes.6.cells.6'),t('studies.flexbench.system.blocks.1.lanes.6.cells.7')]},
    ]},
  ]),
  sec('organize',t('studies.flexbench.organize.title'),t('studies.flexbench.organize.body'),[
   {type:'media',layout:'board',items:[img('fb-board-tools',t('studies.flexbench.organize.blocks.0.items.fb-board-tools.caption'),'diagram')]},
   {type:'media',layout:'board narrow',items:[img('fb-board-mapping',t('studies.flexbench.organize.blocks.1.items.fb-board-mapping.caption'),'diagram')]},
   {type:'heading',text:t('studies.flexbench.organize.blocks.2.text')},
   {type:'media',layout:'board narrow',items:[img('fb-board-bench',t('studies.flexbench.organize.blocks.3.items.fb-board-bench.caption'),'diagram')]},
  ],{dark:true}),
  sec('journey',t('studies.flexbench.journey.title'),t('studies.flexbench.journey.body'),[
   {type:'story',steps:[
    {title:t('studies.flexbench.journey.blocks.0.steps.0.title'),roles:[[t('studies.flexbench.journey.blocks.0.steps.0.roles.0.0'),t('studies.flexbench.journey.blocks.0.steps.0.roles.0.1')],[t('studies.flexbench.journey.blocks.0.steps.0.roles.1.0'),t('studies.flexbench.journey.blocks.0.steps.0.roles.1.1')],[t('studies.flexbench.journey.blocks.0.steps.0.roles.2.0'),t('studies.flexbench.journey.blocks.0.steps.0.roles.2.1')]],
     scene:img('fb-story-login',t('studies.flexbench.journey.blocks.0.steps.0.scene.caption')),
     screens:[img('fb-app-login',t('studies.flexbench.journey.blocks.0.steps.0.screens.fb-app-login.caption'),'screen'),img('fb-app-reserve',t('studies.flexbench.journey.blocks.0.steps.0.screens.fb-app-reserve.caption'),'screen')]},
    {title:t('studies.flexbench.journey.blocks.0.steps.1.title'),roles:[[t('studies.flexbench.journey.blocks.0.steps.1.roles.0.0'),t('studies.flexbench.journey.blocks.0.steps.1.roles.0.1')],[t('studies.flexbench.journey.blocks.0.steps.1.roles.1.0'),t('studies.flexbench.journey.blocks.0.steps.1.roles.1.1')]],
     scene:img('fb-story-setup',t('studies.flexbench.journey.blocks.0.steps.1.scene.caption')),
     screens:[img('fb-app-map',t('studies.flexbench.journey.blocks.0.steps.1.screens.fb-app-map.caption'),'screen'),img('fb-app-workshop',t('studies.flexbench.journey.blocks.0.steps.1.screens.fb-app-workshop.caption'),'screen')]},
    {title:t('studies.flexbench.journey.blocks.0.steps.2.title'),roles:[[t('studies.flexbench.journey.blocks.0.steps.2.roles.0.0'),t('studies.flexbench.journey.blocks.0.steps.2.roles.0.1')],[t('studies.flexbench.journey.blocks.0.steps.2.roles.1.0'),t('studies.flexbench.journey.blocks.0.steps.2.roles.1.1')]],
     scene:img('fb-story-use',t('studies.flexbench.journey.blocks.0.steps.2.scene.caption')),
     screens:[img('fb-app-tickets',t('studies.flexbench.journey.blocks.0.steps.2.screens.fb-app-tickets.caption'),'screen')]},
    {title:t('studies.flexbench.journey.blocks.0.steps.3.title'),roles:[[t('studies.flexbench.journey.blocks.0.steps.3.roles.0.0'),t('studies.flexbench.journey.blocks.0.steps.3.roles.0.1')]],
     scene:img('fb-story-return',t('studies.flexbench.journey.blocks.0.steps.3.scene.caption')),
     screens:[img('fb-app-overview',t('studies.flexbench.journey.blocks.0.steps.3.screens.fb-app-overview.caption'),'screen')]},
   ]},
  ]),
 ],
};
