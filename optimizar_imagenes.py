#!/usr/bin/env python3
import argparse, re, shutil, sys
from pathlib import Path
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument("--max-ancho", type=int, default=1920)
ap.add_argument("--calidad", type=int, default=90)
ap.add_argument("--limite-kb", type=int, default=300)
ap.add_argument("--solo-convertir", action="store_true")
a = ap.parse_args()

raiz = Path(".")
img = raiz / "img"
if not img.is_dir():
    sys.exit("No encuentro la carpeta ./img. Ejecuta el script desde la carpeta del sitio.")

def tiene_alfa(im):
    return im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)

kb = lambda n: n / 1024
total_antes = total_despues = 0
convertidas = []

print(f"{'Archivo':38} {'PNG':>9} {'WebP':>9}  Modo")
for png in sorted(img.glob("*.png")):
    if png.name.lower().startswith("icon-"):
        continue
    im = Image.open(png)
    alfa = tiene_alfa(im)
    im = im.convert("RGBA" if alfa else "RGB")
    if im.width > a.max_ancho:
        h = round(im.height * a.max_ancho / im.width)
        im = im.resize((a.max_ancho, h), Image.NEAREST)
    destino = png.with_suffix(".webp")
    im.save(destino, "WEBP", lossless=True, quality=100, method=6)
    modo = "lossless"
    if not alfa and kb(destino.stat().st_size) > a.limite_kb:
        im.save(destino, "WEBP", quality=a.calidad, method=6)
        modo = f"calidad {a.calidad}"
    antes, despues = png.stat().st_size, destino.stat().st_size
    if despues >= antes:
        destino.unlink()
        print(f"{png.name:38} {kb(antes):7.0f}KB {'(se queda en PNG)':>9}")
        continue
    total_antes += antes; total_despues += despues
    convertidas.append(destino.name)
    print(f"{png.name:38} {kb(antes):7.0f}KB {kb(despues):7.0f}KB  {modo}")

if total_antes:
    print(f"\nTotal: {kb(total_antes):.0f} KB -> {kb(total_despues):.0f} KB "
          f"(ahorro {100 - 100*total_despues/total_antes:.0f}%)")
if not convertidas:
    sys.exit("No se convirtió ninguna imagen.")
if a.solo_convertir:
    sys.exit(0)

def a_webp(m):
    base = m.group(1)
    if (img / (Path(base).name + ".webp")).exists():
        return base + ".webp"
    return m.group(0)

patron = re.compile(r"(\./img/(?!icon-)[\w\-]+)\.png")

for nombre in ("index.html", "sw.js"):
    f = raiz / nombre
    if not f.exists():
        print(f"(aviso) no encontré {nombre}")
        continue
    shutil.copy(f, f.with_suffix(f.suffix + ".bak"))
    t = f.read_text(encoding="utf-8")
    t = patron.sub(a_webp, t)

    if nombre == "sw.js":
        obligatorios = set(re.findall(r"'\./img/[^']+'", re.search(r"const ARCHIVOS = \[.*?\];", t, re.S).group(0)))
        lista = [f"'./img/{p.name}'" for p in sorted(img.glob("*.webp"))]
        lista = [x for x in lista if x not in obligatorios]
        bloque = "const OPCIONALES = [\n    " + ",\n    ".join(lista) + "\n];"
        t, n = re.subn(r"const OPCIONALES = \[.*?\];", lambda _: bloque, t, flags=re.S)
        if n != 1:
            print("(aviso) no pude reescribir OPCIONALES en sw.js; agrégalas a mano.")
        t = re.sub(r"grimcliff-v(\d+)", lambda m: f"grimcliff-v{int(m.group(1)) + 1}", t, count=1)

    f.write_text(t, encoding="utf-8")
    print(f"Actualizado: {nombre} (copia en {nombre}.bak)")

print("\nListo. Revisa el sitio y, si todo se ve bien, puedes quitar los .png ya convertidos del despliegue.")