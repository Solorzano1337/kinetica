"use strict";
/* =====================================================================
   motor/movimiento.js · CAMINAR POR LAS ZONAS
   activarMovimiento() se llama al abrir cada zona (pantallas/exploracion.js).
   - Computadora: flechas o W A S D para caminar; Enter o E investiga el
     elemento resaltado.
   - Pantalla táctil: aparece un mando flotante abajo a la izquierda.
   - El personaje se mueve en coordenadas de 1600 × 900 (las de la escena),
     solo sobre el suelo: x entre 60 y 1540, y entre 520 y 890.
   - Un elemento se resalta cuando queda a menos de 150 unidades.
   - El bucle se detiene solo cuando la escena deja de existir (al cambiar de
     pantalla), y entonces quita también sus escuchas de teclado.
   Parámetros:
     escena ......... el contenedor #scene
     jugador ........ la imagen del personaje
     pos ............ {x, y} compartido con la caminata por clic
     objetivos() .... lista de {id, x, y} de los elementos de la zona
     alInteractuar .. función que abre el elemento (recibe su id)
   ===================================================================== */
function activarMovimiento({escena, jugador, pos, objetivos, alInteractuar}){
  const scene = escena, pl = jugador, interact = alInteractuar, keys = new Set(), joy = {x:0, y:0};
  const targets = objetivos;
  let near = null;
  const hint = document.createElement("div"); hint.className = "nearhint"; hint.hidden = true; scene.appendChild(hint);
  const touch = matchMedia("(pointer:coarse)").matches;
  if(touch){
    const jz = document.createElement("div"); jz.className = "joy"; jz.innerHTML = "<i></i>"; jz.setAttribute("aria-label","Mando para caminar"); scene.appendChild(jz);
    const kn = jz.querySelector("i"); let pid = null;
    const mv = e => { const r = jz.getBoundingClientRect(); let dx = e.clientX - (r.left + r.width/2), dy = e.clientY - (r.top + r.height/2); const m = Math.hypot(dx,dy), R0 = r.width/2; if(m > R0){ dx *= R0/m; dy *= R0/m; } joy.x = dx/R0; joy.y = dy/R0; kn.style.transform = `translate(${dx}px,${dy}px)`; };
    jz.onpointerdown = e => { pid = e.pointerId; jz.setPointerCapture(pid); mv(e); };
    jz.onpointermove = e => { if(e.pointerId === pid) mv(e); };
    jz.onpointerup = jz.onpointercancel = () => { pid = null; joy.x = joy.y = 0; kn.style.transform = ""; };
  }
  const KM = {arrowup:[0,-1], w:[0,-1], arrowdown:[0,1], s:[0,1], arrowleft:[-1,0], a:[-1,0], arrowright:[1,0], d:[1,0]};
  const typing = () => { const a = document.activeElement; return a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName); };
  const kd = e => {
    if(!document.body.contains(scene)) return cleanup();
    if(!$("#modal").hidden || typing()) return;
    const k = e.key.toLowerCase();
    if(KM[k]){ e.preventDefault(); keys.add(k); if(document.activeElement && document.activeElement.classList.contains("hs")) document.activeElement.blur(); }
    else if((k === "enter" || k === "e") && near && !(document.activeElement && document.activeElement.tagName === "BUTTON")){ e.preventDefault(); keys.clear(); interact(near); }
  };
  const ku = e => keys.delete(e.key.toLowerCase());
  const cleanup = () => { document.removeEventListener("keydown", kd); document.removeEventListener("keyup", ku); };
  document.addEventListener("keydown", kd); document.addEventListener("keyup", ku);
  let last = performance.now();
  const loop = now => {
    if(!document.body.contains(scene)){ cleanup(); return; }
    const dt = Math.min(.05, (now - last)/1000); last = now;
    let vx = joy.x, vy = joy.y;
    keys.forEach(k => { vx += KM[k][0]; vy += KM[k][1]; });
    const m = Math.hypot(vx, vy);
    if(m > .15 && $("#modal").hidden){
      vx /= Math.max(1, m); vy /= Math.max(1, m);
      pos.x = Math.min(1540, Math.max(60, pos.x + vx*420*dt)); pos.y = Math.min(890, Math.max(520, pos.y + vy*300*dt));
      pl.classList.add("kb", "walk"); if(Math.abs(vx) > .2) pl.classList.toggle("flip", vx < 0);
      pl.style.left = (pos.x/16) + "%"; pl.style.top = (pos.y/9) + "%";
      let best = null, bd = 1e9;
      targets().forEach(t => { const ay = Math.min(Math.max(t.y + 150, 520), 890), d = Math.hypot((t.x - pos.x)/1.4, ay - pos.y); if(d < bd){ bd = d; best = t; } });
      const nid = bd < 150 ? best.id : null;
      if(nid !== near){
        $$(".hs.near", scene).forEach(b => b.classList.remove("near")); near = nid;
        if(near){ const b = $(`.hs[data-id="${near}"]`, scene); b && b.classList.add("near"); hint.hidden = false; hint.textContent = touch ? "Tocá el elemento para investigar" : "Enter o E para investigar"; hint.style.left = (best.x/16) + "%"; hint.style.top = ((best.y - 34)/9) + "%"; }
        else hint.hidden = true;
      }
    } else pl.classList.remove("walk");
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
}
