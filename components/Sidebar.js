export function renderSidebar() {
  const sidebar = document.createElement('div');
  sidebar.className = 'bg-gray-900 text-white w-64 min-h-screen fixed flex flex-col';

  sidebar.innerHTML = `
    <div class="text-2xl font-bold p-6 border-b border-gray-700">Mis Finanzas</div>
    <nav class="flex-1 p-4 space-y-2">
      <button id="precioVentaBtn" class="w-full text-left px-4 py-2 rounded hover:bg-gray-700">💰 Precio de Venta</button>
      <button id="puntoEquilibrioBtn" class="w-full text-left px-4 py-2 rounded hover:bg-gray-700">⚖️ Punto de Equilibrio</button>
      <button id="dashboardBtn" class="w-full text-left px-4 py-2 rounded hover:bg-gray-700">📊 Dashboard</button>
    </nav>
  `;

  document.body.appendChild(sidebar);

  // Asignamos listeners
  document.getElementById('precioVentaBtn').addEventListener('click', () => {
    import('./CalculadoraPrecio.js').then(module => module.renderCalculadoraPrecioVenta());
  });

  document.getElementById('puntoEquilibrioBtn').addEventListener('click', () => {
    import('./CalculadoraPuntoEquilibrio.js').then(module => module.renderCalculadoraPuntoEquilibrio());
  });

  document.getElementById('dashboardBtn').addEventListener('click', () => {
    const main = document.getElementById('main-content');
    main.innerHTML = `<h2 class="text-2xl font-semibold mb-4">Dashboard (próximamente)</h2>`;
  });
}
