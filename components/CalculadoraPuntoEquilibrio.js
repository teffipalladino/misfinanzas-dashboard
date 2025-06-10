export function PuntoEquilibrio(container) {
  container.innerHTML = `
    <h2 class="text-2xl mb-4">Calculadora Punto de Equilibrio</h2>

    <div id="costos-fijos-container" class="mb-4">
      <h3>Costos fijos</h3>
      <button id="agregarCostoFijoBtn" class="mb-2 px-2 py-1 bg-blue-500 text-white rounded">Agregar costo fijo</button>
      <div id="lista-costos-fijos"></div>
      <p>Total costos fijos: <span id="total-costos-fijos">0</span></p>
    </div>

    <div id="costos-variables-container" class="mb-4">
      <h3>Costos variables unitarios</h3>
      <button id="agregarCostoVariableBtn" class="mb-2 px-2 py-1 bg-blue-500 text-white rounded">Agregar costo variable</button>
      <div id="lista-costos-variables"></div>
      <p>Total costos variables unitarios: <span id="total-costos-variables">0</span></p>
    </div>

    <div class="mb-4">
      <label>Precio de venta unitario: <input id="precioVentaUnitario" type="number" min="0" step="0.01" class="border p-1 w-32" /></label>
    </div>

    <button id="calcularBtn" class="px-4 py-2 bg-green-600 text-white rounded">Calcular punto de equilibrio</button>

    <div id="resultado" class="mt-4 font-semibold"></div>
  `;

  const listaCostosFijos = container.querySelector('#lista-costos-fijos');
  const totalCostosFijosEl = container.querySelector('#total-costos-fijos');
  const listaCostosVariables = container.querySelector('#lista-costos-variables');
  const totalCostosVariablesEl = container.querySelector('#total-costos-variables');
  const precioVentaUnitarioInput = container.querySelector('#precioVentaUnitario');
  const calcularBtn = container.querySelector('#calcularBtn');
  const resultadoDiv = container.querySelector('#resultado');

  function calcularTotalCostosFijos() {
    let total = 0;
    container.querySelectorAll('.costo-fijo-input').forEach(input => {
      const val = parseFloat(input.value);
      if (!isNaN(val)) total += val;
    });
    totalCostosFijosEl.textContent = total.toFixed(2);
    return total;
  }

  function calcularTotalCostosVariables() {
    let total = 0;
    container.querySelectorAll('.costo-variable-input').forEach(input => {
      const val = parseFloat(input.value);
      if (!isNaN(val)) total += val;
    });
    totalCostosVariablesEl.textContent = total.toFixed(2);
    return total;
  }

  function agregarCostoFijo() {
    const div = document.createElement('div');
    div.className = 'mb-2';

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.step = '0.01';
    input.className = 'costo-fijo-input border p-1 w-32';
    input.placeholder = 'Costo fijo';

    input.addEventListener('input', () => {
      calcularTotalCostosFijos();
    });

    div.appendChild(input);
    listaCostosFijos.appendChild(div);

    calcularTotalCostosFijos();
  }

  function agregarCostoVariable() {
    const div = document.createElement('div');
    div.className = 'mb-2';

    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.step = '0.01';
    input.className = 'costo-variable-input border p-1 w-32';
    input.placeholder = 'Costo variable';

    input.addEventListener('input', () => {
      calcularTotalCostosVariables();
    });

    div.appendChild(input);
    listaCostosVariables.appendChild(div);

    calcularTotalCostosVariables();
  }

  calcularBtn.addEventListener('click', () => {
    const costosFijos = calcularTotalCostosFijos();
    const costosVariables = calcularTotalCostosVariables();
    const precioVenta = parseFloat(precioVentaUnitarioInput.value);

    if (isNaN(precioVenta) || precioVenta <= 0) {
      resultadoDiv.textContent = 'Por favor ingresa un precio de venta válido.';
      return;
    }

    if (precioVenta <= costosVariables) {
      resultadoDiv.textContent = 'El precio de venta debe ser mayor que los costos variables unitarios para calcular el punto de equilibrio.';
      return;
    }

    const puntoEquilibrio = costosFijos / (precioVenta - costosVariables);

    resultadoDiv.textContent = `El punto de equilibrio en unidades es: ${puntoEquilibrio.toFixed(2)}`;
  });

  container.querySelector('#agregarCostoFijoBtn').addEventListener('click', agregarCostoFijo);
  container.querySelector('#agregarCostoVariableBtn').addEventListener('click', agregarCostoVariable);

  // Agrega un input por defecto para costos fijos y variables
  agregarCostoFijo();
  agregarCostoVariable();
}
