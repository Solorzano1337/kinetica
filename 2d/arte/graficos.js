"use strict";
/* =====================================================================
   arte/graficos.js · GRÁFICOS DEL DESAFÍO 3
   Barras y diagrama de puntos en SVG. Se carga antes del contenido porque
   las preguntas de contenido/desafios.js usan dotsChart al definirse.
   ===================================================================== */

/* ---------- Desafío 3: lectura de gráficos ---------- */
/* Gráfico de barras horizontal en SVG a partir de {l, v} (etiqueta, valor). */
function barChart({title, src, data, max}){
  const narrow = innerWidth < 600;
  const W = narrow ? 420 : 640, padL = narrow ? 150 : 200, padR = 64, top = 10, rowH = narrow ? 64 : 58, h = top + data.length*rowH + 36;
  const fs = narrow ? 15 : 13;
  const sc = v => (W-padL-padR) * v / max;
  const ticks = narrow ? [0, max/2, max] : [0, max/4, max/2, max*3/4, max];
  return `<p class="ctitle">${esc(title)}</p><svg viewBox="0 0 ${W} ${h}" role="img" aria-label="${esc(title)}">
    ${ticks.map(t=>`<line x1="${padL+sc(t)}" y1="${top}" x2="${padL+sc(t)}" y2="${h-30}" stroke="#24505f" stroke-dasharray="3 4"/><text x="${padL+sc(t)}" y="${h-10}" fill="#93b4ae" font-size="${fs-2}" text-anchor="middle">${Math.round(t).toLocaleString("es-CR")}</text>`).join("")}
    ${data.map((d,i)=>{ const y = top + i*rowH + rowH*0.2, bh = rowH*0.6; return `
      <text x="${padL-10}" y="${y+bh/2+5}" fill="#e5f3ef" font-size="${fs}" text-anchor="end">${esc(d.l)}</text>
      <rect x="${padL}" y="${y}" width="${Math.max(sc(d.v),2)}" height="${bh}" rx="3" fill="${d.c||"#3df58e"}"/>
      <text x="${padL+Math.max(sc(d.v),2)+8}" y="${y+bh/2+5}" fill="${d.c||"#3df58e"}" font-size="${fs+1}" font-weight="600">${d.v.toLocaleString("es-CR")}</text>`; }).join("")}
  </svg><p class="src">Fuente: ${esc(src)}</p>`;
}
/* Gráfico de 1.000 puntos (una cría cada uno) para la pregunta de supervivencia. */
function dotsChart(){
  const narrow = innerWidth < 600, cols = narrow ? 25 : 50, rows = narrow ? 40 : 20, s = 12; let out = "";
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){ const k = r*cols+c; const hi = k === 517; const blk = (Math.floor(c/5) + Math.floor(r/20)) % 2; out += `<circle cx="${8+c*s}" cy="${8+r*s}" r="${hi?5.4:3.6}" fill="${hi?"#ff8f45":(blk?"#2c6b5a":"#3a8f73")}"/>`; }
  return `<p class="ctitle">1.000 crías de tortuga marina (cada punto = 1 cría)</p><p class="src" style="margin-bottom:8px">Cada bloque de color = 100 crías, más o menos lo que trae 1 nido. El punto naranja es la única que, en promedio, llega a adulta.</p>
    <svg viewBox="0 0 ${cols*s+4} ${rows*s+4}" role="img" aria-label="1.000 crías representadas con puntos; una sola llega a adulta" style="max-width:${narrow?340:640}px">${out}</svg><p class="src">Fuente: Mongabay (2013)</p>`;
}
