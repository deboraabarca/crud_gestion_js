let inventario = JSON.parse(localStorage.getItem('inventario')) || [];

const formAgregarProducto = document.getElementById('form-agregar-producto');
const tablaProductos = document.getElementById('tabla-productos').querySelector('tbody');

formAgregarProducto.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);

    if (!nombre || isNaN(precio) || isNaN(stock)) {
        alert('Por favor, completa todos los campos con valores válidos.');
        return;
    }

    const producto = { id: Date.now(), nombre, precio, stock };
    inventario.push(producto);
    localStorage.setItem('inventario', JSON.stringify(inventario));
    console.log('Producto agregado:', producto);
    console.log('Inventario actualizado:', inventario);

    actualizarTablaProductos();
    formAgregarProducto.reset();
});

function actualizarTablaProductos() {
    console.log('Actualizando tabla...');
    console.log('Inventario actual:', inventario);
    tablaProductos.innerHTML = '';
    inventario.forEach((producto) => {
        console.log('Agregando producto:', producto);
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio.toFixed(2)}</td>
            <td>${producto.stock}</td>
            <td><button onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
        `;
        tablaProductos.appendChild(fila);
    });
}

function eliminarProducto(id) {
    inventario = inventario.filter((producto) => producto.id !== id);
    localStorage.setItem('inventario', JSON.stringify(inventario));
    actualizarTablaProductos();
}

window.onload = () => {
    console.log('Cargando página...');
    actualizarTablaProductos();
};
