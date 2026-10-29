
import fs from "node:fs"
import path from "node:path"
import YAML from "yaml"

const raiz = process.cwd()
const carpetaContenido = path.join(raiz, "content")
const carpetaSalida = path.join(raiz, "quartz", "static")
const archivoSalida = path.join(carpetaSalida, "indice-retratos.json")

const campos = [
  "localizacion",
  "numero_catalogo",
  "ciudad",
  "pais",
  "en_momia",
  "legible",
  "tecnica",
  "soporte",
  "corte_forma",
  "alto",
  "ancho",
  "procedencia_original",
  "genero",
  "orientacion_cuerpo",
  "pelo",
  "barba",
  "bigote",
  "corona",
  "pendientes",
  "collares",
  "agrupaciones",
]

function buscarArchivos(directorio) {
  const archivos = []

  for (const elemento of fs.readdirSync(directorio, { withFileTypes: true })) {
    const ruta = path.join(directorio, elemento.name)

    if (elemento.isDirectory()) {
      archivos.push(...buscarArchivos(ruta))
    } else if (elemento.isFile() && elemento.name.endsWith(".md")) {
      archivos.push(ruta)
    }
  }

  return archivos
}

const retratos = []

for (const archivo of buscarArchivos(carpetaContenido)) {
  const nombre = path.basename(archivo, ".md")

  // Reconocer las fichas Pad, PIV y Rad.
  if (!/^(Pad|PIV|Rad)\d+$/i.test(nombre)) continue

  const contenido = fs.readFileSync(archivo, "utf8")
  const coincidencia = contenido.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)

  if (!coincidencia) {
    console.warn(`Sin propiedades YAML: ${archivo}`)
    continue
  }

  try {
    const propiedades = YAML.parse(coincidencia[1]) ?? {}

    const rutaRelativa = path
      .relative(carpetaContenido, archivo)
      .replace(/\\/g, "/")
      .replace(/\.md$/i, "")
      .toLowerCase()

    const retrato = {
      id: nombre,
      url: `/${rutaRelativa}`,
    }

    for (const campo of campos) {
      retrato[campo] = propiedades[campo] ?? null
    }

retrato.agrupaciones = Array.isArray(retrato.agrupaciones)
  ? retrato.agrupaciones.map(codigo =>
      String(codigo).trim()
    )
  : []

    retratos.push(retrato)
  } catch (error) {
    console.error(`Error en las propiedades de ${archivo}: ${error.message}`)
    process.exitCode = 1
  }
}

retratos.sort((a, b) =>
  a.id.localeCompare(b.id, "es", { numeric: true }),
)

if (process.exitCode) {
  console.error("No se ha generado el índice porque hay errores en el YAML.")
} else {
  fs.mkdirSync(carpetaSalida, { recursive: true })
  fs.writeFileSync(archivoSalida, JSON.stringify(retratos, null, 2), "utf8")

  console.log(`Índice generado correctamente: ${retratos.length} retratos.`)
  console.log(`Archivo: ${archivoSalida}`)
}
