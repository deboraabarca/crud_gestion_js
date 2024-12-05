// Navegación entre vistas
function mostrarVista(vista) {
    document.querySelectorAll('.vista').forEach((seccion) => {
        seccion.classList.add('hidden');
    });
    document.getElementById(vista).classList.remove('hidden');
}
