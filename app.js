import { Sidebar } from './components/Sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
  Sidebar();

  document.getElementById('precioVentaBtn').addEventListener('click', () => {
    import('./components/CalculadoraPrecio.js')
      .then(mod => mod.renderCalculadoraPrecioVenta());
  });

  document.getElementById('puntoEquilibrioBtn').addEventListener('click', () => {
    import('./components/CalculadoraPuntoEquilibrio.js')
      .then(mod => mod.PuntoEquilibrio());
  });

  // Carga inicial: calculadora de precio de venta
  import('./components/CalculadoraPrecio.js')
    .then(mod => mod.renderCalculadoraPrecioVenta());
});
