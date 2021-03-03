let btnOpen = document.getElementById("btn-open");
let selections = document.getElementById("selections");
let main = document.getElementById("main");
let paragraph1 = document.getElementById("paragraph1");
let paragraph2 = document.getElementById("paragraph2");
let padre = document.getElementById("padre");
let pantallaDetalle = document.getElementById("pantalla-detalle");
let listadoStorage = [];

// Cerrar Modal luego de agregar producto//
let accionModal = () => {
  paragraph1.classList.add("none");
  paragraph2.classList.add("none");
  padre.classList.add("active-list");
};

//Toda la funcion del boton agregar. Genera un LI con los datos del formulario, y llama a accion modal para el manejo de pantallas//
let btnSubmit = document
  .getElementById("submit")
  .addEventListener("click", () => {
    let producto = document.getElementById("name").value;
    let selector = document.getElementById("selector").value;
    let descripcion = document.getElementById("descripcion").value;
    document.getElementById("name").value = "";
    document.getElementById("selector").value = "";
    document.getElementById("descripcion").value = "";
    let modelo = `<li class="list-group-item" data-producto="${producto}" data-icono="${selector}" data-info="${descripcion}"><img src="${selector}" alt="${producto}" class="icono-producto">${producto}</li>`;
    padre.innerHTML += modelo;
    listadoStorage.push(modelo);
    localStorage.setItem("Listado de compras", listadoStorage);

    accionModal();
  });

//Activar pantalla de detalle cuando se toca el producto//
let padreClick = document
  .getElementById("padre")
  .addEventListener("click", (e) => {
    document.getElementById(
      "pantalla-detalle__producto"
    ).innerHTML = e.target.getAttribute("data-producto");
    document.getElementById(
      "pantalla-detalle__icono"
    ).src = e.target.getAttribute("data-icono");
    document.getElementById(
      "pantalla-detalle__info"
    ).innerHTML = e.target.getAttribute("data-info");
    pantallaDetalle.classList.replace("none", "active");
  });

//Cerrar pantalla con los datos del producto seleccionado//
let btnDetalle = document
  .getElementById("btnDetalle")
  .addEventListener("click", () => {
    pantallaDetalle.classList.replace("active", "none");
  });

//Función del boton "+" para abrir y cerrar el modal//
btnOpen.addEventListener("click", () => {
  main.classList.toggle("none");
  selections.classList.toggle("active");
  if (btnOpen.classList.contains("texto1")) {
    btnOpen.innerText = "-";
    btnOpen.classList.replace("texto1", "texto2");
  } else {
    btnOpen.innerText = "+";
    btnOpen.classList.replace("texto2", "texto1");
  }
});

let storage = localStorage.getItem("Listado de compras");

if (storage) {
  accionModal();
  padre.innerHTML += storage.join("");
}
