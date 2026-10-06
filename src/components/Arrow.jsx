import React from 'react';
export default function Arrow({ diagonal = false, direction, className = '' }) {
 return <svg className={`arrow ${className}`} style={direction === 'up' ? { transform: 'rotate(-90deg)' } : direction === 'left' ? { transform: 'rotate(180deg)' } : undefined} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M3 12h17m-7-7 7 7-7 7'} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
