import { Sidebar } from './Sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
  Sidebar();

  document.getElementById('precioVentaBtn').addEventListener('click', () => {
    import('./CalculadoraPrecio.js').then(module => {
      module.CalculadoraPrecio();
    });
  });

  document.getElementById('peBtn').addEventListener('click', () => {
    import('./CalculadoraPuntoEquilibrio.js').then(module => {
      module.PuntoEquilibrio();
    });
  });
});
