document.addEventListener("DOMContentLoaded", function () {
  const carrito = document.getElementById("carritoFlotante");
  const contenido = document.getElementById("contenidoCarrito");
  const gif = document.getElementById("gifVacio");
  const botonComprar = document.getElementById("comprarCarrito");
  const botonVaciar = document.getElementById("vaciarCarrito");
  const alerta = document.getElementById("mensajeAlerta");

  // mostrar ono el carrito
  document.getElementById("botonCarrito").addEventListener("click", function (e) {
    e.preventDefault();
    carrito.style.display = carrito.style.display === "block" ? "none" : "block";
    actualizarCarritoVisual();
  });

  // boton d compra quete lleva al html
  botonComprar.addEventListener("click", function () {
    window.location.href = "compra.html";
  });

  // vaciar carrito
  botonVaciar.addEventListener("click", function () {
    localStorage.removeItem("carrito"); // Borrar datos del almacenamiento
    contenido.innerHTML = ""; // Borrar lo visible
    gif.style.display = "block";
    botonComprar.style.display = "none";
    mostrarAlerta("por que....vaciaste tu carrito :(((((");
  });

  //  alerta !!!!!!!!
  function mostrarAlerta(texto) {
    alerta.textContent = texto;
    alerta.style.display = "block";
    setTimeout(() => {
      alerta.style.display = "none";
    }, 2000);
  }

  // agregar producto
  function agregarAlCarrito(nombre, precio) {
    const nuevo = { nombre, precio };
    let carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoGuardado.push(nuevo);
    localStorage.setItem("carrito", JSON.stringify(carritoGuardado));
    actualizarCarritoVisual();
    mostrarAlerta(`Agregaste "${nombre}" al carrito`);
  }

  // mostrar productos desde localStorage
  function actualizarCarritoVisual() {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    contenido.innerHTML = ""; // limpiar lo anterior

    if (carritoGuardado.length === 0) {
      gif.style.display = "block";
      botonComprar.style.display = "none";
    } else {
      gif.style.display = "none";
      botonComprar.style.display = "inline-block";

      carritoGuardado.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `${item.nombre}    $${item.precio}`;
        contenido.appendChild(div);
      });
    }
  }

  // evento a cada botón
  const botones = document.querySelectorAll(".carritoprevio");
  botones.forEach(boton => {
    boton.addEventListener("click", function () {
      const nombre = this.parentElement.querySelectorAll("p")[0].innerText;
      const precioTexto = this.parentElement.querySelectorAll("p")[1].innerText;
      const precio = precioTexto.replace(/[^\d]/g, ""); // quitar caracteres no numéricos
      agregarAlCarrito(nombre, precio);
    });
  });

  // mostrar sololo que haya en localStorage
  actualizarCarritoVisual();
});
