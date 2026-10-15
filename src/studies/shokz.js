// Shokz OpenSwim Pro 2 companion app, from the Figma presentation boards (file Jf4N724rkfcY67QNLaTnC7, Section 12)
// and the audio-import interaction specs (7.2.3.1 Wi-Fi connection, 7.2 audio import final).
// Media come from scripts/build_shokz.py; the Wi-Fi flow comparison is public/embeds/shokz/wifi.
// Copy explains decisions; the boards already show the screens.
import {t} from '../i18n.js';
const img=(id,caption,kind='diagram')=>({id,caption,kind});
const sec=(id,title,body,blocks,extra={})=>({id,title,body,groups:[],blocks,...extra});
const board=(id,caption)=>({type:'media',layout:'board',items:[img(id,caption)]});

export default {
 tone:{h:210,s:30,accent:'#cfe1f5',ink:'#2f6ebf'},
 accent:'#e9f0f5',surface:'#ffffff',hero:'sk-home',heroStyle:'board',
 heroCaption:t('studies.shokz.heroCaption'),
 oneLiner:t('studies.shokz.oneLiner'),
 credit:t('studies.shokz.credit'),
 sections:[
  sec('homepage',t('studies.shokz.homepage.title'),t('studies.shokz.homepage.body'),[
  ]),
  sec('training',t('studies.shokz.training.title'),t('studies.shokz.training.body'),[
   board('sk-training',t('studies.shokz.training.blocks.0.items.sk-training.caption')),
  ]),
  sec('player',t('studies.shokz.player.title'),t('studies.shokz.player.body'),[
   board('sk-player',t('studies.shokz.player.blocks.0.items.sk-player.caption')),
  ]),
  sec('data',t('studies.shokz.data.title'),t('studies.shokz.data.body'),[
   board('sk-data',t('studies.shokz.data.blocks.0.items.sk-data.caption')),
  ]),
  sec('import',t('studies.shokz.import.title'),t('studies.shokz.import.body'),[
   board('sk-import',t('studies.shokz.import.blocks.0.items.sk-import.caption')),
  ]),
  sec('wifi',t('studies.shokz.wifi.title'),t('studies.shokz.wifi.body'),[
   {type:'embed',src:'/embeds/shokz/wifi/index.html',height:800,title:t('studies.shokz.wifi.blocks.0.title')},
  ],{points:[t('studies.shokz.wifi.points.0'),t('studies.shokz.wifi.points.1'),t('studies.shokz.wifi.points.2')]}),
  sec('courses',t('studies.shokz.courses.title'),t('studies.shokz.courses.body'),[
   board('sk-courses',t('studies.shokz.courses.blocks.0.items.sk-courses.caption')),
  ]),
  sec('tracks',t('studies.shokz.tracks.title'),t('studies.shokz.tracks.body'),[
   board('sk-library',t('studies.shokz.tracks.blocks.0.items.sk-library.caption')),
  ]),
 ],
};
