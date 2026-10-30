"use strict";
/* =====================================================================
   arte/figuras.js · FIGURAS DE LAS ESCENAS
   Personas, casas, palmeras y zopilotes en SVG.
   ===================================================================== */

/* Figuras para las escenas */
/* Figuras de las escenas: person() dibuja una persona con los pies en (x, y);
   house(), palm() y vulture() dibujan casas, palmeras y zopilotes. Todas usan
   coordenadas de 1600 × 900, las mismas de las escenas. */
function person(x, y, o){ // y = pies
  const s = o.s || 1;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="2" rx="30" ry="7" fill="#000" opacity=".25"/>
    <rect x="-15" y="-62" width="12" height="62" rx="4" fill="${o.pants}"/><rect x="3" y="-62" width="12" height="62" rx="4" fill="${o.pants}"/>
    <rect x="-26" y="-128" width="52" height="72" rx="14" fill="${o.shirt}"/>
    <rect x="-36" y="-122" width="12" height="54" rx="6" fill="${o.shirt}" transform="rotate(8 -30 -120)"/>
    <rect x="24" y="-122" width="12" height="54" rx="6" fill="${o.shirt}" transform="rotate(-8 30 -120)"/>
    <circle cx="0" cy="-148" r="22" fill="${o.skin}"/>
    ${o.hair||""}${o.extra||""}
  </g>`;
}
function house(x, y, w, h, wall, roof, opt={}){
  const posts = [x+10, x+w/2-6, x+w-22].map(px=>`<rect x="${px}" y="${y+h}" width="12" height="${opt.stilt||60}" fill="#5a3d27"/>`).join("");
  const planks = Array.from({length:Math.floor(h/18)},(_,i)=>`<line x1="${x}" y1="${y+i*18+18}" x2="${x+w}" y2="${y+i*18+18}" stroke="#000" stroke-opacity=".12" stroke-width="2"/>`).join("");
  const ridges = Array.from({length:Math.floor((w+60)/16)},(_,i)=>`<line x1="${x-30+i*16}" y1="${y-4}" x2="${x-10+i*16+w*0}" y2="${y-h*0.55}" stroke="#fff" stroke-opacity=".12"/>`).join("");
  return `<g>${posts}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${wall}"/>${planks}
    <rect x="${x+w*0.12}" y="${y+h*0.28}" width="${w*0.2}" height="${h*0.32}" fill="#1f3a40" stroke="#f4f1e8" stroke-width="5"/>
    <rect x="${x+w*0.62}" y="${y+h*0.22}" width="${w*0.2}" height="${h*0.78}" fill="#6b4226"/>
    <polygon points="${x-30},${y+4} ${x+w+30},${y+4} ${x+w-10},${y-h*0.6} ${x+10},${y-h*0.6}" fill="${roof}"/>
    <g clip-path="none">${ridges}</g>
    <rect x="${x-34}" y="${y}" width="${w+68}" height="8" fill="#000" opacity=".18"/>
    ${opt.porch?`<rect x="${x-20}" y="${y+h}" width="${w+40}" height="10" fill="#7a5235"/><g stroke="#e9e1cf" stroke-width="5">${Array.from({length:9},(_,i)=>`<line x1="${x-14+i*(w+28)/8}" y1="${y+h-34}" x2="${x-14+i*(w+28)/8}" y2="${y+h}"/>`).join("")}<line x1="${x-18}" y1="${y+h-34}" x2="${x+w+18}" y2="${y+h-34}"/></g>`:""}
    ${opt.sign?`<rect x="${x+w*0.18}" y="${y-h*0.62-36}" width="${w*0.64}" height="34" fill="#c0392b"/><text x="${x+w/2}" y="${y-h*0.62-12}" text-anchor="middle" font-family="Chakra Petch,sans-serif" font-weight="700" font-size="22" fill="#fff6d6">${opt.sign}</text>`:""}
  </g>`;
}
function palm(x, y, s=1, c="#2d6a4f"){
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0 C 10 -80 -6 -160 14 -240" stroke="#7b5a3a" stroke-width="14" fill="none"/>
    ${[-70,-30,10,50,95,140,180].map(a=>`<path d="M14 -240 q ${Math.cos(a*Math.PI/180)*60} ${Math.sin(a*Math.PI/180)*30-40} ${Math.cos(a*Math.PI/180)*120} ${Math.sin(a*Math.PI/180)*70+20}" stroke="${c}" stroke-width="16" fill="none" stroke-linecap="round"/>`).join("")}</g>`;
}
function vulture(x, y, s=1){
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-22" rx="24" ry="18" fill="#141414"/><path d="M-22 -26 q-12 18 6 22 M 20 -26 q 14 16 -2 22" fill="#0b0b0b"/><circle cx="18" cy="-42" r="8" fill="#3b3b3b"/><path d="M24 -42 l10 4 -10 2z" fill="#d9d2c0"/><path d="M-6 -4v8M6 -4v8" stroke="#8a8a8a" stroke-width="3"/></g>`;
}
