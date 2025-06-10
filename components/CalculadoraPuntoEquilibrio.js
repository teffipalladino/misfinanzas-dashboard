export function renderCalculadoraPuntoEquilibrio() {
  const mainContent = document.getElementById('main-content');
  mainContent.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'p-4';

  container.innerHTML = `
    <h2 class="text-xl font-bold mb-4">Calculadora de Punto de Equilibrio</h2>

    <div class="mb-4">
      <h3 class="font-semibold mb-2">Costos fijos</h3>
      <button id="agregar-costo-fijo" class="bg-blue-500 text-white px-4 py-2 rounded mb-2">+ Agregar costo fijo</button>
      <div id="lista-costos-fijos" class="space-y-2"></div>
      <p class="mt-2">Total de costos fijos: $<span id="total-costos-fijos">0</span></p>
    </div>

    <div class="mb-4">
      <h3 class="font-semibold mb-2">Datos por producto</h3>
      <button id="agregar-producto" class="bg-green-600 text-white px-4 py-2 rounded mb-2">+ Agregar producto</button>
      <div id="productos-container" class="space-y-2"></div>
    </div>

    <button id="calcular-pe" class="bg-purple-700 text-white px-4 py-2 rounded">Calcular punto de equilibrio</button>

    <div id="resultado-pe" class="mt-4 text-blue-800 font-semibold"></div>
  `;

  mainContent.appendChild(container);

  const listaCostosFijos = document.getElementById('lista-costos-fijos');
  const totalCostosFijosSpan = document.getElementById('total-costos-fijos');
  const productosContainer = document.getElementById('productos-container');

  document.getElementById('agregar-costo-fijo').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = 'Costo fijo';
    input.className = 'border px-2 py-1 w-full';
    input.addEventListener('input', calcularTotalCostosFijos);
    listaCostosFijos.appendChild(input);
  });

  function calcularTotalCostosFijos() {
    const inputs = listaCostosFijos.querySelectorAll('input');
    const total = Array.from(inputs).reduce((acc, input) => acc + Number(input.value || 0), 0);
    totalCostosFijosSpan.textContent = total.toFixed(2);
  }

  document.getElementById('agregar-producto').addEventListener('click', () => {
    const row = document.createElement('div');
    row.className = 'flex gap-2';

    row.innerHTML = `
      <input type="number" placeholder="Precio unitario" class="border px-2 py-1 w-1/3 precio">
      <input type="number" placeholder="Costo variable unitario" class="border px-2 py-1 w-1/3 costo">
    `;

    productosContainer.appendChild(row);
  });

  document.getElementById('calcular-pe').addEventListener('click', () => {
    const costosFijos = parseFloat(totalCostosFijosSpan.textContent) || 0;
    const precios = productosContainer.querySelectorAll('.precio');
    const costos = productosContainer.querySelectorAll('.costo');

    let resultadoHTML = '';

    if (precios.length === 0 || costos.length === 0) {
      resultadoHTML = 'Por favor ingresá al menos un producto.';
    } else {
      const precio = parseFloat(precios[0].value || 0);
      const costo = parseFloat(costos[0].value || 0);

      if (precio <= costo) {
        resultadoHTML = 'El precio unitario debe ser mayor al costo variable unitario para calcular el punto de equilibrio.';
      } else {
        const unidades = costosFijos / (precio - costo);
        const ingresos = unidades * precio;
        const ganancia = ingresos - costosFijos;

        resultadoHTML = `
          <p>Necesitás vender un total de <strong>${Math.ceil(unidades)}</strong> unidades para alcanzar el punto de equilibrio.</p>
          <p>En este punto, tus ingresos totales serán de <strong>$${ingresos.toFixed(2)}</strong> y tu ganancia de <strong>$${ganancia.toFixed(2)}</strong>, lo que cubrirá todos tus costos fijos que son de <strong>$${costosFijos.toFixed(2)}</strong>.</p>
          <p>Y a partir de este punto de facturación, obtendrás ganancias.</p>
        `;
      }
    }

    document.getElementById('resultado-pe').innerHTML = resultadoHTML;
  });
}
