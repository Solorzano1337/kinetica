"use strict";
/* =====================================================================
   pantallas/regreso.js · REGRESO DEL VIAJE
   Grado, credencial, agradecimiento, autoevaluación y expediente.
   ===================================================================== */

/* ---------- Obtención del grado ---------- */
/* Ceremonia de grado con la credencial de la persona. */
R.grado = () => {
  stage.innerHTML = `<section class="screen" style="position:absolute;inset:0"><div class="cine glitch"><img class="bg" src="assets/intro.jpg" alt="Sala de la Sociedad Kinética"></div>
    <div class="rec"><i></i>CEREMONIA · KINÉTICA</div><div id="nar"></div></section>`;
  A.fanfare();
  narrate($("#nar"), {who:"Voz de Kinética", voice:{pitch:.5, rate:.92}, endLabel:"Recibir mi credencial", onEnd:credential, paras: NARRACIONES.grado});
};

/* ---------- Credencial ---------- */
/* Credencial con personaje y nombre (editable). */
function credential(){
  const d = new Date().toLocaleDateString("es-CR", {day:"numeric", month:"long", year:"numeric"});
  A.fanfare();
  openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Credencial de persona investigadora">
    <div class="sheet-h"><h3>Grado de Persona Investigadora</h3></div>
    <div class="sheet-b">
      <div class="cred glowin"><img src="assets/p${(S.char??0)+1}.png" alt="Tu personaje">
        <div style="display:grid;gap:6px;min-width:0"><span class="eyebrow">Sociedad Kinética · Persona investigadora</span><span class="nm" id="credName">${esc(S.name.trim() || "Tu nombre")}</span>
        <span class="src">Caso rural · Moín, Limón · ${d}</span><div class="mini">${BK.map(k=>badgeSVG(k)).join("")}</div></div></div>
      <div style="display:grid;gap:6px"><label for="cName" class="eyebrow">Nombre para tu credencial</label><input id="cName" class="txtin" type="text" maxlength="40" value="${esc(S.name)}" placeholder="Escribí tu nombre" autocomplete="name"></div>
    </div>
    <div class="sheet-f"><button class="btn" type="button" data-close>Continuar</button></div></div>`, () => go("gracias"));
  $("#cName").oninput = e => { S.name = e.target.value; $("#credName").textContent = S.name.trim() || "Tu nombre"; save(); };
}

/* ---------- Agradecimiento ---------- */
/* Agradecimiento y créditos finales (incluye al profesor). */
R.gracias = () => {
  const nm = S.name.trim();
  stage.innerHTML = `<section class="screen"><div class="endscr wrap">
    <div style="display:grid;gap:10px"><p class="eyebrow">Agradecimiento</p><h2>Gracias por poner tu mente en movimiento${nm ? ", " + esc(nm) : ""}</h2>
    <p class="muted" style="max-width:62ch">Recorriste Moín como lo hace una persona investigadora: llegaste al terreno, escuchaste, dudaste de lo que no tenía respaldo, leíste los datos y cruzaste las fuentes hasta que dijeron lo mismo.</p>
    <p style="max-width:62ch">Jairo Mora Sandoval tenía 26 años cuando lo asesinaron en la playa que acabás de recorrer. Este caso existe para que su trabajo no se quede en la arena.</p></div>
    <div class="badges">${BK.map(k => `<div class="badge ${S.badges.includes(k)?"":"off"}">${badgeSVG(k)}<span>${BADGES[k].name}</span><small class="bdef">${BADGES[k].def}</small></div>`).join("")}</div>
    <p class="src" style="max-width:72ch">Kinética: el poder del conocimiento. Producto multimedia para el curso 05477 Investigación en Ciencias Sociales, Escuela de Ciencias Sociales y Humanidades de la UNED, en alianza con el Programa de Producción Electrónica Multimedial (PEM). Profesor del curso: Cristian Alonso Silva Jiménez. Desarrollo: Luis Alonso Solórzano Vásquez. Los personajes y algunos elementos de las escenas son ficticios; los datos del caso vienen de las fuentes de Contenido adicional.</p>
    <div style="display:flex;flex-wrap:wrap;gap:10px"><button class="btn" type="button" id="gA">Ir a la autoevaluación</button><button class="btn ghost" type="button" id="gC">Ver mi credencial</button><button class="btn ghost" type="button" id="gW">Créditos y fuentes</button></div>
  </div></section>`;
  $("#gA").onclick = () => go("auto");
  $("#gC").onclick = credential;
  $("#gW").onclick = openCredits;
};

/* Autoevaluación: 7–8 aciertos = dominio sólido, 5–6 = buen avance, menos = repasar. */
R.auto = () => {
  let i = 0; const miss = []; let score = 0;
  stage.innerHTML = `<section class="screen"><div class="g3 wrap">
    <div style="display:grid;gap:6px"><p class="eyebrow">Autoevaluación · Regreso del viaje</p><h2>¿Qué aprendiste?</h2>
    <p class="muted">Ocho preguntas sobre lo que practicaste. No suma insignias: sirve para saber qué conviene repasar.</p></div>
    <div class="progress"><i id="ap" style="width:0%"></i></div>
    <h3 id="aq" style="font-size:20px;font-family:var(--f-body);font-weight:700;line-height:1.35"></h3>
    <div class="opts" id="ao"></div><div id="afb"></div></div></section>`;
  const show = () => {
    const Q = AUTO[i];
    const opts = Q.o.map((t,k)=>({t, ok:k===0})).sort(()=>Math.random()-.5);
    $("#ap").style.width = (i/AUTO.length*100)+"%";
    $("#aq").textContent = `${i+1}. ${Q.q}`; $("#afb").innerHTML = "";
    $("#ao").innerHTML = opts.map((o,k)=>`<button class="opt" type="button" data-k="${k}"><span class="k">${String.fromCharCode(65+k)}</span><span>${esc(o.t)}</span></button>`).join("");
    $$("#ao .opt").forEach(b => b.onclick = () => {
      const o = opts[+b.dataset.k]; $$("#ao .opt").forEach(x=>x.disabled = true);
      if(o.ok){ score++; A.ok(); b.classList.add("right"); } else { A.bad(); b.classList.add("wrong"); if(!miss.includes(Q.ch)) miss.push(Q.ch); $$("#ao .opt").forEach((x,k)=>{ if(opts[k].ok) x.classList.add("right"); }); }
      $("#afb").innerHTML = `<div class="verdict ${o.ok?"ok":"no"}"><b>${o.ok?"Correcto":"Para repasar"} · ${esc(Q.ch)}</b><span>${esc(Q.why)}</span></div><div style="margin-top:10px"><button class="btn" type="button" id="aN">${i<AUTO.length-1?"Siguiente pregunta":"Ver mi resultado"}</button></div>`;
      $("#aN").onclick = () => { A.click(); i++; if(i < AUTO.length) show(); else finish(); }; $("#aN").focus();
    });
  };
  const finish = () => {
    S.auto = {score, total:AUTO.length, miss}; save();
    const lvl = score >= 7 ? "Dominio sólido" : score >= 5 ? "Buen avance" : "Conviene repasar";
    $("#ap").style.width = "100%";
    stage.querySelector(".g3").innerHTML = `<div style="display:grid;gap:8px"><p class="eyebrow">Autoevaluación · Resultado</p><h2>${score} de ${AUTO.length} · ${lvl}</h2>
      <p class="muted" style="max-width:62ch">${miss.length ? "Te conviene volver a mirar: " + miss.join(", ") + ". Los repositorios del reloj siguen disponibles desde el selector de capítulos." : "No fallaste ninguna. Cada paso del método quedó claro."}</p></div>
      <div><button class="btn" type="button" id="aEnd">Ver mi expediente</button></div>`;
    $("#aEnd").onclick = () => go("end");
  };
  show();
};

/* ---------- Final ---------- */
/* Expediente final: insignias, etapas, conclusión escrita y acceso al mapa. */
R.end = () => {
  const n = Object.keys(S.clues).length, keys = ["conocimiento","rigurosidad","interpretacion","cuarta"];
  const all = keys.every(k => S.badges.includes(k)), au = S.auto;
  stage.innerHTML = `<section class="screen"><div class="endscr wrap">
    <div style="display:grid;gap:8px"><p class="eyebrow">Expediente · Caso 01 · Moín</p><h2>${all ? "Sos miembro oficial de Kinética" : `Vas por ${S.badges.length} de 4 desafíos`}</h2>
    <p class="muted" style="max-width:62ch">${all ? "Ordenaste los hallazgos, separaste la evidencia del rumor, leíste los datos sin forzarlos y confirmaste cada hallazgo con fuentes independientes. Eso es investigar." : "Cuando reúnas las cuatro insignias, serás miembro oficial de Kinética."}</p></div>
    <div class="badges">${keys.map(k => `<div class="badge ${S.badges.includes(k)?"":"off"}">${badgeSVG(k)}<span>${BADGES[k].name}</span><small class="bdef">${BADGES[k].def}</small></div>`).join("")}</div>
    <div class="journey" aria-label="Viaje del héroe">
      <div class="jstep ${S.max >= ORDER.indexOf("brief") ? "done" : ""}"><b>Partida</b><span>Llamado a la aventura: video, personaje, mapa y reloj.</span></div>
      <div class="jstep ${all ? "done" : ""}"><b>Iniciación</b><span>Pruebas y transformación: exploración y cuatro desafíos.</span></div>
      <div class="jstep ${au ? "done" : ""}"><b>Regreso</b><span>Obtención del grado y autoevaluación${au ? `: ${au.score} de ${au.total}` : ""}.</span></div>
    </div>
    ${S.conclusion ? `<div class="viewer"><p class="eyebrow">Tu conclusión del caso</p><p>${esc(S.conclusion)}</p></div>` : ""}
    <p class="src">Hallazgos registrados en el reloj: ${n}/${totalClues()}</p>
    <div style="display:flex;flex-wrap:wrap;gap:10px"><button class="btn" type="button" id="eW">Revisar mis hallazgos</button><button class="btn ghost" type="button" id="eM">Volver al mapa</button><button class="btn ghost" type="button" id="eN">Leer las noticias del caso</button><button class="btn ghost" type="button" id="eC">Créditos y fuentes</button></div>
  </div></section>`;
  $("#eW").onclick = () => openWatch("hallazgos");
  $("#eM").onclick = () => go("map");
  $("#eN").onclick = () => $("#hNews").click();
  $("#eC").onclick = openCredits;
};
