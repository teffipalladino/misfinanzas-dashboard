// components/Sidebar.js
import { CalculadoraPrecio } from './CalculadoraPrecio.js';

export function Sidebar() {
  const app = document.getElementById("root");
  app.innerHTML = `
    <div class="flex min-h-screen">
      <!-- Sidebar -->
      <div class="w-64 bg-gray-800 text-white min-h-screen px-4 py-6">
        <h1 class="text-2xl font-bold mb-6">📊 Mis Finanzas</h1>
        <ul class="space-y-4">
          <li>
            <button onclick="loadCalculadoraPrecio()" class="w-full text-left hover:text-blue-400">
              💰 Precio de venta
            </button>
          </li>
          <!-- Acá podés ir agregando más calculadoras -->
        </ul>
      </div>

      <!-- Contenido -->
      <div id="main-content" class="flex-1 bg-gray-100 p-6">
        <div id="calculadora-container" class="bg-white rounded p-4 shadow">
          <p class="text-gray-700">Seleccioná una calculadora desde el menú.</p>
        </div>
      </div>
    </div>
  `;
}

// Esta función se expone globalmente para que el botón funcione
window.loadCalculadoraPrecio = () => {
  CalculadoraPrecio();
};
