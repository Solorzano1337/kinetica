"use strict";
/* =====================================================================
   pantallas/guia.js · BOTÓN «PISTAS, EXPLICACIÓN Y FUENTES»
   ===================================================================== */

/* Abre la ayuda de un desafío; las pistas se muestran de una en una. */
function openGuide(key){
  const G = GUIDE[key]; if(!G) return; let shown = 1;
  A.click();
  const render = () => {
    openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Pistas y fuentes">
     <div class="sheet-h"><h3>${esc(G.title)} · Pistas y fuentes</h3><button class="x" data-close aria-label="Cerrar">${X_ICON}</button></div>
     <div class="sheet-b refs guide">
      <div class="kv"><div><b>Qué hay que hacer</b><span>${esc(G.goal)}</span></div></div>
      <h4>Cómo se resuelve</h4><ol class="gsteps">${G.steps.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>
      <h4>Pistas</h4>${G.hints.slice(0, shown).map((h,k)=>`<p class="ghint"><b>Pista ${k+1}.</b> ${esc(h)}</p>`).join("")}
      ${shown < G.hints.length ? `<div><button class="btn ghost" type="button" id="gMore">Mostrar otra pista (${shown} de ${G.hints.length})</button></div>` : `<p class="src">Ya ves todas las pistas.</p>`}
      <h4>Cómo se construyó este desafío</h4><p class="gmade">${esc(G.made)}</p>
      <h4>Fuentes</h4>${G.refs.map(k=>`<p>${REFS[k]}</p>`).join("")}
     </div></div>`);
    const m = $("#gMore"); if(m) m.onclick = () => { shown++; render(); };
  };
  render();
}
document.addEventListener("click", e => { const g = e.target.closest && e.target.closest("[data-guide]"); if(g) openGuide(g.dataset.guide); });
const guideBtn = key => `<div><button class="btn ghost hintbtn" type="button" data-guide="${key}">Pistas, explicación y fuentes</button></div>`;
