"use strict";
/* =====================================================================
   pantallas/desafio1.js · DESAFÍO 1 · LA CODIFICACIÓN DE HALLAZGOS
   ===================================================================== */

const cap = c => FRAGS.filter(f=>f.c===c).length;
/* Desafío 1: arrastrar (o tocar y tocar) cada fragmento a su categoría.
   Cada acierto queda apilado en su categoría con su número de orden y su código.
   Tras dos errores con el mismo fragmento, se muestra dónde va y se resalta. */
R.game1 = () => {
  const order = FRAGS.map((f,i)=>i).sort(()=>Math.random()-.5);
  const fill = {inseg:0, inst:0, socio:0, none:0}; let placed = 0, sel = null; const ERR1 = {};
  stage.innerHTML = `<section class="screen"><div class="g1 wrap">
    <div style="display:grid;gap:6px"><p class="eyebrow">Desafío 1 de 4 · Dinámica de asociación</p><h2>La codificación de hallazgos</h2>
    <p class="muted">Arrastrá cada fragmento flotante hasta su categoría de análisis. En pantallas táctiles también podés tocar el fragmento y luego la categoría. Cada acierto carga la categoría con energía de conocimiento. Cada fragmento tiene un código de tres partes: categoría (PI inseguridad, CI institucional, AS socioambiental), escenario (C comunidad, P playa) y fuente. Uno no encaja en ninguna categoría: guardalo aparte.</p>${guideBtn("game1")}</div>
    <div class="cloud" id="cloud">${order.map(i=>`<div class="frag" tabindex="0" role="button" data-i="${i}">${esc(FRAGS[i].t)}</div>`).join("")}</div>
    <p class="fb" id="fb" aria-live="polite"></p>
    <div class="bins">${Object.entries(CATS).map(([k,c])=>`<button class="bin" type="button" data-c="${k}"><h3><span class="long">${c.t}</span><span class="short">${c.s}</span></h3><p>${c.d}</p><div class="energy"><i></i></div><span class="src" data-n="${k}">0/${cap(k)}</span><span class="stack" data-s="${k}" aria-live="polite"></span></button>`).join("")}</div>
  </div></section>`;
  const fb = $("#fb");
  /* Intenta colocar un fragmento en una categoría y da retroalimentación. */
  const tryPlace = (fragEl, cat) => {
    const f = FRAGS[+fragEl.dataset.i];
    if(f.c === cat){
      A.ok(); fill[cat]++; placed++;
      fragEl.remove(); sel = null;
      const bin = $(`.bin[data-c="${cat}"]`);
      const it = document.createElement("span"); it.className = "it";
      it.innerHTML = `<span class="n">${placed}</span><span class="tx"><b>${esc(f.code)}</b> ${esc(f.t)}</span>`;
      it.title = f.t; bin.querySelector(".stack").appendChild(it);
      bin.querySelector(".energy i").style.width = (fill[cat]/cap(cat)*100)+"%";
      $(`[data-n="${cat}"]`).textContent = `${fill[cat]}/${cap(cat)}`;
      $$(".bin").forEach(x=>x.classList.remove("hint"));
      fb.className = "fb ok"; fb.textContent = cat === "none" ? `Guardado aparte. ${f.n} Código provisional: ${f.code}.` : `Bien codificado (${f.code}). ${WHY1[f.t] || ""}`;
      if(fill[cat] === cap(cat)){ bin.classList.add("full"); A.fanfare(); if(cat !== "none") fb.textContent = `Categoría completa: ${CATS[cat].t}.`; }
      if(placed === FRAGS.length){ $(".g1").classList.add("done"); fb.className = "fb ok"; fb.textContent = "¡Codificaste los 13 fragmentos! Así quedó tu matriz, en el orden en que los encontraste."; setTimeout(()=>earnBadge("conocimiento", "¡Felicidades, has superado el desafío 1!", "explore2", "Ir a la playa"), 3200); }
    } else {
      A.bad(); fragEl.classList.remove("bad"); void fragEl.offsetWidth; fragEl.classList.add("bad");
      const ix = +fragEl.dataset.i; ERR1[ix] = (ERR1[ix] || 0) + 1; fb.className = "fb no";
      if(ERR1[ix] >= 2){ fb.textContent = `Respuesta: este fragmento va en «${CATS[f.c].t}». ${WHY1[f.t] || f.n || ""} Tocá esa categoría (está resaltada) para colocarlo.`; $$(".bin").forEach(x=>x.classList.toggle("hint", x.dataset.c === f.c)); }
      else fb.textContent = `Ese fragmento va en otra categoría. Pista: ${HINT[f.c]}`;
    }
  };
  // tocar para seleccionar
  $$(".frag").forEach(el => {
    el.onkeydown = e => { if(e.key==="Enter"||e.key===" "){ e.preventDefault(); select(el); } };
    let sx, sy, moved = false, ghost = null;
    el.addEventListener("pointerdown", e => {
      sx = e.clientX; sy = e.clientY; moved = false; el.setPointerCapture(e.pointerId);
    });
    el.addEventListener("pointermove", e => {
      if(sx === undefined) return;
      if(!moved && Math.hypot(e.clientX-sx, e.clientY-sy) > 8){ moved = true; ghost = el.cloneNode(true); ghost.classList.add("drag"); document.body.appendChild(ghost); el.style.opacity = .3; }
      if(moved){ ghost.style.left = (e.clientX-130)+"px"; ghost.style.top = (e.clientY-20)+"px";
        const t = document.elementFromPoint(e.clientX, e.clientY); $$(".bin").forEach(b=>b.classList.toggle("hover", !!t && b.contains(t))); }
    });
    const end = e => {
      if(sx === undefined) return; sx = undefined;
      $$(".bin").forEach(b=>b.classList.remove("hover"));
      if(moved){ ghost && ghost.remove(); el.style.opacity = 1;
        const t = document.elementFromPoint(e.clientX, e.clientY); const bin = t && t.closest(".bin");
        if(bin) tryPlace(el, bin.dataset.c);
      } else select(el);
    };
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", () => { sx = undefined; ghost && ghost.remove(); el.style.opacity = 1; });
  });
  function select(el){ A.click(); $$(".frag").forEach(f=>f.classList.toggle("sel", f===el && !el.classList.contains("sel") ? true : false)); sel = el.classList.contains("sel") ? el : null; fb.className = "fb"; fb.textContent = sel ? "Ahora tocá la categoría donde va ese fragmento." : ""; }
  $$(".bin").forEach(b => b.onclick = () => { if(sel) tryPlace(sel, b.dataset.c); else { fb.className="fb"; fb.textContent = "Primero elegí o arrastrá un fragmento."; } });
};
