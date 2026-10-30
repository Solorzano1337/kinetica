"use strict";
/* =====================================================================
   pantallas/insignias.js · VENTANA DE INSIGNIA GANADA
   ===================================================================== */

/* Ventana de insignia ganada: la guarda en S.badges y ofrece seguir. */
function earnBadge(key, title, next, nextLabel){
  if(!S.badges.includes(key)) S.badges.push(key); save(); A.fanfare(); buzzWatch();
  const b = BADGES[key];
  openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Insignia obtenida">
    <div class="sheet-h"><h3>${esc(title)}</h3></div>
    <div class="sheet-b"><div class="reward"><div class="glowin">${badgeSVG(key)}</div>
      <div class="kv"><div><b>Tu recompensa</b><span style="font-family:var(--f-display);font-size:22px">${b.name}</span></div><div><b>¿Qué significa?</b><span>${b.def}</span></div><div><b>En este caso</b><span>${b.mean}</span></div></div></div>
      <p class="src">Insignias: ${S.badges.length} de 4. La encontrás en la pestaña Insignias del reloj.</p></div>
    <div class="sheet-f"><button class="btn" type="button" data-close>${esc(nextLabel)}</button></div></div>`, () => go(next));
}
