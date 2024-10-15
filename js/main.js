// Array de productos disponibles
const productosDisponibles = [
    { nombre: "mate_madera", precio: 500 },
    { nombre: "mate_calabaza", precio: 800 },
    { nombre: "bombilla_acero", precio: 300 },
    { nombre: "kit_limpieza", precio: 200 }
];

// Cargar el carrito desde localStorage o inicializar uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos del DOM
const productoSelect = document.getElementById("producto");
const cantidadInput = document.getElementById("cantidad");
const carritoDiv = document.getElementById("carrito");
const totalCostoDiv = document.getElementById("totalCosto");
const agregarProductoBtn = document.getElementById("agregarProducto");
const eliminarProductoBtn = document.getElementById("eliminarProducto");
const eliminarTodoBtn = document.getElementById("eliminarTodo");

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
    } else {
        alert("El producto no se encuentra en el carrito.");
    }
});

// Evento para vaciar todo el carrito
eliminarTodoBtn.addEventListener("click", () => {
    const confirmacion = confirm("¿Estás seguro de que deseas vaciar el carrito?");
    if (confirmacion) {
        carrito = [];  // Vaciar el carrito
        actualizarCarrito();  // Actualizar el carrito en el DOM
    }
});

// Cargar el carrito desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
});