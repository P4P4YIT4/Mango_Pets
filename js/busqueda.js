// Numero de productos por pagina
const productosPorPagina = 5;

// Obtener los productos guardados en localStorage
let productosGuardados = JSON.parse(localStorage.getItem("producto")) || [];

// Variables de paginacion
let paginaActual = 1;
let totalPaginas = Math.ceil(productosGuardados.length / productosPorPagina);

// Función para mostrar los productos en la tabla
function mostrarProductos() {
    // Obtener el contenedor de la tabla
    const listaProductosDiv = document.getElementById("listaProductos");

    // Limpiar la tabla antes de agregar nuevos productos
    listaProductosDiv.innerHTML = "";

    // Calcular el índice de inicio y fin para los productos de la pagina actual
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
            <td>${producto.stockProducto}</td>
            <td><img src="../img/productos/${producto.imagen}" alt="${producto.nombreProducto}"width="100"></td>
            
        `;

        listaProductosDiv.appendChild(row);
    });

    // Actualizar la paginacion
    actualizarPaginacion();
}

// Funcion para actualizar los botones de paginacion
function actualizarPaginacion() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    // Habilitar/deshabilitar los botones segun la pagina actual
    prevBtn.disabled = paginaActual === 1;
    nextBtn.disabled = paginaActual === totalPaginas;
}

// Manejar el clic en el boton "Anterior"
document.getElementById("prevBtn").addEventListener("click", function() {
    if (paginaActual > 1) {
        paginaActual--;
        mostrarProductos();
    }
});

// Manejar el clic en el boton "Siguiente"
document.getElementById("nextBtn").addEventListener("click", function() {
    if (paginaActual < totalPaginas) {
        paginaActual++;
        mostrarProductos();
    }
});

// Mostrar los productos al cargar la pagina
mostrarProductos();

// ######################## Funcion de busqueda ###################################

// Funcion para buscar productos por nombre
document.getElementById("busqueda").addEventListener("input", function () {
    const filtro = this.value.toUpperCase();
    
    const productosFiltrados = productosGuardados.filter(producto =>
        producto.nombreProducto.toUpperCase().includes(filtro)
    );

    // Reiniciar paginacion con los productos filtrados
    paginaActual = 1;
    totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    // Mostrar los productos filtrados
    mostrarProductosFiltrados(productosFiltrados);
});

// Funcion para buscar productos por catgoria
document.getElementById("filtro_cat").addEventListener("change", function () {
    const filtro = this.value.toUpperCase();
    
    const productosFiltrados = productosGuardados.filter(producto =>
        producto.categoria.toUpperCase().includes(filtro)
    );

    // Reiniciar paginacion con los productos filtrados
    paginaActual = 1;
    totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    // Mostrar los productos filtrados
    mostrarProductosFiltrados(productosFiltrados);
});

// Funcion para buscar productos por catgoria
document.getElementById("filtro_tipo").addEventListener("change", function () {
    const filtro = this.value.toUpperCase();
    
    const productosFiltrados = productosGuardados.filter(producto =>
        producto.tipoAnimal.toUpperCase().includes(filtro)
    );

    // Reiniciar paginacion con los productos filtrados
    paginaActual = 1;
    totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    // Mostrar los productos filtrados
    mostrarProductosFiltrados(productosFiltrados);
});

// Funcion para mostrar productos filtrados
function mostrarProductosFiltrados(productos) {
    const listaProductosDiv = document.getElementById("listaProductos");
    listaProductosDiv.innerHTML = "";

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productos.slice(inicio, fin);

    productosPagina.forEach(producto => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${producto.nombreProducto}</td>
            <td>${producto.categoria}</td>
            <td>${producto.codigo}</td>
            <td>$${producto.precio}</td>
            <td>${producto.tipoAnimal}</td>
            <td>${producto.metodoPago}</td>
            <td>${producto.stockProducto}</td>
            <td><img src="../img/productos/${producto.imagen}" alt="${producto.nombreProducto}"width="100"></td>
        `;

        listaProductosDiv.appendChild(row);
    });

    actualizarPaginacion();
}

// Funcion para limpiar filtros
function limpiar(){
    document.getElementById("busqueda").value="";
    document.getElementById("filtro_cat").value="";
    document.getElementById("filtro_tipo").value="";
}