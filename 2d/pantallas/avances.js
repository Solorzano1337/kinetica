"use strict";
/* =====================================================================
   pantallas/avances.js · MENSAJE DE AVANCES Y LOGROS
   Se muestra después del desafío 2 y entrega los lentes.
   ===================================================================== */

/* ---------- Mensaje de Kinética (avances y logros) ---------- */
/* Mensaje de Kinética con avances y logros (2 de 4); entrega los lentes. */
R.holo = () => {
  stage.innerHTML = `<section class="screen" style="position:absolute;inset:0"><div class="cine glitch"><img class="bg" src="assets/intro.jpg" alt="Silueta anónima de Kinética frente a paneles de investigación"></div><div class="rec"><i></i>TRANSMISIÓN · KINÉTICA · AVANCES</div><div id="nar"></div></section>`;
  narrate($("#nar"), {who:"Voz de Kinética · Avances y logros", voice:{pitch:.35, rate:.88}, endLabel:"Ponerme los lentes", onEnd:giveLenses, paras: NARRACIONES.avancesYLogros});
};
function giveLenses(){
  if(!S.items.includes("lentes")) S.items.push("lentes"); save(); A.fanfare();
  openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Objeto obtenido">
    <div class="sheet-h"><h3>Has obtenido: Lentes del conocimiento gráfico</h3></div>
    <div class="sheet-b"><div class="reward"><div class="glowin">${LENS_SVG}</div><div class="kv">
      <div><b>Para qué sirven</b><span>Te ayudan a leer ejes, escalas, proporciones y tendencias en los gráficos del caso.</span></div>
      <div><b>Cuándo se usan</b><span>En el tercer desafío. Antes de entrar, el repositorio carga una guía rápida de análisis de gráficos.</span></div></div></div></div>
    <div class="sheet-f"><button class="btn" type="button" data-close>Cargar el repositorio</button></div></div>`, () => go("repo3"));
}
