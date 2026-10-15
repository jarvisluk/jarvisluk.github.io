// Language packs: every piece of site copy lives in src/locales/<lang>.json, keyed by where it appears.
// t(key) returns {zh, en, …} so data and components keep reading text as text[lang].
import zh from './locales/zh.json' with {type:'json'};
import en from './locales/en.json' with {type:'json'};
export const locales={zh,en};
export const languages=Object.keys(locales);
const get=(pack,key)=>key.split('.').reduce((v,k)=>v?.[k],pack);
// Fill {name} placeholders, e.g. format('{n} 个小尝试',{n:3}).
export const format=(s,vars)=>vars?s.replace(/\{(\w+)\}/g,(m,k)=>k in vars?vars[k]:m):s;
export function t(key,vars){
 const text={};
 for(const lang of languages){
  const s=get(locales[lang],key);
  if(s===undefined)throw new Error(`Missing ${lang} copy: ${key}`);
  text[lang]=typeof s==='string'?format(s,vars):s;
 }
 return text;
}
