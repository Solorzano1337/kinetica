"use strict";
/* =====================================================================
   contenido/referencias.js · REFERENCIAS COMPLETAS (APA)
   Las usan pistas, bibliotecas, ayudas y créditos.
   ===================================================================== */

/* ---------- Desafío 1: La codificación de hallazgos ---------- */
/* Guía de cada desafío: qué hacer, pasos, pistas progresivas, cómo se construyó y fuentes en APA 7 */
/* REFS: referencias completas en formato APA, con <em> para la cursiva.
   Las usan las pistas (refs), las bibliotecas (ref) y las ayudas (GUIDE). */
const REFS = {
  caceres:"Cáceres, P. (2003). Análisis cualitativo de contenido: Una alternativa metodológica alcanzable. <em>Psicoperspectivas, 2</em>, 53–82. https://doi.org/10.5027/psicoperspectivas-vol2-issue1-fulltext-3",
  rueda:"Rueda Sánchez, M. P., Armas, W. J., &amp; Sigala-Paparella, S.-P. (2023). Análisis cualitativo por categorías a priori: Reducción de datos para estudios gerenciales. <em>Ciencia y Sociedad, 48</em>(2), 83–96. https://doi.org/10.22206/cys.2023.v48i2.pp83-96",
  chazaro:"Cházaro-Arellano, E. H. (2024). Análisis de datos en las investigaciones cualitativas: El reto frente al investigador. <em>Revista Arbitrada Interdisciplinaria Koinonía, 9</em>(17), 168–182. https://doi.org/10.35381/r.k.v8i17.3163",
  bermudez:"Bermúdez Rubio, D., Cuenca Rivera, P. E., García Murillo, P. G., Gutiérrez Gómez, G., &amp; Portela Ramírez, A. J. (2021). Sugerencias para escribir análisis de resultados, conclusiones y recomendaciones en tesis y trabajos de grado. <em>CITAS, 7</em>(1). https://doi.org/10.15332/24224529.6608",
  hernandez:"Hernández-Sampieri, R., &amp; Mendoza, C. P. (2018). <em>Metodología de la investigación: Las rutas cuantitativa, cualitativa y mixta</em>. McGraw-Hill.",
  lincoln:"Lincoln, Y. S., &amp; Guba, E. G. (1985). <em>Naturalistic inquiry</em>. Sage.",
  denzin:"Denzin, N. K. (1978). <em>The research act: A theoretical introduction to sociological methods</em> (2.ª ed.). McGraw-Hill.",
  brant:"Brantingham, P. J., &amp; Brantingham, P. L. (Eds.). (1981). <em>Environmental criminology</em>. Sage.",
  lynch:"Lynch, M. J. (1990). The greening of criminology: A perspective for the 1990s. <em>The Critical Criminologist, 2</em>(3).",
  ley8325:"Asamblea Legislativa de la República de Costa Rica. (2002). <em>Ley de protección, conservación y recuperación de las poblaciones de tortugas marinas</em> (Ley N.º 8325).",
  propia:"Elaboración propia para el juego Kinética (personajes, escenas y testimonios ficticios basados en las fuentes del caso).",
  cohen:"Cohen, L. E., &amp; Felson, M. (1979). Social change and crime rate trends: A routine activity approach. <em>American Sociological Review, 44</em>(4), 588–608.",
  semanario:"El espíritu de Jairo Mora Sandoval, 10 años después de su asesinato. (2023). <em>Semanario Universidad</em>. https://semanariouniversidad.com/pais/el-espiritu-de-jairo-mora-sandoval-10-anos-despues-de-su-asesinato/",
  mongabay:"Medioambientalista costarricense paga con su vida su dedicación a las tortugas marinas. (2013, julio). <em>Mongabay</em>. https://es.mongabay.com/2013/07/medioambientalista-costarricense-paga-con-su-vida-su-dedicacion-a-las-tortugas-marinas/",
  universo:"Saquean nidos de tortuga en peligro de extinción en Costa Rica. (2012, 17 de abril). <em>El Universo</em>. https://www.eluniverso.com/2012/04/17/1/1430/saquean-nidos-tortuga-extincion-costa-rica.html",
  last:"Latin American Sea Turtles. (2023). <em>Informe de temporada Moín–Pacuare 2023</em> [Informe técnico]. https://latinamericanseaturtles.com/archivos/documentos/2023-informe-moin-pacuare.pdf",
  extra:"¡Más de 8 mil tortugas al mar! Playa Moín es vida y esperanza. (2025). <em>Diario Extra</em>. https://www.diarioextra.com/noticia/mas-de-8-mil-tortugas-al-mar-playa-moin-es-vida-y-esperanza/",
  surcos:"Bloque Verde. (2026, 31 de mayo). Jairo Mora, trece años después: La impunidad y la violencia contra quienes defienden la vida continúan. <em>SURCOS Digital</em>. https://surcosdigital.com/jairo-mora-trece-anos-despues-la-impunidad-y-la-violencia-contra-quienes-defienden-la-vida-continuan/",
  nacion:"Patrullando Moín con Jairo Mora. (s.f.). <em>La Nación</em>. https://www.nacion.com/revista-dominical/patrullando-moin-con-jairo-mora/USAGLPP7R5EN7K264TCEOPQMDQ/story/",
  delfino:"¿Cuánto ha avanzado Costa Rica en ciberseguridad tras la ola de ataques del 2022? (2024, abril). <em>Delfino.cr</em>. https://delfino.cr/2024/04/cuanto-ha-avanzado-costa-rica-en-ciberseguridad-tras-la-ola-de-ataques-del-2022"
};
const CASE_REFS = ["universo","mongabay","semanario","last","extra","surcos","nacion","delfino"];
