export function renderCalculadoraPrecioVenta(container) {
  container.innerHTML = `
    <h2 class="text-2xl mb-4">Calculadora Precio de Venta</h2>
    <div id="costos-container">
      <h3>Costos</h3>
      <button id="agregarCostoBtn" class="mb-2 px-2 py-1 bg-blue-500 text-white rounded">Agregar costo</button>
      <div id="lista-costos"></div>
      <p>Total costos: <span id="total-costos">0</span></p>
    </div>

    <div>
      <label>
        <input type="radio" name="margenMarkup" value="margen" checked /> Margen de ganancia %
      </label>
      <label>
        <input type="radio" name="margenMarkup" value="markup" /> Markup %
      </label>
      <input id="porcentajeGanancia" type="number" min="0" max="100" value="0" class="border p-1 w-20 ml-2" />
    </div>

    <p id="precioVentaResult" class="mt-2 font-semibold"></p>

    <div class="mt-4">
      <label>IVA %: <input id="ivaInput" type="number" min="0" max="100" value="0" class="border p-1 w-20" /></label>
      <p id="precioConIvaResult" class="mt-2 font-semibold"></p>
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
    div.className = 'mb-2';

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.step = '0.01';
    input.className = 'costo-input border p-1 w-32';
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
