"use strict";
/* =====================================================================
   contenido/dialogos.js · LO QUE DICEN LOS PERSONAJES EN CADA ZONA
   - conversacion: dos personas que hablan entre sí (no se pueden tocar). «a» y
     «b» son sus nombres; cada línea es ["a" o "b", "texto"]. Los globos cambian
     cada 4,2 segundos y vuelven a empezar al terminar.
   - archivista: saludo al abrir la biblioteca y aviso mientras está bloqueada.
   - agente: frase de entrada al desafío y aviso mientras está bloqueado.
   La posición de cada personaje en la escena está en arte/escenas.js.
   ===================================================================== */
const DIALOGOS = {
  /* Comunidad (exploración 1) */
  comunidad: {
    conversacion: {
      a: "Vecina", b: "Vecino",
      lineas: [
        ["a","¿Ya supo que anoche volvieron a entrar carros a la playa?"],
        ["b","Sí, oí al perro ladrar como a las dos. Yo ya ni me asomo."],
        ["a","Mi hijo quería ir a ver las tortugas, pero le dije que no."],
        ["b","Mejor así. Desde lo de Jairo, aquí nadie quiere problemas."],
        ["a","Doña Marta dice que van a pedir otra vez patrullas."],
        ["b","Ojalá se queden esta vez, y no solo unas semanas."]
      ]
    },
    archivista: { saludo: "«Soy la archivista de Kinética. En esta biblioteca guardo lo que necesitás antes del primer desafío: qué es el análisis de resultados, cómo se pasa del dato a la categoría y qué dice la criminología ambiental.»",
                  bloqueado: "«Todavía no. Primero investigá todo lo que hay en la comunidad; el reloj me avisa cuando estés listo.»" },
    agente: { frase: "Los datos sueltos no prueban nada hasta que los ordenás.",
              bloqueado: "«El desafío se abre cuando hayás leído todos los textos del repositorio. Hablá primero con la archivista.»" }
  },
  /* Playa de día (exploración 2) */
  playa: {
    conversacion: {
      a: "Biólogo de campo", b: "Pescador",
      lineas: [
        ["a","Anoche pasamos tres nidos al vivero antes de que amaneciera."],
        ["b","Yo vi luces por el camino del muelle, cerquita de la medianoche."],
        ["a","Si lo vuelve a ver, avísele a la patrulla. Cada aviso cuenta."],
        ["b","Usted sabe cómo es… uno prefiere no meterse."],
        ["a","Por eso lo anoto todo en la bitácora: hora, lugar y lo que vimos."]
      ]
    },
    archivista: { saludo: "«Bienvenido a la biblioteca de la playa. Aquí hay dos preguntas clave antes del radar: qué es el rigor científico y cómo se analizan entrevistas.»",
                  bloqueado: "«Primero revisá lo que dejó la noche en la playa. Cuando termines, el reloj me avisa.»" },
    agente: { frase: "Un buen radar separa la señal del ruido.",
              bloqueado: "«El radar se enciende cuando hayás leído toda la biblioteca de la playa.»" }
  },
  /* Playa final, de noche (exploración 3) */
  final: {
    conversacion: {
      a: "Voluntaria del vivero", b: "Oficial de Guardacostas",
      lineas: [
        ["a","Esta noche ya van dos baulas en este sector."],
        ["b","Damos otra vuelta por el muelle y volvemos."],
        ["a","Gracias. Cuando ustedes pasan, nadie se acerca a los nidos."],
        ["b","Somos pocos para tanta playa, pero aquí estamos."],
        ["a","Apunté en la pizarra el conteo de crías del año."]
      ]
    },
    archivista: { saludo: "«La última biblioteca del caso: síntesis, triangulación, conclusiones y recomendaciones. Con esto cerrás la investigación.»",
                  bloqueado: "«Antes de la biblioteca final, investigá lo que está pasando en la playa esta noche.»" },
    agente: { frase: "Una sola fuente es una pista; tres que no se conocen son evidencia.",
              bloqueado: "«El último desafío se abre cuando hayás leído la biblioteca final.»" }
  }
};
