import { Sidebar } from './components/Sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
  Sidebar();

  const mainContainer = document.getElementById('main');

  function limpiarMain() {
    mainContainer.innerHTML = '';
  }

  document.getElementById('precioVentaBtn').addEventListener('click', () => {
    limpiarMain();
    import('./components/CalculadoraPrecio.js')
      .then(mod => mod.renderCalculadoraPrecioVenta(mainContainer));
  });

  document.getElementById('puntoEquilibrioBtn').addEventListener('click', () => {
    limpiarMain();
    import('./components/CalculadoraPuntoEquilibrio.js')
      .then(mod => mod.PuntoEquilibrio(mainContainer));
  });

  document.getElementById('contadoCuotasBtn').addEventListener('click', () => {
    limpiarMain();
    import('./components/CalculadoraContadoCuotas.js')
      .then(mod => mod.renderContadoCuotas(mainContainer));
  });

  // Carga inicial: Precio de venta
  limpiarMain();
  import('./components/CalculadoraPrecio.js')
    .then(mod => mod.renderCalculadoraPrecioVenta(mainContainer));
});
