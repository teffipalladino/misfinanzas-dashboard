export function renderCalculadoraPrecioVenta(container) {
  container.innerHTML = `
    <h2 class="text-2xl mb-4">Calculadora Precio de Venta</h2>
    <div id="costos-container" class="mb-4">
      <h3 class="text-lg font-semibold mb-2">Ingresá tus costos:</h3>
      <div id="lista-costos" class="space-y-2"></div>
      <button id="agregarCostoBtn" class="mt-2 px-2 py-1 bg-blue-500 text-white rounded">➕ Agregar otro costo</button>
      <p class="mt-2">Costo total: $<span id="total-costos">0.00</span></p>
    </div>

    <div class="mb-4">
      <label class="block font-semibold mb-1">¿Querés aplicar margen de ganancia o markup?</label>
      <label class="inline-flex items-center mr-4">
        <input type="radio" name="margenMarkup" value="margen" checked class="mr-1"/> Margen de ganancia (%)
      </label>
      <label class="inline-flex items-center">
        <input type="radio" name="margenMarkup" value="markup" class="mr-1"/> Markup (%)
      </label>
      <input id="porcentajeGanancia" type="number" min="0" max="100" placeholder="Ej: 30" class="border p-1 w-24 ml-2 mt-2" />
      <p id="precioVentaResult" class="mt-2 font-semibold">Precio de venta sugerido: $0.00</p>
    </div>

    <div class="mb-4">
      <label class="block font-semibold mb-1">¿Necesitás sumar IVA?</label>
      <input id="ivaInput" type="number" min="0" max="100" placeholder="Ej: 21" class="border p-1 w-24" />
      <p id="precioConIvaResult" class="mt-2 font-semibold">Precio final con IVA: $0.00</p>
    </div>

    <button id="reiniciarBtn" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">Borrar todo</button>
  `;

  const listaCostos = container.querySelector('#lista-costos');
  const totalCostosEl = container.querySelector('#total-costos');
  const precioVentaResult = container.querySelector('#precioVentaResult');
  const precioConIvaResult = container.querySelector('#precioConIvaResult');
  const porcentajeGananciaInput = container.querySelector('#porcentajeGanancia');
  const ivaInput = container.querySelector('#ivaInput');
  const agregarCostoBtn = container.querySelector('#agregarCostoBtn');
  const reiniciarBtn = container.querySelector('#reiniciarBtn');

  function formatearNumero(num) {
    return num.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function calcularTotalCostos() {
    let total = 0;
    container.querySelectorAll('.costo-input').forEach(input => {
      const val = parseFloat(input.value);
      if (!isNaN(val)) total += val;
    });
    totalCostosEl.textContent = formatearNumero(total);
    return total;
  }

  function calcularPrecioVenta() {
    const totalCostos = calcularTotalCostos();
    const porcentaje = parseFloat(porcentajeGananciaInput.value) || 0;
    const tipo = container.querySelector('input[name="margenMarkup"]:checked').value;

    let precioVenta = 0;
    if (tipo === 'margen') {
      precioVenta = totalCostos / (1 - porcentaje / 100);
    } else {
      precioVenta = totalCostos * (1 + porcentaje / 100);
    }
    precioVentaResult.textContent = `Precio de venta sugerido: $${formatearNumero(precioVenta)}`;
    return precioVenta;
  }

  function calcularPrecioConIVA(precioVenta) {
    const iva = parseFloat(ivaInput.value) || 0;
    const precioConIVA = precioVenta * (1 + iva / 100);
    precioConIvaResult.textContent = `Precio final con IVA: $${formatearNumero(precioConIVA)}`;
  }

  function actualizarCalculos() {
    const precioVenta = calcularPrecioVenta();
    calcularPrecioConIVA(precioVenta);
  }

  function agregarCosto(nombre = '', monto = '') {
    const div = document.createElement('div');
    div.className = 'flex flex-col md:flex-row gap-2 items-start';

    const inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.placeholder = 'Descripción (opcional)';
    inputNombre.className = 'border p-1 w-full md:w-48';
    inputNombre.value = nombre;

    const inputMonto = document.createElement('input');
    inputMonto.type = 'number';
    inputMonto.min = '0';
    inputMonto.step = '0.01';
    inputMonto.placeholder = 'Monto $';
    inputMonto.className = 'costo-input border p-1 w-full md:w-32';
    inputMonto.value = monto;
    inputMonto.addEventListener('input', actualizarCalculos);

    div.appendChild(inputNombre);
    div.appendChild(inputMonto);
    listaCostos.appendChild(div);

    actualizarCalculos();
  }

  function reiniciarFormulario() {
    listaCostos.innerHTML = '';
    porcentajeGananciaInput.value = '';
    ivaInput.value = '';
    totalCostosEl.textContent = '0.00';
    precioVentaResult.textContent = 'Precio de venta sugerido: $0.00';
    precioConIvaResult.textContent = 'Precio final con IVA: $0.00';
    agregarCosto();
  }

  agregarCostoBtn.addEventListener('click', () => agregarCosto());
  porcentajeGananciaInput.addEventListener('input', actualizarCalculos);
  ivaInput.addEventListener('input', actualizarCalculos);
  reiniciarBtn.addEventListener('click', reiniciarFormulario);
  container.querySelectorAll('input[name="margenMarkup"]').forEach(radio => {
    radio.addEventListener('change', actualizarCalculos);
  });

  reiniciarFormulario();
}
