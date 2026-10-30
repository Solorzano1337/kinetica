"use strict";
/* =====================================================================
   pantallas/ficha.js · FICHA DE UN ELEMENTO INVESTIGADO
   ===================================================================== */

/* openClue(): ficha de un elemento. Muestra lo que se ve (lines) y el botón para
   escanear; al escanear guarda la pista en S.clues y muestra el registro del reloj. */
function openClue(id, onDone){
  const c = CLUES[id];
  const already = !!S.clues[id];
  const isTalk = !!c.who;
  const body = c.news
    ? `<div class="newsp"><div class="mast">EL ECO DE MOÍN · ARCHIVO</div><h4>${esc(c.lines[0])}</h4>${c.lines.slice(1).map(l=>`<p>${esc(l)}</p>`).join("")}</div>`
    : c.lines.map(l => `<p class="${l.startsWith("«")?"quote":""}">${esc(l)}</p>`).join("");
  openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(c.title)}">
    <div class="sheet-h"><h3>${esc(c.title)}</h3><span class="tag sun">${esc(c.tag)}</span><button class="x" data-close aria-label="Cerrar">${X_ICON}</button></div>
    <div class="sheet-b">${body}
      <div class="scan" id="scanBox" ${already?"":"hidden"}><h4>Registro del reloj</h4><p>${esc(c.scan)}</p>${(c.refs||[]).length?`<div class="refl"><span class="src">Referencias</span>${c.refs.map(k=>`<p class="src">${REFS[k]}</p>`).join("")}</div>`:(c.src?`<span class="src">Fuente: ${esc(c.src)}</span>`:"")}</div></div>
    <div class="sheet-f">${already?`<button class="btn ghost" type="button" data-close>Cerrar</button>`:`<button class="btn" type="button" id="doScan">${esc(c.action)}</button>`}</div></div>`);
  if(isTalk) V.say(c.lines.join(" "), {pitch:1, rate:1.02});
  const b = $("#doScan");
  if(b) b.onclick = async () => {
    b.disabled = true; A.scan();
    const box = $("#scanBox"); box.hidden = false; box.classList.add("run"); box.querySelector("p").style.opacity = .15;
    await sleep(1300);
    box.classList.remove("run"); box.querySelector("p").style.opacity = 1;
    S.clues[id] = true; save(); updateWatch(); A.ok();
    b.outerHTML = `<button class="btn" type="button" data-close>Guardado en el reloj</button>`;
    const fin = () => { $("#modal").hidden = true; $("#modal").innerHTML = ""; V.stop(); onDone(); };
    $("#modal .sheet-f [data-close]").onclick = fin;
    $("#modal .sheet-h [data-close]").onclick = fin;
    $("#modal .sheet-f [data-close]").focus();
    $("#modal").onclick = e => { if(e.target.id === "modal") fin(); };
  };
}
