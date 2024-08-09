document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const secciones = document.querySelectorAll('.seccion');

    // Mostrar la primera sección por defecto
    const defaultSection = 'cpu';
    document.getElementById(defaultSection).style.display = 'block';
    document.querySelector(`[data-section="${defaultSection}"]`).classList.add('active');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');

            // Ocultar todas las secciones
            secciones.forEach(section => {
                section.style.display = 'none';
            });

            // Remover clase activa de todos los elementos del menú
            menuItems.forEach(item => {
                item.classList.remove('active');
            });

            // Mostrar la sección seleccionada
            document.getElementById(targetSection).style.display = 'block';
            this.classList.add('active');
        });
    });
});