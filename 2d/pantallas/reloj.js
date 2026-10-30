"use strict";
/* =====================================================================
   pantallas/reloj.js · EL RELOJ DEL CONOCIMIENTO
   Botón flotante, radar de la zona y pestañas.
   ===================================================================== */

/* ============ Reloj ============ */
function totalClues(){ return Object.keys(CLUES).length; }
/* Actualiza el botón del reloj (abajo a la derecha) con el contador de pistas. */
function updateWatch(){
  const b = $("#watchBtn");
  b.hidden = !S.items.includes("reloj");
  const n = Object.keys(S.clues).length;
  b.innerHTML = watchSVG(n/totalClues()) + `<span class="wcount">${n}/${totalClues()}</span>`;
}
/* Hace vibrar el reloj (animación, sonido y vibración del teléfono). */
function buzzWatch(){ const b = $("#watchBtn"); b.classList.remove("buzz"); void b.offsetWidth; b.classList.add("buzz"); A.buzz(); }
$("#watchBtn").onclick = () => { A.click(); openWatch(ZONE_OF[S.stage] && /^explore/.test(S.stage) ? "radar" : "hallazgos"); };
/* Zona de trabajo según la pantalla actual (la usa el radar). */
const ZONE_OF = {explore1:"comunidad",repo1:"comunidad",game1:"comunidad",explore2:"playa",repo2:"playa",game2:"playa",holo:"playa",repo3:"playa",game3:"playa",explore3:"final",repo4:"final",game4:"final"};
/* Convierte un ícono <svg> en un grupo <g> para meterlo dentro de otro SVG. */
const icoG = str => str.replace(/^<svg([^>]*)>/, (m, a) => "<g" + a.replace(/\s(viewBox|width|height)="[^"]*"/g, "") + ">").replace(/<\/svg>\s*$/, "</g>");
/* Radar de la zona: dibuja los elementos de la zona alrededor del reloj, más la
   archivista y el agente. Naranja = ya investigado. Tocar uno lo señala en la escena. */
function radarHTML(){
  const z = ZONE_OF[S.stage] || (S.max >= ORDER.indexOf("explore3") ? "final" : S.max >= ORDER.indexOf("explore2") ? "playa" : "comunidad");
  const sc = SCENES[z];
  const items = [...sc.spots.map(p => ({id:p.id, label:p.label, kind:p.kind, ok:!!S.clues[p.id]})),
    {id:"npc-repo", label:"Archivista de Kinética", kind:"book", ok:!!S.read[sc.repo.key]},
    {id:"npc-des", label:"Agente de desafío", kind:"flag", ok:S.max > ORDER.indexOf(sc.des.game)}];
  const R0 = 150, C = 230, N = items.length;
  const nodes = items.map((it, i) => { const a = -Math.PI/2 + i*2*Math.PI/N, x = C + Math.cos(a)*R0, y = C + Math.sin(a)*R0*.92;
    const ca = Math.cos(a), side = Math.abs(ca) > .3, anc = side ? (ca > 0 ? "start" : "end") : "middle";
    const lx = side ? x + (ca > 0 ? 34 : -34) : x, ly = side ? y + 5 : y + (Math.sin(a) < 0 ? -36 : 46);
    return `<line x1="${C}" y1="${C}" x2="${x}" y2="${y}" stroke="${it.ok?"#ff8f45":"#3df58e"}" stroke-opacity=".6" stroke-width="2"/>
      <g class="rn" data-rid="${it.id}" tabindex="0" role="button" aria-label="${esc(it.label)}${it.ok?" (investigado)":""}"><circle cx="${x}" cy="${y}" r="26" fill="#071a14" stroke="${it.ok?"#ff8f45":"#3df58e"}" stroke-width="3"/>
      <g transform="translate(${x-11} ${y-11}) scale(.92)" style="color:${it.ok?"#ff8f45":"#3df58e"}">${icoG(it.ok?ICON.check:ICON[it.kind]||ICON.scan)}</g>
      <text x="${lx}" y="${ly}" text-anchor="${anc}" fill="#e5f3ef" font-size="13" font-family="Atkinson Hyperlegible, sans-serif">${esc(it.label)}</text></g>`; }).join("");
  return `<div class="radar"><p class="eyebrow">Radar de la zona · ${esc(sc.title.replace(/^Exploración (de la|en la) /i,""))}</p>
    <svg viewBox="${innerWidth < 560 ? "40 40 380 380" : "-120 0 700 480"}" class="${innerWidth < 560 ? "narrow" : ""}" role="img" aria-label="Radar del reloj con los elementos de la zona">
      <circle cx="${C}" cy="${C}" r="${R0}" fill="none" stroke="#1d8d55" stroke-dasharray="4 6"/>
      ${nodes}
      <circle cx="${C}" cy="${C}" r="44" fill="#061510" stroke="#3df58e" stroke-width="4" style="filter:drop-shadow(0 0 14px #3df58e)"/>
      <g transform="translate(${C-16} ${C-16})" style="color:#3df58e"><g transform="scale(1.33)">${icoG(ICON.scan)}</g></g>
    </svg>
    <div class="rlist">${items.map(it => `<span class="${it.ok?"ok":""}"><i></i>${esc(it.label)}</span>`).join("")}</div>
    <p class="src">${/^explore/.test(S.stage) ? "Tocá un elemento del radar para ubicarlo en la escena." : "El radar muestra la zona en la que estás trabajando."}</p></div>`;
}
/* Ventana del reloj con pestañas: radar, hallazgos, insignias y objetos. */
function openWatch(tab){
  const n = Object.keys(S.clues).length;
  const zones = [["comunidad","Comunidad"],["playa","Playa (día)"],["final","Playa (final)"]];
  const body = {
    radar: radarHTML(),
    hallazgos: zones.map(([z,l]) => {
      const list = Object.entries(CLUES).filter(([id,c]) => c.zone === z);
      return `<div class="eyebrow">${l} · ${list.filter(([id])=>S.clues[id]).length}/${list.length}</div>` +
        list.map(([id,c]) => S.clues[id] ? `<div class="clue"><b>${esc(c.title)}</b><p>${esc(c.short)}</p>${c.src?`<span class="src">Fuente: ${esc(c.src)}</span>`:""}</div>` : `<div class="clue" style="opacity:.45"><b>Sin investigar</b><p>Buscá este elemento en la zona.</p></div>`).join("");
    }).join(""),
    insignias: `<div class="badges">${["conocimiento","rigurosidad","interpretacion","cuarta"].map(k => `<div class="badge ${S.badges.includes(k)?"":"off"}">${badgeSVG(k)}<span>${BADGES[k].name}</span><small class="bdef">${BADGES[k].def}</small></div>`).join("")}</div>
      <p class="muted">${S.badges.length} de 4 insignias. Reunilas todas para ser miembro oficial de Kinética.</p>`,
    objetos: `<div class="reward">${watchSVG(n/totalClues(), true)}<div class="kv"><div><b>Reloj de la Sociedad Kinética</b><span>Escanea objetos, traduce lo que escuchás y guarda cada pista con su fuente.</span></div></div></div>` +
      (S.items.includes("lentes") ? `<div class="reward">${LENS_SVG}<div class="kv"><div><b>Lentes del conocimiento gráfico</b><span>Te dejan leer ejes, escalas y tendencias en los gráficos del caso.</span></div></div></div>` : "")
  };
  openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Reloj Kinética">
    <div class="sheet-h"><div style="width:44px;height:44px">${watchSVG(n/totalClues())}</div><h3>Reloj Kinética${S.name?` · ${esc(S.name)}`:""}</h3><button class="x" data-close aria-label="Cerrar">${X_ICON}</button></div>
    <div class="wtabs" role="tablist">${["radar","hallazgos","insignias","objetos"].map(t=>`<button role="tab" type="button" data-t="${t}" aria-selected="${t===tab}">${t}</button>`).join("")}</div>
    <div class="sheet-b"><div class="progress" aria-label="Avance del caso"><i style="width:${Math.round((S.max/(ORDER.length-1))*100)}%"></i></div>${body[tab]}</div></div>`);
  $$("#modal [data-t]").forEach(b => b.onclick = () => openWatch(b.dataset.t));
  $$("#modal .rn").forEach(g => { const f = () => { const h = $(`.hs[data-id="${g.dataset.rid}"]`); $("#modal").hidden = true; $("#modal").innerHTML = ""; if(h){ h.classList.add("near"); h.focus(); setTimeout(() => h.classList.remove("near"), 2400); } }; g.onclick = f; g.onkeydown = e => { if(e.key === "Enter" || e.key === " "){ e.preventDefault(); f(); } }; });
}
