"use strict";
/* =====================================================================
   pantallas/exploracion.js · EXPLORACIÓN DE LAS ZONAS
   Escena, elementos, archivista y agente de desafío.
   ===================================================================== */

/* Dibuja a la archivista y al agente de desafío dentro de la escena. */
function npcArt(sc){
  const arch = {skin:"#6b4a35",shirt:"#264653",pants:"#1d3557",s:.9,hair:'<path d="M-23 -162 q23 -26 46 0 v12 h-46z" fill="#1b1b1b"/>',extra:'<g transform="translate(-46 -96)"><rect x="0" y="0" width="34" height="9" fill="#e76f51"/><rect x="2" y="-9" width="30" height="9" fill="#2a9d8f"/><rect x="-1" y="-18" width="34" height="9" fill="#e9c46a"/></g>'};
  const agt = {skin:"#c08a5f",shirt:"#0f2a2a",pants:"#111",s:.9,hair:'<path d="M-24 -160 q24 -30 48 0 q-6 -8 -24 -10 q-18 2 -24 10z" fill="#3b2a1a"/>',extra:'<circle cx="12" cy="-108" r="6" fill="#3df58e"/><ellipse cx="0" cy="-190" rx="24" ry="6" fill="none" stroke="#3df58e" stroke-width="3"/>'};
  return person(sc.repo.fx, sc.repo.fy, arch) + person(sc.des.fx, sc.des.fy, agt);
}
/* renderExplore(): pantalla de exploración de una zona. Se juega en tres pasos:
   1) investigar todos los spots, 2) hablar con la archivista (biblioteca),
   3) hablar con el agente (desafío). locked() bloquea a cada NPC hasta su paso. */
function renderExplore(key){
  const sc = SCENES[key];
  const ids = sc.spots.map(s=>s.id);
  const cnt = () => ids.filter(id=>S.clues[id]).length;
  const secDone = () => cnt() === ids.length;
  const repoDone = () => !!S.read[sc.repo.key];
  const NPC = {"npc-repo":Object.assign({role:"repo"}, sc.repo), "npc-des":Object.assign({role:"des"}, sc.des)};
  const locked = id => id === "npc-repo" ? !secDone() : !(secDone() && repoDone());
  stage.innerHTML = `<section class="screen"><div class="explore wrap">
    <div class="ex-head"><div style="display:grid;gap:6px;min-width:0"><p class="eyebrow">${sc.zone}</p><h2>${sc.title}</h2><p class="muted">${sc.intro}</p></div>
      <div class="counter">Hallazgos <b id="cnt">${cnt()}/${ids.length}</b></div></div>
    <div class="scene" id="scene">${sc.svg().replace(/<\/svg>\s*$/, npcArt(sc) + "</svg>")}
      ${sc.spots.map(s=>`<button class="hs ${S.clues[s.id]?"done":""}" type="button" data-id="${s.id}" style="left:${s.x/16}%;top:${s.y/9}%" aria-label="${s.label}">${S.clues[s.id]?ICON.check:ICON[s.kind]}<span class="hl">${s.label}</span></button>`).join("")}
      ${Object.entries(NPC).map(([id,n])=>`<button class="hs npc npc-${n.role} ${locked(id)?"locked":""}" type="button" data-id="${id}" style="left:${n.x/16}%;top:${n.y/9}%" aria-label="${n.label}">${n.role==="repo"?ICON.book:ICON.flag}<span class="hl">${n.label}</span></button>`).join("")}
      <img class="player" id="player" src="assets/p${(S.char??0)+1}.png" alt="Tu personaje" style="left:${sc.start[0]/16}%;top:${sc.start[1]/9}%">
      ${sc.chat ? '<div class="chatb" id="chatb" aria-hidden="true" hidden></div>' : ""}
    </div>
    <div class="chiplist">${sc.spots.map(s=>`<button class="chip ${S.clues[s.id]?"done":""}" type="button" data-id="${s.id}"><span class="st"></span>${s.label}</button>`).join("")}
      ${Object.entries(NPC).map(([id,n])=>`<button class="chip npcchip npc-${n.role}" type="button" data-id="${id}"><span class="st"></span>${n.label}</button>`).join("")}</div>
    <div id="exStep" class="unlock" aria-live="polite"></div>
  </div></section>`;
  const pl = $("#player");
  const pos = {x: sc.start[0], y: sc.start[1]};  /* posición del personaje (1600 × 900) */
  /* Mueve al personaje hasta el elemento tocado (con animación). */
  const walkTo = async (s) => {
    const tx = s.x + (s.x > 800 ? -110 : 110), ty = Math.min(Math.max(s.y + 150, 520), 890);
    pl.classList.remove("kb");
    pl.classList.toggle("flip", tx < pos.x); pos.x = tx; pos.y = ty;
    pl.classList.add("walk"); pl.style.left = (tx/16)+"%"; pl.style.top = (ty/9)+"%";
    await sleep(matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 900);
    pl.classList.remove("walk");
  };
  /* Actualiza el recuadro de abajo con el paso actual (1, 2 o 3). */
  const paintStep = () => {
    const box = $("#exStep");
    $$(".hs.npc").forEach(b => b.classList.toggle("locked", locked(b.dataset.id)));
    if(!secDone()) box.innerHTML = `<div><p class="eyebrow">Paso 1 de 3 · Información secundaria</p><p>Investigá los ${ids.length} elementos marcados. Llevás ${cnt()}. Las personas que conversan entre sí no se pueden tocar: leé lo que dicen.</p></div>`;
    else if(!repoDone()) box.innerHTML = `<div><p class="eyebrow">Paso 2 de 3 · El reloj vibró</p><p>Repositorio desbloqueado. Hablá con la ${sc.repo.label.replace(/^Archivista/,"archivista")} para leer los textos.</p></div><button class="btn sun" type="button" data-go="npc-repo">Ir con la archivista</button>`;
    else box.innerHTML = `<div><p class="eyebrow">Paso 3 de 3 · Desafío desbloqueado</p><p>Hablá con el agente de desafío para entrar a ${sc.des.name}.</p></div><button class="btn" type="button" data-go="npc-des">Ir con el agente</button>`;
    const g = box.querySelector("[data-go]"); if(g) g.onclick = () => interact(g.dataset.go);
  };
  /* Conversación con la archivista o el agente (o aviso si aún está bloqueado). */
  const talkNpc = id => {
    const n = NPC[id];
    if(locked(id)){
      openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="${n.label}"><div class="sheet-h"><h3>${n.label}</h3><span class="tag">Bloqueado</span><button class="x" data-close aria-label="Cerrar">${X_ICON}</button></div>
        <div class="sheet-b"><p class="quote">${esc(n.locked)}</p></div><div class="sheet-f"><button class="btn ghost" type="button" data-close>Entendido</button></div></div>`);
      V.say(n.locked); return;
    }
    if(n.role === "repo"){
      openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="${n.label}"><div class="sheet-h"><h3>${n.label}</h3><span class="tag sun">NPC de repositorio</span><button class="x" data-close aria-label="Cerrar">${X_ICON}</button></div>
        <div class="sheet-b"><p class="quote">${esc(n.hello)}</p><div class="kv"><div><b>En la biblioteca</b><span>${REPOS[n.key].docs.map(d=>esc(d.t)).join(" · ")}</span></div></div></div>
        <div class="sheet-f"><button class="btn sun" type="button" id="npcGo">Abrir la biblioteca</button></div></div>`);
      V.say(n.hello);
      $("#npcGo").onclick = () => go(n.key);
    } else {
      openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="${n.label}"><div class="sheet-h"><h3>${n.label}</h3><span class="tag live">NPC de desafío</span><button class="x" data-close aria-label="Cerrar">${X_ICON}</button></div>
        <div class="sheet-b"><div class="phrase"><q>${esc(n.phrase)}</q></div><p>Desafío ${n.num} de 4: <b>${esc(n.name)}</b>.</p></div>
        <div class="sheet-f"><button class="btn" type="button" id="npcGo">Iniciar el desafío</button></div></div>`);
      V.say(n.phrase, {pitch:.6, rate:.9});
      $("#npcGo").onclick = () => go(n.game);
    }
  };
  /* Al tocar un elemento: caminar hasta él y abrir su ficha o su conversación. */
  const interact = async id => {
    A.click();
    const s = sc.spots.find(x=>x.id===id) || NPC[id];
    await walkTo(s);
    if(NPC[id]) return talkNpc(id);
    openClue(id, () => {
      $$(`[data-id="${id}"]`).forEach(b=>b.classList.add("done"));
      const h = $(`.hs[data-id="${id}"]`); if(h) h.innerHTML = ICON.check + `<span class="hl">${s.label}</span>`;
      $("#cnt").textContent = `${cnt()}/${ids.length}`;
      paintStep();
      if(secDone()){ buzzWatch(); toast("El reloj vibra: Repositorio de Información desbloqueado"); $("#exStep").scrollIntoView({behavior:"smooth", block:"center"}); }
    });
  };
  $$("[data-id]", stage).forEach(b => b.onclick = () => interact(b.dataset.id));
  paintStep();
  /* Caminar con flechas, WASD o el mando táctil: ver motor/movimiento.js. */
  activarMovimiento({
    escena: $("#scene"), jugador: pl, pos,
    objetivos: () => [...sc.spots.map(x => ({id:x.id, x:x.x, y:x.y})), ...Object.entries(NPC).map(([id,n]) => ({id, x:n.x, y:n.y}))],
    alInteractuar: interact
  });
  if(sc.chat){
    let k = 0; const bub = $("#chatb");
    const step = () => {
      if(!document.body.contains(bub)) return clearInterval(tm);
      const [who, text] = sc.chat.lines[k % sc.chat.lines.length], pt = sc.chat[who];
      bub.hidden = false; bub.style.left = (pt.x/16) + "%"; bub.style.top = (pt.y/9) + "%";
      bub.innerHTML = `<b>${esc(pt.name)}</b>${esc(text)}`; bub.classList.remove("in"); void bub.offsetWidth; bub.classList.add("in"); k++;
    };
    const tm = setInterval(step, 4200); step();
  }
}

R.explore1 = () => renderExplore("comunidad");
R.explore2 = () => renderExplore("playa");
R.explore3 = () => renderExplore("final");
