
document.addEventListener("nav", iniciarBusquedaAvanzada)
document.addEventListener("DOMContentLoaded", iniciarBusquedaAvanzada)

async function iniciarBusquedaAvanzada() {
  const contenedor = document.getElementById("busqueda-avanzada")
  if (!contenedor) return

  contenedor.replaceChildren()

  // Crear un grupo de campos.
  function crearGrupo(titulo, columnas = 3) {
    const seccion = document.createElement("section")
    seccion.style.marginBottom = "24px"

    const encabezado = document.createElement("h3")
    encabezado.textContent = titulo

    const campos = document.createElement("div")
    campos.style.display = "grid"
    campos.style.gridTemplateColumns =
      `repeat(${columnas}, minmax(0, 1fr))`
    campos.style.gap = "16px"

    seccion.append(encabezado, campos)
    contenedor.appendChild(seccion)

    return campos
  }

  function crearSelector(grupo, id, titulo, opciones) {
    const bloque = document.createElement("div")
    bloque.style.minWidth = "0"

    const etiqueta = document.createElement("label")
    etiqueta.htmlFor = id
    etiqueta.textContent = titulo

    const selector = document.createElement("select")
    selector.id = id
    selector.style.width = "100%"

    for (const [valor, texto] of opciones) {
      const opcion = document.createElement("option")
      opcion.value = valor
      opcion.textContent = texto
      selector.appendChild(opcion)
    }

    bloque.append(etiqueta, selector)
    grupo.appendChild(bloque)

    return selector
  }

  function crearTexto(grupo, id, titulo) {
    const bloque = document.createElement("div")
    bloque.style.minWidth = "0"

    const etiqueta = document.createElement("label")
    etiqueta.htmlFor = id
    etiqueta.textContent = titulo

    const entrada = document.createElement("input")
    entrada.type = "text"
    entrada.id = id
    entrada.placeholder = "Número completo o parcial"
    entrada.style.width = "100%"
    entrada.style.boxSizing = "border-box"

    bloque.append(etiqueta, entrada)
    grupo.appendChild(bloque)

    return entrada
  }

  // PRIMER GRUPO: características del retrato.
  const grupo1 = crearGrupo("Características del retrato")

  const genero = crearSelector(grupo1, "busqueda-genero", "Género", [
    ["", "Todos"],
    ["__sin_datos__", "Sin datos"],
    ["Masculino", "Masculino"],
    ["Femenino", "Femenino"],
    ["Indefinible", "Indefinible"],
    ["Pareja", "Pareja"],
    ["Recompuesto", "Recompuesto"],
  ])

  const tecnica = crearSelector(grupo1, "busqueda-tecnica", "Técnica", [
    ["", "Todas"],
    ["__sin_datos__", "Sin datos"],
    ["Encáustica", "Encáustica"],
    ["Témpera", "Témpera"],
    ["Técnica mixta (encáustica/témpera)", "Técnica mixta (encáustica/témpera)"],
    ["Indeterminada", "Indeterminada"],
    ["Desconocida", "Desconocida"],
  ])

  const soporte = crearSelector(grupo1, "busqueda-soporte", "Soporte", [
    ["", "Todos"],
    ["__sin_datos__", "Sin datos"],
    ["Cartonnage", "Cartonnage"],
    ["Desconocido", "Desconocido"],
    ["Lino", "Lino"],
    ["Madera", "Madera (especie indeterminada)"],
    ["De abeto", "Madera de abeto"],
    ["De cedro", "Madera de cedro"],
    ["De ciprés", "Madera de ciprés"],
    ["De haya", "Madera de haya"],
    ["De higuera", "Madera de higuera"],
    ["De pino", "Madera de pino"],
    ["De roble", "Madera de roble"],
    ["De sauce", "Madera de sauce"],
    ["De tilo", "Madera de tilo"],
    ["Papiro", "Papiro"],
  ])

  const enMomia = crearSelector(grupo1, "busqueda-en-momia", "¿En su momia?", [
    ["", "Todos"],
    ["__sin_datos__", "Sin datos"],
    ["si", "Sí"],
    ["no", "No"],
    ["desconocido", "Desconocido"],
  ])

  const legible = crearSelector(grupo1, "busqueda-legible", "¿Legible?", [
    ["", "Todos"],
    ["__sin_datos__", "Sin datos"],
    ["si", "Sí"],
    ["no", "No"],
    ["recompuesto", "Recompuesto"],
  ])

  const corteForma = crearSelector(grupo1, "busqueda-corte-forma", "Corte o forma", [
    ["", "Todos"],
    ["__sin_datos__", "Sin datos"],
    ["Indefinible", "Indefinible"],
    ["Absidial", "Absidial"],
    ["Circular", "Circular"],
    ["Irregular", "Irregular"],
    ["Ovalado", "Ovalado"],
    ["Piramidal", "Piramidal"],
    ["Recto", "Recto"],
    ["Recto con chaflanes", "Recto con chaflanes"],
    ["Trapezoide", "Trapezoide"],
  ])

  // DIMENSIONES DEL RETRATO.
  const grupoDimensiones = crearGrupo("Dimensiones (cm)", 2)

  function crearNumero(grupo, id, titulo) {
    const bloque = document.createElement("div")
    bloque.style.minWidth = "0"

    const etiqueta = document.createElement("label")
    etiqueta.htmlFor = id
    etiqueta.textContent = titulo

    const entrada = document.createElement("input")
    entrada.type = "number"
    entrada.id = id
    entrada.min = "0"
    entrada.step = "any"
    entrada.style.width = "100%"
    entrada.style.boxSizing = "border-box"

    bloque.append(etiqueta, entrada)
    grupo.appendChild(bloque)

    return entrada
  }

  const altoMin = crearNumero(grupoDimensiones, "alto-min", "Altura mínima")
  const altoMax = crearNumero(grupoDimensiones, "alto-max", "Altura máxima")
  const anchoMin = crearNumero(grupoDimensiones, "ancho-min", "Anchura mínima")
  const anchoMax = crearNumero(grupoDimensiones, "ancho-max", "Anchura máxima")

  // CARACTERÍSTICAS DE LOS INDIVIDUOS.
  const grupoIndividuos = crearGrupo("Características de los individuos", 3)

  const orientacionCuerpo = crearSelector(
    grupoIndividuos, "busqueda-orientacion", "Orientación del cuerpo", [
      ["", "Todas"],
      ["__sin_datos__", "Sin datos"],
      ["Indefinible", "Indefinible"],
      ["Derecha", "Derecha"],
      ["Frontal", "Frontal"],
      ["Izquierda", "Izquierda"],
    ],
  )

    const opcionesSiNo = [
    ["", "Todos"],
    ["__sin_datos__", "Sin datos"],
    ["si", "Sí"],
    ["no", "No"],
  ]

  const barba = crearSelector(
    grupoIndividuos, "busqueda-barba", "Barba", opcionesSiNo,
  )

  const bigote = crearSelector(
    grupoIndividuos, "busqueda-bigote", "Bigote", opcionesSiNo,
  )

  const corona = crearSelector(
    grupoIndividuos, "busqueda-corona", "Corona", opcionesSiNo,
  )

  const pendientes = crearSelector(
    grupoIndividuos, "busqueda-pendientes", "Pendientes", opcionesSiNo,
  )

  const collares = crearSelector(
    grupoIndividuos, "busqueda-collares", "Collares", opcionesSiNo,
  )

  // SEGUNDO GRUPO: ubicación actual.
  const grupo2 = crearGrupo("Ubicación", 2)

  const localizacion = crearSelector(
    grupo2, "busqueda-localizacion", "Localización (museo o colección)",
    [["", "Todas"]],
  )

  const numeroCatalogo = crearTexto(
    grupo2, "busqueda-numero-catalogo", "Número de catálogo",
  )

  const ciudad = crearSelector(
    grupo2, "busqueda-ciudad", "Ciudad",
    [["", "Todas"]],
  )

  const pais = crearSelector(
    grupo2, "busqueda-pais", "País",
    [["", "Todos"]],
  )

  // TERCER GRUPO: procedencia original.
  const grupo3 = crearGrupo("Procedencia original", 2)

  const procedencia = crearSelector(
    grupo3, "busqueda-procedencia", "Procedencia original",
    [
      ["", "Todas"],
      ["__sin_datos__", "Sin datos"],
      ["desconocida", "Desconocida"],
      ["dudosa", "Dudosa"],
      ["Abusir el-Meleq", "Abusir el-Meleq"],
      ["Akhmim", "Akhmim"],
      ["Antinoópolis", "Antinoópolis"],
      ["Arsinoe", "Arsinoe"],
      ["Asyut", "Asyut"],
      ["Darb Gerze", "Darb Gerze"],
      ["Deir el-Bahari (Tebas oeste)", "Deir el-Bahari (Tebas oeste)"],
      ["Deir el-Banat", "Deir el-Banat"],
      ["Deir el-Medina", "Deir el-Medina"],
      ["Fag el-Gamus", "Fag el-Gamus"],
      ["Fayum", "Fayum"],
      ["Filadelfia", "Filadelfia"],
      ["el-Gharak", "el-Gharak"],
      ["Hawara", "Hawara"],
      ["el-Hibeh", "el-Hibeh"],
      ["Kafr Ammar", "Kafr Ammar"],
      ["Karanis", "Karanis"],
      ["el-Kharga", "el-Kharga"],
      ["el-Lahun", "el-Lahun"],
      ["Marina el-Alamein", "Marina el-Alamein"],
      ["Mazghuna", "Mazghuna"],
      ["Menfis", "Menfis"],
      ["el-Minya", "el-Minya"],
      ["er-Rubayat", "er-Rubayat"],
      ["Saqqara", "Saqqara"],
      ["Tanis", "Tanis"],
      ["Tebas", "Tebas"],
      ["Tebtunis", "Tebtunis"],
    ],
  )

  // AGRUPACIONES.
  const grupoAgrupaciones = crearGrupo("Agrupaciones", 2)

  const agrupacionGrupo = crearSelector(
    grupoAgrupaciones,
    "busqueda-agrupacion-grupo",
    "Grupo",
    [["", "Todas las agrupaciones"]],
  )

  const agrupacionCodigo = crearSelector(
    grupoAgrupaciones,
    "busqueda-agrupacion-codigo",
    "Código",
    [["", "Todos los códigos"]],
  )

  agrupacionCodigo.disabled = true

// Colocar Ubicación como primer apartado.
contenedor.insertBefore(
  grupo2.parentElement,
  grupo1.parentElement
)

// Incorporar Procedencia original al apartado Ubicación.
grupo2.appendChild(procedencia.parentElement)
grupo3.parentElement.remove()

// Ordenar los campos de Características del retrato.
grupo1.append(
  genero.parentElement,
  enMomia.parentElement,
  legible.parentElement,
  tecnica.parentElement,
  soporte.parentElement,
  corteForma.parentElement
)

  const resultados = document.createElement("div")
  resultados.id = "resultados-busqueda"
  contenedor.appendChild(resultados)
  resultados.textContent = "Cargando retratos..."

  function normalizar(texto) {
    return String(texto ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
  }

  // La ruta del índice se obtiene de la ubicación del propio script.
  const script = document.querySelector('script[src*="busqueda-avanzada.js"]')
  const urlScript = script?.src ?? "/static/busqueda-avanzada.js"
  const urlIndice = new URL("indice-retratos.json", urlScript)
  const urlAgrupaciones = new URL("agrupaciones.json", urlScript)
  const prefijo = new URL("../", urlScript).pathname

  let retratos
  let gruposAgrupaciones

  try {
    const respuesta = await fetch(urlIndice)
    if (!respuesta.ok) throw new Error(`Error HTTP ${respuesta.status}`)

    retratos = await respuesta.json()
    if (!Array.isArray(retratos)) throw new Error("Índice no válido")
    const respuestaAgrupaciones = await fetch(urlAgrupaciones)
    if (!respuestaAgrupaciones.ok) {
    throw new Error(`Error al cargar agrupaciones: ${respuestaAgrupaciones.status}`)
    }

    gruposAgrupaciones = await respuestaAgrupaciones.json()
    if (!Array.isArray(gruposAgrupaciones)) {
    throw new Error("Archivo de agrupaciones no válido")
  }
  } catch (error) {
    resultados.textContent = `No se pudo cargar el índice: ${error.message}`
    return
  }

  // Crear opciones automáticamente a partir del catálogo.
  function llenarSelector(selector, campo) {
    const valores = new Map()

    for (const retrato of retratos) {
      const valor = String(retrato[campo] ?? "").trim()
      if (valor && !valores.has(normalizar(valor))) {
        valores.set(normalizar(valor), valor)
      }
    }

    const ordenados = [...valores.values()].sort((a, b) =>
      a.localeCompare(b, "es", { sensitivity: "base" }),
    )

    for (const valor of ordenados) {
      const opcion = document.createElement("option")
      opcion.value = valor
      opcion.textContent = valor
      selector.appendChild(opcion)
    }
  }

// Incorporar las agrupaciones al menú Grupo.
for (const grupo of gruposAgrupaciones) {
  agrupacionGrupo.add(
    new Option(grupo.nombre, grupo.id)
  )
}

// Actualizar los códigos según la agrupación seleccionada.
agrupacionGrupo.addEventListener("change", () => {
  agrupacionCodigo.replaceChildren(
    new Option("Todos los códigos", "")
  )

  const grupoSeleccionado = gruposAgrupaciones.find(
    grupo => grupo.id === agrupacionGrupo.value
  )

  agrupacionCodigo.disabled = !grupoSeleccionado

  if (grupoSeleccionado) {
    for (const elemento of grupoSeleccionado.codigos) {
      agrupacionCodigo.add(
        new Option(
          `${elemento.codigo} — ${elemento.descripcion}`,
          elemento.codigo
        )
      )
    }
  }
})

  llenarSelector(localizacion, "localizacion")
  llenarSelector(ciudad, "ciudad")
  llenarSelector(pais, "pais")
  localizacion.add(new Option("Sin datos", "__sin_datos__"), 1)
  ciudad.add(new Option("Sin datos", "__sin_datos__"), 1)
  pais.add(new Option("Sin datos", "__sin_datos__"), 1)

    function coincide(retrato, campo, selector) {
    if (!selector.value) return true

    if (selector.value === "__sin_datos__") {
      return normalizar(retrato[campo]) === ""
    }

    return normalizar(retrato[campo]) === normalizar(selector.value)
  }

function coincideAgrupacion(retrato) {
  if (!agrupacionGrupo.value) return true

  const grupoSeleccionado = gruposAgrupaciones.find(
    grupo => grupo.id === agrupacionGrupo.value
  )

  if (!grupoSeleccionado) return false

  const codigosRetrato = Array.isArray(retrato.agrupaciones)
    ? retrato.agrupaciones
    : []

  if (agrupacionCodigo.value) {
    return codigosRetrato.includes(agrupacionCodigo.value)
  }

  return grupoSeleccionado.codigos.some(
    elemento => codigosRetrato.includes(elemento.codigo)
  )
}

  function cumpleDimension(valor, minimo, maximo) {
    if (minimo.value === "" && maximo.value === "") {
      return true
    }

    if (valor === null || valor === undefined || valor === "") {
      return false
    }

    const numero = Number(valor)
    if (!Number.isFinite(numero)) return false

    if (minimo.value !== "" && numero < Number(minimo.value)) {
      return false
    }

    if (maximo.value !== "" && numero > Number(maximo.value)) {
      return false
    }

    return true
  }

  function mostrarResultados() {
    const encontrados = retratos.filter((retrato) =>
      coincideAgrupacion(retrato) &&
      coincide(retrato, "genero", genero) &&
      coincide(retrato, "tecnica", tecnica) &&
      coincide(retrato, "soporte", soporte) &&
      coincide(retrato, "en_momia", enMomia) &&
      coincide(retrato, "legible", legible) &&
      coincide(retrato, "corte_forma", corteForma) &&
      coincide(retrato, "orientacion_cuerpo", orientacionCuerpo) &&
      coincide(retrato, "barba", barba) &&
      coincide(retrato, "bigote", bigote) &&
      coincide(retrato, "corona", corona) &&
      coincide(retrato, "pendientes", pendientes) &&
      coincide(retrato, "collares", collares) &&
      coincide(retrato, "localizacion", localizacion) &&
      coincide(retrato, "ciudad", ciudad) &&
      coincide(retrato, "pais", pais) &&
      coincide(retrato, "procedencia_original", procedencia) &&
      cumpleDimension(retrato.alto, altoMin, altoMax) &&
      cumpleDimension(retrato.ancho, anchoMin, anchoMax) &&
      (
        !numeroCatalogo.value.trim() ||
        normalizar(retrato.numero_catalogo).includes(
          normalizar(numeroCatalogo.value),
        )
      ),
    )

    resultados.replaceChildren()
    const hayBusqueda =
      selectores.some((selector) => selector.value !== "") ||
      numeroCatalogo.value.trim() !== "" ||
      altoMin.value !== "" ||
      altoMax.value !== "" ||
      anchoMin.value !== "" ||
      anchoMax.value !== ""

    if (!hayBusqueda) {
      const total = document.createElement("p")
      total.textContent = `Retratos en el catálogo: ${retratos.length}`
      resultados.appendChild(total)
      return
    }
    const resumen = document.createElement("p")
    resumen.textContent = `Retratos encontrados: ${encontrados.length}`
    resultados.appendChild(resumen)

    const lista = document.createElement("ul")

    for (const retrato of encontrados) {
      const elemento = document.createElement("li")
      const enlace = document.createElement("a")

      enlace.href =
        `${prefijo}${retrato.url.replace(/^\//, "")}`

      enlace.textContent =
        `${retrato.id} — ${retrato.localizacion || "Ubicación desconocida"}`

      elemento.appendChild(enlace)
      lista.appendChild(elemento)
    }

    resultados.appendChild(lista)
  }

    const selectores = [
    genero, tecnica, soporte, enMomia, legible, corteForma,
    orientacionCuerpo, barba, bigote, corona, pendientes, collares,
    localizacion, ciudad, pais, procedencia,
    agrupacionGrupo, agrupacionCodigo,  ]

  for (const selector of selectores) {
    selector.addEventListener("change", mostrarResultados)
  }

  numeroCatalogo.addEventListener("input", mostrarResultados)
  altoMin.addEventListener("input", mostrarResultados)
  altoMax.addEventListener("input", mostrarResultados)
  anchoMin.addEventListener("input", mostrarResultados)
  anchoMax.addEventListener("input", mostrarResultados)

  mostrarResultados()
}
