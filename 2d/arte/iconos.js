"use strict";
/* =====================================================================
   arte/iconos.js · ÍCONOS, RELOJ Y LENTES (SVG)
   ===================================================================== */

/* ============ Íconos y arte SVG ============ */
/* Íconos SVG de los puntos interactivos (hablar, escanear, escuchar, leer…). */
const ICON = {
  talk:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 5h16v11H9l-5 4V5z"/></svg>',
  scan:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M4 12h16"/></svg>',
  ear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-6 0"/></svg>',
  read:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 5h11v14H6a2 2 0 0 1-2-2V5zM8 9h4M8 13h4"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5 9-10"/></svg>',
  file:'<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#3df58e" stroke-width="1.8"><path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6"/></svg>',
  lock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
  book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 5a2 2 0 0 1 2-2h5v17H6a2 2 0 0 0-2 2zM20 5a2 2 0 0 0-2-2h-5v17h5a2 2 0 0 1 2 2z"/></svg>',
  flag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 21V4M5 4h11l-2 4 2 4H5"/></svg>'
};
/* Dibuja el reloj con su anillo de avance (pct de 0 a 1). */
function watchSVG(pct=0, big=false){
  const r = 26, c = 2*Math.PI*r;
  return `<svg viewBox="0 0 68 68" aria-hidden="true">
   ${big?'<rect x="24" y="0" width="20" height="14" rx="3" fill="#1b2b26"/><rect x="24" y="54" width="20" height="14" rx="3" fill="#1b2b26"/>':''}
   <circle cx="34" cy="34" r="31" fill="#061510" stroke="#1d8d55" stroke-width="2"/>
   <circle cx="34" cy="34" r="${r}" fill="none" stroke="#123326" stroke-width="5"/>
   <circle cx="34" cy="34" r="${r}" fill="none" stroke="#3df58e" stroke-width="5" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c*(1-pct)}" transform="rotate(-90 34 34)" style="transition:stroke-dashoffset .6s;filter:drop-shadow(0 0 4px #3df58e)"/>
  </svg>`;
}

function badgeSVG(key, cls=""){
  const b = BADGES[key];
  return `<svg class="${cls}" viewBox="0 0 80 80" aria-hidden="true" style="color:${b.color}">
    <path d="M40 4 70 21v38L40 76 10 59V21z" fill="#071a14" stroke="currentColor" stroke-width="3"/>
    <path d="M40 11 64 25v30L40 69 16 55V25z" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="1.5"/>
    <g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${b.glyph}</g></svg>`;
}
const LENS_SVG = `<svg viewBox="0 0 120 120" aria-hidden="true"><g fill="none" stroke="#6fe3ff" stroke-width="4" style="filter:drop-shadow(0 0 8px #6fe3ff)"><circle cx="38" cy="62" r="22"/><circle cx="82" cy="62" r="22"/><path d="M60 58c0-6 0-6 0 0M16 56 8 44M104 56l8-12M58 60h4"/><path d="M28 70l8-10 6 6 8-12" stroke="#3df58e"/><path d="M72 72v-8M80 72V58M88 72V52" stroke="#ff8f45"/></g></svg>`;
