// Variables globales
let ordenes = [];

// Obtener el contenedor de la tabla de historial
const tablaHistorial = document.getElementById('tabla-historial');
const formCrearOrden = document.getElementById('form-crear-orden');

// Función para cargar el historial de órdenes desde localStorage
function cargarHistorial() {
    const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes')) || [];
    console.log(ordenesGuardadas); // Verifica el contenido
    tablaHistorial.innerHTML = ''; // Limpiar la tabla

    ordenesGuardadas.forEach((orden) => {
        if (orden.productos && orden.productos.length > 0) { // Solo mostrar órdenes con productos
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${orden.cliente}</td>
                <td>${orden.productos.map((p) => `${p.nombre} (x${p.cantidad})`).join(', ')}</td>
                <td>${orden.metodoPago}</td>
                <td>${orden.total.toFixed(2)}</td>
                <td><button onclick="eliminarOrden(${orden.id})">Eliminar</button></td>
            `;
            tablaHistorial.appendChild(fila);
        }
    });
}


// Función para eliminar una orden
function eliminarOrden(id) {
    const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes')) || [];
    const ordenesActualizadas = ordenesGuardadas.filter(orden => orden.id !== id);
    localStorage.setItem('ordenes', JSON.stringify(ordenesActualizadas));
    cargarHistorial(); // Actualizar la tabla
}

// Función para crear una nueva orden
formCrearOrden.addEventListener('submit', (e) => {
    e.preventDefault();

    const cliente = document.getElementById('cliente').value.trim();
    const metodoPago = document.getElementById('metodo-pago').value;

    if (ordenes.length === 0) {
        alert('Por favor, añade productos a la orden antes de crearla.');
        return;
    }

    const total = ordenes.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);

    const nuevaOrden = {
        id: Date.now(),
        cliente,
        metodoPago,
        productos: ordenes,
        total,
    };

    const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes')) || [];
    ordenesGuardadas.push(nuevaOrden);
    localStorage.setItem('ordenes', JSON.stringify(ordenesGuardadas));


    alert('Orden creada exitosamente.');
    ordenes = []; // Limpiar la lista de productos de la orden
    formCrearOrden.reset(); // Limpiar el formulario
    cargarProductosEnOrden(); // Limpiar los productos mostrados
});

// Función para cargar los productos en la orden
function cargarProductosEnOrden() {
    const listaProductosOrden = document.getElementById('lista-productos-orden');
    listaProductosOrden.innerHTML = ''; // Limpiar lista de productos

    ordenes.forEach(producto => {
        const productoHTML = document.createElement('li');
        productoHTML.textContent = `${producto.nombre} (x${producto.cantidad}) - $${producto.precio}`;
        listaProductosOrden.appendChild(productoHTML);
    });
}

// Agregar productos al carrito (esto debe ser gestionado en otra parte de tu código)
function agregarProductoAlCarrito(id, nombre, precio, stock) {
    const productoExistente = ordenes.find(producto => producto.id === id);
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        ordenes.push({ id, nombre, precio, stock, cantidad: 1 });
    }

    cargarProductosEnOrden();
}

// Inicializar el historial de órdenes cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    cargarHistorial();
});
