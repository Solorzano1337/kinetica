"use strict";
/* =====================================================================
   pantallas/inicio.js · PARTIDA DEL VIAJE
   Escritorio, ingreso, instrucciones, video, personaje, nombre, equipamiento,
   mapa y mensaje de Kinética.
   ===================================================================== */


/* Escritorio: aparece la ventana emergente de reclutamiento; al presionarla empieza el viaje. */
R.desk = () => {
  const has = S.max > ORDER.indexOf("enter");
  const now = new Date();
  stage.innerHTML = `<section class="screen" style="position:absolute;inset:0"><div class="desk">
    <div class="desk-body">
      <p class="where-cap" id="whereCap" aria-live="polite"></p>
      <div class="icons">
        <button class="dicon" type="button" data-open><svg viewBox="0 0 48 48"><path d="M4 12h16l4 4h20v24H4z" fill="#123d2c" stroke="#3df58e" stroke-width="2"/><circle cx="24" cy="28" r="7" fill="none" stroke="#3df58e" stroke-width="2"/></svg>Kinética</button>
        <button class="dicon" type="button" data-note><svg viewBox="0 0 48 48"><path d="M10 6h22l8 8v28H10z" fill="#1a3340" stroke="#93b4ae" stroke-width="2"/><path d="M16 20h16M16 26h16M16 32h10" stroke="#93b4ae" stroke-width="2"/></svg>notas.txt</button>
      </div>
      <div class="win popwin" id="popWin" role="dialog" aria-label="Mensaje emergente de Kinética" hidden>
        <div class="win-bar"><i></i><i></i><i></i><span>kinetica://reclutamiento · mensaje emergente</span></div>
        <button class="win-body pop-msg" type="button" data-start>
          <span class="eyebrow" style="color:var(--sunset)">Nuevo mensaje · Kinética</span>
          <span class="pop-h1">Sociedad de personas investigadoras <em>Kinética</em></span>
          <span class="pop-txt">Estamos en proceso de reclutamiento. ¿Querés ser parte de la aventura?</span>
          <span class="btn">Presioná el mensaje para entrar</span>
        </button>
        ${has?`<div class="pop-foot"><button class="btn ghost" type="button" data-cont>Continuar mi expediente</button></div>`:""}
      </div>
    </div>
    <div class="taskbar wrap"><span>KNTC_OS</span><span>${now.toLocaleDateString("es-CR",{weekday:"short",day:"numeric",month:"short"})} · ${now.toLocaleTimeString("es-CR",{hour:"2-digit",minute:"2-digit"})}</span></div>
  </div></section>`;
  const cap = NARRACIONES.escritorio;
  (async () => { const el = $("#whereCap"); for(let i=0;i<cap.length;i++){ if(!document.body.contains(el)) return; el.textContent += cap[i]; await sleep(18); } })();
  const showPop = () => { const w = $("#popWin"); if(!w || !w.hidden) return; w.hidden = false; A.popup(); };
  setTimeout(showPop, 1500);
  const start = () => { A.resume(); go("enter"); };
  $("[data-start]").onclick = start;
  $("[data-open]").onclick = () => { A.resume(); showPop(); };
  $("[data-note]").onclick = () => toast("notas.txt: «Si aparece un mensaje de Kinética, presionalo.»");
  const c = $("[data-cont]"); if(c) c.onclick = () => { A.resume(); go(resumeStage()); };
};

/* Ingreso a la computadora: la pantalla absorbe a la persona */
R.enter = () => {
  stage.innerHTML = `<section class="screen" style="position:absolute;inset:0"><div class="absorb">
    <svg class="room" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><radialGradient id="lampG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb347" stop-opacity=".55"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>
      <radialGradient id="scrG" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#e9fff5"/><stop offset=".35" stop-color="#3df58e"/><stop offset=".7" stop-color="#1e6fd0"/><stop offset="1" stop-color="#06131b"/></radialGradient></defs>
      <rect width="1600" height="900" fill="#0b1820"/>
      <rect x="0" y="0" width="1600" height="560" fill="#102632"/>
      <g opacity=".7"><rect x="120" y="90" width="300" height="16" fill="#1d3a48"/><rect x="140" y="40" width="30" height="50" fill="#2a9d8f"/><rect x="175" y="50" width="24" height="40" fill="#e76f51"/><rect x="204" y="34" width="34" height="56" fill="#e9c46a"/><rect x="120" y="200" width="300" height="16" fill="#1d3a48"/><rect x="150" y="150" width="60" height="50" fill="#264653"/></g>
      <circle cx="430" cy="430" r="260" fill="url(#lampG)"/>
      <path d="M400 330 h70 l-20 110 h-30z" fill="#ff9d3c"/><rect x="428" y="440" width="14" height="120" fill="#5a3d27"/>
      <rect x="0" y="560" width="1600" height="40" fill="#3a2a1d"/><rect x="0" y="600" width="1600" height="300" fill="#22170f"/>
      <g id="monitor"><rect x="700" y="150" width="620" height="420" rx="26" fill="#d9d4c3"/><rect x="730" y="178" width="560" height="360" rx="14" fill="#06131b"/>
        <rect id="monScr" x="742" y="190" width="536" height="336" rx="10" fill="url(#scrG)" opacity=".25"/>
        <g class="vortex" id="vortex"><g fill="none" stroke-width="10" stroke-linecap="round" opacity=".85">
          <path d="M1010 358 m0 -150 a150 150 0 0 1 150 150" stroke="#6fe3ff"/><path d="M1010 358 m150 0 a150 150 0 0 1 -150 150" stroke="#3df58e"/>
          <path d="M1010 358 m0 150 a150 150 0 0 1 -150 -150" stroke="#6fe3ff"/><path d="M1010 358 m-150 0 a150 150 0 0 1 150 -150" stroke="#3df58e"/>
          <path d="M1010 358 m0 -90 a90 90 0 0 1 90 90" stroke="#fff"/><path d="M1010 358 m0 90 a90 90 0 0 1 -90 -90" stroke="#fff"/></g></g>
        <g id="monPop"><rect x="840" y="290" width="340" height="130" rx="10" fill="#0d2532" stroke="#3df58e" stroke-width="3"/><text x="1010" y="345" text-anchor="middle" fill="#3df58e" font-family="Chakra Petch, sans-serif" font-size="34" font-weight="700">KINÉTICA</text><text x="1010" y="385" text-anchor="middle" fill="#e5f3ef" font-family="sans-serif" font-size="20">¿Querés ser parte de la aventura?</text></g>
        <rect x="960" y="570" width="100" height="40" fill="#bdb7a5"/></g>
      <path d="M700 640 h560 l40 70 h-640z" fill="#d6d0bd"/><g fill="#a9a390">${Array.from({length:30},(_,i)=>`<rect x="${700+(i%10)*55}" y="${652+Math.floor(i/10)*18}" width="44" height="12" rx="2"/>`).join("")}</g>
      <g id="chair"><rect x="300" y="560" width="300" height="340" rx="40" fill="#1a1a1a"/><rect x="330" y="590" width="240" height="300" rx="30" fill="#262626"/></g>
      <g id="who"><path d="M300 900 C 300 700 360 640 450 630 C 540 640 600 700 600 900z" fill="#e8ecef"/>
        <ellipse cx="450" cy="560" rx="95" ry="105" fill="#2b1d14"/><path d="M370 600 q80 60 160 0 v40 q-80 40 -160 0z" fill="#2b1d14"/>
        <path d="M560 700 C 640 690 700 680 760 660" stroke="#e8ecef" stroke-width="56" stroke-linecap="round" fill="none"/><circle cx="772" cy="656" r="26" fill="#d9a07a"/></g>
    </svg>
    <canvas id="abs" aria-hidden="true"></canvas>
    <p class="abs-cap" id="absCap" aria-live="polite">Presionaste el mensaje…</p>
    <div class="abs-ctrl"><button class="btn ghost" type="button" id="absSkip">Saltar</button></div>
  </div></section>`;
  let done = false;
  const finish = () => { if(done) return; done = true; go("intro"); };
  $("#absSkip").onclick = finish;
  const cv = $("#abs"), ctx = cv.getContext("2d"), root = $(".absorb");
  const fit = () => { cv.width = root.clientWidth*devicePixelRatio; cv.height = root.clientHeight*devicePixelRatio; };
  fit();
  const rc = el => { const r = el.getBoundingClientRect(), o = root.getBoundingClientRect(); return {x:(r.left-o.left)*devicePixelRatio, y:(r.top-o.top)*devicePixelRatio, w:r.width*devicePixelRatio, h:r.height*devicePixelRatio}; };
  const scr = rc($("#monScr")), who = rc($("#who"));
  const cx = scr.x + scr.w/2, cy = scr.y + scr.h/2;
  const cols = ["#3df58e","#6fe3ff","#ffffff","#2a9df4","#a6ffcf"];
  const P = [];
  const spawn = k => { for(let i=0;i<k;i++){ const x = who.x + Math.random()*who.w, y = who.y + Math.random()*who.h*.9; const dx = x-cx, dy = y-cy; P.push({r:Math.hypot(dx,dy), a:Math.atan2(dy,dx), w:(1.6+Math.random()*1.8), v:(.35+Math.random()*.5), s:(3+Math.random()*6)*devicePixelRatio, c:cols[i%cols.length]}); } };
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let t0 = performance.now(), last = t0, absorbing = false;
  const vt = $("#vortex"), whoEl = $("#who"), pop = $("#monPop"), scrEl = $("#monScr");
  const loop = now => {
    if(done || !document.body.contains(cv)) return;
    const dt = Math.min(.05, (now-last)/1000); last = now; const el = (now - t0)/1000;
    ctx.clearRect(0,0,cv.width,cv.height);
    if(absorbing && el < 3.6) spawn(reduce ? 2 : 9);
    for(let i=P.length-1;i>=0;i--){ const q = P[i]; q.a += q.w*dt*(1 + 300/(q.r+60)); q.r -= q.r*q.v*dt*1.6 + 40*dt*devicePixelRatio;
      if(q.r < 6){ P.splice(i,1); continue; }
      const x = cx + Math.cos(q.a)*q.r, y = cy + Math.sin(q.a)*q.r*.75; ctx.globalAlpha = Math.min(1, q.r/80); ctx.fillStyle = q.c; ctx.fillRect(x, y, q.s, q.s); }
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  };
  (async () => {
    await sleep(900); if(done) return;
    $("#absCap").textContent = "La computadora te absorbe…"; A.absorb(); absorbing = true; t0 = performance.now();
    pop.style.opacity = 0; scrEl.style.opacity = 1; vt.classList.add("spin"); whoEl.classList.add("dissolve");
    requestAnimationFrame(loop);
    await sleep(3300); if(done) return;
    absorbing = false; whoEl.style.display = "none"; vt.classList.remove("spin"); scrEl.classList.add("flash");
    $("#absCap").textContent = "Aparece la pantalla, pero ya no hay nadie frente a ella.";
    await sleep(2200); finish();
  })();
};

/* Comandos: instrucciones y controles */
R.cmds = () => {
  stage.innerHTML = `<section class="screen"><div class="cmds wrap">
    <h2 class="cmd-title">Instrucciones</h2>
    <div class="cmd-cols">
      <div class="cmd-col">
        <div class="cmd-block"><h3>Objetivo de la misión</h3>
          <p class="cmd-goal">Resolver el caso de Moín: explorá cada zona, investigá con el reloj a personas, animales y objetos, leé los repositorios y superá los cuatro desafíos del análisis de resultados. Con las cuatro insignias te convertís en miembro oficial de Kinética.</p></div>
        <div class="cmd-block"><h3>Cómo se juega</h3>
          <ol class="cmd-steps">
            <li><b>Explorá la zona.</b> Acercate a cada persona, animal u objeto marcado e investigalo con el reloj. Cada pista queda guardada con su fuente.</li>
            <li><b>Leé la biblioteca.</b> Cuando investigás todo, el reloj vibra y la archivista de Kinética abre los textos de la zona.</li>
            <li><b>Superá el desafío.</b> El agente de desafío te lleva al minijuego. Si te trabás, el botón «Pistas, explicación y fuentes» te guía hasta la respuesta.</li>
            <li><b>Ganá las cuatro insignias.</b> Son tres zonas y cuatro desafíos; con las cuatro obtenés el grado de miembro oficial de Kinética.</li>
          </ol></div>
      </div>
      <div class="cmd-col cmd-ctrl">
        <div class="cmd-block"><h3>Controles</h3>
          <p>En computadora usá las teclas para caminar por cada zona:</p>
          <div class="keys"><div class="kgrp"><span class="k"></span><span class="k on">↑</span><span class="k"></span><span class="k on">←</span><span class="k on">↓</span><span class="k on">→</span></div>
            <div class="kgrp"><span class="k"></span><span class="k out">W</span><span class="k"></span><span class="k out">A</span><span class="k out">S</span><span class="k out">D</span></div></div>
          <p class="muted">Cerca de algo, presioná <b>Enter</b> o <b>E</b> para investigarlo. También podés hacer clic sobre cada elemento. <b>Esc</b> cierra las ventanas.</p>
          <div class="cmd-mob"><svg viewBox="0 0 220 120" aria-hidden="true"><rect x="10" y="10" width="200" height="100" rx="18" fill="none" stroke="#6fe3ff" stroke-width="6"/><rect x="22" y="22" width="160" height="76" rx="6" fill="none" stroke="#6fe3ff" stroke-width="3"/><circle cx="196" cy="60" r="7" fill="#6fe3ff"/><circle cx="48" cy="78" r="13" fill="none" stroke="#6fe3ff" stroke-width="3"/><path d="M48 68l4 5h-8zM48 88l4 -5h-8zM38 78l5 4v-8zM58 78l-5 4v-8z" fill="#6fe3ff"/></svg>
            <p class="muted">En móvil colocá el dispositivo en horizontal y usá el mando flotante de abajo a la izquierda. También podés tocar cada elemento.</p></div>
        </div>
      </div>
    </div>
    <div class="cmd-actions"><button class="btn sun cmd-go" type="button" id="cmdGo">Comenzar</button>${S.max > ORDER.indexOf("enter") ? `<button class="btn ghost" type="button" id="cmdCont">Continuar mi expediente</button>` : ""}</div>
    <p class="src" style="text-align:center;margin:0">Con música, efectos y voz. Podés cambiarlos en Configuración. Tu avance se guarda en este navegador.</p>
  </div></section>`;
  $("#cmdGo").onclick = () => { A.resume(); go("desk"); };
  const cc = $("#cmdCont"); if(cc) cc.onclick = () => { A.resume(); go(resumeStage()); };
};

/* Video inicial: voz de Kinética sobre la imagen intro.jpg (texto del guion). */
R.intro = () => {
  stage.innerHTML = `<section class="screen" style="position:absolute;inset:0"><div class="cine glitch"><img class="bg" src="assets/intro.jpg" alt="Silueta anónima de Kinética frente a paneles de investigación"></div>
    <div class="rec"><i></i>TRANSMISIÓN · KINÉTICA</div><div id="nar"></div></section>`;
  narrate($("#nar"), {who:"Voz de Kinética", voice:{pitch:.35, rate:.88}, endLabel:"Acepto el llamado", onEnd:()=>go("select"), paras: NARRACIONES.videoInicial});
};

/* Selección de personaje; al confirmar pasa a la asignación de nombre. */
R.select = () => {
  stage.innerHTML = `<section class="screen"><div class="select wrap">
    <div><p class="eyebrow">Selección de personaje · Aceptaste el desafío</p><h2>Seleccioná al accionador de tu preferencia</h2></div>
    <div class="cards">${CHARS.map((c,i)=>`<button class="pc" type="button" data-i="${i}" aria-pressed="${S.char===i}">
      <div class="art"><img src="assets/p${i+1}.png" alt="${c.name}"></div>
      <div><div class="code">${c.code}</div><h3>${c.name}</h3><p>${c.txt}</p></div></button>`).join("")}</div>
    <div><button class="btn" type="button" id="selOk" ${S.char===null?"disabled":""}>Asignar nombre</button></div>
  </div></section>`;
  $$(".pc").forEach(b => b.onclick = () => { S.char = +b.dataset.i; save(); A.ok(); $$(".pc").forEach(x=>x.setAttribute("aria-pressed", x===b)); $("#selOk").disabled = false; });
  $("#selOk").onclick = nameScreen;
};
/* Asignación de nombre con teclado en pantalla (también acepta el teclado físico). */
function nameScreen(){
  const MAXN = 14; let nm = (S.name || "").toUpperCase().slice(0, MAXN);
  const L = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
  stage.innerHTML = `<section class="screen"><div class="namescr wrap">
    <div class="nm-who"><img src="assets/p${(S.char??0)+1}.png" alt="Tu personaje"><span class="code">${CHARS[S.char??0].code}</span></div>
    <h2 class="cmd-title">Asignale un nombre</h2>
    <div class="nm-line" id="nmLine" aria-live="polite"></div>
    <div class="nm-keys">${L.map(l=>`<button type="button" class="nk" data-l="${l}">${l}</button>`).join("")}<button type="button" class="nk del" id="nkDel" aria-label="Borrar"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M8 5h12v14H8l-6-7z"/><path d="M11 9l6 6M17 9l-6 6"/></svg></button></div>
    <button type="button" class="nk space" id="nkSp" aria-label="Espacio"><span></span></button>
    <p class="src">También podés escribir con el teclado. Máximo ${MAXN} letras.</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center"><button class="btn ghost" type="button" id="nmBack">Cambiar personaje</button><button class="btn sun" type="button" id="nmOk">Listo</button></div>
  </div></section>`;
  const paint = () => { $("#nmLine").textContent = nm || " "; $("#nmOk").disabled = nm.trim().length < 2; };
  const add = ch => { if(nm.length < MAXN){ nm += ch; A.click(); paint(); } };
  $$(".nk[data-l]").forEach(b => b.onclick = () => add(b.dataset.l));
  $("#nkDel").onclick = () => { nm = nm.slice(0,-1); A.click(); paint(); };
  $("#nkSp").onclick = () => { if(nm && !nm.endsWith(" ")) add(" "); };
  const kb = e => {
    if(!document.body.contains($("#nmLine"))) return document.removeEventListener("keydown", kb);
    if(e.key === "Backspace"){ e.preventDefault(); nm = nm.slice(0,-1); paint(); }
    else if(e.key === "Enter" && !$("#nmOk").disabled){ e.preventDefault(); $("#nmOk").click(); }
    else if(e.key === " " && document.activeElement === document.body){ e.preventDefault(); if(nm && !nm.endsWith(" ")) add(" "); }
    else if(/^[a-zñáéíóúü]$/i.test(e.key)){ add(e.key.toUpperCase().normalize("NFD").replace(/[́̈]/g,"").normalize("NFC")); }
  };
  document.addEventListener("keydown", kb);
  $("#nmBack").onclick = () => { document.removeEventListener("keydown", kb); R.select(); };
  $("#nmOk").onclick = () => { document.removeEventListener("keydown", kb); S.name = nm.trim().split(/\s+/).map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(" "); save(); A.ok(); go("equip"); };
  paint();
}

/* Pantalla de carga de equipamiento: el reloj del conocimiento */
R.equip = () => {
  const who = S.name || "Accionador/a";
  const T = NARRACIONES.equipamiento;
  const GEAR = [["Mochila",'<path d="M7 8a5 5 0 0 1 10 0v12H7z"/><path d="M9 8V6a3 3 0 0 1 6 0v2M9 14h6"/>'],["Binoculares",'<circle cx="7" cy="15" r="4"/><circle cx="17" cy="15" r="4"/><path d="M9 8h6M7 11V6h3v5M14 11V6h3v5"/>'],["Mapa",'<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>'],["Brújula",'<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 5-4 1 2-5z"/>']];
  stage.innerHTML = `<section class="screen" style="position:absolute;inset:0"><div class="equip">
    <div class="eq-stage" id="eqStage">
      <div class="eq-rings"><i></i><i></i><i></i></div>
      <img class="eq-char" id="eqChar" src="assets/p${(S.char??0)+1}.png" alt="${esc(who)} con su equipo de campo">
      <div class="eq-gear">${GEAR.map(([n,p],i)=>`<span class="g g${i}" title="${n}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">${p}</svg></span>`).join("")}</div>
    </div>
    <div class="eq-side">
      <p class="eyebrow">Pantalla de carga · Equipamiento de ${esc(who)}</p>
      <h2>El reloj del conocimiento</h2>
      <p class="eq-txt">${esc(T)}</p>
      <button class="eq-watch" type="button" id="eqWatch" aria-label="Tocar el reloj del conocimiento">${watchSVG(0, true)}<span>Tocá el reloj</span></button>
      <div class="progress"><i id="eqBar" style="width:0%"></i></div><p class="src" id="eqPct">Equipamiento: 0 %</p>
      <div id="eqOut"></div>
    </div>
  </div></section>`;
  V.say(T);
  let busy = false;
  $("#eqWatch").onclick = async () => {
    if(busy) return; busy = true; V.stop(); A.resume(); A.electric();
    $("#eqWatch").classList.add("used"); $("#eqStage").classList.add("charging");
    for(let p=0;p<=100;p+=4){ if(!document.body.contains($("#eqBar"))) return; $("#eqBar").style.width = p+"%"; $("#eqPct").textContent = `Equipamiento: ${p} %`; await sleep(100); }
    $("#eqStage").classList.remove("charging"); $("#eqStage").classList.add("ready");
    if(!S.items.includes("reloj")) S.items.push("reloj"); save(); updateWatch(); buzzWatch();
    $("#eqPct").textContent = "Equipamiento completo";
    $("#eqOut").innerHTML = `<div class="kv glowin">
        <div><b>Escanear</b><span>Apuntá el reloj a animales y objetos para registrar pistas con su fuente.</span></div>
        <div><b>Guía de campo</b><span>Revisá en la pantalla de tu muñeca la información que has obtenido, tus insignias y tus objetos.</span></div>
        <div><b>Radar de la zona</b><span>El reloj muestra qué te falta investigar en cada lugar. Cuando completás una zona, vibra y abre el repositorio.</span></div></div>
      <div style="margin-top:14px"><button class="btn sun" type="button" id="eqGo">Ir al mapa de casos</button></div>`;
    $("#eqGo").onclick = () => go("map");
    $("#eqGo").focus();
  };
};

/* Mapa de casos: caso rural de Moín (jugable) y caso urbano (próximamente). */
R.map = () => {
  const started = S.max >= ORDER.indexOf("brief");
  stage.innerHTML = `<section class="screen"><div class="mapscr wrap">
    <div class="mapbox">
      <svg viewBox="40 30 940 850" role="img" aria-label="Mapa de Costa Rica con los casos disponibles">
        <defs><pattern id="seaP" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M0 12h24" stroke="#1d4152" stroke-width="1"/></pattern></defs>
        <rect x="0" y="0" width="1000" height="900" fill="url(#seaP)" opacity=".5"/>
        <path d="${MAP.ni}" fill="#0c2733" stroke="#24505f"/><path d="${MAP.pa}" fill="#0c2733" stroke="#24505f"/>
        <path d="${MAP.cr}" fill="#123f3a" stroke="#3df58e" stroke-width="2.5" style="filter:drop-shadow(0 0 10px rgba(61,245,142,.35))"/>
        <text class="lbl" x="560" y="62">NICARAGUA</text><text class="lbl" x="860" y="700">PANAMÁ</text>
        <text class="lbl" x="80" y="640">OCÉANO PACÍFICO</text><text class="lbl" x="700" y="200">MAR CARIBE</text>
        <g class="mk locked" id="mkUrb" tabindex="0" role="button" aria-label="Caso urbano en San José, todavía no disponible"><circle cx="544" cy="371" r="11" fill="#5d7f86" stroke="#93b4ae" stroke-width="3"/><text x="380" y="420">Caso urbano · San José</text></g>
        <g class="mk" id="mkMoin" tabindex="0" role="button" aria-label="Abrir caso de Moín, Limón">
          <circle class="pulse" cx="799" cy="353" r="16" fill="none" stroke="#ff8f45" stroke-width="3"/>
          <circle cx="799" cy="353" r="12" fill="#ff8f45" stroke="#fff" stroke-width="3"/>
          <text x="822" y="345" style="font-weight:600">Caso rural</text><text x="822" y="372" style="font-size:17px">Moín, Limón</text></g>
      </svg>
    </div>
    <div style="display:grid;gap:14px">
      <div class="casecard">
        <span class="tag live">Caso rural · ${started?"En curso":"Disponible"}</span>
        <h2>La matanza y saqueo de tortugas marinas en el Caribe rural</h2>
        <p class="src" style="color:var(--sunset)">Caso Jairo Mora y redes de cazadores · Moín, Limón</p>
        <p class="muted">La madrugada del 31 de mayo de 2013, Jairo Mora Sandoval fue asesinado en playa Moín. Su nombre se convirtió en bandera del conservacionismo. Cuatro saqueadores de huevos de tortuga recibieron la pena máxima: 50 años de prisión.</p>
        <button class="btn sun" type="button" id="openCase">${started?"Volver al caso":"Abrir caso"}</button>
      </div>
      <div class="casecard" style="opacity:.8">
        <span class="tag">Caso urbano · Próximamente</span>
        <h3 style="font-size:19px">El ciberataque masivo a las instituciones públicas (Costa Rica, 2022)</h3>
        <p class="muted" style="font-size:14px">El 17 de abril de 2022 empezó una ola de ciberataques extorsivos, reivindicados por el grupo Conti y días después por Hive. El Ministerio de Hacienda fue el primero; luego cayeron la CCSS, el MICITT, el IMN y RACSA.</p>
        <p class="src">Este caso todavía no se desarrolla.</p>
      </div>
      <div class="mapbar"><button class="btn ghost" type="button" id="mNews">Contenido adicional</button><button class="btn ghost" type="button" id="mSet">Configuración</button><button class="btn ghost" type="button" id="mCred">Créditos y fuentes</button></div>
    </div>
  </div></section>`;
  const open = () => { const dest = started ? (S.stage === "map" ? ORDER[Math.max(S.max, ORDER.indexOf("brief"))] : S.stage) : "brief"; if(started || S.warned){ go(dest); return; } sensitive(() => { S.warned = true; save(); go(dest); }); };
  $("#openCase").onclick = open; $("#mkMoin").onclick = open; $("#mkMoin").onkeydown = e => { if(e.key==="Enter"||e.key===" "){ e.preventDefault(); open(); } };
  $("#mNews").onclick = () => $("#hNews").click(); $("#mSet").onclick = openSettings; $("#mCred").onclick = openCredits;
  const urb = () => toast("El caso urbano todavía no está disponible. Por ahora, abrí el caso rural de Moín.");
  $("#mkUrb").onclick = urb; $("#mkUrb").onkeydown = e => { if(e.key==="Enter"||e.key===" "){ e.preventDefault(); urb(); } };
};

/* Aviso de contenido sensible antes de entrar al caso por primera vez. */
function sensitive(cb){
  openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Aviso de contenido sensible">
    <div class="sheet-h"><h3>Antes de entrar al caso</h3></div>
    <div class="sheet-b"><p>Este caso trata de hechos reales y violentos, entre ellos el asesinato de un ambientalista. Se cuenta con sobriedad y sin escenas gráficas.</p>
    <p class="muted">Los personajes del terreno son ficticios; las cifras y los hechos vienen de fuentes publicadas (Contenido adicional). Podés volver al mapa cuando quieras.</p></div>
    <div class="sheet-f"><button class="btn ghost" type="button" data-close>Volver al mapa</button><button class="btn" type="button" id="sOk">Entiendo, entrar al caso</button></div></div>`);
  $("#sOk").onclick = () => { $("#modal").hidden = true; $("#modal").innerHTML = ""; cb(); };
}

/* Mensaje de Kinética desde la playa: explica la misión antes de explorar. */
R.brief = () => {
  stage.innerHTML = `<section class="screen" style="position:absolute;inset:0"><div class="cine glitch"><img class="bg" src="assets/moin.jpg" alt="Investigador de Kinética en la playa de Moín ajustando su reloj"></div><div id="nar"></div></section>`;
  narrate($("#nar"), {who:"Investigador(a) de Kinética · transmisión inestable", voice:{pitch:.9, rate:1}, endLabel:"Explorar la comunidad", onEnd:() => { updateWatch(); buzzWatch(); go("explore1"); }, paras: NARRACIONES.mensajeKinetica});
};
