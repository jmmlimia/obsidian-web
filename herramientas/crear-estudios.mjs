
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Localización de la carpeta de retratos
const carpetaPrograma = path.dirname(fileURLToPath(import.meta.url));

const carpetaRetratos = path.resolve(
  carpetaPrograma,
  "../content/seccion-retratos"
);

// Modo de simulación
const simulacion = process.argv.includes("--simular");

// Identificación de los ficheros raíz
const patronRetrato = /^(Pad\d{3}|P(?:IV|III|II|I)\d{4})\.md$/;

// Apartados de estudio
const apartados = [
  { archivo: "museologia", titulo: "Museología" },
  { archivo: "retratistica", titulo: "Retratística" },
  { archivo: "complementos", titulo: "Complementos" },
  { archivo: "sociologia", titulo: "Sociología" }
];

// Contadores
let retratos = 0;
let creados = 0;
let existentes = 0;
let errores = 0;

console.log("\nCREACIÓN AUTOMÁTICA DE ARCHIVOS DE ESTUDIO");
console.log("=========================================");

if (simulacion) {
  console.log("MODO SIMULACIÓN: no se modificará ningún archivo.");
}

console.log("\nCarpeta:", carpetaRetratos, "\n");

// Comprobación de la carpeta
if (!fs.existsSync(carpetaRetratos)) {
  console.error("ERROR: no se encuentra la carpeta de retratos.");
  process.exit(1);
}

// Lectura de los ficheros raíz
const archivos = fs.readdirSync(carpetaRetratos, {
  withFileTypes: true
})
  .filter(archivo => archivo.isFile())
  .map(archivo => archivo.name)
  .filter(nombre => patronRetrato.test(nombre))
  .sort();

// Procesamiento de los retratos
for (const archivo of archivos) {

  const codigo = path.basename(archivo, ".md");
  retratos++;

  for (const apartado of apartados) {

    const nombre = `${codigo}-${apartado.archivo}.md`;
    const destino = path.join(carpetaRetratos, nombre);

    const contenido =
      `---\n` +
      `title: ${codigo} - ${apartado.titulo}\n` +
      `---\n\n` +
      `# ${apartado.titulo}\n\n`;

    try {

      if (simulacion) {

        if (fs.existsSync(destino)) {
          existentes++;
        } else {
          console.log(`Se crearía: ${nombre}`);
          creados++;
        }

      } else {

        // Escritura exclusiva: nunca sobrescribe
        fs.writeFileSync(destino, contenido, {
          encoding: "utf8",
          flag: "wx"
        });

        console.log(`Creado: ${nombre}`);
        creados++;

      }

    } catch (error) {

      if (error.code === "EEXIST") {
        existentes++;
      } else {
        errores++;
        console.error(`ERROR en ${nombre}: ${error.message}`);
      }

    }
  }
}

// Informe final
console.log("\n=========================================");
console.log("RESUMEN");
console.log("=========================================");
console.log(`Ficheros raíz examinados: ${retratos}`);
console.log(`Archivos de estudio previstos: ${retratos * apartados.length}`);
console.log(`Archivos ya existentes: ${existentes}`);
console.log(
  `${simulacion ? "Archivos que se crearían" : "Archivos creados"}: ${creados}`
);
console.log(`Errores: ${errores}`);
console.log("Ficheros raíz modificados: 0");
console.log("=========================================\n");

if (errores > 0) {
  process.exitCode = 1;
}
