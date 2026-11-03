(() => {
  const CLAVE_DESTINO = "busquedaDestino"

  function normalizarRuta(ruta) {
    return ruta.replace(/\.html$/, "").replace(/\/+$/, "")
  }

  // Al pulsar un resultado de la búsqueda, anotar a qué ficha se va.
  document.addEventListener(
    "click",
    (evento) => {
      const enlace =
        evento.target.closest && evento.target.closest("#resultados-busqueda a")
      if (!enlace) return

      try {
        const destino = normalizarRuta(
          new URL(enlace.href, window.location.href).pathname,
        )
        sessionStorage.setItem(CLAVE_DESTINO, destino)
      } catch (e) {}
    },
    true,
  )

  function mostrarEnlaceVolver() {
    // Quitar el enlace de la página anterior, si lo hubiera.
    document.querySelectorAll(".volver-busqueda").forEach((e) => e.remove())

    let direccion = null
    let destino = null
    try {
      direccion = sessionStorage.getItem("ultimaBusqueda")
      destino = sessionStorage.getItem(CLAVE_DESTINO)
    } catch (e) {}

    const rutaActual = normalizarRuta(window.location.pathname)

    // Si se ha llegado a otra página distinta, olvidar el destino anotado.
    if (destino && destino !== rutaActual) {
      try {
        sessionStorage.removeItem(CLAVE_DESTINO)
      } catch (e) {}
    }

    // Solo en fichas de retrato, y solo si se llegó desde un resultado.
    const ficha = document.querySelector(".ficha-retrato")
    if (!ficha || !direccion || destino !== rutaActual) return

    const contenedor = document.createElement("div")
    contenedor.className = "volver-busqueda"
    contenedor.style.marginTop = "1rem"

    const enlace = document.createElement("a")
    enlace.href = direccion
    enlace.textContent = "← Volver a la búsqueda"

    contenedor.appendChild(enlace)

    // Columna derecha, debajo de la vista gráfica.
    const columnaDerecha = document.querySelector(".sidebar.right")

    if (columnaDerecha) {
      columnaDerecha.appendChild(contenedor)
    } else {
      ficha.parentNode.insertBefore(contenedor, ficha)
    }
  }

  document.addEventListener("nav", mostrarEnlaceVolver)

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mostrarEnlaceVolver)
  } else {
    mostrarEnlaceVolver()
  }
})()