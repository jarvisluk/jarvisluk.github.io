import React from 'react';
import {renderToString} from 'react-dom/server';
import App,{routes,pageMeta,matchRoute} from './App';
export {routes,pageMeta,matchRoute};
export {localize} from './localize';
export function render(path){return renderToString(<App initialPath={path}/>);}
