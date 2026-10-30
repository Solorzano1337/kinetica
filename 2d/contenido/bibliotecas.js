"use strict";
/* =====================================================================
   contenido/bibliotecas.js · TEXTOS DE LAS BIBLIOTECAS
   Lo que entrega la archivista de Kinética en cada zona.
   ===================================================================== */

/* Repositorios */
const REF = {
  hs:"Hernández-Sampieri, R., & Mendoza, C. P. (2018). Metodología de la investigación: Las rutas cuantitativa, cualitativa y mixta. McGraw-Hill.",
  lg:"Lincoln, Y. S., & Guba, E. G. (1985). Naturalistic inquiry. Sage.",
  dz:"Denzin, N. K. (1978). The research act: A theoretical introduction to sociological methods (2.ª ed.). McGraw-Hill."
};
/* REPOS: bibliotecas de cada zona. docs = textos con t (título), k (etiqueta),
   b (párrafos, con citas) y ref (claves de REFS). La biblioteca se completa cuando
   se abren todos sus textos, y eso desbloquea al agente de desafío. */
const REPOS = {
  repo1:{title:"Biblioteca de la comunidad", back:"explore1", backLabel:"Volver a la comunidad",
    intro:"La archivista de Kinética abrió la biblioteca. Leé cada texto; cuando termines, el agente de desafío te abre La codificación de hallazgos.",
    phrase:"Los datos sueltos no prueban nada hasta que los ordenás.",
    done:"Leíste toda la biblioteca. El agente de desafío ya te espera en la comunidad.",
    docs:[
      {t:"¿Qué es el análisis de resultados?", k:"Biblioteca · Unidad 4", b:[
        "Analizar resultados es transformar los datos recogidos en respuestas a la pregunta de investigación. No consiste en resumir lo que se encontró, sino en ordenarlo, compararlo e interpretarlo (Hernández-Sampieri y Mendoza, 2018).",
        "En la investigación cualitativa se trabaja con palabras, imágenes y observaciones: se codifican fragmentos, se agrupan en categorías y se buscan patrones, contradicciones y casos que no encajan. En la cuantitativa se trabaja con números: frecuencias, proporciones, tendencias y comparaciones entre grupos (Hernández-Sampieri y Mendoza, 2018).",
        "Un mismo caso puede combinar ambos enfoques. En Moín, el testimonio de la lideresa es un dato cualitativo; los 1.750 nidos salvados con patrullaje (Mongabay, 2013) son un dato cuantitativo."], ref:["hernandez","mongabay"]},
      {t:"Del dato a la categoría", k:"Guía de método · Cáceres (2003); Cházaro-Arellano (2024)", b:["Según Cáceres (2003), se segmenta el material (cada fragmento útil), se etiqueta cada segmento con un código corto y se agrupan las etiquetas parecidas en categorías.","Las categorías de Moín están definidas de antemano (a priori), a partir de la teoría, como proponen Rueda Sánchez et al. (2023): percepción de inseguridad, capacidad institucional estatal y afectación socioambiental. Un fragmento puede alimentar más de una categoría. Si uno valioso no encaja en ninguna, hay que revisar el sistema: puede ser el comienzo de una categoría emergente (Cáceres, 2003; Cházaro-Arellano, 2024)."], ref:["caceres","rueda","chazaro"]},
      {t:"Cómo se escribe un código", k:"Guía de método · adaptado de Rueda Sánchez et al. (2023)", b:["Cada código dice tres cosas: categoría (PI, CI o AS), escenario (C comunidad, P playa) y fuente (la sigla del elemento). Por ejemplo, PI-C-LC es una pista de percepción de inseguridad, en la comunidad, dicha por la lideresa. Este formato es una adaptación propia de la codificación por categorías a priori de Rueda Sánchez et al. (2023).","Con los códigos se arma una matriz que reúne, por categoría, todos los fragmentos asociados (Rueda Sánchez et al., 2023)."], ref:["rueda"]},
      {t:"Teoría de criminología ambiental", k:"Biblioteca · Marco teórico", b:[
        "La criminología ambiental estudia dónde, cuándo y en qué condiciones ocurren los delitos, además de quién los comete (Brantingham y Brantingham, 1981).",
        "Una de sus herramientas es la teoría de las actividades rutinarias: un delito ocurre cuando coinciden en tiempo y lugar una persona motivada para delinquir, un objetivo atractivo y la ausencia de un guardián capaz (Cohen y Felson, 1979).",
        "Aplicada a Moín: redes de saqueo motivadas por la venta ilegal, nidos con cerca de 100 huevos cada uno y noches sin patrullaje. Cuando la policía patrulló, el guardián estaba presente y los nidos salvados se contaron por cientos (Mongabay, 2013).",
        "La criminología verde complementa esta mirada: estudia los daños contra el ambiente y las especies, aunque no siempre estén tipificados como delito (Lynch, 1990)."],
        ref:["brant","cohen","lynch","mongabay"]},
      {t:"Diez años después", k:"Nota periodística · Semanario Universidad, 2023", b:["Jairo Mora identificó cerca de 1.474 nidos de baula en Moín a partir de 2012, lo que convertía la playa en uno de los sitios de anidación más grandes del país. Para comparar, el Parque Nacional Marino Las Baulas, en Guanacaste, registraba algo más de 200 nidos (Semanario Universidad, 2023).","Diez años después del crimen, personas consultadas por el semanario señalan que los autores intelectuales nunca se investigaron a fondo (Semanario Universidad, 2023)."], ref:["semanario"]},
      {t:"Patrullar o no patrullar", k:"Reportaje · Mongabay, 2013", b:["Durante la temporada en que una unidad policial patrulló con WIDECAST se salvaron unos 1.750 nidos. En la temporada siguiente, sin patrullaje, el proyecto solo pudo salvar unos seis (WIDECAST, citado por Mongabay, 2013).","Cada nido tiene unos 100 huevos y cada huevo se vendía a cerca de 1 dólar. Alrededor de 1 de cada 1.000 crías llega a adulta (Mongabay, 2013)."], ref:["mongabay"]},
      {t:"Saqueo armado", k:"Nota · El Universo, 2012", b:["En abril de 2012 un grupo armado con fusiles AK-47 saqueó 19 nidos de baula en Moín y se llevó unos 1.500 huevos a punto de nacer (El Universo, 2012).","La dirigente Vanessa Lizano contó que el grupo de voluntariado había pedido ayuda policial durante semanas por amenazas constantes (El Universo, 2012)."], ref:["universo"]},
      {t:"Transcripción de campo", k:"Testimonio · Lideresa comunal (personaje)", b:["«Antes uno bajaba a la playa de noche a ver a las baulas desovar. Ahora casi nadie baja.»","«Hemos pedido patrullas muchas veces. Vienen unas semanas y después se van.»","Esta transcripción es ficticia (elaboración propia). Se escribió para practicar la codificación y se apoya en hechos reportados por El Universo (2012) y Semanario Universidad (2023)."], ref:["propia","universo","semanario"]}
    ]},
  repo2:{title:"Biblioteca de la playa", back:"explore2", backLabel:"Volver a la playa",
    intro:"Antes de evaluar testimonios, revisá qué es el rigor científico y cómo se analizan entrevistas.",
    phrase:"Un buen radar separa la señal del ruido.",
    done:"Leíste toda la biblioteca. El agente de desafío ya te espera en la playa para El radar de la información.",
    docs:[
      {t:"¿Qué es el rigor científico?", k:"Biblioteca · Unidad 4", b:[
        "El rigor es lo que permite confiar en los resultados: otra persona puede seguir tus pasos, revisar tus fuentes y llegar a conclusiones parecidas.",
        "En la investigación cuantitativa se habla de validez y confiabilidad (Hernández-Sampieri y Mendoza, 2018). En la cualitativa, Lincoln y Guba (1985) proponen cuatro criterios: credibilidad, transferibilidad, dependencia y confirmabilidad.",
        "En la práctica: anotá de dónde viene cada dato, separá lo que viste de lo que te contaron, buscá casos que contradigan tu idea y no descartés un dato solo porque no te gusta."], ref:["lincoln","hernandez"]},
      {t:"Confiabilidad y validez", k:"Guía de método · Cáceres (2003)", b:["Confiabilidad: que dos personas que clasifican el mismo texto lleguen a los mismos resultados. Se mide con el acuerdo entre codificadores y se espera un coeficiente kappa de 0,80 o más (Cáceres, 2003).","Validez: que las inferencias se sostengan frente a otros datos obtenidos de forma independiente. Se logra con triangulación, saturación y consulta de los resultados a informantes y coinvestigadores (Cáceres, 2003)."], ref:["caceres"]},
      {t:"¿Cómo analizar entrevistas?", k:"Biblioteca · Unidad 4", b:[
        "Transcribí sin corregir lo que dijo la persona. Leé todo una vez sin marcar nada. Después marcá fragmentos, asignales un código y agrupá los códigos en categorías. Al final compará entre entrevistas: qué se repite y qué se contradice (Hernández-Sampieri y Mendoza, 2018).",
        "Un testimonio de oídas no se tira a la basura: se anota como pista para verificar, pero no se usa como evidencia por sí solo."], ref:["hernandez"]},
      {t:"Fuente directa o de oídas", k:"Guía de método · elaboración propia", b:["Una fuente directa vio o vivió lo que cuenta. Una fuente de oídas repite lo que otra persona le dijo. La segunda puede orientar la búsqueda, pero no sirve como evidencia por sí sola.","Esta guía es una síntesis propia del equipo; aplica el criterio de credibilidad de Lincoln y Guba (1985)."], ref:["lincoln"]},
      {t:"Generalizaciones", k:"Guía de método · elaboración propia", b:["Frases como «todo el mundo», «siempre» o «nadie» rara vez se pueden comprobar. Cuando un testimonio generaliza sin datos, se anota como opinión.","Síntesis propia del equipo, a partir de la idea de buscar casos negativos que pongan a prueba una afirmación (Lincoln y Guba, 1985)."], ref:["lincoln"]},
      {t:"Falsa causalidad", k:"Guía de método · elaboración propia", b:["Que dos hechos ocurran al mismo tiempo no prueba que uno cause el otro. Antes de aceptar una causa, buscá otras explicaciones posibles.","Hernández-Sampieri y Mendoza (2018) lo explican así: una correlación entre dos variables no basta para afirmar causalidad."], ref:["hernandez"]},
      {t:"Fuentes documentales", k:"Informe · LAST, temporada 2023", b:["En 2023 se reubicaron al vivero 323 nidos en Moín: 316 de baula, 4 de verde y 3 de carey, puestos por 218 hembras distintas (Latin American Sea Turtles, 2023). Un informe con método publicado se puede revisar y contrastar."], ref:["last"]}
    ]},
  repo4:{title:"Biblioteca final · Triangulación", back:"explore3", backLabel:"Volver a la playa",
    intro:"Antes del último desafío, repasá cómo se sintetiza, cómo se confirma un hallazgo y cómo se cierra un caso.",
    phrase:"Una sola fuente es una pista; tres que no se conocen son evidencia.",
    done:"Leíste la biblioteca final. El agente de desafío te espera en la playa para Triangulando la realidad.",
    docs:[
      {t:"Síntesis de hallazgos", k:"Biblioteca · Unidad 4", b:[
        "Sintetizar es juntar los hallazgos de todas las fuentes en pocas ideas centrales que respondan la pregunta de investigación. No es repetir cada dato, sino decir qué significan juntos (Hernández-Sampieri y Mendoza, 2018).",
        "Una síntesis útil se arma por categorías: para cada una, qué se encontró, con qué evidencia y qué tan sólida es esa evidencia (Cházaro-Arellano, 2024)."], ref:["hernandez","chazaro"]},
      {t:"Qué es triangular", k:"Guía de método · Cáceres (2003)", b:["Triangular es contrastar un hallazgo con otras fuentes obtenidas de forma independiente. Cuando coinciden, la inferencia gana validez (Cáceres, 2003; Denzin, 1978).","No basta con tener muchas fuentes: tienen que ser independientes. Una nota que repite lo que dijo un vecino no suma una segunda fuente."], ref:["denzin","caceres"]},
      {t:"Tres tipos de fuente", k:"Guía de método · elaboración propia a partir de Denzin (1978)", b:["Testimonio directo: alguien vio o vivió lo que cuenta. Evidencia física: huellas, objetos o registros del terreno. Documento: un informe o registro con método, que se puede revisar.","Un triángulo sólido combina tipos distintos. Si los tres vértices dependen del mismo origen, es un solo dato repetido. Esta clasificación es una adaptación propia de la triangulación de datos que describe Denzin (1978)."], ref:["denzin"]},
      {t:"Qué hacer cuando no coinciden", k:"Guía de método · Cáceres (2003)", b:["Si las fuentes se contradicen, el hallazgo no se acepta ni se descarta sin más: se reformula o se anota como no confirmado y se buscan más datos. La saturación (cuando los datos nuevos ya no aportan nada distinto) y la consulta a informantes ayudan a decidir (Cáceres, 2003).","Una palabra como «siempre» o «nadie» exige evidencia que casi nunca existe."], ref:["caceres"]},
      {t:"Resultados, conclusiones y recomendaciones", k:"Guía de redacción · Bermúdez Rubio et al. (2021); Cházaro-Arellano (2024)", b:["Los resultados responden qué se encontró: en pasado y sin interpretar. Las conclusiones responden la pregunta principal y los objetivos, sin datos nuevos. Las recomendaciones salen de las conclusiones y dicen qué, quién y cómo (Bermúdez Rubio et al., 2021).","«Se registraron seis pistas de percepción de inseguridad» es un resultado. «Hay más inseguridad porque el Estado no vigila» es una interpretación (Cházaro-Arellano, 2024)."], ref:["bermudez","chazaro"]},
      {t:"Cómo citar en tu conclusión", k:"Guía de redacción · Citas", b:["Cada dato que no es tuyo lleva su cita: apellido o institución y año. Puede ir entre paréntesis al final de la idea, como (Mongabay, 2013), o dentro de la frase, como «Según Mongabay (2013)…».","Si leíste un dato dentro de otra fuente, se cita así: (WIDECAST, citado por Mongabay, 2013). Con tres o más autores se escribe el primero y «et al.»: (Bermúdez Rubio et al., 2021).","Al final del trabajo, cada cita del texto debe aparecer completa en la lista de referencias, y cada referencia de la lista debe estar citada en el texto."]}
    ]}
};
