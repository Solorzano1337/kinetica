"""Arma el prototipo 3D a partir del juego 2D.
Uso (desde la raíz del repositorio):
    python3 herramientas/armar3d.py
Lee 2d/index.html y herramientas/src3d.html y escribe 3d/index.html (página completa).
"""
import sys, os
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
live = os.path.join(RAIZ, '2d', 'index.html')
src = os.path.join(RAIZ, 'herramientas', 'src3d.html')
out = os.path.join(RAIZ, '3d', 'index.html')
L = open(live, encoding='utf-8').read()
s = open(src, encoding='utf-8').read()
def between(a, b, include_b=False):
    i = L.index(a); j = L.index(b, i)
    return L[i:j + (len(b) if include_b else 0)]
_t = L.index('<title>')
css = L[L.index('<style>', _t)+7 : L.index('</style>', _t)]
audio = between('/* ============ Audio', '/* ============ Utilidades UI')
ui = between('/* ============ Utilidades UI', '/* ============ Íconos y arte SVG')
art = between('/* ============ Íconos y arte SVG', 'const SCENES = {')
i = L.index('const CLUES = {'); j = L.index('\n};', i) + 3
clues = L[i:j]
openclue = between('function openClue(', 'R.explore1 =')
repos = between('const REF = {', 'R.repo1 = () =>') + 'R.repo1 = () => renderRepo("repo1");\n'
game1 = between('/* ---------- Desafío 1', '/* ---------- Desafío 2')
old = '"explore2", "Ir a la playa")'
assert old in game1, 'badge call'
game1 = game1.replace(old, '"explore2", "Ver el resumen de la zona")')
for k, v in [('/*@@CSS@@*/', css), ('/*@@AUDIO@@*/', audio), ('/*@@UI@@*/', ui), ('/*@@ART@@*/', art), ('/*@@CLUES@@*/', clues), ('/*@@OPENCLUE@@*/', openclue), ('/*@@REPOS@@*/', repos), ('/*@@GAME1@@*/', game1)]:
    assert s.count(k) == 1, k
    s = s.replace(k, v)
HEAD = L[:L.index('<title>')]
open(out, 'w', encoding='utf-8').write(HEAD + s.strip() + '\n</body>\n</html>\n')
print('built', len(s))
