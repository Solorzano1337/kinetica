"use strict";
/* =====================================================================
   pantallas/desafio4.js · DESAFÍO 4 · TRIANGULANDO LA REALIDAD
   Acertijos de triangulación y redacción de la conclusión.
   ===================================================================== */

const triSVG = n => `<svg viewBox="0 0 200 180" aria-hidden="true"><path d="M100 18 178 152H22z" fill="rgba(61,245,142,.06)" stroke="#24505f" stroke-width="2"/>${n>=2?'<path d="M100 18 178 152" stroke="#3df58e" stroke-width="3"/>':''}${n>=3?'<path d="M178 152H22L100 18" stroke="#3df58e" stroke-width="3" fill="rgba(61,245,142,.12)"/>':''}${[[100,18],[178,152],[22,152]].map((p,i)=>`<circle cx="${p[0]}" cy="${p[1]}" r="11" fill="${i<n?"#3df58e":"#071a14"}" stroke="#3df58e" stroke-width="3"/>`).join("")}</svg>`;

const explainCards = T => `<ul class="explain">${T.cards.map(c => c.ok
  ? `<li class="ok"><i>✓</i><span><b>${esc(c.who)}.</b> ${esc(WHY4[c.who] || "")}</span></li>`
  : `<li class="no"><i>✗</i><span><b>${esc(c.who)}.</b> ${esc(c.why || "")}</span></li>`).join("")}</ul>`;
/* Desafío 4: tres acertijos de triangulación y después la redacción de la
   conclusión (writeStage). Tras dos fallos aparece «Mostrar las tres fuentes». */
R.game4 = () => {
  let r = 0, pick = new Set(), fails = 0;
  const bindHint = () => { const b = $("#tHint"); if(b) b.onclick = () => { A.click(); $("#tHintBox").innerHTML = `<div class="verdict" style="border:1px solid var(--line);background:var(--deep)"><b>Pista</b><span>${esc(HINT4[r])}</span></div>`; b.remove(); }; };
  stage.innerHTML = `<section class="screen"><div class="g2 wrap">
    <div style="display:grid;gap:6px"><p class="eyebrow">Desafío 4 de 4 · Acertijo y redacción</p><h2>Triangulando la realidad</h2><p class="muted" id="tIntro"></p>${guideBtn("game4")}</div>
    <div class="progress"><i id="tp" style="width:0%"></i></div><div id="tri"></div></div></section>`;
  const next = () => { r++; if(r < TRI.length){ A.click(); show(); } else { A.click(); writeStage(); } };
  const show = () => {
    const T = TRI[r]; pick = new Set(); fails = 0;
    $("#tp").style.width = (r/TRI.length*100)+"%";
    $("#tIntro").textContent = T.verdict
      ? "Leé la afirmación y las tres fuentes. Decidí qué se puede decir del hallazgo."
      : "Una afirmación gana peso cuando fuentes que no se conocen coinciden. Elegí las tres fuentes independientes que la sostienen y cerrá el triángulo.";
    const head = `<div class="tcard"><div class="who">Afirmación a confirmar · acertijo ${r+1} de ${TRI.length}</div><blockquote>${esc(T.claim)}</blockquote><div><button class="btn ghost" type="button" id="tHint">Ver pista</button></div><div id="tHintBox"></div></div>`;
    V.say(T.claim, {pitch:1});
    if(T.verdict){
      $("#tri").innerHTML = head + `<div class="tcards" style="margin-top:14px">${T.cards.map(c=>`<div class="tc"><span class="who">${esc(c.t)} · ${esc(c.who)}</span><span>${esc(c.q)}</span></div>`).join("")}</div>
        <div class="opts" id="vo" style="margin-top:14px">${T.o.map((o,k)=>`<button class="opt" type="button" data-k="${k}"><span class="k">${String.fromCharCode(65+k)}</span><span>${esc(o)}</span></button>`).join("")}</div><div id="tfb" style="margin-top:12px"></div>`;
      bindHint();
      $$("#vo .opt").forEach(b => b.onclick = () => {
        const k = +b.dataset.k;
        if(k === T.a){ A.ok(); b.classList.add("right"); $$("#vo .opt").forEach(x=>x.disabled = true);
          $("#tfb").innerHTML = `<div class="verdict ok"><b>Correcto</b><span>${esc(T.win)}</span><ul class="explain">${T.cards.map(c=>`<li class="ok"><i>✓</i><span><b>${esc(c.who)}.</b> ${esc(R3WHY[c.who] || "")}</span></li>`).join("")}</ul></div><div style="margin-top:10px"><button class="btn" type="button" id="tNext">Pasar a la redacción</button></div>`;
          $("#tNext").onclick = next; $("#tNext").focus();
        } else { A.bad(); b.classList.add("wrong"); b.disabled = true;
          $("#tfb").innerHTML = `<div class="verdict no"><b>Todavía no</b><span>Fijate en la palabra «siempre»: ¿las tres fuentes la respaldan?</span></div>`; }
      });
      return;
    }
    $("#tri").innerHTML = head + `<div class="g2-grid" style="margin-top:14px"><div class="tcards">${T.cards.map((c,i)=>`<button class="tc" type="button" data-i="${i}" aria-pressed="false"><span class="who">${esc(c.t)} · ${esc(c.who)}</span><span>${esc(c.q)}</span></button>`).join("")}</div>
      <div class="radar tri"><div id="trisvg">${triSVG(0)}</div><p class="src" id="tcnt" style="text-align:center">Fuentes elegidas: 0/3</p><button class="btn" type="button" id="tVer" disabled style="width:100%">Verificar el triángulo</button></div></div><div id="tfb" style="margin-top:12px"></div>`;
    bindHint();
    const sync = () => { $("#trisvg").innerHTML = triSVG(pick.size); $("#tcnt").textContent = `Fuentes elegidas: ${pick.size}/3`; $("#tVer").disabled = pick.size !== 3; };
    $$(".tc", $("#tri")).forEach(b => b.onclick = () => {
      const i = +b.dataset.i; A.click();
      if(pick.has(i)){ pick.delete(i); b.setAttribute("aria-pressed","false"); $("#tfb").innerHTML = ""; }
      else if(pick.size < 3){ pick.add(i); b.setAttribute("aria-pressed","true"); $("#tfb").innerHTML = ""; }
      else { $("#tfb").innerHTML = `<div class="verdict no"><b>Ya elegiste tres</b><span>Quitá una fuente para cambiarla.</span></div>`; }
      sync();
    });
    $("#tVer").onclick = () => {
      const bad = [...pick].map(i=>T.cards[i]).filter(c=>!c.ok);
      if(!bad.length){ A.ok(); $$(".tc", $("#tri")).forEach(b=>b.disabled = true); $("#tVer").disabled = true;
        $("#tfb").innerHTML = `<div class="verdict ok"><b>Triángulo cerrado</b><span>${esc(T.win)}</span>${explainCards(T)}</div><div style="margin-top:10px"><button class="btn" type="button" id="tNext">${r < TRI.length-1 ? "Siguiente acertijo" : "Siguiente"}</button></div>`;
        $("#tNext").onclick = next; $("#tNext").focus();
      } else { A.bad(); fails++;
        $("#tfb").innerHTML = `<div class="verdict no"><b>Ese triángulo no se sostiene</b><span>${bad.map(c=>esc(c.who)+": "+esc(c.why)).join(" ")}</span></div>${fails >= 2 ? `<div style="margin-top:10px"><button class="btn ghost" type="button" id="tShow">Mostrar las tres fuentes correctas</button></div>` : ""}`;
        const sb = $("#tShow"); if(sb) sb.onclick = () => { pick = new Set(T.cards.map((c,k)=>c.ok?k:-1).filter(k=>k>=0)); $$(".tc", $("#tri")).forEach(b=>b.setAttribute("aria-pressed", pick.has(+b.dataset.i))); sync(); $("#tfb").innerHTML = `<div class="verdict" style="border:1px solid var(--line);background:var(--deep)"><b>Estas son las tres fuentes</b><span>Tocá «Verificar el triángulo» para cerrarlo y leer por qué cada una sirve.</span></div>`; }; }
    };
  };
  /* Redacción final: CHECKS son las reglas de la lista de revisión (expresiones
     regulares). Con todas cumplidas se reclama la insignia; el texto se guarda en
     S.conclusion y aparece en el expediente. */
  const writeStage = () => {
    $("#tp").style.width = "100%";
    $("#tIntro").textContent = "Última parte: redactá la conclusión del caso con lo que confirmaste en los acertijos.";
    const CHECKS = [
      {id:"len", t:"Tiene entre 60 y 180 palabras.", f:(x,w) => w >= 60 && w <= 180, tip:"Ajustá la extensión: entre 60 y 180 palabras."},
      {id:"hal", t:"Responde con un hallazgo del caso (vigilancia, vehículos, nidos).", f:x => /(veh[ií]cul|carro|patrull|vigilanc|nido|saque)/i.test(x), tip:"Decí qué se encontró: por ejemplo, que entran vehículos de noche o que con patrullaje se salvan más nidos."},
      {id:"src", t:"Menciona al menos dos tipos de fuente.", f:x => [/(testimonio|pescador|lideresa|bi[oó]logo|vecin|entrevist)/i, /(registro|widecast|documento|informe|dato|cifra|1\.?750)/i, /(huella|perro|observ|evidencia|reloj)/i].filter(rx => rx.test(x)).length >= 2, tip:"Nombrá las fuentes que coinciden: un testimonio, un documento o dato, una evidencia física u observación."},
      {id:"cit", t:"Cita al menos una fuente con autor y año, como (Mongabay, 2013).", f:x => /\([^()]*\b(19|20)\d{2}\)/.test(x), tip:"Agregá la cita del dato que usás: (Mongabay, 2013), (El Universo, 2012) o (WIDECAST, citado por Mongabay, 2013)."},
      {id:"cau", t:"Usa lenguaje de evidencia (muestra, sugiere, indica, coincide).", f:x => /(muestra|sugiere|indica|se asocia|asociaci|coincid|apunta)/i.test(x), tip:"Usá verbos prudentes: «muestra», «sugiere», «indica», «coincide»."},
      {id:"lim", t:"Reconoce una limitación.", f:x => /(sin embargo|aunque|limitaci|no permite|no prueba|no demuestra|har[ií]a falta|no alcanza)/i.test(x), tip:"Agregá un límite: «Sin embargo, estos datos no permiten afirmar que…» o «Haría falta…»."},
      {id:"abs", t:"Evita palabras absolutas (siempre, nunca, demostrado).", f:x => x.trim().length > 0 && !/(\bsiempre\b|\bnunca\b|demostrad|comprobad|todo el mundo|\bnadie\b|definitivamente|sin duda)/i.test(x), tip:"Quitá palabras absolutas como «siempre», «nunca», «demostrado» o «sin duda»."}
    ];
    $("#tri").innerHTML = `<div class="tcard"><div class="who">Redacción · conclusión del caso</div><blockquote>¿Qué se puede concluir sobre la vigilancia nocturna y el saqueo de nidos en Moín?</blockquote></div>
      <div class="wr-grid">
        <div class="wr-main">
          <label for="wTxt" class="eyebrow">Tu conclusión (entre 60 y 180 palabras)</label>
          <textarea id="wTxt" class="txtin wr-area" placeholder="Escribí aquí tu conclusión…">${esc(S.conclusion || "")}</textarea>
          <p class="src" id="wCount">0 palabras</p>
          <div class="wr-chips"><span class="eyebrow">Frases de apoyo</span>${CHIPS.map((c,k)=>`<button type="button" data-chip="${k}">${esc(c)}…</button>`).join("")}</div>
          <div style="display:flex;flex-wrap:wrap;gap:10px"><button class="btn" type="button" id="wCheck">Revisar mi conclusión</button><button class="btn ghost" type="button" id="wModel">Ver un ejemplo</button></div>
          <div id="wfb" aria-live="polite"></div>
        </div>
        <aside class="wr-side"><p class="eyebrow">Lista de revisión</p><ul class="checks" id="wChecks"></ul>
          <p class="src">Una buena conclusión responde la pregunta, se apoya en los resultados, no trae datos nuevos, señala sus límites (Bermúdez Rubio et al., 2021) y cita cada dato que no es propio.</p></aside>
      </div>`;
    const ta = $("#wTxt");
    const words = () => (ta.value.trim().match(/\S+/g) || []).length;
    const paint = () => {
      const w = words(); $("#wCount").textContent = `${w} palabra${w === 1 ? "" : "s"}`;
      $("#wChecks").innerHTML = CHECKS.map(c => { const ok = c.f(ta.value, w); return `<li class="${ok?"ok":""}"><i>${ok?"✓":"○"}</i><span>${esc(c.t)}</span></li>`; }).join("");
      S.conclusion = ta.value; save();
    };
    ta.oninput = paint; paint();
    $$("[data-chip]").forEach(b => b.onclick = () => { const t = CHIPS[+b.dataset.chip]; ta.value = (ta.value.trim() ? ta.value.replace(/\s*$/, " ") : "") + t + " "; ta.focus(); paint(); });
    $("#wModel").onclick = () => {
      A.click();
      $("#wfb").innerHTML = `<div class="verdict" style="border:1px solid var(--line);background:var(--deep)"><b>Ejemplo de conclusión</b><span>${esc(MODEL)}</span><span class="src">Usalo como guía y escribilo con tus palabras: así practicás la redacción y evitás copiar.</span><div style="margin-top:8px"><button class="btn ghost" type="button" id="wUse">Copiar el ejemplo al cuadro para editarlo</button></div></div>`;
      $("#wUse").onclick = () => { ta.value = MODEL; paint(); ta.focus(); };
    };
    $("#wCheck").onclick = () => {
      const w = words(), miss = CHECKS.filter(c => !c.f(ta.value, w));
      if(!miss.length){
        A.fanfare(); S.conclusion = ta.value.trim(); save();
        $("#wfb").innerHTML = `<div class="verdict ok"><b>Conclusión lista</b><span>Responde la pregunta, se apoya en fuentes que coinciden y reconoce sus límites. Va a quedar guardada en tu expediente.</span></div><div style="margin-top:10px"><button class="btn" type="button" id="wDone">Reclamar la insignia</button></div>`;
        $("#wDone").onclick = () => earnBadge("cuarta", "¡Felicidades, has superado el desafío 4!", "grado", "Ver la ceremonia");
        $("#wDone").focus();
      } else {
        A.bad();
        $("#wfb").innerHTML = `<div class="verdict no"><b>Te falta ajustar ${miss.length === 1 ? "un punto" : miss.length + " puntos"}</b><ul class="explain">${miss.map(c=>`<li class="no"><i>○</i><span>${esc(c.tip)}</span></li>`).join("")}</ul><span class="src">Si te trabás, tocá «Ver un ejemplo».</span></div>`;
      }
    };
  };
  show();
};
