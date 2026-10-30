"use strict";
/* =====================================================================
   pantallas/biblioteca.js · PANTALLA DE BIBLIOTECA
   ===================================================================== */

/* Pantalla de biblioteca: lista de textos a la izquierda y lector a la derecha. */
function renderRepo(key){
  const R0 = REPOS[key]; const read = new Set();
  stage.innerHTML = `<section class="screen"><div class="repo wrap">
    <div style="display:grid;gap:6px"><p class="eyebrow">NPC de repositorio · Archivista de Kinética</p><h2>${R0.title}</h2><p class="muted">${R0.intro}</p></div>
    <div class="repo-grid"><div class="files" role="list">${R0.docs.map((d,i)=>`<button class="file" type="button" role="listitem" data-i="${i}">${ICON.file}<span><b>${esc(d.t)}</b><small>${esc(d.k)}</small></span><span class="rd" data-r="${i}"></span></button>`).join("")}</div>
    <article class="viewer" id="viewer" aria-live="polite"><p class="muted">Elegí un texto de la lista para abrirlo.</p></article></div>
    <div class="phrase" id="phrase" ${S.read[key]?"":"hidden"}><p class="eyebrow">Biblioteca completa · Desafío desbloqueado</p><p>${esc(R0.done)}</p><div><button class="btn" type="button" id="backZone">${esc(R0.backLabel)}</button></div></div>
    <p class="src" id="left">Textos leídos: 0/${R0.docs.length}</p>
  </div></section>`;
  const show = i => {
    const d = R0.docs[i]; read.add(i); A.click();
    $$(".file").forEach(f=>f.setAttribute("aria-current", f.dataset.i==i));
    $("#viewer").innerHTML = `<p class="eyebrow">${esc(d.k)}</p><h3>${esc(d.t)}</h3>${d.b.map(p=>`<p>${esc(p)}</p>`).join("")}${(d.ref||[]).length?`<div class="refl"><span class="src">Referencias</span>${d.ref.map(r=>`<p class="src">${REFS[r]||esc(r)}</p>`).join("")}</div>`:""}`;
    $(`[data-r="${i}"]`).textContent = "LEÍDO";
    $("#left").textContent = `Textos leídos: ${read.size}/${R0.docs.length}`;
    if(read.size === R0.docs.length && !S.read[key]){ S.read[key] = true; save(); $("#phrase").hidden = false; A.ok(); buzzWatch(); toast("Desafío desbloqueado: volvé con el agente de desafío"); }
  };
  $$(".file").forEach(f => f.onclick = () => show(+f.dataset.i));
  $("#backZone").onclick = () => go(R0.back);
  show(0);
}
R.repo1 = () => renderRepo("repo1");
R.repo2 = () => renderRepo("repo2");
R.repo4 = () => renderRepo("repo4");
