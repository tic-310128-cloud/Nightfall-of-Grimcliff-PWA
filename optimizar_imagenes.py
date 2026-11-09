#!/usr/bin/env python3
"""
Convierte los PNG de ./img (incluye subcarpetas) a WebP SIN pérdida
y actualiza index.html y sw.js.

Cambios frente a la versión anterior:
- Recursivo (img/sprites/...) con rglob.
- Nunca sobrescribe ni borra un .webp que ya exista (salvo --forzar).
- Siempre sin pérdida (pixel art).
- Reescalado con LANCZOS por defecto (o NEAREST con --reescalado nearest).
- El respaldo .bak se crea UNA sola vez (no se pisa en la segunda ejecución).
- OPCIONALES en sw.js incluye subcarpetas y conserva los PNG (icon-512-maskable.png).
"""
import argparse, re, shutil, sys
from pathlib import Path
from PIL import Image

ap = argparse.ArgumentParser()
ap.add_argument("--max-ancho", type=int, default=1920)
ap.add_argument("--reescalado", choices=["lanczos", "nearest"], default="lanczos",
                help="nearest solo si reduces pixel art por un factor entero")
ap.add_argument("--forzar", action="store_true", help="reconvertir aunque ya exista el .webp")
ap.add_argument("--solo-convertir", action="store_true")
a = ap.parse_args()

raiz = Path(".")
img = raiz / "img"
if not img.is_dir():
    sys.exit("No encuentro la carpeta ./img. Ejecuta el script desde la carpeta del sitio.")

kb = lambda n: n / 1024
remuestreo = Image.NEAREST if a.reescalado == "nearest" else Image.LANCZOS


def tiene_alfa(im):
    return im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)


total_antes = total_despues = 0
convertidas = 0

print(f"{'Archivo':45} {'PNG':>9} {'WebP':>9}  Estado")
for png in sorted(img.rglob("*.png")):
    if png.name.lower().startswith("icon-"):
        continue
    destino = png.with_suffix(".webp")
    nombre = png.relative_to(img).as_posix()

    if destino.exists() and not a.forzar:
        print(f"{nombre:45} {'':>9} {'':>9}  ya existe .webp (se respeta)")
        continue

    im = Image.open(png)
    im = im.convert("RGBA" if tiene_alfa(im) else "RGB")
    if im.width > a.max_ancho:
        h = round(im.height * a.max_ancho / im.width)
        im = im.resize((a.max_ancho, h), remuestreo)

    # Se guarda en un temporal: solo reemplaza si realmente pesa menos
    tmp = destino.with_name(destino.stem + ".tmp.webp")
    im.save(tmp, "WEBP", lossless=True, quality=100, method=6)
    antes, despues = png.stat().st_size, tmp.stat().st_size
    if despues >= antes:
        tmp.unlink()
        print(f"{nombre:45} {kb(antes):7.0f}KB {'':>9}  se queda en PNG")
        continue
    tmp.replace(destino)
    total_antes += antes
    total_despues += despues
    convertidas += 1
    print(f"{nombre:45} {kb(antes):7.0f}KB {kb(despues):7.0f}KB  lossless")

if total_antes:
    print(f"\nTotal: {kb(total_antes):.0f} KB -> {kb(total_despues):.0f} KB "
          f"(ahorro {100 - 100 * total_despues / total_antes:.0f}%)")
if a.solo_convertir:
    sys.exit(0)

# --- Actualizar referencias en index.html y sw.js ---
patron = re.compile(r"(\./img/(?!icon-)[\w\-/]+)\.png")


def a_webp(m):
    base = m.group(1)                       # p. ej. ./img/sprites/kaelen_viajero_reposo
    if (raiz / (base[2:] + ".webp")).exists():
        return base + ".webp"
    return m.group(0)


for nombre in ("index.html", "sw.js"):
    f = raiz / nombre
    if not f.exists():
        print(f"(aviso) no encontré {nombre}")
        continue
    bak = f.with_suffix(f.suffix + ".bak")
    if not bak.exists():                    # el respaldo original nunca se pisa
        shutil.copy(f, bak)
    t = f.read_text(encoding="utf-8")
    t = patron.sub(a_webp, t)

    if nombre == "sw.js":
        m_arch = re.search(r"const ARCHIVOS = \[(.*?)\];", t, re.S)
        m_opc = re.search(r"const OPCIONALES = \[(.*?)\];", t, re.S)
        if not (m_arch and m_opc):
            print("(aviso) no pude leer ARCHIVOS/OPCIONALES en sw.js; edítalos a mano.")
        else:
            obligatorios = set(re.findall(r"'([^']+)'", m_arch.group(1)))
            previos = re.findall(r"'([^']+)'", m_opc.group(1))
            webps = {"./" + p.as_posix() for p in img.rglob("*.webp")}
            otros = {x for x in previos if not x.endswith(".webp")}   # PNG que se quedan (maskable, etc.)
            lista = sorted((webps | otros) - obligatorios)
            bloque = "const OPCIONALES = [\n    " + ",\n    ".join(f"'{x}'" for x in lista) + "\n];"
            t = t[:m_opc.start()] + bloque + t[m_opc.end():]
        t = re.sub(r"grimcliff-v(\d+)", lambda m: f"grimcliff-v{int(m.group(1)) + 1}", t, count=1)

    f.write_text(t, encoding="utf-8")
    print(f"Actualizado: {nombre} (copia original en {bak.name})")

print("\nListo. Revisa el sitio y, si todo se ve bien, puedes quitar los .png ya convertidos del despliegue.")