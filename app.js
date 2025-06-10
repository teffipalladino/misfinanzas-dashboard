import { renderSidebar } from './components/Sidebar.js';

// Crear contenedor principal
document.body.className = 'flex';
renderSidebar();

const main = document.createElement('main');
main.id = 'main-content';
main.className = 'ml-64 p-6 w-full';
main.innerHTML = `<h1 class="text-3xl font-bold mb-6">Bienvenido a Mis Finanzas</h1>`;
document.body.appendChild(main);
