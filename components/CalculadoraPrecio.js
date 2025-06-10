export function renderCalculadoraPrecioVenta() {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'p-4';

  container.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Calculadora de Precio de Venta</h2>
    
    <div id="costos-container" class="mb-4">
      <h3 class="font-semibold mb-2">Ingresá tus costos</h3>
      <button id="agregar-costo" class="bg-blue-500 text-white px-4 py-2 rounded mb-2">+ Agregar costo</button>
      <div id="lista-costos" class="space-y-2"></div>
      <p class="mt-2">Total de costos: $<span id="total-costos">0</span></p>
    </div>

    <div class="mb-4">
      <label class="block mb-1">¿Querés aplicar margen de ganancia o markup?</label>
      <select id="tipo-margen" class="border px-2 py-1">
        <option value="margen">Margen de ganancia</option>
        <option value="markup">Markup</option>
      </select>
      <input id="porcentaje-margen" type="number" class="border px-2 py-1 ml-2 w-24" placeholder="%">
      <button id="calcular-precio" class="bg-green-600 text-white px-4 py-2 ml-2 rounded">Calcular</button>
    </div>

    <div id="resultado-precio" class="mb-4 font-semibold text-blue-700"></div>

    <div class="mb-4">
      <label class="block mb-1">¿Querés sumarle IVA?</label>
      <input id="iva" type="number" class="border px-2 py-1 w-24" placeholder="% IVA">
      <button id="calcular-iva" class="bg-purple-600 text-white px-4 py-2 ml-2 rounded">Sumar IVA</button>
    </div>

    <div id="resultado-iva" class="font-semibold text-purple-700"></div>
  `;

  mainContent.appendChild(container);

  let totalCostos = 0;

  const listaCostos = document.getElementById('lista-costos');
  const totalCostosSpan = document.getElementById('total-costos');

  document.getElementById('agregar-costo').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Costo';
    input.className = 'border px-2 py-1 w-full';
    input.addEventListener('input', calcularTotalCostos);
    listaCostos.appendChild(input);
  });

  function calcularTotalCostos() {
    const inputs = listaCostos.querySelectorAll('input');
    totalCostos = Array.from(inputs).reduce((acc, input) => acc + Number(input.value || 0), 0);
    totalCostosSpan.textContent = totalCostos.toFixed(2);
  }

  document.getElementById('calcular-precio').addEventListener('click', () => {
    const tipo = document.getElementById('tipo-margen').value;
    const porcentaje = Number(document.getElementById('porcentaje-margen').value);
    let precio = 0;

    if (tipo === 'margen') {
      precio = totalCostos / (1 - porcentaje / 100);
    } else {
      precio = totalCostos * (1 + porcentaje / 100);
    }

    document.getElementById('resultado-precio').textContent = `Con este ${tipo}, tu precio de venta será: $${precio.toFixed(2)}`;

    // Guardamos el precio base para el cálculo de IVA
    document.getElementById('resultado-precio').dataset.precioBase = precio.toFixed(2);
  });

  document.getElementById('calcular-iva').addEventListener('click', () => {
    const iva = Number(document.getElementById('iva').value);
    const base = Number(document.getElementById('resultado-precio').dataset.precioBase || 0);
    const precioFinal = base * (1 + iva / 100);

    document.getElementById('resultado-iva').textContent = `Tu precio de venta con IVA incluido es de: $${precioFinal.toFixed(2)}`;
  });
}
