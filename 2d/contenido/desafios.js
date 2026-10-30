"use strict";
/* =====================================================================
   contenido/desafios.js · DATOS DE LOS CUATRO DESAFÍOS
   Ayudas, fragmentos, testimonios, preguntas, acertijos y la redacción final.
   La lógica de cada desafío está en pantallas/desafioN.js.
   ===================================================================== */

/* GUIDE: contenido del botón «Pistas, explicación y fuentes» de cada desafío:
   goal (qué hacer), steps (cómo se resuelve), hints (pistas, la última da la
   respuesta), made (cómo se construyó) y refs (fuentes). */
const GUIDE = {
  game1:{title:"La codificación de hallazgos", goal:"Asociar cada fragmento de información con la categoría de análisis que mejor lo describe.",
    steps:["Leé el fragmento completo y preguntate de qué habla: del miedo y de cómo operan las bandas, de lo que hace o deja de hacer el Estado, o del daño a las tortugas y a la naturaleza.",
           "Arrastralo hasta esa categoría. En pantallas táctiles, tocá el fragmento y luego la categoría.",
           "Al acertar aparece su código: categoría (PI, CI o AS), escenario (C comunidad, P playa) y fuente. Así se arma la matriz de análisis.",
           "Si un fragmento no habla de ninguno de los tres temas, guardalo en «Ninguna encaja todavía»: puede ser el inicio de una categoría emergente."],
    hints:["Percepción de inseguridad: miedo de la comunidad, armas, carros desconocidos de noche, venta ilegal de huevos y carne.",
           "Capacidad institucional estatal: policía, patrullas, tribunales y la respuesta (o falta de respuesta) del Estado.",
           "Afectación socioambiental: nidos, huevos, crías, especies y biodiversidad.",
           "El fragmento del puerto (empleos, luces y tráfico) no encaja en ninguna: va en «Ninguna encaja todavía».",
           "Si fallás dos veces con el mismo fragmento, el juego te dice dónde va y por qué."],
    made:"Las tres categorías de análisis vienen del guion técnico del proyecto Kinética. Los fragmentos resumen datos de las fuentes del caso (prensa e informes) y frases de testimonios ficticios escritos para practicar. El sistema de códigos se adaptó de Rueda Sánchez et al. (2023) y el proceso de segmentar, codificar y categorizar sigue a Cáceres (2003).",
    refs:["caceres","rueda","chazaro","universo","mongabay","semanario"]},
  game2:{title:"El radar de la información", goal:"Decidir si cada fragmento de entrevista sirve como evidencia (validar) o se descarta por su sesgo.",
    steps:["Leé el testimonio y fijate en quién habla.",
           "Hacé cuatro preguntas: ¿la persona vio o vivió lo que cuenta? ¿Generaliza con «todo», «siempre» o «nadie»? ¿Afirma una causa solo porque dos cosas pasaron al mismo tiempo? ¿Aporta un dato o solo una opinión?",
           "Si pasa las cuatro preguntas, validalo. Si falla en alguna, descartalo.",
           "Leé la explicación de cada respuesta. Si fallaste, ese testimonio vuelve al final de la fila para que lo intentes otra vez."],
    hints:["Se validan los testimonios directos y concretos (con lugar, fecha o método) y los documentos que se pueden revisar.",
           "Se descartan los rumores de oídas, las generalizaciones, la falsa causalidad y las opiniones sin datos.",
           "De los ocho testimonios se validan cuatro: la lideresa comunal, el biólogo de campo, el pescador artesanal y el informe del vivero (LAST, 2023). Los otros cuatro se descartan."],
    made:"Los testimonios son ficticios, escritos a partir de situaciones descritas en las fuentes del caso. Los criterios para validar o descartar siguen los criterios de rigor de Lincoln y Guba (1985), la guía para analizar entrevistas de Hernández-Sampieri y Mendoza (2018) y los criterios de confiabilidad y validez de Cáceres (2003).",
    refs:["lincoln","hernandez","caceres","last"]},
  game3:{title:"Lentes del conocimiento gráfico", goal:"Responder preguntas sobre gráficos construidos con datos reales del caso.",
    steps:["Leé el título del gráfico y su fuente.",
           "Revisá qué mide cada barra o punto y en qué unidades.",
           "Si la pregunta pide «cuántas veces», dividí. Si pide un porcentaje, dividí la parte entre el total y multiplicá por 100.",
           "Antes de elegir una conclusión, preguntate si el gráfico prueba una causa o solo muestra una asociación."],
    hints:["Pregunta 1: 1.750 ÷ 6 ≈ 292, o sea, unas 290 veces más.",
           "Pregunta 2: comparar dos temporadas muestra una asociación fuerte, no una causa única.",
           "Pregunta 3: 316 ÷ (316 + 4 + 3) ≈ 0,98, o sea, cerca del 98 %.",
           "Pregunta 4: especies y nidos son biodiversidad: afectación socioambiental.",
           "Pregunta 5: 1.000 crías ÷ 100 huevos por nido = 10 nidos."],
    made:"Los gráficos se construyeron con cifras publicadas: nidos salvados con y sin patrullaje (WIDECAST, citado por Mongabay, 2013) y nidos reubicados por especie (Latin American Sea Turtles, 2023). El diagrama de puntos representa el dato de 1 de cada 1.000 crías (Mongabay, 2013). La lectura de asociación frente a causa sigue a Hernández-Sampieri y Mendoza (2018).",
    refs:["mongabay","last","hernandez"]},
  game4:{title:"Triangulando la realidad", goal:"Confirmar hallazgos con tres fuentes independientes y redactar la conclusión del caso.",
    steps:["Leé la afirmación que hay que confirmar.",
           "Elegí tres fuentes de tipos distintos: un testimonio directo, una evidencia física o un documento, y un registro del terreno.",
           "Descartá las fuentes de oídas, las generalizaciones y las que repiten lo que dijo otra fuente: no son independientes.",
           "En el tercer acertijo decidí si las fuentes confirman, no alcanzan o contradicen la afirmación.",
           "Al final, redactá la conclusión siguiendo la lista de revisión de la derecha. Cada dato tomado de una fuente lleva su cita."],
    hints:["Acertijo 1: pescador artesanal + huellas en la arena + perro guardián.",
           "Acertijo 2: registro de WIDECAST + biólogo de campo + lideresa comunal. La nota de prensa repite a WIDECAST, así que no cuenta.",
           "Acertijo 3: las tres fuentes muestran patrullas que llegaban y se iban. La afirmación con «siempre» queda contradicha.",
           "Redacción: usá las frases de apoyo y citá el dato que usés, por ejemplo (WIDECAST, citado por Mongabay, 2013). Si te trabás, abrí el ejemplo y reescribilo con tus palabras."],
    made:"La triangulación de fuentes sigue a Denzin (1978) y a Cáceres (2003). La redacción de conclusiones sigue a Bermúdez Rubio et al. (2021): responder la pregunta, apoyarse en los resultados, no traer datos nuevos y señalar limitaciones. Las afirmaciones combinan datos publicados con testimonios ficticios escritos para practicar.",
    refs:["denzin","caceres","bermudez","chazaro","mongabay","universo"]}
};

/* Categorías de análisis del desafío 1 (las tres del guion + la emergente). */
const CATS = {
  inseg:{s:"Inseguridad", t:"Percepción de inseguridad mediante la presencia criminal", d:"Cómo perciben los habitantes las dinámicas y el modo de operar de las bandas criminales."},
  inst:{s:"Institucional", t:"Capacidad institucional estatal", d:"Cómo se ejerce la institucionalidad en la zona: limitaciones, acciones y presencia."},
  socio:{s:"Socioambiental", t:"Afectación socioambiental", d:"Daño a la biodiversidad y a la conservación en la zona."},
  none:{s:"Ninguna encaja", t:"Ninguna encaja todavía", d:"Se guarda aparte: puede ser el comienzo de una categoría nueva (emergente)."}
};
/* FRAGS: fragmentos del desafío 1. c = categoría correcta, code = código
   (categoría-escenario-fuente), t = texto. El de c:"none" es la categoría emergente. */
const FRAGS = [
  {c:"inseg", code:"PI-C-LC", t:"Los vecinos ya no bajan a la playa de noche por miedo."},
  {c:"inseg", code:"PI-C-PC", t:"Las redes criminales comercializan los huevos y la carne de tortuga."},
  {c:"inseg", code:"PI-C-RV", t:"Un grupo armado con fusiles AK-47 saqueó 19 nidos de baula en 2012."},
  {c:"inseg", code:"PI-C-PG", t:"Entran carros desconocidos de madrugada, algunos con las luces apagadas."},
  {c:"inst", code:"CI-P-BI", t:"Con patrullaje policial se salvaron ~1.750 nidos; sin él, ~6."},
  {c:"inst", code:"CI-C-RE", t:"Las voluntarias pidieron ayuda policial durante semanas sin respuesta."},
  {c:"inst", code:"CI-C-PC", t:"En 2015 se absolvió a los siete acusados por errores en la investigación."},
  {c:"inst", code:"CI-C-LC", t:"Las patrullas llegan unas semanas y después se van."},
  {c:"socio", code:"AS-C-RE", t:"Jairo Mora identificó cerca de 1.474 nidos de baula en Moín."},
  {c:"socio", code:"AS-C-LO", t:"Solo cerca de 1 de cada 1.000 crías llega a ser adulta."},
  {c:"socio", code:"AS-P-ZO", t:"Un nido saqueado equivale a unas 100 crías que no llegan al mar."},
  {c:"socio", code:"AS-C-LO", t:"En Moín anidan la baula, la tortuga verde y la carey."},
  {c:"none", code:"NEW-C-VE", t:"Un vecino cuenta que el puerto trajo empleos, pero también más luces y tráfico cerca de la playa.", n:"Es un tema nuevo: los efectos del puerto en la comunidad. Podría ser una categoría emergente (fragmento de práctica, ficticio)."}
];
/* Pista que se muestra en el primer error, según la categoría correcta. */
const HINT = {inseg:"Habla de miedo o del modo de operar de las bandas.", inst:"Habla de la policía, los tribunales o la presencia del Estado.", socio:"Habla de las tortugas, los nidos o la biodiversidad.", none:"No habla de miedo, de instituciones ni de las tortugas: ¿será otro tema?"};
/* Explicación de cada acierto. La clave es el texto exacto del fragmento. */
const WHY1 = {
  "Los vecinos ya no bajan a la playa de noche por miedo.":"Describe cómo se siente la comunidad: es percepción de inseguridad.",
  "Las redes criminales comercializan los huevos y la carne de tortuga.":"Describe el modo de operar de las bandas criminales (Mongabay, 2013).",
  "Un grupo armado con fusiles AK-47 saqueó 19 nidos de baula en 2012.":"Muestra la presencia armada de las bandas en la playa (El Universo, 2012).",
  "Entran carros desconocidos de madrugada, algunos con las luces apagadas.":"Es una dinámica criminal que la comunidad observa y teme.",
  "Con patrullaje policial se salvaron ~1.750 nidos; sin él, ~6.":"Habla de la presencia policial y de su efecto (Mongabay, 2013).",
  "Las voluntarias pidieron ayuda policial durante semanas sin respuesta.":"Muestra una limitación en la respuesta del Estado (El Universo, 2012).",
  "En 2015 se absolvió a los siete acusados por errores en la investigación.":"Habla del sistema judicial, que es una institución del Estado (Semanario Universidad, 2023).",
  "Las patrullas llegan unas semanas y después se van.":"Describe una presencia institucional intermitente.",
  "Jairo Mora identificó cerca de 1.474 nidos de baula en Moín.":"Mide la importancia de la playa para la anidación de la baula (Semanario Universidad, 2023).",
  "Solo cerca de 1 de cada 1.000 crías llega a ser adulta.":"Es un dato sobre la supervivencia de la especie (Mongabay, 2013).",
  "Un nido saqueado equivale a unas 100 crías que no llegan al mar.":"Cuantifica el daño de cada saqueo a la biodiversidad (Mongabay, 2013).",
  "En Moín anidan la baula, la tortuga verde y la carey.":"Describe la biodiversidad de la zona (Latin American Sea Turtles, 2023)."
};

/* ---------- Desafío 2: El radar de la información ---------- */
/* TESTS: testimonios del desafío 2. v = true se valida; why = explicación. */
const TESTS = [
  {who:"Lideresa comunal", q:"«Desde 2013, las familias de mi calle ya no dejan que los chiquitos bajen a la playa cuando oscurece. Lo veo todos los días.»", v:true, tag:"Testimonio directo", why:"Habla de lo que ve en su propia calle y no lo extiende a toda la provincia."},
  {who:"Vecino en la pulpería", q:"«Todo el mundo en Limón come huevo de tortuga, eso lo sabe cualquiera.»", v:false, tag:"Generalización", why:"«Todo el mundo» no se puede sostener y no viene acompañado de ningún dato."},
  {who:"Biólogo de campo", q:"«Cada nido que encontramos queda anotado con hora, coordenadas y estado. Si al amanecer aparece vacío, también se anota.»", v:true, tag:"Registro sistemático", why:"El método es explícito y cualquier persona lo puede revisar."},
  {who:"Joven en la parada del bus", q:"«Un primo me contó que un amigo de él vio que los que saquean son policías.»", v:false, tag:"Testimonio de oídas", why:"Pasó por tres personas antes de llegar a vos. Se anota como rumor para investigar, no como evidencia."},
  {who:"Comerciante del centro", q:"«Los ambientalistas exageran; las tortugas siempre van a volver.»", v:false, tag:"Opinión sin evidencia", why:"Contradice los registros de anidación y de saqueo y no aporta ningún dato propio."},
  {who:"Pescador artesanal", q:"«El sábado, como a las 2 de la mañana, vi dos carros sin luces entrar a la playa por el camino del muelle.»", v:true, tag:"Observación directa", why:"Tiene fecha, hora y lugar. Se puede contrastar con el registro del perro y las huellas en la arena."},
  {who:"Vecina del barrio", q:"«Desde que llegaron los voluntarios a cuidar tortugas, el pueblo está peor. Antes todo era tranquilo.»", v:false, tag:"Falsa causalidad", why:"Que dos cosas ocurran en la misma época no prueba que una cause la otra."},
  {who:"Informe del vivero · LAST 2023", q:"«En 2023 se reubicaron 323 nidos en Moín: 316 de baula, 4 de verde y 3 de carey.»", v:true, tag:"Fuente documental", why:"Es un informe con método publicado, verificable por cualquier persona."}
];

/* ---------- Repositorio 3 (pantalla de carga) ---------- */
/* Consejos de la pantalla de carga del desafío 3 (cómo leer gráficos). */
const TIPS = [
  ["Leé el título y la fuente", "Antes de mirar las barras, preguntate qué se midió, dónde, cuándo y quién lo midió."],
  ["Revisá los ejes y las unidades", "¿El eje empieza en cero? ¿Son nidos, huevos o porcentajes? Una misma barra cuenta historias distintas según la unidad."],
  ["Compará magnitudes", "Dividí un valor entre otro para saber cuántas veces más grande es. Las diferencias absolutas y las relativas no dicen lo mismo."],
  ["Asociación no es causa", "Si dos cosas cambian juntas, hay una asociación. Para hablar de causa hay que descartar otras explicaciones."],
  ["Resultado no es interpretación", "Un resultado dice qué se encontró, en pasado y sin explicarlo. El porqué es una interpretación y se argumenta en la discusión. Contar describe: no mide qué pesa más."]
];

/* Q3: preguntas del desafío 3. chart = gráfico a mostrar (o null para usar el
   anterior), o = opciones, a = índice de la correcta, why = explicación. */
const Q3 = [
  {chart:()=>barChart({title:"Nidos salvados en Moín por temporada, según patrullaje", src:"WIDECAST, citado por Mongabay (2013)", max:2000,
     data:[{l:"Con patrullaje",v:1750},{l:"Sin patrullaje",v:6,c:"#ff8f45"}]}),
   q:"Según el gráfico, ¿cuántas veces más nidos se salvaron en la temporada con patrullaje?",
   o:["Unas 3 veces más","Unas 30 veces más","Unas 290 veces más","Unas 1.750 veces más"], a:2,
   why:"1.750 ÷ 6 ≈ 292. La diferencia relativa es enorme aunque la barra pequeña casi no se vea."},
  {chart:null, q:"Con ese mismo gráfico, ¿cuál conclusión es la más rigurosa?",
   o:["El patrullaje policial fue la única causa de la diferencia.","Hay una asociación fuerte entre la presencia policial y los nidos salvados, aunque otros factores también pudieron influir.","En la temporada sin patrullaje solo llegaron 6 tortugas a la playa.","El gráfico demuestra que los saqueadores desaparecen cuando hay policía."], a:1,
   why:"El gráfico compara dos temporadas. Muestra una asociación clara, pero no controla otras variables (número de voluntarios, clima, cantidad de hembras). Por eso se habla de asociación, no de causa única (Hernández-Sampieri y Mendoza, 2018)."},
  {chart:()=>barChart({title:"Nidos reubicados al vivero de Moín en 2023, por especie", src:"LAST, informe de temporada 2023", max:400,
     data:[{l:"Baula",v:316},{l:"Verde",v:4,c:"#6fe3ff"},{l:"Carey",v:3,c:"#ff8f45"}]}),
   q:"¿Qué porcentaje aproximado de los nidos reubicados fue de tortuga baula?",
   o:["Cerca del 33 %","Cerca del 50 %","Cerca del 75 %","Cerca del 98 %"], a:3,
   why:"El total es 316 + 4 + 3 = 323. Entonces 316 ÷ 323 ≈ 0,978, o sea cerca del 98 %."},
  {chart:null, q:"¿Con cuál categoría de análisis se relaciona más directamente este gráfico de especies?",
   o:["Percepción de inseguridad mediante la presencia criminal","Capacidad institucional estatal","Afectación socioambiental"], a:2,
   why:"Describe qué especies dependen de la playa y cuántos nidos hubo que proteger (Latin American Sea Turtles, 2023): es información sobre biodiversidad y conservación."},
  {chart:dotsChart, q:"Si un nido tiene unos 100 huevos y solo 1 de cada 1.000 crías llega a adulta, ¿cuántos nidos hacen falta, en promedio, para que una tortuga llegue a adulta?",
   o:["1 nido","5 nidos","10 nidos","100 nidos"], a:2,
   why:"1.000 crías ÷ 100 por nido = 10 nidos. Por eso un solo nido saqueado ya resta una parte importante de la próxima generación."}
];

/* ---------- Desafío 4: Triangulando la realidad ---------- */
/* TRI: acertijos del desafío 4. Los dos primeros piden elegir 3 fuentes con
   ok:true entre 6; el tercero (verdict) pide decidir si la afirmación se confirma. */
const TRI = [
  {claim:"Vehículos ajenos a la comunidad entran de noche a la playa por el camino del muelle.",
   win:"Un testimonio directo, una evidencia física y un registro del terreno no se conocen entre sí y dicen lo mismo. El hallazgo queda confirmado.",
   cards:[
    {t:"Testimonio directo", who:"Pescador artesanal", q:"«El sábado, como a las 2 de la mañana, vi dos carros sin luces entrar a la playa por el camino del muelle.»", ok:true},
    {t:"Evidencia física", who:"Huellas en la arena", q:"Marcas de doble llanta que salen del camino del muelle y cruzan la playa. En una zanja quedó atrapada una cría.", ok:true},
    {t:"Registro del reloj", who:"Perro guardián", q:"Los ladridos nocturnos coinciden con el sonido de motores entre la medianoche y el amanecer.", ok:true},
    {t:"Testimonio de oídas", who:"Joven en la parada", q:"«Un primo me contó que un amigo vio unos carros raros en la playa.»", ok:false, why:"Es de oídas: pasó por varias personas y no se sabe quién lo vio."},
    {t:"Nota de prensa", who:"Periódico local", q:"«Según un pescador, el sábado dos carros sin luces entraron a la playa.»", ok:false, why:"Repite lo que ya dijo el pescador. No es una segunda fuente, es la misma con otro formato."},
    {t:"Generalización", who:"Comerciante del centro", q:"«Aquí nunca pasa nada raro, eso es puro cuento.»", ok:false, why:"Generaliza sin datos y no trae ninguna observación propia."}]},
  {claim:"Cuando hay patrullaje policial se salvan muchos más nidos.",
   win:"Un documento con cifras, un testimonio de campo y la voz de la comunidad coinciden. Eso es triangular. Ojo: confirma una asociación fuerte, no una causa única.",
   cards:[
    {t:"Documento", who:"Registro de WIDECAST", q:"Con una unidad policial patrullando se salvaron unos 1.750 nidos; en la temporada siguiente, sin patrullaje, unos seis (WIDECAST, citado por Mongabay, 2013).", ok:true},
    {t:"Testimonio directo", who:"Biólogo de campo", q:"«Cuando la policía patrulla con nosotros, llegamos a los nidos antes de que lleguen los saqueadores.»", ok:true},
    {t:"Testimonio comunitario", who:"Lideresa comunal", q:"«Mientras vino la patrulla, la gente volvió a bajar a la playa. Cuando se fue, volvió el miedo.»", ok:true},
    {t:"Nota de prensa", who:"Reportaje que cita a WIDECAST", q:"«Según WIDECAST, con patrullaje se salvaron unos 1.750 nidos y sin él, unos seis.»", ok:false, why:"Reproduce el mismo registro de WIDECAST. Es la misma fuente, no una segunda."},
    {t:"Opinión", who:"Comerciante del centro", q:"«Las tortugas siempre van a volver, con o sin policía.»", ok:false, why:"Es una opinión sin datos y contradice los registros de anidación."},
    {t:"Falsa causalidad", who:"Vecino del barrio", q:"«Desde que hay policía en el puerto, todo mejoró.»", ok:false, why:"Dos hechos que coinciden en el tiempo no prueban que uno cause el otro, y no habla de los nidos."}]},
  {verdict:true, claim:"La policía siempre responde a las denuncias de la comunidad.",
   cards:[
    {t:"Testimonio directo", who:"Lideresa comunal", q:"«Hemos pedido patrullas muchas veces. Vienen unas semanas y después se van.»"},
    {t:"Nota de prensa", who:"El Universo, 2012", q:"El grupo de voluntariado había pedido ayuda policial durante semanas por amenazas constantes (El Universo, 2012)."},
    {t:"Documento", who:"WIDECAST, citado por Mongabay (2013)", q:"Con patrullaje se salvaron unos 1.750 nidos; sin patrullaje, unos seis."}],
   o:["Confirmada: las tres fuentes la respaldan.","No se puede confirmar: faltan datos.","Contradicha: las fuentes muestran una respuesta intermitente, no constante."], a:2,
   win:"Tres fuentes independientes apuntan a lo mismo: la presencia policial fue intermitente. El «siempre» no se sostiene, así que el hallazgo se reformula: la respuesta fue intermitente."}
];

/* Por qué sirve cada fuente correcta (la clave es el nombre exacto en «who»). */
const WHY4 = {
  "Pescador artesanal":"Testimonio directo: lo vio con sus propios ojos y da fecha, hora y lugar.",
  "Huellas en la arena":"Evidencia física: las marcas existen aunque nadie las cuente, y no dependen del pescador.",
  "Perro guardián":"Registro del terreno: el reloj cruzó ladridos y motores sin depender de lo que dijeron las personas.",
  "Registro de WIDECAST":"Documento con cifras de dos temporadas, producido por el proyecto de conservación (WIDECAST, citado por Mongabay, 2013).",
  "Biólogo de campo":"Testimonio de quien trabaja cada noche en la playa: conoce el efecto del patrullaje de primera mano.",
  "Lideresa comunal":"Voz de la comunidad: describe cómo cambia la vida diaria cuando la patrulla llega o se va."
};
const R3WHY = {
  "Lideresa comunal":"Dice que las patrullas «vienen unas semanas y después se van»: una presencia intermitente.",
  "El Universo, 2012":"El voluntariado pidió ayuda durante semanas sin recibir respuesta.",
  "WIDECAST, citado por Mongabay (2013)":"Hubo una temporada con patrullaje y otra sin él."
};
const HINT4 = [
  "Buscá tres tipos de fuente distintos: alguien que lo vio, una marca física en la playa y un registro del reloj. Descartá lo que es de oídas, lo que repite a otra fuente y lo que generaliza.",
  "Necesitás un documento con cifras, alguien que trabaja en la playa y la voz de la comunidad. La nota de prensa repite el registro de WIDECAST, así que no cuenta como fuente aparte.",
  "Fijate en la palabra «siempre»: ¿alguna de las tres fuentes describe una respuesta constante de la policía?"
];

/* Pistas del desafío 3, en orden de pregunta (se muestran al primer error). */
const HINT3 = ["Dividí la cifra mayor entre la menor: 1.750 ÷ 6.",
    "Un gráfico que compara dos temporadas muestra una asociación. Para hablar de causa habría que descartar otras explicaciones.",
    "Sumá el total (316 + 4 + 3) y dividí la cantidad de baula entre ese total.",
    "Pensá de qué habla el gráfico: especies y nidos, o sea, biodiversidad.",
    "Dividí las 1.000 crías entre los 100 huevos que tiene, en promedio, cada nido."];

/* Redacción del desafío 4: frases de apoyo que se insertan con un toque. */
const CHIPS = ["Las fuentes revisadas muestran que", "El testimonio de", "coincide con", "Además, el registro de WIDECAST (citado por Mongabay, 2013) indica que", "(Mongabay, 2013)", "(Latin American Sea Turtles, 2023)", "Sin embargo, estos datos no permiten afirmar que", "Haría falta"];

/* Redacción del desafío 4: ejemplo de conclusión (botón «Ver un ejemplo»). */
const MODEL = "Las fuentes revisadas muestran que vehículos ajenos a la comunidad entran de noche a la playa de Moín: el testimonio del pescador, las huellas de llanta en la arena y el registro del perro guardián coinciden, aunque no dependen unas de otras. Además, el registro de WIDECAST indica que con patrullaje policial se salvaron unos 1.750 nidos y sin él unos seis (WIDECAST, citado por Mongabay, 2013), lo que sugiere una asociación entre la vigilancia nocturna y la protección de los nidos. Sin embargo, estos datos no permiten afirmar que el patrullaje sea la única causa; haría falta comparar más temporadas y entrevistar a más personas de la comunidad.";
