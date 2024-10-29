let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let productosDisponibles = [];

// Elementos del DOM
const productoSelect = document.getElementById("producto");
const cantidadInput = document.getElementById("cantidad");
const carritoDiv = document.getElementById("carritoDiv");
const totalCostoDiv = document.getElementById("totalCosto");
const agregarProductoBtn = document.getElementById("agregarProducto");
const eliminarProductoBtn = document.getElementById("eliminarProducto");
const eliminarTodoBtn = document.getElementById("eliminarTodo");

// Función para cargar productos de un archivo JSON
async function cargarProductos() {
    try {
        const response = await fetch('productos.json');
        if (!response.ok) throw new Error("Error al cargar los productos.");

        productosDisponibles = await response.json();
        cargarOpcionesProductos();
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al cargar los productos.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }
}

// Función para cargar opciones de productos en el select
function cargarOpcionesProductos() {
    productosDisponibles.forEach(producto => {
        const option = document.createElement("option");
        option.value = producto.nombre;
        option.textContent = producto.nombre.replace('_', ' ');
        productoSelect.appendChild(option);
    });
}

// Función para actualizar el carrito en el DOM y en localStorage
function actualizarCarrito() {
    carritoDiv.innerHTML = ""; // Limpiar contenido anterior

    let costoTotal = 0;

    // Mostrar productos en el carrito
    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        costoTotal += subtotal;

        const productoDiv = document.createElement("div");
        productoDiv.textContent = `${item.cantidad} x ${item.nombre.replace('_', ' ')} - Subtotal: $${subtotal}`;
        productoDiv.setAttribute("data-index", index);
        carritoDiv.appendChild(productoDiv);
    });

    // Aplicar descuento si el costo total supera los $1500
    if (costoTotal > 1500) {
        costoTotal *= 0.9;
        Swal.fire({
            title: "¡Descuento aplicado!",
            text: "Se ha aplicado un 10% de descuento por superar los $1500.",
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    }

    totalCostoDiv.textContent = `Total: $${costoTotal.toFixed(2)}`;
    
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Evento para agregar productos al carrito
agregarProductoBtn.addEventListener("click", () => {
    const productoNombre = productoSelect.value;
    const cantidad = parseInt(cantidadInput.value);

    const productoEncontrado = productosDisponibles.find(producto => producto.nombre === productoNombre);

    if (productoEncontrado) {
        // Agregar el producto al carrito
        carrito.push({
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            cantidad: cantidad
        });
        Swal.fire({
            title: "Producto agregado",
            text: `${productoEncontrado.nombre.replace('_', ' ')} ha sido agregado al carrito.`,
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    }

    // Actualizar el carrito en el DOM
    actualizarCarrito();
});

// Evento para eliminar el producto seleccionado
eliminarProductoBtn.addEventListener("click", () => {
    const productoNombre = productoSelect.value;

    // Buscar el índice del producto en el carrito
    const index = carrito.findIndex(item => item.nombre === productoNombre);
    
    if (index !== -1) {
        carrito.splice(index, 1);  // Eliminar el producto del carrito
        actualizarCarrito();       // Actualizar el carrito en el DOM
        Swal.fire({
            title: "Producto eliminado",
            text: `${productoNombre.replace('_', ' ')} ha sido eliminado del carrito.`,
            icon: "info",
            confirmButtonText: "Aceptar"
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "El producto no se encuentra en el carrito.",
            icon: "error",
            confirmButtonText: "Aceptar"
        });
    }
});

// Evento para vaciar todo el carrito
eliminarTodoBtn.addEventListener("click", () => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción vaciará todo el carrito.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];  // Vaciar el carrito
            actualizarCarrito();  // Actualizar el carrito en el DOM
            Swal.fire("Carrito vacío", "El carrito ha sido vaciado.", "success");
        }
    });
});

// Cargar el carrito desde localStorage y los productos desde el archivo JSON al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
    await cargarProductos();
    actualizarCarrito();
});