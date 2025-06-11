// components/CalculadoraContadoCuotas.js

export function renderContadoCuotas(container) {
  container.innerHTML = `
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">💳 Contado vs Cuotas</h2>

      <div id="cuotas-container">
        <h3 class="font-semibold">Ingresá tus cuotas:</h3>
        <div class="grid grid-cols-3 gap-2 mb-2">
          <label>N° Cuota</label>
          <label>Valor de la Cuota</label>
          <label>Tasa de Inflación mensual (%)</label>
        </div>
        <div class="grid grid-cols-3 gap-2 mb-2">
          <input type="number" class="cuota-num border px-2 py-1" placeholder="1" />
          <input type="number" class="cuota-valor border px-2 py-1" placeholder="10000" />
          <input type="number" id="inflacion" class="border px-2 py-1" placeholder="3" />
        </div>
        <button id="agregarCuota" class="bg-blue-500 text-white px-4 py-1 mt-2 rounded">Agregar Cuota</button>
        <div id="cuotasList" class="mt-4 space-y-2"></div>
      </div>

      <div class="mt-6">
        <label class="block font-semibold mb-1">Valor de contado:</label>
        <input type="number" id="valorContado" class="border px-2 py-1 w-full" placeholder="50000" />
      </div>

      <button id="calcularBtn" class="bg-green-600 text-white px-4 py-2 mt-4 rounded">¿Qué conviene más?</button>

      <div id="resultado" class="mt-6 text-lg font-semibold"></div>
    </div>
  `;

  const cuotasList = [];
  const cuotasListContainer = document.getElementById('cuotasList');

  document.getElementById('agregarCuota').addEventListener('click', () => {
    const cuotaNum = document.querySelector('.cuota-num').valueAsNumber;
    const cuotaValor = document.querySelector('.cuota-valor').valueAsNumber;
    const inflacion = document.getElementById('inflacion').valueAsNumber;

    if (isNaN(cuotaNum) || isNaN(cuotaValor) || isNaN(inflacion)) {
      alert('Por favor completá todos los campos para agregar una cuota.');
      return;
    }

    cuotasList.push({ cuotaNum, cuotaValor, inflacion });

    const adjusted = cuotaValor / Math.pow(1 + inflacion / 100, cuotaNum);

    const item = document.createElement('div');
    item.innerHTML = `Cuota ${cuotaNum}: \$${cuotaValor.toFixed(2)} → Ajustada: \$${adjusted.toFixed(2)}`;
    cuotasListContainer.appendChild(item);
  });

  document.getElementById('calcularBtn').addEventListener('click', () => {
    const valorContado = document.getElementById('valorContado').valueAsNumber;

    if (isNaN(valorContado) || cuotasList.length === 0) {
      alert('Completá los datos y agregá al menos una cuota.');
      return;
    }

    let totalAjustado = 0;
    cuotasList.forEach(cuota => {
      const ajustada = cuota.cuotaValor / Math.pow(1 + cuota.inflacion / 100, cuota.cuotaNum);
      totalAjustado += ajustada;
    });

    const conviene = totalAjustado < valorContado ? '✅ Sí, conviene cuotas.' : '❌ No, conviene contado.';

    document.getElementById('resultado').innerHTML = `
      Total ajustado de cuotas: <strong>\$${totalAjustado.toFixed(2)}</strong><br>
      Valor contado: <strong>\$${valorContado.toFixed(2)}</strong><br>
      ${conviene}
    `;
  });
}
