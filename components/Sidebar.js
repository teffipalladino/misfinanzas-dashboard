import { renderCalculadoraPrecioVenta } from './CalculadoraPrecio.js';
import { renderCalculadoraPuntoEquilibrio } from './CalculadoraPuntoEquilibrio.js';

export function renderSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'w-64 h-screen bg-gray-800 text-white p-4 space-y-4 fixed';

  sidebar.innerHTML = `
    <h2 class="text-xl font-bold mb-6">Mis Finanzas</h2>
    <button id="precioVentaBtn" class="block w-full text-left hover:bg-gray-700 px-2 py-1 rounded">📊 Precio de Venta</button>
    <button id="puntoEquilibrioBtn" class="block w-full text-left hover:bg-gray-700 px-2 py-1 rounded">⚖️ Punto de Equilibrio</button>
  `;

  document.body.appendChild(sidebar);

  document.getElementById('precioVentaBtn').addEventListener('click', () => {
    renderCalculadoraPrecioVenta();
  });

  document.getElementById('puntoEquilibrioBtn').addEventListener('click', () => {
    renderCalculadoraPuntoEquilibrio();
  });
}
