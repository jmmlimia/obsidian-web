(() => {
  const script = document.querySelector(
    'script[src*="estudios-retratos.js"]'
  );

  const urlScript = script?.src;

  async function mostrarAgrupaciones(ficha, contenedor) {
    if (!urlScript) {
      throw new Error("No se encontró la ruta del script");
    }

    const urlIndice = new URL("indice-retratos.json", urlScript);
    const urlAgrupaciones = new URL("agrupaciones.json", urlScript);

    const [respuestaIndice, respuestaAgrupaciones] = await Promise.all([
      fetch(urlIndice),
      fetch(urlAgrupaciones)
    ]);

    if (!respuestaIndice.ok || !respuestaAgrupaciones.ok) {
      throw new Error("No se pudieron cargar los archivos JSON");
    }

    const retratos = await respuestaIndice.json();
    const grupos = await respuestaAgrupaciones.json();

    const retrato = retratos.find(
      r => r.id.toLowerCase() === ficha.toLowerCase()
    );

    if (!retrato) {
      contenedor.textContent = "Retrato no encontrado en el índice.";
      return;
    }

    const codigos = new Set(retrato.agrupaciones || []);

    if (codigos.size === 0) {
      contenedor.textContent = "No constan agrupaciones.";
      return;
    }

    const contenido = document.createElement("div");
    contenido.className = "agrupaciones-retrato";

    const titulo = document.createElement("h3");
    titulo.textContent = "Agrupaciones";
    contenido.appendChild(titulo);

    const encontrados = new Set();

    for (const grupo of grupos) {
      const coincidencias = grupo.codigos.filter(
        c => codigos.has(c.codigo)
      );

      if (coincidencias.length === 0) continue;

      const bloque = document.createElement("div");
      bloque.className = "grupo-agrupaciones";

      const encabezado = document.createElement("h4");
      encabezado.textContent = grupo.nombre;
      bloque.appendChild(encabezado);

      for (const elemento of coincidencias) {
        const linea = document.createElement("div");
        linea.className = "codigo-agrupacion";

        const codigo = document.createElement("strong");
        codigo.textContent = elemento.codigo;

        linea.appendChild(codigo);
        linea.appendChild(
          document.createTextNode(" — " + elemento.descripcion)
        );

        bloque.appendChild(linea);
        encontrados.add(elemento.codigo);
      }

      contenido.appendChild(bloque);
    }

    const desconocidos = [...codigos].filter(
      codigo => !encontrados.has(codigo)
    );

    if (desconocidos.length > 0) {
      const aviso = document.createElement("p");
      aviso.textContent =
        "Códigos sin descripción en el catálogo: " +
        desconocidos.join(", ");

      contenido.appendChild(aviso);
    }

    contenedor.replaceChildren(contenido);
  }

  let solicitudActual = 0;

  async function mostrarEstudio(boton) {
    const contenedor = document.getElementById("estudio-retrato");
    if (!contenedor) return;

    const apartado = boton.dataset.estudio;
    const ficha = document.body.dataset.slug?.split("/").pop();
    if (!ficha || !apartado) return;

    const solicitud = ++solicitudActual;
    const temporal = document.createElement("div");

    contenedor.textContent = "Cargando estudio...";

    try {
      if (apartado === "agrupaciones") {
        await mostrarAgrupaciones(ficha, temporal);
      } else {
        const base = document.body.dataset.basepath || "";
        const url = `${base}/seccion-retratos/${ficha}-${apartado}`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          throw new Error("No se encontró el estudio");
        }

        const documento = new DOMParser().parseFromString(
          await respuesta.text(),
          "text/html"
        );

        const articulo = documento.querySelector("article");

        if (!articulo) {
          throw new Error("No se encontró el contenido");
        }

        const contenido = articulo.cloneNode(true);
        contenido.querySelectorAll("script").forEach(s => s.remove());

        temporal.appendChild(contenido);
      }

      if (
        solicitud !== solicitudActual ||
        !contenedor.isConnected ||
        !boton.isConnected
      ) return;

      contenedor.replaceChildren(...temporal.childNodes);

      document.querySelectorAll(".ficha-apartados button").forEach(b => {
        b.classList.toggle("estudio-activo", b === boton);
      });

    } catch (error) {
      if (solicitud !== solicitudActual || !contenedor.isConnected) return;

      contenedor.textContent = "No se ha podido cargar el estudio.";
      console.error(error);
    }
  }

  document.addEventListener("click", (evento) => {
    const boton = evento.target.closest(
      ".ficha-apartados button[data-estudio]"
    );

    if (boton) mostrarEstudio(boton);
  });
})();