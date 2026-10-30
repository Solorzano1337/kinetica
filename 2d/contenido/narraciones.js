"use strict";
/* =====================================================================
   contenido/narraciones.js · TEXTOS QUE SE LEEN EN VOZ ALTA
   Cada arreglo es una narración: un elemento por párrafo. El juego los muestra
   uno a uno con los botones Saltar y Siguiente, y la voz los lee si está activa.
   Son los textos del guion técnico: cambiarlos solo si cambia el guion.
   ===================================================================== */
const NARRACIONES = {
  /* Escritorio: frase que se escribe arriba antes de la ventana emergente. */
  escritorio: "En cualquier lugar del mundo, estás en tu casa cómodamente en la computadora.",

  /* Video inicial (pantalla «intro»): voz de Kinética. */
  videoInicial: [
    "«El conocimiento no es pasivo: es una fuerza en constante movimiento.",
    "Te damos la bienvenida a la Sociedad de Personas Investigadoras Kinética. Estamos buscando personas accionadoras como vos, dispuestas a poner su mente en movimiento para transformar la realidad.",
    "Tu misión empieza hoy. Tenés que seleccionar un caso de estudio y adentrarte en el terreno para descubrir la verdad. En tu recorrido vas a encontrar personas, animales u objetos clave con los que podés interactuar para obtener pistas, testimonios y evidencias esenciales.",
    "Hacéle frente a las pruebas del método científico, resolvé cada desafío y demostrá tu rigor. Con cada logro vas a obtener insignias de valor que, al reunirlas todas, asegurarán tu lugar como miembro oficial de Kinética.",
    "¿Aceptás el llamado? Elegí tu caso y hacé que la evidencia se mueva.»"
  ],

  /* Pantalla de carga de equipamiento: texto del reloj del conocimiento. */
  equipamiento: "Tocá el «reloj del conocimiento» de Kinética. Este objeto es clave para las personas que desean ser parte de Kinética: con él podés iniciar el viaje, porque te permite escanear animales y cosas. Además, te sirve de guía de campo para revisar la información que has obtenido.",

  /* Mensaje de Kinética desde la playa (pantalla «brief»), antes de explorar. */
  mensajeKinetica: [
    "«¡Mirá a tu alrededor! Estamos en las playas de Moín, en Limón.",
    "Este lugar es el escenario de una problemática ambiental y social sumamente grave: la matanza sistemática de tortugas marinas y el saqueo de sus huevos por parte de redes delictivas locales. Un evento atroz que cobró la vida del ambientalista Jairo Mora y que desnuda la vulnerabilidad de esta comunidad.",
    "Para resolver este caso en las distintas zonas que visités necesitamos datos reales. Tu primera tarea es adentrarte en el terreno y explorar la comunidad: conversá con los vecinos, observá el entorno e interactuá con los objetos y animales que encontrés en el camino.",
    "Cada pista que descubrás se registrará en este reloj. Revisá tus logros y el avance de tus hallazgos directamente en la pantalla de tu muñeca.",
    "Una vez que completés la exploración del campo, el reloj habilitará tu acceso al Repositorio de Información, un archivo con videos o textos que tendrás que analizar para llegar a la verdad.",
    "El tiempo corre. ¡Explorá la zona y hagamos mover la evidencia!»"
  ],

  /* Mensaje de avances y logros (pantalla «holo»), después del desafío 2. */
  avancesYLogros: [
    "¡Diagnóstico impecable! Has completado 2 de los 4 desafíos de la investigación. Con la superación de La codificación de hallazgos y El radar de la información, demostraste una capacidad analítica excepcional.",
    "Mirá en la pantalla de tu reloj: ya lucís con orgullo la Insignia del Conocimiento y la Insignia de la Rigurosidad. ¡Tu progreso está a la mitad y la evidencia de Moín empieza a tomar forma!",
    "Pero el camino a la sabiduría no se detiene aquí. Tu siguiente paso es colocarte los Lentes del conocimiento gráfico para descifrar las tendencias y correlaciones estadísticas del caso.",
    "Ajustá tu reloj, abrí bien los ojos y avanzá al tercer desafío. ¡Estás a solo dos pasos de asegurar tu lugar definitivo en Kinética!"
  ],

  /* Ceremonia de grado. */
  grado: [
    "«Cuatro desafíos, cuatro insignias. Ordenaste los hallazgos, separaste la evidencia del rumor, leíste los datos sin forzarlos y confirmaste cada hallazgo con fuentes independientes.",
    "Eso es investigar: no es acumular datos, es cuidar cómo se llega a ellos.",
    "Por la autoridad de la Sociedad de Personas Investigadoras Kinética, te otorgamos el grado de persona investigadora. Ya no sos una persona reclutada: sos miembro oficial.",
    "Antes de cerrar tu expediente queda una última tarea: revisar con honestidad lo que aprendiste. La autoevaluación es solo para vos.»"
  ]
};
