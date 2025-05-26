// Seleccionar el botón y el modal
const cerrarBtn = document.getElementById('cerrarModal');
const modal = document.querySelector('.modal');

// Al hacer clic en el botón, quitar la clase para ocultar el modal
cerrarBtn.addEventListener('click', function (e) {
  e.preventDefault(); // Evita que se recargue la página si es un <a>
  modal.classList.remove('modal--show');
});