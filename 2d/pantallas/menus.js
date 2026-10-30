"use strict";
/* =====================================================================
   pantallas/menus.js · MENÚS
   Contenido adicional, créditos y fuentes, configuración.
   ===================================================================== */

/* ============ Contenido adicional / Configuración ============ */
$("#hNews").onclick = () => { A.click(); openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Contenido adicional">
  <div class="sheet-h"><h3>Contenido adicional · Noticias del caso</h3><button class="x" data-close aria-label="Cerrar">${X_ICON}</button></div>
  <div class="sheet-b"><p class="muted">Fuentes reales sobre el caso de Moín. Se abren en otra pestaña.</p><div class="news">
   <a href="https://semanariouniversidad.com/pais/el-espiritu-de-jairo-mora-sandoval-10-anos-despues-de-su-asesinato/" target="_blank" rel="noopener"><span>Semanario Universidad · 2023</span><b>El espíritu de Jairo Mora Sandoval, 10 años después de su asesinato</b></a>
   <a href="https://es.mongabay.com/2013/07/medioambientalista-costarricense-paga-con-su-vida-su-dedicacion-a-las-tortugas-marinas/" target="_blank" rel="noopener"><span>Mongabay · 2013</span><b>Medioambientalista costarricense paga con su vida su dedicación a las tortugas marinas</b></a>
   <a href="https://www.nacion.com/revista-dominical/patrullando-moin-con-jairo-mora/USAGLPP7R5EN7K264TCEOPQMDQ/story/" target="_blank" rel="noopener"><span>La Nación · Revista Dominical</span><b>Patrullando Moín con Jairo Mora</b></a>
   <a href="https://www.eluniverso.com/2012/04/17/1/1430/saquean-nidos-tortuga-extincion-costa-rica.html" target="_blank" rel="noopener"><span>El Universo · 2012</span><b>Saquean nidos de tortuga en peligro de extinción en Costa Rica</b></a>
   <a href="https://www.diarioextra.com/noticia/mas-de-8-mil-tortugas-al-mar-playa-moin-es-vida-y-esperanza/" target="_blank" rel="noopener"><span>Diario Extra · 2025</span><b>¡Más de 8 mil tortugas al mar! Playa Moín es vida y esperanza</b></a>
   <a href="https://surcosdigital.com/jairo-mora-trece-anos-despues-la-impunidad-y-la-violencia-contra-quienes-defienden-la-vida-continuan/" target="_blank" rel="noopener"><span>SURCOS Digital · 2026</span><b>Jairo Mora, trece años después: la impunidad y la violencia contra quienes defienden la vida continúan</b></a>
   <a href="https://delfino.cr/2024/04/cuanto-ha-avanzado-costa-rica-en-ciberseguridad-tras-la-ola-de-ataques-del-2022" target="_blank" rel="noopener"><span>Delfino · 2024 · Caso urbano (próximamente)</span><b>¿Cuánto ha avanzado Costa Rica en ciberseguridad tras la ola de ataques del 2022?</b></a>
   <a href="https://latinamericanseaturtles.com/archivos/documentos/2023-informe-moin-pacuare.pdf" target="_blank" rel="noopener"><span>LAST · Informe 2023 (PDF)</span><b>Informe de temporada Moín–Pacuare 2023</b></a>
  </div><p class="src">Los personajes del juego (lideresa, biólogo, vecinos) son ficticios. Las cifras del caso vienen de estas fuentes.</p></div><div class="sheet-f"><button class="btn ghost" type="button" id="nCred">Créditos y fuentes académicas</button></div></div>`); const nc = $("#nCred"); if(nc) nc.onclick = openCredits; };

/* Créditos y fuentes: profesor, desarrollo y todas las referencias.
   Si se agrega una fuente nueva a REFS, también hay que listarla aquí. */
function openCredits(){
  A.click();
  openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Créditos y fuentes">
   <div class="sheet-h"><h3>Créditos y fuentes</h3><button class="x" data-close aria-label="Cerrar">${X_ICON}</button></div>
   <div class="sheet-b refs">
    <div class="kv"><div><b>Proyecto</b><span>Kinética: el poder del conocimiento. Proyecto de investigación PEM, curso 05477 Investigación en Ciencias Sociales, Escuela de Ciencias Sociales y Humanidades, UNED. Unidad 4: análisis de resultados y formatos para reportes de investigación.</span></div>
    <div><b>Profesor del curso</b><span>Cristian Alonso Silva Jiménez, profesor responsable del trabajo.</span></div>
    <div><b>Desarrollo del juego</b><span>Luis Alonso Solórzano Vásquez, estudiante de la UNED.</span></div>
    <div><b>Personajes y testimonios</b><span>Elaboración propia con base en las fuentes del caso. Las personas del terreno son ficticias; los datos y hechos se citan en cada pista y en la lista de abajo.</span></div>
    <div><b>Estructura narrativa</b><span>Viaje del héroe (Campbell): partida (llamado y reclutamiento), iniciación (exploración y cuatro desafíos) y regreso (grado y autoevaluación). La persona usuaria asume el rol de accionador o accionadora.</span></div></div>
    <h4>Fuentes del caso</h4>
    ${CASE_REFS.map(k=>`<p>${REFS[k]}</p>`).join("")}
    <h4>Fundamento académico</h4>
    <p>Bermúdez Rubio, D., Cuenca Rivera, P. E., García Murillo, P. G., Gutiérrez Gómez, G., &amp; Portela Ramírez, A. J. (2021). Sugerencias para escribir análisis de resultados, conclusiones y recomendaciones en tesis y trabajos de grado. <em>CITAS, 7</em>(1). https://doi.org/10.15332/24224529.6608</p>
    <p>Cáceres, P. (2003). Análisis cualitativo de contenido: Una alternativa metodológica alcanzable. <em>Psicoperspectivas, 2</em>, 53–82. https://doi.org/10.5027/psicoperspectivas-vol2-issue1-fulltext-3</p>
    <p>Cházaro-Arellano, E. H. (2024). Análisis de datos en las investigaciones cualitativas: El reto frente al investigador. <em>Revista Arbitrada Interdisciplinaria Koinonía, 9</em>(17), 168–182. https://doi.org/10.35381/r.k.v8i17.3163</p>
    <p>Rueda Sánchez, M. P., Armas, W. J., &amp; Sigala-Paparella, S.-P. (2023). Análisis cualitativo por categorías a priori: Reducción de datos para estudios gerenciales. <em>Ciencia y Sociedad, 48</em>(2), 83–96. https://doi.org/10.22206/cys.2023.v48i2.pp83-96</p>
    <h4>Bibliotecas del juego</h4>
    <p>Brantingham, P. J., &amp; Brantingham, P. L. (Eds.). (1981). <em>Environmental criminology</em>. Sage.</p>
    <p>Cohen, L. E., &amp; Felson, M. (1979). Social change and crime rate trends: A routine activity approach. <em>American Sociological Review, 44</em>(4), 588–608.</p>
    <p>Denzin, N. K. (1978). <em>The research act: A theoretical introduction to sociological methods</em> (2.ª ed.). McGraw-Hill.</p>
    <p>Hernández-Sampieri, R., &amp; Mendoza, C. P. (2018). <em>Metodología de la investigación: Las rutas cuantitativa, cualitativa y mixta</em>. McGraw-Hill.</p>
    <p>Lincoln, Y. S., &amp; Guba, E. G. (1985). <em>Naturalistic inquiry</em>. Sage.</p>
    <p>Lynch, M. J. (1990). The greening of criminology: A perspective for the 1990s. <em>The Critical Criminologist, 2</em>(3).</p>
    <p>Asamblea Legislativa de la República de Costa Rica. (2002). <em>Ley de protección, conservación y recuperación de las poblaciones de tortugas marinas</em> (Ley N.º 8325).</p>
    <h4>Perfil del estudiantado y tecnología educativa</h4>
    <p>Berrocal, V. (2021). <em>Características del estudiantado de la UNED.</em> https://multimedia.uned.ac.cr/pem/libros/criterios-asignaturas-cursos-en-linea/chapter/caracteristicas-del-estudiantado-de-la-uned/</p>
    <p>Torres Cañizález, P. C., &amp; Cobo Beltrán, J. K. (2017). Tecnología educativa y su papel en el logro de los fines de la educación. <em>Educere, 21</em>(68), 31–40.</p>
    <p class="src">Las fuentes sobre el caso de Moín están en Contenido adicional. Los personajes del terreno y los testimonios de los desafíos son ficticios y sirven de práctica.</p>
   </div></div>`);
}

$("#hSet").onclick = openSettings;
$("#hBrand").onclick = () => {
  A.click();
  const has = S.items.includes("reloj"), map = S.max >= ORDER.indexOf("map");
  openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Menú de Kinética">
    <div class="sheet-h"><h3>Kinética</h3><button class="x" data-close aria-label="Cerrar">${X_ICON}</button></div>
    <div class="sheet-b menu-list">
      <button class="btn ghost" type="button" id="kmW" ${has?"":"disabled"}>Información de hallazgos</button>
      <button class="btn ghost" type="button" id="kmM" ${map?"":"disabled"}>Mapa de casos</button>
      <button class="btn ghost" type="button" id="kmS">Configuración</button>
      <button class="btn ghost" type="button" id="kmC">Créditos y fuentes</button>
      <button class="btn ghost" type="button" id="kmX">Salir del juego</button>
      <p class="src">Tu avance se guarda en este navegador.</p>
    </div></div>`);
  $("#kmW").onclick = () => openWatch("hallazgos");
  $("#kmM").onclick = () => go("map");
  $("#kmS").onclick = openSettings;
  $("#kmC").onclick = openCredits;
  $("#kmX").onclick = () => go("cmds");
};
$("#hMap").onclick = () => go("map");
/* Configuración: música, efectos, voz, velocidad del texto, volumen, saltar a una
   pantalla ya alcanzada, salir y reiniciar el avance (pide confirmación). */
function openSettings(){
  A.click();
  const st = S.settings;
  const reached = ORDER.slice(1, S.max+1);
  openModal(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Configuración">
   <div class="sheet-h"><h3>Configuración</h3><button class="x" data-close aria-label="Cerrar">${X_ICON}</button></div>
   <div class="sheet-b">
    <div class="set-row"><label for="sMusic">Música<small>Música épica de aventura en todo el juego</small></label><input id="sMusic" class="switch" type="checkbox" ${st.music?"checked":""}></div>
    <div class="set-row"><label for="sVol">Volumen general</label><input id="sVol" type="range" min="0" max="1" step="0.05" value="${st.vol}"></div>
    <div class="set-row"><label for="sSfx">Efectos de sonido<small>Escaneos, aciertos, vibración del reloj</small></label><input id="sSfx" class="switch" type="checkbox" ${st.sfx?"checked":""}></div>
    <div class="set-row"><label for="sVoice">Locución por voz<small>Usa la voz en español de tu dispositivo, si existe</small></label><input id="sVoice" class="switch" type="checkbox" ${st.voice?"checked":""}></div>
    <div class="set-row"><label for="sSpeed">Velocidad del texto</label><select id="sSpeed"><option value="lenta">Lenta</option><option value="normal">Normal</option><option value="rapida">Rápida</option></select></div>
    <div class="set-row"><label for="sJump">Ir a un capítulo<small>Solo los que ya desbloqueaste</small></label><select id="sJump">${reached.map(s=>`<option value="${s}" ${s===S.stage?"selected":""}>${CHAPTER[s]}</option>`).join("")}</select></div>
    <div class="set-row"><label>Salir del juego<small>Tu avance queda guardado en este navegador</small></label><button class="btn ghost" type="button" id="sExit">Salir</button></div>
    <div class="set-row"><label>Reiniciar expediente<small>Borra personaje, hallazgos e insignias</small></label><button class="btn ghost" type="button" id="sReset">Reiniciar</button></div>
   </div></div>`);
  $("#sSpeed").value = st.speed;
  $("#sMusic").onchange = e => { st.music = e.target.checked; A.resume(); A.apply(); save(); };
  $("#sSfx").onchange = e => { st.sfx = e.target.checked; A.apply(); save(); };
  $("#sVol").oninput = e => { st.vol = +e.target.value; A.apply(); save(); };
  $("#sVoice").onchange = e => { st.voice = e.target.checked; if(!st.voice) V.stop(); save(); };
  $("#sSpeed").onchange = e => { st.speed = e.target.value; save(); };
  $("#sJump").onchange = e => go(e.target.value);
  $("#sExit").onclick = () => go("cmds");
  $("#sReset").onclick = e => {
    const b = e.currentTarget;
    if(b.dataset.armed){ const keep = S.settings; S = fresh(); S.settings = keep; save(); go("cmds"); }
    else { b.dataset.armed = "1"; b.textContent = "Tocá otra vez para confirmar"; }
  };
}
