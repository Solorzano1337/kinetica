"use strict";
/* =====================================================================
   motor/arranque.js · ARRANQUE
   Se carga al final: lee el avance guardado y abre la primera pantalla.
   ===================================================================== */

/* ============ Arranque ============ */
/* start(): punto de entrada. Carga el avance guardado y abre la primera
   pantalla (las instrucciones). Si el entorno trae datos en caliente, los usa. */
function start(data){
  const saved = (data && data.state) || load();
  if(saved) S = Object.assign(fresh(), saved, {settings:Object.assign(fresh().settings, saved.settings||{})});
  window.claude?.hot?.snapshot?.(() => ({state:S}));
  go(data && data.state ? S.stage : "cmds");
}
window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});
