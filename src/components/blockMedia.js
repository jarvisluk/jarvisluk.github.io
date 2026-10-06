// Every image a block shows, in reading order, for the lightbox sequence.
export function blockMedia(block){
 switch(block.type){
  case 'media':return block.items;
  case 'problems':return block.items.map(p=>p.image);
  case 'stages':return block.items.map(s=>s.image);
  case 'spaces':return [block.diagram,...block.items.map(s=>s.image),...(block.map?[block.map]:[])];
  case 'tools':return block.groups.flatMap(g=>g.tools);
  case 'modules':return block.items.flatMap(m=>m.images);
  case 'story':return block.steps.flatMap(s=>[s.scene,...s.screens]);
  default:return [];
 }
}
