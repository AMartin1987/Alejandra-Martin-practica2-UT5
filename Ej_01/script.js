function loadLDocA(fichero) {
  let http = new XMLHttpRequest(); 
  http.open("GET", fichero, true); 
  http.send();

  http.addEventListener('load', (event) => {
      if (http.status === 200 && fichero.endsWith(".xml")) {    
        gestionarFicheroXML(http.responseXML);
      }
  });
}

function gestionarFicheroXML(xml) {
  let contenedor = document.getElementById("contenedor");

  let librerias = xml.getElementsByTagName("libreria"); // Obtiene todas las librerías

  for (let i = 0; i < librerias.length; i++) {
      let libreria = librerias[i];
      let nombreLibreria = libreria.getElementsByTagName("nombre")[0].textContent;
      let libros = libreria.getElementsByTagName("libro");

      // Crea una tabla para cada librería
      let tabla = document.createElement("table");
      let encabezado = document.createElement("thead");
      let filaEncabezado = document.createElement("tr");

      // Crea celdas de encabezado
      let encabezadoTitulo = document.createElement("th");
      encabezadoTitulo.textContent = "Título";
      filaEncabezado.appendChild(encabezadoTitulo);

      let encabezadoAutor = document.createElement("th");
      encabezadoAutor.textContent = "Autor";
      filaEncabezado.appendChild(encabezadoAutor);

      let encabezadoEditorial = document.createElement("th");
      encabezadoEditorial.textContent = "Editorial";
      filaEncabezado.appendChild(encabezadoEditorial);

      let encabezadoPrecio = document.createElement("th");
      encabezadoPrecio.textContent = "Precio";
      filaEncabezado.appendChild(encabezadoPrecio);

      encabezado.appendChild(filaEncabezado);
      tabla.appendChild(encabezado);

      // Calcula cuál es el precio más barato
      let min = parseFloat(libros[0].getElementsByTagName("precio")[0].textContent); // Precio inicial

      // Recorre todos los libros y encuentra el precio más bajo
      for (let j = 1; j < libros.length; j++) {
          let p = parseFloat(libros[j].getElementsByTagName("precio")[0].textContent);
          if (p < min) {
              min = p;
          }
      }

      // Agregar los libros a la tabla
      let cuerpo = document.createElement("tbody");

      for (let j = 0; j < libros.length; j++) {
          let libro = libros[j];
          let titulo = libro.getElementsByTagName("titulo")[0].textContent;
          let autor = libro.getElementsByTagName("autor")[0].textContent;
          let editorial = libro.getElementsByTagName("editorial")[0].textContent;
          let precio = parseFloat(libro.getElementsByTagName("precio")[0].textContent.replace(" €", ""));

          // Crea una nueva fila
          let tr = document.createElement("tr");

          // Celdas para título, autor y editorial
          let tdTitulo = document.createElement("td");
          tdTitulo.textContent = titulo;
          tr.appendChild(tdTitulo);

          let tdAutor = document.createElement("td");
          tdAutor.textContent = autor;
          tr.appendChild(tdAutor);

          let tdEditorial = document.createElement("td");
          tdEditorial.textContent = editorial;
          tr.appendChild(tdEditorial);

          // Celda para precio, con clase si es el más barato
          let tdPrecio = document.createElement("td");
          tdPrecio.textContent = `${precio} €`;

          // Aplica la clase "destacado" si el precio es el más bajo
          if (precio === min) {
              tdPrecio.classList.add("destacado");
          }

          tr.appendChild(tdPrecio);

          // Agrega la fila a la tabla
          cuerpo.appendChild(tr);
      }

      tabla.appendChild(cuerpo);

      // Agregar el nombre de la librería como título de la tabla
      let tituloLibreria = document.createElement("h3");
      tituloLibreria.textContent = nombreLibreria;

      // Agregar la tabla y el título al contenedor
      contenedor.appendChild(tituloLibreria);
      contenedor.appendChild(tabla);
  }
}
