// components/CalculadoraPuntoEquilibrio.js

export function CalculadoraPuntoEquilibrio() {
  const app = document.getElementById("main-content");
  app.innerHTML = `
    <div class="max-w-2xl mx-auto">
      <h2 class="text-xl font-bold mb-4">📈 Calculadora de Punto de Equilibrio</h2>

      <h3 class="text-lg font-semibold mt-6">1. Costos fijos</h3>
      <div id="costos-fijos"></div>
      <button onclick="addCostoFijo()" class="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Agregar costo fijo</button>

      <h3 class="text-lg font-semibold mt-6">2. Costos variables unitarios y precios de venta</h3>
      <div id="items"></div>
      <button onclick="addItem()" class="bg-green-600 text-white px-4 py-2 mt-2 rounded">Agregar ítem</button>

      <div class="mt-6">
        <button onclick="calcularPuntoEquilibrio()" class="bg-purple-700 text-white px-6 py-2 rounded">Calcular punto de equilibrio</button>
      </div>

      <div id="resultado" class="mt-6 text-gray-800 text-lg font-medium"></div>
    </div>
  `;

  window.addCostoFijo = () => {
    const div = document.createElement("div");
    div.className = "mt-2";
    div.innerHTML = `<input type="number" class="border p-2 w-full" placeholder="Costo fijo ($)">`;
    document.getElementById("costos-fijos").appendChild(div);
  };

  window.addItem = () => {
    const div = document.createElement("div");
    div.className = "grid grid-cols-2 gap-4 mt-2";
    div.innerHTML = `
      <input type="number" class="border p-2 w-full" placeholder="Costo variable unitario ($)">
      <input type="number" class="border p-2 w-full" placeholder="Precio de venta unitario ($)">
    `;
    document.getElementById("items").appendChild(div);
  };

  window.calcularPuntoEquilibrio = () => {
    const costosFijosInputs = document.querySelectorAll('#costos-fijos input');
    let totalCostosFijos = 0;
    costosFijosInputs.forEach(input => {
      totalCostosFijos += parseFloat(input.value) || 0;
    });

    const items = document.querySelectorAll('#items > div');
    let totalCVU = 0;
    let totalPVU = 0;
    let count = 0;

    items.forEach(item => {
      const inputs = item.querySelectorAll('input');
      const cvu = parseFloat(inputs[0].value) || 0;
      const pvu = parseFloat(inputs[1].value) || 0;
      totalCVU += cvu;
      totalPVU += pvu;
      count++;
    });

    const costoVariableProm = count ? totalCVU / count : 0;
    const precioVentaProm = count ? totalPVU / count : 0;

    const margenUnitario = precioVentaProm - costoVariableProm;

    let resultadoHTML = "";

    if (margenUnitario > 0) {
      const unidades = Math.ceil(totalCostosFijos / margenUnitario);
      const ingresos = unidades * precioVentaProm;
      const ganancia = ingresos - (unidades * costoVariableProm);

      resultadoHTML = `
        <p>📊 <strong>Explicación simple:</strong></p>
        <p>Necesitas vender un total de <strong>${unidades}</strong> unidades para alcanzar el punto de equilibrio.</p>
        <p>En este punto, tus ingresos totales serán de <strong>$${ingresos.toFixed(2)}</strong> y tu ganancia de <strong>$${ganancia.toFixed(2)}</strong>, lo que cubrirá todos tus costos fijos que son de <strong>$${totalCostosFijos.toFixed(2)}</strong>.</p>
        <p>A partir de este punto de facturación, obtendrás ganancias. 🚀</p>
      `;
    } else {
      resultadoHTML = `<p class="text-red-600">El precio de venta debe ser mayor al costo variable unitario para calcular el punto de equilibrio.</p>`;
    }

    document.getElementById("resultado").innerHTML = resultadoHTML;
  };

  // Agregar un campo por defecto
  addCostoFijo();
  addItem();
}

window.CalculadoraPuntoEquilibrio = CalculadoraPuntoEquilibrio;
