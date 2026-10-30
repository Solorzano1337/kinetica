"""Arma el prototipo 3D a partir de los archivos del juego 2D.

Uso (desde la raíz del repositorio):
    python3 herramientas/armar3d.py

Lee herramientas/src3d.html (el código propio del 3D) y reemplaza cada marca
/*@@NOMBRE@@*/ con el contenido de los archivos del 2D indicados en BLOQUES.
Escribe 3d/index.html como página completa y copia las imágenes de personajes.

El 3D solo usa la zona de la comunidad y el desafío 1, por eso no incluye
todos los archivos del 2D. Si se agrega un archivo al 2D que el 3D necesita,
sumarlo al bloque correspondiente.
"""
import os, re, shutil

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D2 = os.path.join(RAIZ, "2d")
SRC = os.path.join(RAIZ, "herramientas", "src3d.html")
OUT = os.path.join(RAIZ, "3d", "index.html")

def leer(rel):
    return open(os.path.join(D2, rel), encoding="utf-8").read()

# Estilos: todos los del 2D, en el mismo orden en que los carga 2d/index.html
indice = leer("index.html")
hojas = re.findall(r'<link rel="stylesheet" href="(estilos/[^"]+)">', indice)
assert hojas, "no se encontraron estilos en 2d/index.html"

BLOQUES = {
    "CSS":      hojas,
    "AUDIO":    ["motor/sonido.js"],
    "UI":       ["motor/interfaz.js"],
    "ART":      ["arte/iconos.js", "arte/graficos.js", "contenido/insignias.js", "arte/figuras.js"],
    "CLUES":    ["contenido/pistas.js"],
    "OPENCLUE": ["pantallas/ficha.js"],
    "REPOS":    ["contenido/bibliotecas.js", "pantallas/biblioteca.js"],
    "GAME1":    ["contenido/referencias.js", "contenido/desafios.js", "pantallas/guia.js",
                 "pantallas/insignias.js", "pantallas/desafio1.js"],
}

def contenido(nombre):
    partes = []
    for rel in BLOQUES[nombre]:
        t = leer(rel)
        if rel.endswith(".js"):
            t = t.replace('"use strict";\n', "", 1)   # el 3D ya corre en modo estricto
        partes.append(f"/* ---- desde 2d/{rel} ---- */\n" + t.strip("\n") + "\n")
    return "\n".join(partes)

s = open(SRC, encoding="utf-8").read()
for nombre in BLOQUES:
    marca = f"/*@@{nombre}@@*/"
    assert s.count(marca) == 1, f"falta la marca {marca} en src3d.html"
    t = contenido(nombre)
    if nombre == "GAME1":
        viejo = '"explore2", "Ir a la playa")'
        assert viejo in t, "no se encontró el botón final del desafío 1"
        t = t.replace(viejo, '"explore2", "Ver el resumen de la zona")')
    s = s.replace(marca, t)

# Cabecera de página completa (la misma que usa el 2D)
cab = indice[:indice.index("<title>")]
cab = re.sub(r"<!--.*?-->\n", "", cab, count=1, flags=re.S)      # sin el mapa de carpetas del 2D
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, "w", encoding="utf-8").write(cab + s.strip() + "\n</body>\n</html>\n")

# Imágenes de personajes
os.makedirs(os.path.join(RAIZ, "3d", "assets"), exist_ok=True)
for n in ("p1.png", "p2.png", "p3.png"):
    shutil.copy(os.path.join(D2, "assets", n), os.path.join(RAIZ, "3d", "assets", n))
print("3d/index.html armado:", len(s), "caracteres")
