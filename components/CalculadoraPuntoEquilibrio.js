export function PuntoEquilibrio() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <div class="p-4 max-w-lg mx-auto bg-white rounded shadow">
      <h2 class="text-xl font-bold mb-4">⚖️ Calculadora de Punto de Equilibrio</h2>
      
      <h3 class="font-semibold mb-2">Costos fijos</h3>
      <div id="fijos" class="mb-4"></div>
      <button id="add-fijo" class="bg-blue-500 text-white px-3 py-1 rounded mb-4">+ Agregar costo fijo</button>
      
      <h3 class="font-semibold mb-2">Precio de venta unitario y costo variable unitario</h3>
      <div id="items" class="mb-4"></div>
      <button id="add-item" class="bg-green-500 text-white px-3 py-1 rounded mb-4">+ Agregar producto</button>
      
      <button id="calc-pe" class="bg-purple-600 text-white px-4 py-2 rounded w-full">Calcular punto de equilibrio</button>
      <div id="resultado-pe" class="mt-6 text-gray-700 text-sm"></div>
    </div>`;

  document.getElementById('add-fijo').onclick = () => {
    const div = document.createElement('div');
    div.innerHTML = `<input type="number" placeholder="Costo fijo $" class="border p-2 mb-2 w-full rounded">`;
    document.getElementById('fijos').appendChild(div);
  };

  document.getElementById('add-item').onclick = () => {
    const div = document.createElement('div');
    div.classList.add('flex', 'gap-2', 'mb-2');
    div.innerHTML = `
      <input type="number" placeholder="Precio unitario $" class="border p-2 w-1/2 rounded">
      <input type="number" placeholder="Costo variable unitario $" class="border p-2 w-1/2 rounded">`;
    document.getElementById('items').appendChild(div);
  };

  document.getElementById('calc-pe').onclick = () => {
    const fijos = Array.from(document.querySelectorAll('#fijos input'))
      .reduce((a, i) => a + Number(i.value || 0), 0);
    
    const item = document.querySelector('#items div');
    if (!item) {
      alert('Agregá al menos un producto');
      return;
    }
    
    const [precioInput, costoInput] = item.querySelectorAll('input');
    const precio = Number(precioInput.value);
    const costoVariable = Number(costoInput.value);

    if (precio <= costoVariable) {
      document.getElementById('resultado-pe').innerHTML = `
        <p class="text-red-600">⚠️ El precio debe ser mayor al costo variable para que exista un punto de equilibrio.</p>`;
      return;
    }

    const unidades = Math.ceil(fijos / (precio - costoVariable));
    const ingresos = unidades * precio;
    const ganancia = ingresos - fijos;

    document.getElementById('resultado-pe').innerHTML = `
      <p class="mb-2">📊 <strong>Explicación simple:</strong></p>
      <ul class="list-disc list-inside space-y-1">
        <li>Necesitás vender <strong>${unidades}</strong> unidades para alcanzar el punto de equilibrio.</li>
        <li>En este punto, tus ingresos serán de <strong>$${ingresos.toFixed(2)}</strong> y tu ganancia de <strong>$${ganancia.toFixed(2)}</strong>.</li>
        <li>Esto cubrirá todos tus costos fijos, que son de <strong>$${fijos.toFixed(2)}</strong>.</li>
        <li>A partir de este nivel de facturación, comenzarás a obtener ganancias.</li>
      </ul>`;
  };
}
