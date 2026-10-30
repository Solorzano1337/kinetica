# Herramientas de Kinética

Scripts para armar el prototipo 3D y probar el juego de punta a punta. El juego en sí (`2d/index.html`, `3d/index.html`) no necesita nada de esto para funcionar.

## Requisitos

- Python 3 (para el servidor local y `armar3d.py`).
- Node.js 18 o superior y Playwright, solo para las pruebas:

```
cd herramientas
npm install
npx playwright install chromium
cd ..
```

## Probar el juego en local

Desde la raíz del repositorio:

```
python3 -m http.server 8000
```

Luego abrir `http://localhost:8000/2d/` o `http://localhost:8000/3d/` en el navegador.

## Prueba automática del 2D

Con el servidor encendido, en otra terminal y desde la raíz:

```
node herramientas/probar2d.mjs            # computadora, 1280 × 800
node herramientas/probar2d.mjs 390 844 m  # celular vertical
```

Recorre el juego completo: instrucciones, escritorio, ingreso, nombre, equipamiento, mapa, las tres zonas, las cuatro bibliotecas, los cuatro desafíos (incluida la redacción), grado, agradecimiento, autoevaluación y expediente. Deja capturas en `herramientas/capturas/` y termina con `ERRORS []` si no hubo errores de consola.

Si se cambia el flujo (botones, ids, orden de pantallas), hay que ajustar el script.

## Prueba automática del 3D

```
node herramientas/probar3d.mjs
```

Necesita internet, porque el 3D carga Three.js desde cdnjs.

## Armar el 3D desde el 2D

```
python3 herramientas/armar3d.py
```

Toma archivos de `2d/` (todos los estilos, sonido, interfaz, íconos, gráficos, insignias, figuras, pistas, la ficha, la biblioteca, las referencias, los datos de los desafíos, la guía y el desafío 1) y los inserta en las marcas `/*@@...@@*/` de `herramientas/src3d.html`. La lista exacta está en `BLOQUES`, al inicio de `armar3d.py`. Escribe `3d/index.html` y copia las imágenes de personajes. Después de armarlo, probarlo con `probar3d.mjs` antes de subirlo.

Si se agrega al 2D un archivo que el 3D necesita, hay que sumarlo al bloque correspondiente de `BLOQUES`.

## Variables opcionales

- `BASE`: dirección del servidor (por defecto `http://localhost:8000`).
- `CHROME`: ruta a un Chromium ya instalado, si no se usa el de Playwright.
