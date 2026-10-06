import React from 'react';
import { copy } from '../data';
import { localize } from '../localize';
export default function Header({lang,setLang,detail}) {
 return <header className="header wrap">
  <a className="wordmark" href={localize(lang,'/')} aria-label={lang==='zh'?'陆俊荣 — 首页':'Jarvis Luk — home'}>{copy.name[lang]}<span className="brand-square"/></a>
  <nav aria-label={lang==='zh'?'主导航':'Main navigation'}>
   <a className={detail?'nav-work active':'nav-work'} href={localize(lang,'/#work')}>{copy.work[lang]}</a>
   <a href={localize(lang,'/#lab')}>{copy.lab[lang]}</a>
   <button className="language" onClick={()=>setLang(lang==='zh'?'en':'zh')} aria-label={lang==='zh'?'Switch to English':'切换至中文'}>{lang==='zh'?'EN':'中'}<span className="language-other"> / {lang==='zh'?'中':'EN'}</span></button>
  </nav>
 </header>;
}
