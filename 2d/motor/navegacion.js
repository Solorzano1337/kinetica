"use strict";
/* =====================================================================
   motor/navegacion.js · CAMBIO DE PANTALLA
   go() y el objeto R, donde cada pantalla registra su función.
   ===================================================================== */

/* ============ Navegación ============ */
/* go(): pasa a la pantalla indicada. Guarda el avance, muestra u oculta el HUD,
   enciende el sonido del mar en la playa y llama a R[st]() para dibujarla. */
function go(st){
  A.click(); V.stop();
  S.stage = st; S.max = Math.max(S.max, ORDER.indexOf(st)); save();
  $("#modal").hidden = true;
  stage.scrollTop = 0;
  const showHud = !["desk","enter"].includes(st);
  $("#hud").hidden = !showHud;
  $("#hMap").hidden = ORDER.indexOf(st) < ORDER.indexOf("map") || st === "map";
  $("#hudCase").textContent = ORDER.indexOf(st) >= ORDER.indexOf("brief") ? "Caso 01 · Moín · " + phase(st) : "Sociedad de Personas Investigadoras";
  A.setOcean(["explore2","explore3","brief","holo"].includes(st));
  updateWatch();
  document.body.classList.toggle("ingame", /^game/.test(st));
  (R[st] || R.desk)();
}

/* R: una función por pantalla. Cada una reemplaza el contenido de #stage y
   conecta sus botones. El orden en que se juegan está en ORDER. */
const R = {};
