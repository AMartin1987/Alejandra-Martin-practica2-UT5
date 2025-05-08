function cargarMensajes() {
  let http = new XMLHttpRequest();
  http.open("GET", "mensajes.txt", true);
  http.send();

  http.onload = function () {
    if (http.status === 200) {
      let mensajes = http.responseText.trim().split('\n'); // separa cada linea en un mensaje

      let contenedorMensajes = document.getElementById("mensajes");
      contenedorMensajes.innerHTML = ''; // limpia todo lo que había antes para evitar repetir mensajes

      // crea cada mensaje en un elemento div
      mensajes.forEach(function (mensaje, i) {
        let div = document.createElement("div");
        div.classList.add("mensaje");

        // Si es par es emisor, si no es receptor
        if (i % 2 === 0) {
          div.classList.add("emisor");
        } else {
          div.classList.add("receptor");
        }

        div.textContent = mensaje;
        contenedorMensajes.appendChild(div); // agrega los mensajes al DOM
      });

      contenedorMensajes.scrollTop = contenedorMensajes.scrollHeight; // baja el scroll automáticamente
    }
  };
}

setInterval(cargarMensajes, 10000); // se vuelve a ejecutar cada 10 segundos
cargarMensajes(); // ejecuta cuando carga la página
