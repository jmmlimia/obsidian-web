const fs = require("fs");
const path = require("path");

const carpeta = path.join(__dirname, "content", "Seccion-retratos");
for (let numero = 4; numero <= 13; numero++) {
  const codigo = `Pad${String(numero).padStart(3, "0")}`;

const archivo = path.join(carpeta, `${codigo}.md`);
const original = fs.readFileSync(archivo, "utf8");

if (original.includes('class="ficha-retrato"')) {
  console.log(`${codigo} ya tiene la estructura nueva. No se modifica.`);
  continue;
}

const comentario = original
  .replace(/^---\s*\r?\n[\s\S]*?\r?\n---\s*/, "")
  .trim();

function convertirMarkdown(texto) {
  return texto
    .split(/\r?\n\s*\r?\n/)
    .map(parrafo => {
      const contenido = parrafo
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
      return `<p>${contenido}</p>`;
    })
    .join("\n\n");
}

const ficha = `---
title: ${codigo}
---

<div class="ficha-retrato">

<div class="ficha-izquierda">

<img src="../images/${codigo}.jpg" alt="${codigo}">

<h3>Bibliografía</h3>

<p>Pendiente de incorporar.</p>

</div>

<div class="ficha-derecha">

<h3>Comentario</h3>

${convertirMarkdown(comentario)}

<nav class="ficha-apartados">
<button type="button" class="boton-papiro" data-estudio="museologia">Museología</button><button type="button" class="boton-papiro" data-estudio="retratistica">Retratística</button><button type="button" class="boton-papiro" data-estudio="complementos">Complementos</button><button type="button" class="boton-papiro" data-estudio="sociologia">Sociología</button>
</nav>

<div id="estudio-retrato">
  <p>Selecciona un apartado para consultar su estudio.</p>
</div>

</div>

</div>
`;

const apartados = [
  ["museologia", "Museología"],
  ["retratistica", "Retratística"],
  ["complementos", "Complementos"],
  ["sociologia", "Sociología"]
];

for (const [nombre, titulo] of apartados) {
  const destino = path.join(carpeta, `${codigo}-${nombre}.md`);

  if (!fs.existsSync(destino)) {
    fs.writeFileSync(
      destino,
      `---\ntitle: ${codigo} — ${titulo}\n---\n\n# ${titulo}\n\nPendiente de incorporar.\n`,
      "utf8"
    );
  }
}

fs.writeFileSync(archivo, ficha, "utf8");

console.log(`${codigo} transformado correctamente.`);
console.log("Cuatro apartados de estudio comprobados o creados.");
}