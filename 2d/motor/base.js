"use strict";
/* =====================================================================
   motor/base.js · ATAJOS COMUNES
   Se carga primero: lo usan todos los demás archivos.
   ===================================================================== */

/* Atajos: $ busca un elemento, $$ busca varios, sleep espera milisegundos
   y esc() escapa texto antes de meterlo en HTML (evita romper el marcado). */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const stage = $("#stage");
const sleep = ms => new Promise(r => setTimeout(r, ms));
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
