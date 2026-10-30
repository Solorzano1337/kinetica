"use strict";
/* =====================================================================
   motor/interfaz.js · PIEZAS DE INTERFAZ
   Avisos, ventanas y el narrador con Saltar y Siguiente.
   ===================================================================== */

/* ============ Utilidades UI ============ */
/* toast(): aviso breve que desaparece solo. */
function toast(msg, ms=2600){ const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(()=>t.hidden = true, ms); }
/* openModal(): abre una ventana sobre el juego con el HTML dado. Los botones con
   data-close la cierran; también se cierra con Esc o tocando fuera. */
function openModal(html, onClose){
  const m = $("#modal"); m.innerHTML = html; m.hidden = false;
  const close = () => { m.hidden = true; m.innerHTML = ""; V.stop(); onClose && onClose(); };
  m.onclick = e => { if(e.target === m) close(); };
  $$("[data-close]", m).forEach(b => b.onclick = close);
  const f = m.querySelector("button, a, input, select"); f && f.focus();
  return close;
}
document.addEventListener("keydown", e => { if(e.key === "Escape" && !$("#modal").hidden){ const c = $("#modal [data-close]"); c && c.click(); } });
/* Velocidad del texto que se escribe letra por letra (Configuración). */
const speedMs = () => ({lenta:42, normal:22, rapida:7})[S.settings.speed] || 22;
const X_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg>';

/* Narrador: escribe párrafos uno a uno con botón Siguiente; lee en voz alta si está activo */
function narrate(root, {who, paras, voice={}, endLabel, onEnd}){
  let i = 0, typing = false, skipType = false;
  root.innerHTML = `<div class="cap wrap"><div class="cap-inner">
     <div class="who">${esc(who)}</div><div class="txt" aria-live="polite"></div>
     <div class="ctrl"><div class="dots">${paras.map(()=>"<i></i>").join("")}</div><span class="sp"></span>
       <button class="btn ghost" type="button" data-skip>Saltar</button><button class="btn" type="button" data-next>Siguiente</button></div></div></div>`;
  const txt = $(".txt", root), next = $("[data-next]", root), skip = $("[data-skip]", root);
  async function show(){
    $$(".dots i", root).forEach((d,k)=>d.classList.toggle("on", k<=i));
    const p = paras[i]; txt.textContent = ""; typing = true; skipType = false;
    V.say(p, voice);
    next.textContent = i === paras.length-1 ? (endLabel||"Continuar") : "Siguiente";
    for(let c=0;c<p.length;c++){ if(skipType){ txt.textContent = p; break; } txt.textContent += p[c]; if(c%3===0) await sleep(speedMs()*3); }
    typing = false;
  }
  next.onclick = () => { A.click(); if(typing){ skipType = true; return; } if(i < paras.length-1){ i++; show(); } else { V.stop(); onEnd(); } };
  skip.onclick = () => { V.stop(); skipType = true; onEnd(); };
  show();
}
