# Kinética: el poder del conocimiento

Juego multimedia educativo para el curso 05477 Investigación en Ciencias Sociales (Escuela de Ciencias Sociales y Humanidades, UNED), propuesto con el Programa de Producción Electrónica Multimedial (PEM).

**Profesor del curso:** Cristian Alonso Silva Jiménez · **Desarrollo:** Luis Alonso Solórzano Vásquez La persona usuaria asume el rol de accionador o accionadora de la Sociedad Kinética y practica la Unidad 4, análisis de resultados, resolviendo el caso rural de Moín, Limón: la matanza y el saqueo de tortugas marinas (caso Jairo Mora).

## Versiones

| Carpeta | Qué contiene |
|---|---|
| `2d/` | Recorrido completo siguiendo el viaje del héroe: escritorio, video inicial, selección de personaje, mapa de casos, tres zonas de exploración (comunidad, playa de día y playa de noche), cuatro desafíos con insignias, ceremonia de grado, agradecimiento y autoevaluación. |
| `3d/` | Prototipo 3D de la comunidad de Moín: movimiento libre del personaje, cámara en tercera persona, interacción por cercanía, biblioteca de la archivista y el desafío 1. |

`index.html` en la raíz es una portada con enlaces a las dos versiones.

## Cómo abrirlo

Son páginas estáticas: no necesitan instalación ni servidor propio.

- **En línea:** con GitHub Pages activado (Settings → Pages → rama `main`, carpeta raíz), el juego queda en `https://<usuario>.github.io/<repositorio>/`.
- **En la computadora:** abrí la carpeta con cualquier servidor estático, por ejemplo `python -m http.server`, y entrá a `http://localhost:8000`. Abrir el archivo con doble clic también funciona en la mayoría de navegadores, aunque algunos bloquean las imágenes locales.

Se necesita conexión a internet para las tipografías (Google Fonts) y, en la versión 3D, para el motor Three.js r128 (cdnjs).

## Controles

**2D:** se juega con clic o toque. El avance se guarda en el navegador; en Configuración → Ir a un capítulo se puede volver a cualquier parte ya desbloqueada.

**3D:** WASD o flechas para caminar, Shift para correr, arrastrar el mouse para girar la cámara, rueda para acercar y E para interactuar. En celular, palanca a la izquierda y botón de acción a la derecha.

## Estructura del juego

| Desafío | Dinámica | Qué se practica | Insignia |
|---|---|---|---|
| 1 · La codificación de hallazgos | Asociación | Segmentar, codificar y agrupar en categorías de análisis | Conocimiento |
| 2 · El radar de la información | Aprobar y descartar | Validar testimonios según su fuente y sus sesgos | Rigurosidad |
| 3 · Lentes del conocimiento gráfico | Selección única | Leer gráficos con datos reales | Interpretación |
| 4 · Triangulando la realidad | Acertijo y redacción | Confirmar un hallazgo con tres fuentes independientes y redactar la conclusión | Triangulación |

## Ayudas para resolver los desafíos

Cada desafío tiene un botón **Pistas, explicación y fuentes** con los pasos para resolverlo, pistas que se muestran de una en una, cómo se construyó el desafío y sus referencias en APA 7. Además:

- En la codificación de hallazgos, después de dos errores con el mismo fragmento el juego indica la categoría correcta y explica por qué.
- En la lectura de gráficos, el primer error muestra una pista y el segundo, la respuesta explicada.
- En la triangulación, cada acertijo tiene una pista; al cerrar el triángulo se explica por qué sirve o no sirve cada fuente, y tras dos intentos fallidos se pueden mostrar las tres fuentes correctas.
- La redacción final tiene frases de apoyo, una lista de revisión que se actualiza mientras se escribe y un ejemplo para reescribir con palabras propias.

## Escenarios

En las zonas se investigan sobre todo objetos (bitácora del biólogo, pizarra del vivero, acta de patrullaje, herramientas, rótulos, periódico). Algunas personas no son interactivas: conversan entre sí y sus diálogos dan contexto al caso.

## Fuentes

Los personajes del terreno son ficticios. Las cifras y los hechos del caso vienen de fuentes publicadas, enlazadas dentro del juego en **Contenido adicional**: Semanario Universidad (2023), Mongabay (2013), El Universo (2012), Latin American Sea Turtles (2023), Diario Extra (2025) y SURCOS Digital (2026). Las referencias académicas de las bibliotecas están en **Créditos y fuentes**.

## Tecnología

HTML, CSS y JavaScript sin dependencias de compilación. Música y efectos generados con Web Audio; locución opcional con la síntesis de voz del navegador. La versión 3D usa Three.js r128.
