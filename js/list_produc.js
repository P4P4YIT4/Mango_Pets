// Número de productos por página
const productosPorPagina = 5;

// Obtener los productos guardados en localStorage
let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

// Variables de paginación
let paginaActual = 1;
let totalPaginas = Math.ceil(productosGuardados.length / productosPorPagina);

// Función para mostrar los productos en la tabla
function mostrarProductos() {
    // Obtener el contenedor de la tabla
    const listaProductosDiv = document.getElementById("listaProductos");

    // Limpiar la tabla antes de agregar nuevos productos
    listaProductosDiv.innerHTML = "";

    // Calcular el índice de inicio y fin para los productos de la página actual
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    // Obtener los productos a mostrar
    const productosPagina = productosGuardados.slice(inicio, fin);

    // Mostrar los productos en la tabla
    productosPagina.forEach(producto => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${producto.nombreProducto}</td>
            <td>${producto.categoria}</td>
            <td>${producto.codigo}</td>
            <td>$${producto.precio}</td>
            <td>${producto.tipoAnimal}</td>
            <td>${producto.metodoPago}</td>
            <td>${producto.nombreColaborador}</td>
        `;

        listaProductosDiv.appendChild(row);
    });

    // Actualizar la paginación
    actualizarPaginacion();
}

// Función para actualizar los botones de paginación
function actualizarPaginacion() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Habilitar/deshabilitar los botones según la página actual
    prevBtn.disabled = paginaActual === 1;
    nextBtn.disabled = paginaActual === totalPaginas;
}

// Manejar el clic en el botón "Anterior"
document.getElementById("prevBtn").addEventListener("click", function() {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarProductos();
    }
});

// Manejar el clic en el botón "Siguiente"
document.getElementById("nextBtn").addEventListener("click", function() {
    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarProductos();
    }
});

// Mostrar los productos al cargar la página
mostrarProductos();
