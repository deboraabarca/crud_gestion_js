function generarBoleta(ordenId) {
    const orden = ordenes.find((o) => o.id === ordenId);
    if (!orden) return alert('Orden no encontrada.');

    const boletaDiv = document.getElementById('boleta');
    boletaDiv.innerHTML = `
        <h2>Boleta de Venta</h2>
        <p><strong>Cliente:</strong> ${orden.cliente}</p>
        <p><strong>Método de Pago:</strong> ${orden.metodoPago}</p>
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                ${orden.productos.map((p) => `
                    <tr>
                        <td>${p.nombre}</td>
                        <td>${p.cantidad}</td>
                        <td>${p.precio.toFixed(2)}</td>
                        <td>${(p.precio * p.cantidad).toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <h3>Total: ${orden.total.toFixed(2)}</h3>
    `;
}
