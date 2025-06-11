export function renderCalculadoraPrecioVenta(container) {
  container.innerHTML = `
    <div class="card"><!-- 🔸 CAMBIO: envolvemos todo en una card -->
      <h2 class="text-2xl mb-4">Calculadora Precio de Venta</h2>

      <div id="costos-container" class="mb-4"><!-- 🔸 CAMBIO: espacio inferior -->
        <h3 class="mb-2 text-lg font-semibold">Costos</h3> <!-- 🔸 CAMBIO: más visual -->
        <button id="agregarCostoBtn" class="primary mb-2">Agregar costo</button> <!-- 🔸 CAMBIO: clase 'primary' -->
        <div id="lista-costos" class="flex-col-md"></div> <!-- 🔸 CAMBIO: estilo responsivo -->
        <p class="mt-2">Total costos: <span id="total-costos">0</span></p>
      </div>

      <div class="mb-4"> <!-- 🔸 CAMBIO: agrupación con margen inferior -->
        <label class="block mb-1">
          <input type="radio" name="margenMarkup" value="margen" checked /> Margen de ganancia %
        </label>
        <label class="block mb-2">
          <input type="radio" name="margenMarkup" value="markup" /> Markup %
        </label>
        <input id="porcentajeGanancia" type="number" min="0" max="100" value="0" class="border p-2 rounded w-28" /> <!-- 🔸 CAMBIO: input más cómodo -->
      </div>

      <p id="precioVentaResult" class="mt-2 font-semibold text-orange-700"></p> <!-- 🔸 CAMBIO: color destacado -->

      <div class="mt-4">
        <label class="block mb-1">IVA %:</label>
        <input id="ivaInput" type="number" min="0" max="100" value="0" class="border p-2 rounded w-28" />
        <p id="precioConIvaResult" class="mt-2 font-semibold text-orange-700"></p>
      </div>
    </div>
  `;

  const listaCostos = container.querySelector('#lista-costos');
  const totalCostosEl = container.querySelector('#total-costos');
  const precioVentaResult = container.querySelector('#precioVentaResult');
  const precioConIvaResult = container.querySelector('#precioConIvaResult');
  const porcentajeGananciaInput = container.querySelector('#porcentajeGanancia');
  const ivaInput = container.querySelector('#ivaInput');
  const agregarCostoBtn = container.querySelector('#agregarCostoBtn');

  function calcularTotalCostos() {
    let total = 0;
    container.querySelectorAll('.costo-input').forEach(input => {
      const val = parseFloat(input.value);
      if (!isNaN(val)) total += val;
    });
    totalCostosEl.textContent = total.toFixed(2);
    return total;
  }

  function calcularPrecioVenta() {
    const totalCostos = calcularTotalCostos();
    const porcentaje = parseFloat(porcentajeGananciaInput.value) || 0;
    const tipo = container.querySelector('input[name="margenMarkup"]:checked').value;

    let precioVenta = 0;
    if (tipo === 'margen') {
      precioVenta = totalCostos / (1 - porcentaje / 100);
      precioVentaResult.textContent = `Con este margen de ganancia (${porcentaje}%), tu precio de venta será: $${precioVenta.toFixed(2)}`;
    } else {
      precioVenta = totalCostos * (1 + porcentaje / 100);
      precioVentaResult.textContent = `Con este markup (${porcentaje}%), tu precio de venta será: $${precioVenta.toFixed(2)}`;
    }
    return precioVenta;
  }

  function calcularPrecioConIVA(precioVenta) {
    const iva = parseFloat(ivaInput.value) || 0;
    const precioConIVA = precioVenta * (1 + iva / 100);
    precioConIvaResult.textContent = `Tu precio de venta con IVA incluido es de: $${precioConIVA.toFixed(2)}`;
  }

  function actualizarCalculos() {
    const precioVenta = calcularPrecioVenta();
    calcularPrecioConIVA(precioVenta);
  }

  function agregarCosto() {
    const div = document.createElement('div');
    div.className = 'input-group'; // 🔸 CAMBIO: para aplicar espacio vertical entre inputs

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.step = '0.01';
    input.className = 'costo-input border p-2 rounded w-full';
    input.placeholder = 'Costo';

    input.addEventListener('input', actualizarCalculos);

    div.appendChild(input);
    listaCostos.appendChild(div);

    actualizarCalculos();
  }

  agregarCostoBtn.addEventListener('click', agregarCosto);

  porcentajeGananciaInput.addEventListener('input', actualizarCalculos);
  ivaInput.addEventListener('input', actualizarCalculos);
  container.querySelectorAll('input[name="margenMarkup"]').forEach(radio => {
    radio.addEventListener('change', actualizarCalculos);
  });

  // Empieza con un input de costo por defecto
  agregarCosto();
}
