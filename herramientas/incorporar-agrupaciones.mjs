import fs from "node:fs"
import path from "node:path"

const carpeta = path.join(process.cwd(), "content")

const aplicar = process.argv.includes("--aplicar")

const nuevoBoton =
  '<button type="button" class="boton-papiro" data-estudio="agrupaciones">Agrupaciones</button>'

let modificadas = 0
let existentes = 0
let omitidas = 0

function recorrer(directorio) {
  for (const elemento of fs.readdirSync(directorio, {
    withFileTypes: true
  })) {
    const ruta = path.join(directorio, elemento.name)

    if (elemento.isDirectory()) {
      recorrer(ruta)
      continue
    }

    if (!elemento.isFile()) continue

    if (!/^P[a-z]*\d+\.md$/i.test(elemento.name)) {
      continue
    }

    const original = fs.readFileSync(ruta, "utf8")

    const navegacion =
      /<nav\b[^>]*class="ficha-apartados"[^>]*>[\s\S]*?<\/nav>/g

    const bloques = [...original.matchAll(navegacion)]

    if (bloques.length !== 1) {
      console.log(`${elemento.name}: revisar estructura.`)
      omitidas++
      continue
    }

    const bloque = bloques[0][0]

    if (bloque.includes('data-estudio="agrupaciones"')) {
      console.log(`${elemento.name}: ya tiene Agrupaciones.`)
      existentes++
      continue
    }

    const patron =
      /<button\b[^>]*data-estudio="sociologia"[^>]*>[\s\S]*?<\/button>/

    if (!patron.test(bloque)) {
      console.log(`${elemento.name}: no se encuentra Sociología.`)
      omitidas++
      continue
    }

    const salto = original.includes("\r\n") ? "\r\n" : "\n"

    const nuevoBloque = bloque.replace(
      patron,
      coincidencia => coincidencia + salto + nuevoBoton
    )

    const actualizado = original.replace(
      bloque,
      () => nuevoBloque
    )

    if (aplicar) {
      fs.writeFileSync(ruta, actualizado, "utf8")
      console.log(`${elemento.name}: botón incorporado.`)
    } else {
      console.log(`${elemento.name}: preparado para incorporar.`)
    }

    modificadas++
  }
}

recorrer(carpeta)

console.log("")
console.log(aplicar ? "MODIFICACIÓN REAL" : "SIMULACIÓN")
console.log(`Fichas ${aplicar ? "modificadas" : "por modificar"}: ${modificadas}`)
console.log(`Fichas que ya tienen el botón: ${existentes}`)
console.log(`Fichas pendientes de revisión: ${omitidas}`)
console.log(`Total de fichas examinadas: ${modificadas + existentes + omitidas}`)