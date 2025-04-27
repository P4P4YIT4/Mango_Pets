function regis_btn() {
    // Toma todos los valores ingresados
    const nombreProducto = document.getElementById("nom_produc").value;
    const categoria = document.getElementById("cat_produc").value;
    const codigo = document.getElementById("cod_produc").value;
    const precio = document.getElementById("pre_produc").value;
    const metodoPago = document.getElementById("met_produc").value;
    const nombreColaborador = document.getElementById("nom_c_produc").value;
  
    // Chequeo de tipo de animal
    let tipoAnimal = "";
    if (document.getElementById("tipo_p_produc").checked) tipoAnimal = "Perro";
    else if (document.getElementById("tipo_g_produc").checked) tipoAnimal = "Gato";
    else if (document.getElementById("tipo_o_produc").checked) tipoAnimal = "Otro";
  
    // Crear objeto con todos los datos
    const producto = {
      nombreProducto,
      categoria,
      codigo,
      precio,
      tipoAnimal,
      metodoPago,
      nombreColaborador
    };
  
    // Obtener datos existentes o inicializar
    let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
  
    // Agregar nuevo producto
    productosGuardados.push(producto);
  
    // Guardar de nuevo en localStorage
    localStorage.setItem("productos", JSON.stringify(productosGuardados));
  
    alert("Guardado correctamente 😃👍🏼");
  
    // Limpieza de formulario al registrar
    limpiar();
  }

function limpiar(){
    document.getElementById("nom_produc").value="";
    document.getElementById("cod_produc").value="";
    document.getElementById("cat_produc").value="";
    document.getElementById("pre_produc").value="";
    document.getElementById("tipo_p_produc").checked=false;
    document.getElementById("tipo_g_produc").checked=false;
    document.getElementById("tipo_o_produc").checked=false;
    document.getElementById("met_produc").value="";
    document.getElementById("nom_c_produc").value="";
}