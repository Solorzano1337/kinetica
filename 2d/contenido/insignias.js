"use strict";
/* =====================================================================
   contenido/insignias.js · LAS CUATRO INSIGNIAS
   Definición del guion y significado en el caso.
   ===================================================================== */

/* Insignias: def = definición del guion; mean = qué significa en este caso;
   glyph = dibujo dentro del hexágono. La clave «cuarta» es la de Triangulación
   (se mantiene así para no romper partidas guardadas). */
const BADGES = {
  conocimiento:{def:"Recompensa por ordenar los hallazgos de la información recolectada en categorías de análisis claras.", name:"Insignia de Conocimiento", color:"#3df58e", glyph:'<circle cx="40" cy="30" r="5"/><circle cx="28" cy="50" r="5"/><circle cx="52" cy="50" r="5"/><path d="M40 35 30 46M40 35l10 11M33 50h14"/>',
    mean:"Reconoce que convertiste datos sueltos del terreno en conocimiento ordenado: cada hallazgo quedó en su categoría de análisis. Es el primer paso del método: sin datos organizados no hay evidencia."},
  rigurosidad:{def:"Identifica la capacidad de reconocer la evidencia verificable y seleccionar fuentes confiables.", name:"Insignia de Rigurosidad", color:"#6fe3ff", glyph:'<circle cx="40" cy="42" r="16"/><circle cx="40" cy="42" r="8"/><path d="M40 42l11-11"/><circle cx="47" cy="36" r="2.5" fill="currentColor"/>',
    mean:"Reconoce que separaste la evidencia del rumor: evaluaste cada testimonio por su fuente y sus sesgos antes de aceptarlo."},
  interpretacion:{def:"Acredita la lectura objetiva de datos y gráficos estadísticos sin forzar conclusiones.", name:"Insignia de Interpretación", color:"#ff8f45", glyph:'<path d="M26 56V44M36 56V34M46 56V40M56 56V26"/><path d="M22 58h38"/>',
    mean:"Reconoce que leíste los gráficos sin forzarlos: comparaste magnitudes, calculaste proporciones y no confundiste asociación con causa."},
  cuarta:{def:"Certifica el nivel máximo de análisis al conectar y validar los hallazgos mediante la triangulación de fuentes independientes.", name:"Insignia de Triangulación", color:"#f2d35e", glyph:'<path d="M40 22 60 56H20z"/><circle cx="40" cy="22" r="3.5" fill="currentColor"/><circle cx="60" cy="56" r="3.5" fill="currentColor"/><circle cx="20" cy="56" r="3.5" fill="currentColor"/>',
    mean:"Reconoce que confirmaste hallazgos con tres fuentes independientes y redactaste una conclusión prudente: responde la pregunta, se apoya en la evidencia y reconoce sus límites."}
};
