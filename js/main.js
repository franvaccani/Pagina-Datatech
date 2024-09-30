function carritoDeCompras() {
    let costoTotal = 0;
    let continuar = true;

    // Definir productos como objetos dentro de un array
    const productosDisponibles = [
        { nombre: "mate_madera", precio: 500 },
        { nombre: "mate_calabaza", precio: 800 },
        { nombre: "bombilla_acero", precio: 300 },
        { nombre: "kit_limpieza", precio: 200 }
    ];

    // Array para almacenar los productos agregados al carrito
    const carrito = [];

    while (continuar) {
        // Pedir al usuario el nombre del producto y la cantidad
        let productoNombre = prompt("Ingrese el producto (mate_madera, mate_calabaza, bombilla_acero, kit_limpieza):");
        let cantidad = parseInt(prompt("Ingrese la cantidad:"));

        // Buscar el producto en el array de productos disponibles
        const productoEncontrado = productosDisponibles.find(producto => producto.nombre === productoNombre);

        if (productoEncontrado) {
            // Calcular el costo y agregar el producto al carrito
            const subtotal = productoEncontrado.precio * cantidad;
            costoTotal += subtotal;
            
            carrito.push({ producto: productoEncontrado.nombre, cantidad: cantidad, subtotal: subtotal });

            console.log(`Agregaste ${cantidad} ${productoEncontrado.nombre.replace('_', ' ')}(s) al carrito. Subtotal: $${subtotal}`);
        } else {
            console.log("Producto no válido, intente nuevamente.");
        }

        let respuesta = prompt("¿Desea agregar otro producto? (si/no):");
        if (respuesta.toLowerCase() !== "si") {
            continuar = false;
        }
    }

    // Aplicar descuento si el costo total es mayor a $1500
    if (costoTotal > 1500) {
        costoTotal *= 0.9;
        console.log("Se aplicó un 10% de descuento por superar los $1500.");
    }

    // Mostrar el resumen del carrito
    console.log("Resumen del carrito:");
    carrito.forEach(item => {
        console.log(`${item.cantidad} x ${item.producto.replace('_', ' ')} - Subtotal: $${item.subtotal}`);
    });

    console.log("El costo total es: $" + costoTotal);
}

carritoDeCompras();