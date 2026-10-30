"use strict";
/* =====================================================================
   pantallas/desafio2.js · DESAFÍO 2 · EL RADAR DE LA INFORMACIÓN
   ===================================================================== */

/* Desafío 2: validar o descartar cada testimonio. Los que se fallan vuelven al
   final de la fila hasta acertarlos todos. */
R.game2 = () => {
  let queue = TESTS.map((t,i)=>i), ok = 0, tries = 0; const dots = [];
  stage.innerHTML = `<section class="screen"><div class="g2 wrap">
    <div style="display:grid;gap:6px"><p class="eyebrow">Desafío 2 de 4 · Aprobar y descartar</p><h2>El radar de la información</h2>
    <p class="muted">Leé cada fragmento de entrevista y decidí si lo validás como evidencia o lo descartás por su sesgo. Los que fallés vuelven al final de la fila.</p>${guideBtn("game2")}</div>
    <div class="g2-grid"><div id="card"></div>
      <div class="radar"><svg viewBox="0 0 200 200" aria-label="Radar de testimonios validados"><circle cx="100" cy="100" r="92" fill="#071a14" stroke="#1d8d55"/><circle cx="100" cy="100" r="62" fill="none" stroke="#1d8d55" opacity=".6"/><circle cx="100" cy="100" r="32" fill="none" stroke="#1d8d55" opacity=".6"/><path d="M8 100h184M100 8v184" stroke="#1d8d55" opacity=".4"/><g class="sw"><path d="M100 100 L100 8 A92 92 0 0 1 165 35z" fill="#3df58e" opacity=".18"/></g><g id="rdots"></g></svg>
      <p class="src" id="rstat" style="text-align:center">Evaluados correctamente: 0/${TESTS.length}</p></div></div>
  </div></section>`;
  const card = $("#card");
  const show = () => {
    if(!queue.length){ setTimeout(()=>earnBadge("rigurosidad","¡Felicidades, has superado el desafío 2!","holo","Recibir mensaje de Kinética"), 400); return; }
    const t = TESTS[queue[0]];
    card.innerHTML = `<div class="tcard"><div class="who">${esc(t.who)}</div><blockquote>${esc(t.q)}</blockquote>
      <div class="vote"><button class="btn" type="button" data-v="1">Validar</button><button class="btn sun" type="button" data-v="0">Descartar</button></div>
      <details class="hintd"><summary>Ver pista</summary><p>Preguntate: ¿la persona vio o vivió lo que cuenta? ¿Generaliza con «todo», «siempre» o «nadie»? ¿Afirma una causa solo porque dos cosas pasaron al mismo tiempo? ¿Aporta un dato que se pueda revisar o solo una opinión? Si falla en alguna, se descarta.</p></details><div id="verd"></div></div>`;
    V.say(t.q, {pitch:1});
    $$("[data-v]", card).forEach(b => b.onclick = () => judge(b.dataset.v === "1"));
  };
  const judge = val => {
    const idx = queue.shift(), t = TESTS[idx]; tries++;
    $$("[data-v]", card).forEach(b=>b.disabled = true);
    const right = val === t.v;
    if(right){ ok++; A.ok();
      const a = Math.random()*Math.PI*2, r = 20 + Math.random()*65;
      $("#rdots").insertAdjacentHTML("beforeend", `<circle cx="${100+Math.cos(a)*r}" cy="${100+Math.sin(a)*r}" r="5" fill="${t.v?"#3df58e":"#ff8f45"}"><animate attributeName="r" from="12" to="5" dur=".5s"/></circle>`);
    } else { A.bad(); queue.push(idx); }
    $("#rstat").textContent = `Evaluados correctamente: ${ok}/${TESTS.length}`;
    $("#verd").innerHTML = `<div class="verdict ${right?"ok":"no"}"><b>${right?"Correcto":"Revisalo de nuevo"} · ${t.v?"Se valida":"Se descarta"} · ${esc(t.tag)}</b><span>${esc(t.why)}</span></div>
      <div style="margin-top:10px"><button class="btn" type="button" id="nx">${queue.length?"Siguiente testimonio":"Ver resultado"}</button></div>`;
    $("#nx").onclick = () => { A.click(); show(); }; $("#nx").focus();
  };
  show();
};
