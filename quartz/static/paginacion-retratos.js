(() => {
  const POR_PAGINA = 10;

  function iniciarPaginacion() {
    const contenedor = document.getElementById("paginacion-retratos");
    if (!contenedor) return;

    const tabla = Array.from(document.querySelectorAll("article table"))
  .find(t => t.querySelectorAll("tbody tr").length > 0);

if (!tabla) return;

    const filas = Array.from(tabla.querySelectorAll("tbody tr"));
    const totalPaginas = Math.ceil(filas.length / POR_PAGINA);

    if (totalPaginas <= 1) return;

    let paginaActual = 1;

    function mostrarPagina(numero) {
      paginaActual = numero;

      filas.forEach((fila, indice) => {
        fila.style.display =
          indice >= (numero - 1) * POR_PAGINA &&
          indice < numero * POR_PAGINA
            ? ""
            : "none";
      });

      contenedor.replaceChildren();

      function crearBoton(texto, destino, desactivado = false) {
        const boton = document.createElement("button");
        boton.textContent = texto;
        boton.type = "button";
        boton.disabled = desactivado;

        boton.addEventListener("click", () => {
          mostrarPagina(destino);
        });

        contenedor.appendChild(boton);
      }

      crearBoton("Anterior", numero - 1, numero === 1);

      for (let i = 1; i <= totalPaginas; i++) {
        crearBoton(String(i), i, i === numero);
      }

      crearBoton("Siguiente", numero + 1, numero === totalPaginas);
    }

    mostrarPagina(1);
  }

  document.addEventListener("nav", iniciarPaginacion);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarPaginacion);
  } else {
    iniciarPaginacion();
  }
})();