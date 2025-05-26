function regis_btn() {
    // Toma todos los valores ingresados directamente del DOM
    const nombreProducto = document.getElementById("nom_produc").value.toUpperCase().trim();
    const categoria = document.getElementById("cat_produc").value;
    const imagen = document.getElementById("archivo").value;
    const codigo = document.getElementById("cod_produc").value;
    const precio = document.getElementById("pre_produc").value;
    const metodoPago = document.getElementById("met_produc").value;
    const stockProducto = document.getElementById("stock_produc").value;

    // Chequeo de tipo de animal
    let tipoAnimalSeleccionado = false;
    if (document.getElementById("tipo_p_produc").checked ||
        document.getElementById("tipo_g_produc").checked ||
        document.getElementById("tipo_o_produc").checked) {
        tipoAnimalSeleccionado = true;
    }

    // Llama a la funcion de validacion
    if (!validacion(nombreProducto, categoria, imagen, codigo, precio, metodoPago, stockProducto, tipoAnimalSeleccionado)) {
        return; // Detiene la funcion si la validacion falla
    }

    // Determinar el valor final de tipoAnimal para el objeto producto
    let tipoAnimal = "";
    if (document.getElementById("tipo_p_produc").checked) tipoAnimal = "PERRO";
    else if (document.getElementById("tipo_g_produc").checked) tipoAnimal = "GATO";
    else if (document.getElementById("tipo_o_produc").checked) tipoAnimal = "OTRO";


    // Crear objeto con todos los datos
    const producto = {
        nombreProducto,
        categoria: categoria.toUpperCase(), // Convertir a mayusculas al guardar
        imagen,
        codigo, // El codigo se guarda tal cual se ingreso, despues de pasar la validacion
        precio: parseFloat(precio), // Convertir a numero para guardar
        tipoAnimal,
        metodoPago: metodoPago.toUpperCase(), // Convertir a mayusculas al guardar
        stockProducto: parseInt(stockProducto) // Convertir a numero para guardar
    };

    // Obtener datos existentes o inicializar
    let productosGuardados = JSON.parse(localStorage.getItem("producto")) || [];

    // Agregar nuevo producto
    productosGuardados.push(producto);

    // Guardar de nuevo en localStorage
    localStorage.setItem("producto", JSON.stringify(productosGuardados));

    alert("Guardado correctamente 😃👍🏼");

    // Limpieza de formulario al registrar
    limpiar();

    window.location.href = 'indicaciones.html' ;
}

// Validar todos los campos del formulario
function validacion(nombreProducto, categoria, imagen, codigo, precio, metodoPago, stockProducto, tipoAnimalSeleccionado) {
    // Las variables ya se reciben como parametros, no es necesario volver a obtenerlas del DOM

    // Validar nombre (maximo 20 caracteres y no vacio)
    if (nombreProducto.length === 0 || nombreProducto.length > 20) {
        alert('El nombre del producto debe tener entre 1 y 20 caracteres.');
        return false;
    }

    // Validar categoria seleccionada
    if (!categoria) {
        alert('Debe seleccionar una categoria.');
        return false;
    }

    // Validar imagen seleccionada (el input type="file" tiene un valor cuando se selecciona un archivo)
    if (!imagen) {
        alert('Debe seleccionar una imagen.');
        return false;
    }

    // Validar codigo (minimo 8 caracteres, incluir mayuscula, minuscula y 2 numeros)
    if (codigo.length < 7) {
        alert('El codigo debe tener al menos 8 caracteres.');
        return false;
    }

    const tieneMayuscula = /[A-Z]/.test(codigo);
    const tieneMinuscula = /[a-z]/.test(codigo);
    const cantidadNumeros = (codigo.match(/\d/g) || []).length;

    if (!tieneMayuscula || !tieneMinuscula || cantidadNumeros < 2) {
        alert('El codigo debe incluir al menos una mayuscula, una minuscula y dos numeros.');
        return false;
    }

    // Validar precio
    const numPrecio = parseFloat(precio);
    if (isNaN(numPrecio) || numPrecio <= 0) {
        alert('El precio debe ser un numero positivo.');
        return false;
    }

    // Validar tipo de animal seleccionado
    if (!tipoAnimalSeleccionado) {
        alert('Debe seleccionar un tipo de animal (Perro, Gato u Otro).');
        return false;
    }

    if (!metodoPago) {
        alert('Debe seleccionar un metodo de pago.');
        return false;
    }

    // Validar stock
    const numStock = parseInt(stockProducto);
    if (isNaN(numStock) || numStock < 0) {
        alert('El stock debe ser un numero positivo.');
        return false;
    }
    // Si todas las validaciones pasan
    return true;
}

function limpiar(){
    document.getElementById("nom_produc").value="";
    document.getElementById("archivo").value="";
    document.getElementById("cod_produc").value="";
    document.getElementById("cat_produc").value="";
    document.getElementById("pre_produc").value="";
    document.getElementById("tipo_p_produc").checked=false;
    document.getElementById("tipo_g_produc").checked=false;
    document.getElementById("tipo_o_produc").checked=false;
    document.getElementById("met_produc").value="";
    document.getElementById("stock_produc").value="";
}