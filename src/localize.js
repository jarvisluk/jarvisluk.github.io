// Chinese lives at the root, English under /en.
export const localize=(lang,path)=>lang==='en'?`/en${path}`:path;
