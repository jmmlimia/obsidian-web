
(() => {
  async function mostrarEstudio(boton) {
    const contenedor = document.getElementById("estudio-retrato");
    if (!contenedor) return;

    const apartado = boton.dataset.estudio;
    const ficha = document.body.dataset.slug?.split("/").pop();
    if (!ficha || !apartado) return;

    const base = document.body.dataset.basepath || "";
    const url = `${base}/seccion-retratos/${ficha}-${apartado}`;

    contenedor.textContent = "Cargando estudio...";

    try {
      const respuesta = await fetch(url);
      if (!respuesta.ok) throw new Error("No se encontró el estudio");

      const documento = new DOMParser().parseFromString(
        await respuesta.text(),
        "text/html"
      );

      const articulo = documento.querySelector("article");
      if (!articulo) throw new Error("No se encontró el contenido");

      const contenido = articulo.cloneNode(true);
      contenido.querySelectorAll("script").forEach(s => s.remove());

      contenedor.replaceChildren(contenido);

      document.querySelectorAll(".ficha-apartados button").forEach(b => {
        b.classList.toggle("estudio-activo", b === boton);
      });
    } catch (error) {
      contenedor.textContent = "No se ha podido cargar el estudio.";
      console.error(error);
    }
  }

  document.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".ficha-apartados button[data-estudio]");
    if (boton) mostrarEstudio(boton);
  });
})();
