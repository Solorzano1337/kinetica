"use strict";
/* =====================================================================
   contenido/autoevaluacion.js · PREGUNTAS DE LA AUTOEVALUACIÓN
   ===================================================================== */

/* ---------- Autoevaluación ---------- */
/* AUTO: preguntas de la autoevaluación. La primera opción de cada una es la
   correcta; el juego las mezcla al mostrarlas. ch = qué conviene repasar. */
const AUTO = [
  {ch:"Desafío 1", q:"¿En qué orden se trabaja un dato cualitativo?", o:["Segmentar, codificar y agrupar en categorías","Agrupar, segmentar y codificar","Interpretar, codificar y concluir","Codificar, concluir y segmentar"], why:"Primero se separa el fragmento útil, luego se le pone una etiqueta (código) y al final se agrupan las etiquetas parecidas en categorías."},
  {ch:"Desafío 1", q:"El tema es nuevo y casi no hay estudios previos. ¿Qué categorías conviene usar?", o:["Emergentes, que surgen al trabajar los datos","A priori, definidas antes de ir al campo","Ninguna: basta con contar las pistas","Las que usó otra investigación, sin cambios"], why:"Las categorías emergentes convienen cuando el tema es nuevo. Las a priori se usan con objetivos acotados y antecedentes suficientes."},
  {ch:"Desafío 1", q:"Un fragmento valioso no encaja en ninguna categoría. ¿Qué conviene hacer?", o:["Revisar el sistema y valorar una categoría nueva","Descartarlo para no ensuciar el análisis","Forzarlo en la categoría más parecida","Dejarlo para otra investigación"], why:"Si una unidad valiosa no alimenta ninguna categoría, hay que revisar el sistema: puede ser el comienzo de una categoría emergente."},
  {ch:"Desafío 2", q:"Dos personas codifican el mismo texto por separado. ¿Qué valor de kappa se espera como mínimo?", o:["0,80 o más","0,20","0,50","Exactamente 1,00"], why:"Cáceres (2003) espera un kappa de 0,80 o más. Si queda por debajo, hay que revisar las reglas y los códigos."},
  {ch:"Desafío 3", q:"¿Cuál de estas frases es un resultado y no una interpretación?", o:["«Se registraron seis fragmentos de percepción de inseguridad.»","«Hay más inseguridad porque el Estado no vigila.»","«La causa del saqueo es la pobreza.»","«La comunidad está abandonada.»"], why:"Un resultado dice qué se encontró, en pasado y sin explicarlo. Las otras frases explican el porqué, y eso va en la discusión."},
  {ch:"Desafío 4", q:"¿Qué es triangular un hallazgo?", o:["Contrastarlo con fuentes independientes que coinciden","Repetirlo en tres párrafos del informe","Preguntarle tres veces a la misma persona","Elegir las tres fuentes más famosas"], why:"Triangular es contrastar el hallazgo con otras fuentes obtenidas de forma independiente. Una fuente que repite a otra no cuenta como segunda."},
  {ch:"Repositorio 4", q:"¿Cuál es la regla de una buena conclusión?", o:["Responde la pregunta principal y no trae datos nuevos","Repite todos los resultados uno por uno","Agrega las últimas cifras encontradas","Propone qué debe hacer cada institución"], why:"La conclusión responde la pregunta y los objetivos sin introducir datos nuevos. Qué hacer corresponde a las recomendaciones."},
  {ch:"Repositorio 4", q:"¿Qué hace sólida a una recomendación?", o:["Sale de las conclusiones y dice qué, quién y cómo","Es general y se aplica a cualquier caso","Pide hacer más estudios algún día","Suena firme aunque no tenga relación con los datos"], why:"Una recomendación específica y realista sale de las conclusiones y señala qué hacer, quién lo hace y cómo."}
];
