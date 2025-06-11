export function Sidebar() {
  const sidebarEl = document.getElementById('sidebar');
  sidebarEl.innerHTML = `
    <div class="p-4 space-y-4">
      <h1 class="text-xl font-bold text-gray-800">Mis Finanzas</h1>
      <button id="precioVentaBtn" class="block w-full text-left px-4 py-2 hover:bg-gray-200">💰 Precio de Venta</button>
      <button id="puntoEquilibrioBtn" class="block w-full text-left px-4 py-2 hover:bg-gray-200">⚖️ Punto de Equilibrio</button>
      <button id="contadoCuotasBtn" class="block w-full text-left px-4 py-2 hover:bg-gray-200">🧾 Contado vs Cuotas</button>
    </div>
  `;
}
