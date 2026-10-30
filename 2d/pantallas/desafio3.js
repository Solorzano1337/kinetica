"use strict";
/* =====================================================================
   pantallas/desafio3.js · DESAFÍO 3 · LENTES DEL CONOCIMIENTO GRÁFICO
   Pantalla de carga con consejos y preguntas sobre gráficos.
   ===================================================================== */

R.repo3 = () => {
  let i = 0, p = 0;
  stage.innerHTML = `<section class="screen"><div class="loading wrap">
    <p class="eyebrow">Repositorio · Análisis de gráficos</p><h2 style="font-size:clamp(24px,3.6vw,34px)">Calibrando los Lentes del conocimiento gráfico</h2>
    <div class="progress"><i id="lp" style="width:0%"></i></div>
    <div class="tip" id="tip"></div>
    <div style="display:flex;flex-wrap:wrap;gap:10px"><button class="btn ghost" type="button" id="tPrev">Anterior</button><button class="btn ghost" type="button" id="tNext">Siguiente consejo</button><span style="flex:1"></span><button class="btn" type="button" id="toG3" disabled>Entrar al desafío 3</button></div>
  </div></section>`;
  const seen = new Set();
  const paint = () => { seen.add(i); $("#tip").innerHTML = `<span class="src">Consejo ${i+1} de ${TIPS.length}</span><b>${TIPS[i][0]}</b><p>${TIPS[i][1]}</p>`; };
  paint();
  $("#tNext").onclick = () => { A.click(); i = (i+1)%TIPS.length; paint(); };
  $("#tPrev").onclick = () => { A.click(); i = (i-1+TIPS.length)%TIPS.length; paint(); };
  const iv = setInterval(() => { if(!document.body.contains($("#lp"))) return clearInterval(iv); p = Math.min(100, p + 2); $("#lp").style.width = p+"%"; if(p >= 100){ clearInterval(iv); $("#toG3").disabled = false; A.ok(); } }, 90);
  $("#toG3").onclick = () => go("game3");
};

/* Desafío 3: una pregunta por vez; pista al primer error, respuesta al segundo. */
R.game3 = () => {
  let i = 0, lastChart = "", miss = 0;
  const advance = () => { i++; if(i < Q3.length){ A.click(); show(); } else { $("#qp").style.width = "100%"; earnBadge("interpretacion","¡Felicidades, has superado el desafío 3!","explore3","Ir a la playa (final)"); } };
  stage.innerHTML = `<section class="screen"><div class="g3 wrap">
    <div style="display:grid;gap:6px"><p class="eyebrow">Desafío 3 de 4 · Selección única</p><h2>Lentes del conocimiento gráfico</h2>
    <p class="muted">Kinética te propone preguntas sobre cada gráfico. Elegí una respuesta; si fallás, leé la pista y volvé a intentar.</p>${guideBtn("game3")}</div>
    <div class="progress"><i id="qp" style="width:0%"></i></div>
    <div class="chart" id="chart"></div><h3 id="qq" style="font-size:20px;font-family:var(--f-body);font-weight:700;line-height:1.35"></h3>
    <div class="opts" id="opts"></div><div id="qfb"></div>
  </div></section>`;
  const show = () => {
    const Q = Q3[i]; miss = 0;
    if(Q.chart) lastChart = Q.chart();
    $("#chart").innerHTML = lastChart;
    $("#qq").textContent = Q.q;
    $("#qp").style.width = (i/Q3.length*100)+"%";
    $("#qfb").innerHTML = "";
    $("#opts").innerHTML = Q.o.map((o,k)=>`<button class="opt" type="button" data-k="${k}"><span class="k">${String.fromCharCode(65+k)}</span><span>${esc(o)}</span></button>`).join("");
    V.say(Q.q, {pitch:1.5, rate:1.05});
    $$(".opt").forEach(b => b.onclick = () => {
      const k = +b.dataset.k;
      if(k === Q.a){
        A.ok(); b.classList.add("right"); $$(".opt").forEach(x=>x.disabled = true);
        $("#qfb").innerHTML = `<div class="verdict ok"><b>Correcto</b><span>${esc(Q.why)}</span></div><div style="margin-top:10px"><button class="btn" type="button" id="qn">${i<Q3.length-1?"Siguiente pregunta":"Terminar desafío"}</button></div>`;
        $("#qn").onclick = advance;
        $("#qn").focus();
      } else {
        A.bad(); b.classList.add("wrong"); b.disabled = true; miss++;
        if(miss >= 2){
          $(`.opt[data-k="${Q.a}"]`).classList.add("right"); $$(".opt").forEach(x=>x.disabled = true);
          $("#qfb").innerHTML = `<div class="verdict no"><b>Respuesta correcta: ${String.fromCharCode(65+Q.a)}</b><span>${esc(Q.why)}</span></div><div style="margin-top:10px"><button class="btn" type="button" id="qn">${i<Q3.length-1?"Siguiente pregunta":"Terminar desafío"}</button></div>`;
          $("#qn").onclick = advance; $("#qn").focus();
        } else $("#qfb").innerHTML = `<div class="verdict no"><b>Todavía no · Pista</b><span>${esc(HINT3[i])}</span></div>`;
      }
    });
  };
  show();
};
