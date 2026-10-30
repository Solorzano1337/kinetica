"use strict";
/* =====================================================================
   motor/estado.js · AVANCE DE LA PARTIDA
   Orden de las pantallas, estado S y guardado en el navegador.
   ===================================================================== */

/* ============ Estado ============ */
/* ORDER: orden fijo de las pantallas. Cada clave corresponde a una función
   R.<clave>() más abajo. S.max guarda el índice más lejano alcanzado, así que
   si se cambia este arreglo hay que migrar las partidas guardadas (ver load()). */
const ORDER = ["cmds","desk","enter","intro","select","equip","map","brief","explore1","repo1","game1","explore2","repo2","game2","holo","repo3","game3","explore3","repo4","game4","grado","gracias","auto","end"];
/* Nombres legibles de cada pantalla (se usan en Configuración → Saltar a). */
const CHAPTER = {enter:"Ingreso a la computadora",cmds:"Comandos",intro:"Video inicial",select:"Selección de personaje",equip:"Pantalla de carga de equipamiento",map:"Mapa de Costa Rica",brief:"Mensaje de Kinética",explore1:"Exploración de la comunidad",repo1:"Repositorio 1",game1:"Desafío 1 · Codificación de hallazgos",explore2:"Exploración en la playa",repo2:"Repositorio 2",game2:"Desafío 2 · Radar de la información",holo:"Mensaje de Kinética (avances y logros)",repo3:"Repositorio 3",game3:"Desafío 3 · Lentes del conocimiento gráfico",explore3:"Exploración en la playa (final)",repo4:"Repositorio 4 · Triangulación",game4:"Desafío 4 · Triangulando la realidad",grado:"Obtención del grado",gracias:"Agradecimiento",auto:"Autoevaluación",end:"Expediente"};
/* Claves de las cuatro insignias, en orden de desafío. */
const BK = ["conocimiento","rigurosidad","interpretacion","cuarta"];
/* Etapa del viaje del héroe según la pantalla: Partida, Iniciación o Regreso. */
const phase = st => { const i = ORDER.indexOf(st); return i <= ORDER.indexOf("brief") ? "Partida" : i < ORDER.indexOf("grado") ? "Iniciación" : "Regreso"; };
/* fresh(): estado inicial de una partida nueva. Campos:
   v (versión del formato), stage (pantalla actual), max (pantalla más lejana),
   char y name (personaje y nombre), conclusion (texto del desafío 4),
   read (bibliotecas leídas), clues (elementos investigados), badges, items
   (reloj, lentes), auto (autoevaluación), warned (aviso sensible) y settings. */
const fresh = () => ({v:3, stage:"cmds", max:0, char:null, name:"", conclusion:"", read:{}, clues:{}, badges:[], items:[], auto:null, warned:false, settings:{music:true, sfx:true, voice:true, speed:"normal", vol:0.5}});
let S = fresh();
/* Clave de localStorage donde se guarda el avance en este navegador. */
const KEY = "kinetica-moin-v1";
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(S)); }catch(e){} }
/* Órdenes anteriores de ORDER. load() los usa para traducir S.max de partidas
   guardadas con versiones viejas del juego (sin v, o con v = 2). */
const OLD_ORDER = ["desk","intro","select","map","brief","explore1","repo1","game1","explore2","repo2","game2","holo","repo3","game3","explore3","repo4","game4","grado","gracias","auto","end"];
const V2_ORDER = ["desk","enter","cmds","intro","select","equip","map","brief","explore1","repo1","game1","explore2","repo2","game2","holo","repo3","game3","explore3","repo4","game4","grado","gracias","auto","end"];
/* Pantalla a la que vuelve «Continuar mi expediente». */
const resumeStage = () => ["cmds","desk","enter"].includes(S.stage) ? ORDER[Math.max(S.max, ORDER.indexOf("intro"))] : S.stage;
/* load(): lee el avance guardado, migra formatos viejos y completa campos que falten. */
function load(){ try{ const t = localStorage.getItem(KEY); if(t){ const o = JSON.parse(t); if(!o.v){ o.max = Math.max(0, ORDER.indexOf(OLD_ORDER[o.max] || "desk")); o.v = 3; } else if(o.v === 2){ o.max = Math.max(0, ORDER.indexOf(V2_ORDER[o.max] || "desk")); o.v = 3; } return Object.assign(fresh(), o, {settings:Object.assign(fresh().settings, o.settings||{})}); } }catch(e){} return null; }
