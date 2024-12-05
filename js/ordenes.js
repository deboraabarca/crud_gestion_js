// Variables globales
let ordenes = [];
let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

// Elementos del DOM
const formCrearOrden = document.getElementById('form-crear-orden');
const tablaProductosOrden = document.getElementById('tabla-productos-orden').querySelector('tbody');

// Cargar productos en la vista de órdenes
function cargarProductosEnOrden() {
    tablaProductosOrden.innerHTML = '';
    inventario.forEach((producto) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio.toFixed(2)}</td>
            <td>${producto.stock}</td>
            <td><input type="number" min="1" max="${producto.stock}" placeholder="Cantidad" id="cantidad-${producto.id}"></td>
            <td><button type="button" onclick="agregarProductoAOrden(${producto.id})">Añadir</button></td>
        `;
        tablaProductosOrden.appendChild(fila);
    });
}

// Agregar producto a la orden
function agregarProductoAOrden(id) {
    const cantidadInput = document.getElementById(`cantidad-${id}`);
    const cantidad = parseInt(cantidadInput.value);

    if (cantidad > 0) {
        const producto = inventario.find((p) => p.id === id);
        if (producto && cantidad <= producto.stock) {
            const productoEnOrden = ordenes.find((p) => p.id === producto.id);
            if (productoEnOrden) {
                alert('Este producto ya está en la orden. Actualiza la cantidad.');
            } else {
                ordenes.push({ ...producto, cantidad });
                alert(`${producto.nombre} añadido a la orden.`);
            }
        } else {
            alert('Cantidad no disponible en inventario.');
        }
    } else {
        alert('Introduce una cantidad válida.');
    }
}

// Crear una nueva orden
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
    ordenes = [];
    formCrearOrden.reset();
    cargarProductosEnOrden();
});

// Cargar productos iniciales
cargarProductosEnOrden();
