// components/CalculadoraPrecio.js
export function CalculadoraPrecio() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 class="text-xl font-bold text-gray-800">💰 Calculadora de Precio de Venta</h2>

      <div id="costos-container" class="space-y-2">
        <label class="block font-medium">Ingresá tus costos:</label>
        <div class="flex gap-2">
          <input type="text" placeholder="Descripción (opcional)" class="descripcion-costo border p-2 rounded w-1/2" />
          <input type="number" placeholder="Monto $" class="monto-costo border p-2 rounded w-1/2" />
        </div>
      </div>
      <button id="agregar-costo" class="bg-blue-600 text-white px-4 py-2 rounded">➕ Agregar otro costo</button>
      <p class="font-semibold">Costo total: $<span id="total-costos">0</span></p>

      <hr />

      <label class="block font-medium mt-4">¿Querés aplicar margen de ganancia o markup?</label>
      <select id="tipo-margen" class="border p-2 rounded w-full">
        <option value="margen">Margen de ganancia (%)</option>
        <option value="markup">Markup (%)</option>
      </select>
      <input type="number" id="valor-margen" placeholder="Ej: 30" class="border p-2 rounded w-full mt-2" />
      <p class="mt-2 font-semibold text-blue-700">Precio de venta sugerido: $<span id="precio-sin-iva">0</span></p>

      <hr />

      <label class="block font-medium mt-4">¿Necesitás sumar IVA?</label>
      <input type="number" id="valor-iva" placeholder="Ej: 21" class="border p-2 rounded w-full" />
      <p class="mt-2 font-semibold text-green-700">Precio final con IVA: $<span id="precio-con-iva">0</span></p>
    </div>
  `;

  let costos = [];

  function actualizarCostos() {
    const montos = document.querySelectorAll(".monto-costo");
    costos = Array.from(montos)
      .map((input) => parseFloat(input.value) || 0);
    const total = costos.reduce((acc, val) => acc + val, 0);
    document.getElementById("total-costos").textContent = total.toFixed(2);
    calcularPrecio();
  }

  function calcularPrecio() {
    const total = costos.reduce((acc, val) => acc + val, 0);
    const tipo = document.getElementById("tipo-margen").value;
    const valor = parseFloat(document.getElementById("valor-margen").value) || 0;
    let precio = 0;

    if (tipo === "margen") {
      precio = total / (1 - valor / 100);
    } else {
      precio = total * (1 + valor / 100);
    }

    document.getElementById("precio-sin-iva").textContent = precio.toFixed(2);

    const iva = parseFloat(document.getElementById("valor-iva").value) || 0;
    const precioConIva = precio * (1 + iva / 100);
    document.getElementById("precio-con-iva").textContent = precioConIva.toFixed(2);
  }

  document.getElementById("agregar-costo").addEventListener("click", () => {
    const nuevo = document.createElement("div");
    nuevo.className = "flex gap-2 mt-2";
    nuevo.innerHTML = `
      <input type="text" placeholder="Descripción (opcional)" class="descripcion-costo border p-2 rounded w-1/2" />
      <input type="number" placeholder="Monto $" class="monto-costo border p-2 rounded w-1/2" />
    `;
    document.getElementById("costos-container").appendChild(nuevo);
  });

  document.addEventListener("input", () => {
    actualizarCostos();
  });
}
