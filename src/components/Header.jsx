import React from 'react';
import { copy } from '../data';
import { localize } from '../localize';
export default function Header({lang,setLang,detail}) {
 const other=lang==='zh'?'en':'zh';
 return <header className="header wrap">
  <a className="wordmark" href={localize(lang,'/')} aria-label={copy.home[lang]}>{copy.name[lang]}<span className="brand-square"/></a>
  <nav aria-label={copy.mainNav[lang]}>
   <a className={detail?'nav-work active':'nav-work'} href={localize(lang,'/#work')}>{copy.work[lang]}</a>
   <a href={localize(lang,'/#lab')}>{copy.lab[lang]}</a>
   <button className="language" onClick={()=>setLang(other)} aria-label={copy.switchLang[lang]}>{copy.langShort[other]}<span className="language-other"> / {copy.langShort[lang]}</span></button>
  </nav>
 </header>;
}
